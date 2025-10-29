import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { taskService } from '@/services/api/taskService'
import Input from '@/components/atoms/Input'
import Textarea from '@/components/atoms/Textarea'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const TaskForm = ({ 
  task = null, 
  onSubmit, 
  onCancel,
  categories = []
}) => {
const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: 'Work'
  })
  const [generatingDesc, setGeneratingDesc] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || '',
        category: task.category || 'Work'
      })
    }
  }, [task])
const handleGenerateDescription = async () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a task title first')
      return
    }

    setGeneratingDesc(true)
    try {
      const result = await taskService.generateDescription(formData.title)
      
      if (result.success) {
        setFormData(prev => ({ ...prev, description: result.description }))
        toast.success('Description generated successfully!')
      } else {
        toast.error(result.error || 'Failed to generate description')
      }
    } catch (error) {
      toast.error('An error occurred while generating description')
    } finally {
      setGeneratingDesc(false)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return
    
    onSubmit({
      ...formData,
      dueDate: formData.dueDate || null
    })
  }

  const setQuickDate = (days) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    setFormData(prev => ({
      ...prev,
      dueDate: format(date, 'yyyy-MM-dd')
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Task Title
        </label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter task title..."
          required
          autoFocus
        />
      </div>

      {/* Description */}
<div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <button
            type="button"
            onClick={handleGenerateDescription}
            disabled={generatingDesc || !formData.title.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generatingDesc ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <ApperIcon name="Sparkles" size={14} />
                Generate Description
              </>
            )}
          </button>
        </div>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Add more details..."
          rows={3}
        />
      </div>

      {/* Priority and Category Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <Select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <Select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          >
            {categories.map(category => (
              <option key={category.Id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Due Date
        </label>
        <div className="space-y-3">
          <Input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
          />
          
          {/* Quick date buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setQuickDate(0)}
              className="flex items-center gap-1"
            >
              <ApperIcon name="Sun" size={14} />
              Today
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setQuickDate(1)}
              className="flex items-center gap-1"
            >
              <ApperIcon name="Sunrise" size={14} />
              Tomorrow
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setQuickDate(7)}
              className="flex items-center gap-1"
            >
              <ApperIcon name="Calendar" size={14} />
              Next Week
            </Button>
            {formData.dueDate && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, dueDate: '' }))}
                className="flex items-center gap-1 text-gray-500"
              >
                <ApperIcon name="X" size={14} />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2"
          disabled={!formData.title.trim()}
        >
          <ApperIcon name={task ? "Save" : "Plus"} size={16} />
          {task ? "Update Task" : "Create Task"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="px-6"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TaskForm