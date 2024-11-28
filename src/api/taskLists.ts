// src/api/taskLists.ts
const serverURL = import.meta.env.VITE_SERVER_URL;

export const fetchTaskLists = async () => {
  try {
    const response = await fetch(`${serverURL}/api/taskslist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch task lists.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      console.log(data.data);
      return data.data; // Array of task lists
    } else {
      throw new Error(
        data.message || 'An error occurred while fetching task lists.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while fetching task lists.'
    );
  }
};

export const createTaskList = async (name: string) => {
  try {
    const response = await fetch(`${serverURL}/api/taskslist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error('Failed to create task list.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data;
    } else {
      throw new Error(
        data.message || 'An error occurred while creating task list.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while creating task list.'
    );
  }
};

export const fetchTaskList = async (taskListId: string) => {
  try {
    const response = await fetch(`${serverURL}/api/taskslist/${taskListId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch task list.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data; // The task list data with tasks
    } else {
      throw new Error(
        data.message || 'An error occurred while fetching task list.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while fetching task list.'
    );
  }
};

export const updateTaskList = async (taskListId: string, name: string) => {
  try {
    const response = await fetch(`${serverURL}/api/taskslist/${taskListId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error('Failed to update task list.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data; // The updated task list
    } else {
      throw new Error(
        data.message || 'An error occurred while updating task list.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while updating task list.'
    );
  }
};

export const deleteTaskList = async (taskListId: string) => {
  try {
    const response = await fetch(`${serverURL}/api/taskslist/${taskListId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete task list.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.message || 'Task list deleted successfully.';
    } else {
      throw new Error(
        data.message || 'An error occurred while deleting task list.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while deleting task list.'
    );
  }
};
