package models

// "github.com/google/uuid"
import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Tier uint

const (
	Tier0 Tier = 0
	Tier1 Tier = 1
	Tier2 Tier = 2
	Tier3 Tier = 3
)

type User struct {
	ID        primitive.ObjectID   `bson:"_id"`
	Email     string               `json:"email" validate:"email, required"`
	Password  string               `json:"password" validate:"required"`
	Tier      Tier                 `json:"tier"`
	BookMarks []primitive.ObjectID `json:"bookmarks"`
}
