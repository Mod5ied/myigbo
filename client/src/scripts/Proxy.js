"use strict";
import { endPoints } from "../config/index.js";
import axios from "axios";

export class PostProxy {
  static getWords = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${endPoints.url1}allWords`);
        const results = await res.data;
        resolve(results);
        if (!results.state) {
          throw new Error(results.state);
        }
      } catch (err) {
        reject(err.response.data);
      }
    });
  };
  static getDicts = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${endPoints.url1}allRecords`);
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err.response.data);
      }
    });
  };
  /**
   *@params {search} or {dict}.
   */
  static getQuiz = async (quiz = "") => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${endPoints.url2}${quiz}`);
        const results = await res.data;
        resolve(results);
        if (results.state == false) {
          throw new Error(results.state);
        }
      } catch (err) {
        reject(err.response.data);
      }
    });
  };
  /**
   *@params {data}, @constant {word or dict}.
   */
  static registerWord = async (data = {}, constant = "") => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${endPoints.url4}${constant}`, {
          name: data.name,
          translation: data.translation,
          genre: data.genre,
          definitions: data.definitions,
        });
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err?.response?.data);
      }
    });
  };

  /**
   *@params {data}, @constant {search or dict}.
   */
  static registerQuiz = async (data = {}, constant = "") => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${endPoints.url4}quiz/${constant}`, {
          question: data.question,
          answerRight: data.right_answer,
          answerWrong1: data.wrong_answer,
          answerWrong2: data.wrong_answer2,
        });
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err.response.data);
      }
    });
  };
  /**
   *@params {data}, @constant {search or dict}.
   */
  static batchUpload = async (data = [], constant = "") => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${endPoints.url5}${constant}`, data);
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err.response.data);
      }
    });
  };
  /**
   *@params {data}, @constant {search or dict}.
   */
  static deleteOnePost = async (data, constant = "") => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${endPoints.url7}${constant}`, {
          data: { name: data },
        });
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err.response.data);
      }
    });
  };
  //! sends data in its request body rather than the params object.
  static updatePost = async (constant, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.patch(`${endPoints.url6}${constant}`, {
          name: data.name,
          translation: data.translation,
          genre: data.genre,
          definitions: data?.definitions,
          adjectives: data?.adjectives,
          synonyms: data?.synonyms,
        });
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err.response.data);
      }
    });
  };
}

export class StateProxy {
  /** @returns A boolean of App state */
  static getState = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${endPoints.url3}app_state`);
        const result = await res.data;
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  };
}
