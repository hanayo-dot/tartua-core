package repositories

import "github.com/hanayo-dot/tartua-core/internal/models"

type PlatformRepository struct{}

func NewPlatformRepository() *PlatformRepository {
	return &PlatformRepository{}
}

func (r *PlatformRepository) GetAll() ([]models.Platform, error) {
	return []models.Platform{
		{
			ID:         "1",
			Name:       "YouTube",
			Username:   "@hanayo",
			Connected:  true,
			Followers:  1240,
			Views:      18320,
			Engagement: 6.8,
		},
		{
			ID:         "2",
			Name:       "TikTok",
			Username:   "@hanayo",
			Connected:  true,
			Followers:  5320,
			Views:      102340,
			Engagement: 9.2,
		},
		{
			ID:         "3",
			Name:       "Instagram",
			Username:   "@hanayo",
			Connected:  false,
			Followers:  0,
			Views:      0,
			Engagement: 0,
		},
	}, nil
}
