package services

import (
	"errors"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/repositories"
)

type TaskService struct {
	taskRepo    *repositories.TaskRepository
	goalRepo    *repositories.GoalRepository
	creatorRepo *repositories.CreatorRepository
}

func NewTaskService(
	taskRepo *repositories.TaskRepository,
	goalRepo *repositories.GoalRepository,
	creatorRepo *repositories.CreatorRepository,
) *TaskService {
	return &TaskService{
		taskRepo:    taskRepo,
		goalRepo:    goalRepo,
		creatorRepo: creatorRepo,
	}
}

func (s *TaskService) Create(userID, goalID string, req *models.CreateTaskRequest) error {
	creator, err := s.creatorRepo.GetByUserID(userID)
	if err != nil {
		return err
	}

	if creator == nil {
		return errors.New("creator profile not found")
	}

	goal, err := s.goalRepo.GetByID(goalID)
	if err != nil {
		return err
	}

	if goal == nil {
		return errors.New("goal not found")
	}

	if goal.CreatorID != creator.ID {
		return errors.New("unauthorized")
	}

	task := &models.Task{
		GoalID:      goal.ID,
		Title:       req.Title,
		Description: req.Description,
		Status:      "pending",
		DueDate:     req.DueDate,
	}

	return s.taskRepo.Create(task)
}

func (s *TaskService) GetByGoal(userID, goalID string) ([]models.Task, error) {
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

	return s.taskRepo.GetByGoalID(goalID)
}
