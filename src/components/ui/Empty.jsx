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
      className="flex flex-col items-center justify-center min-h-[300px] text-center p-8"
    >
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-full flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-8 h-8 text-primary" />
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
          className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-accent to-secondary rounded-full opacity-20"
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
          className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-primary to-info rounded-full opacity-30"
        />
      </div>
      
<h3 className="text-2xl font-display font-bold gradient-text mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        {description}
      </p>
      {action && (
        <Button 
          onClick={action} 
          className="flex items-center gap-2 px-6 py-3 text-base font-medium"
        >
          <ApperIcon name="Plus" size={18} />
          {actionText}
        </Button>
      )}
    </motion.div>
  )
}

export default Empty