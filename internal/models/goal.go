package models

import "time"

type Goal struct {
	ID        string `json:"id"`
	CreatorID string `json:"creator_id"`

	Title       string `json:"title"`
	Description string `json:"description"`

	Status   string `json:"status"`
	Priority string `json:"priority"`

	TargetDate time.Time `json:"target_date"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CreateGoalRequest struct {
	Title       string    `json:"title" binding:"required"`
	Description string    `json:"description"`
	Priority    string    `json:"priority"`
	TargetDate  time.Time `json:"target_date"`
}
