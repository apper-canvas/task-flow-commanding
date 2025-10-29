import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-card hover:shadow-card-hover",
    secondary: "bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 shadow-card",
    outline: "border border-blue-500 text-blue-600 hover:bg-blue-50",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-card hover:shadow-card-hover"
  }
  
  const sizes = {
sm: "px-4 py-2 text-sm min-h-[36px]",
    default: "px-4 py-2 text-sm min-h-[44px]",
    lg: "px-6 py-3 text-base min-h-[48px]"
  }

  return (
    <button
className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button