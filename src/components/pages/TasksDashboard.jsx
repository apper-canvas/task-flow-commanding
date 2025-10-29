import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useTasks } from '@/hooks/useTasks'
import { useCategories } from '@/hooks/useCategories'
import TaskHeader from '@/components/organisms/TaskHeader'
import TaskList from '@/components/organisms/TaskList'
import PriorityFilter from '@/components/molecules/PriorityFilter'
import Modal from '@/components/molecules/Modal'
import TaskForm from '@/components/molecules/TaskForm'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'

const TasksDashboard = () => {
  const { tasks, loading, error, createTask, updateTask, deleteTask, toggleTaskComplete, refetch } = useTasks()
  const { categories, loading: categoriesLoading } = useCategories()
  
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  // Filter tasks based on selected priority
  const filteredTasks = useMemo(() => {
    if (!tasks) return []
    
    if (selectedPriority === 'all') {
      return tasks
    }
    
    return tasks.filter(task => task.priority === selectedPriority)
  }, [tasks, selectedPriority])

  // Calculate task counts for filter badges
  const taskCounts = useMemo(() => {
    if (!tasks) return {}
    
    return {
      all: tasks.filter(t => !t.completed).length,
      high: tasks.filter(t => t.priority === 'high' && !t.completed).length,
      medium: tasks.filter(t => t.priority === 'medium' && !t.completed).length,
      low: tasks.filter(t => t.priority === 'low' && !t.completed).length
    }
  }, [tasks])

  // Calculate completion stats
  const totalTasks = tasks?.length || 0
  const completedTasks = tasks?.filter(t => t.completed).length || 0

  const handleCreateTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleSubmitTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.Id, taskData)
        toast.success('Task updated successfully!')
      } else {
        await createTask(taskData)
        toast.success('Task created successfully!')
      }
      setIsModalOpen(false)
      setEditingTask(null)
    } catch (error) {
      toast.error(editingTask ? 'Failed to update task' : 'Failed to create task')
    }
  }

  const handleToggleComplete = async (id, completed) => {
    try {
      await toggleTaskComplete(id, completed)
      if (completed) {
        toast.success('Great job! Task completed! 🎉')
      } else {
        toast.info('Task marked as incomplete')
      }
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id)
        toast.success('Task deleted successfully')
      } catch (error) {
        toast.error('Failed to delete task')
      }
    }
  }

  if (loading || categoriesLoading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} onRetry={refetch} />
  }

return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-2">
{/* Header */}
        <TaskHeader 
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          onAddTask={handleCreateTask}
        />
{/* Priority Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2"
        >
          <PriorityFilter
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
            taskCounts={taskCounts}
          />
        </motion.div>

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onCreateTask={handleCreateTask}
            categories={categories}
          />
        </motion.div>


        {/* Task Form Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTask(null)
          }}
          title={editingTask ? 'Edit Task' : 'Create New Task'}
          size="lg"
        >
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmitTask}
            onCancel={() => {
              setIsModalOpen(false)
              setEditingTask(null)
            }}
            categories={categories}
          />
        </Modal>
      </div>
    </div>
  )
}

export default TasksDashboard