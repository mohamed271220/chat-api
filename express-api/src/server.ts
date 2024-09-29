import http from 'http';
import app from './index'; 
import initializeSocketIO from './socket';

const server = http.createServer(app);
const io = initializeSocketIO(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
