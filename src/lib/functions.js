const sendRequest = (
  url,
  options = { method: 'get' },
  useAuthorization = true
) => {
  const token = localStorage.getItem('token')
  const { headers = {}, ...rest } = options
  let newHeaders = headers
  // append Authorization header to headers
  if (useAuthorization) {
    newHeaders = Object.assign(newHeaders, {
      "X-Auth-Token" : "ZHHyc5KAzOJB8TpIBNhbfGhMmUEouYhVuKnq4DbcDrO0WaaMqzO3M5sB0rMPJQ6HncQ=",
      Accept: 'application/json'
    })
  }
  var full_url = "http://rest-api.local"+url;
  return fetch(full_url, { ...rest, headers: newHeaders })
}

const getCurrentPosition = (success, error, options) => {
  navigator.geolocation.getCurrentPosition(success, error, {
    maximumAge: Infinity
  })
}

export { sendRequest, getCurrentPosition }
