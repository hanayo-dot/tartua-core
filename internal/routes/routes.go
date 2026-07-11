package routes

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/handlers"
	"github.com/hanayo-dot/tartua-core/internal/repositories"
	"github.com/hanayo-dot/tartua-core/internal/services"
)

func RegisterRoutes(db *sql.DB) *gin.Engine {
	router := gin.Default()

	// Health routes
	router.GET("/", Home)
	router.GET("/health", Health)

	// Dependency Injection
	userRepo := repositories.NewUserRepository(db)
	userService := services.NewUserService(userRepo)
	authHandler := handlers.NewAuthHandler(userService)

	// API v1
	api := router.Group("/api/v1")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			// auth.POST("/login", authHandler.Login) // We'll add this next
		}
	}

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
