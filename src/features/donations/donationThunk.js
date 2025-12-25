import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./donationSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useGetAllDonations = () => {
  const {
    email,
    date_from,
    date_to,
    campaign_name,
    campaign_id,
    id,
    first_name,
    last_name,
    donor_id,
    amount_min,
    amount_max,
    limit,
    page,
  } = useSelector((store) => store.donations);

  const url = `donations/?donor_id=${donor_id}&email=${email}&page=${page}&limit=${limit}
  &date_from=${date_from}&date_to=${date_to}&amount_min=${amount_min}
  &amount_max=${amount_max}&first_name=${first_name}
  &last_name=${last_name}&campaign_name=${campaign_name}&campaign_id=${campaign_id}`;
  //const url2 = "donations";
  //console.log(url);
  const {
    status: isGettingAllDonations,
    data,
    refetch,
  } = useQuery({
    queryKey: ["alldonations"],
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
  return { isGettingAllDonations, data, refetch };
};

// export const useCreateProvision = () => {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
//   const { mutate: createProvision, status: isCreatingProvision } = useMutation({
//     mutationFn: async (provisionDetails) => {
//       console.log(provisionDetails);
//       const { data } = await customFetch.post("supplyprovisionitems", {
//         ...provisionDetails,
//       });
//       return data;
//     },
//     onSuccess: ({ msg }) => {
//       queryClient.invalidateQueries({ queryKey: ["allsupplyprovisions"] });
//       dispatch(handleReset());
//       toast.success(msg);
//     },
//     onError: (error) => {
//       console.log();
//       const Msg = error.response?.data?.msg;
//       if (Msg.includes("Data truncated for column ")) {
//         toast.error("you have not select one or more fields !!!!");
//       } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
//         toast.error("The service_id does not exist !!!!");
//       } else {
//         toast.error(error.response?.data?.msg || "An error occurred.");
//       }
//     },
//   });
//   return { createProvision, isCreatingProvision };
// };
// export const useUpdateProvision = () => {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
//   const { mutate: updateProvision, status: isUpdatingProvision } = useMutation({
//     mutationFn: async ({ provisionDetails, id }) => {
//       const { data } = await customFetch.patch(`supplyprovisionitems/${id}`, {
//         ...provisionDetails,
//       });
//       return data;
//     },
//     onSuccess: ({ msg }) => {
//       queryClient.invalidateQueries({ queryKey: ["allsupplyprovisions"] });
//       dispatch(handleReset());
//       toast.success(msg);
//     },
//     onError: (error) => {
//       console.log(error);
//       const Msg = error.response?.data?.msg;
//       if (Msg.includes("Data truncated for column")) {
//         toast.error("you have not select one or more fields !!!!");
//       } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
//         toast.error("The service_id does not exist !!!!");
//       } else {
//         toast.error(error.response?.data?.msg || "An error occurred.");
//       }
//     },
//   });
//   return { updateProvision, isUpdatingProvision };
// };
// export const useDeleteProvision = () => {
//   const queryClient = useQueryClient();
//   const { mutate: deleteProvision, status: isDeletingProvision } = useMutation({
//     mutationFn: async (id) => {
//       const { data } = await customFetch.delete(`supplyprovisionitems/${id}`);
//       return data;
//     },
//     onSuccess: ({ msg }) => {
//       queryClient.invalidateQueries({ queryKey: ["allsupplyprovisions"] });
//       toast.error(msg);
//     },
//     onError: (error) => {
//       console.log(error);
//       toast.error(error.response?.data?.msg || "An error occurred.");
//     },
//   });
//   return { deleteProvision, isDeletingProvision };
// };
