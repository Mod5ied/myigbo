import { Schema, model } from "mongoose";

// const baseOptions = { discriminatorKey: "quizType" };
// const baseSchema = new Schema(
//   {
//     question: { type: String, required: true, trim: true, lowercase: true, unique: true },
//     answerRight: { type: String, required: true, trim: true, lowercase: true },
//   },
//   baseOptions
// );


//todo: filter records without 'answerWrong' from the frontend.
const SearchQuizSchema = new Schema({
  question: { type: String, required: true, trim: true, lowercase: true, unique: true },
  answerRight: { type: String, required: true, trim: true, lowercase: true },
  answerWrong: { type: String, trim: true, lowercase: true },
  // quizCode: {//todo: a custom incrementor function here // at cntlr.
});
const DictQuizSchema = new Schema({
  question: { type: String, required: true, trim: true, lowercase: true, unique: true },
  answerWrong1: { type: String, trim: true, lowercase: true },
  answerWrong2: { type: String, trim: true, lowercase: true },
  // quizCode: { //todo
});

// const QuizBase = model("Quiz", baseSchema);
const DictQuiz = model("DictQuiz", DictQuizSchema);
const SearchQuiz = model("SearchQuiz", SearchQuizSchema);

export { DictQuiz, SearchQuiz };
