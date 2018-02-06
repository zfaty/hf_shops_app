const sendRequest = (
  url,
  options = { method: 'get' },
  useAuthorization = true
) => {
  const token = localStorage.getItem('user_token');
  const { headers = {}, ...rest } = options
  let newHeaders = headers
  // add X-Auth-Token
  if (useAuthorization) {
    newHeaders = Object.assign(newHeaders, {
      "X-Auth-Token": token,
    })
  }
  var full_url = process.env.REACT_APP_API_URL+url;
  return fetch(full_url, { ...rest, headers: newHeaders })
}

const getCurrentPosition = (success, error, options) => {
  navigator.geolocation.getCurrentPosition(success, error, {
    maximumAge: Infinity
  })
}

export { sendRequest, getCurrentPosition }
