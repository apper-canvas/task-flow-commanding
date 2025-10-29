import { motion } from 'framer-motion'

const Loading = () => {
  return (
<div className="space-y-4 p-4">
      {/* Header skeleton */}
<div className="flex items-center justify-between">
        <div className="h-6 bg-gray-100 rounded-lg w-48 animate-pulse"></div>
        <div className="h-5 bg-gray-100 rounded-full w-20 animate-pulse"></div>
      </div>

      {/* Filter pills skeleton */}
<div className="flex gap-2">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="h-8 bg-gray-100 rounded-full w-16 animate-pulse"
            style={{ animationDelay: `${i * 120}ms` }}
          ></div>
        ))}
      </div>

      {/* Task cards skeleton */}
<div className="space-y-3">
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
className="bg-white rounded-lg p-4 shadow-card border border-gray-200"
          >
            <div className="flex items-start gap-2">
<div className="w-5 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              
              <div className="flex-1 space-y-2">
<div className="flex items-start justify-between">
                  <div className="h-5 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-16 animate-pulse"></div>
                </div>
                
                <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
                
                <div className="flex items-center gap-2">
                  <div className="h-6 bg-gray-100 rounded-full w-18 animate-pulse"></div>
                  <div className="h-6 bg-gray-100 rounded-full w-22 animate-pulse"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating action button skeleton */}
<div className="fixed bottom-8 right-8">
        <div className="w-14 h-14 bg-blue-200 rounded-full animate-pulse shadow-fab"></div>
      </div>
    </div>
  )
}

export default Loading