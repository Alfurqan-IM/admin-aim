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
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function surahTableData() {
  const dispatch = useDispatch();
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
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
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
