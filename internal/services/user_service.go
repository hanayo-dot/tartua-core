package services

import (
	"errors"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/repositories"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	repo *repositories.UserRepository
}

func NewUserService(repo *repositories.UserRepository) *UserService {
	return &UserService{
		repo: repo,
	}
}

func (s *UserService) Register(req *models.RegisterRequest) error {
	// Check if email already exists
	existingEmail, err := s.repo.GetByEmail(req.Email)
	if err != nil {
		return err
	}

	if existingEmail != nil {
		return errors.New("email already exists")
	}

	// Check if username already exists
	existingUsername, err := s.repo.GetByUsername(req.Username)
	if err != nil {
		return err
	}

	if existingUsername != nil {
		return errors.New("username already exists")
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(req.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return err
	}

	// Create the user
	user := &models.User{
		Username:     req.Username,
		Email:        req.Email,
		PasswordHash: string(hashedPassword),
		FirstName:    req.FirstName,
		LastName:     req.LastName,
	}

	return s.repo.Create(user)
}
