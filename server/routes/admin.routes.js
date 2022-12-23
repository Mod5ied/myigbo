import { Router } from "express";
import { Authorization } from "../auth/authenticate.js";
import { Users } from "../controllers/userController.js";
import { AdminModel as mod } from "../models/entities.js";
import { AccessTokens as mod2 } from "../models/tokens.js";
const a = new Authorization(mod, "admin");
const u = new Users(mod, mod2, "admin");
const adminRoutes = Router();

adminRoutes.get("/user_accounts", [a.authorizeUser, u.fetchActiveUsers]);
adminRoutes.get("/active_users", [a.authorizeUser, u.fetchActiveUsers]);
adminRoutes.get("/:email", [a.authorizeUser, u.fetchUser]);
adminRoutes.get("/", [a.authorizeUser, u.fetchUsers]);

adminRoutes.post("/signUp", [a.validateNewUser, u.signupUser]);
adminRoutes.post("/signIn", [a.validateUser, u.signinUser]);

adminRoutes.put("/update", [a.authorizeUser, u.updateUser]);

adminRoutes.delete("/resetToken", [a.validateUser, u.resetToken]);
adminRoutes.delete("/signOut", [a.validateUser, u.signoutUser]);
adminRoutes.delete("/remove", [a.authorizeUser, u.removeUser]);

export { adminRoutes };
