// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import React from "react";
import { useGetAllFeedbacks } from "features/feedbacks/feedbackThunk";
import { useDeleteFeedback } from "features/feedbacks/feedbackThunk";
// import { useServices } from "features/services/servicesThunk";
// import { useDeleteService } from "features/services/servicesThunk";
// import { setUpdateService } from "features/services/serviceSlice";

export default function feedbacksTableData() {
  const dispatch = useDispatch();
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
  const rows = FDBCK.map((feedback, i) => {
    const {
      feedback_id,
      user_id,
      subject,
      notes,
      users: { first_name, last_name, email },
    } = feedback;
    // const payload = {
    //   feedback_id,
    //   email,
    //   description,
    //   numOfTimesRendered,
    //   category,
    // };

    // const handleEdit = () => {
    //   dispatch(setUpdateService(payload));
    // };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete a feedback record permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteFeedback(feedback_id);
    };
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
      // update: (
      //   <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
      //     <Link
      //       onClick={() => {
      //         handleEdit();
      //       }}
      //       to={`/createupdateservice/${service_id}`}
      //     >
      //       Edit
      //     </Link>
      //   </MDTypography>
      // ),
      remove: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
          onClick={() => {
            handleDelete();
          }}
        >
          <Link>remove</Link>
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
  };
}
