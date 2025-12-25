// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import React from "react";
import { useGetAllDonations } from "features/donations/donationThunk";
import { convertToDateOnly } from "utils";
// import { useSupplyProvision } from "features/supplyProvision/supplyprovThunk";
// import { useDeleteProvision } from "features/supplyProvision/supplyprovThunk";
// import { setUpdateProvision } from "features/supplyProvision/supplyProvSlice";

export default function donationTableData() {
  const dispatch = useDispatch();
  //const { deleteProvision } = useDeleteProvision();
  const DONATION_PLACEHOLDER = [
    {
      action: "new",
      campaign: {
        id: 1,
        name: "Donorbox Campaign",
      },
      donor: {
        id: 59,
        name: "John Doe",
        first_name: "John",
        last_name: "Doe",
        email: "johndoeemail@hotmail.com",
        address: "123 6th St.",
        address_line_2: "Lakeside Road",
        city: "Melbourne",
        state: "FL",
        zip_code: "32904",
        country: "US",
        employer: null,
        occupation: null,
      },
      amount: "100.0",
      formatted_amount: "$100",
      converted_amount: "100.0",
      formatted_converted_amount: "$100",
      recurring: false,
      first_recurring_donation: false,
      amount_refunded: "0.0",
      formatted_amount_refunded: "$0",
      stripe_charge_id: "ch_1BF94aBku99FiTp3uJM5mSKw",
      id: 1,
      status: "paid",
      donation_type: "stripe",
      donation_date: "2017-12-21T17:54:13.432Z",
      anonymous_donation: false,
      gift_aid: false,
      designation: "Designed Cause",
      join_mailing_list: false,
      comment: "thanks",
      donating_company: null,
      currency: "USD",
      converted_currency: "USD",
      utm_campaign: "google_ads",
      utm_source: "Adwords",
      utm_medium: "cpc",
      utm_term: "nonprofit fundraising",
      utm_content: "np1",
      processing_fee: 0.59,
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

  const { isGettingAllDonations, data, refetch } = useGetAllDonations();
  const donations =
    data?.donations && data.donations.length > 0 ? data.donations : DONATION_PLACEHOLDER;

  const Author = ({ image, campaign_name, campaign_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`${campaign_id} `}
        </MDTypography>
        <MDTypography variant="caption">{campaign_name}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const rows = donations.map((item, i) => {
    const {
      campaign,
      donor,
      id: donation_id,
      action,
      formatted_amount,
      status,
      donation_date,
      donation_type,
      country,
      comment,
    } = item;
    // const payload = {
    //   service_id,
    //   item_name,
    //   description,
    //   quantity,
    //   price_NGN,
    // };

    // const handleEdit = () => {
    //   dispatch(setUpdateProvision(payload));
    // };
    // const handleDelete = () => {
    //   const confirmation = window.confirm(
    //     "You are about to Delete a provision records permanently, ARE YOU SURE?"
    //   );
    //   if (!confirmation) return;
    //   deleteProvision(item_id);
    // };
    return {
      campaign: (
        <Author image={logoSlack} campaign_name={campaign.name} campaign_id={campaign.id} />
      ),
      donor: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <Link to={`/donations/${donation_id}`}>{donor.name}</Link>
        </MDTypography>
      ),
      comment: (
        <MDTypography
          title={comment}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {comment.length > 20 ? `${comment.slice(0, 20)}...` : comment}
        </MDTypography>
      ),
      amount: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {formatted_amount}
        </MDTypography>
      ),
      donation: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {convertToDateOnly(donation_date)}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={status}
            color={status === "paid" ? "success" : "warning"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      country: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {country}
        </MDTypography>
      ),
      donation_type: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {donation_type}
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "campaign", accessor: "campaign", width: "45%", align: "left" },
      { Header: "donor", accessor: "donor", align: "left" },
      { Header: "comment", accessor: "comment", align: "center" },
      { Header: "amount", accessor: "amount", align: "center" },
      { Header: "donation", accessor: "donation", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "country", accessor: "country", align: "center" },
      { Header: "donation_type", accessor: "donation_type", align: "center" },
    ],
    rows: rows,
    refetch,
    isGettingAllDonations,
  };
}
