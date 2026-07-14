package models

type Dashboard struct {
	TotalGoals     int     `json:"total_goals"`
	CompletedGoals int     `json:"completed_goals"`
	ActiveGoals    int     `json:"active_goals"`
	TotalTasks     int     `json:"total_tasks"`
	CompletedTasks int     `json:"completed_tasks"`
	PendingTasks   int     `json:"pending_tasks"`
	CompletionRate float64 `json:"completion_rate"`
}
