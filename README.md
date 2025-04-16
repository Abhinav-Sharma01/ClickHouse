# ClickHouse

## Data Ingestion Web Application

A full-stack web application that handles file uploads and data ingestion with a React frontend and Express backend.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   └── UploadForm.jsx  # File upload component
│   │   ├── assets/        # Static assets
│   │   ├── App.jsx        # Main React component
│   │   └── main.jsx       # React entry point
│   └── package.json       # Frontend dependencies
│
└── server/                 # Backend Express application
    ├── controllers/
    │   └── ingestionController.js  # Handles data ingestion logic
    ├── routes/
    │   └── ingestion.js   # API routes for data ingestion
    ├── services/
    │   ├── clickHouseService.js  # ClickHouse database service
    │   └── flatFileService.js    # File processing service
    ├── uploads/           # Directory for uploaded files
    └── server.js          # Express server entry point
```

## Features

- File upload functionality
- CSV file processing
- Data ingestion into ClickHouse database
- RESTful API for data operations

## Technologies Used

### Frontend
- React 19
- Tailwind CSS 4
- Vite 6
- Axios for API requests

### Backend
- Express 5
- Multer for file uploads
- ClickHouse database integration
- CSV processing capabilities

## Getting Started

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```
   https://github.com/Abhinav-Sharma01/ClickHouse.git
   cd ClickHouse
   ```

2. Install dependencies for both client and server
   ```
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

### Running the Application

#### Frontend Development Server
```
cd client
npm run dev
```
The client will be available at `http://localhost:5173` by default.

#### Backend Development Server
```
cd server
npm run dev
```
The server will run with nodemon for automatic restarts during development.

## API Endpoints

- `POST /api/ingestion` - Upload and process files
- More endpoints to be documented...

## Development

### Client

```
npm run dev     # Start development server
```

### Server

```
npm run dev     # Start server with nodemon
```