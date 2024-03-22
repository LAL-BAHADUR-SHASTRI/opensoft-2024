package services

import "opensoft_2024/models"


type UserService interface{
  CreateUser(*models.User) error
  GetUser(*string) (*models.User, error)
  UpdateUser(*models.User) error
  DeleteUser(*string) error
}
