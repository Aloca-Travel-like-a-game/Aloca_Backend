import authRouter from "./authRouter.js";
import chatAIRouter from "./chatAIRouter.js";
import userRouter from "./userRouter.js";
import tripPlannerRouter from "./tripPlannerRouter.js";
function route(app) {
    app.use("/auth", authRouter)
    app.use("/user", userRouter)
    app.use("/chat", chatAIRouter)
    app.use("/trip-plan", tripPlannerRouter)
}
export default route;
