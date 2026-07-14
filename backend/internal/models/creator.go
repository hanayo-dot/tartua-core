package models

import "time"

type Creator struct {
	ID              string    `json:"id"`
	UserID          string    `json:"user_id"`
	DisplayName     string    `json:"display_name"`
	Bio             string    `json:"bio"`
	Country         string    `json:"country"`
	PrimaryPlatform string    `json:"primary_platform"`
	Niche           string    `json:"niche"`
	AvatarURL       string    `json:"avatar_url"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

type CreateCreatorRequest struct {
	DisplayName     string `json:"display_name" binding:"required"`
	Bio             string `json:"bio"`
	Country         string `json:"country"`
	PrimaryPlatform string `json:"primary_platform"`
	Niche           string `json:"niche"`
	AvatarURL       string `json:"avatar_url"`
}
