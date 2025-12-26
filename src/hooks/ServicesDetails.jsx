import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DateRegister, UserInput } from "../components copy";
import { handleChangeDonation } from "features/donations/donationSlice";
import { handleDateDonation } from "features/donations/donationSlice";

export const useDonationInputs = () => {
  const dispatch = useDispatch();
  const {
    page,
    limit,
    per_page,
    date_from,
    date_to,
    email,
    campaign_name,
    donor_id,
    id,
    first_name,
    last_name,
    campaign_id,
    amount_min,
    amount_max,
  } = useSelector((store) => store.donations);
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["campaign_id", "donor_id"];

    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangeDonation({ name, value: processedValue }));
  };
  const getDate = (e) => {
    const { name, value } = e.target;
    const dateOnly = new Date(value).toISOString().split("T")[0];
    //const isoDate = new Date(value).toISOString();
    dispatch(handleDateDonation({ name, date: dateOnly }));
  };
  const donationInputs = [
    {
      name: "campaign_id",
      TextField: (
        <UserInput
          name={"campaign_id"}
          value={campaign_id}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "donor_id",
      TextField: (
        <UserInput name={"donor_id"} value={donor_id} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "campaign_name",
      TextField: (
        <UserInput
          name={"campaign_name"}
          value={campaign_name}
          type={"name"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "first_name",
      TextField: (
        <UserInput name={"first_name"} value={first_name} type={"text"} handleChange={getInput} />
      ),
    },
    {
      name: "last_name",
      TextField: (
        <UserInput name={"last_name"} value={last_name} type={"text"} handleChange={getInput} />
      ),
    },
    {
      name: "email",
      TextField: <UserInput name={"email"} value={email} type={"text"} handleChange={getInput} />,
    },
    {
      name: "date_from",
      TextField: <DateRegister name={"date_from"} value={date_from} onChange={getDate} />,
    },
    {
      name: "date_to",
      TextField: <DateRegister name={"date_to"} value={date_to} onChange={getDate} />,
    },
    {
      name: "amount_min",
      TextField: (
        <UserInput name={"amount_min"} value={amount_min} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "amount_max",
      TextField: (
        <UserInput name={"amount_max"} value={amount_max} type={"number"} handleChange={getInput} />
      ),
    },
  ];
  return { donationInputs };
};
