import React, { useEffect, useState } from 'react';
import {
  fetchTaskLists,
  updateTaskList,
  deleteTaskList,
} from '../api/taskLists';
import { shareTaskList } from '../api/sharedTaskslist';
import { updateTask, deleteTask } from '../api/tasks';
import { Edit3, Trash2, Share2, ChevronDown, ChevronRight } from 'lucide-react';
import AddTaskButton from './AddTaskButton';

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
  task_list_id: number;
}

interface TasksList {
  id: number;
  name: string;
  tasks: Task[];
}

const TasksList: React.FC = () => {
  const [taskLists, setTaskLists] = useState<TasksList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedList, setExpandedList] = useState<number | null>(null);
  const [editingTaskList, setEditingTaskList] = useState<number | null>(null);
  const [taskListName, setTaskListName] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTaskLists = async () => {
      try {
        const taskListsData = await fetchTaskLists();
        setTaskLists(taskListsData);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadTaskLists();
  }, []);

  const handleToggleExpand = (listId: number) => {
    setExpandedList((prev) => (prev === listId ? null : listId));
  };

  const handleEditTaskList = (listId: number, currentName: string) => {
    setEditingTaskList(listId);
    setTaskListName(currentName);
  };

  const handleUpdateTaskList = async (listId: number) => {
    if (!taskListName.trim()) return;

    try {
      const updatedTaskList = await updateTaskList(
        String(listId),
        taskListName
      );
      setTaskLists((prev) =>
        prev.map((list) =>
          list.id === listId ? { ...list, name: updatedTaskList.name } : list
        )
      );
      setEditingTaskList(null);
    } catch (err: any) {
      alert(`Error updating task list: ${err.message}`);
    }
  };

  const handleDeleteTaskList = async (listId: number) => {
    if (!window.confirm('Are you sure you want to delete this task list?'))
      return;

    try {
      await deleteTaskList(String(listId));
      setTaskLists((prev) => prev.filter((list) => list.id !== listId));
    } catch (err: any) {
      alert(`Error deleting task list: ${err.message}`);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    try {
      const updatedTask = await updateTask(String(editingTask.id), {
        title: editingTask.title,
        description: editingTask.description,
      });
      setTaskLists((prev) =>
        prev.map((list) =>
          list.tasks.some((task) => task.id === editingTask.id)
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === editingTask.id
                    ? { ...task, ...updatedTask }
                    : task
                ),
              }
            : list
        )
      );
      setEditingTask(null);
    } catch (err: any) {
      alert(`Error updating task: ${err.message}`);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(String(taskId));
      setTaskLists((prev) =>
        prev.map((list) => ({
          ...list,
          tasks: list.tasks.filter((task) => task.id !== taskId),
        }))
      );
    } catch (err: any) {
      alert(`Error deleting task: ${err.message}`);
    }
  };

  const handleShareTaskList = async (listId: number) => {
    const username = prompt('Enter the username to share with:');
    if (!username) return;

    const permission = prompt('Enter permission ("view" or "edit"):');
    if (!permission || (permission !== 'view' && permission !== 'edit')) {
      alert('Invalid permission. Please choose "view" or "edit".');
      return;
    }

    try {
      const message = await shareTaskList(String(listId), username, permission);
      alert(message);
    } catch (err: any) {
      alert(`Error sharing task list: ${err.message}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-2 lg:peer-last-of-type:-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-100 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">My Task Lists</h2>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
            <p className="text-red-700">Error: {error}</p>
          </div>
        )}

        <ul className="divide-y divide-gray-200">
          {taskLists.map((taskList) => (
            <li
              key={taskList.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                {editingTaskList === taskList.id ? (
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      value={taskListName}
                      onChange={(e) => setTaskListName(e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      onClick={() => handleUpdateTaskList(taskList.id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                      onClick={() => setEditingTaskList(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center w-full">
                    <div
                      onClick={() => handleToggleExpand(taskList.id)}
                      className="flex items-center cursor-pointer group flex-grow"
                    >
                      {expandedList === taskList.id ? (
                        <ChevronDown className="mr-2 text-gray-500 group-hover:text-gray-700" />
                      ) : (
                        <ChevronRight className="mr-2 text-gray-500 group-hover:text-gray-700" />
                      )}
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {taskList.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        className="text-yellow-500 hover:text-yellow-700 p-2 rounded-full hover:bg-yellow-50 transition-colors"
                        onClick={() =>
                          handleEditTaskList(taskList.id, taskList.name)
                        }
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        onClick={() => handleDeleteTaskList(taskList.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                        onClick={() => handleShareTaskList(taskList.id)}
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {expandedList === taskList.id && (
                <div className="mt-4 pl-8">
                  <ul className="space-y-3">
                    {taskList.tasks.length > 0 ? (
                      taskList.tasks.map((task) => (
                        <li
                          key={task.id}
                          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                        >
                          {editingTask?.id === task.id ? (
                            <div>
                              <input
                                type="text"
                                value={editingTask.title}
                                onChange={(e) =>
                                  setEditingTask((prev) =>
                                    prev
                                      ? { ...prev, title: e.target.value }
                                      : null
                                  )
                                }
                                className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              />
                              <textarea
                                value={editingTask.description}
                                placeholder="Task Description"
                                onChange={(e) =>
                                  setEditingTask((prev) =>
                                    prev
                                      ? { ...prev, description: e.target.value }
                                      : null
                                  )
                                }
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                rows={3}
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                                  onClick={handleUpdateTask}
                                >
                                  Save
                                </button>
                                <button
                                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                  onClick={() => setEditingTask(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-800">
                                  {task.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {task.description}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  className="text-yellow-500 hover:text-yellow-700 p-2 rounded-full hover:bg-yellow-50 transition-colors"
                                  onClick={() => handleEditTask(task)}
                                >
                                  <Edit3 size={18} />
                                </button>
                                <button
                                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                  onClick={() => handleDeleteTask(task.id)}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          )}
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">
                        No tasks available.
                      </p>
                    )}
                  </ul>
                  <div className="mt-4">
                    <AddTaskButton
                      taskListId={taskList.id}
                      onTaskAdded={(newTask) =>
                        setTaskLists((prev) =>
                          prev.map((list) =>
                            list.id === taskList.id
                              ? {
                                  ...list,
                                  tasks: [...list.tasks, { ...newTask }],
                                }
                              : list
                          )
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TasksList;
