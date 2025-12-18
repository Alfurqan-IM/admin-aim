// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
//import MDBadge from "components/MDBadge";
//import { useAllEmployess } from "features/employees/employeesThunk";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { setUpdateEmployee } from "features/employees/employeesSlice";
import React from "react";
import { useAllBanners } from "features/banners/bannerThunk";
import { setUpdateBanner } from "features/banners/bannerSlice";
import { useDeletebanner } from "features/banners/bannerThunk";
import { convertToDateOnly } from "utils";

export default function bannersTableData() {
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
    const dispatch = useDispatch();
    const handleEdit = () => {
      dispatch(setUpdateBanner(payload));
    };
    const MAX_LENGTH = 40;
    const formatDescription = (text) =>
      text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}…` : text;

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
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/admin/createupdatebanner/${banner_id}`}
          >
            Edit
          </Link>
        </MDTypography>
      ),
      remove: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              deletebanner(banner_id);
            }}
            to={`#`}
          >
            remove
          </Link>
        </MDTypography>
      ),
    };
  });
  const { title, description, time, year, start_date, end_date, isEdit, pages, sort } = useSelector(
    (store) => store.banners
  );
  React.useEffect(() => {
    refetch();
  }, [title, description, time, year, start_date, end_date, isEdit, pages, sort]);
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
    pages,
  };
}
