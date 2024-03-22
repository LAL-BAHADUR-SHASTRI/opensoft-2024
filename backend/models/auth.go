package models

type User struct{
  Name string  `json:"name" bson:"user_name"`
  Age int  `json:"age" bson:"user_age"`
}
