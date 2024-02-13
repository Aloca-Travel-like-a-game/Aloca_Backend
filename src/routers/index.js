import authRouter from "./authRouter.js";
import chatAIRouter from "./chatAIRouter.js";
function route(app) {
    app.use("/auth", authRouter)
    app.use("/chat", chatAIRouter)
}
export default route;
