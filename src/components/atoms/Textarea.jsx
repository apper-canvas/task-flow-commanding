import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-500 transition-all duration-200",
        "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        "resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export default Textarea