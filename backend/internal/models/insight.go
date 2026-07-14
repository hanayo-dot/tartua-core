package models

type Insight struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Type        string `json:"type"`
}
