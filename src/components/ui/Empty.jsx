import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = "No tasks yet!", 
  description = "Click the + button to create your first task and start organizing your day.",
  action,
  actionText = "Create Task"
}) => {
return (
<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[300px] text-center p-12"
    >
<div className="relative mb-8">
<div className="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
className="absolute -top-2 -right-2 w-6 h-6 bg-blue-200 rounded-full opacity-30"
        />
        
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-300 rounded-full opacity-40"
        />
      </div>
      
<h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
        {title}
      </h3>
      
<p className="text-gray-600 mb-8 max-w-md leading-relaxed text-lg">
        {description}
      </p>
      {action && (
<Button 
          onClick={action} 
          className="flex items-center gap-2 px-6 py-3 text-base font-medium bg-blue-500 hover:bg-blue-600"
        >
          <ApperIcon name="Plus" size={18} />
          {actionText}
        </Button>
      )}
    </motion.div>
  )
}

export default Empty