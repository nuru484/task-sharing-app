const serverURL = import.meta.env.VITE_SERVER_URL;

// Fetch all tasks for a specific task list
export const fetchTasks = async (taskListId: string) => {
  try {
    const response = await fetch(
      `${serverURL}/api/task-lists/${taskListId}/tasks`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch tasks.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data; // Array of tasks
    } else {
      throw new Error(
        data.message || 'An error occurred while fetching tasks.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'An error occurred while fetching tasks.');
  }
};

// Create a task in a specific task list
export const createTask = async (
  taskListId: string,
  task: { title: string; description?: string; is_complete?: boolean }
) => {
  try {
    const response = await fetch(
      `${serverURL}/api/task-lists/${taskListId}/tasks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create task.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data; // Newly created task
    } else {
      throw new Error(data.message || 'An error occurred while creating task.');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'An error occurred while creating task.');
  }
};

// Fetch a specific task by ID
export const fetchTask = async (taskId: string) => {
  try {
    const response = await fetch(`${serverURL}/api/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch task.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data; // The specific task
    } else {
      throw new Error(data.message || 'An error occurred while fetching task.');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'An error occurred while fetching task.');
  }
};

// Update a task
export const updateTask = async (
  taskId: string,
  updates: { title?: string; description?: string; is_complete?: boolean }
) => {
  try {
    const response = await fetch(`${serverURL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update task.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data; // Updated task
    } else {
      throw new Error(data.message || 'An error occurred while updating task.');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'An error occurred while updating task.');
  }
};

// Delete a task
export const deleteTask = async (taskId: string) => {
  try {
    const response = await fetch(`${serverURL}/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete task.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.message || 'Task deleted successfully.';
    } else {
      throw new Error(data.message || 'An error occurred while deleting task.');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'An error occurred while deleting task.');
  }
};
