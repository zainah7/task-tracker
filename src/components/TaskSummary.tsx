import React from "react";

interface TaskSummaryProps {
  completedCount: number;
  totalCount: number;
  percentage: number;
}

const TaskSummary: React.FC<TaskSummaryProps> = ({
  completedCount,
  totalCount,
  percentage,
}) => {
  return (
    <div className="task-card p-6 text-center space-y-4">
      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      
      <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
        </div>
      </div>
      
      <div className="flex justify-center items-center space-x-6">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
            {completedCount}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Completed</div>
        </div>
        
        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
        
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
            {totalCount}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total</div>
        </div>
        
        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
        
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-red-400">
            {totalCount - completedCount}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Remaining</div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
