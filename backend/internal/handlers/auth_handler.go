package handlers

import (
	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/services"
	"github.com/hanayo-dot/tartua-core/pkg/response"
)

type AuthHandler struct {
	userService *services.UserService
	jwtService  *services.JWTService
}

func NewAuthHandler(
	userService *services.UserService,
	jwtService *services.JWTService,
) *AuthHandler {
	return &AuthHandler{
		userService: userService,
		jwtService:  jwtService,
	}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req models.RegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	if err := h.userService.Register(&req); err != nil {
		response.Conflict(c, err.Error())
		return
	}

	response.Created(
		c,
		"User registered successfully",
		nil,
	)
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req models.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	user, err := h.userService.Login(&req)
	if err != nil {
		response.Unauthorized(c, err.Error())
		return
	}

	token, err := h.jwtService.GenerateToken(user.ID, user.Email)
	if err != nil {
		response.InternalServerError(c)
		return
	}

	response.OK(
		c,
		"Login successful",
		models.LoginResponse{
			Token: token,
			User:  *user,
		},
	)
}
