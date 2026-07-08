package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes() *gin.Engine {
	router := gin.Default()

	router.GET("/", Home)
	router.GET("/health", Health)

	return router
}

func Home(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to Tartua API",
	})
}

func Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "OK",
	})
}
