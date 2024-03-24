package models

type Tier uint

const (
	Tier1 Tier = 1
	Tier2 Tier = 2
	Tier3 Tier = 3
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Tier     Tier   `json:"tier"`
}
