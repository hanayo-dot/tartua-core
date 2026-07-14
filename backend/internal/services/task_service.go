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
	_, err := s.GetGoal(userID, goalID)
	if err != nil {
		return nil, err
	}

	return s.taskRepo.GetByGoalID(goalID)
}

func (s *TaskService) GetByID(userID, goalID, taskID string) (*models.Task, error) {
	_, err := s.GetGoal(userID, goalID)
	if err != nil {
		return nil, err
	}

	task, err := s.taskRepo.GetByID(taskID)
	if err != nil {
		return nil, err
	}

	if task == nil {
		return nil, errors.New("task not found")
	}

	if task.GoalID != goalID {
		return nil, errors.New("task does not belong to this goal")
	}

	return task, nil
}

func (s *TaskService) Update(userID, goalID, taskID string, req *models.UpdateTaskRequest) error {
	task, err := s.GetByID(userID, goalID, taskID)
	if err != nil {
		return err
	}

	if req.Title != "" {
		task.Title = req.Title
	}

	if req.Description != "" {
		task.Description = req.Description
	}

	if req.Status != "" {
		task.Status = req.Status
	}

	if !req.DueDate.IsZero() {
		task.DueDate = req.DueDate
	}

	return s.taskRepo.Update(task)
}

func (s *TaskService) Delete(userID, goalID, taskID string) error {
	_, err := s.GetByID(userID, goalID, taskID)
	if err != nil {
		return err
	}

	return s.taskRepo.Delete(taskID)
}

func (s *TaskService) GetGoal(userID, goalID string) (*models.Goal, error) {
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
