import Axios from "axios";

const AppService = () => {
  const axios = Axios.create({
    baseURL: "https://apuestadota.com:8080/api",

    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  const getBaseUrl = () => {
    return "https://apuestadota.com:8080/api";
  };

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getUser = () => {
    const _u = localStorage.getItem("user");

    if (_u == null) return null;

    return JSON.parse(_u);
  };

  const makeDelete = (endpoint, params, requireAuth = false) => {
    if (requireAuth) {
      let user = getUser();

      params.api_token = user.api_token;
    }

    let _urlParams = new URLSearchParams(params);

    return axios.delete(endpoint + "?" + _urlParams.toString());
  };

  const makeGet = (endpoint, params, requireAuth = false) => {
    if (requireAuth) {
      let user = getUser();

      params.api_token = user.api_token;
    }

    let _urlParams = new URLSearchParams(params);

    return axios.get(endpoint + "?" + _urlParams.toString());
  };

  const makePost = (endpoint, params, requireAuth = false) => {
    if (requireAuth) {
      let user = getUser();

      params.api_token = user.api_token;
    }

    return axios.post(endpoint, params);
  };

  const makePut = (endpoint, params, requireAuth = false) => {
    if (requireAuth) {
      let user = getUser();

      params.api_token = user.api_token;
    }

    return axios.put(endpoint, params);
  };

  return {
    makeDelete,
    makeGet,
    makePost,
    makePut,
    setUser,
    getUser,
    getBaseUrl,
  };
};

export default AppService;
