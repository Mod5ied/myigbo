class GetService {
  static getRecords = async (model) => {
    const records = await model.find({}).lean();
    if (records.length === 0) {
      return null;
    }
    return records;
    // //! To fetch from the online Posts docs to the new Words doc: ✅
    // const staleWords = await Posts.find({});
  };

  static getOneRecord = async (model, payload) => {
    const record = await model.findOne({ name: payload }).lean();
    if (!record) return false;
    return record;
  };

  static getUsers = async (model) => {
    const users = await model.find({}).select(["-password"]).lean();
    if (!users) return false; 
    return users;
  };

  static getUser = async (model, payload) => {
    const user = await model.findOne({ email: payload });
    if (!user) return false;
    return user;
  };

  static getActiveUsers = async (model) => {
    const users = await model.find({}).select(["email"]).lean();
    if (!users) return false;
    const count = users.length;
    return { users, count };
  };
}

export { GetService };
