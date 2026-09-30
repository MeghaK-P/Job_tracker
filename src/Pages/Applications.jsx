import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"
import { Eye,Pencil,Trash2,Search} from "lucide-react"
import Badge from "react-bootstrap/Badge"
import { getUserApplicationsAPI, deleteApplicationAPI} from "../services/allAPI"

function Applications() {

  const [applications, setApplications] = useState([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [jobTypeFilter, setJobTypeFilter] = useState("All")


  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null"
  )
  useEffect(() => {
    const fetchApplications = async () => {
      if (!loggedUser) {
        return
      }
      try {
        const response =
          await getUserApplicationsAPI( loggedUser.id )
        setApplications(response.data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchApplications()

  }, [])


  const deleteApplication = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    )

    if (!confirmDelete) {
      return
    }


    try {

      await deleteApplicationAPI(id)

      setApplications(
        applications.filter(
          application =>
            application.id !== id
        )
      )

    } catch (error) {

      console.log(error)

      alert(
        "Failed to delete application."
      )

    }

  }


  const filteredApplications =
    applications.filter(application => {

      const searchText =
        search.toLowerCase()

      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(searchText) ||

        application.position
          .toLowerCase()
          .includes(searchText)

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter


      const matchesJobType =
        jobTypeFilter === "All" ||
        application.jobType === jobTypeFilter


      return (
        matchesSearch &&
        matchesStatus &&
        matchesJobType
      )

    })


  return (

    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header
          title="Applications"
          subtitle="Manage and track all your job applications"
        />


        <div className="content-area">


          {/* Search and filters */}

          <div
            className="details-card"
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >

            <div
              style={{
                position: "relative",
                flex: 1,
                minWidth: "220px"
              }}
            >

              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  color: "#777"
                }}
              />

              <input
                type="text"
                placeholder="Search company or position..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                style={{
                  width: "100%",
                  padding:
                    "10px 12px 10px 40px",
                  border:
                    "1px solid #ddd",
                  borderRadius: "6px",
                  boxSizing: "border-box"
                }}
              />

            </div>

<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: "6px", background: "#fff" }}>
  <option value="All">All Status</option>
  <option value="Applied">Applied</option>
  <option value="Shortlisted">Shortlisted</option>
  <option value="Interview">Interview</option>
  <option value="Offer">Offer</option>
  <option value="Rejected">Rejected</option>
</select>

  <select value={jobTypeFilter} onChange={(e) => setJobTypeFilter(e.target.value)} 
  style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: "6px", background: "#fff" }}>
  <option value="All">All Job Types</option>
  <option value="Full Time">Full Time</option>
  <option value="Part Time">Part Time</option>
  <option value="Internship">Internship</option>
  <option value="Contract">Contract</option>
</select>
          </div>
      
          {/* Applications */}

          <div className="applications-list">

            {applications.length === 0 ? (

              <div className="no-applications">

                <h2>
                  No applications yet
                </h2>

                <p>
                  Start tracking your job applications
                  by adding your first one.
                </p>

                <Link
                  to="/add-application"
                  className="primary-btn"
                >
                  Add Application
                </Link>

              </div>

            ) : filteredApplications.length === 0 ? (

              <div className="no-applications">

                <h2>
                  No matching applications
                </h2>

                <p>
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              filteredApplications.map(
                application => (

                  <div
                    className="application-card"
                    key={application.id}
                  >

                    <div className="company-logo">

                      {application.company
                        .charAt(0)
                        .toUpperCase()}

                    </div>


                    <div className="application-info">

                      <h2>
                        {application.company}
                      </h2>

                      <p className="position">
                        {application.position}
                      </p>

                      <div className="application-meta">

                        <span>
                          {application.location}
                        </span>

                        <span>
                          {application.applicationDate}
                        </span>

                        <span>
                          {application.jobType}
                        </span>

                      </div>

                    </div>

{application.status === "Offer" && <Badge pill bg="success">Offer</Badge>}
{application.status === "Shortlisted" && <Badge pill bg="primary">Shortlisted</Badge>}
{application.status === "Rejected" && <Badge pill bg="danger">Rejected</Badge>}
{application.status === "Applied" && <Badge pill bg="secondary">Applied</Badge>}
{application.status === "Interview" && <Badge pill bg="info">Interview</Badge>}


                    <div className="application-actions">

                      <Link
                        to={`/applications/${application.id}`}
                        title="View"
                      >
                        <Eye size={17} />
                      </Link>


                      <Link
                        to={`/edit-application/${application.id}`}
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </Link>


                      <button
                        onClick={() =>
                          deleteApplication(
                            application.id
                          )
                        }
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>

      </main>

    </div>

  )
}

export default Applications