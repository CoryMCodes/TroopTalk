import { HomeOutlinedIcon, DarkModeOutlinedIcon, WbSunnyOutlinedIcon, GridViewOutlinedIcon, NotificationsOutlinedIcon, EmailOutlinedIcon, PersonOutlinedIcon, SearchOutlinedIcon } from "./img.js";
import { authContext, darkModeContext } from "../../context/export.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./navbar.scss";

const Navbar = () => {
  const { toggle, darkMode } = useContext(darkModeContext);
  const { currentUser } = useContext(authContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>lamasocial</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? <WbSunnyOutlinedIcon onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle} />}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={"/upload/" + currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
