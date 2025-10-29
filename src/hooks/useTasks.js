import { useState, useEffect } from 'react'
import { taskService } from '@/services/api/taskService'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await taskService.getAll()
      // Sort tasks by order and put completed tasks at the end
      const sortedTasks = data.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        return a.order - b.order
      })
      setTasks(sortedTasks)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error loading tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      return newTask
    } catch (err) {
      setError("Failed to create task. Please try again.")
      throw err
    }
  }

  const updateTask = async (id, updateData) => {
    try {
      const updatedTask = await taskService.update(id, updateData)
      setTasks(prev => prev.map(task => 
        task.Id === id ? updatedTask : task
      ))
      return updatedTask
    } catch (err) {
      setError("Failed to update task. Please try again.")
      throw err
    }
  }

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id)
      setTasks(prev => prev.filter(task => task.Id !== id))
    } catch (err) {
      setError("Failed to delete task. Please try again.")
      throw err
    }
  }

  const toggleTaskComplete = async (id, completed) => {
    try {
      const updatedTask = await taskService.update(id, { completed })
      setTasks(prev => prev.map(task => 
        task.Id === id ? updatedTask : task
      ).sort((a, b) => {
        // Re-sort after completion toggle
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        return a.order - b.order
      }))
      return updatedTask
    } catch (err) {
      setError("Failed to update task. Please try again.")
      throw err
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    refetch: loadTasks
  }
}