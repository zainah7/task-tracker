import React from "react";
import type { Task } from "../types/Task";
import TaskItem from "./TaskItem"; 

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleCompletion,
  onDeleteTask,
}) => {
  return (
    <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
          No tasks yet. Add one!
        </p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleCompletion={onToggleCompletion}
            onDeleteTask={onDeleteTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
