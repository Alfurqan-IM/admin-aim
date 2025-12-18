import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetValues } from "./campaignSlice";

export const useGetAllCampaigns = () => {
  const { pages, sort } = useSelector((store) => store.campaigns);
  const url = `campaigns/?pages=${pages}`;
  // console.log(url);
  const {
    status: isGettingCampaigns,
    data: campaigns,
    refetch,
  } = useQuery({
    queryKey: ["allcampaigns"],
    queryFn: async () => {
      const { data } = await customFetch.get(url);
      //console.log(data);
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
  return { isGettingCampaigns, campaigns, refetch };
};
export const useGetAllDonorCampaigns = () => {
  //const { pages } = useSelector((store) => store.campaigns);
  const url = `campaigns/donorCampaigns`;
  //?pages=${pages}
  // console.log(url);
  const {
    status: isGettingDonorCampaigns,
    data: donorcampaigns,
    refetch: donorRefetch,
  } = useQuery({
    queryKey: ["alldonorcampaigns"],
    queryFn: async () => {
      const { data } = await customFetch.get(url);
      return data;
    },
    onSuccess: ( data ) => {
       console.log(data, "hitted");
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
      console.log(err);
    },
  });
  return { isGettingDonorCampaigns, donorcampaigns, donorRefetch };
};
// export const useSingleStation = (id) => {
//   // const { pages } = useSelector((store) => store.campaigns);
//   const url = `apiarycampaigns/${id}`;
//   // console.log(url);
//   const {
//     status: isGettingSingleStation,
//     data: singleStation,
//     refetch,
//   } = useQuery({
//     queryKey: ["singlestation"],
//     queryFn: async () => {
//       const { data } = await customFetch.get(url);
//       return data;
//     },
//     onSuccess: ({ data }) => {
//       console.log("Query succeeded!", data);
//     },
//     onError: (err) => {
//       toast.error(err.response.data.msg);
//       console.log(err);
//     },
//   });
//   return { isGettingSingleStation, singleStation, refetch };
// };

export const useCreateCampaign = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createCampaign, status: isCreatingCampaign } = useMutation({
    mutationFn: async (campaignDetails) => {
      // console.log(campaignDetails, "here");
      const { data } = await customFetch.post("campaigns", {
        ...campaignDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allcampaigns"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The chosen supervisor_ext or supervisor_int does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createCampaign, isCreatingCampaign };
};
export const useUpdateCampaign = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateCampaign, status: isUpdatingCampaign } = useMutation({
    mutationFn: async ({ campaignDetails, id }) => {
      const { data } = await customFetch.patch(`campaigns/${id}`, {
        ...campaignDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allcampaigns"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The chosen supervisor_ext or supervisor_int does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { updateCampaign, isUpdatingCampaign };
};
export const useDeleteCampaign = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteCampaign, status: isDeletingCampaign } = useMutation({
    mutationFn: async (id) => {
      //console.log(id, "here");
      const { data } = await customFetch.delete(`campaigns/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allcampaigns"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteCampaign, isDeletingCampaign };
};

export const useUploadCampaignImages = (id) => {
  // console.log(id);
  const queryClient = useQueryClient();
  const { mutate: uploadCampaignImgs, status: isUploadingCampaignImages } = useMutation({
    mutationFn: async (avatar) => {
      // console.log(avatar);
      const { data } = await customFetch.patch(`campaigns/${id}/upload`, avatar);
      return data;
    },
    onSuccess: (res) => {
      // console.log(res);
      queryClient.invalidateQueries({ queryKey: ["allcampaigns"] });
      toast.success("Avatar uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { uploadCampaignImgs, isUploadingCampaignImages };
};
