import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const PriorityFilter = ({ 
  selectedPriority, 
  onPriorityChange,
  taskCounts = {}
}) => {
  const priorities = [
    { value: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
    { value: 'high', label: 'High', color: 'bg-error/10 text-error' },
    { value: 'medium', label: 'Medium', color: 'bg-warning/10 text-warning' },
    { value: 'low', label: 'Low', color: 'bg-info/10 text-info' }
  ]

  return (
<div className="flex gap-1.5 flex-wrap">
      {priorities.map(priority => {
        const isActive = selectedPriority === priority.value
        const count = taskCounts[priority.value] || 0
        
        return (
          <motion.button
            key={priority.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPriorityChange(priority.value)}
            className={cn(
"px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 min-h-[32px] flex items-center gap-1.5",
              isActive
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : priority.color
            )}
          >
            {priority.label}
            {count > 0 && (
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full font-semibold",
                isActive 
                  ? "bg-white/20 text-white" 
                  : "bg-white/80 text-gray-700"
              )}>
                {count}
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

export default PriorityFilter