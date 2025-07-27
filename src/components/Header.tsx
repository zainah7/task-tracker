import React from "react";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  // SVG for Sun icon (from Lucide React)
  const Sun = (props: React.SVGProps<SVGSVGElement>) => (
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </svg>
  );
  // SVG for Moon icon (from Lucide React)
  const Moon = (props: React.SVGProps<SVGSVGElement>) => (
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );

  return (
    <div className="flex justify-between items-center pb-6 border-b border-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-indigo-600 dark:text-indigo-400 drop-shadow-lg"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 18v-6" />
            <path d="M12 12l-3-3" />
            <path d="M12 12l3-3" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
          TaskFlow
        </h1>
      </div>
      <button
        onClick={toggleTheme}
        className="relative p-2 sm:p-3 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 hover:from-indigo-200 hover:to-purple-200 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
        aria-label="Toggle theme"
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-indigo-700 dark:text-indigo-300 relative z-10" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-600 dark:text-yellow-400 relative z-10" />
        )}
      </button>
    </div>
  );
};

export default Header;
