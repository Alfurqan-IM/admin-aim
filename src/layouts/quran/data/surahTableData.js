// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
// import { useStations } from "features/stations/stationsThunk";
// import { setUpdateStation } from "features/stations/stationSlice";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import { useGetAllQuran } from "features/quran/quranThunk";
import { setUpdateQuran } from "features/quran/quranSlice";
// import { useHunters } from "features/hunters/huntersThunk";
// import { useDeleteHunter } from "features/hunters/huntersThunk";
// import { setUpdateHunter } from "features/hunters/huntersSlice";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function surahTableData() {
  // const [openConfirm, setOpenConfirm] = useState(false);
  // const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);
  const dispatch = useDispatch();
  // const { deleteHunter } = useDeleteHunter();
  const { isGettingAllQuran, data: { surahs = [] } = {}, refetch } = useGetAllQuran();
  // console.log(pages);

  const Author = ({ image, name, text, verse }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {verse} {name}
        </MDTypography>
        <MDTypography variant="caption">{text}</MDTypography>
      </MDBox>
    </MDBox>
  );
  // const Job = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       <Link to={`#`}>{`${title}`}</Link>
  //     </MDTypography>
  //     <MDTypography variant="caption">
  //       <Link to={`#`}>{`${description}`}</Link>
  //     </MDTypography>
  //   </MDBox>
  // );
  // const Coord = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       {title}
  //     </MDTypography>
  //     {/* <MDTypography variant="caption">{description}</MDTypography> */}
  //   </MDBox>
  // );
  const rows = surahs.map((sura, i) => {
    const { surah_id, surah, verse, text, translation, transliteration } = sura;
    const payload = {
      surah_id,
      surah,
      verse,
      text,
      translation,
      transliteration,
    };

    const handleEdit = () => {
      dispatch(setUpdateQuran(payload));
    };
    // const handleDelete = () => {
    //   const confirmation = window.confirm(
    //     "You are about to Delete a hunter records permanently, ARE YOU SURE?"
    //   );
    //   if (!confirmation) return;
    //   deleteHunter(hunter_id);
    // };
    const MAX_LENGTH = 40;
    const formatSurah = (text) =>
      text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}…` : text;

    return {
      quran: <Author image={LogoAsana} name={surah} text={text} verse={verse} />,
      translation: (
        <MDTypography
          title={translation}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {formatSurah(translation)}
        </MDTypography>
      ),
      transliteration: (
        <MDTypography
          title={transliteration}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {formatSurah(transliteration)}
        </MDTypography>
      ),
      // status: (
      //   <MDBox ml={-1}>
      //     <MDBadge
      //       badgeContent={employment_status}
      //       color={
      //         employment_status === "active"
      //           ? "success"
      //           : employment_status === "inactive"
      //           ? "warning"
      //           : "error"
      //       }
      //       variant="gradient"
      //       size="sm"
      //     />
      //   </MDBox>
      // ),
      // emergency_contact: <Job title={emergency_contact_name} description={emergency_contact} />,
      // date_employed: (
      //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //     {joining_date}
      //   </MDTypography>
      // ),
      // note: (
      //   <MDTypography
      //     title={notes}
      //     component="a"
      //     href="#"
      //     variant="caption"
      //     color="text"
      //     fontWeight="medium"
      //   >
      //     {notes.length > 20 ? `${notes.slice(0, 20)}...` : notes}
      //   </MDTypography>
      // ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {/* <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdatequran/${surah_id}`}
          >
            Edit
          </Link> */}
          <Link to={`/createupdatequran/${surah_id}`}>
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
      // remove: (
      //   <MDTypography
      //     component="a"
      //     variant="caption"
      //     color="text"
      //     fontWeight="medium"
      //     onClick={() => {
      //       handleDelete();
      //     }}
      //   >
      //     <Link>remove</Link>
      //   </MDTypography>
      // ),
    };
  });
  return {
    columns: [
      { Header: "quran", accessor: "quran", width: "45%", align: "left" },
      { Header: "translation", accessor: "translation", align: "left" },
      { Header: "transliteration", accessor: "transliteration", align: "left" },
      { Header: "update", accessor: "update", align: "center" },
    ],
    rows: rows,
    isGettingAllQuran,
    refetch,
  };
}
