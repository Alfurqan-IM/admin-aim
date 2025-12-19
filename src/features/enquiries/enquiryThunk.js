import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { resetValues } from "./enquirySlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import { Pages } from "@mui/icons-material";

export const useGetAllEnquiries = () => {
  const { pages } = useSelector((store) => store.enquiries);
  // const numberFilterParams = [
  //   quality_rating !== undefined ? `quality_rating<=${quality_rating}` : "",
  //   quantity_collected !== undefined ? `quantity_collected<=${quantity_collected}` : "",
  //   harvest_date !== undefined ? `harvest_date=${harvest_date}` : "",
  // ];
  // const numberFilterString = numberFilterParams
  //   .filter(Boolean) // This will remove any empty values
  //   .join(" "); // Join the selected params with space for a clean format

  const url = `enquiries/?pages=${pages}`;
  // console.log(url);
  const {
    status: isGettingAllEnq,
    data: enquiries,
    refetch,
  } = useQuery({
    queryKey: ["allenquiries"],
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
  return { isGettingAllEnq, enquiries, refetch };
};

// export const useCreateHarvest = () => {
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
//   const { mutate: createHarvest, status: isCreatingHarvest } = useMutation({
//     mutationFn: async (harvestDetails) => {
//       // console.log(harvestDetails, "here");
//       const { data } = await customFetch.post("/honeyharvest", {
//         ...harvestDetails,
//       });
//       return data;
//     },
//     onSuccess: ({ msg }) => {
//       // console.log(msg);
//       queryClient.invalidateQueries({ queryKey: ["allhoneyharvest"] });
//       dispatch(resetValues());
//       toast.success(msg);
//     },
//     onError: (error) => {
//       const Msg = error.response?.data?.msg;
//       if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
//         toast.error("The chosen station_id does not exist !!!!");
//       } else {
//         toast.error(error.response?.data?.msg || "An error occurred.");
//       }
//     },
//   });
//   return { createHarvest, isCreatingHarvest };
// };
export const useUpdateEnq = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateEnq, status: isUpdatingEnq } = useMutation({
    mutationFn: async ({ status, id }) => {
      //console.log(status, id, "here");
      const { data } = await customFetch.patch(`/enquiries/${id}`, {
        status,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allenquiries"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateEnq, isUpdatingEnq };
};
export const useDeleteEnq = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteEnq, status: isDeletingEnq } = useMutation({
    mutationFn: async (id) => {
      // console.log(id, "here");
      const { data } = await customFetch.delete(`/enquiries/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allenquiries"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteEnq, isDeletingEnq };
};
