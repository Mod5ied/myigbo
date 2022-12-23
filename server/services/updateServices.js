import { encryptPassword } from "../utils/encryptions/encrypt.js";

class UpdateService {
  static updateRecord = async (model, payload, record) => {
    let toUpdate = await model.findOne({ _id: record.id });
    if (!toUpdate) return false;

    Object.keys(payload).forEach((val) => (toUpdate[val] = payload[val]));
    await toUpdate.save();
    return true;
  };

  static updateQuiz = async (model, payload, record) => {
    let toUpdate = await model.findOne({ _id: record.id });
    if (!toUpdate) return false;

    Object.keys(payload).forEach((val) => (toUpdate[val] = payload[val]));
    await toUpdate.save();
    return true;
  };

  static updateUser = async (model, payload, record) => {
    let toUpdate = await model.findOne({ email: record.email }).select(["-email"]);
    if (!toUpdate) return false;

    Object.keys(payload).map((val) => (toUpdate[val] = payload[val]));
    toUpdate.password = await encryptPassword(toUpdate.password)
    await toUpdate.save();
    return true;
  };
}

export { UpdateService };
