import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { AccessTokens, RefTokens } from "../models/tokens.js";
config();

class AuthTokens {
  static async generateAccessTokens(user) {
    const { email, role, ...rest } = user;
    const aToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    await Promise.all([
      AccessTokens.create({ email, role, accessToken: aToken }),
      AccessTokens.selfDestructToken(user.email),
    ]);
    return aToken;
  }
  static async generateRefreshTokens(user) {
    const { email, role, ...rest } = user;
    const rToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    await RefTokens.create({ email, role, refToken: rToken });
    return rToken;
  }
  static async signUserTokens(user) {
    try {
      const accessToken = await this.generateAccessTokens(user);
      const refreshToken = await this.generateRefreshTokens(user);
      return { accessToken, refreshToken };
    } catch (err) {
      return err;
    }
  }
  static async verifyTokens(tk) {
    jwt.verify(tk, process.env.ACCESS_TOKEN_SECRET, async (err, result) => {
      if (err.message === "jwt expired") return false;

      const token = await AccessTokens.find({ email: result.email }).lean();
      // token ain't found but result still ain't expired.
      if (token.length === 0 && result) return false;

      return result;
    });
  }
  static async verifyUserSession(email) {
    const token = await AccessTokens.find({ email }).select(["email"]).lean();
    if (token.length == 0) return false;
    return true;
  }
}

export { AuthTokens };
