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
import PaginationControlled from "components copy/component's_Tables/Pagination";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ordersTableData from "./data/ordersTableData";
import { useUpdateOrder } from "features/orders/ordersThunk";
import { useOrderInputs } from "hooks/ServicesDetails";
import OrderSearchModal from "components copy/searchModals/OrderSearchModal";
import { changePage } from "features/orders/ordersSlice";
function Orders() {
  const dispatch = useDispatch();
  const { rows, numOfPages, refetch, count, columns, totalOrders, isGettingAllOrders } =
    ordersTableData();
  const {
    sort,
    pages,
    user_id,
    tax,
    shippingFee,
    subTotal,
    total,
    paymentStatus,
    deliveryStatus,
    tx_ref,
    transaction_id,
  } = useSelector((store) => store.orders);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    sort,
    user_id,
    tax,
    shippingFee,
    subTotal,
    total,
    paymentStatus,
    deliveryStatus,
    tx_ref,
    transaction_id,
  ]);
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
                    <MDTypography color="white">Orders</MDTypography>
                    <MDTypography color="white">
                      {count}/{totalOrders}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <OrderSearchModal isGettingAllOrders={isGettingAllOrders} />
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
export default Orders;

export const UpdateOrder = () => {
  const { id } = useParams();
  const { orderInputs } = useOrderInputs();
  const { updateOrder, isUpdatingOrder } = useUpdateOrder();
  const { isEdit, paymentStatus, deliveryStatus } = useSelector((store) => store.orders);
  const orderdetails = {
    // paymentStatus,
    deliveryStatus,
  };

  const handleSubmit = (e) => {
    console.log(isEdit);
    e.preventDefault();
    if (!isEdit) {
      return;
    }
    const isValid = Object.values(orderdetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    return updateOrder({ orderdetails, id });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          <div>
            <div>
              <Link to="/orders">
                <ArrowBackIcon />
              </Link>
              <h6> Update Order details </h6>
              <div></div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {orderInputs
                .filter((detail) => detail.name === "deliveryStatus")
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
                {isUpdatingOrder === "pending" ? <Loader1 /> : "Update"}
              </CustomButton>
            </form>
          </div>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
