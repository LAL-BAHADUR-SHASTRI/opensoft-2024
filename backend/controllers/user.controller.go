package controllers

import (
	"opensoft_2024/services"

	"github.com/gin-gonic/gin"
)

type UserController struct{
  UserService services.UserService
}

func New(UserService services.UserService) UserController {
  return UserController{
    UserService: UserService,
  }
}

func (uc *UserController) CreateUser(ctx *gin.Context) {
  ctx.JSON(200, "")
}

func (uc *UserController) GetUser(ctx *gin.Context) {
  ctx.JSON(200, "")
}

func (uc *UserController) UpdateUser(ctx *gin.Context)  {
  ctx.JSON(200, "")
}

func (uc *UserController) DeleteUser(ctx *gin.Context) {
  ctx.JSON(200, "")
}

func (uc *UserController) RegisterUserRouter(rg *gin.RouterGroup) {
  userroute := rg.Group("/user")

  userroute.POST("/create",uc.CreateUser)
  userroute.GET("/get/:name",uc.GetUser)
  userroute.PATCH("/update",uc.UpdateUser)
  userroute.DELETE("/delete",uc.DeleteUser)
}
