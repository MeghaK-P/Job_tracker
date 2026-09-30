import { useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

import {
  Bar,
  Doughnut
} from "react-chartjs-2"

import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"

import {
  getUserApplicationsAPI
} from "../services/allAPI"


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)


function Analytics() {

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null"
  )

  const [applications, setApplications] =
    useState([])


  useEffect(() => {

    const fetchApplications = async () => {

      if (!loggedUser) {
        return
      }

      try {

        const response =
          await getUserApplicationsAPI(
            loggedUser.id
          )

        setApplications(response.data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchApplications()

  }, [])



  
  const applied =
    applications.filter(
      application =>
        application.status === "Applied"
    ).length

    const totalApplications = applications.length

const respondedApplications = applications.filter(
  (application) =>
    application.status === "Shortlisted" ||
    application.status === "Interview" ||
    application.status === "Offer"
).length

const responseRate =
  totalApplications > 0
    ? Math.round((respondedApplications / totalApplications) * 100)
    : 0

const offerApplications = applications.filter(
  (application) => application.status === "Offer"
).length

const successRate =
  totalApplications > 0
    ? Math.round((offerApplications / totalApplications) * 100)
    : 0

  const shortlisted =
    applications.filter(
      application =>
        application.status === "Shortlisted"
    ).length


  const interview =
    applications.filter(
      application =>
        application.status === "Interview"
    ).length


  const offer =
    applications.filter(
      application =>
        application.status === "Offer"
    ).length


  const rejected =
    applications.filter(
      application =>
        application.status === "Rejected"
    ).length


  const fullTime =
    applications.filter(
      application =>
        application.jobType === "Full Time"
    ).length


  const internship =
    applications.filter(
      application =>
        application.jobType === "Internship"
    ).length


  const partTime =
    applications.filter(
      application =>
        application.jobType === "Part Time"
    ).length


  const contract =
    applications.filter(
      application =>
        application.jobType === "Contract"
    ).length


  const statusData = {

    labels: [
      "Applied",
      "Shortlisted",
      "Interview",
      "Offer",
      "Rejected"
    ],

    datasets: [
      {
        label: "Applications",

        data: [
          applied,
          shortlisted,
          interview,
          offer,
          rejected
        ],

        backgroundColor:
          "rgba(53, 162, 235, 0.5)"
      }
    ]

  }


  const statusOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {
        position: "top"
      },

      title: {
        display: true,
        text: "Application Status"
      }

    }

  }


  const jobTypeData = {

    labels: [
      "Full Time",
      "Internship",
      "Part Time",
      "Contract"
    ],

    datasets: [
      {
        label: "Applications",

        data: [
          fullTime,
          internship,
          partTime,
          contract
        ],

        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(145, 236, 236, 0.5)",
          "rgba(195, 171, 108, 0.5)",
          "rgba(123, 58, 255, 0.5)"
        ],

        borderWidth: 1
      }
    ]

  }


  const jobTypeOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {
        position: "bottom"
      },

      title: {
        display: true,
        text: "Applications by Job Type"
      }

    }

  }


  return (

    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header
          title="Analytics"
          subtitle="Track your job search progress"
        />
<div className="row mb-4">

  <div className="col-md-6 mb-3">
    <Card className="h-100 border rounded-4">
      <Card.Body className="p-4">
        <Card.Text className="text-muted mb-1">Applications that received a response</Card.Text>
        <h2 className="fw-bold mb-1">{responseRate}%</h2>
      </Card.Body>
    </Card>
  </div>

  <div className="col-md-6 mb-3">
    <Card className="h-100 border rounded-4">
      <Card.Body className="p-4">
        <Card.Text className="text-muted mb-1">Success Rate</Card.Text>
        <h2 className="fw-bold mb-1">{successRate}%</h2>
        <Card.Text className="text-muted small mb-0">Applications that resulted in an offer</Card.Text>
      </Card.Body>
    </Card>
  </div>

</div>
        <div className="content-area">


          <div
            className="details-card"
            style={{
              width: "800px",
              height: "400px",
              margin: "0 auto 25px",
              boxSizing: "border-box"
            }}
          >

            <Bar
              options={statusOptions}
              data={statusData}
            />

          </div>


          <div
            className="details-card"
            style={{
              width: "800px",
              height: "400px",
              margin: "0 auto 25px",
              boxSizing: "border-box"
            }}
          >

            <Doughnut
              options={jobTypeOptions}
              data={jobTypeData}
            />

          </div>


        </div>

      </main>

    </div>

  )
}

export default Analytics