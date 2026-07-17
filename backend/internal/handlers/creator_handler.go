package handlers

import (
	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/services"
	"github.com/hanayo-dot/tartua-core/pkg/response"
)

type CreatorHandler struct {
	service *services.CreatorService
}

func NewCreatorHandler(service *services.CreatorService) *CreatorHandler {
	return &CreatorHandler{
		service: service,
	}
}

func (h *CreatorHandler) Create(c *gin.Context) {
	var req models.CreateCreatorRequest

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
		response.InternalServerError(c)
		return
	}

	response.Created(
		c,
		"Creator profile created successfully",
		nil,
	)
}

func (h *CreatorHandler) Get(c *gin.Context) {
	userID := c.GetString("userID")
	if userID == "" {
		response.Unauthorized(c, "Unauthorized")
		return
	}

	creator, err := h.service.Get(userID)
	if err != nil {
		response.InternalServerError(c)
		return
	}

	if creator == nil {
		response.NotFound(c, "Creator profile not found")
		return
	}

	response.OK(
		c,
		"Creator profile retrieved successfully",
		creator,
	)
}

func (h *CreatorHandler) Update(c *gin.Context) {
	var req models.CreateCreatorRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	userID := c.GetString("userID")
	if userID == "" {
		response.Unauthorized(c, "Unauthorized")
		return
	}

	if err := h.service.Update(userID, &req); err != nil {
		response.InternalServerError(c)
		return
	}

	response.OK(
		c,
		"Creator profile updated successfully",
		nil,
	)
}
