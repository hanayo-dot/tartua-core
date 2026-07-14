package models

type Platform struct {
	ID         string  `json:"id"`
	Name       string  `json:"name"`
	Username   string  `json:"username"`
	Connected  bool    `json:"connected"`
	Followers  int     `json:"followers"`
	Views      int     `json:"views"`
	Engagement float64 `json:"engagement"`
}

type ConnectPlatformRequest struct {
	Name     string `json:"name" binding:"required"`
	Username string `json:"username" binding:"required"`
}
