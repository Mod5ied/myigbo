import { AccessTokens } from "../models/tokens.js";

class DeleteService {
  static deleteRecord = async (model = {}, deleteConstant = "") => {
    const response = await model.find({ name: deleteConstant });
    if (response === null || response.length === 0) {
      return false;
    }
    //* Checks how many res and deletes-many if > 1 || < 1
    //todo: if const == 1 {nom: const[0]} : if const > 1 deleteMany(const).
    if (response.length === 1) {
      await model.deleteOne({ name: deleteConstant });
      return true;
    }
    await model.deleteMany({ name: deleteConstant });
    return true;
  };

  /* STILL UNDER CONTEMPLATION */
  static deleteQuiz = async (model = {}, deleteCode = 0) => {
    const response = await model.findOne({ code: deleteCode });
    if (response === null || response.length === 0) {
      return false;
    }
    if (response.length === 1) {
      await model.deleteOne({ code: deleteCode });
      return true;
    }
    await model.deleteMany({ code: deleteCode });
    return true;
  };

  static deleteUser = async (model, { email, ...rest }) => {
    const [token, result] = await Promise.all([
      AccessTokens.deleteOne({ email }),
      model.deleteOne({ email }),
    ]);
    if ((result.deletedCount && token.deletedCount) <= 0) return false;
    return true;
  };

  static deleteUserSession = async (model, payload) => {
    const token = await model.deleteOne({ email: payload.email });
    if (token.deletedCount <= 0) return false;
    return true;
  };

  /***  gets access to the email and returns a link to delete current token */
  static resetUserToken = async (payload) => {
    const result = await AccessTokens.deleteMany({ email: payload.email });
    if (result.deletedCount <= 0) return false;
    return result;
    /* now a new token is created and attached to a link sent to client */
  };

  static refreshUserToken = (payload) => {};
}
export { DeleteService };
