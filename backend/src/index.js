require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const swipeRoutes = require('./routes/swipes');
const matchRoutes = require('./routes/matches');
const uploadRoutes = require('./routes/upload');

const { initSocket } = require('./utils/socket');

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/swipes', swipeRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 4000;

async function start(){
  const uri = process.env.MONGODB_URI;
  if(!uri) {
    console.error('MONGODB_URI not set in .env');
    process.exit(1);
  }
  await mongoose.connect(uri, {
    dbName: process.env.DB_NAME || 'lovely_app',
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Connected to MongoDB');

  require('./models/user');

  server.listen(PORT, () => {
    console.log('Server listening on', PORT);
  });

  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET','POST'],
      credentials: true
    }
  });
  initSocket(io);
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
