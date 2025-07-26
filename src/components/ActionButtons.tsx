// src/components/ActionButtons.tsx - Enhanced Action Buttons
import React from "react";

interface ActionButtonsProps {
  showCompleted: boolean;
  onToggleShowCompleted: () => void;
  onClearAllTasks: () => void;
  totalTasksCount: number;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  showCompleted,
  onToggleShowCompleted,
  onClearAllTasks,
  totalTasksCount,
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
      <button
        onClick={onToggleShowCompleted}
        className="btn-secondary flex items-center space-x-2 group"
      >
        <svg className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
        <span className="font-semibold">
          {showCompleted ? "Hide Completed" : "Show All Tasks"}
        </span>
      </button>

      {totalTasksCount > 0 && (
        <button
          onClick={onClearAllTasks}
          className="btn-danger flex items-center space-x-2 group"
        >
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Clear All</span>
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
