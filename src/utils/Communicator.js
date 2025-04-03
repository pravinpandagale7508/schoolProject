import axios from "./http-common";

export const REQUEST_ACTIONS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

/* Rest API call send request
  @param url: request URL
  @param method: Request type (GET | POST | PUT | DELETE)
  @param body: Post | Put | Delete body request in object format
  @param options: contain successCallback | failedCallback to handle request result
*/

export const sendRequest = async function (url, method, body, options) {
  try {
      const authToken = getCookie('SESSION_ID');
    let reqBody = '';

    if (method === REQUEST_ACTIONS.POST || method === REQUEST_ACTIONS.PUT || method === REQUEST_ACTIONS.DELETE) {
      reqBody = body;
    }

    const settings = {
      method: method,
      url: url,
      data: reqBody,
    };

    if (authToken) {
      settings['headers'] = {
        Authorization: `Bearer ${authToken}`,
      };
    }

    const result = await axios.request(settings);
    if (options.successCallback) {
      return options.successCallback(result.data);
    }

    return result.data;
  } catch (error) {
    if (error?.response && options.failedCallback) {
      return options.failedCallback(error.response);
    }

    return options.failedCallback(error);
  }
};

export const getCookie = function (name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0, cnt = cookies.length; i < cnt; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};
export const setCookie = function(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

