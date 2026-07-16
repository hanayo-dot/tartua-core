package routes

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/config"
	"github.com/hanayo-dot/tartua-core/internal/handlers"
	"github.com/hanayo-dot/tartua-core/internal/middleware"
	"github.com/hanayo-dot/tartua-core/internal/repositories"
	"github.com/hanayo-dot/tartua-core/internal/services"
)

func RegisterRoutes(db *sql.DB, cfg *config.Config) *gin.Engine {
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())

	// Public routes
	router.GET("/", Home)
	router.GET("/health", Health)

	// ==========================================
	// Repositories
	// ==========================================

	userRepo := repositories.NewUserRepository(db)
	creatorRepo := repositories.NewCreatorRepository(db)
	goalRepo := repositories.NewGoalRepository(db)
	taskRepo := repositories.NewTaskRepository(db)
	dashboardRepo := repositories.NewDashboardRepository(db)
	platformRepo := repositories.NewPlatformRepository()

	// ==========================================
	// Services
	// ==========================================

	jwtService := services.NewJWTService(cfg.JWTSecret)

	aiService := services.NewAIService(
		goalRepo,
		taskRepo,
		platformRepo,
	)

	userService := services.NewUserService(userRepo)

	creatorService := services.NewCreatorService(
		creatorRepo,
	)

	goalService := services.NewGoalService(
		goalRepo,
		creatorRepo,
	)

	taskService := services.NewTaskService(
		taskRepo,
		goalRepo,
		creatorRepo,
	)

	dashboardService := services.NewDashboardService(
		dashboardRepo,
		creatorRepo,
	)
	platformService := services.NewPlatformService(
		platformRepo,
	)

	// ==========================================
	// Handlers
	// ==========================================

	authHandler := handlers.NewAuthHandler(
		userService,
		jwtService,
	)

	creatorHandler := handlers.NewCreatorHandler(
		creatorService,
	)

	goalHandler := handlers.NewGoalHandler(
		goalService,
	)

	taskHandler := handlers.NewTaskHandler(
		taskService,
	)

	dashboardHandler := handlers.NewDashboardHandler(
		dashboardService,
	)
	platformHandler := handlers.NewPlatformHandler(
		platformService,
	)
	aiHandler := handlers.NewAIHandler(
		aiService,
	)

	// ==========================================
	// API v1
	// ==========================================

	api := router.Group("/api/v1")

	// Public routes
	auth := api.Group("/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
	}

	// Protected routes
	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware(cfg.JWTSecret))
	{
		// Creator
		protected.POST("/creator/profile", creatorHandler.Create)
		protected.GET("/creator/profile", creatorHandler.Get)

		// Dashboard
		protected.GET("/dashboard", dashboardHandler.Get)

		// Goals
		protected.POST("/goals", goalHandler.Create)
		protected.GET("/goals", goalHandler.GetAll)
		protected.GET("/goals/:goalID", goalHandler.GetByID)
		protected.PUT("/goals/:goalID", goalHandler.Update)
		protected.DELETE("/goals/:goalID", goalHandler.Delete)

		// Tasks
		protected.POST("/goals/:goalID/tasks", taskHandler.Create)
		protected.GET("/goals/:goalID/tasks", taskHandler.GetByGoal)
		protected.GET("/goals/:goalID/tasks/:taskID", taskHandler.GetByID)
		protected.PUT("/goals/:goalID/tasks/:taskID", taskHandler.Update)
		protected.DELETE("/goals/:goalID/tasks/:taskID", taskHandler.Delete)

		// Platforms
		protected.GET("/platforms", platformHandler.GetAll)
		protected.POST("/platforms/connect", platformHandler.Connect)
		protected.DELETE("/platforms/:platform/disconnect", platformHandler.Disconnect)

		protected.GET("/dashboard/insights", aiHandler.GetInsights)
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
