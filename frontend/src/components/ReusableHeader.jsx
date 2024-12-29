import React, { useState } from "react";
import { FaEnvelope, FaBell, FaUserCircle } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const ReusableHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center gap-6">
      <FaEnvelope size={22} className="cursor-pointer hover:text-blue-500" />
      <FaBell size={22} className="cursor-pointer hover:text-blue-500" />
      <FaUserCircle
        size={28}
        className="cursor-pointer hover:text-blue-500"
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
        <MenuItem onClick={handleClose}>Change Password</MenuItem>
        <MenuItem onClick={handleClose}>Manage Notifications</MenuItem>
      </Menu>
    </div>
  );
};

export default ReusableHeader;
