"use strict";
import isOnline from "is-online";
import { PostProxy, StateProxy } from "./Proxy.js";
import { get, set, del } from "idb-keyval";
const { getState, useSwitch } = StateProxy;
const {
  getWords,
  getDicts,
  registerWord,
  registerQuiz,
  batchUpload,
  updatePost,
  deleteOnePost,
} = PostProxy;

class Requests {
  /**
   * @param {string} ok @param {string} serve @param {Array}
   * store @param {string} store @param {string} fail
   */
  static fetchAllPost = async (ok, serve, store, fail) => {
    let response;
    try {
      ok.value = false;
      serve.value = true;

      setTimeout(async () => {
        store.value = await getWords();
        let { state, data } = store.value;
        if (
          state
            ? ((serve.value = false), (ok.value = true))
            : ((ok.value = false), (serve.value = false), (fail.value = true))
        );
        return (response = data);
      }, 2000);
    } catch (err) {
      if (
        !err.state
          ? ((serve.value = false), (fail.value = true))
          : (fail.value = false)
      );
      return (response = "Error while fetching data");
      //todo: /* use a logger here instead to get err-message. */
    }
  };

  static fetchWords = async () => {
    let response;
    try {
      const store = await getWords();
      let { state, data } = store;
      return (response = data);
    } catch (err) {
      return (response = "Error while fetching words");
      //todo: /* use a logger here instead to get err-message. */
    }
  };

  static fetchDictionary = async (msg = "") => {
    let response;
    try {
      const store = await getDicts();
      let { state, data } = store;
      response = data;
    } catch (err) {
      return (msg = "Error while fetching records");
      //todo: /* use a logger here instead to get err-message. */
    }
  };

  /**
   * @param {string} ok @param {string} message @param {string} load
   * @param {string} fail @param {string} name
   * @param {string} genre @param {string} translation
   */
  static addNewPost = async (
    fail,
    load,
    message,
    ok,
    name,
    translation,
    genre,
    constant
  ) => {
    try {
      fail.value = false;
      load.value = true;
      const newObj = Utilities.returnObject(name, translation, genre);
      let res = await registerWord(newObj, constant);
      const { state, data } = res;
      setTimeout(async () => {
        if (
          state
            ? ((load.value = false), (ok.value = true))
            : ((load.value = false), (ok.value = false))
        );
      }, 2000);
    } catch (err) {
      if (
        (!err.state
          ? ((load.value = false), (fail.value = true))
          : (fail.value = false),
        (message.value = "Error occurred while uploading word"))
      );
      //todo: should logger here, err-message must not go to user!
    }
  };

  static addNewQuiz = async (
    constant,
    fail,
    load,
    ok,
    question,
    right_answer,
    wrong_answer,
    wrong_answer2 = ""
  ) => {
    let response;
    try {
      fail.value = false;
      load.value = true;
      const newObj = {
        constant,
        question,
        right_answer,
        wrong_answer,
        wrong_answer2,
      };
      const res = await registerQuiz(newObj, constant);
      const { state, data } = res;
      setTimeout(async () => {
        if (
          state
            ? ((load.value = false), (ok.value = true))
            : ((load.value = false), (ok.value = false))
        );
        return (response = res);
      }, 2000);
    } catch (err) {
      load.value = false;
      fail.value = true;
      response = err.message;
      //todo: should logger here.
    }
    return response;
  };

  /**
   * @param {string} ok @param {string} message  @param {string} load
   * @param {Function}use @param {string} del_con @param {string} fail
   */
  static deletePost = async (fail, load, del_con, message, ok, payload) => {
    try {
      fail.value = false;
      load.value = true;
      const res = await deleteOnePost(del_con.value, payload.value);
      const { state, data } = res;
      setTimeout(async () => {
        if (
          state
            ? ((load.value = false), (ok.value = true))
            : ((load.value = false), (ok.value = false))
        );
      }, 2000);
    } catch (err) {
      if (!err || err == null) {
        return `An unknown error occurred`;
      }
      return (
        (load.value = false), (fail.value = true), (message.value = err.message)
      );
      //todo: should logger here.
    }
  };
  /**
   * @param {string} ok @param {string} message
   * @param {string} fail @param {string} load
   */
  static patchPost = async (
    fail,
    ok,
    load,
    message,
    name = "",
    genre = "",
    translation = "",
    code = 0,
    right = "",
    wrong1 = "",
    wrong2 = "",
    constant = ""
  ) => {
    try {
      fail.value = false;
      load.value = true;
      const newObj = { name, translation, genre, code, right, wrong1, wrong2 };
      console.log(newObj);
      message.value = await updatePost(constant, newObj);
      const { state, data } = message.value;
      setTimeout(async () => {
        if (
          state
            ? ((load.value = false), (ok.value = true))
            : ((load.value = false), (ok.value = false))
        );
      }, 2000);
    } catch (err) {
      if (!err) {
        return `An unknown error occurred`;
      }
      return (
        (load.value = false), (fail.value = true), (message.value = err.message)
      );
    }
  };

  //!! TO BE Deprecated pre-production!
  static useRefreshStore = (all, Router) => {
    all.length = 0;
    Utilities.useReload(all, true, 1000, Router);
  };
}

class Utilities {
  /**
   * @returns A new object
   * @param {string} translation @param {string} genre @param {string} name
   */
  static returnObject = (name, translation, genre) => {
    let newObj = {
      name,
      translation,
      genre,
    };
    return newObj;
  };

  /** @param {string} data  */
  //!! TO BE Deprecated pre-production!
  static returnSwitch = async (data, l_load, l_loaded, c_load, c_loaded) => {
    l_load = data !== "local" ? false : true;
    c_load = data !== "cloud" ? false : true;
    try {
      const res = await useSwitch(data);
      if (res !== true ? (l_loaded = false) : (l_load = true));
      if (res !== true ? (c_loaded = false) : (c_load = true));
      //   c_loaded = res !== true ? (false, c_load) : (true, c_load);
    } catch (err) {
      console.error({
        message: "Error switching databases",
        detail: err.message,
      });
    }
  };

  //!! TO BE Deprecated pre-production!
  /**
   * @param {string} key @param {boolean} value
   *  @param {number} time @param {Function} router
   */
  static useReload = (key, value, time, router) => {
    setTimeout(() => {
      if ((key.value = value)) router.go();
      return;
    }, time);
  };
}

//todo: Get rid of all console-logs and send to logger instead and also to client.
class OfflineStorage {
  /**
   * @description makes a  request to Indexed Storage.
   * @checks if data exists ? returns null : 👇
   * @returns array of data
   */
  static useFetch = async () => {
    let response;
    try {
      const resp = await get("offlineData");
      if (resp == undefined || !resp) {
        response = null;
        console.log("No data was found in IDB");
      } else {
        response = resp;
        console.log("🛒"); //data was found in idb.
      }
    } catch (err) {
      console.error({
        message: "Error fetching local data @ useFetch",
        detail: err.message,
      });
    }
    return response;
  };
  /**
   * @returns true or false if data exists or not in IDB
   * @param {Object} payload @param {[Object]} state
   * @returns {null} if state is null.
   */
  static useExists = async (payload, state) => {
    let response;
    try {
      if (state === null) {
        return;
      }
      //* obj.map is a lil fairly accurate than obj.some.
      const isExists = state.map(
        (obj) =>
          obj.name === payload.name && obj.genre === payload.genre
            ? (response = true) //hence, we can't save the payload.
            : (response = false) //hence, we can save the payload.
      );
    } catch (err) {
      console.error({
        message: `Error while checking for duplicates @ useExists`,
        details: err.message,
      });
    }
    return response;
  };
  /**
   * @param {Object} payload @description checks if payload exists in IDB storage.
   * @returns true if saved, false if it fails as payload exists.
   */
  static useGuard = async (payload) => {
    let response;
    const state = await this.useFetch(); //should return if useFetch rets null||undefined.
    const resp = await this.useExists(payload, state);

    try {
      if (resp === undefined || resp === false) {
        const res = await this.useSave(payload);
        response = res;
      } else {
        response = false;
        console.error("🛑"); //query exists in idb.
      }
    } catch (err) {
      console.error({
        message: "Failed to save @ useGuard",
        detail: err.message,
      });
    }
    return response;
  };
  static useSave = async (payload) => {
    let response;
    let resp;
    try {
      /* sets a new DB with payload if IDb query returns empty,
          appends payload to existing data if IDb is query returns data.
       */
      const localData = await get("offlineData");
      if (
        localData === undefined || !localData
          ? ((resp = await set("offlineData", [payload])),
            (response = resp ? true : false))
          : (localData.push(payload),
            await set("offlineData", localData),
            (response = true),
            console.log("✅"))
      );
    } catch (err) {
      console.error({
        message: `Error occurred while uploading to Indexed storage`,
        details: err.message,
      });
    }
    return response ?? false;
  };
  static handleOffline = async (name, translation, genre) => {
    let response;
    try {
      const resp = await this.useGuard({ name, translation, genre });
      response = resp;
    } catch (err) {
      console.error({
        message: `Error occurred during offline operation`,
        details: err,
      });
    }
    return response ?? false;
  };
  /**
   * @params [words, dict, search, record]
   */
  static pushToCloud = async (constant = "", msg = "") => {
    let response;
    let payload;
    const onlineState = await getState();
    try {
      if (
        onlineState === true
          ? ((payload = await get("offlineData")),
            (response = await batchUpload(payload, constant)),
            (msg = `Offline data has been synchronized`),
            await del("offlineData"))
          : (console.log({ message: `No internet connection to sync data` }),
            (msg = `No internet connection to sync data`))
      );
    } catch (err) {
      //todo: /* use a logger here instead to get err-message. */
      msg = `Error occurred while pushing to cloud`;
      // console.error({
      //   message: `Error occurred while pushing to cloud`,
      //   details: `${err.message}`,
      // });
    }
    return response ?? false;
  };
}

export { OfflineStorage, Utilities, Requests };
