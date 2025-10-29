import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { cn } from '@/utils/cn'

const FloatingActionButton = ({ onClick, className, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-fab hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50",
        "focus:outline-none focus:ring-4 focus:ring-primary/20",
        className
      )}
      {...props}
    >
      <ApperIcon name="Plus" size={24} />
    </motion.button>
  )
}

export default FloatingActionButton