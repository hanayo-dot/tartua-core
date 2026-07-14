package repositories

import (
	"database/sql"

	"github.com/hanayo-dot/tartua-core/internal/models"
)

type DashboardRepository struct {
	db *sql.DB
}

func NewDashboardRepository(db *sql.DB) *DashboardRepository {
	return &DashboardRepository{
		db: db,
	}
}

func (r *DashboardRepository) GetStats(creatorID string) (*models.Dashboard, error) {
	var stats models.Dashboard

	// Goals
	err := r.db.QueryRow(`
		SELECT
			COUNT(*),
			COUNT(*) FILTER (WHERE status = 'completed'),
			COUNT(*) FILTER (WHERE status != 'completed')
		FROM goals
		WHERE creator_id = $1
	`, creatorID).Scan(
		&stats.TotalGoals,
		&stats.CompletedGoals,
		&stats.ActiveGoals,
	)
	if err != nil {
		return nil, err
	}

	// Tasks
	err = r.db.QueryRow(`
		SELECT
			COUNT(*),
			COUNT(*) FILTER (WHERE status = 'completed'),
			COUNT(*) FILTER (WHERE status != 'completed')
		FROM tasks
		WHERE goal_id IN (
			SELECT id
			FROM goals
			WHERE creator_id = $1
		)
	`, creatorID).Scan(
		&stats.TotalTasks,
		&stats.CompletedTasks,
		&stats.PendingTasks,
	)
	if err != nil {
		return nil, err
	}

	if stats.TotalTasks > 0 {
		stats.CompletionRate =
			float64(stats.CompletedTasks) /
				float64(stats.TotalTasks) * 100
	}

	return &stats, nil
}
