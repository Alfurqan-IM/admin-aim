import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { usegetAllUser } from "features/users/userThunk";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton, Tooltip } from "@mui/material";

const Author = ({ image, name, email, user_id }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        <Link title="check details" to={`/users/${user_id}`}>{`${user_id} ${name}`}</Link>
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  </MDBox>
);
const Job = ({ title, description, add }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography
      display="block"
      variant="caption"
      color={title === "admin" ? "error" : "warning"}
      fontWeight="medium"
    >
      {title}
    </MDTypography>
    <MDTypography title={add} variant="caption">
      {description}
    </MDTypography>
  </MDBox>
);
export default function usersTableData() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { blacklistUser, blacklisting } = useBlacklistUser();
  const { users, refetch, isGettingAllUser } = usegetAllUser();
  const {
    users: Users = [],
    totalUsers = 0,
    count = 0,
    numOfPages = 1,
    genderCount = [],
    verificationCount = [],
  } = users || {};
  const openConfirmDialog = (user) => {
    setSelectedUser(user);
    setOpenConfirm(true);
  };

  const closeConfirmDialog = () => {
    setOpenConfirm(false);
    setSelectedUser(null);
  };
  const handleConfirmAction = () => {
    if (!selectedUser) return;

    const { user_id, blacklisted } = selectedUser;

    blacklistUser({
      user_id,
      blacklist: !blacklisted,
      isValid: blacklisted, // activate if blacklisted
    });

    closeConfirmDialog();
  };
  const rows = Users.map((user, i) => {
    const {
      user_id,
      first_name,
      last_name,
      user_name,
      email,
      phone,
      gender,
      image,
      role,
      address,
      city,
      state,
      country,
      notification,
      blacklisted,
      isVerified,
    } = user;
    const fullAddress = `${address}, ${city}, ${state}, ${country}.`;
    const MAX_LENGTH = 40;
    const formatAddress = (text) =>
      text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}…` : text;
    return {
      users: (
        <Author
          image={image}
          name={`${first_name}  ${last_name}`}
          email={email}
          user_id={user_id}
        />
      ),
      username: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user_name}
        </MDTypography>
      ),
      details: <Job title={role} description={formatAddress(fullAddress)} add={fullAddress} />,
      gender: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={gender}
            color={gender === "male" ? "success" : "primary"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      phone: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {phone}
        </MDTypography>
      ),
      notification: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={notification ? "Disabled" : "Enabled"}
            color={notification ? "error" : "success"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      verified: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={isVerified ? "Verified" : "Unverified"}
            color={isVerified ? "success" : "warning"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      blacklisted: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={blacklisted ? "Blacklisted" : "Active"}
            color={blacklisted ? "error" : "success"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      action: (
        <Tooltip title={blacklisted ? "Activate user" : "Blacklist user"}>
          <IconButton
            size="small"
            color={blacklisted ? "success" : "error"}
            onClick={() => openConfirmDialog(user)}
          >
            {blacklisted ? <CheckCircleIcon fontSize="small" /> : <BlockIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      ),
    };
  });
  return {
    columns: [
      { Header: "users", accessor: "users", width: "45%", align: "left" },
      { Header: "username", accessor: "username", align: "center" },
      { Header: "details", accessor: "details", align: "left" },
      { Header: "gender", accessor: "gender", align: "center" },
      { Header: "phone", accessor: "phone", align: "center" },
      { Header: "notification", accessor: "notification", align: "center" },
      { Header: "verified", accessor: "verified", align: "center" },
      { Header: "blacklisted", accessor: "blacklisted", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows,
    numOfPages,
    count,
    totalUsers,
    genderCount,
    verificationCount,
    refetch,
    isGettingAllUser,
    blacklisting,
    openConfirm,
    closeConfirmDialog,
    selectedUser,
    handleConfirmAction,
  };
}

import PropTypes from "prop-types";
import { useSingleUser } from "features/users/userThunk";
import { useBlacklistUser } from "features/users/userThunk";

// PropTypes validation for the Author component
Author.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// PropTypes validation for the Job component
Job.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

// PropTypes validation for the rows array
usersTableData.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      users: PropTypes.element.isRequired,
      details: PropTypes.element.isRequired,
      gender: PropTypes.element.isRequired,
      phone: PropTypes.element.isRequired,
      blacklisted: PropTypes.element.isRequired,
      notification: PropTypes.element.isRequired,
      verified: PropTypes.element.isRequired,
      action: PropTypes.element.isRequired,
    })
  ).isRequired,
  numOfPages: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  totalUsers: PropTypes.number.isRequired,
  genderCount: PropTypes.arrayOf(PropTypes.string),
  verificationCount: PropTypes.arrayOf(PropTypes.string),
  refetch: PropTypes.func.isRequired,
  isGettingAllUser: PropTypes.bool.isRequired,
};


