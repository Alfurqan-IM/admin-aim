import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { resetValues } from "./quranSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useGetAllQuran = () => {
  const { pages } = useSelector((store) => store.quran);
  // const numberFilterParams = [
  //   tip !== undefined ? `tip<=${tip}` : "",
  //   joining_date !== undefined ? `joining_date=${joining_date}` : "",
  // ];
  // const numberFilterString = numberFilterParams
  //   .filter(Boolean) // This will remove any empty values
  //   .join(" ");
  // const url = `swarmhunters/?pages=${pages}&fullname=${fullname}&emergency_contact_name=${emergency_contact_name}&emergency_contact=${
  //   emergency_contact === undefined ? "" : emergency_contact
  // }&phone=${
  //   phone === undefined ? "" : phone
  // }&employment_status=${employment_status}&assigned_supervisor=${assigned_supervisor}&numberFilter=${numberFilterString}&sort=${sort}`;
  // // console.log(url);
  const {
    status: isGettingAllQuran,
    data,
    refetch,
  } = useQuery({
    queryKey: ["allsurahs"],
    queryFn: async () => {
      const { data } = await customFetch.get(`surah/?pages=${pages}`);
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
  return { isGettingAllQuran, data, refetch };
};

// export const useSingleHunter = (id) => {
//   const url = `swarmhunters/${id}`;
//   const {
//     status: isGettingSingleHunter,
//     data: singleHunter,
//     refetch,
//   } = useQuery({
//     queryKey: ["singlehunter"],
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
//   return { isGettingSingleHunter, singleHunter, refetch };
// };
export const useCreateSurah = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createSurah, status: isCreatingSurah } = useMutation({
    mutationFn: async (surahDetails) => {
      // console.log(surahDetails, "here");
      const { data } = await customFetch.post("/surah", {
        ...surahDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allsurahs"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createSurah, isCreatingSurah };
};
export const useUpdateSurah = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateSurah, status: isUpdatingSurah } = useMutation({
    mutationFn: async ({ surahDetails, id }) => {
      // console.log(surahDetails, "here");
      const { data } = await customFetch.patch(`surah/${id}`, {
        ...surahDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allsurahs"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateSurah, isUpdatingSurah };
};
// export const useDeleteHunter = () => {
//   // const dispatch = useDispatch();
//   const queryClient = useQueryClient();
//   const { mutate: deleteHunter, status: isDeletingHunter } = useMutation({
//     mutationFn: async (id) => {
//       // console.log(id, "here");
//       const { data } = await customFetch.delete(`/swarmhunters/${id}`);
//       return data;
//     },
//     onSuccess: ({ msg }) => {
//       // console.log(msg);
//       queryClient.invalidateQueries({ queryKey: ["allhunters"] });
//       toast.error(msg);
//     },
//     onError: (error) => {
//       console.log(error);
//       toast.error(error.response?.data?.msg || "An error occurred.");
//     },
//   });
//   return { deleteHunter, isDeletingHunter };
// };
