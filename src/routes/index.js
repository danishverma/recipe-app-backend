import userRoutes from './user-routes/user.routes.js';

export default function appRouting (app) {
    app.use("/api/v1/users", userRoutes)
}