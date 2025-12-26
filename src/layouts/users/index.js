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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import usersTableData from "./data/usersTableData";
import { changePage } from "features/users/userSlice";
import { UserSearchModal } from "components copy";
import { useSingleUser } from "features/users/userThunk";
import styles from "../styles/thead.module.scss";
import PaginationControlled from "components copy/Pagination";
import ConfirmDialog from "components copy/ConfirmDialog";
function Users() {
  const {
    columns,
    rows,
    numOfPages,
    count,
    totalUsers,
    refetch,
    isGettingAllUser,
    blacklisting,
    openConfirm,
    closeConfirmDialog,
    selectedUser,
    handleConfirmAction,
  } = usersTableData();
  const dispatch = useDispatch();
  const { pages } = useSelector((store) => store.users);

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
                    <MDTypography color="white">Users</MDTypography>
                    <MDTypography color="white">
                      {count}/{totalUsers}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <UserSearchModal refetch={refetch} isGettingAllUser={isGettingAllUser} />
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
                  onClose={closeConfirmDialog}
                  onConfirm={handleConfirmAction}
                  title={selectedUser?.blacklisted ? "Activate User" : "Blacklist User"}
                  message={
                    selectedUser?.blacklisted
                      ? "You are about to activate this user. They will regain full access."
                      : "You are about to blacklist this user. This will restrict their access."
                  }
                  confirmText={selectedUser?.blacklisted ? "Activate" : "Blacklist"}
                  confirmColor={selectedUser?.blacklisted ? "success" : "error"}
                  loading={false}
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
export default Users;

export function SingleUser() {
  const { id } = useParams();
  const { isGettingSingleUser, singleuser, refetch } = useSingleUser(id);
  const { user, deliveryStatusCount = [], paymentStatusCount = [] } = singleuser || {};
  const {
    address,
    blacklisted,
    email,
    notification,
    last_name,
    gender,
    image,
    isVerified,
    phone,
    role,
    user_id,
  } = user ?? {};
  React.useEffect(() => {
    refetch();
  }, [id]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header info={{ image, last_name, address, role }}>
        <MDBox mt={5} mb={3}>
          <Link to="/users">
            {" "}
            <ArrowBackIcon />
          </Link>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  last_name,
                  id: user_id,
                  email,
                  mobile: phone,
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
                  address,
                  gender,
                  blacklisted: blacklisted ? "YES" : "No",
                  Notification: notification ? "YES" : "No",
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
                  Verified: isVerified ? "YES" : "No",
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
