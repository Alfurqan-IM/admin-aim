// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import React, { useState } from "react";
import { useGetAllFeedbacks } from "features/feedbacks/feedbackThunk";
import { useDeleteFeedback } from "features/feedbacks/feedbackThunk";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function feedbacksTableData() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const {
    isGettingAllFeedbacks,
    feedbacks: { feedback: FDBCK = [], totalFeedback = 0, count = 0, numOfPages = 0 } = {},
    refetch,
  } = useGetAllFeedbacks();

  const { deleteFeedback } = useDeleteFeedback();
  const Author = ({ image, name, email, user_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`${user_id} ${email}`}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
   const handleDelete = (feedbackId) => {
     setSelectedFeedbackId(feedbackId);
     setOpenConfirm(true);
   };

   const handleConfirmDelete = () => {
     if (!selectedFeedbackId) return;
     deleteFeedback(selectedFeedbackId);
     setOpenConfirm(false);
     setSelectedFeedbackId(null);
   };
  const rows = FDBCK.map((feedback, i) => {
    const {
      feedback_id,
      user_id,
      subject,
      notes,
      users: { first_name, last_name, email },
    } = feedback;
    return {
      users: (
        <Author
          image={logoSlack}
          name={`${first_name} ${last_name}`}
          email={email}
          user_id={user_id}
        />
      ),

      subject: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {subject}
        </MDTypography>
      ),
      notes: (
        <MDTypography
          title={notes}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {notes.length > 20 ? `${notes.slice(0, 20)}...` : notes}
        </MDTypography>
      ),
      remove: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <IconButton
            color="error"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(feedback_id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "users", accessor: "users", width: "45%", align: "left" },
      { Header: "subject", accessor: "subject", align: "left" },
      { Header: "notes", accessor: "notes", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    numOfPages,
    refetch,
    count,
    isGettingAllFeedbacks,
    totalFeedback,
    openConfirm,
    closeConfirm: () => setOpenConfirm(false),
    handleConfirmDelete,
   
  };
}
