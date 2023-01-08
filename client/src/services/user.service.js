import axios from "axios";
import { authRoute } from "../app/routes/api.routes";
import { responseHandler, requestOptions } from "../helpers";

export const userService = {
  getAll,
  getByEmail,
  getOneCached,
  getAllCached,
};

async function getAll(role) {
  const res = await axios(requestOptions.get(role));
  return responseHandler(res);
}

async function getByEmail(email, role) {
  const res = await axios(requestOptions.getOne(role, email));
  return responseHandler(res);
}

function getAllCached() {}

function getOneCached(email) {}
