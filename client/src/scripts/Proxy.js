"use strict";
const url = `http://localhost:5000/api/v1/`;
const url2 = `http://localhost:5000/api/v1/get/`;
const url3 = `http://localhost:5000/api/v1/update/`;
const url4 = `http://localhost:5000/api/v1/delete/`;
import axios from "axios";

class PostProxy {
  static getPosts = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}allWords`);
        const results = await res.data;
        resolve(results);
        if (results.state == false) {
          throw new Error(results.state);
        }
      } catch (err) {
        reject(err);
      }
    });
  };
  /**
   *@params {allSearchQuiz} or {allDictQuiz}.
   */
  static getQuiz = async (quiz) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${quiz}`);
        const results = await res.data;
        resolve(results);
        if (results.state == false) {
          throw new Error(results.state);
        }
      } catch (err) {
        reject(err);
      }
    });
  };
  static createPosts = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}post`, {
          name: data.name,
          translation: data.translation,
          genre: data.genre,
        });
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err?.response?.data);
      }
    });
  };
  static createQuiz = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}post/quiz`, {
          question: data.question,
          answerRight: data.right_answer,
          answerWrong1: data.wrong_answer1,
          answerWrong2: data.wrong_answer2,
        });
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err?.response?.data);
      }
    });
  };
  static batchUpload = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}/post/batch`, data);
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err?.response?.data);
      }
    });
  };
  static deleteOnePost = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url4}${data}`);
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  };
  static updatePost = async (name, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.patch(`${url3}${name}`, { genre: data });
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  };
}

class StateProxy {
  //saves offline data
  /** @param {string} data @returns A promise that resolves with boolean */
  static useSwitch = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url2}${data}`);
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  };
  /** @returns A boolean of App state */
  static getState = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url2}state`);
        const results = await res.data;
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  };
}

export { PostProxy, StateProxy };
