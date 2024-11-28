import React, { useState, useEffect } from 'react';
import {
  fetchSharedTaskLists,
  updateSharedTaskList,
} from '../api/sharedTaskslist';

interface Task {
  id: string;
  title: string;
  description: string;
  is_complete: boolean;
  task_list_id: string;
}

interface TaskList {
  id: string;
  name: string;
  permission: string;
  task_list: {
    id: number;
    name: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    tasks: Task[];
  };
}

const SharedTaskLists: React.FC = () => {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editTaskListId, setEditTaskListId] = useState<string | null>(null);
  const [newTaskListName, setNewTaskListName] = useState<string>('');

  useEffect(() => {
    const loadSharedTaskLists = async () => {
      try {
        const fetchedTaskLists = await fetchSharedTaskLists();
        setTaskLists(fetchedTaskLists);
        console.log(fetchedTaskLists);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unexpected error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    loadSharedTaskLists();
  }, []);

  const handleUpdateTaskList = async (taskListId: string, newName: string) => {
    try {
      const updatedTaskList = await updateSharedTaskList(taskListId, newName);
      setTaskLists((prevTaskLists) =>
        prevTaskLists.map((taskList) =>
          taskList.id === taskListId
            ? { ...taskList, name: updatedTaskList.name }
            : taskList
        )
      );
      setEditTaskListId(null); // Exit edit mode after update
      setNewTaskListName('');
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to update task list'
      );
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-2 lg:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Shared Task Lists
      </h1>
      {taskLists.length > 0 ? (
        <ul className="space-y-6">
          {taskLists.map((taskList) => (
            <li
              key={taskList.id}
              className="p-4 lg:p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  {editTaskListId === taskList.id ? (
                    <input
                      type="text"
                      value={newTaskListName}
                      onChange={(e) => setNewTaskListName(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {taskList.task_list.name}
                    </h2>
                  )}
                  <p className="text-sm text-gray-500">
                    Permission: {taskList.permission}
                  </p>
                </div>
                {taskList.permission === 'edit' && (
                  <div className="flex items-center space-x-2">
                    {editTaskListId === taskList.id ? (
                      <button
                        onClick={() =>
                          handleUpdateTaskList(taskList.id, newTaskListName)
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditTaskListId(taskList.id);
                          setNewTaskListName(taskList.task_list.name); // Pre-fill with the current name
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      >
                        Edit Task List
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-700">Tasks:</h3>
                <ul className="space-y-4 mt-2">
                  {taskList.task_list.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:bg-gray-50 transition-all"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {task.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {task.is_complete ? 'Completed' : 'Not Completed'}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No shared task lists found.</p>
      )}
    </div>
  );
};

export default SharedTaskLists;
