import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import IndexRoutes from "./routes";
import AccountRequest from "./routes/account";
import GroupRequests from "./routes/groupRequests";
import RoleRoutes from "./routes/role";
import SearchClassList from "./routes/classlist";
import PostComment from "./routes/comment";
import JoinRequests from "./routes/joinRequest";
import GetProfessor from "./routes/course";

import { header } from "./middleware/account";

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set("port", this.port || process.env.PORT || 3001);
    }

    middlewares() {
        this.app.use(morgan("dev"));
        this.app.use(cors(options));
        this.app.use(header);
        this.app.use(express.json());
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use("/authentication", AccountRequest);
        this.app.use("/requests", GroupRequests);
        this.app.use("/role", RoleRoutes);
        this.app.use("/classlist", SearchClassList);
        this.app.use("/comment", PostComment);
        this.app.use("/course", GetProfessor);
        this.app.use("/join", JoinRequests);
    }

    async listen() {
        await this.app.listen(this.app.get("port"));
        console.log("Server on port", this.app.get("port"));
    }
}