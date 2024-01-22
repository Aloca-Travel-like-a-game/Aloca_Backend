import authRouter from "./authRouter.js";
function route(app) {
    app.use("/auth", authRouter)
}
export default route;
