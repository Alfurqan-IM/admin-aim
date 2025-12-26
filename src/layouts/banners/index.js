import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { InputFileUpload } from "components copy";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//style
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import bannersTableData from "./data/bannersTableData";
import { useBanner } from "hooks/Register";
import { useCreatebanner } from "features/banners/bannerThunk";
import { useUpdatebanner } from "features/banners/bannerThunk";
import { useUploadbannerImages } from "features/banners/bannerThunk";
import { handleReset } from "features/banners/bannerSlice";
import PaginationControlled from "components copy/Pagination";
import { changePage } from "features/banners/bannerSlice";
import ConfirmDialog from "components copy/ConfirmDialog";
//import ConfirmDialog from "components/ConfirmDialog";
function Banners() {
  const {
    columns,
    rows,
    numOfPages,
    totalBanners,
    currentCount,
    isGettingAllbanners,
    refetch,
    openConfirm,
    closeConfirm,
    handleConfirmDelete,
  } = bannersTableData();
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  const { pages } = useSelector((store) => store.banners);
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
                    <MDTypography color="white">Banners</MDTypography>
                    <MDTypography color="white">
                      {currentCount}/{totalBanners}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link
                      onClick={() => dispatch(handleReset())}
                      to="/admin/createupdatebanner/add"
                    >
                      <AddIcon sx={{ fill: "white" }} fontSize="medium" titleAccess="add banner" />
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
                  message="You are about to delete this banner permanently. This action cannot be undone."
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
export default Banners;

export function CreateUpdateBanner() {
  const { id } = useParams();
  const { bannerDetails } = useBanner();
  // const dispatch = useDispatch();
  const { createbanner, isCreatingbanner } = useCreatebanner();
  const { updatebanner, isUpdatingbanner } = useUpdatebanner();

  const { title, description, time, year, start_date, end_date, isEdit, pages, sort } = useSelector(
    (store) => store.banners
  );
  const bannerPayload = {
    title,
    description,
    time,
    year,
    start_date,
    end_date,
  };
  // const image = "";
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(bannerPayload).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updatebanner({ bannerPayload, id });
    createbanner(bannerPayload);
  };
  const { uploadbannerImgs, isUploadingbannerImages } = useUploadbannerImages(id);

  const uploadBanerAvatar = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    const formData = new FormData();
    if (file) {
      formData.append("image", file); // Append only one file with key "image"
      uploadbannerImgs(formData);
      // console.log(file, formData);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          <div>
            <div>
              <Link to="/banners">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit ? `Update Banner details` : "Create Banner"} </h6>
              <div>
                {isEdit ? (
                  <InputFileUpload
                    name={"Banner"}
                    handleChange={uploadBanerAvatar}
                    uploading={isUploadingbannerImages}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {bannerDetails.map((detail) => {
                const { name, TextField } = detail;
                return <div key={name}>{TextField}</div>;
              })}
              <CustomButton
                background={"inherit"}
                // background={"#1212121F"}
                backgroundhover={"grey"}
                size={"100%"}
                height={"3vh"}
                type="submit"
                // disabled={!isValid}
              >
                {isCreatingbanner === "pending" || isUpdatingbanner === "pending" ? (
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
      {/* </Header> */}
      <Footer />
    </DashboardLayout>
  );
}
