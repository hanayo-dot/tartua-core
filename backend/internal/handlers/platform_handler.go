package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/services"
	"github.com/hanayo-dot/tartua-core/pkg/response"
)

type PlatformHandler struct {
	service *services.PlatformService
}

func NewPlatformHandler(service *services.PlatformService) *PlatformHandler {
	return &PlatformHandler{
		service: service,
	}
}

func (h *PlatformHandler) GetAll(c *gin.Context) {
	platforms, err := h.service.GetAll()
	if err != nil {
		response.Error(c, http.StatusInternalServerError, err.Error())
		return
	}

	response.Success(
		c,
		http.StatusOK,
		"Platforms retrieved successfully",
		platforms,
	)
}

func (h *PlatformHandler) Connect(c *gin.Context) {
	var req models.ConnectPlatformRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	userID := c.GetString("userID")

	if err := h.service.Connect(userID, &req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(
		c,
		http.StatusOK,
		"Platform connected successfully",
		nil,
	)
}

func (h *PlatformHandler) Disconnect(c *gin.Context) {
	userID := c.GetString("userID")
	platform := c.Param("platform")

	if err := h.service.Disconnect(userID, platform); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(
		c,
		http.StatusOK,
		"Platform disconnected successfully",
		nil,
	)
}
