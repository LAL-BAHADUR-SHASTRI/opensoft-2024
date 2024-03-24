package models

type Movie struct {
    ID               struct {
        OID string `json:"$oid"`
    } `json:"_id"`
    Plot             string    `json:"plot"`
    Genres           []string  `json:"genres"`
    Runtime          struct {
        NumberInt string `json:"$numberInt"`
    } `json:"runtime"`
    Cast             []string  `json:"cast"`
    Poster           string    `json:"poster"`
    Title            string    `json:"title"`
    FullPlot         string    `json:"fullplot"`
    Languages        []string  `json:"languages"`
    Released         struct {
        Date struct {
            NumberLong string `json:"$numberLong"`
        } `json:"$date"`
    } `json:"released"`
    Directors        []string  `json:"directors"`
    Rated            string    `json:"rated"`
    Awards           struct {
        Wins        struct {
            NumberInt string `json:"$numberInt"`
        } `json:"wins"`
        Nominations struct {
            NumberInt string `json:"$numberInt"`
        } `json:"nominations"`
        Text        string `json:"text"`
    } `json:"awards"`
    LastUpdated      string    `json:"lastupdated"`
    Year             struct {
        NumberInt string `json:"$numberInt"`
    } `json:"year"`
    IMDB             struct {
        Rating     struct {
            NumberDouble string `json:"$numberDouble"`
        } `json:"rating"`
        Votes      struct {
            NumberInt string `json:"$numberInt"`
        } `json:"votes"`
        ID         struct {
            NumberInt string `json:"$numberInt"`
        } `json:"id"`
    } `json:"imdb"`
    Countries        []string  `json:"countries"`
    Type             string    `json:"type"`
    Tomatoes         struct {
        Viewer      struct {
            Rating     struct {
                NumberDouble string `json:"$numberDouble"`
            } `json:"rating"`
            NumReviews struct {
                NumberInt string `json:"$numberInt"`
            } `json:"numReviews"`
            Meter      struct {
                NumberInt string `json:"$numberInt"`
            } `json:"meter"`
        } `json:"viewer"`
        Fresh       string    `json:"fresh"`
        Critic      struct {
            Rating     struct {
                NumberDouble string `json:"$numberDouble"`
            } `json:"rating"`
            NumReviews struct {
                NumberInt string `json:"$numberInt"`
            } `json:"numReviews"`
            Meter      struct {
                NumberInt string `json:"$numberInt"`
            } `json:"meter"`
        } `json:"critic"`
        Rotten      string    `json:"rotten"`
        LastUpdated struct {
            Date struct {
                NumberLong string `json:"$numberLong"`
            } `json:"$date"`
        } `json:"lastUpdated"`
    } `json:"tomatoes"`
    NumMflixComments struct {
        NumberInt string `json:"$numberInt"`
    } `json:"num_mflix_comments"`
}
