import { DeleteService } from "../services/deleteServices.js";
import { UpdateService } from "../services/updateServices.js";
import { PostService } from "../services/postServices.js";
import { GetService } from "../services/getServices.js";
import { ApiError } from "../errors/errorParser.js";
import { Words } from "../models/records.js";
import logger from "../utils/log/logger.js";

class WordsController {
  constructor(admin_email, user_email) {
    this.adminEmail = admin_email;
    this.userEmail = user_email;
  }

  static postWord = async (req, res, next) => {
    // if (req.params === null) return next(ApiError.notAvailableRequest("Path is invalid"));
    if (req.payload.role === "admin" && req.payload.email === adminEmail) {
      const constant = { name: req.body.name, genre: req.body.genre, translation: req.body.translation };
      const postResponse = await PostService.postRecord(Words, constant);
      if (!postResponse) return next(ApiError.badRequest(`Resource already exist`));

      res.status(200).json({ state: true }).data = { msg: `Resource created`, data: postResponse };
      return next();
    }
    return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };

  static getWords = async (req, res, next) => {
    if (req.payload.role === "admin" && req.payload.email === adminEmail) {
      const getResponse = await GetService.getUsers(Words);
      if (getResponse === null) return next(ApiError.notFoundRequest(`Resource does not exist`));

      return res.status(200).json({ state: true, data: getResponse });
    }
    return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };

  static getOneWord = async (req, res, next) => {
    // if (req.params.name.length <= 1) return next(ApiError.badRequest("Path is invalid"));
    if (req.payload.role === "user" && req.payload.email === userEmail) {
      const constant = req.params.name;
      const getResponse = await GetService.getOneRecord(Words, constant);
      if (getResponse === null) return next(ApiError.notFoundRequest(`Resource does not exist`));

      res.status(200).json({ state: true, data: getResponse }).data = getResponse;
      return next();
    }
    return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };

  static deleteWord = async (req, res, next) => {
    // if (req.params.name === null) return next(ApiError.notAvailableRequest("Path is invalid"));
    if (req.payload.role === "admin" && req.payload.email === adminEmail) {
      const constant = req.params.name;
      const deleteResponse = await DeleteService.deleteRecord(Words, constant);
      if (!deleteResponse) return next(ApiError.notFoundRequest(`Resource does not exist`));

      res.status(200).json({ state: true, message: `Resource was deleted` }).data = `Resource was deleted`;
      return next();
    }
    return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };

  static patchWord = async (req, res, next) => {
    if (req.payload.role === "admin" && req.payload.email === adminEmail) {
      let updatedResponse;
      updatedResponse = await UpdateService.updateRecord(Words, req.body, req.params);
      if (!updatedResponse) return next(ApiError.notFoundRequest(`Resource does not exist`));

      res.status(200).json({ state: true }).data = updatedResponse;
      return next();
    }
    return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };

  //todo: should exist for {trans, dict & quiz}.
  static batchUploadWords = async (req, res, next) => {
    //* Special, and needs to explicit the error, hence not using the universal-err handler.
    //* Logs a E11000 duplicate key error collection if redundancy is attempted.
    //! To fetch from the online Posts docs to the new Words doc:
    //! const staleWords = await Posts.find({});
    if (req.payload.role === "admin" && req.payload.email === adminEmail) {
      try {
        console.log(req.body);
        const uploads = await Words.create(req.body);
        res.status(200).json({ state: true }).data = uploads;
        next();
      } catch (err) {
        const {
          keyValue: { name },
        } = err;
        logger.error(err.message);
        return res.status(400).json({ message: `'${name}' already exists in database` });
      }
    }
    return next(ApiError.unauthorizedRequest("Request is unauthorized"));
  };
}

export { WordsController };
