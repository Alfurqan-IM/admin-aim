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
// import { useUploadEmployeeImages } from "features/employees/employeesThunk";
import { Link } from "react-router-dom";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
// import PaginationControlled from "components copy/component's_Tables/Pagination";
import { changePage } from "features/supplyProvision/supplyProvSlice";
import { resetValues } from "features/supplyProvision/supplyProvSlice";
import { ProvisionSearchModal } from "components copy";
import provisionsTableData from "./data/provisionsTableData";
import { useProvisionInputs } from "hooks/ServicesDetails";
import { useUpdateProvision } from "features/supplyProvision/supplyprovThunk";
import { useCreateProvision } from "features/supplyProvision/supplyprovThunk";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Provisions() {
  const dispatch = useDispatch();
  const { rows, numOfPages, refetch, count, columns, isGettingAllprovisions, totalProvisions } =
    provisionsTableData();

  const { item_id, item_name, description, quantity, price, sort, pages, priceRangeSP } =
    useSelector((store) => store.provisions);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [pages, item_id, item_name, description, quantity, price, sort, priceRangeSP]);

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
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography className={styles.wrapper} variant="h6" color="white">
                  <MDBox className={styles.inner}>
                    <MDTypography color="white"> Provisions</MDTypography>
                    <MDTypography color="white">
                      {count}/{totalProvisions}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link onClick={() => dispatch(resetValues())} to="/createupdateprovision/add">
                      <AddIcon
                        sx={{ fill: "white" }}
                        fontSize="medium"
                        titleAccess="add a new provision"
                      />
                    </Link>
                    <ProvisionSearchModal isGettingAllprovisions={isGettingAllprovisions} />
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
export default Provisions;

export const CreateUpdateProvision = () => {
  const { id } = useParams();
  const { provisionInputs } = useProvisionInputs();
  const { isUpdatingProvision, updateProvision } = useUpdateProvision();
  const { createProvision, isCreatingProvision } = useCreateProvision();
  const { service_id, item_name, description, quantity, price_NGN, isEdit } = useSelector(
    (store) => store.provisions
  );
  const provisionDetails = {
    service_id,
    item_name,
    description,
    quantity,
    price_NGN,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(provisionDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateProvision({ provisionDetails, id });
    createProvision(provisionDetails);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          <div>
            {/* <Link to={`/provisions`}>Go back to provisions</Link> */}
            <div>
              <Link to="/provisions">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit ? `Update item ${item_name}'s details` : "Create Provision Item"} </h6>
              <div></div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {provisionInputs
                .filter((detail) => detail.name !== "sort" && detail.name !== "priceRangeSP")
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
                {isCreatingProvision === "pending" || isUpdatingProvision === "pending" ? (
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
