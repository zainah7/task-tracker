import React, { useState } from "react";


interface TaskInputProps {
  onAddTask: (text: string, priority: "high" | "normal") => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "normal">(
    "normal"
  );
  const [showInputError, setShowInputError] = useState<boolean>(false);

  // SVG for Plus icon (from Lucide React)
  const Plus = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );

  const handleAddTask = () => {
    if (newTaskText.trim() === "") {
      setShowInputError(true);
      return;
    }
    setShowInputError(false);
    onAddTask(newTaskText, newTaskPriority);
    setNewTaskText("");
    setNewTaskPriority("normal"); // Reset priority after adding
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTaskText}
            onChange={(e) => {
              setNewTaskText(e.target.value);
              setShowInputError(false);
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            className={`w-full h-12 px-4 py-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-opacity-20 ${
              showInputError
                ? "border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-red-500"
                : "border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-indigo-500"
            } backdrop-blur-sm text-gray-900 dark:text-gray-100`}
          />
          {showInputError && (
            <div className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-500 dark:text-red-400 text-xs font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Task cannot be empty!</span>
            </div>
          )}
        </div>
        <button
          onClick={handleAddTask}
          className="btn-primary h-12 px-6 rounded-xl flex items-center space-x-2 group"
          aria-label="Add task"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          <span className="hidden sm:inline font-semibold">Add</span>
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input
              type="radio"
              name="priority"
              value="normal"
              checked={newTaskPriority === "normal"}
              onChange={() => setNewTaskPriority("normal")}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
              newTaskPriority === "normal"
                ? "border-indigo-500 bg-indigo-500 shadow-lg shadow-indigo-500/30"
                : "border-gray-300 dark:border-gray-600 group-hover:border-indigo-400"
            }`}>
              {newTaskPriority === "normal" && (
                <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Normal Priority
          </span>
        </label>
        
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input
              type="radio"
              name="priority"
              value="high"
              checked={newTaskPriority === "high"}
              onChange={() => setNewTaskPriority("high")}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
              newTaskPriority === "high"
                ? "border-red-500 bg-red-500 shadow-lg shadow-red-500/30"
                : "border-gray-300 dark:border-gray-600 group-hover:border-red-400"
            }`}>
              {newTaskPriority === "high" && (
                <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            High Priority
          </span>
        </label>
      </div>
    </div>
  );
};

export default TaskInput;
