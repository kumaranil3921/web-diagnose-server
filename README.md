# Node.js Server with Google PageSpeed API Integration

This project is a Node.js server that uses the Google PageSpeed API to analyze the performance of web pages. It provides an endpoint to send requests to the PageSpeed API and returns performance insights, diagnostics, and optimization suggestions.

---

## Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Steps to Get the API Key](#steps-to-get-the-api-key)
   - [Steps to Get the mongo uri](#steps-to-get-the-mongo-uri)
   - [Steps to Get the service account key json](#steps-to-get-the-service-account-key-json)
3. [Setting Up the Server](#setting-up-the-server)
   - [Clone the Repository](#1-clone-the-repository)
   - [Install Dependencies](#2-install-dependencies)
   - [Set Up Environment Variables](#3-set-up-environment-variables)
4. [Running the Server](#running-the-server)
5. [Postman Documentation](#postman-documentation)
6. [License](#license)

---

## Features
- Analyze web page performance using the Google PageSpeed API.
- Support for both desktop and mobile analysis.
- Automatically generates PDF reports (if implemented).
- Simple and configurable using a `.env` file.

---

## Getting Started

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system. [Download it here](https://nodejs.org/).
- **Google API Key**: You need an API key from Google Cloud to access the PageSpeed API.
- **Enable the Following APIs on Google Cloud**:
  - **Google Drive API**
  - **PageSpeed Insights API**

### Steps to Get the API Key
1. Visit the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services > Library**.
4. Search for "PageSpeed Insights API" and enable it.
5. Go to **APIs & Services > Credentials**.
6. Create a new API key.
7. Copy the API key and paste it into the `.env` file as `GOOGLE_API_KEY`.

### Steps to Get the mongo uri
1. **Create MongoDB Atlas Account**
    - Go to the [MongoDB Atlas website](https://www.mongodb.com/cloud/atlas).
    - Sign up for a new account or log in to your existing MongoDB Atlas account.

2. **Create a New Cluster**

    - After logging in, click on **"Create a New Cluster"**.
    - Choose a cloud provider (e.g., AWS, GCP, or Azure) and a region to host your cluster.
    - Select a cluster tier (for example, the **Free Tier** for testing).
    - Click **"Create Cluster"**. The process will take a few minutes.

3. **Set Up a Database User**

    - Once your cluster is created, navigate to **"Database Access"** under the **Security** section in the left sidebar.
    - Click **"Add New Database User"**.
    - Provide a username and password for your database user.
    - Choose the necessary privileges (e.g., **Read and Write to Any Database** for full access).
    - Click **"Add User"** to create the user.

4. **Whitelist Your IP Address**

    - Go to **"Network Access"** under the **Security** section in the left sidebar.
    - Click **"Add IP Address"**.
    - Add your current IP address or use `0.0.0.0/0` to allow all IP addresses (not recommended for production).
    - Click **"Confirm"** to whitelist your IP.

5. **Get Mongo URI**

    - In the Atlas dashboard, navigate to **"Clusters"** in the left sidebar.
    - Find your cluster and click on **"Connect"**.
    - Select **"Connect your application"**.
    - Under **"Connection String Only"**, you will see the connection string (Mongo URI).
   It will look like this:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### Steps to Get the service account key json
1. **Go to the Google Cloud Console:**
   - Open your web browser and go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Log in with your Google account if you are not already logged in.

2. **Create a New Project (if needed):**
   - Click on the **"Select a Project"** dropdown at the top of the page.
   - Click **"New Project"** and fill in the necessary details (Project Name, Billing Account, etc.).
   - Click **"Create"**.

3. **Enable the Necessary API:**
   - In the left sidebar, navigate to **"APIs & Services" > "Library"**.
   - Search for the API you want to enable (for example, **Google Drive API** or **Google Sheets API**).
   - Click on the API and click **"Enable"**.

4. **Go to the Service Accounts Page:**
   - In the left sidebar, navigate to **"IAM & Admin" > "Service Accounts"**.

5. **Create a New Service Account:**
   - Click the **"Create Service Account"** button at the top of the page.
   - Fill in the **Service Account Name** and **Description**.
   - Click **"Create"**.

6. **Assign Roles:**
   - On the next page, select the **Role** you want to assign to the service account (for example, **Project > Owner**, or other specific roles based on your needs).
   - You can assign multiple roles if needed.
   - Click **"Continue"**.

7. **Create the Key:**
   - After the service account is created, you will be prompted to create a key.
   - Under the **"Key"** section, select **"JSON"**.
   - Click **"Create"**.
   - A JSON file containing your service account credentials will automatically download to your computer.

---

## Setting Up the Server

### 1. Clone the Repository
```
git clone https://github.com/kumaranil3921/web-diagnose-server.git
cd web-diagnose-server
```

### 2. Install Dependencies
```
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the project directory with the following content:
```
PORT=4000
GOOGLE_API_KEY=your-google-api-key
MONGO_URI=your-mongo-MONGO_URI
GOOGLE_SERVICE_ACCOUNT_JSON=user-google-service-account-key-json
```

---

## Running the Server
Start the server with the following command:
```
npm start
```

## Postman Documentation
You can view the API documentation and make API requests directly using Postman:

[View Postman Documentation](https://documenter.getpostman.com/view/1433236/2sAYBSjYFE)

The server will run on the port specified in the `.env` file (default is 4000).

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more information.
