import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ error = "Something went wrong", onRetry }) => {
return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[300px] text-center p-8"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-error/10 to-error/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertCircle" className="w-10 h-10 text-error" />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
</h3>
      
      <p className="text-gray-600 mb-4 max-w-md">
        {error}. Don't worry, we'll get this sorted out.
      </p>
      {onRetry && (
        <Button onClick={onRetry} className="flex items-center gap-2">
          <ApperIcon name="RefreshCw" size={16} />
          Try Again
        </Button>
      )}
    </motion.div>
  )
}

export default Error