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
import { useDashDetails_1 } from "hooks/DashDetails";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import campaignTableData, { donorCampaignTableData } from "./data/campaignTableData";
import { resetValues } from "features/campaigns/campaignSlice";
import { useCreateCampaign } from "features/campaigns/campaignThunk";
import { useUpdateCampaign } from "features/campaigns/campaignThunk";
import { InputFileUpload } from "components copy";
import { useUploadCampaignImages } from "features/campaigns/campaignThunk";
import PaginationControlled from "components copy/Pagination";
import { changePage } from "features/campaigns/campaignSlice";
import ConfirmDialog from "components copy/ConfirmDialog";
//import { Icon } from "@mui/material";
function Campaigns() {
  const {
    columns,
    rows,
    numOfPages,
    currentCount,
    totalCampaign,
    refetch,
    openConfirm,
    closeConfirm,
    handleConfirmDelete,
  } = campaignTableData();
  const {
    columns: dColumns,
    rows: dRows,
    donorRefetch,
    isGettingDonorCampaigns,
  } = donorCampaignTableData();
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  const { pages } = useSelector((store) => store.campaigns);
  React.useEffect(() => {
    refetch();
    donorRefetch();
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
                    <MDTypography color="white">Campaigns</MDTypography>
                    <MDTypography color="white">
                      {currentCount}/{totalCampaign}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link onClick={() => dispatch(resetValues())} to="/createupdatecampaign/add">
                      <AddIcon sx={{ fill: "white" }} fontSize="medium" titleAccess="add station" />
                    </Link>
                    {/* <StationSearchModal isGettingStations={isGettingStations} /> */}
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
                  message="You are about to delete this campaign permanently. This action cannot be undone."
                />
              </MDBox>
            </Card>

            <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
          </Grid>

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
                    <MDTypography color="white">Donor box Campaigns</MDTypography>
                    <MDTypography color="white">
                      {currentCount}/{totalCampaign}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                  </MDBox>
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: dColumns, rows: dRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
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
export default Campaigns;

export const CreateUpdateCampaign = () => {
  const { id } = useParams();
  const { campaign_details } = useDashDetails_1();
  const { createCampaign, isCreatingCampaign } = useCreateCampaign();
  const { updateCampaign, isUpdatingCampaign } = useUpdateCampaign();
  const { isEdit, status, title, description, donation_url, start_date, end_date, pages } =
    useSelector((store) => store.campaigns);
  const { uploadCampaignImgs, isUploadingCampaignImages } = useUploadCampaignImages(id);
  const campaignDetails = {
    status,
    title,
    description,
    donation_url,
    start_date,
    end_date,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      return updateCampaign({ campaignDetails, id });
    }

    createCampaign(campaignDetails);
  };

  const uploadCampaignAvatar = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    const formData = new FormData();
    if (file) {
      formData.append("image", file); // Append only one file with key "image"
      uploadCampaignImgs(formData);
      // console.log(file, formData);
    } else {
      alert("Please select a file to upload.");
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          <div>
            <div>
              <Link to="/campaigns">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit ? `Update Campaign details` : "Create Campaign"} </h6>
              <div>
                {isEdit ? (
                  <InputFileUpload
                    name={"Campaign Image"}
                    handleChange={uploadCampaignAvatar}
                    uploading={isUploadingCampaignImages}
                  />
                ) : (
                  ""
                )}
              </div>
              <div></div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {campaign_details
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
                {isCreatingCampaign === "pending" || isUpdatingCampaign === "pending" ? (
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
