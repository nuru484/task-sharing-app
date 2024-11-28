import React, { useState } from 'react';
import { createTaskList } from '../api/taskLists';

const CreateTaskListButton: React.FC = () => {
  const [taskListName, setTaskListName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false); // State to toggle the input form visibility

  const handleCreateTaskList = async () => {
    if (taskListName.trim() === '') {
      setError('Task list name cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Call the createTaskList function
      const newTaskList = await createTaskList(taskListName);
      setSuccess(true); // If task list is created successfully
      console.log('Task list created:', newTaskList);
    } catch (error: any) {
      setError(error.message); // If there's an error, display it
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-2 bg-white shadow-lg rounded-lg max-w-sm w-full mx-auto">
      {/* Button to toggle visibility of the input form */}
      {!isFormVisible ? (
        <button
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          onClick={() => setIsFormVisible(true)}
        >
          Create Task List
        </button>
      ) : (
        <div className="w-full mt-4">
          <input
            type="text"
            value={taskListName}
            onChange={(e) => setTaskListName(e.target.value)}
            placeholder="Enter task list name"
            disabled={loading} // Disable input while loading
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Error message */}
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

          {/* Success message */}
          {success && (
            <p className="mt-2 text-green-500 text-sm">
              Task list created successfully!
            </p>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={handleCreateTaskList}
              disabled={loading || taskListName.trim() === ''}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition"
            >
              {loading ? 'Creating...' : 'Create Task List'}
            </button>
            <button
              onClick={() => setIsFormVisible(false)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTaskListButton;
