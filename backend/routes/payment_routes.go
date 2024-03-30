package routes

import (
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"opensoft_2024/database"
	"opensoft_2024/models"
	"time"
)

var paymentCollection *mongo.Collection = database.OpenCollection(database.Client, "payments")

func PaymentServiceRouter(r *gin.Engine) {
	payment := r.Group("/payment")
	{
		payment.DELETE("/", DeleteAllPayments)
		payment.POST("/create", CreatePayment)
		payment.PUT("/update", UpdatePayment)
		payment.GET("/", GetPayments)
		payment.GET("/user/:user_id", GetPaymentByUserID)
	}
}

func GetPayments(c *gin.Context) {
	cursor, err := paymentCollection.Find(database.Ctx, bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve payments"})
		return
	}

	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode payments"})
		return
	}

	c.JSON(http.StatusOK, results)
}

func CreatePayment(c *gin.Context) {
	var payment models.Payment
	if err := c.BindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	payment.ValidUpto = time.Now().AddDate(0, 1, 0)

	result, err := paymentCollection.InsertOne(database.Ctx, bson.M{
		"user_id":    payment.UserID,
		"plan_id":    payment.PlanID,
		"valid_upto": payment.ValidUpto,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create payment"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func UpdatePayment(c *gin.Context) {
	var payment models.Payment
	if err := c.BindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	payment.ValidUpto = time.Now().AddDate(0, 1, 0)
	filter := bson.M{"user_id": payment.UserID}
	update := bson.M{
		"$set": bson.M{
			"user_id":    payment.UserID,
			"plan_id":    payment.PlanID,
			"valid_upto": payment.ValidUpto,
		},
	}

	result, err := paymentCollection.UpdateOne(database.Ctx, filter, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update payment"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func DeleteAllPayments(c *gin.Context) {
	result, err := paymentCollection.DeleteMany(database.Ctx, bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete payments"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func GetPaymentByUserID(c *gin.Context) {
	userID := c.Param("user_id")

	cursor, err := paymentCollection.Find(database.Ctx, bson.M{"user_id": userID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve payments"})
		return
	}

	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode payments"})
		return
	}

	c.JSON(http.StatusOK, results)
}
