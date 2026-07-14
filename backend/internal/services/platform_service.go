package services

import (
	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/repositories"
)

type PlatformService struct {
	repo *repositories.PlatformRepository
}

func NewPlatformService(repo *repositories.PlatformRepository) *PlatformService {
	return &PlatformService{
		repo: repo,
	}
}

func (s *PlatformService) GetAll() ([]models.Platform, error) {
	return s.repo.GetAll()
}

func (s *PlatformService) Connect(userID string, req *models.ConnectPlatformRequest) error {
	// Mock implementation.
	// Later this will perform OAuth and persist the connection.
	return nil
}

func (s *PlatformService) Disconnect(userID, platform string) error {
	// Mock implementation.
	// Later this will revoke the OAuth connection
	// and update the database.
	return nil
}
