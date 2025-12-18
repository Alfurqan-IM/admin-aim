// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
// import { useStations } from "features/stations/stationsThunk";
// import { setUpdateStation } from "features/stations/stationSlice";
//import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import { useDeleteEvent } from "features/events/eventThunk";
import { useAllEvent } from "features/events/eventThunk";
import { setUpdateEvent } from "features/events/eventSlice";
// import { useAllNok } from "features/nok/nokThunk";
// import { useDeleteNok } from "features/nok/nokThunk";
// import { setUpdateNok } from "features/nok/nokSlice";
export default function eventsTableData() {
  const { deleteEvent } = useDeleteEvent();
  const dispatch = useDispatch();
  const {
    isGettingAllEvents,
    refetch,
    events: { event: Events = [], currentCount = 0, numOfPages, totalEvent = 0 } = {},
  } = useAllEvent();
  const Author = ({ image, name, description, event_id, index }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography title={index} display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const rows = Events.map((event, i) => {
    const { event_id, image_url, title, status, event_url, description } = event;
    const payload = {
      event_id,
      image_url,
      title,
      status,
      event_url,
      description,
    };
    const handleEdit = () => {
      dispatch(setUpdateEvent(payload));
    };
    const handleDelete = () => {
      const confirmation = window.confirm(
        "You are about to Delete an next of kin records permanently, ARE YOU SURE?"
      );
      if (!confirmation) return;
      deleteEvent(event_id);
    };
    const MAX_LENGTH = 40;
    const formatDescription = (text) =>
      text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}…` : text;

    return {
      events: (
        <Author
          image={image_url}
          name={title}
          description={formatDescription(description)}
          event_id={event_id}
          index={description}
        />
      ),
      event_url: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <Link to={event_url}>{event_url}</Link>
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={status}
            color={status === "ongoing" ? "success" : status === "completed" ? "info" : "warning"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      update: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleEdit();
            }}
            to={`/createupdateevent/${event_id}`}
          >
            Edit
          </Link>
        </MDTypography>
      ),
      remove: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          <Link
            onClick={() => {
              handleDelete();
            }}
          >
            remove
          </Link>
        </MDTypography>
      ),
    };
  });
  return {
    columns: [
      { Header: "events", accessor: "events", width: "45%", align: "left" },
      { Header: "event_url", accessor: "event_url", width: "45%", align: "left" },
      { Header: "status", accessor: "status", align: "left" },
      { Header: "update", accessor: "update", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: rows,
    isGettingAllEvents,
    numOfPages,
    totalEvent,
    currentCount,
    refetch,
  };
}
