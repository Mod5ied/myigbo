"use strict";
import axios from "axios";
const url1 = `http://localhost:5000/api/v1/`;
const url2 = `http://localhost:5000/api/v1/quiz/`;
const url3 = `http://localhost:5000/api/v1/get/`;
const url4 = `http://localhost:5000/api/v1/post/`;
const url5 = `http://localhost:5000/api/v1/post/batch/`;
const url6 = `http://localhost:5000/api/v1/update/`;
const url7 = `http://localhost:5000/api/v1/delete/`;

export class PostProxy {
  static getWords = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url1}allWords`);
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
        const res = await axios.get(`${url1}allRecords`);
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
        const res = await axios.get(`${url2}${quiz}`);
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
        const res = await axios.post(`${url4}${constant}`, {
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
        const res = await axios.post(`${url4}quiz/${constant}`, {
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
  static batchUpload = async (data = [], constant = "") => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url5}${constant}`, data);
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err.response.data);
      }
    });
  };
  static deleteOnePost = async (constant = "", data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url7}${constant}`, {
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
        const res = await axios.patch(`${url6}${constant}`, {
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
        const res = await axios.get(`${url3}app_state`);
        const result = await res.data;
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  };
}
