// src/App.tsx - Enhanced Task Tracker with Modern UI
import React, { useState, useEffect, useMemo } from "react";
import type { Task } from "./types/Task";
import Header from "./components/Header";
import TaskSummary from "./components/TaskSummary";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ActionButtons from "./components/ActionButtons";
import ClearConfirmationModal from "./components/ClearConfirmationModal";

// --- Main App Component ---
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Initialize theme immediately to prevent flash
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") {
        // Apply theme immediately
        if (stored === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        return stored;
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? "dark" : "light";
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
      return initialTheme;
    }
    return "light";
  });
  const [showConfirmClear, setShowConfirmClear] = useState<boolean>(false);

  // Load tasks and theme from localStorage on initial mount
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
      
      // Theme is already handled in useState initializer
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
  }, []);

  // Save tasks and theme to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
    // Apply theme to document element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      console.log("Dark mode applied");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Light mode applied");
    }
  }, [theme]);

  // --- Task Management Functions ---
  const addTask = (text: string, priority: "high" | "normal") => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority: priority,
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const clearAllTasks = () => {
    setTasks([]);
    setShowConfirmClear(false); // Close confirmation modal
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log(`Toggling theme from ${theme} to ${newTheme}`);
    setTheme(newTheme);
  };

  // --- Computed Values for Display ---
  const completedTasksCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );
  const totalTasksCount = useMemo(() => tasks.length, [tasks]);
  const completionPercentage = useMemo(
    () =>
      totalTasksCount === 0
        ? 0
        : Math.round((completedTasksCount / totalTasksCount) * 100),
    [completedTasksCount, totalTasksCount]
  );

  // Filter and sort tasks based on requirements
  const filteredAndSortedTasks = useMemo(() => {
    let displayTasks = tasks;

    // Filter by completion status if showCompleted is false
    if (!showCompleted) {
      displayTasks = displayTasks.filter((task) => !task.completed);
    }

    // Sort tasks: High priority first, then by creation date (earliest first)
    // Within normal priority, also by creation date (earliest first)
    return displayTasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // Completed tasks at the bottom
      }
      if (a.priority === "high" && b.priority === "normal") {
        return -1; // High priority comes before normal
      }
      if (a.priority === "normal" && b.priority === "high") {
        return 1; // Normal priority comes after high
      }
      // If priorities are the same, or both are high/normal, sort by creation date
      return a.createdAt - b.createdAt;
    });
  }, [tasks, showCompleted]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 transition-all duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-2xl p-8 space-y-6">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <TaskSummary
          completedCount={completedTasksCount}
          totalCount={totalTasksCount}
          percentage={completionPercentage}
        />
        <TaskInput onAddTask={addTask} />
        <TaskList
          tasks={filteredAndSortedTasks}
          onToggleCompletion={toggleTaskCompletion}
          onDeleteTask={deleteTask}
        />
        {(totalTasksCount > 0 || !showCompleted) && (
          <ActionButtons
            showCompleted={showCompleted}
            onToggleShowCompleted={() => setShowCompleted((prev) => !prev)}
            onClearAllTasks={() => setShowConfirmClear(true)}
            totalTasksCount={totalTasksCount}
          />
        )}
        {showConfirmClear && (
          <ClearConfirmationModal
            onConfirm={clearAllTasks}
            onCancel={() => setShowConfirmClear(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
