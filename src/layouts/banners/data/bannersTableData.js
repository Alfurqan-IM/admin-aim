// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useAllBanners } from "features/banners/bannerThunk";
import { setUpdateBanner } from "features/banners/bannerSlice";
import { useDeletebanner } from "features/banners/bannerThunk";
import { convertToDateOnly } from "utils";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function bannersTableData() {
  const dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const { isGettingAllbanners, banners, refetch } = useAllBanners();
  const { deletebanner } = useDeletebanner();
  const {
    banners: Banners = [],
    numOfPages = 1,
    totalBanners = 0,
    currentCount = 0,
  } = banners || {};
  // console.log(Employees);
  const Author = ({ image, time, year, banner_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={`banner ${banner_id}`} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`${time}`}
        </MDTypography>
        <MDTypography variant="caption">{year}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Job = ({ title, description, index }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        title={title}
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
      <MDTypography title={index} variant="caption">
        {description}
      </MDTypography>
    </MDBox>
  );
  const handleDelete = (bannerId) => {
    //console.log("delete banner")
    setSelectedBannerId(bannerId);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedBannerId) return;
    deletebanner(selectedBannerId);
    setOpenConfirm(false);
    setSelectedBannerId(null);
  };

  const rows = Banners.map((banner, i) => {
    const { banner_id, title, description, year, start_date, end_date, image, time } = banner;
    const payload = {
      banner_id,
      title,
      description,
      year,
      start_date,
      end_date,
      image,
      time,
    };
    const handleEdit = () => {
      dispatch(setUpdateBanner(payload));
    };
    const MAX_LENGTH = 40;
    const formatDescription = (text) =>
      text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}…` : text;
    //delete
    return {
      title: <Author image={image} time={time} year={year} banner_id={banner_id} />,
      details: (
        <Job title={title} description={formatDescription(description)} index={description} />
      ),
      start_date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {convertToDateOnly(start_date)}
        </MDTypography>
      ),
      end_date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {convertToDateOnly(end_date)}
        </MDTypography>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link to={`/admin/createupdatebanner/${banner_id}`}>
            <IconButton
              color="primary"
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
        <>
          <IconButton
            color="error"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(banner_id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    };
  });

  return {
    columns: [
      { Header: "title", accessor: "title", width: "45%", align: "left" },
      { Header: "details", accessor: "details", align: "left" },
      { Header: "start_date", accessor: "start_date", align: "center" },
      { Header: "end_date", accessor: "end_date", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    totalBanners,
    currentCount,
    isGettingAllbanners,
    refetch,
    openConfirm,
    closeConfirm: () => setOpenConfirm(false),
    handleConfirmDelete,
  };
}
