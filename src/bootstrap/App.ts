import express, { Express, NextFunction, Request, Response } from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import config from '../config/config';
import { controllers } from '../controllers';
import { masterDbConn } from './db';

export class App {
  public readonly port: number;

  public readonly app: Express;

  public readonly httpServer: Server;

  public constructor() {
    this.port = config.PORT;
    this.app = express();
    this.httpServer = http.createServer(this.app);
  }

  protected async bootstrap(): Promise<void> {
    this.middleware();
    this.connectController();
    // connect db
    await masterDbConn();
    console.log('Connected DB');
  }

  public async start(): Promise<void> {
    try {
      await this.bootstrap();
      await new Promise((resolve) => {
        this.httpServer.listen(this.port, () => resolve(true));
      });
      console.log(`Server started on http://localhost:${this.port}/`);
    } catch (error) {
      console.log('Start error: ', error);
    }
  }

  protected connectController(): void {
    controllers.forEach((route) => {
      this.app.use(route.path, route.handler);
    });
  }

  protected middleware(): void {
    this.app.use(cors());
    this.app.use(express.json({ limit: '5mb' }));
    this.app.use(express.urlencoded({ limit: '5mb', extended: false }));
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log('IP:::', req.socket.remoteAddress, 'PATH::: ', req.path);
      next();
    });
  }
}
