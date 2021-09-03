import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { AsyncStorage } from "react-native";

import {
  url,
  routes,
  requestConfig,
  requestConfigMultipart,
} from "../../config/api.json";

let token = "";
(async () => {
  token = await SecureStore.getItemAsync("token");
  requestConfig.headers["X-Auth-Token"] = token;
  requestConfigMultipart.headers["X-Auth-Token"] = token;
})();

export const login = (body) => async (dispatch) => {
  try {
    const user = await axios
      .post(`${url}${routes.login}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    // console.log("login res cread ",user.data)
    await SecureStore.setItemAsync("token", user.data.token);

    dispatch({
      type: "login",
      user,
    });
  } catch (e) {
    console.log(e);
    // dispatch({
    //   type: "error",
    //   error: e.response.data,
    // });
  }
};

export const changePassword = (body, cb) => async (dispatch) => {
  try {
    const user = await axios
      .post(`${url}${routes.changePassword}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    cb(true);
  } catch (e) {
    console.log(e);
    // dispatch({
    //   type: "error",
    //   error: e.response.data,
    // });
    cb(false);
  }
};

export const editUserDetails = (body, cb) => async (dispatch) => {
  try {
    body.isEditAllData = true;
    body.profilePic = body.image.base64FileString;
    const user = await axios
      .post(`${url}${routes.editUserDetails}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    dispatch({
      type: "editUserDetails",
      user: user.data,
    });
    cb(true);
  } catch (e) {
    console.log(e);
    // dispatch({
    //   type: "error",
    //   error: e.response.data,
    // });
    cb(false);
  }
};

export const editUserVarification = (body, cb) => async (dispatch) => {
  try {
    body.isEditAllData = false;
    const user = await axios
      .post(`${url}${routes.editUserDetails}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    dispatch({
      type: "editUserDetails",
      user: user.data,
    });
    cb(true);
  } catch (e) {
    console.log(e);
    cb(false);
  }
};

export const logout = (callback) => async (dispatch) => {
  try {
    await SecureStore.setItemAsync("token", "");
    callback(true);
  } catch (e) {
    console.log(e);
    callback(false);
  }
};

export const register = (body) => async (dispatch) => {
  try {
    const user = await axios
      .post(`${url}${routes.register}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    dispatch({
      type: "register",
      user,
    });
  } catch (e) {
    dispatch({
      type: "error",
      error: e.response.data,
    });
  }
};

export const getUsers = (body, callback) => async (dispatch) => {
  try {
    const user = await axios
      .post(`${url}${routes.getUsers}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });

    callback();

    dispatch({
      type: "getUsers",
      user: user.data.user,
    });
  } catch (e) {
    console.log("error", e.response.data);
    dispatch({
      type: "error",
      error: e.response.data,
    });
  }
};

//
export const getCurrentUser = (body, callback) => async () => {
  token = await SecureStore.getItemAsync("token");
  requestConfig.headers["X-Auth-Token"] = token;
  try {
    const user = await axios
      .post(`${url}${routes.getCurrentUser}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    callback(user.data);
  } catch (e) {
    callback(null);
  }
};

export const setError = (body) => async (dispatch) => {
  dispatch({
    type: "error",
    error: body,
  });
};

export const isAuthanticate = async (body, callback) => {
  token = await SecureStore.getItemAsync("token");
  requestConfig.headers["X-Auth-Token"] = token;
  try {
    const responce = await axios
      .post(`${url}`, body, requestConfig)
      .catch((e) => {
        throw e;
      });
    if (responce.status == 200) callback(true);
    else callback(false);
  } catch (e) {
    callback(false);
  }
};

// export const setError = (body) => async (dispatch) => {
//   dispatch({
//     type: "error",
//     error: body,
//   });
// };
