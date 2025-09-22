# Tryst - Modern Dating App

Tryst is a modern dating application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to connect with potential matches through a Tinder-like interface.

## Features

- User authentication (Sign up, Login, Logout)
- Profile creation and management
- Swipe left/right to like or pass on profiles
- Real-time chat with matches
- View who liked your profile
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO
- **File Storage**: Cloudinary

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tryst.git
   cd tryst
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

   - Create a `.env` file in the `frontend` directory:
     ```
     VITE_API_URL=http://localhost:5000
     ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
tryst/
├── backend/           # Backend server
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Custom middleware
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── utils/        # Utility functions
│   └── app.js        # Express app setup
│
├── frontend/         # Frontend React app
│   ├── public/       # Static files
│   └── src/          # React components and pages
│       ├── assets/   # Images, fonts, etc.
│       ├── components/ # Reusable components
│       ├── pages/    # Page components
│       ├── context/  # React context
│       ├── utils/    # Utility functions
│       └── App.jsx   # Main App component
│
├── .gitignore        # Git ignore file
└── README.md         # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Create React App](https://create-react-app.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.IO](https://socket.io/)
- [Cloudinary](https://cloudinary.com/)
