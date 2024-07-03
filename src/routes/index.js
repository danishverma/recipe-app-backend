import userRoutes from './user-routes/user.routes.js';
import wishlistRoutes from './wishlist-routes/wishlist.routes.js'

export default function appRouting (app) {
    app.use("/api/v1/users", userRoutes)
    app.use("/api/v1/wishlist", wishlistRoutes)
}