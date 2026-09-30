import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"

import { addApplicationAPI } from "../services/allAPI"

function AddApplication() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    jobType: "Full Time",
    status: "Applied",
    applicationDate: "",
    reminderDate: "",
    salary: "",
    jobLink: "",
    notes: ""
  })


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    const loggedUser = JSON.parse(
      localStorage.getItem("loggedUser")
    )

    if (!loggedUser) {
      navigate("/")
      return
    }


    const applicationData = {
      ...formData,
      userId: loggedUser.id
    }


    try {

      const response =
        await addApplicationAPI(applicationData)

      console.log(
        "Application added:",
        response.data
      )

      navigate("/applications")

    } catch (error) {

      console.log(error)

      alert(
        "Failed to add application."
      )
    }
  }

  return (

    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header
          title="Add Application"
          subtitle="Add a new job application to your tracker"
        />

        <div className="content-area">

          <form
            className="application-form"
            onSubmit={handleSubmit}
          >

            <div className="form-row">

              <div className="form-group">

                <label>Company</label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />

              </div>


              <div className="form-group">

                <label>Position</label>

                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Enter job position"
                  required
                />

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter job location"
                  required
                />

              </div>


              <div className="form-group">

                <label>Job Type</label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >

                  <option value="Full Time">
                    Full Time
                  </option>

                  <option value="Part Time">
                    Part Time
                  </option>

                  <option value="Internship">
                    Internship
                  </option>

                  <option value="Contract">
                    Contract
                  </option>

                </select>

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Shortlisted">
                    Shortlisted
                  </option>

                  <option value="Interview">
                    Interview
                  </option>

                  <option value="Offer">
                    Offer
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Application Date
                </label>

                <input
                  type="date"
                  name="applicationDate"
                  value={formData.applicationDate}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>
                  Reminder Date
                </label>

                <input
                  type="date"
                  name="reminderDate"
                  value={formData.reminderDate}
                  onChange={handleChange}
                />

                <small
                  style={{
                    display: "block",
                    marginTop: "6px",
                    color: "#777",
                    fontSize: "12px"
                  }}
                >
                  Optional — for interviews or follow-ups.
                </small>

              </div>


              <div className="form-group">

                <label>Salary</label>

                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Example: 5.5 LPA"
                />

              </div>

            </div>


            <div className="form-group">

              <label>Job Link</label>

              <input
                type="url"
                name="jobLink"
                value={formData.jobLink}
                onChange={handleChange}
                placeholder="https://example.com/job"
              />

            </div>


            <div className="form-group">

              <label>Notes</label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes..."
                rows="5"
              ></textarea>

            </div>


            <div className="form-actions">

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  navigate("/applications")
                }
              >
                Cancel
              </button>


              <button
                type="submit"
                className="primary-btn"
              >
                Add Application
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  )
}

export default AddApplication