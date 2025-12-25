import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./registerationSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
//import { toast } from "react-toastify/dist";

export const useGetAllReg = () => {
  const { pages } = useSelector((store) => store.registerations);
  const url = `registerations/?pages=${pages}`;
  // console.log(url);
  const {
    status: isGettingAllReg,
    data,
    refetch,
  } = useQuery({
    queryKey: ["allregisterations"],
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
  return { isGettingAllReg, data, refetch };
};

// export const useSingleHive = (id) => {
//   // const { pages } = useSelector((store) => store.stations);
//   const url = `hives/${id}`;
//   // console.log(url);
//   const {
//     status: isGettingSingleHive,
//     data: singleHive,
//     refetch,
//   } = useQuery({
//     queryKey: ["singlehive"],
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
//   return { isGettingSingleHive, singleHive, refetch };
// };
// export const useCreateHive = () => {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
//   const { mutate: createHive, status: isCreatingHive } = useMutation({
//     mutationFn: async (hiveDetails) => {
//       // console.log(nokDetails, "here");
//       const { data } = await customFetch.post("hives", {
//         ...hiveDetails,
//       });
//       return data;
//     },
//     onSuccess: ({ msg }) => {
//       // console.log(msg);
//       queryClient.invalidateQueries({ queryKey: ["allhives"] });
//       dispatch(handleReset());
//       toast.success(msg);
//     },
//     onError: (error) => {
//       const Msg = error.response?.data?.msg;
//       if (Msg.includes("Data truncated for column ")) {
//         toast.error("you have not select one or more fields !!!!");
//       } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
//         toast.error("The assigned_hunter does not exist !!!!");
//       } else {
//         toast.error(error.response?.data?.msg || "An error occurred.");
//       }
//     },
//   });
//   return { createHive, isCreatingHive };
// };
export const useUpdateReg = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateReg, status: isUpdatingReg } = useMutation({
    mutationFn: async ({ regDetails, id }) => {
      // console.log(regDetails, "here");
      const { data } = await customFetch.patch(`registerations/${id}`, {
        ...regDetails,
      });
      return data;
    },
    onSuccess: (msg) => {
      console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allregisterations"] });
      dispatch(handleReset());
      //toast.success(`Registeration for user ${msg.user_id} successfully updated`);
      toast.error(`successfully updated`);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column ")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The assigned_hunter does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { updateReg, isUpdatingReg };
};
export const useDeleteReg = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteReg, status: isDeletingReg } = useMutation({
    mutationFn: async (id) => {
      // console.log(id, "here");
      const { data } = await customFetch.delete(`registerations/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allregisterations"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteReg, isDeletingReg };
};
