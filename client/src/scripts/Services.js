"use strict";
import { PostProxy, StateProxy } from "./Proxy.js";
const { getPosts, createPosts, updatePost, deleteOnePost } = PostProxy;
const { getState, useSwitch } = StateProxy;

class Requests {
  /**
   * @param {string} ok @param {string} serve @param {Array} all @param {string} ok
   * @param {Function}get @param {Array} use @param {string} fail
   */
  static fetchAllPost = async (ok, serve, all, fail) => {
    let post_data;
    try {
      ok.value = false;
      serve.value = true;

      setTimeout(async () => {
        all.value = await getPosts();
        let { state, data } = all.value;
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
      console.error({ message: `Error while getting posts: ${err.state}` });
    }
    return post_data;
  };
  /**
   * @param {string} ok @param {string} message @param {Function} ret @param {string} load
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
    router
  ) => {
    try {
      fail.value = false;
      load.value = true;
      const newObj = Utilities.returnObject(name, translation, genre);
      message.value = await createPosts(newObj);
      const { state, data } = message.value;
      setTimeout(async () => {
        if (
          state
            ? ((load.value = false), (ok.value = true))
            : ((load.value = false), (ok.value = false))
        )
          Utilities.useReload(ok, state, 2000, router);
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
    unref,
    router
  ) => {
    try {
      fail.value = false;
      load.value = true;
      message.value = await deleteOnePost(unref(del_con.value));
      const { state, data } = message.value;
      setTimeout(async () => {
        if (
          state
            ? ((load.value = false), (ok.value = true))
            : ((load.value = false), (ok.value = false))
        );
        Utilities.useReload(ok, state, 2000, router);
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
   * @param {Function}use @param {string} nom @param {string} genre @param {string} fail
   */
  static patchPost = async (fail, ok, load, message, nom, genre, router) => {
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
        Utilities.useReload(ok, state, 2000, router);
      }, 2000);
    } catch (err) {
      if (
        !err.state
          ? ((load.value = false), (fail.value = true))
          : ((fail.value = false), (message.value = err.message))
      );
    }
  };
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
  /**
   * @returns A reactive String
   * @param {string} load @param {string} state @param {Function} get @param {string} fail
   */
  static returnState = async (load, state, fail) => {
    load.value = true;
    fail.value = false;
    setInterval(async () => {
      try {
        state.value = await getState();
        load.value = false;
      } catch (err) {
        load.value = false;
        fail.value = true;
        console.error({
          message: `Failed to fetch server-state: ${err.message}`,
        });
      }
    }, 10000);
  };
  /** @param {string} data  */
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
        detail: `err.message`,
      });
    }
  };
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

export { Utilities, Requests };
