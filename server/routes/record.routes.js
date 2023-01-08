import { WordsController as w } from "../controllers/wordsController.js";
import { DictController as d } from "../controllers/dictController.js";
import { QuizController as q } from "../controllers/quizController.js";
import { Authorization } from "../auth/authenticate.js";
import { saveLogs } from "../utils/log/savelog.js";
import { AdminModel, UserModel } from "../models/entities.js";
import { Router } from "express";
const recordRoutes = Router();
const u = new Authorization(UserModel, "user");
const ad = new Authorization(AdminModel, "admin");

/*  */
recordRoutes.get("/get/dict/:record", [u.authorizeUser, d.getOneDict]);
recordRoutes.get("/get/word/:name", [u.authorizeUser, w.getOneWord]);
recordRoutes.get("/quiz/:quiz", [u.authorizeUser, q.getQuiz]);
recordRoutes.get("/allRecords", [u.authorizeUser, d.getDict]);
recordRoutes.get("/allWords", [u.authorizeUser, w.getWords]);
// recordRoutes.get("/get/app_state", [handleGetState]); /* Under check */
/*  */
recordRoutes.post("/post/batch/record", [ad.authorizeUser, d.batchUploadDict, saveLogs]);
recordRoutes.post("/post/batch/word", [ad.authorizeUser, w.batchUploadWords, saveLogs]);
recordRoutes.post("/post/batch/:quiz", [ad.authorizeUser, q.batchUploadQuiz, saveLogs]);
recordRoutes.post("/post/quiz/:quiz", [ad.authorizeUser, q.createQuiz, saveLogs]);
recordRoutes.post("/post/dict", [ad.authorizeUser, d.postDict, saveLogs]);
recordRoutes.post("/post/word", [ad.authorizeUser, w.postWord, saveLogs]);
/*  */
recordRoutes.patch("/update/quiz/:quiz/:id", [ad.authorizeUser, q.patchQuiz, saveLogs]);
recordRoutes.patch("/update/word/:id", [ad.authorizeUser, w.patchWord, saveLogs]);
recordRoutes.patch("/update/dict/:id", [ad.authorizeUser, d.patchDict, saveLogs]);
/*  */
recordRoutes.delete("/delete/word/:name", [ad.authorizeUser, w.deleteWord]);
recordRoutes.delete("/delete/dict/:name", [ad.authorizeUser, d.deleteDict]);
recordRoutes.delete("/delete/quiz/:quiz", [ad.authorizeUser, q.deleteQuiz]);

export { recordRoutes };
