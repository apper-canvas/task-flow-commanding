import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = forwardRef(({ className, checked, onChange, ...props }, ref) => {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <div
        onClick={() => onChange && onChange({ target: { checked: !checked } })}
        className={cn(
          "w-6 h-6 rounded-md border-2 cursor-pointer transition-all duration-200 flex items-center justify-center",
          checked 
            ? "bg-gradient-to-r from-primary to-secondary border-transparent shadow-md" 
            : "border-gray-300 hover:border-gray-400 bg-white",
          className
        )}
      >
        <motion.div
          initial={false}
          animate={{ 
            scale: checked ? 1 : 0,
            opacity: checked ? 1 : 0
          }}
          transition={{ duration: 0.15 }}
        >
          <ApperIcon name="Check" className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </motion.div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox