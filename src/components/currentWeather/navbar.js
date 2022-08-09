import React from "react";
import "../../styles/NavBar.scss";
import { BiCurrentLocation } from "react-icons/bi";
import { VscColorMode } from "react-icons/vsc";

function NavBar({ openMenu }) {
  return (
    <div className="navbar">
      <button className="searchButton" onClick={() => openMenu()}>
        Search for places
      </button>
      <div className="iconSection">
        <BiCurrentLocation className="navbarIcon" />
        <VscColorMode className="navbarIcon" />
      </div>
    </div>
  );
}

export default NavBar;
