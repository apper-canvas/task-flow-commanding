import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  categories = []
}) => {
  const [isCompleting, setIsCompleting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleToggleComplete = async () => {
    if (!task.completed) {
      setIsCompleting(true)
      setShowConfetti(true)
      
      setTimeout(() => {
        onToggleComplete(task.Id, !task.completed)
      }, 400)
      
      setTimeout(() => {
        setShowConfetti(false)
      }, 800)
    } else {
      onToggleComplete(task.Id, !task.completed)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-indicator-high'
      case 'medium': return 'priority-indicator-medium'
      case 'low': return 'priority-indicator-low'
      default: return 'priority-indicator-medium'
    }
  }

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'High'
      case 'medium': return 'Medium'
      case 'low': return 'Low'
      default: return 'Medium'
    }
  }

  const getPriorityTextColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error'
      case 'medium': return 'text-warning'
      case 'low': return 'text-info'
      default: return 'text-warning'
    }
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    
    const date = new Date(dateString)
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'MMM d')
  }

  const isDueSoon = (dateString) => {
    if (!dateString) return false
    const date = new Date(dateString)
    return (isToday(date) || isTomorrow(date)) && !task.completed
  }

  const isOverdue = (dateString) => {
    if (!dateString) return false
    const date = new Date(dateString)
    return isPast(date) && !isToday(date) && !task.completed
  }

  const category = categories.find(c => c.name === task.category)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: task.completed && isCompleting ? 0 : 1, 
        y: 0,
        scale: task.completed && isCompleting ? 0.98 : 1
      }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
className={cn(
        "bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 overflow-hidden",
        task.completed && "opacity-70"
      )}
    >
      {/* Priority Indicator Bar */}
      <div className="h-px w-full bg-gray-50" />
      
<div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-1">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              className="relative"
            />
          </div>
          
<div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <button onClick={() => onEdit(task)}>
<h3 className={cn(
                  "text-lg font-display font-semibold text-gray-900 leading-tight",
                  task.completed && "line-through text-gray-400"
                )}>
                  {task.title}
                </h3>
                {/* Strike-through animation line */}
                <AnimatePresence>
                  {isCompleting && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className="absolute top-1/2 left-0 h-0.5 bg-gray-400 strike-through-line"
                    />
                  )}
                </AnimatePresence>
              </button>
              <div className="flex items-center gap-2 flex-shrink-0">
<span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  "text-purple-600 bg-purple-50"
                )}>
                  {getPriorityLabel(task.priority)}
                </span>
                
<Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => onDelete(task.Id)}
                  className="text-gray-400 hover:text-red-600 p-1 min-h-auto transition-colors duration-200"
                >
                  <ApperIcon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
{task.description && (
<p className={cn(
                "text-sm text-gray-600 mb-2 leading-relaxed",
                task.completed && "line-through opacity-60"
              )}>
                {task.description}
              </p>
            )}
<div className="flex items-center gap-2 flex-wrap">
              {category && (
                <span 
                  className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </span>
              )}
              
{task.dueDate && (
<div className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                  isOverdue(task.dueDate) ? "bg-red-50 text-red-600" :
                  isDueSoon(task.dueDate) ? "bg-yellow-50 text-yellow-600" :
                  "bg-gray-50 text-gray-600"
                )}>
                  <ApperIcon name="Calendar" size={13} />
                  {formatDueDate(task.dueDate)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confetti animation */}
      <AnimatePresence>
{showConfetti && (
<div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-300 rounded-full"
                initial={{ 
                  x: '50%', 
                  y: '20%', 
                  scale: 0,
                  rotate: 0,
                  opacity: 0
                }}
                animate={{ 
                  x: `${50 + (Math.random() - 0.5) * 80}%`,
                  y: `${20 + Math.random() * 60}%`,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360,
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 1,
                  delay: i * 0.06,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskCard