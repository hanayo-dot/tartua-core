package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/config"
	"github.com/hanayo-dot/tartua-core/internal/database"
	"github.com/hanayo-dot/tartua-core/internal/routes"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}
	// Load application configuration
	cfg := config.Load()

	// Set Gin mode
	gin.SetMode(gin.DebugMode)

	// Connect to the database
	db, err := database.Connect(cfg)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	_ = db

	// Register routes
	router := routes.RegisterRoutes()

	log.Printf("Tartua API running on port %s", cfg.Port)

	// Start the server
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
