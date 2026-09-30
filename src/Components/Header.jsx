import { useEffect, useRef, useState } from "react"
import { Bell } from "lucide-react"
import { getUserApplicationsAPI } from "../services/allAPI"

function Header({ title, subtitle }) {

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null")

  const [applications, setApplications] =
    useState([])

  const [showNotifications, setShowNotifications] = useState(false)

  const notificationRef = useRef(null)


  // Fetch applications

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


  // Close notification when clicking outside

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {

        setShowNotifications(false)

      }

    }
    document.addEventListener("mousedown", handleClickOutside)


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )

    }

  }, [])


  // Today's date

  const today = new Date()

  today.setHours(0, 0, 0, 0)


  // Create notifications

  const notifications = applications.filter(application => {
    if (!application.reminderDate) {
      return false
    }


    if (
      application.status === "Rejected" ||application.status === "Offer") {
      return false
    }
    return true
  }).map(application => {

      const reminderDate =new Date( application.reminderDate + "T00:00:00")
      reminderDate.setHours( 0, 0, 0, 0 )
      const difference =reminderDate.getTime() -today.getTime()


      const daysLeft = Math.ceil(   difference /(1000 * 60 * 60 * 24)
)
 let message = ""


      if (daysLeft < 0) {

        message =
          `${application.company} reminder date has passed`

      }

      else if (daysLeft === 0) {

        message =
          `${application.company} reminder is today`

      }

      else if (daysLeft === 1) {

        message =
          `${application.company} reminder is tomorrow`

      }

      else if (daysLeft <= 3) {

        message =
          `${application.company} reminder is in ${daysLeft} days`

      }

      else {

        return null

      }


      return {
        company: application.company,
        position: application.position,
        status: application.status,
        message: message
      }

    })


    .filter(
      notification =>
        notification !== null
    )


  return (

    <>

      <style>
        {`

          .notification-wrapper {
            position: relative;
          }

          .notification {
            position: relative;
            cursor: pointer;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .notification-dot {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 7px;
            height: 7px;
            background: #d9534f;
            border-radius: 50%;
          }

          .notification-dropdown {
            position: absolute;
            top: 45px;
            right: 0;
            width: 330px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            z-index: 100;
            overflow: hidden;
          }

          .notification-header {
            padding: 15px 16px;
            border-bottom: 1px solid #eeeeee;
          }

          .notification-header h3 {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
            color: #222;
          }

          .notification-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 14px 16px;
            border-bottom: 1px solid #f0f0f0;
          }

          .notification-item:last-child {
            border-bottom: none;
          }

          .notification-item svg {
            margin-top: 2px;
            flex-shrink: 0;
          }

          .notification-item p {
            margin: 0;
            font-size: 13px;
            color: #555;
            line-height: 1.5;
          }

          .notification-item strong {
            display: block;
            margin-bottom: 3px;
            color: #222;
            font-size: 13px;
          }

          .no-notifications {
            padding: 22px 16px;
            margin: 0;
            text-align: center;
            color: #777;
            font-size: 13px;
          }

        `}
      </style>


      <header className="top-header">


        <div>

          <h1>{title}</h1>

          <p>{subtitle}</p>

        </div>


        <div className="header-right">


          <div
            className="notification-wrapper"
            ref={notificationRef}
          >

            <button
              className="notification"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
            >

              <Bell size={20} />


              {notifications.length > 0 && (

                <span
                  className="notification-dot"
                ></span>

              )}

            </button>


            {showNotifications && (

              <div className="notification-dropdown">

                <div className="notification-header">

                  <h3>
                    Notifications
                  </h3>

                </div>


                {notifications.length === 0 ? (

                  <p className="no-notifications">
                    No new notifications
                  </p>

                ) : (

                  notifications.map(
                    (notification, index) => (

                      <div
                        className="notification-item"
                        key={index}
                      >

                        <Bell size={16} />

                        <div>

                          <strong>
                            {notification.company}
                          </strong>

                          <p>
                            {notification.message}
                          </p>

                        </div>

                      </div>

                    )
                  )

                )}

              </div>

            )}

          </div>


          <div className="header-user">
            <div className="avatar">
              {loggedUser?.name?.charAt(0).toUpperCase() || "U"}

            </div>


            <div>
              <strong>
                {loggedUser?.name || "User"}
              </strong>

            </div>

          </div>

        </div>
      </header>

    </>

  )
}

export default Header