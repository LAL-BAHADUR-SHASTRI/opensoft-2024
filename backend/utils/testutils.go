package utils

import (
	"crypto/sha256"
	"fmt"
)

func HashPassword(password string) string {
	h := sha256.New()
	h.Write([]byte(password))
	return fmt.Sprintf("%x", h.Sum(nil))
}
