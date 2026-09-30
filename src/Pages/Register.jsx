import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { registerUserAPI, checkUserEmailAPI } from "../services/allAPI"

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const existingUsers =
        await checkUserEmailAPI(formData.email)

      if (existingUsers.data.length > 0) {

        alert(
          "An account with this email already exists."
        )

        return

      }


      const response =
        await registerUserAPI(formData)

      console.log(
        "User registered:",
        response.data
      )

      alert("Account created successfully.")

      navigate("/")

    } catch (error) {

      console.log(error)

      alert(
        "Unable to create account. Please try again."
      )

    }

  }


  return (

    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: " url('https://img.freepik.com/premium-photo/top-view-laptop-notepad-pen-black-background-with-copy-space_357889-4501.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}
    >

      {/* Background Overlay */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)"
        }}
      ></div>


      {/* Register Card */}

      <div
        className="bg-white rounded-4 shadow"
        style={{
          width: "100%",
          maxWidth: "430px",
          padding: "15px",
          position: "relative",
          zIndex: 1,
          margin: "15px"
        }}
      >


        {/* Logo */}

        <div className="text-center mb-4">

          <div
            className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
            style={{
              width: "58px",
              height: "58px",
              backgroundColor: "#202124"
            }}
          >

            <img
              src="https://www.svgrepo.com/show/281725/placeholder-job.svg"
              alt="ApplyTrack logo"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain"
              }}
            />

          </div>


          <h3 className="fw-bold mb-1">
            ApplyTrack
          </h3>

          <p className="text-muted mb-0">
            Career Manager
          </p>

        </div>


        {/* Heading */}

        <div className="text-center mb-4">

          <h2 className="fw-bold mb-2">
            Create Account
          </h2>

          <p className="text-muted mb-0">
            Start managing your job search
          </p>

        </div>


        {/* Register Form */}

        <Form onSubmit={handleSubmit}>


          {/* Name */}

          <Form.Group className="mb-3">

            <Form.Label className="fw-semibold">
              Name
            </Form.Label>

            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              size="lg"
              required
            />

          </Form.Group>


          {/* Email */}

          <Form.Group className="mb-3">

            <Form.Label className="fw-semibold">
              Email
            </Form.Label>

            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              size="lg"
              required
            />

          </Form.Group>


          {/* Password */}

          <Form.Group className="mb-4">

            <Form.Label className="fw-semibold">
              Password
            </Form.Label>

            <Form.Control
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              size="lg"
              required
            />

          </Form.Group>


          {/* Create Account Button */}

          <Button
            type="submit"
            className="w-100 border-0"
            size="lg"
            style={{
              backgroundColor: "#202124",
              padding: "12px"
            }}
          >
            Create Account
          </Button>

        </Form>


        {/* Login */}

        <p className="text-center text-muted mt-4 mb-0">

          Already have an account?

          <Link
            to="/"
            className="text-decoration-none fw-semibold ms-1"
            style={{
              color: "#202124"
            }}
          >
            Sign In
          </Link>

        </p>


      </div>

    </div>

  )
}

export default Register