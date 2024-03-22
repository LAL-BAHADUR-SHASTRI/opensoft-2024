package services

import (
	"context"
	"opensoft_2024/models"

	"go.mongodb.org/mongo-driver/mongo"
)

type UserServiceImpl struct{
  userCollection *mongo.Collection
  ctx context.Context
}

func NerUserService(userCollection *mongo.Collection, ctx context.Context) UserService {
  return &UserServiceImpl{
    userCollection: userCollection,
    ctx: ctx,
  }
}

func (u *UserServiceImpl) CreateUser(User *models.User) error {
  return nil
}

func (u *UserServiceImpl) GetUser(name *string) (*models.User, error) {
  return nil, nil
}

func (u *UserServiceImpl) UpdateUser(User *models.User) error {
  return nil
}

func (u *UserServiceImpl) DeleteUser(name *string) error {
  return nil
}
