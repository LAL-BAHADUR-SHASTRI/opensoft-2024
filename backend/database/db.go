package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InitDB() (*mongo.Client, context.Context) {
	// Use the SetServerAPIOptions() method to set the version of the Stable API on the client
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)

	opts := options.Client().ApplyURI(os.Getenv("DB_CONN")).SetServerAPIOptions(serverAPI)

	// Create a new client and connect to the server
	ctx := context.TODO()
	client, err := mongo.Connect(ctx, opts)

	if err != nil {
		log.Fatal(err)
	}

	// Send a ping to confirm a successful connection
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
		panic(err)
	}

	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
	return client, ctx
}

var Client *mongo.Client
var Ctx context.Context

func init() {
	Client, Ctx = InitDB()
}

func OpenCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	if client == nil {
		log.Println("Mongodb Client is nil")
		return nil
	}

	var collection *mongo.Collection = client.Database("sample_mflix").Collection(collectionName)
	return collection
}
