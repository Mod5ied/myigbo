import { ApiError } from "../errors/errorParser.js";
import { compareHashed } from "../utils/encryptions/encrypt.js";
import { AuthTokens } from "./tokens.js";

class Authorization {
  constructor(model, role = []) {
    this.model = model;
    this.role = role;
  }
  /*** method can be used to authorize tokens from requests on the fetch, create & update routes. */
  authorizeUser = async (req, res, next) => {
    if (typeof this.role === "string") this.role = [this.role];

    const bearerToken = req.headers["authorization"];
    if (!bearerToken) return next(ApiError.unauthorizedRequest("UnauthorizedRequest, Token not found."));

    req.bearer = bearerToken && bearerToken.split(" ")[1];
    const verifiedPayload = await AuthTokens.verifyTokens(req.bearer);
    if (!verifiedPayload) return next(ApiError.unauthorizedRequest("Token is expired."));

    if (this.role.length && !this.role.includes(verifiedPayload.role)) {
      return next(ApiError.unauthorizedRequest("UnauthorizedRequest, Admin pass required."));
    }

    req.payload = verifiedPayload;
    return next();
  };

  /*** method is  used on login route only. */
  validateUser = async (req, res, next) => {
    if (!req.body) return next(ApiError.badRequest("Request body is null"));

    const { email, password: rawPassword } = req.body;
    const SelectOptions = ["email", "password", "activated", "role"];
    const User = await this.model.findOne({ email }).select(SelectOptions).lean();

    if (User && User.activated) {
      let { email, password, role } = User;
      const DoesMatch = await compareHashed({ hashedPassword: password, rawPassword });
      if (!DoesMatch) return next(ApiError.unauthorizedRequest("Incorrect email or password"));

      //todo: Look into this 👇
      password = null;

      //todo: Look into this 👇
      req.payload = User;
      req.payloadToSign = { email, password, role };
      return next();
    }

    return next(ApiError.accessDeniedRequest("User account is not activated or not found"));
  };

  /*** method is used on register route only. */
  validateNewUser = async (req, res, next) => {
    if (!req.body) return next(ApiError.badRequest("Request body is null"));
    
    const { email } = req.body;
    const User = await this.model.findOne({ email: email }).lean();
    if (User) return next(ApiError.badRequest("User account already exists"));
    return next();
  };
}

export { Authorization };
