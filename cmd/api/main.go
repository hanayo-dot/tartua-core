package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/config"
	"github.com/hanayo-dot/tartua-core/internal/routes"
)

func main() {
	cfg := config.Load()

	gin.SetMode(gin.DebugMode)

	router := routes.RegisterRoutes()

	log.Printf("Tartua API running on port %s", cfg.Port)

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
