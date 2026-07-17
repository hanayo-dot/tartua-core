package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/services"
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
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	userID := c.GetString("userID")

	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}

	if err := h.service.Create(userID, &req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Creator profile created successfully",
	})
}

func (h *CreatorHandler) Get(c *gin.Context) {
	userID := c.GetString("userID")

	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}

	creator, err := h.service.Get(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if creator == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "creator profile not found",
		})
		return
	}

	c.JSON(http.StatusOK, creator)
}

func (h *CreatorHandler) Update(c *gin.Context) {
	var req models.CreateCreatorRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	userID := c.GetString("userID")
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}

	if err := h.service.Update(userID, &req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Creator profile updated successfully",
	})
}
