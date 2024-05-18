import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";

import mbns from "../assets/mbns.jpg";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={mbns} alt="school" />
      </div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/teachers">Teachers</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/class">Class view</NavLink>
        <NavLink
          to="https://github.com/ShamiKantMourya/School-Management-System"
          target="_blank"
        >
          <GitHubIcon />
        </NavLink>
        <NavLink
          to="https://replit.com/@shamiMourya/SchoolManagementBackend"
          target="_blank"
        >
          <StorageIcon  style={{color: "orangered"}}/>
        </NavLink>
      </nav>
    </div>
  );
}
