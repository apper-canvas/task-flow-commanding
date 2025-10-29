import taskData from "@/services/mockData/tasks.json";
import React from "react";

const { ApperClient } = window.ApperSDK

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
})

let tasks = [...taskData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(200)
    return tasks.map(task => ({ ...task }))
  },

  async getById(id) {
    await delay(150)
    const task = tasks.find(t => t.Id === parseInt(id))
    return task ? { ...task } : null
  },

  async create(taskData) {
    await delay(300)
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      category: taskData.category || "Work",
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      order: tasks.length + 1
    }
    tasks.push(newTask)
    this.saveToLocalStorage()
    return { ...newTask }
  },

  async update(id, updateData) {
    await delay(250)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) return null
    
    tasks[index] = { ...tasks[index], ...updateData }
    if (updateData.completed === true && !tasks[index].completedAt) {
      tasks[index].completedAt = new Date().toISOString()
    } else if (updateData.completed === false) {
      tasks[index].completedAt = null
    }
    
    this.saveToLocalStorage()
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay(200)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) return false
    
    tasks.splice(index, 1)
    this.saveToLocalStorage()
    return true
  },

  async reorderTasks(taskIds) {
    await delay(150)
    taskIds.forEach((id, index) => {
      const task = tasks.find(t => t.Id === parseInt(id))
      if (task) {
        task.order = index + 1
      }
    })
    tasks.sort((a, b) => a.order - b.order)
    this.saveToLocalStorage()
    return tasks.map(task => ({ ...task }))
  },

  saveToLocalStorage() {
    try {
      localStorage.setItem('taskflow-tasks', JSON.stringify(tasks))
    } catch (error) {
      console.warn('Could not save tasks to localStorage:', error)
    }
  },

loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('taskflow-tasks')
      if (saved) {
        tasks = JSON.parse(saved)
      }
    } catch (error) {
      console.warn('Could not load tasks from localStorage:', error)
    }
  },

  async generateDescription(title) {
    try {
      const result = await apperClient.functions.invoke(
        import.meta.env.VITE_GENERATE_TASK_DESCRIPTION,
        {
          body: JSON.stringify({ title }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (result.success === false) {
        console.info(`apper_info: Got an error in this function: ${import.meta.env.VITE_GENERATE_TASK_DESCRIPTION}. The response body is: ${JSON.stringify(result)}.`)
        return { success: false, error: result.error || 'Failed to generate description' }
      }

      return result
    } catch (error) {
      console.info(`apper_info: Got this error in this function: ${import.meta.env.VITE_GENERATE_TASK_DESCRIPTION}. The error is: ${error.message}`)
      return { success: false, error: error.message }
    }
  }
}

// Initialize localStorage on service load
taskService.loadFromLocalStorage()