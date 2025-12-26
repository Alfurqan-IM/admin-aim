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
import regTableData from "./data/regTableData";
import { changePage } from "features/registerations/registerationSlice";
import { resetValues } from "features/registerations/registerationSlice";
import { useRegInp } from "hooks/DashDetails_2";
import { useUpdateReg } from "features/registerations/registerationThunk";
import PaginationControlled from "components copy/Pagination";
import ConfirmDialog from "components copy/ConfirmDialog";
//import { Icon } from "@mui/material";

function Registerations() {
  const {
    columns,
    rows,
    numOfPages,
    currentCount,
    refetch,
    isGettingAllReg,
    total,
    openConfirm,
    closeConfirm,
    handleConfirmDelete,
  } = regTableData();
  const dispatch = useDispatch();
  const { pages } = useSelector((store) => store.registerations);
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
                    <MDTypography color="white">Registerations</MDTypography>
                    <MDTypography color="white">
                      {currentCount}/{total}
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
                  message="You are about to delete this registeration permanently. This action cannot be undone."
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
export default Registerations;

export const CreateUpdateRegisteration = () => {
  const { id } = useParams();
  const { regInputs } = useRegInp();
  const { updateReg, isUpdatingReg } = useUpdateReg();
  const { reg_id, programme, category, discovery_method, isEdit } = useSelector(
    (store) => store.registerations
  );
  const regDetails = {
    programme,
    category,
    discovery_method,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(regDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateReg({ regDetails, id });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          <div>
            <div>
              <Link to="/registerations">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit && `Update Registeration details`}</h6>
              <div></div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {regInputs
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
                // disabled={!isValid}
              >
                {isUpdatingReg === "pending" ? <Loader1 /> : isEdit ? "Update" : "Update"}
              </CustomButton>
            </form>
          </div>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
