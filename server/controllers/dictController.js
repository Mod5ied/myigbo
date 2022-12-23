import { DeleteService } from "../services/deleteServices.js";
import { UpdateService } from "../services/updateServices.js";
import { PostService } from "../services/postServices.js";
import { GetService } from "../services/getServices.js";
import { ApiError } from "../errors/errorParser.js";
import { Dictionary } from "../models/records.js";
import logger from "../utils/log/logger.js";

class DictController {
  static postDict = async (req, res, next) => {
    let postResponse;
    const constant = {
      name: req.body.name,
      translation: req.body.translation,
      genre: req.body.genre,
      definitions: req.body.definitions,
      adjectives: req.body.adjectives,
      synonyms: req.body.synonyms,
    };
    postResponse = await PostService.postRecord(Dictionary, constant);
    if (!postResponse) return next(ApiError.badRequest(`Resource already exists`));

    res.status(200).json({ state: true }).data = { msg: `Resource created`, data: postResponse };
    next();
  };

  static getDict = async (req, res, next) => {
    const getResponse = await GetService.getRecords(Dictionary);
    if (getResponse === null) return next(ApiError.notFoundRequest(`Resource was not found`));

    res.status(200).json({ state: true, data: getResponse }).data = getResponse;
  };

  static getOneDict = async (req, res, next) => {
    const constant = req.params.record;
    const getResponse = await GetService.getOneRecord(Dictionary, constant);
    if (getResponse === null) return next(ApiError.notFoundRequest(`Resource does not exists`));

    res.status(200).json({ state: true, data: getResponse }).data = getResponse;
    next();
  };

  static deleteDict = async (req, res, next) => {
    const constant = req.body.name;
    const deleteResponse = await DeleteService.deleteRecord(Dictionary, constant);
    if (!deleteResponse) return next(ApiError.notFoundRequest(`Resource does not exist`));

    res.status(200).json({ state: true, message: `Resource was deleted` }).data = `Resource was deleted`;
    next();
  };

  //todo: to update code soon...
  static patchDict = async (req, res, next) => {
    let updatedResponse;
    const constant = {
      id: req.body.id,
      genre: req.body.genre,
      translation: req.body.translation,
      definitions: req.body.definitions,
      adjectives: req.body.adjectives,
      synonyms: req.body.synonyms,
    };
    updatedResponse = await UpdateService.updateRecord(Dictionary, req.body, req.params);
    if (!updatedResponse) return next(ApiError.notFoundRequest(`Resource does not exist`));

    res.status(200).json({ state: true }).data = updatedResponse;
    next();
  };

  //handler for batch-uploads from offlineStore.
  //todo: should exist for {trans, dict & quiz}.
  static batchUploadDict = async (req, res, next) => {
    //* Special, and needs to explicit the error, hence not using the catchAll.
    //* Logs a E11000 duplicate key error collection if redundancy is caught.
    try {
      const uploads = await Dictionary.create(req.body);
      res.status(200).json({ state: true, data: uploads }).data = uploads;
      next();
    } catch (err) {
      const {
        keyValue: { name },
      } = err;
      logger.error(err.message);
      return res.status(500).json({ message: `${name} already exists in database` });
    }
  };
}

export { DictController };
