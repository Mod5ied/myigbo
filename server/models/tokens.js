import { Schema, model } from "mongoose";
import { hashEmail } from "../utils/encryptions/encrypt.js";

const RefSchema = new Schema({
  email: { type: String, required: true, get: hashEmail, mutable: false },
  role: { type: String, mutable: false },
  refToken: { type: String, required: true, get: () => null },
});

const AccessSchema = new Schema({
  email: { type: String, required: true, get: hashEmail, mutable: false },
  role: { type: String, mutable: false },
  accessToken: { type: String, required: true, get: () => null },
});

//todo: "Find a way to restart selfDestruct procedure after server goes down."
AccessSchema.static({
  selfDestructToken: function (email) {
    console.log('');
    /* wipes doc after 9-mins */
    // setTimeout(async () => {
    //   await this.deleteOne({ email: email });
    // }, 90000);

    /* wipes doc after one hour */
    // setTimeout(async () => {
    //   await this.deleteOne({ email: email });
    // }, 3600000);
  },
});

const RefTokens = model("RefTokens", RefSchema);
const AccessTokens = model("AccessTokens", AccessSchema);

export { RefTokens, AccessTokens };
