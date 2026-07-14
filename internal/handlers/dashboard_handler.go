package handlers

import (
	"net/http"

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

	stats, err := h.service.Get(userID)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(
		c,
		http.StatusOK,
		"Dashboard retrieved successfully",
		stats,
	)
}
