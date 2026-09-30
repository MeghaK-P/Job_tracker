import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Card from "react-bootstrap/Card"
import { SquareCheck, Plus, ArrowRight, Clock3, Award, Target, FileText, Bell } from "lucide-react"
import { getUserApplicationsAPI } from "../services/allAPI"

function Home() {
  const [applications, setApplications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef(null)
  const navigate = useNavigate()

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null")

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      if (!loggedUser?.id) return
      const response = await getUserApplicationsAPI(loggedUser.id)
      setApplications(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("loggedUser")
    navigate("/")
  }

  const totalApplications = applications.length
  const appliedCount = applications.filter(item => item.status === "Applied").length
  const interviewCount = applications.filter(item => item.status === "Shortlisted" || item.status === "Interview").length
  const offerCount = applications.filter(item => item.status === "Offer").length

  const recentApplications = [...applications].sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate)).slice(0, 4)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const notifications = applications
    .filter(application => application.reminderDate && application.status !== "Rejected" && application.status !== "Offer")
    .map(application => {
      const reminderDate = new Date(application.reminderDate + "T00:00:00")
      reminderDate.setHours(0, 0, 0, 0)

      const difference = reminderDate.getTime() - today.getTime()
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24))

      let message = ""

      if (daysLeft < 0) {
        message = `${application.company} reminder date has passed`
      } else if (daysLeft === 0) {
        message = `${application.company} reminder is today`
      } else if (daysLeft === 1) {
        message = `${application.company} reminder is tomorrow`
      } else if (daysLeft <= 3) {
        message = `${application.company} reminder is in ${daysLeft} days`
      } else {
        return null
      }

      return {
        company: application.company,
        position: application.position,
        status: application.status,
        message
      }
    }).filter(notification => notification !== null)

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>

{/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container">

          <Link to="/home" className="navbar-brand d-flex align-items-center" style={{ textDecoration: "none" }}>
           <img src="https://www.svgrepo.com/show/281725/placeholder-job.svg" alt="img logo" style={{ width: "42px", height: "42px", objectFit: "contain", borderRadius: "50%" }} />
           
            <div>
              <div className="fw-bold" style={{ color: "#202124", lineHeight: "1" }}>
                ApplyTrack
              </div>
              <small className="text-muted" style={{ fontSize: "10px" }}></small>
            </div>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">

            <ul className="navbar-nav mx-auto gap-lg-3">

              <li className="nav-item">
                <Link to="/home" className="nav-link fw-semibold text-dark">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/applications" className="nav-link text-muted">Applications</Link>
                          
              </li>

              <li className="nav-item">
                <Link to="/analytics" className="nav-link text-muted">Analytics</Link>       
              </li>

              <li className="nav-item">
                <a href="#about" className="nav-link text-muted">About </a>                  
              </li>

            </ul>

            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">

              {/* NOTIFICATION */}

              <div className="position-relative" ref={notificationRef}>

                <button type="button" className="btn btn-light position-relative d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #e5e5e5" }}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell size={19} />
                  {notifications.length > 0 && (
                    <span
                      className="position-absolute bg-danger rounded-circle"
                      style={{ width: "8px", height: "8px", top: "6px", right: "6px" }}
                    ></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="position-absolute bg-white shadow rounded-3 border"
                    style={{ width: "330px", right: "0", top: "48px", zIndex: "1050" }}
                  >

                    <div className="p-3 border-bottom">
                      <h6 className="fw-bold mb-0">Notifications</h6>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted small">
                        No new notifications
                      </div>
                    ) : (
                      <div>
                        {notifications.map((notification, index) => (
                          <div key={index} className="p-3 border-bottom">

                            <div className="fw-semibold small">
                              {notification.company}
                            </div>

                            <div className="text-muted small mt-1">
                              {notification.message}
                            </div>

                            <div className="text-muted mt-1" style={{ fontSize: "11px" }}>
                              {notification.position}
                            </div>

                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                )}

              </div>

              {/* USER NAME */}

              <div className="text-end d-none d-md-block">
                <div className="fw-semibold" style={{ fontSize: "14px" }}>
                  {loggedUser?.name || "User"}
                </div>
              </div>

              {/* PROFILE */}

              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px", backgroundColor: "#889cd6", color: "white", fontWeight: "600" }}
              >
                {loggedUser?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* LOGOUT */}

              <button onClick={handleLogout} className="btn btn-dark btn-sm px-3">
                Logout
              </button>

            </div>
          </div>
        </div>
      </nav>

     {/* banner */}

      <section className="container py-4 py-lg-5">

        <div className="rounded-4 overflow-hidden" style={{ backgroundColor: "#202124" }}>

          <div className="row g-0 align-items-stretch">

            {/* LEFT */}

            <div className="col-lg-6">

              <div className="h-100 d-flex flex-column justify-content-center" style={{ padding: "55px" }}>

                <span
                  className="text-uppercase mb-3"
                  style={{ color: "#aeb0b3", fontSize: "12px", letterSpacing: "2px", fontWeight: "600" }}
                >
                  Everything for your job search, in one place.
                </span>

                <h1
                  className="text-white fw-bold mb-4"
                  style={{ fontSize: "clamp(35px, 4vw, 52px)", lineHeight: "1.1" }}
                >
                  Track your progress.<br />
                  <span style={{ color: "#bfc1c4" }}>Plan your next step.</span>
                </h1>

                <p
                  className="mb-4"
                  style={{ color: "#c5c5c5", maxWidth: "500px", lineHeight: "1.8" }}
                >
                  Manage your applications, track interview progress, and stay organized throughout your job search.
                </p>

                <div className="d-flex flex-wrap gap-3">

                  <Link to="/add-application" className="btn btn-light px-4 py-2" style={{ textDecoration: "none" }}>
                    <Plus size={17} className="me-2" />
                    Add Application
                  </Link>

                  <Link to="/applications" className="btn btn-outline-light px-4 py-2" style={{ textDecoration: "none" }}>
                    View Applications
                    <ArrowRight size={17} className="ms-2" />
                  </Link>

                </div>

              </div>

            </div>

            {/* RIGHT IMAGE */}

            <div className="col-lg-6">

              <div
                style={{
                  minHeight: "390px",
                  height: "100%",
                  backgroundImage: "url('https://media.istockphoto.com/id/1830662776/photo/a-man-sits-in-a-dark-room-in-front-of-a-blank-laptop-screen.jpg?s=170667a&w=0&k=20&c=1NHgSs8kxFMYQqa200vFcoANWKI8k7t6Pv0lhG8gfP8=')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              ></div>

            </div>

          </div>

        </div>

      </section>


      <section className="container py-4">

        <div className="row align-items-end mb-4">

          <div className="col-lg-7">

            <span
              className="text-muted text-uppercase"
              style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "600" }}
            >
              Your overview
            </span>

            <h2 className="fw-bold mt-2 mb-2" style={{ fontSize: "32px" }}>
              Your job search at a glance
            </h2>

          </div>

          <div className="col-lg-5">
            <p className="text-muted mb-1">
              Keep track of where you are and what comes next.
            </p>
          </div>

        </div>

{/* card */}
        <div className="row g-3 mb-5">

          <div className="col-6 col-lg-3">
            <div className="bg-white rounded-4 p-4 h-100" style={{ border: "1px solid #e9e9e9" }}>
              <SquareCheck size={22} className="mb-4" />
              <h3 className="fw-bold mb-1">{totalApplications}</h3>
              <p className="text-muted mb-0">Total Applications</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="bg-white rounded-4 p-4 h-100" style={{ border: "1px solid #e9e9e9" }}>
              <Target size={22} className="mb-4" />
              <h3 className="fw-bold mb-1">{appliedCount}</h3>
              <p className="text-muted mb-0">Applied</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="bg-white rounded-4 p-4 h-100" style={{ border: "1px solid #e9e9e9" }}>
              <Clock3 size={22} className="mb-4" />
              <h3 className="fw-bold mb-1">{interviewCount}</h3>
              <p>Shortlisted / Interview</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="bg-white rounded-4 p-4 h-100" style={{ border: "1px solid #e9e9e9" }}>
              <Award size={22} className="mb-4" />
              <h3 className="fw-bold mb-1">{offerCount}</h3>
              <p className="text-muted mb-0">Offers</p>
            </div>
          </div>

        </div>

{/*applications listed  */}
        <div className="row g-4 mb-5">


          <div className="col-lg-7">

            <div className="bg-white rounded-4 p-4" style={{ border: "1px solid #e9e9e9" }}>

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                  <h4 className="fw-bold mb-1">Recent Applications</h4>
                  <p className="text-muted small mb-0">Your latest job opportunities</p>
                </div>

                <Link to="/applications" className="text-dark text-decoration-none small fw-semibold">
                  View all
                  <ArrowRight size={14} className="ms-1" />
                </Link>

              </div>

              {recentApplications.length === 0 ? (
                <div className="text-center py-5">

                  <FileText size={35} className="text-muted mb-3" />

                  <p className="text-muted mb-3">
                    You haven't added any applications yet.
                  </p>

                  <Link to="/add-application" className="btn btn-dark btn-sm px-3">
                    Add Application
                  </Link>

                </div>
              ) : (
                recentApplications.map(application => (
                  <Link
                    key={application.id}
                    to={`/applications/${application.id}`}
                    className="text-decoration-none text-dark"
                  >

                    <div
                      className="d-flex align-items-center justify-content-between py-3"
                      style={{ borderBottom: "1px solid #eeeeee" }}
                    >

                      <div className="d-flex align-items-center">

                        <div
                          className="d-flex align-items-center justify-content-center rounded-3 me-3"
                          style={{ width: "44px", height: "44px", backgroundColor: "#f1f1f1" }}
                        >
                          <SquareCheck size={19} />
                        </div>

                        <div>
                          <h6 className="fw-semibold mb-1">
                            {application.company}
                          </h6>

                          <p className="text-muted small mb-0">
                            {application.position}
                          </p>
                        </div>

                      </div>

                      <div className="text-end">

                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={{ backgroundColor: "#eeeeee", color: "#202124" }}
                        >
                          {application.status}
                        </span>

                        <div className="text-muted mt-1" style={{ fontSize: "11px" }}>
                          {application.applicationDate}
                        </div>

                      </div>

                    </div>

                  </Link>
                ))
              )}

            </div>

          </div>

          {/* stepper-journey */}

          <div className="col-lg-5">

            <div className="rounded-4 h-100 text-white p-4" style={{ backgroundColor: "#202124" }}>

              <span
                className="text-center d-block"
                style={{ color: "#999", fontSize: "12px", letterSpacing: "2px" }}
              >
                YOUR JOURNEY
              </span>

              <h4 className="fw-bold mt-2 mb-4 text-center">
                Every application has a next step.
              </h4>

              {/* UIVERSE STEPPER */}

              <div className="stepper-box ms-5 mb-2">

                <div className="stepper-step stepper-completed">
                  <div className="stepper-circle">✓</div>
                  <div className="stepper-line"></div>

                  <div className="stepper-content">
                    <div className="stepper-title">Applied</div>
                    <div className="stepper-status">Application submitted</div>
                    <div className="stepper-time">Your application is submitted.</div>
                  </div>
                </div>

                <div className="stepper-step stepper-active">
                  <div className="stepper-circle">2</div>
                  <div className="stepper-line"></div>

                  <div className="stepper-content">
                    <div className="stepper-title">Shortlisted</div>
                    <div className="stepper-status">Profile noticed</div>
                    <div className="stepper-time">Your profile gets noticed.</div>
                  </div>
                </div>

                <div className="stepper-step stepper-pending">
                  <div className="stepper-circle">3</div>
                  <div className="stepper-line"></div>

                  <div className="stepper-content">
                    <div className="stepper-title">Interview</div>
                    <div className="stepper-status">Next stage</div>
                    <div className="stepper-time">It's time to show your skills.</div>
                  </div>
                </div>

                <div className="stepper-step stepper-pending">
                  <div className="stepper-circle">4</div>

                  <div className="stepper-content">
                    <div className="stepper-title">Offer</div>
                    <div className="stepper-status">Final stage</div>
                    <div className="stepper-time">Your next opportunity.</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

{/* img */}
      <section
        className="position-relative"
        style={{
          height: "330px",
          backgroundImage: "url('https://img.freepik.com/premium-photo/man-typing-laptop-dark-room_741910-3309.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.58)" }}
        ></div>

        <div className="position-relative h-100 d-flex align-items-center justify-content-center text-center text-white px-3">

          <div style={{ maxWidth: "650px" }}>

            <h2 className="fw-bold mb-3">
              One application at a time.<br />
              One step closer to your goal.
            </h2>

            <p className="mb-4" style={{ color: "#ddd", lineHeight: "1.7" }}>
              Stay organised, stay consistent and make every opportunity count.
            </p>

            <Link to="/add-application" className="btn btn-light px-4"> Track an Application
              <ArrowRight size={16} className="ms-2" />
            </Link>

          </div>

        </div>

      </section>

        {/* about */}
      <section id="about" className="container py-5">

        <div className="text-center mb-5">

          <span
            className="text-muted text-uppercase"
            style={{ fontSize: "12px", letterSpacing: "2px" }}
          >
            Why ApplyTrack
          </span>

          <h2 className="fw-bold mt-2">
            Built for a better job search
          </h2>

          <p className="text-muted mt-2">
            Everything you need to keep your job search organised.
          </p>

        </div>

        <div className="row g-4">

          <div className="col-md-4">
            <Card className="h-100 why-card">

              <Card.Header>Organise</Card.Header>

              <Card.Body>

                <Card.Title>
                  Keep everything in one place
                </Card.Title>

                <Card.Text>
                  Keep company information, positions, salary details, job links and notes together instead of managing them across different places.
                </Card.Text>

              </Card.Body>

            </Card>
          </div>

          <div className="col-md-4">
            <Card className="h-100 why-card">

              <Card.Header>Track</Card.Header>

              <Card.Body>

                <Card.Title>
                  Follow every opportunity
                </Card.Title>

                <Card.Text>
                  Track your applications through Applied, Shortlisted, Interview, Offer or Rejected and always know your current progress.
                </Card.Text>

              </Card.Body>

            </Card>
          </div>

          <div className="col-md-4">
            <Card className="h-100 why-card">

              <Card.Header>Analyse</Card.Header>

              <Card.Body>

                <Card.Title>
                  Understand your progress
                </Card.Title>

                <Card.Text>
                  Use simple application analytics to understand your job search and see how your applications are progressing.
                </Card.Text>

              </Card.Body>

            </Card>
          </div>

        </div>

      </section>

        {/* footer */}
      <footer className="bg-black border-top border-secondary">

        <div className="container py-4 d-flex flex-column flex-md-row justify-content-between align-items-center">

          <div>
            <h6 className="fw-bold text-white mb-1">
              ApplyTrack
            </h6>

            <small className="text-white">
              Your career. Your applications. One place.
            </small>
          </div>

          <div className="d-flex gap-3 mt-3 mt-md-0">

            <Link to="/applications" className="text-white text-decoration-none small">
              Applications
            </Link>

            <Link to="/analytics" className="text-white text-decoration-none small">
              Analytics
            </Link>

            <Link to="/add-application" className="text-white text-decoration-none small">
              Add Application
            </Link>

          </div>

        </div>

        <div className="text-center border-top border-secondary py-3">
          <small className="text-secondary">
            © 2026 ApplyTrack. All rights reserved.
          </small>
        </div>

      </footer>

    </div>
  )
}

export default Home