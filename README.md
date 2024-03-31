# Backend Setup for OpenSoft 2024 Project

This README provides instructions on how to set up and run the backend for the OpenSoft 2024 project using Go and the Gin web framework.

## Prerequisites

- Go (version 1.14 or later)
- Git (for version control)

## Setup Instructions

1. **Clone the Repository**

    Clone the project repository to your local machine using Git:

    ```bash
    git clone https://github.com/[your-username]/opensoft-2024.git
    cd opensoft-2024
    ```

    Replace `[your-username]` with your actual GitHub username or organization where the repository is hosted.

2. **Install Dependencies**

    Navigate to the backend directory and install the necessary Go modules:

    ```bash
    cd backend
    go mod tidy
    ```

    `go mod tidy` will automatically add missing and remove unused modules.

3. **Configuration**

    Before running the server, ensure that you have the necessary configuration in place. The database credentials are stored in the `db.go` file. Make sure to review and update these credentials according to your database setup.

4. **Running the Server**

    Start the backend server using the following command:

    ```bash
    go run main.go
    ```

    This will start the server on `localhost:8080` and will include the following routes for CRUD operations:

    [Routes details omitted for brevity]

5. **Security Warning**

    Be aware of the security implications of trusting all proxies. For production, configure the trusted proxies appropriately. Refer to the [official Gin documentation](https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies) for more details.

## Frontend Setup for OpenSoft 2024 Project

This section provides instructions on how to set up and run the frontend for the OpenSoft 2024 project using React and Vite.

### Prerequisites

- Node.js
- npm (or Yarn)

### Setup Instructions

1. **Navigate to the Frontend Directory**

    If you are in the project's root directory:

    ```bash
    cd frontend
    ```

2. **Install Vite (If Not Already Installed)**

    ```bash
    npm install -g create-vite
    ```

3. **Create a New React Project (If Starting From Scratch)**

    ```bash
    npm create vite@latest my-react-app -- --template react
    cd my-react-app
    ```

4. **Install Dependencies**

    ```bash
    npm install
    ```

5. **Configure the Development Server**

    To use port 5173, modify `vite.config.js`:

    ```javascript
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      server: {
        port: 5173
      }
    });
    ```

6. **Run the Frontend Development Server**

    Start the server with:

    ```bash
    npm run dev
    ```

    The React application will now be running on [http://localhost:5173](http://localhost:5173).

### Steps to Run the Frontend

To run the frontend of the OpenSoft 2024 project, navigate to the frontend directory, install the dependencies if not done already, and start the development server:

1. Open a terminal and navigate to the frontend directory of your project.
2. Install the necessary dependencies by running `npm install`.
3. Start the development server on the specified port (5173) with `npm run dev`.
4. Access the frontend in your browser at `http://localhost:5173`.

