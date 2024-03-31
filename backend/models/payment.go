package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Payment struct {
	ID        primitive.ObjectID `bson:"_id"`
	UserID    string             `json:"user_id"`
	PlanID    string             `json:"plan_id"`
	ValidUpto time.Time          `json:"valid_upto"`
}
