# How to Run the PHP Backend and React Frontend

Follow these steps to run both your PHP backend and React frontend.

---

## Prerequisites

Before running the application, ensure that your environment is set up with the following:

### 1. PHP Environment
- **PHP (version 7.x or higher)**: Install PHP on your system if it's not already installed.
  - **macOS**: PHP usually comes pre-installed. To check the version, run `php -v` in the terminal. If not installed, you can install it via Homebrew:
    ```bash
    brew install php
    ```
  - **Windows**: Download PHP from [the official website](https://windows.php.net/download/).
  - **Linux**: You can install PHP via your package manager (e.g., `sudo apt install php` on Ubuntu).

- **Web Browser**: Any modern web browser (Chrome, Firefox, etc.) for testing the frontend.

### 2. Node.js and npm (for React Frontend)
- **Node.js (version 16.x or higher)**: Node.js is required to run the React development server and manage JavaScript dependencies.
  - **macOS and Linux**: Install Node.js from [the official Node.js website](https://nodejs.org/en/download/).
  - **Windows**: Install Node.js using the [Windows installer](https://nodejs.org/en/download/).

- **npm**: npm comes bundled with Node.js and is used to install dependencies and manage the React app.

To verify your installations:
```bash
node -v   # Should return Node.js version
npm -v    # Should return npm version
php -v    # Should return PHP version
```


## Project Setup: PHP Backend and React Frontend

This project includes a PHP backend and a React frontend. Below are the steps to set up and run both parts of the application.

### Step 1: Set Up the PHP Backend

1. Navigate to the `backend` directory:
  ```bash
  cd backend
  ```
2. Start the PHP server:
  ```bash
  php -S localhost:8000 -t .
  ```

This will run the backend on http://localhost:8000.

## Step 1: Set Up the React Frontend

1. Navigate to the frontend directory:
 ```bash
 cd frontend
 ```
2. Install dependencies:
 ```bash
 npm install
 ```
3. Start the React development server:
 ```bash
 npm run dev
 ```

This will run the frontend on http://localhost:3000.
