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
import { Link } from "react-router-dom";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
import PaginationControlled from "components copy/component's_Tables/Pagination";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import moment from "moment";
import servicesTableData from "./data/servicesTableData";
import { changePage } from "features/services/serviceSlice";
import { resetValues } from "features/services/serviceSlice";
import ServiceSearchModal from "components copy/searchModals/ServiceSearchModal";
import { useServiceInputs } from "hooks/ServicesDetails";
import { useUpdateService } from "features/services/servicesThunk";
import { useCreateService } from "features/services/servicesThunk";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Services() {
  const {
    columns,
    rows,
    numOfPages,
    count,
    refetch,
    isGettingAllServices,
    service,
    totalServices,
  } = servicesTableData();
  const dispatch = useDispatch();

  const { service_name, description, numOfTimesRendered, category, sort, pages } = useSelector(
    (store) => store.services
  );

  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [service_name, description, numOfTimesRendered, category, sort, pages]);

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
                    <MDTypography color="white">Services</MDTypography>
                    <MDTypography color="white">
                      {count}/{totalServices}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link onClick={() => dispatch(resetValues())} to="/createupdateservice/add">
                      <AddIcon
                        sx={{ fill: "white" }}
                        fontSize="medium"
                        titleAccess="add a new service"
                      />
                    </Link>
                    <ServiceSearchModal isGettingAllServices={isGettingAllServices} />
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
            <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Services;

export const CreateUpdateService = () => {
  const { id } = useParams();
  const { serviceInputs } = useServiceInputs();
  const { isUpdatingService, updateService } = useUpdateService();
  const { createService, isCreatingService } = useCreateService();
  const { service_name, description, numOfTimesRendered, category, isEdit } = useSelector(
    (store) => store.services
  );
  const serviceDetails = {
    service_name,
    description,
    numOfTimesRendered,
    category,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(serviceDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateService({ serviceDetails, id });
    createService(serviceDetails);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          <div>
            <div>
              <Link to="/services">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit ? `Update ${service_name} details` : "Create a new Service"} </h6>
              <div></div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {serviceInputs
                .filter((detail) => detail.name !== "sort")
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
                {isCreatingService === "pending" || isUpdatingService === "pending" ? (
                  <Loader1 />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </CustomButton>
            </form>
          </div>{" "}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
