package repositories

import (
	"database/sql"

	"github.com/google/uuid"

	"github.com/hanayo-dot/tartua-core/internal/models"
)

type GoalRepository struct {
	db *sql.DB
}

func NewGoalRepository(db *sql.DB) *GoalRepository {
	return &GoalRepository{
		db: db,
	}
}

func (r *GoalRepository) Create(goal *models.Goal) error {
	goal.ID = uuid.New().String()

	query := `
		INSERT INTO goals (
			id,
			creator_id,
			title,
			description,
			status,
			priority,
			target_date
		)
		VALUES ($1,$2,$3,$4,$5,$6,$7)
	`

	_, err := r.db.Exec(
		query,
		goal.ID,
		goal.CreatorID,
		goal.Title,
		goal.Description,
		goal.Status,
		goal.Priority,
		goal.TargetDate,
	)

	return err
}

func (r *GoalRepository) GetAllByCreatorID(creatorID string) ([]models.Goal, error) {
	query := `
		SELECT
			id,
			creator_id,
			title,
			description,
			status,
			priority,
			target_date,
			created_at,
			updated_at
		FROM goals
		WHERE creator_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(query, creatorID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var goals []models.Goal

	for rows.Next() {
		var goal models.Goal

		err := rows.Scan(
			&goal.ID,
			&goal.CreatorID,
			&goal.Title,
			&goal.Description,
			&goal.Status,
			&goal.Priority,
			&goal.TargetDate,
			&goal.CreatedAt,
			&goal.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		goals = append(goals, goal)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return goals, nil
}

func (r *GoalRepository) GetByID(id string) (*models.Goal, error) {
	query := `
		SELECT
			id,
			creator_id,
			title,
			description,
			status,
			priority,
			target_date,
			created_at,
			updated_at
		FROM goals
		WHERE id = $1
	`

	var goal models.Goal

	err := r.db.QueryRow(query, id).Scan(
		&goal.ID,
		&goal.CreatorID,
		&goal.Title,
		&goal.Description,
		&goal.Status,
		&goal.Priority,
		&goal.TargetDate,
		&goal.CreatedAt,
		&goal.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &goal, nil
}

func (r *GoalRepository) Update(goal *models.Goal) error {
	query := `
		UPDATE goals
		SET
			title = $1,
			description = $2,
			status = $3,
			priority = $4,
			target_date = $5,
			updated_at = CURRENT_TIMESTAMP
		WHERE id = $6
	`

	_, err := r.db.Exec(
		query,
		goal.Title,
		goal.Description,
		goal.Status,
		goal.Priority,
		goal.TargetDate,
		goal.ID,
	)

	return err
}

func (r *GoalRepository) Delete(id string) error {
	query := `DELETE FROM goals WHERE id = $1`

	_, err := r.db.Exec(query, id)

	return err
}
