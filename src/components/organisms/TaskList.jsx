import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'
import Empty from '@/components/ui/Empty'

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onCreateTask,
  categories = [],
  emptyMessage = "No tasks found"
}) => {
  if (!tasks || tasks.length === 0) {
    return (
      <Empty
        title="No tasks yet!"
        description="Click the + button to create your first task and start organizing your day."
        action={onCreateTask}
        actionText="Create Task"
      />
    )
  }

  return (
<div className="space-y-3">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              categories={categories}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList