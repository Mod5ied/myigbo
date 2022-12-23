class GetService {
  static getRecords = async (model) => {
    const getResponse = await model.find({}).lean();
    if (getResponse.length === 0) {
      return null;
    }
    return getResponse;
    // //! To fetch from the online Posts docs to the new Words doc: ✅
    // const staleWords = await Posts.find({});
  };

  static getOneRecord = async (model, payload) => {
    const getResponse = await model.findOne({ name: payload }).lean();
    if (!users) return false;
    return getResponse;
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
