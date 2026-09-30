import apiService from "../api/apiServices"


// Register user
export const registerUserAPI = async (userDetails) => {

  return await apiService(
    "POST",
    "/users",
    userDetails
  )

}


// Login user
export const loginUserAPI = async (
  email,
  password
) => {

  return await apiService(
    "GET",
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    {}
  )

}


// Check whether email already exists
export const checkUserEmailAPI = async (email) => {

  return await apiService(
    "GET",
    `/users?email=${encodeURIComponent(email)}`,
    {}
  )

}


// ========================================
// APPLICATION APIs
// ========================================

// Get applications belonging to logged-in user
export const getUserApplicationsAPI = async (
  userId
) => {

  return await apiService(
    "GET",
    `/applications?userId=${userId}`,
    {}
  )

}


// Get one application
export const getApplicationAPI = async (
  applicationId
) => {

  return await apiService(
    "GET",
    `/applications/${applicationId}`,
    {}
  )

}


// Add application
export const addApplicationAPI = async (
  applicationDetails
) => {

  return await apiService(
    "POST",
    "/applications",
    applicationDetails
  )

}


// edit application
export const updateApplicationAPI = async (
  applicationId,
  applicationDetails
) => {

  return await apiService(
    "PUT",
    `/applications/${applicationId}`,
    applicationDetails
  )

}


// Delete application
export const deleteApplicationAPI = async (
  applicationId
) => {

  return await apiService(
    "DELETE",
    `/applications/${applicationId}`,
    {}
  )

}