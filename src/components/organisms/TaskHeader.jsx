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
        <h1 className="text-4xl font-bold text-gray-800 font-display">
          Task Manager
        </h1>
        <Button
          onClick={onAddTask}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300"
        >
          <ApperIcon name="Plus" size={18} />
          Add Task
        </Button>
      </div>

      {totalTasks > 0 && (
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <ApperIcon name="ListTodo" size={16} className="text-primary" />
            <span className="text-gray-600">
              <span className="font-semibold text-gray-800">{totalTasks}</span> total tasks
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <ApperIcon name="CheckCircle2" size={16} className="text-success" />
            <span className="text-gray-600">
              <span className="font-semibold text-success">{completedTasks}</span> completed
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <ApperIcon name="TrendingUp" size={16} className="text-success" />
            <span className="text-gray-600">
              <span className="font-semibold text-success">{completionRate}%</span> done
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default TaskHeader