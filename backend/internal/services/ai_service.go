package services

import (
	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/repositories"
)

type AIService struct {
	goalRepo     *repositories.GoalRepository
	taskRepo     *repositories.TaskRepository
	platformRepo *repositories.PlatformRepository
}

func NewAIService(
	goalRepo *repositories.GoalRepository,
	taskRepo *repositories.TaskRepository,
	platformRepo *repositories.PlatformRepository,
) *AIService {
	return &AIService{
		goalRepo:     goalRepo,
		taskRepo:     taskRepo,
		platformRepo: platformRepo,
	}
}

func (s *AIService) GenerateInsights(userID string) ([]models.Insight, error) {
	// TODO:
	// - Fetch the user's goals
	// - Fetch the user's tasks
	// - Fetch connected platforms
	// - Generate intelligent insights from the data

	insights := []models.Insight{
		{
			Title:       "Stay consistent",
			Description: "Completing at least one task every day increases your chances of achieving your goals.",
			Type:        "productivity",
		},
		{
			Title:       "TikTok is your strongest platform",
			Description: "Your TikTok engagement is higher than your other connected platforms.",
			Type:        "platform",
		},
		{
			Title:       "Upcoming deadline",
			Description: "One of your goals is approaching its target date.",
			Type:        "goal",
		},
	}

	return insights, nil
}
