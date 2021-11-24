import express, { Application } from "express";
import morgan from "morgan";

import IndexRoutes from "./routes";
import AccountRequest from "./routes/account";
import GroupRequests from "./routes/groupRequests";

export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3001 );
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use("/authentication", AccountRequest);
        this.app.use("/requests", GroupRequests);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log("Server on port", this.app.get('port'));
    }
}