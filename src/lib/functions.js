const sendRequest = (
  url,
  options = { method: 'get' },
  useAuthorization = true
) => {
  console.log("token",localStorage.getItem('user_token'));
  const token = localStorage.getItem('user_token');//localStorage.getItem('token')
  const { headers = {}, ...rest } = options
  let newHeaders = headers
  // append Authorization header to headers
  if (useAuthorization) {
    newHeaders = Object.assign(newHeaders, {
      "X-Auth-Token": token,
    })
  }
  console.log(" process.env.API_URL",process.env);
  var full_url = process.env.REACT_APP_API_URL+url;
  return fetch(full_url, { ...rest, headers: newHeaders })
}

const getCurrentPosition = (success, error, options) => {
  navigator.geolocation.getCurrentPosition(success, error, {
    maximumAge: Infinity
  })
}

export { sendRequest, getCurrentPosition }
