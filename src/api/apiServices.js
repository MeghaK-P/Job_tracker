import axiosinstance from "./axiosinstance"

const apiService = async (
  httpMethod,
  url,
  reqBody
) => {
  const reqconfig = {
    method: httpMethod,
    url: url,
    data: reqBody
  }

  try {

    const response = await axiosinstance(reqconfig)

    return response

  } catch (err) {
    throw err
  }

}

export default apiService