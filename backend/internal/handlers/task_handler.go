package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/hanayo-dot/tartua-core/internal/models"
	"github.com/hanayo-dot/tartua-core/internal/services"
	"github.com/hanayo-dot/tartua-core/pkg/response"
)

type TaskHandler struct {
	service *services.TaskService
}

func NewTaskHandler(service *services.TaskService) *TaskHandler {
	return &TaskHandler{
		service: service,
	}
}

func (h *TaskHandler) Create(c *gin.Context) {
	var req models.CreateTaskRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	userID := c.GetString("userID")
	goalID := c.Param("goalID")

	if err := h.service.Create(userID, goalID, &req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(c, http.StatusCreated, "Task created successfully", nil)
}

func (h *TaskHandler) GetByGoal(c *gin.Context) {
	userID := c.GetString("userID")
	goalID := c.Param("goalID")

	tasks, err := h.service.GetByGoal(userID, goalID)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Tasks retrieved successfully", tasks)
}

func (h *TaskHandler) GetByID(c *gin.Context) {
	userID := c.GetString("userID")
	goalID := c.Param("goalID")
	taskID := c.Param("taskID")

	task, err := h.service.GetByID(userID, goalID, taskID)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Task retrieved successfully", task)
}

func (h *TaskHandler) Update(c *gin.Context) {
	var req models.UpdateTaskRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	userID := c.GetString("userID")
	goalID := c.Param("goalID")
	taskID := c.Param("taskID")

	if err := h.service.Update(userID, goalID, taskID, &req); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Task updated successfully", nil)
}

func (h *TaskHandler) Delete(c *gin.Context) {
	userID := c.GetString("userID")
	goalID := c.Param("goalID")
	taskID := c.Param("taskID")

	if err := h.service.Delete(userID, goalID, taskID); err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Task deleted successfully", nil)
}
