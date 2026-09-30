import { useEffect, useState } from "react"
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom"

import {
  Pencil,
  Trash2,
  ArrowLeft,
  ExternalLink
} from "lucide-react"

import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"

import {
  getApplicationAPI,
  deleteApplicationAPI
} from "../services/allAPI"

function ViewApplication() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [application, setApplication] =
    useState(null)


  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null"
  )


  useEffect(() => {

    const fetchApplication = async () => {

      if (!loggedUser) {

        navigate("/")
        return

      }


      try {

        const response =
          await getApplicationAPI(id)

        const data = response.data


        // Check ownership

        if (
          String(data.userId) !==
          String(loggedUser.id)
        ) {

          alert(
            "You are not allowed to view this application."
          )

          navigate("/applications")
          return

        }


        setApplication(data)

      } catch (error) {

        console.log(error)

        alert(
          "Application not found."
        )

        navigate("/applications")

      }

    }


    fetchApplication()

  }, [id, navigate])


  const deleteApplication = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    )

    if (!confirmDelete) {
      return
    }


    try {

      await deleteApplicationAPI(id)

      navigate("/applications")

    } catch (error) {

      console.log(error)

      alert(
        "Failed to delete application."
      )

    }

  }


  if (!application) {

    return (
      <p
        style={{
          padding: "30px"
        }}
      >
        Loading...
      </p>
    )

  }


  return (

    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header
          title="Application Details"
          subtitle="View details of your job application"
        />


        <div className="content-area">

          <Link
            to="/applications"
            className="back-link"
          >
            <ArrowLeft size={17} />
            Back to Applications
          </Link>


          <div className="details-card">


            <div className="details-header">

              <div>

                <h2>
                  {application.company}
                </h2>

                <p>
                  {application.position}
                </p>

              </div>


              <span className="details-status">
                {application.status}
              </span>

            </div>


            <div className="details-grid">

              <div className="detail-item">

                <span>Location</span>

                <strong>
                  {application.location}
                </strong>

              </div>


              <div className="detail-item">

                <span>Job Type</span>

                <strong>
                  {application.jobType}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Application Date
                </span>

                <strong>
                  {application.applicationDate}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Reminder Date
                </span>

                <strong>
                  {application.reminderDate ||
                    "Not set"}
                </strong>

              </div>


              <div className="detail-item">

                <span>Salary</span>

                <strong>
                  {application.salary ||
                    "Not specified"}
                </strong>

              </div>

            </div>


            <div className="detail-section">

              <h3>
                Job Link
              </h3>


              {application.jobLink ? (

                <a
                  href={application.jobLink}
                  target="_blank"
                  rel="noreferrer"
                  className="job-link"
                >
                  Visit Job Posting
                  <ExternalLink size={16} />
                </a>

              ) : (

                <p>
                  No job link added
                </p>

              )}

            </div>


            <div className="detail-section">

              <h3>
                Notes
              </h3>

              <p>
                {application.notes ||
                  "No notes added"}
              </p>

            </div>


            <div className="details-actions">

              <Link
                to={`/edit-application/${application.id}`}
                className="primary-btn"
              >
                <Pencil size={17} />
                Edit Application
              </Link>


              <button
                className="delete-btn"
                onClick={deleteApplication}
              >
                <Trash2 size={17} />
                Delete Application
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>

  )
}

export default ViewApplication