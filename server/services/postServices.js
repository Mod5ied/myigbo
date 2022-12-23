import { encryptPassword } from "../utils/encryptions/encrypt.js";

class PostService {
  static createUser = async (model, payload) => {
    const { password, ...rest } = payload;
    const hashedPassword = await encryptPassword(password);
    payload.password = hashedPassword;
    return await model.create(payload);
  };

  static postRecord = async (model, payload) => {
    const wordExists = await model.findOne({ name: payload.name });
    if (wordExists !== null) return false;

    return await model.create(payload);
  };

  static postQuiz = async (model = {}, payload) => {
    const resp = await model.findOne({ question: payload.question });
    if (resp !== null) return false;
    //* data cannot be saved, it exists.

    await model.create(payload);
    return true;
  };

  static batchPost = async (model, payload) => {
    //* unique prop prevents duplicates.
    const resp = await model.create(payload);
    if (!resp) return false;
    //* duplicates come to us! 😎

    return true;
  };
}

export { PostService };
