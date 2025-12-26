import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { toast } from "react-toastify";
import { handleReset } from "./bannerSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const useAllBanners = () => {
  const { pages} = useSelector((store) => store.banners);
  const url = `banners/?pages=${pages}`;
 // console.log(url);
  const {
    status: isGettingAllbanners,
    data: banners,
    refetch,
  } = useQuery({
    queryKey: ["allbanners"],
    queryFn: async () => {
      const { data } = await customFetch.get(url);
      // console.log(data)
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
  return { isGettingAllbanners, banners, refetch };
};

export const useCreatebanner = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createbanner, status: isCreatingbanner } = useMutation({
    mutationFn: async (bannerPayload) => {
      // console.log(bannerPayload, "here");
      const { data } = await customFetch.post("banners", { ...bannerPayload });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allbanners"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column")) {
        toast.error("The department || employment type/status fields cannot be empty !!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
      console.log(error);
    },
  });
  return { createbanner, isCreatingbanner };
};
export const useUpdatebanner = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updatebanner, status: isUpdatingbanner } = useMutation({
    mutationFn: async ({ bannerPayload, id }) => {
      console.log(bannerPayload, "here");
      const { data } = await customFetch.patch(`banners/${id}`, {
        ...bannerPayload,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allbanners"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column")) {
        toast.error("The department || banloyment type/status fields cannot be empty !!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { updatebanner, isUpdatingbanner };
};
export const useDeletebanner = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deletebanner, status: isDeletingbanner } = useMutation({
    mutationFn: async (id) => {
      //console.log(id, "here");
      const { data } = await customFetch.delete(`banners/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allbanners"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deletebanner, isDeletingbanner };
};

export const useUploadbannerImages = (id) => {
  // console.log(id);
  const queryClient = useQueryClient();
  const { mutate: uploadbannerImgs, status: isUploadingbannerImages } = useMutation({
    mutationFn: async (avatar) => {
      // console.log(avatar);
      const { data } = await customFetch.patch(`banners/${id}/upload`, avatar);
      return data;
    },
    onSuccess: (res) => {
      // console.log(res);
      queryClient.invalidateQueries({ queryKey: ["allbanners"] });
      toast.success("Avatar uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { uploadbannerImgs, isUploadingbannerImages };
};
