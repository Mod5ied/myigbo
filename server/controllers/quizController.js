import { ApiError } from "../errors/errorParser.js";
import { GetService } from "../services/getServices.js";
import { PostService } from "../services/postServices.js";
import { UpdateService } from "../services/updateServices.js";
import { DictQuiz, SearchQuiz } from "../models/quiz.js";

class QuizController {
  static createQuiz = async (req, res, next) => {
    const types = ["word", "dict", "search"];
    if (!types.includes(req.params.quiz)) {
      return next(ApiError.notAvailableRequest("Path is invalid or missing a constant"));
    }
    let postResponse;
    switch (req.params.quiz) {
      case types[0]:
        postResponse = await PostService.postQuiz(SearchQuiz, req.body);
        if (!postResponse) return next(ApiError.badRequest(`Resource already exists`));

        res.status(200).json({ state: true, data: postResponse }).data = {
          msg: `Resource created`,
          data: postResponse,
        };
        return next();
      case types[2]:
        postResponse = await PostService.postQuiz(SearchQuiz, req.body);
        if (!postResponse) return next(ApiError.badRequest(`Resource already exists`));

        res.status(200).json({ state: true, data: postResponse }).data = {
          msg: `Resource created`,
          data: postResponse,
        };
        return next();
      case types[1]:
        postResponse = await PostService.postQuiz(DictQuiz, req.body);
        if (!postResponse) return next(ApiError.badRequest(`Resource already exists`));

        res.status(200).json({ state: true, data: postResponse }).data = {
          msg: `Resource created`,
          data: postResponse,
        };
        return next();
      default:
        return next(ApiError.methodNotImplemented("Request is unknown"));
    }
  };

  static getQuiz = async (req, res, next) => {
    const types = ["word", "dict", "search"];
    if (!types.includes(req.params.quiz))
      return next(ApiError.notAvailableRequest("Path is invalid or missing a constant"));

    let getResponse;
    switch (req.params.quiz) {
      case types[0]:
        getResponse = await GetService.getRecords(SearchQuiz);
        if (getResponse === null) return next(ApiError.notFoundRequest(`Resource was not found`));

        return res.status(200).json({ state: true, data: getResponse });
      case types[2]:
        getResponse = await GetService.getRecords(SearchQuiz);
        if (getResponse === null) return next(ApiError.notFoundRequest(`Resource was not found`));

        return res.status(200).json({ state: true, data: getResponse });
      case types[1]:
        getResponse = await GetService.getRecords(DictQuiz);
        if (getResponse === null) return next(ApiError.notFoundRequest(`Resource was not found`));

        return res.status(200).json({ state: true, data: getResponse });
      default:
        return next(ApiError.methodNotImplemented("Request is unknown"));
    }
  };

  static deleteQuiz = async (req, res, next) => {
    const types = ["search", "dict"];
    if (!types.includes(req.params.quiz)) return next(ApiError.notAvailableRequest("Path is invalid"));

    //todo: delete quizzes by another factor other than id.
    //! until then, this controller wont use the delete handler.
    let resp;
    switch (req.params.quiz) {
      case types[0]:
        resp = await SearchQuiz.findOne({ _id: req.body.id });
        if (resp === null || !resp) return next(ApiError.notFoundRequest(`Resource does not exist`));

        await SearchQuiz.deleteOne({ _id: req.body.id });
        res.status(200).json({ state: true, message: `Resource was deleted` }).data = `Resource was deleted`;

        return next();
      case types[1]:
        resp = await DictQuiz.findOne({ _id: req.body.id });
        if (resp === null || !resp) return next(ApiError.notFoundRequest(`Resource does not exist`));

        await DictQuiz.deleteOne({ _id: req.body.id });
        res.status(200).json({ state: true, message: `Resource was deleted` }).data = `Resource was deleted`;

        return next();
      default:
        return next(ApiError.methodNotImplemented("Request is unknown"));
    }
  };

  static patchQuiz = async (req, res, next) => {
    const types = ["word", "dict", "search"];
    if (!types.includes(req.params.quiz))
      return next(ApiError.notAvailableRequest("Path is invalid or missing a constant"));

    let updateResponse;
    switch (req.params.quiz) {
      case types[0]:
        updateResponse = await UpdateService.updateQuiz(SearchQuiz, req.body, req.params);
        if (!updateResponse) return res.status(400).json({ state: false });

        return res.status(200).json({ state: true });
      case types[2]:
        console.log("it rang");
        updateResponse = await UpdateService.updateQuiz(SearchQuiz, req.body, req.params);
        if (!updateResponse) return res.status(400).json({ state: false });

        return res.status(200).json({ state: true });
      case types[1]:
        updateResponse = await UpdateService.updateQuiz(DictQuiz, req.body, req.params);
        if (!updateResponse) return res.status(400).json({ state: false });

        return res.status(200).json({ state: true });
      default:
        return next(ApiError.methodNotImplemented("Request is unknown"));
    }
  };

  /* handler for batch-uploads from offlineStore. */
  //todo: should exist for {trans, dict & quiz}.
  static batchUploadQuiz = async (req, res, next) => {
    const types = ["word", "dict", "search"];
    if (!types.includes(req.params.quiz))
      return next(ApiError.notAvailableRequest("Path is invalid or missing a constant"));

    let uploads;
    const constants = req.body;
    //! To fetch from the online Posts docs to the new Words doc:
    // const existingRecords = await Posts.find({});
    switch (req.params.quiz) {
      case types[0] || types[2]:
        uploads = await PostService.batchPost(SearchQuiz, constants);
        if (!uploads) return next(ApiError.badRequest("Resource already exists"));
        /*  */
        return (res.status(200).json({ state: true, data: uploads }).data = {
          msg: `Resources in batch upload success`,
          data: uploads,
        });
      case types[1]:
        uploads = await PostService.batchPost(DictQuiz, constants);
        if (!uploads) return next(ApiError.badRequest("Resource already exists"));
        /*  */
        return (res.status(200).json({ state: true, data: uploads }).data = {
          msg: `Resources in batch upload success`,
          data: uploads,
        });

      default:
        return next(ApiError.methodNotImplemented("Request is unknown"));
    }
  };
}

export { QuizController };
