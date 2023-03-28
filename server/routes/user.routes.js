import { Authorization } from "../auth/authenticate.js";
import { UserModel as mod } from "../models/entities.js";
import { AccessTokens as mod2 } from "../models/tokens.js";
import { Users } from "../controllers/userController.js";
import { Router } from "express";
const a = new Authorization(mod, "user");
const ad = new Authorization(mod, "admin");
const u = new Users(mod, mod2, "user");
const userRoutes = Router();

// userRoutes.get("/", [ad.authorizeUser, u.fetchUsers]);
userRoutes.get("/", [u.fetchUsers]);
userRoutes.get("/:email", [a.authorizeUser, u.fetchUser]);

userRoutes.put("/update", [a.authorizeUser, u.updateUser]);

userRoutes.post("/signUp", [a.validateNewUser, u.signupUser]);
userRoutes.post("/signIn", [a.validateUser, u.signinUser]);

userRoutes.delete("/resetToken", [a.validateUser, u.resetToken]);
userRoutes.delete("/signOut", [a.validateUser, u.signoutUser]);
// userRoutes.delete("/remove", [ad.authorizeUser, u.removeUser]);
userRoutes.delete("/remove", [u.removeUser]);

export { userRoutes };
