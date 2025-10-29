import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
className={cn(
          "flex h-12 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-900 transition-all duration-200",
          "focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
<ApperIcon 
        name="ChevronDown" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" 
      />
    </div>
  )
})

Select.displayName = "Select"

export default Select