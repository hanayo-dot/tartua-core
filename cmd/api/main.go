package main

import (
	"log"

	"github.com/hanayo-dot/tartua-core/internal/routes"
)

func main() {
	router := routes.RegisterRoutes()

	log.Println("Tartua API started on http://localhost:8080")

	err := router.Run(":8080")
	if err != nil {
		log.Fatal(err)
	}
}
