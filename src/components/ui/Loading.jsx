import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 animate-pulse"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-24 animate-pulse"></div>
      </div>

      {/* Filter pills skeleton */}
      <div className="flex gap-3">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="h-9 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          ></div>
        ))}
      </div>

      {/* Task cards skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md animate-pulse"></div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse"></div>
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16 animate-pulse"></div>
                </div>
                
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 animate-pulse"></div>
                
                <div className="flex items-center gap-3">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-20 animate-pulse"></div>
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating action button skeleton */}
      <div className="fixed bottom-6 right-6">
        <div className="w-14 h-14 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full animate-pulse shadow-fab"></div>
      </div>
    </div>
  )
}

export default Loading