import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const PriorityFilter = ({ 
  selectedPriority, 
  onPriorityChange,
  taskCounts = {}
}) => {
  const priorities = [
{ value: 'all', label: 'All', color: 'bg-gray-50 text-gray-700' },
    { value: 'high', label: 'High', color: 'bg-red-50 text-red-600' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-50 text-yellow-700' },
    { value: 'low', label: 'Low', color: 'bg-purple-50 text-purple-600' }
  ]
return (
    <div className="flex gap-1 flex-wrap">
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
              "px-2.5 py-1 rounded-full text-sm font-medium transition-all duration-200 min-h-[28px] flex items-center gap-1.5",
              isActive
                ? "bg-purple-600 text-white shadow-card"
                : priority.color
            )}
          >
            {priority.label}
            {count > 0 && (
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full font-semibold",
isActive 
                  ? "bg-white/30 text-white" 
                  : "bg-white text-gray-700"
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