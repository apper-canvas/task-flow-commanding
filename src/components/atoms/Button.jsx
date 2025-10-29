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
primary: "bg-gradient-to-r from-primary/90 to-secondary/90 hover:from-primary hover:to-secondary text-white shadow-md hover:shadow-lg",
    secondary: "bg-white border border-gray-100 hover:border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm",
    outline: "border-2 border-primary/70 text-primary hover:bg-primary/5 hover:border-primary",
    ghost: "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
    danger: "bg-gradient-to-r from-error/90 to-red-500/90 hover:from-error hover:to-red-600 text-white shadow-md hover:shadow-lg"
  }
  
  const sizes = {
sm: "px-4 py-2 text-sm min-h-[36px]",
    default: "px-4 py-2 text-sm min-h-[44px]",
    lg: "px-6 py-3 text-base min-h-[48px]"
  }

  return (
    <button
className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
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