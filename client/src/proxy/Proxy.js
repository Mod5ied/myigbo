"use strict";
import { endPoints } from "../app/routes/api.routes.js";
import axios from "axios";

export class PostProxy {
	/*** function returns a promise of an array of document. */
	static getWords = async (token) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${endPoints.url1}allWords`, {
					headers: { authorization: `Bearer ${token}` },
				});
				const results = await res.data;
				resolve(results);
				if (!results.state) throw new Error(results.state);
			} catch (err) {
				reject(err ?? err.response.data);
			}
		});
	};
	/*** function returns a promise of a dict document. */
	static getDicts = async (token) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${endPoints.url1}allRecords`, {
					headers: { authorization: `Bearer ${token}` },
				});
				const results = await res.data;
				resolve(results);
			} catch (err) {
				reject(err ?? err.response.data);
			}
		});
	};
	/*** function returns a promise of single quiz document. */
	static getQuiz = async (quiz) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${endPoints.url2}${quiz}`, {
					headers: { authorization: `Bearer ${token}` },
				});
				const results = await res.data;
				resolve(results);
				if (results.state == false) throw new Error(results.state);
			} catch (err) {
				reject(err?.response?.data);
			}
		});
	};
	/*** function accepts an object as payload, returns an object. */
	static registerWord = async (data, constant, token) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(
					`${endPoints.url4}${constant}`,
					{
						name: data.name,
						translation: data.translation,
						genre: data.genre,
						definitions: data.definitions,
					},
					{ headers: { authorization: `Bearer ${token}` } }
				);
				const results = await res.data;
				resolve(results);
			} catch (err) {
				reject(err?.response.data);
			}
		});
	};

	/*** function accepts an object with 4 properties, returns an object. */
	static registerQuiz = async (data, constant, token) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(
					`${endPoints.url4}quiz/${constant}`,
					{
						question: data.question,
						answerRight: data.right_answer,
						answerWrong1: data.wrong_answer,
						answerWrong2: data.wrong_answer2,
					},
					{
						headers: { authorization: `Bearer ${token}` },
					}
				);
				const results = await res.data;
				resolve(results);
			} catch (err) {
				reject(err?.response.data);
			}
		});
	};
	/*** function asynchronously accepts an array of object and returns an object. */
	static batchUpload = async (data = [], constant, token) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${endPoints.url5}${constant}`, data, {
					headers: { authorization: `Bearer ${token}` },
				});
				const results = await res.data;
				resolve(results);
			} catch (err) {
				reject(err ?? err.response.data);
			}
		});
	};
	/*** function accepts a text as payload and returns an object. */
	static deleteOnePost = async (data, constant, token) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.delete(`${endPoints.url7}${constant}`, {
					data: { name: data },
					headers: { authorization: `Bearer ${token}` },
				});
				const results = await res.data;
				resolve(results);
			} catch (err) {
				reject(err ?? err.response.data);
			}
		});
	};
	//! sends data in its request body rather than the params object.
	/*** function accepts an object as payload, a string params and returns an object. */
	static updatePost = async (constant, data, token) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.patch(
					`${endPoints.url6}${constant}`,
					{
						name: data.name,
						translation: data.translation,
						genre: data.genre,
						definitions: data?.definitions,
						adjectives: data?.adjectives,
						synonyms: data?.synonyms,
					},
					{ headers: { authorization: `Bearer ${token}` } }
				);
				const results = await res.data;
				resolve(results);
			} catch (err) {
				reject(err ?? err.response.data);
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
				reject(err ?? err.message);
			}
		});
	};
}
