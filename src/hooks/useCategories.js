import { useState, useEffect } from 'react'
import { categoryService } from '@/services/api/categoryService'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadCategories = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError("Failed to load categories. Please try again.")
      console.error("Error loading categories:", err)
    } finally {
      setLoading(false)
    }
  }

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData)
      setCategories(prev => [...prev, newCategory])
      return newCategory
    } catch (err) {
      setError("Failed to create category. Please try again.")
      throw err
    }
  }

  const updateCategory = async (id, updateData) => {
    try {
      const updatedCategory = await categoryService.update(id, updateData)
      setCategories(prev => prev.map(category => 
        category.Id === id ? updatedCategory : category
      ))
      return updatedCategory
    } catch (err) {
      setError("Failed to update category. Please try again.")
      throw err
    }
  }

  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id)
      setCategories(prev => prev.filter(category => category.Id !== id))
    } catch (err) {
      setError("Failed to delete category. Please try again.")
      throw err
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch: loadCategories
  }
}