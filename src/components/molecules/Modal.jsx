import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import ApperIcon from '@/components/ApperIcon'
import { cn } from '@/utils/cn'

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "default",
  className 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const sizes = {
    sm: "max-w-md",
    default: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm"
        />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
className={cn(
                "relative w-full bg-white rounded-lg shadow-xl border border-gray-100",
                sizes[size],
                className
              )}
>
              {/* Header */}
<div className="flex items-center justify-between p-6 border-b border-gray-200">
<h2 className="text-2xl font-display font-semibold text-gray-900">
                  {title}
                </h2>
<button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                >
                  <ApperIcon name="X" size={22} />
                </button>
</div>

              {/* Content */}
<div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Modal