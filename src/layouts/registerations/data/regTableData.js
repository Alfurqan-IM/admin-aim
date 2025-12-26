// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React, { useState } from "react";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import { useDeleteReg } from "features/registerations/registerationThunk";
import { useGetAllReg } from "features/registerations/registerationThunk";
import { setUpdateReg } from "features/registerations/registerationSlice";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function regTableData() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRegId, setSelectedRegId] = useState(null);
  const dispatch = useDispatch();
  const { deleteReg } = useDeleteReg();
  const {
    isGettingAllReg,
    data: { registrations: REG = [], total = 0, currentCount = 0, numOfPages = 0 } = {},
    refetch,
  } = useGetAllReg();
  // console.log(REG);

  const Author = ({ image, name, email, reg_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`${reg_id} ${name}`}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
   const handleDelete = (regId) => {
     setSelectedRegId(regId);
     setOpenConfirm(true);
   };

   const handleConfirmDelete = () => {
     if (!selectedRegId) return;
     deleteReg(selectedRegId);
     setOpenConfirm(false);
     setSelectedRegId(null);
   };
  const rows = REG.map((reg, i) => {
    const {
      reg_id,
      programme_id,
      programme,
      category,
      discovery_method,
      users: { first_name, last_name, email },
    } = reg;
    const payload = {
      reg_id,
      programme,
      category,
      discovery_method,
    };

    const handleEdit = () => {
      dispatch(setUpdateReg(payload));
    };
    return {
      users: (
        <Author
          image={LogoAsana}
          name={`${first_name} ${last_name}`}
          email={email}
          reg_id={reg_id}
        />
      ),
      programme: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {programme}
        </MDTypography>
      ),
      category: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={category}
            color={category === "Youth" ? "success" : "warning"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      discovery_method: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={discovery_method}
            color={
              discovery_method === "Masjid"
                ? "success"
                : discovery_method === "Social Media"
                ? "warning"
                : "error"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link to={`/createupdateregisteration/${reg_id}`}>
            <IconButton
              color="warning"
              size="small"
              onClick={() => {
                handleEdit();
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
        </MDTypography>
      ),
      remove: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <IconButton
            color="error"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(reg_id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "users", accessor: "users", width: "45%", align: "left" },
      { Header: "programme", accessor: "programme", align: "left" },
      { Header: "category", accessor: "category", align: "center" },
      { Header: "discovery_method", accessor: "discovery_method", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    currentCount,
    refetch,
    isGettingAllReg,
    total,
    openConfirm,
    closeConfirm: () => setOpenConfirm(false),
    handleConfirmDelete,
  };
}
