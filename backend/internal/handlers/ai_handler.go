package handlers

import (
	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/services"
	"github.com/hanayo-dot/tartua-core/pkg/response"
)

type AIHandler struct {
	service *services.AIService
}

func NewAIHandler(service *services.AIService) *AIHandler {
	return &AIHandler{
		service: service,
	}
}

func (h *AIHandler) GetInsights(c *gin.Context) {
	userID := c.GetString("userID")

	insights, err := h.service.GenerateInsights(userID)
	if err != nil {
		response.InternalServerError(c)
		return
	}

	response.OK(
		c,
		"Insights retrieved successfully",
		insights,
	)

}
