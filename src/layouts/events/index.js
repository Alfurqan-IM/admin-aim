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
// import nokTableData from "./data/eventTableData";
// import { changePage } from "features/nok/nokSlice";
// import NokSearchModal from "components copy/searchModals/NokSearchModal";
// import { useCreateNok } from "features/nok/nokThunk";
// import { useUpdateNok } from "features/nok/nokThunk";
// import { useNok } from "hooks/DashDetails_2";
// import { resetValues } from "features/nok/nokSlice";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import eventsTableData from "./data/eventTableData";
import { useCreateEvent } from "features/events/eventThunk";
import { useUpdateEvent } from "features/events/eventThunk";
import { useEventInputs } from "hooks/DashDetails_2";
import { resetValues } from "features/events/eventSlice";
import { useUploadEventImages } from "features/events/eventThunk";
import { InputFileUpload } from "components copy";
import PaginationControlled from "components copy/Pagination";
import { changePage } from "features/events/eventSlice";
import ConfirmDialog from "components copy/ConfirmDialog";
//import { Icon } from "@mui/material";

function Events() {
  const {
    isGettingAllEvents,
    numOfPages,
    totalEvent,
    currentCount,
    refetch,
    rows,
    columns,
    openConfirm,
    closeConfirm,
    handleConfirmDelete,
  } = eventsTableData();
  const { pages } = useSelector((store) => store.events) || {};

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
                    <MDTypography color="white">Events</MDTypography>
                    <MDTypography color="white">
                      {currentCount}/{totalEvent}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link onClick={() => dispatch(resetValues())} to="/createupdateevent/add">
                      <AddIcon
                        sx={{ fill: "white" }}
                        fontSize="medium"
                        titleAccess="add new Event"
                      />
                    </Link>
                    {/* <NokSearchModal isGettingAllNok={isGettingAllNok} /> */}
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
                  message="You are about to delete this event permanently. This action cannot be undone."
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

export default Events;

export const CreateUpdateEvent = () => {
  const { id } = useParams();
  const { createEvent, isCreatingEvent } = useCreateEvent();
  const { updateEvent, isUpdatingEvent } = useUpdateEvent();
  const { eventInputDetails } = useEventInputs();
  const { uploadEventImgs, isUploadingEventImages } = useUploadEventImages(id);

  const { title, status, event_url, isEdit, description } = useSelector((store) => store.events);
  const eventDetails = {
    title,
    status,
    event_url,
    description,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(eventDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateEvent({ eventDetails, id });
    createEvent(eventDetails);
  };
  const uploadEventFlyer = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    const formData = new FormData();
    if (file) {
      formData.append("image", file); // Append only one file with key "image"
      uploadEventImgs(formData);
      // console.log(file, formData);
    } else {
      alert("Please select a file to upload.");
    }
  };
  //uploadEventImgs, isUploadingEventImages;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          <div>
            {/* <Link to="/noks">Go back</Link> */}
            <div>
              <Link to="/events">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit ? `Update Event details` : "Create New Event"} </h6>
              <div>
                {isEdit ? (
                  <InputFileUpload
                    name={"Event Flyer"}
                    handleChange={uploadEventFlyer}
                    uploading={isUploadingEventImages}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {eventInputDetails
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
                {isCreatingEvent === "pending" || isUpdatingEvent === "pending" ? (
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
