import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-full flex items-center justify-center">
              <ApperIcon name="Search" className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          {/* Floating elements */}
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
            className="absolute top-8 left-8 w-4 h-4 bg-gradient-to-br from-accent to-secondary rounded-full opacity-30"
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
            className="absolute bottom-8 right-8 w-6 h-6 bg-gradient-to-br from-primary to-info rounded-full opacity-20"
          />
        </div>

        <h1 className="text-6xl font-display font-bold gradient-text mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-display font-semibold text-gray-900 mb-3">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. Let's get you back to organizing your tasks!
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 mx-auto"
          >
            <ApperIcon name="Home" size={18} />
            Back to Tasks
          </Button>
          
          <Button 
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 mx-auto text-sm"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound