package services

import (
	"errors"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/repositories"
)

type GoalService struct {
	goalRepo    *repositories.GoalRepository
	creatorRepo *repositories.CreatorRepository
}

func NewGoalService(
	goalRepo *repositories.GoalRepository,
	creatorRepo *repositories.CreatorRepository,
) *GoalService {
	return &GoalService{
		goalRepo:    goalRepo,
		creatorRepo: creatorRepo,
	}
}

func (s *GoalService) Create(userID string, req *models.CreateGoalRequest) error {
	creator, err := s.creatorRepo.GetByUserID(userID)
	if err != nil {
		return err
	}

	if creator == nil {
		return errors.New("creator profile not found")
	}

	priority := req.Priority
	if priority == "" {
		priority = "medium"
	}

	goal := &models.Goal{
		CreatorID:   creator.ID,
		Title:       req.Title,
		Description: req.Description,
		Status:      "pending",
		Priority:    priority,
		TargetDate:  req.TargetDate,
	}

	return s.goalRepo.Create(goal)
}

func (s *GoalService) GetAll(userID string) ([]models.Goal, error) {
	creator, err := s.creatorRepo.GetByUserID(userID)
	if err != nil {
		return nil, err
	}

	if creator == nil {
		return nil, errors.New("creator profile not found")
	}

	return s.goalRepo.GetAllByCreatorID(creator.ID)
}
