package services

import (
	"errors"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/repositories"
)

type DashboardService struct {
	dashboardRepo *repositories.DashboardRepository
	creatorRepo   *repositories.CreatorRepository
}

func NewDashboardService(
	dashboardRepo *repositories.DashboardRepository,
	creatorRepo *repositories.CreatorRepository,
) *DashboardService {
	return &DashboardService{
		dashboardRepo: dashboardRepo,
		creatorRepo:   creatorRepo,
	}
}

func (s *DashboardService) Get(userID string) (*models.Dashboard, error) {
	creator, err := s.creatorRepo.GetByUserID(userID)
	if err != nil {
		return nil, err
	}

	if creator == nil {
		return nil, errors.New("creator profile not found")
	}

	return s.dashboardRepo.GetStats(creator.ID)
}
