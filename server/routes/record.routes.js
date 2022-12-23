import { WordsController as w } from "../controllers/wordsController.js";
import { DictController as d } from "../controllers/dictController.js";
import { QuizController as q } from "../controllers/quizController.js";
import { Authorization as r } from "../auth/authenticate.js";
import { saveLogs } from "../utils/log/savelog.js";
import { Router } from "express";
const recordRoutes = Router();

/*  */
recordRoutes.get("/allWords", [w.getWords]);
recordRoutes.get("/allRecords", [d.getDict]);
recordRoutes.get("/quiz/:quiz", [q.getQuiz]);
recordRoutes.get("/get/word/:name", [w.getOneWord]);
recordRoutes.get("/get/dict/:record", [d.getOneDict]);
// recordRoutes.get("/get/app_state", [handleGetState]); /* Under check */
/*  */
recordRoutes.post("/post/batch/record", [d.batchUploadDict, saveLogs]);
recordRoutes.post("/post/batch/word", [w.batchUploadWords, saveLogs]);
recordRoutes.post("/post/batch/:quiz", [q.batchUploadQuiz, saveLogs]);
recordRoutes.post("/post/quiz/:quiz", [q.createQuiz, saveLogs]);
recordRoutes.post("/post/dict", [d.postDict, saveLogs]);
recordRoutes.post("/post/word", [w.postWord, saveLogs]);
/*  */
recordRoutes.patch("/update/quiz/:quiz/:id", [q.patchQuiz, saveLogs]);
recordRoutes.patch("/update/word/:id", [w.patchWord, saveLogs]);
recordRoutes.patch("/update/dict/:id", [d.patchDict, saveLogs]);
/*  */
recordRoutes.delete("/delete/word/:name", [w.deleteWord]);
recordRoutes.delete("/delete/dict/:name", [d.deleteDict]);
recordRoutes.delete("/delete/quiz/:quiz", [q.deleteQuiz]);

export { recordRoutes };
