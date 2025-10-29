import { useState, useEffect } from 'react'
import { format } from 'date-fns'
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
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