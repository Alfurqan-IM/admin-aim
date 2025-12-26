import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// Data
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import surahTableData from "./data/surahTableData";
import { useSurahInp } from "hooks/DashDetails_2";
import { useUpdateSurah } from "features/quran/quranThunk";
import { useCreateSurah } from "features/quran/quranThunk";
import { resetValues } from "features/quran/quranSlice";
function Quran() {
  const { columns, rows, isGettingAllQuran, refetch } = surahTableData();
  const dispatch = useDispatch();
  const { pages } = useSelector((store) => store.quran);
  React.useEffect(() => {
    refetch();
  }, [pages]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="contained"
                bgColor="forest"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography className={styles.wrapper} variant="h6" color="white">
                  <MDBox className={styles.inner}>
                    <MDTypography color="white">Surahs</MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link onClick={() => dispatch(resetValues())} to="/createupdatequran/add">
                      <AddIcon sx={{ fill: "white" }} fontSize="medium" titleAccess="add surah" />
                    </Link>
                  </MDBox>
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Quran;

export const CreateUpdateQuran = () => {
  const { id } = useParams();
  const { surahInputs } = useSurahInp();
  const { updateSurah, isUpdatingSurah } = useUpdateSurah();
  const { createSurah, isCreatingSurah } = useCreateSurah();
  const {
    verse,
    surah,
    text,
    translation,
    transliteration,
    pages,
    isEdit
  } = useSelector((store) => store.quran);
  const surahDetails = {
    verse,
    surah,
    text,
    translation,
    transliteration,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(surahDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateSurah({ surahDetails, id });
    createSurah(surahDetails);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          <div>
            <div>
              <Link to="/quran">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit ? `Update Surah details` : "Create Surah"} </h6>
              <div></div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {surahInputs
                //.filter((detail) => detail.name !== "sort")
                .map((detail) => {
                  const { name, TextField } = detail;
                  return <div key={name}>{TextField}</div>;
                })}
              <CustomButton
                background={"inherit"}
                backgroundhover={"grey"}
                size={"100%"}
                height={"3vh"}
                type="submit"
              >
                {isCreatingSurah === "pending" || isUpdatingSurah === "pending" ? (
                  <Loader1 />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </CustomButton>
            </form>
          </div>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
