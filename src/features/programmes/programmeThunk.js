import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./programmeSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useGetAllProgrammes = () => {
  const { pages } = useSelector((store) => store.programmes);
  const url = `programmes/?pages=${pages}`;
  //console.log(url);
  const {
    status: isGettingAllProgrammes,
    data: programmes,
    refetch,
  } = useQuery({
    queryKey: ["allprogrammes"],
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
  return { isGettingAllProgrammes, programmes, refetch };
};
export const useGetSinglProgramme = (id) => {
  // console.log(id);
  const {
    status: isGettingSingleProgramme,
    data: singleprogramme,
    refetch,
  } = useQuery({
    queryKey: ["singleprogramme"],
    queryFn: async () => {
      const { data } = await customFetch.get(`programmes/${id}`);
      return data;
    },
    enabled: false,
    onSuccess: (data) => {
      console.log("Query succeeded!", data);
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
      console.log(err);
    },
  });
  return { isGettingSingleProgramme, singleprogramme, refetch };
};
export const useCreateProgramme = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createProgramme, status: isCreatingProgramme } = useMutation({
    mutationFn: async (programmedetails) => {
      //console.log(programmedetails);
      const { data } = await customFetch.post("programmes", {
        ...programmedetails,
      });
      return data;
    },
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["allprogrammes"] });
      dispatch(handleReset());
      toast.success(message );
    },
    onError: (error) => {
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column ")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The product does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createProgramme, isCreatingProgramme };
};
export const useUpdateProgramme = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateProgramme, status: isUpdatingProgramme } = useMutation({
    mutationFn: async ({ programmedetails, id }) => {
      const { data } = await customFetch.patch(`programmes/${id}`, {
        ...programmedetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allprogrammes"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The product does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { updateProgramme, isUpdatingProgramme };
};
export const useUpdateProgrammeOutcome = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateProgrammeOutcome, status: isUpdatingProgrammeOutcome } = useMutation({
    mutationFn: async ({ outcomedetails, id }) => {
      const { data } = await customFetch.patch(`programmes/${id}/outcome`, {
        ...outcomedetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allprogrammes"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The product does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { updateProgrammeOutcome, isUpdatingProgrammeOutcome };
};
export const useDeleteProgramme = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProgramme, status: isDeletingProgramme } = useMutation({
    mutationFn: async (product_id) => {
      //console.log(product_id);
      const { data } = await customFetch.delete(`programmes/${product_id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allprogrammes"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteProgramme, isDeletingProgramme };
};

export const useUploadProgrammeImages = (id) => {
  // console.log(id);
  const queryClient = useQueryClient();
  const { mutate: uploadProgrammeImgs, status: isUploadingProgrammeImages } = useMutation({
    mutationFn: async (files) => {
      // console.log(files);
      const { data } = await customFetch.patch(`programmes/${id}/upload`, files);
      return data;
    },
    onSuccess: (res) => {
      // console.log(res);
      queryClient.invalidateQueries({ queryKey: ["allprogrammes"] });
      toast.success("Programme images uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { uploadProgrammeImgs, isUploadingProgrammeImages };
};
// export const updateProductColors = (color_id) => {
//   // console.log(color_id);
//   const queryClient = useQueryClient();
//   const { mutate: updateColor, status: isUpdatingColor } = useMutation({
//     mutationFn: async (colors) => {
//       const colorsObject = colors.reduce((acc, color, index) => {
//         acc[`color${index}`] = color;
//         return acc;
//       }, {});
//       // console.log(colorsObject);
//       const { data } = await customFetch.patch(
//         `products/updateproductcolor/${color_id}`,
//         colorsObject
//       );
//       return data;
//     },
//     onSuccess: (res) => {
//       // console.log(res);
//       queryClient.invalidateQueries({ queryKey: ["singleproduct"] });
//       toast.success("Product colors uploaded successfully");
//     },
//     onError: (error) => {
//       toast.error(error.response.data.msg);
//     },
//   });
//   return { updateColor, isUpdatingColor };
// };
