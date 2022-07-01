"use strict";
import isOnline from "is-online";
import { PostProxy, StateProxy } from "./Proxy.js";
import { get, set, del } from "idb-keyval";
const { getState } = StateProxy;
const { getWords, getDicts, registerWord, registerQuiz, batchUpload, updatePost, deleteOnePost } = PostProxy;

class Requests {
  /**
   * @param {string} ok @param {string} serve @param {Array}
   * store @param {string} store @param {string} fail @param {string} constant
   */
  static fetchWords = async (ok, serve, store, fail) => {
    let response;
    try {
      ok.value = false;
      serve.value = true;
      setTimeout(async () => {
        const { state, data } = await getWords();
        if (!state) {
          (ok.value = false), (serve.value = false), (fail.value = true);
          throw new Error("No data found");
        }
        return (serve.value = false), (ok.value = true), (store.value = data);
      }, 2000);
    } catch (err) {
      serve = false;
      fail = true;
      return (response = err.message || "Error while fetching data");
      //todo: /* use a logger here instead to get err-message. */
    }
  };

  static fetchAllWords = async () => {
    let response;
    try {
      const { state, data } = await getWords();
      return (response = data);
    } catch (err) {
      return (response = "Error while fetching words");
      //todo: /* use a logger here instead to get err-message. */
    }
  };

  static fetchDictionary = async (ok, serve, store, fail) => {
    let response;
    try {
      ok.value = false;
      serve.value = true;
      setTimeout(async () => {
        const res = await getDicts();
        let { state, data } = res;
        if (!state) {
          (serve.value = false), (ok.value = false), (fail.value = true);
          throw new Error("No data found");
        }
        return (store.value = data), (ok.value = true), (serve.value = false);
      }, 2000);
    } catch (err) {
      serve.value = false;
      fail.value = true;
      return (response = err.message || "Error while fetching data");
      //todo: /* use a logger here instead to get err-message. */
    }
  };

  /**
   * @param {string} ok @param {string} message @param {string} load
   * @param {string} fail @param {string} name
   * @param {string} genre @param {string} translation
   */
  static addNewWord = async (fail, load, message, ok, name, translation, genre, definitions, constant) => {
    try {
      fail.value = false;
      load.value = true;
      const newObj = { name, translation, genre, definitions };
      let res = await registerWord(newObj, constant);
      const { state, data } = res;
      setTimeout(async () => {
        if (state) {
          return (load.value = false), (ok.value = true);
        }
        return (load.value = false), (ok.value = false);
      }, 2000);
    } catch (err) {
      console.log(err);
      load.value = false;
      fail.value = true;
      message.value = err.message; //|| "Error occurred while uploading word";
      //todo: should logger here, err-message must not go to user!
    }
  };
  static addNewDict = async (fail, load, message, ok, name, trans, genre, definitions, constant) => {
    try {
      fail.value = false;
      load.value = true;
      const t = trans.split(",");
      const newObj = {
        name,
        translation: [{ commonTranslate: t[0], primitive: [t[1]] }],
        genre,
        definitions: [definitions],
      };
      let res = await registerWord(newObj, constant);
      const { state, data } = res;
      setTimeout(async () => {
        if (state ? ((load.value = false), (ok.value = true)) : ((load.value = false), (ok.value = false)));
      }, 2000);
    } catch (err) {
      load.value = false;
      fail.value = true;
      message = err.message || "Error occurred while uploading word";
      //todo: should logger here, err-message must not go to user!
    }
  };

  static addNewQuiz = async (
    constant,
    fail,
    load,
    ok,
    errMsg,
    question,
    right_answer,
    wrong_answer,
    wrong_answer2
  ) => {
    let response;
    let newObj;
    let res;
    try {
      fail.value = false;
      load.value = true;
      switch (constant) {
        case "search":
          newObj = { question, right_answer, wrong_answer };
          res = await registerQuiz(newObj, constant);
          break;
        case "dict":
          newObj = { question, right_answer, wrong_answer, wrong_answer2 };
          res = await registerQuiz(newObj, constant);
          break;
        default:
          break;
      }
      const { state, data } = res;
      setTimeout(async () => {
        if (state) {
          return (load.value = false), (ok.value = true);
        }
        return (load.value = false), (ok.value = false);
      }, 2000);
    } catch (err) {
      load.value = false;
      fail.value = true;
      errMsg = err.message || "Error occurred while uploading word";
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
        if (state ? ((load.value = false), (ok.value = true)) : ((load.value = false), (ok.value = false)));
      }, 2000);
    } catch (err) {
      load.value = false;
      fail.value = true;
      return (message.value = err.message);
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
    definitions = "",
    code = 0,
    right = "",
    wrong1 = "",
    wrong2 = "",
    constant = ""
  ) => {
    try {
      fail.value = false;
      load.value = true;
      const newObj = {
        name,
        translation,
        genre,
        definitions,
        code,
        right,
        wrong1,
        wrong2,
      };
      const res = await updatePost(constant, newObj);
      const { state, data } = res;
      setTimeout(async () => {
        if (state) {
          return (load.value = false), (ok.value = true);
        }
        return (load.value = false), (ok.value = false);
      }, 2000);
    } catch (err) {
      load.value = false;
      fail.value = true;
      return (message.value = err.message);
      //todo: should logger here.
    }
  };

  //!! TO BE Deprecated pre-production!
  static useRefreshStore = (all, Router) => {
    all.length = 0;
    Utilities.useReload(all, true, 1000, Router);
  };
}

class Utilities {
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
          ? ((resp = await set("offlineData", [payload])), (response = resp ? true : false))
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
