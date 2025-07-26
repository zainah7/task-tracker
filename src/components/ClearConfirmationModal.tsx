import React from "react";

interface ClearConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ClearConfirmationModal: React.FC<ClearConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="glass-effect rounded-2xl p-8 shadow-2xl space-y-6 max-w-md w-full transform animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            Clear All Tasks?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            This will permanently delete all your tasks. This action cannot be undone.
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="btn-secondary flex-1 justify-center"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger flex-1 justify-center"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearConfirmationModal;
