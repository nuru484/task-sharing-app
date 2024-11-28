# **Task Manager - Frontend**

## Overview

The frontend of Task Manager is built with React (TypeScript) and styled using Tailwind CSS. It provides a responsive, user-friendly interface for managing tasks and sharing lists with other users. It integrates with the backend API to perform all operations.

## Features

1. **User Management**
   - Registration, login, and logout
   - View and update user profiles
2. **Task Management**
   - Create, update, delete, and manage task lists
   - Add, edit, delete, and mark tasks as complete/incomplete
3. **Sharing**
   - Share task lists with permissions (`View only` or `Edit`)
   - View and manage shared lists

## Tech Stack

- **Frontend Framework:** React (with TypeScript)
- **UI Framework:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React State/Context
- **API Communication:** Fetch/Axios

---

## Setup Instructions

### Prerequisites

Ensure the following are installed:

- **Node.js** and **npm/yarn**
- **Docker** (for backend)

### Steps to Set Up

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Update the `.env` file (if present) to point to the backend API URL:
   ```plaintext
   VITE_API_URL=http://localhost:8000/api
   ```

### Folder Structure

- **`/src/components`**: Reusable UI components
- **`/src/pages`**: Page components for routing
- **`/src/hooks`**: Custom hooks for logic reuse
- **`/src/services`**: API service integration

### Key Scripts

- **`npm run dev`**: Start the development server
- **`npm run build`**: Build for production
- **`npm run lint`**: Lint the codebase

---

## Deployment

To deploy the frontend, use any hosting platform such as Netlify, Vercel, or AWS S3. Build the application for production:

```bash
npm run build
```

Upload the contents of the `dist` folder to your hosting service.

---

## Notes
