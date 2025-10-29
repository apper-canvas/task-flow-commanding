import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const TaskHeader = ({ totalTasks, completedTasks }) => {
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
className="text-center py-4"
    >
<h1 className="text-3xl font-display font-bold gradient-text mb-2">
        Task Flow
      </h1>
<p className="text-gray-600 text-base mb-4">
        Organize your day, accomplish your goals
      </p>
      
{totalTasks > 0 && completedTasks > 0 && (
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            <span className="text-gray-600">
              <span className="font-semibold text-gray-900">{completedTasks}</span> of{" "}
              <span className="font-semibold text-gray-900">{totalTasks}</span> completed
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <ApperIcon name="TrendingUp" size={16} className="text-success" />
            <span className="text-gray-600">
              <span className="font-semibold text-success">{completionPercentage}%</span> done
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default TaskHeader