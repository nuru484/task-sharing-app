import React, { useState } from 'react';
import { createTask } from '../api/tasks';

interface AddTaskButtonProps {
  taskListId: number;
  onTaskAdded: (task: {
    id: number;
    title: string;
    description: string;
  }) => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({
  taskListId,
  onTaskAdded,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    try {
      const newTask = await createTask(String(taskListId), {
        title,
        description,
      });
      onTaskAdded(newTask);
      setIsAdding(false);
      setTitle('');
      setDescription('');
    } catch (error: any) {
      alert(`Failed to create task: ${error.message}`);
    }
  };

  return (
    <div className="mt-4">
      {isAdding ? (
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="p-2 border rounded-md w-full"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description (optional)"
            className="p-2 border rounded-md w-full"
          />
          <div className="flex gap-2">
            <button
              className="text-green-500 hover:text-green-700"
              onClick={handleAddTask}
            >
              Save
            </button>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => setIsAdding(true)}
        >
          + Add Task
        </button>
      )}
    </div>
  );
};

export default AddTaskButton;
