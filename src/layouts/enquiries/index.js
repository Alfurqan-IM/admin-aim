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
import enquiryTableData from "./data/enquiryTableData";
import { changePage } from "features/enquiries/enquirySlice";
import { resetValues } from "features/enquiries/enquirySlice";
import { useEnqInp } from "hooks/DashDetails_2";
import { useUpdateEnq } from "features/enquiries/enquiryThunk";
import PaginationControlled from "components copy/Pagination";
import ConfirmDialog from "components copy/ConfirmDialog";

function Enquiries() {
  const {
    columns = [],
    rows = [],
    numOfPages,
    currentCount,
    refetch,
    totalEnq,
    isGettingAllEnq,
    openConfirm,
    closeConfirm,
    handleConfirmDelete,
  } = enquiryTableData() || {};

  const { pages } = useSelector((store) => store.enquiries) || {};
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };

  // Always call useEffect unconditionally
  React.useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [pages, refetch]);

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
                    <MDTypography color="white"> Enquiries</MDTypography>
                    <MDTypography color="white">
                      {currentCount}/{totalEnq}
                    </MDTypography>
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
                  message="You are about to delete this enquiry permanently. This action cannot be undone."
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

export default Enquiries;

export const CreateUpdateEnquiry = () => {
  const { id } = useParams();
  const { enqInput } = useEnqInp();
  const { isUpdatingEnq, updateEnq } = useUpdateEnq();
  const { status, isEdit } = useSelector((store) => store.enquiries);
  const enquiryDetails = {
    status,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) return updateEnq({ status, id });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          <div>
            <div>
              <Link to="/enquiries">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit && `Update enquiry details for  Enquiry ${id}`} </h6>
              <div></div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {enqInput
                // .filter((detail) => detail.name !== "sort")
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
                {isUpdatingEnq === "pending" ? <Loader1 /> : isEdit ? "Update" : "Update"}
              </CustomButton>
            </form>
          </div>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
