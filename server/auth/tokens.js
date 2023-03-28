import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { AccessTokens, RefTokens } from "../models/tokens.js";
config();

class AuthTokens {
	static async generateAccessTokens(user) {
		const { email, role, ...rest } = user;
		const aToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
		await Promise.all([AccessTokens.create({ email, role, accessToken: aToken }), AccessTokens.selfDestructToken(user.email) /* fix! */]);
		return aToken;
	}

	//todo: VERSION 2.
	static async generateSpecialTokens(user) {
		/* this token will be valid for making solid changes to 
        both user-accounts and records as well.
    */

		/* this was inspired by OAuth auth-flows.
        'user' interface should equal - { email, role, permissions: { write: t/f, read: t/f } }.
    */

		/* then the verifier ensures that only access-tokens with read & write permissions
        set to true can make lasting edits to any records or accounts.
    */

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
		try {
			const tokenResult = jwt.verify(tk, process.env.ACCESS_TOKEN_SECRET, { complete: true });
			if (tokenResult) {
				const token = await AccessTokens.find({ email: tokenResult.payload.email }).lean();

				if (token.length === 0 && tokenResult) return false;
				// token ain't found but result still ain't expired.
				return tokenResult.payload;
			}
		} catch (err) {
			return false;
		}
	}
	static async verifyUserSession(email) {
		const token = await AccessTokens.find({ email }).select(["email"]).lean();
		if (token.length == 0) return false;
		return true;
	}
}

export { AuthTokens };
