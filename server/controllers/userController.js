import { DeleteService } from "../services/deleteServices.js";
import { UpdateService } from "../services/updateServices.js";
import { PostService } from "../services/postServices.js";
import { GetService } from "../services/getServices.js";
import { ApiError } from "../errors/errorParser.js";
import { AuthTokens } from "../auth/tokens.js";
import { UserModel } from "../models/entities.js";

class Users {
  constructor(user_model, token_model, user_role) {
    this.userModel = user_model;
    this.tokenModel = token_model;
    this.userRole = user_role;
  }

  signupUser = async (req, res, next) => {
    if (!req.body || req.body == null) return next(ApiError.notFoundRequest("Request body was not found"));

    const user = await PostService.createUser(this.userModel, req.body);
    if (!user) return next(ApiError.badRequest("Could not create user account."));
    return res.status(201).json({ message: "Account created" });
  };

  signinUser = async (req, res, next) => {
    const { _id, email, role, activated } = req.payload;
    const doesExist = await AuthTokens.verifyUserSession(email);
    if (doesExist) return next(ApiError.badRequest("User is already logged in"));

    const userToken = await AuthTokens.signUserTokens(req.payloadToSign);
    if (!userToken) return next(ApiError.badRequest("Something happened while signing in"));

    const { accessToken, ...rest } = userToken;
    return res.status(200).json({ token: accessToken, user: { _id, email, role, activated } });
  };

  signoutUser = async (req, res, next) => {
    const result = await DeleteService.deleteUserSession(this.tokenModel, req.payload);
    if (!result) return next(ApiError.badRequest("Signout was not completed"));
    return res.status(200).json({ message: "Signout completed" });
  };

  resetToken = async (req, res, next) => {
    //! reset is consuming much memory, fix this.
    const { email, password } = req.body;
    //todo: check if a token already exists and verify it, if expired, create new token.
    const result = await DeleteService.resetUserToken({ email, password, role: this.userRole });
    if (!result) return next(ApiError.notFoundRequest("Reset error - user_token not found"));
    return res.status(200).json({ message: "Token was reset" });
  };

  removeUser = async (req, res, next) => {
    return await UserModel.deleteMany({})
    if (req.payload.role === "admin" && req.payload.email) {
      const result = await DeleteService.deleteUser(this.userModel, req.payload);
      if (!result) return next(ApiError.badRequest("User was not removed"));
      return res.status(200).json({ message: "User was removed" });
    }
    return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };

  fetchUsers = async (req, res, next) => {
    // if (req.payload.role == "admin") {
    const users = await GetService.getUsers(this.userModel);
    if (!users) return next(ApiError.notFoundRequest("Accounts were not found"));
    return res.status(200).json(users);
    // }
    // return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };

  fetchUser = async (req, res, next) => {
    if (req.payload.role == this.userRole && req.payload.email == req.params.email) {
      const user = await GetService.getUser(this.userModel, req.params.email);
      if (!user) return next(ApiError.notFoundRequest("User account was not found"));
      return res.status(200).json(user);
    }
    return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };

  fetchActiveUsers = async (req, res, next) => {
    if (req.payload.role == "admin" && req.payload.email) {
      const { users, count } = await GetService.getActiveUsers(this.tokenModel);
      if (count === 0) return next(ApiError.badRequest("No active users found"));
      return res.status(200).json({ message: `About ${count} active users found`, users });
    }
    return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };

  updateUser = async (req, res, next) => {
    if (req.payload.role == this.userRole && req.payload.email) {
      const user = await UpdateService.updateUser(this.userModel, req.body, req.payload);
      if (!user) return next(ApiError.notFoundRequest("User account was not found"));
      return res.status(200).json({ message: "User updated" });
    }
    return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };
}

export { Users };
