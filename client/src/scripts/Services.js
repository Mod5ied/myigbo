"use strict";
import isOnline from "is-online";
import { PostProxy, StateProxy } from "./Proxy.js";
import { get, set, del } from "idb-keyval";
const { getState, useSwitch } = StateProxy;
const {
  getWords,
  getDicts,
  createPosts,
  createQuiz,
  batchUpload,
  updatePost,
  deleteOnePost,
} = PostProxy;

class Requests {
  /**
   * @param {string} ok @param {string} serve @param {Array} store @param {string} ok
   * @param {Function}get @param {string} fail
   */
  static fetchAllPost = async (ok, serve, store, fail) => {
    let post_data;
    try {
      ok.value = false;
      serve.value = true;

      setTimeout(async () => {
        store.value = await getWords();
        let { state, data } = store.value;
        post_data = data;
        if (
          state
            ? ((serve.value = false), (ok.value = true))
            : ((ok.value = false), (serve.value = false), (fail.value = true))
        );
      }, 2000);
    } catch (err) {
      if (
        !err.state
          ? ((serve.value = false), (fail.value = true))
          : (fail.value = false)
      );
      //! get this console outta here ASAP!
      console.error({ message: `Error while getting posts: ${err.state}` });
    }
    return post_data;
  };

  static fetchWords = async () => {
    let response;
    try {
      const store = await getWords();
      let { state, data } = store;
      response = data;
    } catch (err) {
      throw Error("Error while getting words");
      /* can also log here */
    }
    return response;
  };

  static fetchDictionary = async () => {
    let response;
    try {
      const store = await getDicts();
      let { state, data } = store;
    } catch (err) {
      throw Error("Error while getting dictionary records");
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
      message.value = await createPosts(newObj, constant);
      const { state, data } = message.value;
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
        (message.value = err.message))
      )
        console.error({
          message: `Error while uploading post: ${err.message}`,
        });
    }
  };

  static addNewQuiz = async (
    fail,
    load,
    ok,
    question,
    right_answer,
    wrong_answer1,
    wrong_answer2
    // router
  ) => {
    try {
      fail.value = false;
      load.value = true;
      const newObj = Utilities.returnObject(
        question,
        right_answer,
        wrong_answer1,
        wrong_answer2
      );
      await createQuiz(newObj);
      const { state, data } = message.value;
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
        (message.value = err.message))
      )
        console.error({
          message: `Error while uploading post: ${err.message}`,
        });
    }
  };

  /**
   * @param {string} ok @param {string} message  @param {string} load
   * @param {Function}use @param {string} del_con @param {string} fail
   */
  static deletePost = async (
    fail,
    load,
    del_con,
    message,
    ok,
  ) => {
    try {
      fail.value = false;
      load.value = true;
      message.value = await deleteOnePost(del_con.value);
      const { state, data } = message.value;
      setTimeout(async () => {
        if (
          state
            ? ((load.value = false), (ok.value = true))
            : ((load.value = false), (ok.value = false))
        );
      }, 2000);
    } catch (err) {
      if (
        !err.state
          ? ((load.value = false), (fail.value = true))
          : ((fail.value = false), (message.value = err.message))
      );
      console.error({ message: `Error while removing ${err.message}` });
    }
  };
  /**
   * @param {string} ok @param {string} message  @param {string} load
   * @param {string} nom @param {string} genre @param {string} fail
   */
  static patchPost = async (fail, ok, load, message, nom, genre) => {
    try {
      fail.value = false;
      load.value = true;
      message.value = await updatePost(nom.value, genre.value);
      const { state, data } = message.value;

      setTimeout(async () => {
        if (
          state
            ? ((load.value = false), (ok.value = true))
            : ((load.value = false), (ok.value = false))
        );
      }, 2000);
    } catch (err) {
      if (
        !err.state
          ? ((load.value = false), (fail.value = true))
          : ((fail.value = false), (message.value = err.message))
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
  static pushToCloud = async () => {
    let response;
    let payload;
    const onlineState = await getState();
    try {
      if (
        onlineState === true
          ? ((payload = await get("offlineData")),
            (response = await batchUpload(payload)),
            await del("offlineData"))
          : console.log({ message: `No internet connection to sync data` })
      );
    } catch (err) {
      //todo: /* use a logger here instead, and display error to user. */
      console.error({
        message: `Error occurred while pushing to cloud`,
        details: `${err.message}`,
      });
    }
    return response ?? false;
  };
}

export { OfflineStorage, Utilities, Requests };
