package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type PlanTier string

const (
    T1 PlanTier = "plan_NsGr1NWyUaaAhq"
    T2 PlanTier = "plan_NsGqpL2uyzi3Cw"
    T3 PlanTier = "plan_NsGqTUf5QdoVBn"
)

type Payment struct {
	ID 	 primitive.ObjectID `bson:"_id"`
    UserID   string              `json:"user_id"`
    PlanID   PlanTier            `json:"plan_id"`
    ValidUpto time.Time          `json:"valid_upto"`
}