package handlers

import (
	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/services"
	"github.com/hanayo-dot/tartua-core/pkg/response"
)

type DashboardHandler struct {
	service *services.DashboardService
}

func NewDashboardHandler(service *services.DashboardService) *DashboardHandler {
	return &DashboardHandler{
		service: service,
	}
}

func (h *DashboardHandler) Get(c *gin.Context) {
	userID := c.GetString("userID")

	if userID == "" {
		response.Unauthorized(c, "Unauthorized")
		return
	}

	stats, err := h.service.Get(userID)
	if err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.OK(
		c,
		"Dashboard retrieved successfully",
		stats,
	)
}
