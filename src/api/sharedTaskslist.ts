// src/api/sharedTaskLists.ts
const serverURL = import.meta.env.VITE_SERVER_URL;

/**
 * Share a task list with another user.
 */
export const shareTaskList = async (
  taskListId: string,
  username: string,
  permission: 'view' | 'edit'
) => {
  try {
    const response = await fetch(`${serverURL}/api/shared-task-lists/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ task_list_id: taskListId, username, permission }),
    });

    if (!response.ok) {
      throw new Error('Failed to share task list.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.message;
    } else {
      throw new Error(
        data.message || 'An error occurred while sharing the task list.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while sharing the task list.'
    );
  }
};

/**
 * Fetch task lists shared with the authenticated user.
 */
export const fetchSharedTaskLists = async () => {
  try {
    const response = await fetch(`${serverURL}/api/shared-task-lists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shared task lists.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data;
    } else {
      throw new Error(
        data.message || 'An error occurred while fetching shared task lists.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while fetching shared task lists.'
    );
  }
};

/**
 * View a specific shared task list and its tasks.
 */
export const fetchSharedTaskList = async (taskListId: string) => {
  try {
    const response = await fetch(
      `${serverURL}/api/shared-task-lists/${taskListId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch shared task list.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data;
    } else {
      throw new Error(
        data.message || 'An error occurred while fetching shared task list.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while fetching shared task list.'
    );
  }
};

/**
 * Fetch all users a task list is shared with.
 */
export const fetchSharedUsers = async (taskListId: string) => {
  try {
    const response = await fetch(
      `${serverURL}/api/shared-task-lists/${taskListId}/shared-users`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch shared users.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return {
        taskList: data.task_list,
        sharedWith: data.shared_with,
      };
    } else {
      throw new Error(
        data.message || 'An error occurred while fetching shared users.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while fetching shared users.'
    );
  }
};

/**
 * Update a shared task list (if permitted).
 */
export const updateSharedTaskList = async (
  taskListId: string,
  name: string
) => {
  try {
    const response = await fetch(
      `${serverURL}/api/shared-task-lists/${taskListId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update shared task list.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data;
    } else {
      throw new Error(
        data.message || 'An error occurred while updating shared task list.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while updating shared task list.'
    );
  }
};

/**
 * Revoke a user's access to a shared task list.
 */
export const revokeSharedTaskListAccess = async (
  taskListId: string,
  username: string
) => {
  try {
    const response = await fetch(
      `${serverURL}/api/task-lists/${taskListId}/revoke`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ username }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to revoke user access.');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.message;
    } else {
      throw new Error(
        data.message || 'An error occurred while revoking user access.'
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'An error occurred while revoking user access.'
    );
  }
};
