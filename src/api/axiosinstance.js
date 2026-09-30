import axios from "axios"

const axiosinstance = axios.create({
  baseURL: "https://job-tracker-server-a45w.onrender.com",
  timeout: 5000
})
axiosinstance.interceptors.response.use(
  (response) => {
 console.log("API response received")
    return response

  },

  (error) => {

    if (error.response) {

      const status = error.response.status

      if (status === 401) {

        console.log("Unauthorised access")

      } else if (status === 404) {

        console.log("API not found")

      } else if (status === 500) {

        console.log(
          "Something went wrong. Please try again later."
        )

      } else {

        console.log(
          "Error: " + error.message
        )

      }

    } else if (error.request) {

      console.log("No response from server")

    } else {

      console.log("Error: " + error.message)

    }

    return Promise.reject(error)

  }

)

export default axiosinstance