package handlers

import (
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
		response.BadRequest(c, err.Error())
		return
	}

	userID := c.GetString("userID")
	if userID == "" {
		response.Unauthorized(c, "Unauthorized")
		return
	}

	if err := h.service.Create(userID, &req); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.Created(
		c,
		"Goal created successfully",
		nil,
	)
}

func (h *GoalHandler) GetAll(c *gin.Context) {
	userID := c.GetString("userID")
	if userID == "" {
		response.Unauthorized(c, "Unauthorized")
		return
	}

	goals, err := h.service.GetAll(userID)
	if err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.OK(
		c,
		"Goals retrieved successfully",
		goals,
	)
}

func (h *GoalHandler) GetByID(c *gin.Context) {
	userID := c.GetString("userID")
	if userID == "" {
		response.Unauthorized(c, "Unauthorized")
		return
	}

	goalID := c.Param("goalID")

	goal, err := h.service.GetByID(userID, goalID)
	if err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.OK(
		c,
		"Goal retrieved successfully",
		goal,
	)
}

func (h *GoalHandler) Update(c *gin.Context) {
	var req models.UpdateGoalRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	userID := c.GetString("userID")
	if userID == "" {
		response.Unauthorized(c, "Unauthorized")
		return
	}

	goalID := c.Param("goalID")

	if err := h.service.Update(userID, goalID, &req); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.OK(
		c,
		"Goal updated successfully",
		nil,
	)
}

func (h *GoalHandler) Delete(c *gin.Context) {
	userID := c.GetString("userID")
	if userID == "" {
		response.Unauthorized(c, "Unauthorized")
		return
	}

	goalID := c.Param("goalID")

	if err := h.service.Delete(userID, goalID); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.OK(
		c,
		"Goal deleted successfully",
		nil,
	)
}
