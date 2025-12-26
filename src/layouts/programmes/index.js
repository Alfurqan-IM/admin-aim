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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import programmesTableData from "./data/programmesTableData";
import { changePage } from "features/programmes/programmeSlice";
import { resetValues } from "features/programmes/programmeSlice";
import { useProgrammesInputs } from "hooks/DashDetails";
import { useCreateProgramme } from "features/programmes/programmeThunk";
import { useUpdateProgramme } from "features/programmes/programmeThunk";
import { useUpdateProgrammeOutcome } from "features/programmes/programmeThunk";
import { InputFileUpload } from "components copy";
import { useGetSinglProgramme } from "features/programmes/programmeThunk";
import { useUploadProgrammeImages } from "features/programmes/programmeThunk";
import { convertToDateOnly } from "utils";
import PaginationControlled from "components copy/Pagination";
import ConfirmDialog from "components copy/ConfirmDialog";
function Programmes() {
  const dispatch = useDispatch();
  const {
    rows,
    numOfPages,
    refetch,
    count,
    columns,
    currentCount,
    totalProgrammes,
    isGettingAllProgrammes,
    openConfirm,
    closeConfirm,
    handleConfirmDelete,
  } = programmesTableData();
  const { pages } = useSelector((store) => store.programmes);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
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
                    <MDTypography color="white">Programmes</MDTypography>
                    <MDTypography color="white">
                      {currentCount}/{totalProgrammes}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link onClick={() => dispatch(resetValues())} to={`/createupdateprogramme/add`}>
                      <AddIcon
                        sx={{ fill: "white" }}
                        fontSize="medium"
                        titleAccess="add a new programme"
                      />
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
                <ConfirmDialog
                  open={openConfirm}
                  onClose={closeConfirm}
                  onConfirm={handleConfirmDelete}
                  title="Confirm Deletion"
                  message="You are about to delete this programme permanently. This action cannot be undone."
                />
              </MDBox>
            </Card>
            <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Programmes;

export const CreateUpdateProgramme = () => {
  const { id } = useParams();
  const { programmeInputs, programmeOutcomeInp } = useProgrammesInputs();
  const { updateProgramme, isUpdatingProgramme } = useUpdateProgramme();
  const { createProgramme, isCreatingProgramme } = useCreateProgramme();
  const { uploadProgrammeImgs, isUploadingProgrammeImages } = useUploadProgrammeImages(id);
  const { updateProgrammeOutcome, isUpdatingProgrammeOutcome } = useUpdateProgrammeOutcome();
  const {
    isEdit,
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
  } = useSelector((store) => store.programmes);
  const programmedetails = {
    title,
    description,
    heading,
    about,
    time,
    year,
    start_date,
    end_date,
  };
  const outcomedetails = {
    outcome1,
    outcome2,
    outcome3,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.entries(programmedetails).every(
      ([key, value]) =>
        key === "start_date" || (value !== undefined && value !== null && value !== "")
    );

    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }

    if (isEdit) {
      return updateProgramme({ programmedetails, id });
    }

    createProgramme(programmedetails);
  };
  const handleSubmitOut = (e) => {
    e.preventDefault();

    if (isEdit) {
      return updateProgrammeOutcome({ outcomedetails, id });
    }
  };
  const uploadProgrammeImages = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const formData = new FormData();

    // IMPORTANT: always use the SAME field name → "images"
    files.slice(0, 2).forEach((file) => {
      formData.append("images", file);
    });

    uploadProgrammeImgs(formData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          <div>
            <div>
              <Link to="/programmes">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit ? `Update programme details` : "Create a new programme"} </h6>
              <div>
                {isEdit ? (
                  <InputFileUpload
                    name={"Programme Images"}
                    handleChange={uploadProgrammeImages}
                    uploading={isUploadingProgrammeImages}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {programmeInputs
                // .filter((detail) => detail.name !== "sort" && detail.name !== "priceRangePP")
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
                // disabled={!isValid}
              >
                {isCreatingProgramme === "pending" || isUpdatingProgramme === "pending" ? (
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
      <MDBox mt={5} mb={3}>
        {isEdit && (
          <Grid className={styling.wrapper} container spacing={1}>
            <div>
              <div>
                <h6>Update outcome details</h6>
                <div></div>
              </div>

              <form className={styling.form} onSubmit={handleSubmitOut}>
                {programmeOutcomeInp.map((detail) => {
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
                  {isUpdatingProgrammeOutcome === "pending" ? <Loader1 /> : "Update"}
                </CustomButton>
              </form>
            </div>
          </Grid>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export function SingleProgramme() {
  const { id } = useParams();
  const { isGettingSingleProgramme, singleprogramme, refetch } = useGetSinglProgramme(id);
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
  } = singleprogramme || {};
  const { image0, image1, image2 } = programmesimages?.[0] || {};
  const { outcome1, outcome2, outcome3 } = programmeoutcomes?.[0] || {};
  const imageArray = [image0, image1, image2];

  React.useEffect(() => {
    refetch();
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header info={{ image: image0, imageArray, id }}>
        <MDBox mt={5} mb={3}>
          <div
            style={{
              // border: "1px solid red",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/programmes">
              <ArrowBackIcon />
            </Link>
          </div>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  programme_id,
                  title,
                  heading,
                  description,
                }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  about,
                  time,
                  year,
                  start_date: convertToDateOnly(start_date),
                }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  end_date: convertToDateOnly(end_date),
                  outcome1,
                  outcome2,
                  outcome3,
                }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}
