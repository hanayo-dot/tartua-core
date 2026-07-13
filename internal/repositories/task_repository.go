package repositories

import (
	"database/sql"

	"github.com/google/uuid"

	"github.com/hanayo-dot/tartua-core/internal/models"
)

type TaskRepository struct {
	db *sql.DB
}

func NewTaskRepository(db *sql.DB) *TaskRepository {
	return &TaskRepository{
		db: db,
	}
}

func (r *TaskRepository) Create(task *models.Task) error {
	task.ID = uuid.New().String()

	query := `
		INSERT INTO tasks (
			id,
			goal_id,
			title,
			description,
			status,
			due_date
		)
		VALUES ($1,$2,$3,$4,$5,$6)
	`

	_, err := r.db.Exec(
		query,
		task.ID,
		task.GoalID,
		task.Title,
		task.Description,
		task.Status,
		task.DueDate,
	)

	return err
}

func (r *TaskRepository) GetByGoalID(goalID string) ([]models.Task, error) {
	query := `
		SELECT
			id,
			goal_id,
			title,
			description,
			status,
			due_date,
			created_at,
			updated_at
		FROM tasks
		WHERE goal_id = $1
		ORDER BY created_at ASC
	`

	rows, err := r.db.Query(query, goalID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []models.Task

	for rows.Next() {
		var task models.Task

		err := rows.Scan(
			&task.ID,
			&task.GoalID,
			&task.Title,
			&task.Description,
			&task.Status,
			&task.DueDate,
			&task.CreatedAt,
			&task.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		tasks = append(tasks, task)
	}

	return tasks, nil
}
