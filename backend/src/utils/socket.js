const jwt = require('jsonwebtoken');
const Message = require('../models/message');
const Match = require('../models/match');

function initSocket(io){
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if(!token) return next(new Error('Auth error'));
    try{
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.sub;
      return next();
    } catch(err){ return next(new Error('Auth error')) }
  });

  io.on('connection', (socket) => {
    console.log('socket connected', socket.userId);
    socket.join(socket.userId);

    socket.on('join_match', async ({matchId}) => {
      socket.join('match_' + matchId);
    });

    socket.on('send_message', async ({matchId, text}) => {
      if(!text || !matchId) return;
      const msg = await Message.create({ match: matchId, sender: socket.userId, text });
      await Match.findByIdAndUpdate(matchId, { lastMessageAt: new Date() });
      io.to('match_' + matchId).emit('new_message', msg);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected', socket.userId);
    });
  });
}

module.exports = { initSocket };
