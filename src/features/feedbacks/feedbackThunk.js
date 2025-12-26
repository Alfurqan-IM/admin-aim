import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useGetAllFeedbacks = () => {
  const { pages, sort } = useSelector((store) => store.feedbacks);
  const url = `feedbacks/?pages=${pages}`;
  // console.log(url);
  const {
    status: isGettingAllFeedbacks,
    data: feedbacks,
    refetch,
  } = useQuery({
    queryKey: ["allfeedbacks"],
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
  return { isGettingAllFeedbacks, feedbacks, refetch };
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteFeedback, status: isDeletingFeedback } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.delete(`feedbacks/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allfeedbacks"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteFeedback, isDeletingFeedback };
};
