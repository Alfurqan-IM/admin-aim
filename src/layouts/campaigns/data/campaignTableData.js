// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
// import { useStations } from "features/stations/stationsThunk";
// import { setUpdateStation } from "features/stations/stationSlice";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import { useGetAllCampaigns } from "features/campaigns/campaignThunk";
import { setUpdateCampaign } from "features/campaigns/campaignSlice";
import { convertToDateOnly } from "utils";
import { useDeleteCampaign } from "features/campaigns/campaignThunk";
import { useGetAllDonorCampaigns } from "features/campaigns/campaignThunk";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function campaignTableData() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const { deleteCampaign } = useDeleteCampaign();
  const dispatch = useDispatch();
  const {
    isGettingCampaigns,
    campaigns: {
      campaign: Campaign = [],
      currentCount = 0,
      totalCampaign = 0,
      numOfPages = 0,
    } = {},
    refetch,
  } = useGetAllCampaigns();
  //console.log(Campaign);
  const Author = ({ image, name, description, campaign_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Job = ({ donation }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography variant="caption">
        <Link to={`#`}>{`${donation}`}</Link>
      </MDTypography>
    </MDBox>
  );
  const handleDelete = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedCampaignId) return;
    deleteCampaign(selectedCampaignId);
    setOpenConfirm(false);
    setSelectedCampaignId(null);
  };
  const rows = Campaign.map((campaign, i) => {
    const {
      campaign_id,
      status,
      title,
      description,
      donation_url,
      start_date,
      end_date,
      image_url,
    } = campaign;
    const payload = {
      title,
      description,
      donation_url,
      start_date,
      end_date,
      status,
    };
    const handleEdit = () => {
      dispatch(setUpdateCampaign(payload));
    };
    return {
      campaign: (
        <Author
          image={image_url}
          name={title}
          description={description}
          campaign_id={campaign_id}
        />
      ),
      donation: <Job donation={donation_url} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={status}
            color={status === "active" ? "success" : status === "completed" ? "info" : "warning"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      start_date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {convertToDateOnly(start_date)}
        </MDTypography>
      ),
      end_date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {convertToDateOnly(end_date)}
        </MDTypography>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {/* <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdatecampaign/${campaign_id}`}
          >
            Edit
          </Link> */}
          <Link to={`/createupdatecampaign/${campaign_id}`}>
            <IconButton
              color="warning"
              size="small"
              onClick={() => {
                handleEdit();
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
        </MDTypography>
      ),
      remove: (
        <>
          {/* <Link
            onClick={() => {
              deleteCampaign(campaign_id);
            }}
            to={`#`}
          >
            remove
          </Link> */}

          <IconButton
            color="error"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(campaign_id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    };
  });
  return {
    columns: [
      { Header: "campaign", accessor: "campaign", width: "45%", align: "left" },
      { Header: "donation", accessor: "donation", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "start_date", accessor: "start_date", align: "center" },
      { Header: "end_date", accessor: "end_date", align: "center" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    currentCount,
    totalCampaign,
    numOfPages,
    refetch,
    openConfirm,
    closeConfirm: () => setOpenConfirm(false),
    handleConfirmDelete,
  };
}

export function donorCampaignTableData() {
  const {
    isGettingDonorCampaigns,
    donorcampaigns: { campaigns: Campaign = [] } = {},
    donorRefetch,
  } = useGetAllDonorCampaigns();
  // console.log(Campaign);
  const Author = ({ image, name, description, campaign_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Job = ({ donation }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography variant="caption">
        <Link to={`#`}>{`${donation}`}</Link>
      </MDTypography>
    </MDBox>
  );
  const rows = Campaign.map((campaign, i) => {
    const {
      id,
      name,
      currency,
      goal_amount,
      type,
      formatted_goal_amount,
      formatted_total_raised,
      total_raised,
      donations_count,
      additional_questions = [],
    } = campaign;

    return {
      campaign: <Author image={LogoAsana} name={name} description={currency} campaign_id={id} />,
      goal_amount: <Job donation={formatted_goal_amount} />,
      total_raised: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {formatted_total_raised}
        </MDTypography>
      ),
      donations_count: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {donations_count}
        </MDTypography>
      ),
      type: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {type}
        </MDTypography>
      ),
      questions:
        additional_questions.length > 0 ? (
          <Tooltip
            title={
              <MDBox>
                {additional_questions.map((q, i) => (
                  <MDTypography key={i} variant="caption" display="block" color="inherit">
                    • {q.question}
                  </MDTypography>
                ))}
              </MDBox>
            }
            arrow
            placement="top"
          >
            <MDTypography variant="caption" color="info" sx={{ cursor: "pointer" }}>
              {additional_questions.length} question(s)
            </MDTypography>
          </Tooltip>
        ) : (
          <MDTypography variant="caption" color="text">
            —
          </MDTypography>
        ),
    };
  });
  return {
    columns: [
      { Header: "campaign", accessor: "campaign", width: "45%", align: "left" },
      { Header: "goal_amount", accessor: "goal_amount", align: "left" },
      { Header: "total_raised", accessor: "total_raised", align: "center" },
      { Header: "donations_count", accessor: "donations_count", align: "center" },
      { Header: "type", accessor: "type", align: "center" },
      { Header: "questions", accessor: "questions", align: "center" },
    ],
    rows,
    donorRefetch,
    isGettingDonorCampaigns,
  };
}
