import { Schema, model } from "mongoose";
// const baseOptions = { discriminatorKey: "recordType" };
// const baseSchema = new Schema(
//   {
//     genre: { type: String, required: true, trim: true, lowercase: true },
//   },
//   baseOptions
// );

const wordsSchema = new Schema({
  //todo: would be required after we setup apps dictionary
  //* For example (Computing, Farming, Education, etc.)
  name: { type: String, required: true, trim: true, lowercase: true, unique: true },
  translation: { type: String, required: true, trim: true, lowercase: true },
  genre: { type: String, required: true, trim: true, lowercase: true },
  group: { type: String, trim: true, lowercase: true },
});

// const postsSchema = new Schema({
  //   //todo: would be required after we setup apps dictionary
//   definitions: { type: String, trim: true, lowercase: true },
// });

const translation = new Schema({
  commonTranslate: { type: String, trim: true, required: true, lowercase: true },
  primitive: [{ type: String, trim: true, required: true, lowercase: true }],
});

const dictionarySchema = new Schema({
  name: { type: String, required: true, trim: true, lowercase: true, unique: true },
  genre: { type: String, required: true, trim: true, lowercase: true },
  translation: [translation],
  definitions: [{ type: String, trim: true, lowercase: true }],
  adjectives: [{ type: String, trim: true, lowercase: true }],
  synonyms: [{ type: String, trim: true, lowercase: true }],
  antonyms: [{ type: String, trim: true, lowercase: true }],
});

// const RecordBase = model("Record", baseSchema);
const Words = model("Words", wordsSchema);
const Dictionary = model("Dictionary", dictionarySchema);
// const Posts = RecordBase.discriminator("Posts", postsSchema);

export { Dictionary, Words };
