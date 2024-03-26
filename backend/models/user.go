package models

// "github.com/google/uuid"
import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Tier uint

const (
	Tier1 Tier = 1
	Tier2 Tier = 2
	Tier3 Tier = 3
)

type User struct {
	ID       primitive.ObjectID `bson:"_id";json:"_id"`
	Email    string             `json:"email"`
	Password string             `json:"password"`
	Tier     Tier               `json:"tier"`
}
