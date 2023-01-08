import { Schema, model } from "mongoose";
import { hashEmail } from "../utils/encryptions/encrypt.js";

// const baseOptions = {
//   discriminatorKey: "user",
//   toObject: { getters: true, setters: true },
//   toJSON: { getters: true, setters: true },
// };

// const baseSchema = new Schema(
//   {
//     email: { type: String, required: true, unique: true, mutable: false },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     password: { type: String, required: true, get: getNull },
//   },
//   {
//     toObject: { getters: true, setters: true },
//     toJSON: { getters: true, setters: true },
//     discriminatorKey: "user",
//   }
// );
// const UserBase = model("Base", baseSchema);


const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, mutable: false, get: hashEmail },
    password: { type: String, required: true, get: () => null },
    rankings: { type: Number, default: 0 },
    role: { type: String, default: "user" },
    activated: { type: Boolean, default: true } /* should be false by default. */,
  },
  {
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
    discriminatorKey: "user",
  }
);

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, mutable: false, get: hashEmail },
    password: { type: String, required: true, get: () => null },
    activated: { type: Boolean, default: true } /* should be false by default. */,
    role: { type: String, default: "admin" },
  },
  {
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
    discriminatorKey: "user",
  }
);

const UserModel = model("UserModel", userSchema);
const AdminModel = model("AdminModel", adminSchema);

export { UserModel, AdminModel };
