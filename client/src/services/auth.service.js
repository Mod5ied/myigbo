import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { responseHandler } from "../helpers/";
import { authRoute } from "../app/routes/api.routes";

const currentUserSub = new BehaviorSubject(JSON.parse(localStorage.getItem("currentUser")));

async function login(email, password, path, role) {
  if (currentUserSub.value) return responseHandler({ status: 204, message: "token exists" });

  const data = { email, password, path, role };
  try {
    const res = await axios.post(authRoute.url(role, path), data);
    const result = await res.data;
    return responseHandler(result);
  } catch (err) {
    return responseHandler(err.response);
  }
}

function clientlogout() {
  //remove user data from localstorage.
  localStorage.removeItem("currentUser");
  currentUserSub.next(null);
  const data = { email, password, path, role };
  let response;
}

async function signout(email, password, path, role) {
  const data = { email, password, path, role };
  try {
    const res = await axios.post(authRoute.url(role, path), data);
    const result = await res.data;
    return responseHandler(result);
  } catch (err) {
    return responseHandler();
  }
}

async function signup(email, password, path, role) {
  const data = { email, password, path, role };
  try {
    const res = await axios.post(authRoute.url(role, path), data);
    const result = await res.data;
    return responseHandler(result);
  } catch (err) {
    return responseHandler(err.response);
  }
}

const authService = {
  login,
  signup,
  signout,
  clientlogout,
  currentUser: currentUserSub.asObservable(),
  get currentUserValue() {
    return currentUserSub.value;
  },
};

export { authService };
