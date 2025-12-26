import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils";
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

