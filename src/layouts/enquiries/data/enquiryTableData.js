// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { useDeleteEnq } from "features/enquiries/enquiryThunk";
import { useGetAllEnquiries } from "features/enquiries/enquiryThunk";
import { setUpdateEnq } from "features/enquiries/enquirySlice";
// import { useHoneyHarvest } from "features/harvest/honey_harvestThunk";
// import { useDeleteHarvest } from "features/harvest/honey_harvestThunk";
// import { setUpdateHarvest } from "features/harvest/honey_harvestSlice";

export default function enquiryTableData() {
  const dispatch = useDispatch();
  const { deleteEnq } = useDeleteEnq();
  const {
    isGettingAllEnq,
    enquiries: { enquiries: ENQ = [], currentCount = 0, numOfPages = 0, totalEnq = 0 } = {},
    refetch,
  } = useGetAllEnquiries();
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const rows = ENQ.map((enq, i) => {
    const { name, email, message, status, enq_id } = enq;
    const payload = {
      status,
    };
    const handleEdit = () => {
      dispatch(setUpdateEnq(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete an enquiry record permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteEnq(enq_id);
    };
    return {
      enq: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {enq_id}
        </MDTypography>
      ),
      email: <Author image={logoInvesion} email={email} name={name} />,
      message: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {message}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={status}
            color={status === "resolved" ? "success"  : "warning"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdateenquiry/${enq_id}`}
          >
            Edit
          </Link>
        </MDTypography>
      ),
      remove: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleDelete();
            }}
          >
            remove
          </Link>
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "enq", accessor: "enq", width: "45%", align: "left" },
      { Header: "email", accessor: "email", width: "45%", align: "left" },
      { Header: "message", accessor: "message", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    currentCount,
    refetch,
    totalEnq,
    isGettingAllEnq
  };
}
