import { NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, FileUser , ChartNoAxesCombined , PlusCircle, LogOut
} from "lucide-react"

function Sidebar() {

  const navigate = useNavigate()

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null"
  )

  const logout = () => {
    localStorage.removeItem("loggedUser")
    navigate("/")
  }

  return (
    <aside className="sidebar">

      <div className="logo">
        <img src="https://www.svgrepo.com/show/281725/placeholder-job.svg" alt="img logo"
  style={{
    width: "42px",
    height: "42px",
    objectFit: "contain",
    borderRadius: "50%"
  }}
/>
        <div>
          <h2>ApplyTrack</h2>
        </div>
      </div>

      <nav className="side-nav">

        <NavLink to="/home">
          <LayoutDashboard size={19} />
          Dashboard
        </NavLink>

        <NavLink to="/applications">
          <FileUser  size={19} />
          Applications
        </NavLink>

        <NavLink to="/analytics">
          <ChartNoAxesCombined  size={19} />
          Analytics
        </NavLink>

        <NavLink to="/add-application">
          <PlusCircle size={19} />
          Add Application
        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <div className="user-mini">

          <div className="avatar">
            {loggedUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <strong>{loggedUser?.name || "User"}</strong>
          </div>

        </div>

       <button className="logout-btn" onClick={logout}>
  <LogOut size={18} />
  Logout
</button>

      </div>

    </aside>
  )
}

export default Sidebar