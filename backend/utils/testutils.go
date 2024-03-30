package utils

import (
    "golang.org/x/crypto/bcrypt"
	"errors"
	"regexp"
)
func HashPassword(password string) (string, error) {
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        return "", err
    }
    return string(hashedPassword), nil
}

func CheckPasswordHash(password, hash string) error {
    return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}


func ValidateEmail(email string) error {
	// Simple regex-based email validation
	if matched, _ := regexp.MatchString(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`, email); !matched {
		return errors.New("invalid email format")
	}
	return nil
}



func ValidatePassword(password string) error {
	// Validate password strength (e.g., minimum length, complexity)
	if len(password) < 8 {
		return errors.New("password must be at least 8 characters long")
	}
	return nil
}
