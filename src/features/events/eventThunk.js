import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./eventSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useAllEvent = () => {
  const { pages } = useSelector((store) => store.events);
  const url = `events/?pages=${pages}`;
  // console.log(url);
  const {
    status: isGettingAllEvents,
    data: events,
    refetch,
  } = useQuery({
    queryKey: ["allevents"],
    queryFn: async () => {
      const { data } = await customFetch.get(url);
      return data;
    },
    onSuccess: ({ data }) => {
      console.log("Query succeeded!", data);
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
      console.log(err);
    },
  });
  return { isGettingAllEvents, events, refetch };
};

export const useCreateEvent = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createEvent, status: isCreatingEvent } = useMutation({
    mutationFn: async (eventDetails) => {
       console.log(eventDetails, "here");
      const { data } = await customFetch.post("events", {
        ...eventDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allevents"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { createEvent, isCreatingEvent };
};
export const useUpdateEvent = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateEvent, status: isUpdatingEvent } = useMutation({
    mutationFn: async ({ eventDetails, id }) => {
      // console.log(eventDetails, "here");
      const { data } = await customFetch.patch(`events/${id}`, {
        ...eventDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allevents"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateEvent, isUpdatingEvent };
};
export const useDeleteEvent = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteEvent, status: isDeletingEvent } = useMutation({
    mutationFn: async (event_id) => {
      //console.log(id, "here");
      const { data } = await customFetch.delete(`events/${event_id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allevents"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteEvent, isDeletingEvent };
};

export const useUploadEventImages = (id) => {
  // console.log(id);
  const queryClient = useQueryClient();
  const { mutate: uploadEventImgs, status: isUploadingEventImages } = useMutation({
    mutationFn: async (avatar) => {
      // console.log(avatar);
      const { data } = await customFetch.patch(`events/${id}/upload`, avatar);
      return data;
    },
    onSuccess: (res) => {
      // console.log(res);
      queryClient.invalidateQueries({ queryKey: ["allevents"] });
      toast.success("Event Flyer uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { uploadEventImgs, isUploadingEventImages };
};
