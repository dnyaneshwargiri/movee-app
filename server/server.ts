import jsonServer from 'json-server';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Resolve __dirname in TS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = jsonServer.router(path.join(__dirname, 'db.json'));

server.use(cors());
server.use(middlewares);

// Custom logging middleware
server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

server.use('/api', router);

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`🚀 JSON Server running at http://localhost:${PORT}/api`);
});
