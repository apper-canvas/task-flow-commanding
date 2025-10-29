import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const TaskHeader = ({ totalTasks, completedTasks, onAddTask }) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
<motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between gap-4">
<h1 className="text-4xl font-bold text-gray-900 font-display">
          Task Manager
        </h1>
<Button
          onClick={onAddTask}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
        >
          <ApperIcon name="Plus" size={18} />
          Add Task
        </Button>
      </div>

      {totalTasks > 0 && (
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
<ApperIcon name="ListTodo" size={16} className="text-blue-500" />
            <span className="text-gray-600">
<span className="font-semibold text-gray-900">{totalTasks}</span> total tasks
            </span>
          </div>
          
          <div className="flex items-center gap-2">
<ApperIcon name="CheckCircle2" size={16} className="text-green-500" />
            <span className="text-gray-600">
<span className="font-semibold text-green-600">{completedTasks}</span> completed
            </span>
          </div>
          
          <div className="flex items-center gap-2">
<ApperIcon name="TrendingUp" size={16} className="text-green-500" />
            <span className="text-gray-600">
<span className="font-semibold text-green-600">{completionRate}%</span> done
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default TaskHeader