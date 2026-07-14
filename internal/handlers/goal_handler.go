package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/services"
	"github.com/hanayo-dot/tartua-core/pkg/response"
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
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	userID := c.GetString("userID")

	if err := h.service.Create(userID, &req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(
		c,
		http.StatusCreated,
		"Goal created successfully",
		nil,
	)
}

func (h *GoalHandler) GetAll(c *gin.Context) {
	userID := c.GetString("userID")

	goals, err := h.service.GetAll(userID)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(
		c,
		http.StatusOK,
		"Goals retrieved successfully",
		goals,
	)
}

func (h *GoalHandler) GetByID(c *gin.Context) {
	userID := c.GetString("userID")
	goalID := c.Param("goalID")

	goal, err := h.service.GetByID(userID, goalID)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(
		c,
		http.StatusOK,
		"Goal retrieved successfully",
		goal,
	)
}

func (h *GoalHandler) Update(c *gin.Context) {
	var req models.UpdateGoalRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	userID := c.GetString("userID")
	goalID := c.Param("goalID")

	if err := h.service.Update(userID, goalID, &req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(
		c,
		http.StatusOK,
		"Goal updated successfully",
		nil,
	)
}

func (h *GoalHandler) Delete(c *gin.Context) {
	userID := c.GetString("userID")
	goalID := c.Param("goalID")

	if err := h.service.Delete(userID, goalID); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(
		c,
		http.StatusOK,
		"Goal deleted successfully",
		nil,
	)
}
