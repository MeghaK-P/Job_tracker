import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { loginUserAPI } from "../services/allAPI"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response =
        await loginUserAPI(email, password)

      const users = response.data

      if (users.length === 0) {

        alert("Invalid email or password.")
        return

      }

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(users[0])
      )

      navigate("/home")

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:" url('https://img.freepik.com/premium-photo/top-view-laptop-notepad-pen-black-background-with-copy-space_357889-4501.jpg')",
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


      {/* Login Card */}

      <div
        className="bg-white rounded-4 shadow"
        style={{
          width: "100%",
          maxWidth: "430px",
          padding: "40px",
          position: "relative",
          zIndex: 1,
          margin: "20px"
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

           <img src="https://www.svgrepo.com/show/281725/placeholder-job.svg" alt="ApplyTrack logo"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain"
              }}
            />

          </div>

          <h3 className="fw-bold mb-1"> ApplyTrack </h3>
        </div>

        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Welcome Back </h2>
          <p className="text-muted mb-0"> Sign in to manage your job applications</p>

        </div>

        {/* Login Form */}

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">

            <Form.Label className="fw-semibold"> Email </Form.Label>


            <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)

            }
              size="lg"
              required
            />

          </Form.Group>

          <Form.Group className="mb-4">

            <Form.Label className="fw-semibold"> Password  </Form.Label>



            <Form.Control type="password" placeholder="Enter your password" value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              size="lg"
              required
            />

          </Form.Group>

          <Button type="submit" className="w-100 border-0"
            size="lg"
            style={{
              backgroundColor: "#202124",
              padding: "12px"
            }}
          >
            Sign In
          </Button>
        </Form>

        <p className="text-center text-muted mt-4 mb-0">

          Don't have an account?

          <Link to="/register" className="text-decoration-none fw-semibold ms-1"
            style={{
              color: "#202124"
            }}
          >
            Create Account
          </Link>

        </p>
      </div>
    </div>
  )
}

export default Login