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
import styles from "../styles/thead.module.scss";
import donationTableData from "./data/donationTableData";
import { changePage } from "features/donations/donationSlice";
import DonationSearchModal from "components copy/searchModals/DonationSearchModal";
import { useGetAllDonations } from "features/donations/donationThunk";
import Header from "./profile/components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divider } from "@mui/material";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import PaginationControlled from "components copy/Pagination";
function Donations() {
  const dispatch = useDispatch();
  const { rows, refetch, columns, isGettingAllDonations } = donationTableData();

  const { page } = useSelector((store) => store.donations);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [page]);

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
                    <MDTypography color="white"> Donations</MDTypography>
                    {/* <MDTypography color="white">
                      {count}/{totalProvisions}
                    </MDTypography> */}
                  </MDBox>
                  <MDBox className={styles.inner}>
                    {/* <Link onClick={() => dispatch(resetValues())} to="/createupdateprovision/add">
                      <AddIcon
                        sx={{ fill: "white" }}
                        fontSize="medium"
                        titleAccess="add a new provision"
                      />
                    </Link> */}
                    <DonationSearchModal
                      refetch={refetch}
                      isGettingAllDonations={isGettingAllDonations}
                    />
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
            <PaginationControlled pageDetails={{ handleChange, page }} />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Donations;

// export const CreateUpdateProvision = () => {
//   const { id } = useParams();
//   const { provisionInputs } = useProvisionInputs();
//   const { isUpdatingProvision, updateProvision } = useUpdateProvision();
//   const { createProvision, isCreatingProvision } = useCreateProvision();
//   const { service_id, item_name, description, quantity, price_NGN, isEdit } = useSelector(
//     (store) => store.provisions
//   );
//   const provisionDetails = {
//     service_id,
//     item_name,
//     description,
//     quantity,
//     price_NGN,
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const isValid = Object.values(provisionDetails).every(
//       (value) => value !== undefined && value !== null && value !== ""
//     );
//     if (!isValid) {
//       alert("Please fill out all required fields.");
//       return;
//     }
//     if (isEdit) return updateProvision({ provisionDetails, id });
//     createProvision(provisionDetails);
//   };
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mt={5} mb={3}>
//         <Grid className={styling.wrapper} container spacing={1}>
//           <div>
//             {/* <Link to={`/provisions`}>Go back to provisions</Link> */}
//             <div>
//               <Link to="/provisions">
//                 <ArrowBackIcon />
//               </Link>
//               <h6>{isEdit ? `Update item ${item_name}'s details` : "Create Provision Item"} </h6>
//               <div></div>
//             </div>
//             <form className={styling.form} onSubmit={handleSubmit}>
//               {provisionInputs
//                 .filter((detail) => detail.name !== "sort" && detail.name !== "priceRangeSP")
//                 .map((detail) => {
//                   const { name, TextField } = detail;
//                   return <div key={name}>{TextField}</div>;
//                 })}
//               <CustomButton
//                 background={"inherit"}
//                 backgroundhover={"grey"}
//                 size={"100%"}
//                 height={"3vh"}
//                 type="submit"
//                 // disabled={!isValid}
//               >
//                 {isCreatingProvision === "pending" || isUpdatingProvision === "pending" ? (
//                   <Loader1 />
//                 ) : isEdit ? (
//                   "Update"
//                 ) : (
//                   "Submit"
//                 )}
//               </CustomButton>
//             </form>
//           </div>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// };

// export function SingleDonor() {
//   const { id } = useParams();
//   console.log(id);
//   const { data, refetch } = useGetAllDonations();
//   const donorId = Number(id);
//   const donations = data?.donations ?? [];
//   const donorDonation = donations.find((donation) => donation.id === donorId);
//   const {
//     donor,
//     // amount,
//     // formatted_amount,
//     //converted_amount,
//     formatted_converted_amount,
//     recurring,
//     first_recurring_donation,
//     //amount_refunded,
//     formatted_amount_refunded,
//     stripe_charge_id,
//     //status,
//     // donation_type,
//     // donation_date,
//     anonymous_donation,
//     gift_aid,
//     designation,
//     join_mailing_list,
//     //comment,
//     donating_company,
//     // currency,
//     converted_currency,
//     utm_campaign,
//     utm_source,
//     utm_medium,
//     utm_term,
//     utm_content,
//     //processing_fee,
//     formatted_processing_fee,
//     address,
//     address_line_2,
//     city,
//     state,
//     zip_code,
//     country,
//     employer,
//     occupation,
//     questions = [],
//   } = donorDonation || {};
// console.log(donor)
//   // // const { uploadProductImgs, isUploadingProductImages } = useUploadProductImages(id);
//   // // const { isUpdatingColor } = updateProductColors(id);
//   // const {
//   //   programme_id,
//   //   title,
//   //   description,
//   //   heading,
//   //   about,
//   //   time,
//   //   year,
//   //   start_date,
//   //   end_date,
//   //   programmesimages,
//   //   programmeoutcomes,
//   // } = singleprogramme || {};
//   // const { image0, image1, image2 } = programmesimages?.[0] || {};
//   // const { outcome1, outcome2, outcome3 } = programmeoutcomes?.[0] || {};
//   // const imageArray = [image0, image1, image2];
//   React.useEffect(() => {
//     refetch();
//   }, [id]);
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mb={2} />
//       <Header info={{ donor }}>
//         <MDBox mt={5} mb={3}>
//           <div
//             style={{
//               // border: "1px solid red",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Link to="/programmes">
//               <ArrowBackIcon />
//             </Link>
//             {/* <ColorPicker color_id={id} />
//             <InputFileUpload
//               name={"product images"}
//               handleChange={uploadProductImages}
//               uploading={isUploadingProductImages}
//             /> */}
//           </div>
//           <Grid container spacing={1}>
//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
//               <ProfileInfoCard
//                 title=""
//                 description=""
//                 info={
//                   {
//                     // id: donor.id,
//                     // first_name: donor.first_name,
//                     // last_name: donor.last_name,
//                     // email: donor.email,
//                     // address: donor.address,
//                     // city: donor.city,
//                     // state: donor.city,
//                     // zip_code: donor.zip_code,
//                     // country: donor.country,
//                     // employer: donor.employer,
//                     // occupation: donor.occupation,
//                   }
//                 }
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>
//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
//               <ProfileInfoCard
//                 title=""
//                 description=""
//                 info={{
//                   formatted_converted_amount,
//                   recurring,
//                   first_recurring_donation,
//                   formatted_amount_refunded,
//                   stripe_charge_id,
//                   anonymous_donation,
//                   gift_aid,
//                   designation,
//                 }}
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>
//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
//               <ProfileInfoCard
//                 title=""
//                 description=""
//                 info={{
//                   join_mailing_list,
//                   donating_company,
//                   converted_currency,
//                   utm_campaign,
//                   utm_source,
//                   utm_medium,
//                   utm_term,
//                   utm_content,
//                   formatted_processing_fee,
//                 }}
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>
//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
//               <ProfileInfoCard
//                 title=""
//                 description=""
//                 info={{
//                   address,
//                   address_line_2,
//                   city,
//                   state,
//                   zip_code,
//                   country,
//                   employer,
//                   occupation,
//                 }}
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>
//           </Grid>
//         </MDBox>
//       </Header>
//       <Footer />
//     </DashboardLayout>
//   );
// }
export function SingleDonor() {
  const { id } = useParams();
  const donorId = Number(id);

  const { data, refetch } = useGetAllDonations();

  // ---- PLACEHOLDER (used when API returns empty array) ----
  const DONATION_PLACEHOLDER = [
    {
      id: donorId || 1,
      action: "new",
      donor: {
        id: 59,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@email.com",
        address: "123 6th St.",
        address_line_2: "Lakeside Road",
        city: "Melbourne",
        state: "FL",
        zip_code: "32904",
        country: "US",
        employer: null,
        occupation: null,
      },
      formatted_converted_amount: "$100",
      recurring: false,
      first_recurring_donation: false,
      formatted_amount_refunded: "$0",
      stripe_charge_id: "test_charge",
      anonymous_donation: false,
      gift_aid: false,
      designation: "Test Campaign",
      join_mailing_list: false,
      donating_company: null,
      converted_currency: "USD",
      utm_campaign: null,
      utm_source: null,
      utm_medium: null,
      utm_term: null,
      utm_content: null,
      formatted_processing_fee: "$0.59",
      address: "123 6th St.",
      address_line_2: "Lakeside Road",
      city: "Melbourne",
      state: "FL",
      zip_code: "32904",
      country: "US",
      employer: null,
      occupation: null,
      questions: [],
    },
  ];

  // ---- SAFE DONATIONS SOURCE ----
  const donations =
    data?.donations && data.donations.length > 0 ? data.donations : DONATION_PLACEHOLDER;

  // ---- FIND DONATION SAFELY ----
  const donorDonation = React.useMemo(() => {
    return donations.find((donation) => donation.id === donorId);
  }, [donations, donorId]);

  // ---- GUARD (prevents undefined crash) ----
  if (!donorDonation) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>Loading donor details…</MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // ---- SAFE DESTRUCTURING ----
  const {
    action,
    donor = {},
    formatted_converted_amount,
    recurring,
    first_recurring_donation,
    formatted_amount_refunded,
    stripe_charge_id,
    anonymous_donation,
    gift_aid,
    designation,
    join_mailing_list,
    donating_company,
    converted_currency,
    utm_campaign,
    utm_source,
    utm_medium,
    utm_term,
    utm_content,
    formatted_processing_fee,
    address,
    address_line_2,
    city,
    state,
    zip_code,
    country,
    employer,
    occupation,
    questions = [],
  } = donorDonation;

  React.useEffect(() => {
    refetch();
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />

      <Header info={{ donor }}>
        <MDBox mt={5} mb={3}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/donations">
              <ArrowBackIcon />
            </Link>
          </div>

          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Donor"
                info={{
                  first_name: donor.first_name,
                  last_name: donor.last_name,
                  email: donor.email,
                  address: donor.address,
                  address_line_2: donor.address_line_2,
                  city: donor.city,
                  state: donor.state,
                  zip_code: donor.zip_code,
                  country: donor.country,
                  employer: donor.employer,
                  occupation: donor.occupation,
                }}
                shadow={false}
              />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Donation"
                info={{
                  formatted_converted_amount,
                  recurring,
                  first_recurring_donation,
                  formatted_amount_refunded,
                  stripe_charge_id,
                  anonymous_donation,
                  gift_aid,
                  designation,
                  action,
                }}
                shadow={false}
              />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Tracking"
                info={{
                  join_mailing_list,
                  donating_company,
                  converted_currency,
                  utm_campaign,
                  utm_source,
                  utm_medium,
                  utm_term,
                  utm_content,
                  formatted_processing_fee,
                }}
                shadow={false}
              />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Address"
                info={{
                  address,
                  address_line_2,
                  city,
                  state,
                  zip_code,
                  country,
                  employer,
                  occupation,
                }}
                shadow={false}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>

      <Footer />
    </DashboardLayout>
  );
}
