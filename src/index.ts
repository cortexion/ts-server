import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

// Define routes
const defineRoutes = (app: express.Application) => {
  app.get('/', (req: Request, res: Response) => {
    // Get the IP address of the requesting client
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Return the IP and the message
    res.json({ message: 'Hello World!!!', clientIp });
  });
};

// Start the HTTP server
let server: any; // Declare a variable to hold the server instance

const startServer = (port: number) => {
  server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}!`);
  });
};

export const stopServer = () => {
  return new Promise<void>((resolve, reject) => {
    if (server) {
      server.close((err?: Error) => {
        if (err) {
          reject(err);
        } else {
          console.log('Server closed');
          resolve();
        }
      });
    }
  });
};

// Initialize the server with an environment-configurable port
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 80;
defineRoutes(app);
startServer(PORT);

export default app;
