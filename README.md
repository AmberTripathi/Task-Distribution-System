# MERN Stack Agent Task Distributor

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform enables an administrator to manage a team of agents and automatically distribute tasks by uploading a CSV or Excel file. It features secure JWT authentication and a responsive user interface for efficient workflow management.

## 🚀 Features

* **Secure Admin Login**: JWT-based authentication for the administrator, ensuring protected access to the dashboard.
* **Agent Management**: Admins can easily create and view a list of all agents in the system.
* **Bulk Task Upload**: Supports uploading tasks in bulk via `.csv` and `.xlsx` files with validation for file type and format.
* **Automated Task Distribution**: Employs a round-robin algorithm to distribute uploaded tasks equally among active agents.
* **Responsive Dashboard**: A clean and intuitive UI built with React and styled with Tailwind CSS for seamless management on any device.

---

## 🛠️ Tech Stack

| Component  | Technologies Used                                                                    |
| :--------- | :------------------------------------------------------------------------------------- |
| **Backend** | Node.js, Express.js, Mongoose, JSON Web Token (jsonwebtoken), bcrypt.js, Multer, `csv-parser`, `xlsx` |
| **Frontend** | React, React Router, Tailwind CSS, Axios                                               |
| **Database** | MongoDB                                                                                |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js** (v16 or later)
* **npm** (comes with Node.js)
* **MongoDB** (running on a local instance or a cloud URI from MongoDB Atlas)

---

## ⚙️ Setup and Installation

This project has two parts that need to be set up: the **Backend Server** and the **Frontend Application**.

### 1. Backend Setup (`backend`)

The backend server handles all business logic, database interactions, and file processing.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Configure Environment Variables:**
    Navigate to the `backend` directory and create a `.env` file. This file will store your secret keys and database connection string.

    ```bash
    cd backend
    touch .env
    ```

    Open the `.env` file and add the following configuration, replacing the placeholders with your actual values:
    ```ini
    # Port for the server to run on
    PORT=5001

    # Your MongoDB connection URI
    MONGO_URI=mongodb://localhost:27017/agent-app

    # A strong, secret key for signing JWTs
    JWT_SECRET=a_very_secret_key_for_jwt
    ```

3.  **Install dependencies and run the server:**
    ```bash
    # In the backend/ directory
    npm install
    npm start
    ```
    The server will start on `http://localhost:8080`.

### 2. Frontend Setup (`frontend`)

The frontend is the React application that the administrator interacts with.

1.  **Navigate to the frontend directory:**
    From the project root, open a **new terminal** and go to the `frontend` directory.

    ```bash
    # From the root directory
    cd frontend
    ```
    *(Note: The frontend code is pre-configured to communicate with `http://localhost:5001`, so no code changes are needed if you run the backend on the default port.)*

2.  **Install dependencies and start the application:**
    ```bash
    # In the frontend/ directory
    npm install
    npm start
    ```
    The React development server will start on `http://localhost:3000` and should open automatically in your browser.

---

## 🚀 Usage

1.  Ensure both your backend and frontend servers are running.
2.  **Register the Admin (One-Time Step)**: Use an API client like Postman to send a `POST` request to `http://localhost:5001/api/auth/register`. This is required to create the initial administrator account.
    * **Body (raw, JSON):**
        ```json
        {
            "name": "Admin User",
            "email": "admin@example.com",
            "password": "yoursecurepassword"
        }
        ```
3.  Navigate to `http://localhost:3000` in your browser. You will be redirected to the login page.
4.  Log in using the admin credentials you just registered.
5.  On the dashboard, use the **"Add New Agent"** form to create agent profiles.
6.  Use the **"Upload & Distribute List"** form to upload a `.csv` or `.xlsx` file.
    * The file must contain the headers: `FirstName`, `Phone`, and `Notes` (case-sensitive).
7.  Upon successful upload, the tasks will be distributed, and the lists for each agent will be displayed on the dashboard.

---

## 📜 License

This project is licensed under the MIT License.
