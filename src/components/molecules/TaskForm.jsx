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
<form onSubmit={handleSubmit} className="space-y-5">
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
<div className="space-y-4">
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
              className="flex items-center gap-1.5 hover:bg-purple-50 hover:text-purple-600"
            >
              <ApperIcon name="Sun" size={15} />
              Today
            </Button>
<Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setQuickDate(1)}
              className="flex items-center gap-1.5 hover:bg-purple-50 hover:text-purple-600"
            >
              <ApperIcon name="Sunrise" size={15} />
              Tomorrow
            </Button>
<Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setQuickDate(7)}
              className="flex items-center gap-1.5 hover:bg-purple-50 hover:text-purple-600"
            >
              <ApperIcon name="Calendar" size={15} />
              Next Week
            </Button>
            {formData.dueDate && (
<Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, dueDate: '' }))}
                className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600"
              >
                <ApperIcon name="X" size={15} />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
<div className="flex gap-3 pt-6">
          <Button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
            disabled={!formData.title.trim()}
          >
            <ApperIcon name={task ? "Save" : "Plus"} size={17} />
            {task ? "Update Task" : "Create Task"}
          </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="px-8"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TaskForm