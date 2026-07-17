package services

import (
	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/repositories"
)

type CreatorService struct {
	repo *repositories.CreatorRepository
}

func NewCreatorService(repo *repositories.CreatorRepository) *CreatorService {
	return &CreatorService{
		repo: repo,
	}
}

func (s *CreatorService) Create(userID string, req *models.CreateCreatorRequest) error {
	creator := &models.Creator{
		UserID:          userID,
		DisplayName:     req.DisplayName,
		Bio:             req.Bio,
		Country:         req.Country,
		PrimaryPlatform: req.PrimaryPlatform,
		Niche:           req.Niche,
		AvatarURL:       req.AvatarURL,
	}

	return s.repo.Create(creator)
}

func (s *CreatorService) Get(userID string) (*models.Creator, error) {
	return s.repo.GetByUserID(userID)
}

func (s *CreatorService) Update(userID string, req *models.CreateCreatorRequest) error {
	creator, err := s.repo.GetByUserID(userID)
	if err != nil {
		return err
	}
	if creator == nil {
		return s.Create(userID, req)
	}

	creator.DisplayName = req.DisplayName
	creator.Bio = req.Bio
	creator.Country = req.Country
	creator.PrimaryPlatform = req.PrimaryPlatform
	creator.Niche = req.Niche
	creator.AvatarURL = req.AvatarURL

	return s.repo.Update(creator)
}
