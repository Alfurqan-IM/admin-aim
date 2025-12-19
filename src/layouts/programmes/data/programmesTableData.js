import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import React from "react";
//import { useProducts } from "features/products/productthunk";
import PropTypes from "prop-types";
import { useDeleteProgramme } from "features/programmes/programmeThunk";
import { useGetAllProgrammes } from "features/programmes/programmeThunk";
import { setUpdateProgramme } from "features/programmes/programmeSlice";
// import { setUpdateProduct } from "features/products/productsSlice";
// import { useDeleteProduct } from "features/products/productthunk";

export default function programmesTableData() {
  const dispatch = useDispatch();
  const { deleteProgramme } = useDeleteProgramme();
  const {
    isGettingAllProgrammes,
    programmes: {
      totalProgrammes = 0,
      currentCount = 0,
      numOfPages = 0,
      programmes: PROG = [],
    } = {},
    refetch,
  } = useGetAllProgrammes();
  const Author = ({ image, title, programme_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`${programme_id} `}
        </MDTypography>
        <MDTypography variant="caption">{title}</MDTypography>
      </MDBox>
    </MDBox>
  );
  // Author.propTypes = {
  //   image: PropTypes.string.isRequired,
  //   product_name: PropTypes.string.isRequired,
  //   product_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // };
  const Job = ({ time, description, index }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {time}
      </MDTypography>
      <MDTypography title={index} variant="caption">{description}</MDTypography>
    </MDBox>
  );
  // Job.propTypes = {
  //   title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  //   description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // };
  const rows = PROG.map((item, i) => {
    const {
      programme_id,
      title,
      description,
      heading,
      about,
      time,
      year,
      start_date,
      end_date,
      programmesimages,
      programmeoutcomes,
    } = item;
    const { img_id, image0, image1, image2 } = programmesimages?.[0] || {};
    const { outcome_id, outcome1, outcome2, outcome3 } = programmeoutcomes?.[0] || {};
    const payload = {
      programme_id,
      title,
      description,
      heading,
      about,
      time,
      year,
      start_date,
      end_date,
      outcome1,
      outcome2,
      outcome3,
    };
    const handleEdit = () => {
      dispatch(setUpdateProgramme(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a programme records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteProgramme(programme_id);
    };
    const MAX_LENGTH = 40;
    const formatDescription = (text) =>
      text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}…` : text;

    return {
      programme: (
        <Link to={`/programmes/${programme_id}`}>
          <Author image={image0} title={title} programme_id={programme_id} />
        </Link>
      ),
      details: <Job time={time} description={formatDescription(description)} index={description} />,
      about: (
        <MDTypography
          title={description}
          component="a"
          //href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {formatDescription(about)}
        </MDTypography>
      ),
      year: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {year}
        </MDTypography>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdateprogramme/${programme_id}`}
          >
            Edit
          </Link>
        </MDTypography>
      ),
      remove: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
          onClick={() => {
            handleDelete();
          }}
        >
          <Link>remove</Link>
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "programme", accessor: "programme", width: "45%", align: "left" },
      { Header: "details", accessor: "details", align: "left" },
      { Header: "about", accessor: "about", align: "left" },
      { Header: "year", accessor: "year", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    refetch,
    currentCount,
    totalProgrammes,
    isGettingAllProgrammes,
  };
}
