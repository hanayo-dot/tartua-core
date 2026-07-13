package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/services"
)

type GoalHandler struct {
	service *services.GoalService
}

func NewGoalHandler(service *services.GoalService) *GoalHandler {
	return &GoalHandler{
		service: service,
	}
}

func (h *GoalHandler) Create(c *gin.Context) {
	var req models.CreateGoalRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	userID := c.GetString("userID")

	if err := h.service.Create(userID, &req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Goal created successfully",
	})
}

func (h *GoalHandler) GetAll(c *gin.Context) {
	userID := c.GetString("userID")

	goals, err := h.service.GetAll(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, goals)
}
