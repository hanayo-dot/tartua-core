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

func (s *GoalService) GetByID(userID, goalID string) (*models.Goal, error) {
	creator, err := s.creatorRepo.GetByUserID(userID)
	if err != nil {
		return nil, err
	}

	if creator == nil {
		return nil, errors.New("creator profile not found")
	}

	goal, err := s.goalRepo.GetByID(goalID)
	if err != nil {
		return nil, err
	}

	if goal == nil {
		return nil, errors.New("goal not found")
	}

	if goal.CreatorID != creator.ID {
		return nil, errors.New("unauthorized")
	}

	return goal, nil
}

func (s *GoalService) Update(userID, goalID string, req *models.UpdateGoalRequest) error {
	goal, err := s.GetByID(userID, goalID)
	if err != nil {
		return err
	}

	if req.Title != "" {
		goal.Title = req.Title
	}

	if req.Description != "" {
		goal.Description = req.Description
	}

	if req.Status != "" {
		goal.Status = req.Status
	}

	if req.Priority != "" {
		goal.Priority = req.Priority
	}

	if !req.TargetDate.IsZero() {
		goal.TargetDate = req.TargetDate
	}

	return s.goalRepo.Update(goal)
}

func (s *GoalService) Delete(userID, goalID string) error {
	_, err := s.GetByID(userID, goalID)
	if err != nil {
		return err
	}

	return s.goalRepo.Delete(goalID)
}
