import { useDispatch } from "react-redux";
import {
  DateRegister,
  GenderInput,
  MultiLineInput,
  UserInput,
} from "../components copy";
import { useSelector } from "react-redux";
import { handelChange } from "features/campaigns/campaignSlice";
import { handleDateCamp } from "features/campaigns/campaignSlice";
import { handleDateProgramme } from "features/programmes/programmeSlice";
import { handleChangeProgramme } from "features/programmes/programmeSlice";

export const useDashDetails_1 = () => {
  const dispatch = useDispatch();
  const { status, title, description, donation_url, start_date, end_date, sort } = useSelector(
    (store) => store.campaigns
  );
  const getInput = (e) => {
    const { name, value } = e.target;
    dispatch(handelChange({ name, value }));
  };

  const getDob = (e) => {
    const { name, value } = e.target;
    const isoDate = new Date(value).toISOString();
    dispatch(handleDateCamp({ name, date: isoDate }));
  };
  const campaign_details = [
    {
      name: "title",
      TextField: <UserInput name={"title"} value={title} type={"text"} handleChange={getInput} />,
    },
    {
      name: "donation_url",
      TextField: (
        <UserInput
          name={"donation_url"}
          value={donation_url}
          type={"url"}
          placeholder="https://example.com"
          handleChange={getInput}
        />
      ),
    },
    
    {
      name: "status",
      TextField: (
        <GenderInput
          name={"status"}
          value={status}
          type={"text"}
          gender={["---", "active", "completed", "pending"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "description",
      TextField: (
        <MultiLineInput
          name={"description"}
          value={description}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "start_date",
      TextField: <DateRegister name={"start_date"} value={start_date} onChange={getDob} />,
    },
    {
      name: "end_date",
      TextField: <DateRegister name={"end_date"} value={end_date} onChange={getDob} />,
    },
  ];
  return { campaign_details };
};

export const useProgrammesInputs = () => {
  const {
    title,
    description,
    heading,
    about,
    time,
    year,
    start_date,
    end_date,
    outcome1,
    outcome2,
    outcome3,
  } = useSelector((store) => store.programmes);
  const dispatch = useDispatch();
  const getDob = (e) => {
    const { name, value } = e.target;
    const isoDate = new Date(value).toISOString();
    dispatch(handleDateProgramme({ name, date: isoDate }));
  };
  const getInput = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    // const numericFields = ["quantity", "price", "total_in_stock"];
    // let processedValue = numericFields.includes(name) ? Number(value) : value;
    // if (numericFields.includes(name) && processedValue < 1) {
    //   processedValue = 1;
    // }
    dispatch(handleChangeProgramme({ name, value }));
  };
  const programmeInputs = [
    {
      name: "title",
      TextField: <UserInput name={"title"} value={title} type={"name"} handleChange={getInput} />,
    },
    // {
    //   name: "product_type",
    //   TextField: (
    //     <GenderInput
    //       name={"product_type"}
    //       value={product_type}
    //       type={"text"}
    //       gender={["---", "honey", "wax", "propolis", "royal jelly", "venom"]}
    //       handleChange={getInput}
    //     />
    //   ),
    // },
    {
      name: "description",
      TextField: (
        <MultiLineInput
          name={"description"}
          value={description}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "heading",
      TextField: (
        <UserInput name={"heading"} value={heading} type={"text"} handleChange={getInput} />
      ),
    },
    {
      name: "about",
      TextField: (
        <MultiLineInput name={"about"} value={about} type={"text"} handleChange={getInput} />
      ),
    },
    {
      name: "time",
      TextField: <UserInput name={"time"} value={time} type={"name"} handleChange={getInput} />,
    },
    {
      name: "year",
      TextField: <UserInput name={"year"} value={year} type={"number"} handleChange={getInput} />,
    },
    {
      name: "start_date",
      TextField: <DateRegister name={"start_date"} value={start_date} onChange={getDob} />,
    },
    {
      name: "end_date",
      TextField: <DateRegister name={"end_date"} value={end_date} onChange={getDob} />,
    },
    // {
    //   name: "packaging_type",
    //   TextField: (
    //     <UserInput
    //       name={"packaging_type"}
    //       value={packaging_type}
    //       type={"name"}
    //       handleChange={getInput}
    //     />
    //   ),
    // },

    // {
    //   name: "price",
    //   TextField: <UserInput name={"price"} value={price} type={"number"} handleChange={getInput} />,
    // },
    // {
    //   name: "priceRangePP",
    //   TextField: (
    //     <RangeSlider
    //       name={"priceRangePP"}
    //       value={priceRangePP}
    //       min={1000}
    //       max={100000}
    //       step={2000}
    //     />
    //   ),
    // },
    // {
    //   name: "sort",
    //   TextField: (
    //     <GenderInput
    //       name={"sort"}
    //       value={sort}
    //       type={"text"}
    //       gender={[
    //         "---",
    //         "high-low",
    //         "low-high",
    //         "high-rating",
    //         "low-rating",
    //         "high-review",
    //         "low-review",
    //         "high-sell",
    //         "low-sell",
    //       ]}
    //       handleChange={getInput}
    //     />
    //   ),
    // },
  ];
  const programmeOutcomeInp = [
    {
      name: "outcome1",
      TextField: (
        <UserInput name={"outcome1"} value={outcome1} type={"text"} handleChange={getInput} />
      ),
    },
    {
      name: "outcome2",
      TextField: (
        <UserInput name={"outcome2"} value={outcome2} type={"text"} handleChange={getInput} />
      ),
    },
    {
      name: "outcome3",
      TextField: (
        <UserInput name={"outcome3"} value={outcome3} type={"text"} handleChange={getInput} />
      ),
    },
  ];
  return { programmeInputs, programmeOutcomeInp };
};
