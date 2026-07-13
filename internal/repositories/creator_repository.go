package repositories

import (
	"database/sql"

	"github.com/google/uuid"

	"github.com/hanayo-dot/tartua-core/internal/models"
)

type CreatorRepository struct {
	db *sql.DB
}

func NewCreatorRepository(db *sql.DB) *CreatorRepository {
	return &CreatorRepository{
		db: db,
	}
}

func (r *CreatorRepository) Create(creator *models.Creator) error {
	creator.ID = uuid.New().String()

	query := `
		INSERT INTO creators (
			id,
			user_id,
			display_name,
			bio,
			country,
			primary_platform,
			niche,
			avatar_url
		)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
	`

	_, err := r.db.Exec(
		query,
		creator.ID,
		creator.UserID,
		creator.DisplayName,
		creator.Bio,
		creator.Country,
		creator.PrimaryPlatform,
		creator.Niche,
		creator.AvatarURL,
	)

	return err
}

func (r *CreatorRepository) GetByUserID(userID string) (*models.Creator, error) {
	query := `
		SELECT
			id,
			user_id,
			display_name,
			bio,
			country,
			primary_platform,
			niche,
			avatar_url,
			created_at,
			updated_at
		FROM creators
		WHERE user_id = $1
	`

	var creator models.Creator

	err := r.db.QueryRow(query, userID).Scan(
		&creator.ID,
		&creator.UserID,
		&creator.DisplayName,
		&creator.Bio,
		&creator.Country,
		&creator.PrimaryPlatform,
		&creator.Niche,
		&creator.AvatarURL,
		&creator.CreatedAt,
		&creator.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &creator, nil
}
