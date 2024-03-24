// package main

// import (
//     "context"
//     "fmt"
//     "log"

//     "go.mongodb.org/mongo-driver/bson" // Import bson package
//     "go.mongodb.org/mongo-driver/mongo"
//     "go.mongodb.org/mongo-driver/mongo/options"
// )

// func main() {
//     serverAPI := options.ServerAPI(options.ServerAPIVersion1)
//   opts := options.Client().ApplyURI("mongodb+srv://pegasus7d:pegasus7d@cluster0.whplxzw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").SetServerAPIOptions(serverAPI)
//   // Create a new client and connect to the server
//   client, err := mongo.Connect(context.TODO(), opts)
//   if err != nil {
//     panic(err)
//   }
//   defer func() {
//     if err = client.Disconnect(context.TODO()); err != nil {
//       panic(err)
//     }
//   }()

//     // Call the function to list all movies
//     // if err := listAllMovies(client); err != nil {
//     //     log.Fatal(err)
//     // }


//     // Set namespace
// 	collection := client.Database("sample_mflix").Collection("movies")

// 	// Get search term from the user
// 	fmt.Print("Enter search term: ")
// 	var searchTerm string
// 	fmt.Scanln(&searchTerm)

// 	// Search and print the movie titles
// 	if err := searchAndPrintTitles(collection, searchTerm,"default"); err != nil {
// 		log.Fatal(err)
// 	}
// }

// // func listAllMovies(client *mongo.Client) error {
// //     collection := client.Database("sample_mflix").Collection("movies")

// //     // Define an empty filter to retrieve all documents
// //     filter := bson.M{}

// //     // Run the find operation to get all documents in the collection
// //     cursor, err := collection.Find(context.TODO(), filter)
// //     if err != nil {
// //         return fmt.Errorf("error executing find query: %v", err)
// //     }

// //     // Iterate through the cursor and print each document
// //     defer cursor.Close(context.TODO())
// //     for cursor.Next(context.TODO()) {
// //         var movie bson.M
// //         if err := cursor.Decode(&movie); err != nil {
// //             return fmt.Errorf("error decoding document: %v", err)
// //         }
// //         fmt.Println(movie)
// //     }

// //     // Check for cursor errors
// //     if err := cursor.Err(); err != nil {
// //         return fmt.Errorf("cursor error: %v", err)
// //     }

// //     return nil
// // }


// func searchAndPrintTitles(collection *mongo.Collection, searchTerm, indexName string) error {
// 	// Define the search stage using the specific index
	

//     searchStage := bson.D{
// 		{"$search", bson.D{
// 			{"text", bson.D{
// 				{"query", "inter"},
// 				{"path", bson.A{"title", "plot"}}, // Search both "title" and "plot" fields
// 			}},
// 		}},
// 	}
    
// 	limitStage := bson.D{{"$limit", 10}}
// 	projectStage := bson.D{{"$project",  bson.D{{"score", bson.D{{"$meta", "searchScore"}}}, {"title", 1}, {"_id", 0}, {"highlight",  bson.D{{"$meta", "searchHighlights"}}}}}}  





    
// 	// run pipeline
// 	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, limitStage, projectStage})
// 	if err != nil {
// 		panic(err)
// 	}

// 	// print results
// 	var results []bson.D
// 	if err = cursor.All(context.TODO(), &results); err != nil {
// 		panic(err)
// 	}
// 	for _, result := range results {
// 		fmt.Println(result)
// 	}
//     return nil
// }


package main

import (
    "context"
    "fmt"
    "log"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
    serverAPI := options.ServerAPI(options.ServerAPIVersion1)
    opts := options.Client().ApplyURI("mongodb+srv://pegasus7d:pegasus7d@cluster0.whplxzw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").SetServerAPIOptions(serverAPI)
    client, err := mongo.Connect(context.TODO(), opts)
    if err != nil {
        log.Fatal(err)
    }
    defer func() {
        if err := client.Disconnect(context.TODO()); err != nil {
            log.Fatal(err)
        }
    }()

    collection := client.Database("sample_mflix").Collection("movies")

    // Perform a text search with a fixed value
    textSearchTerm := "Matrix"
    fmt.Println("Performing text search for:", textSearchTerm)
    if err := searchAndPrintTitles(collection, textSearchTerm); err != nil {
        log.Fatal(err)
    }

    // Perform a fuzzy search with a fixed value
    fuzzySearchTerm := "Jurasik" // Intentionally misspelled to demonstrate fuzzy search
    fmt.Println("Performing fuzzy search for:", fuzzySearchTerm)
    if err := fuzzySearch(collection, fuzzySearchTerm); err != nil {
        log.Fatal(err)
    }
}

func searchAndPrintTitles(collection *mongo.Collection, searchTerm string) error {
    searchStage := bson.D{
        {"$search", bson.D{
            {"text", bson.D{
                {"query", searchTerm},
                {"path", bson.A{"title", "plot"}},
            }},
        }},
    }

    return runSearch(collection, searchStage, searchTerm)
}

func fuzzySearch(collection *mongo.Collection, searchTerm string) error {
    searchStage := bson.D{
        {"$search", bson.D{
            {"text", bson.D{
                {"query", searchTerm},
                {"path", "title"},
                {"fuzzy", bson.D{
                    {"maxEdits", 2},
                    {"prefixLength", 3},
                }},
            }},
        }},
    }

    return runSearch(collection, searchStage, searchTerm)
}

func runSearch(collection *mongo.Collection, searchStage bson.D, searchTerm string) error {
    limitStage := bson.D{{"$limit", 10}}
    projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"_id", 0}}}}

    cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, limitStage, projectStage})
    if err != nil {
        return err
    }
    defer cursor.Close(context.Background())

    var results []bson.D
    if err := cursor.All(context.TODO(), &results); err != nil {
        return err
    }

    fmt.Printf("Search results for '%s':\n", searchTerm)
    for _, result := range results {
        if title, ok := result.Map()["title"]; ok {
            fmt.Println(title)
        }
    }

    return nil
}
