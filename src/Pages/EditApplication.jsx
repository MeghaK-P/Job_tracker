import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"

import { getApplicationAPI, updateApplicationAPI } from "../services/allAPI"

function EditApplication() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    userId: "",
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

  useEffect(() => {

    const fetchApplication = async () => {

      try {

        const response = await getApplicationAPI(id)
        const data = response.data

        setFormData({
          userId: data.userId,
          company: data.company || "",
          position: data.position || "",
          location: data.location || "",
          jobType: data.jobType || "Full Time",
          status: data.status || "Applied",
          applicationDate: data.applicationDate || "",
          reminderDate: data.reminderDate || "",
          salary: data.salary || "",
          jobLink: data.jobLink || "",
          notes: data.notes || ""
        })

      } catch (error) {

        console.log(error)
        alert("Unable to load application.")
        navigate("/applications")

      }
    }

    fetchApplication()

  }, [id, navigate])


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await updateApplicationAPI(id, formData)

      console.log("Application updated:", response.data)

      navigate(`/applications/${id}`)

    } catch (error) {

      console.log(error)
      alert("Failed to update application.")

    }

  }


  return (

    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header title="Edit Application" subtitle="Update your job application details" />

        <div className="content-area">

          <form className="application-form" onSubmit={handleSubmit}>

            <div className="form-row">

              <div className="form-group">

                <label>Company</label>

                <input type="text" name="company" value={formData.company} onChange={handleChange} required />

              </div>

              <div className="form-group">

                <label>Position</label>

                <input type="text" name="position" value={formData.position} onChange={handleChange} required />

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Location</label>

                <input type="text" name="location" value={formData.location} onChange={handleChange} required />

              </div>

              <div className="form-group">

                <label>Job Type</label>

                <select name="jobType" value={formData.jobType} onChange={handleChange}>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Status</label>

                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>

              </div>

              <div className="form-group">

                <label>Application Date</label>

                <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleChange} required />

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Reminder Date</label>

                <input type="date" name="reminderDate" value={formData.reminderDate} onChange={handleChange} />

                <small style={{ display: "block", marginTop: "6px", color: "#777", fontSize: "12px" }}>
                  Optional — for interviews or follow-ups.
                </small>

              </div>


              <div className="form-group">

                <label>Salary</label>

                <input type="text" name="salary" value={formData.salary} onChange={handleChange} />

              </div>

            </div>


            <div className="form-group">

              <label>Job Link</label>

              <input type="url" name="jobLink" value={formData.jobLink} onChange={handleChange} />

            </div>


            <div className="form-group">

              <label>Notes</label>

              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="5"></textarea>

            </div>


            <div className="form-actions">

              <button type="button" className="secondary-btn" onClick={() => navigate(`/applications/${id}`)}>Cancel</button>

              <button type="submit" className="primary-btn">Save Changes</button>

            </div>

          </form>

        </div>

      </main>

    </div>

  )
}

export default EditApplication