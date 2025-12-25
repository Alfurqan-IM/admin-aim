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
import Divider from "@mui/material/Divider";
// @mui icons
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "./profile/components/Header";
//import PlatformSettings from "./profile/components/PlatformSettings";
import { useDispatch, useSelector } from "react-redux";
// import { useUploadEmployeeImages } from "features/employees/employeesThunk";
import { Link } from "react-router-dom";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
// import PaginationControlled from "components copy/component's_Tables/Pagination";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import moment from "moment";
// import huntersTableData from "./data/surahTableData";
// import { resetValues } from "features/hunters/huntersSlice";
// import HunterSearchModal from "components copy/searchModals/HunterSearchModal";
// import { changePage } from "features/hunters/huntersSlice";
// import { useSingleHunter } from "features/hunters/huntersThunk";
// impSurahuseSurahInp } from "hooks/DashDetails_2";
// import { useUpdateHunter } from "features/hunters/huntersThunk";
// import { useCreateHunter } from "features/hunters/huntersThunk";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import surahTableData from "./data/surahTableData";
import { useSurahInp } from "hooks/DashDetails_2";
import { useUpdateSurah } from "features/quran/quranThunk";
import { useCreateSurah } from "features/quran/quranThunk";
import { resetValues } from "features/quran/quranSlice";
//import PaginationControlled from "components copy/Pagination";
//import { changePage } from "features/quran/quranSlice";
function Quran() {
  const { columns, rows, isGettingAllQuran, refetch } = surahTableData();
  const dispatch = useDispatch();
  const { pages } = useSelector((store) => store.quran);

  // const handleChange = (event, value) => {
  //   event.preventDefault();
  //   dispatch(changePage(value));
  // };
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
                    {/* <MDTypography color="white">
                      {count}/{totalHunters}
                    </MDTypography> */}
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link onClick={() => dispatch(resetValues())} to="/createupdatequran/add">
                      <AddIcon sx={{ fill: "white" }} fontSize="medium" titleAccess="add surah" />
                    </Link>
                    {/* <HunterSearchModal isGettingAllHunters={isGettingAllHunters} /> */}
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
            {/* <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} /> */}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Quran;

// export function SingleHunter() {
//   const { id } = useParams();
//   const {
//     isGettingSingleHunter,
//     singleHunter: {
//       hunter: {
//         hunter_id,
//         assigned_supervisor,
//         fullname,
//         phone,
//         email,
//         joining_date,
//         tip,
//         employment_status,
//         emergency_contact_name,
//         emergency_contact,
//         notes,
//         hives = [],
//         catch_reports = [],
//       } = {},
//     } = {},
//     refetch,
//   } = useSingleHunter(id);

//   React.useEffect(() => {
//     refetch();
//   }, [id]);

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mb={2} />
//       <Header info={{ image: LogoAsana, fullname, phone }}>
//         <MDBox mt={5} mb={3}>
//           <Link to="/hunters">
//             <ArrowBackIcon />
//           </Link>
//           <Grid container spacing={1}>
//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
//               <ProfileInfoCard
//                 title=""
//                 description=""
//                 info={{
//                   hunter_id,
//                   fullname,
//                   phone,
//                   email,
//                 }}
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>

//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
//               <ProfileInfoCard
//                 title=""
//                 description=""
//                 info={{
//                   contracted_on: joining_date ? moment(joining_date).format("YYYY-MM-DD") : "N/A",
//                   supervisor: (
//                     <Link to={`/employees/${assigned_supervisor}`}>{assigned_supervisor}</Link>
//                   ),
//                   tip,
//                   employment_status,
//                 }}
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>

//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
//               <ProfileInfoCard
//                 title=""
//                 description=""
//                 info={{
//                   e_contact_name: emergency_contact_name,
//                   e_contact: emergency_contact,
//                   notes,
//                 }}
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>
//           </Grid>
//         </MDBox>
//       </Header>
//       <Footer />
//     </DashboardLayout>
//   );
// }

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
  //   console.log(surahDetails);
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
