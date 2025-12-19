import { useDispatch } from "react-redux";
//import { handelChange, handleDob } from "../features/campaigns/stationSlice";
import { handleDate, handleChangeEquip } from "../features/equuipments/equipmentSlice";
import { convertToDateOnly } from "../utils";
import {
  DateRegister,
  GenderInput,
  MultiLineInput,
  RangeSlider,
  UserInput,
} from "../components copy";
import { useSelector } from "react-redux";
import { handleChangeSupp, handleDateSupp } from "../features/supplies/suppliesSlice";
// import { handleDateProducts } from "features/products/productsSlice";
// import { handleChangeProducts } from "features/products/productsSlice";
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
    // const numericFields = [
    //   "supervisor_int",
    //   "supervisor_ext",
    //   "longitude",
    //   "latitude",
    //   "number_of_hive_boxes",
    // ];

    // let processedValue = numericFields.includes(name) ? Number(value) : value;
    // if (
    //   numericFields.includes(name) &&
    //   !["longitude", "latitude"].includes(name) &&
    //   processedValue < 1
    // ) {
    //   processedValue = 1;
    // }
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
    // {
    //   name: "supervisor_ext",
    //   TextField: (
    //     <UserInput
    //       name={"supervisor_ext"}
    //       value={supervisor_ext}
    //       type={"number"}
    //       handleChange={getInput}
    //     />
    //   ),
    // },
    // {
    //   name: "location",
    //   TextField: (
    //     <UserInput name={"location"} value={location} type={"name"} handleChange={getInput} />
    //   ),
    // },
    // {
    //   name: "longitude",
    //   TextField: (
    //     <UserInput name={"longitude"} value={longitude} type={"number"} handleChange={getInput} />
    //   ),
    // },
    // {
    //   name: "latitude",
    //   TextField: (
    //     <UserInput name={"latitude"} value={latitude} type={"number"} handleChange={getInput} />
    //   ),
    // },
    // {
    //   name: "station_size",
    //   TextField: (
    //     <GenderInput
    //       name={"station_size"}
    //       value={station_size}
    //       type={"text"}
    //       gender={["---", "small", "medium", "large"]}
    //       handleChange={getInput}
    //     />
    //   ),
    // },
    // {
    //   name: "number_of_hive_boxes",
    //   TextField: (
    //     <UserInput
    //       name={"number_of_hive_boxes"}
    //       value={number_of_hive_boxes}
    //       type={"number"}
    //       handleChange={getInput}
    //     />
    //   ),
    // },
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
    // {
    //   name: "notes",
    //   TextField: (
    //     <MultiLineInput name={"notes"} value={notes} type={"text"} handleChange={getInput} />
    //   ),
    // },
    // {
    //   name: "sort",
    //   TextField: (
    //     <GenderInput
    //       name={"sort"}
    //       value={sort}
    //       type={"text"}
    //       gender={["---", "A-Z", "Z-A", "high-low", "low-high"]}
    //       handleChange={getInput}
    //     />
    //   ),
    // },
  ];
  // const searchStations = station_details.filter((detail) =>
  //   [
  //     "station_name",
  //     "location",
  //     "station_size",
  //     "status",
  //     "supervisor_int",
  //     "supervisor_ext",
  //     "number_of_hive_boxes",
  //     "sort",
  //     //   "last_inspection_date",
  //     //   "next_inspection_date",
  //   ].includes(detail.name)
  // );
  return { campaign_details };
};

export const useEquipments = () => {
  const {
    tool_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    purchase_date,
    purchase_cost,
    currency,
    last_maintanace_date,
    next_maintanace_date,
    retired,
    note,
    sort,
  } = useSelector((store) => store.equipments);
  const dispatch = useDispatch();
  const getDob = (e) => {
    const { name, value } = e.target;
    const formattedDate = convertToDateOnly(value.toISOString());
    dispatch(handleDate({ name, date: formattedDate }));
  };
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["quantity", "purchase_cost"];
    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 1) {
      processedValue = 1;
    }

    dispatch(handleChangeEquip({ name, value: processedValue }));
  };
  const equipmentDetails = [
    {
      name: "tool_name",
      TextField: (
        <UserInput name={"tool_name"} value={tool_name} type={"name"} handleChange={getInput} />
      ),
    },
    {
      name: "quantity",
      TextField: (
        <UserInput name={"quantity"} value={quantity} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "purchase_cost",
      TextField: (
        <UserInput
          name={"purchase_cost"}
          value={purchase_cost}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "supplier",
      TextField: (
        <UserInput name={"supplier"} value={supplier} type={"name"} handleChange={getInput} />
      ),
    },
    {
      name: "currency",
      TextField: (
        <UserInput name={"currency"} value={currency} type={"name"} handleChange={getInput} />
      ),
    },
    {
      name: "category",
      TextField: (
        <GenderInput
          name={"category"}
          value={category}
          type={"text"}
          gender={["---", "beekeping", "carpentary", "processing"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "retired",
      TextField: (
        <GenderInput
          name={"retired"}
          value={retired}
          type={"text"}
          gender={["---", "retired", "not retired"]}
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
          gender={["---", "used", "new", "need repair"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "storage_location",
      TextField: (
        <GenderInput
          name={"storage_location"}
          value={storage_location}
          type={"text"}
          gender={["---", "warehouse", "apiary site", "factory"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "purchase_date",
      TextField: <DateRegister name={"purchase_date"} value={purchase_date} onChange={getDob} />,
    },
    {
      name: "last_maintanace_date",
      TextField: (
        <DateRegister
          name={"last_maintanace_date"}
          value={last_maintanace_date}
          onChange={getDob}
        />
      ),
    },
    {
      name: "next_maintanace_date",
      TextField: (
        <DateRegister
          name={"next_maintanace_date"}
          value={next_maintanace_date}
          onChange={getDob}
        />
      ),
    },
    {
      name: "note",
      TextField: (
        <MultiLineInput name={"note"} value={note} type={"text"} handleChange={getInput} />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "high-purchase-cost", "low-purchase-cost", "A-Z", "Z-A", "recent", "old"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  const searchEquipments = equipmentDetails.filter((detail) =>
    [
      "tool_name",
      "category",
      "status",
      "storage_location",
      "supplier",
      "currency",
      "retired",
      "quantity",
      "purchase_cost",
      "purchase_date",
      "sort",
    ].includes(detail.name)
  );

  return { equipmentDetails, searchEquipments };
};

export const useSuppliesInputs = () => {
  const {
    supply_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    minimum_stock_level,
    purchase_date,
    purchase_cost,
    sort,
  } = useSelector((store) => store.supplies);
  const dispatch = useDispatch();
  const getDob = (e) => {
    const { name, value } = e.target;
    const formattedDate = convertToDateOnly(value.toISOString());
    dispatch(handleDateSupp({ name, date: formattedDate }));
  };
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["quantity", "purchase_cost", " minimum_stock_level"];
    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 1) {
      processedValue = 1;
    }
    dispatch(handleChangeSupp({ name, value: processedValue }));
  };
  const suppliesDetails = [
    {
      name: "supply_name",
      TextField: (
        <UserInput name={"supply_name"} value={supply_name} type={"name"} handleChange={getInput} />
      ),
    },
    {
      name: "category",
      TextField: (
        <GenderInput
          name={"category"}
          value={category}
          type={"text"}
          gender={["---", "processing", "packaging"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "quantity",
      TextField: (
        <UserInput name={"quantity"} value={quantity} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "status",
      TextField: (
        <GenderInput
          name={"status"}
          value={status}
          type={"text"}
          gender={["---", "used", "new", "need repair"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "storage_location",
      TextField: (
        <GenderInput
          name={"storage_location"}
          value={storage_location}
          type={"text"}
          gender={["---", "warehouse", "factory"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "supplier",
      TextField: (
        <UserInput name={"supplier"} value={supplier} type={"name"} handleChange={getInput} />
      ),
    },
    {
      name: "purchase_cost",
      TextField: (
        <UserInput
          name={"purchase_cost"}
          value={purchase_cost}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "purchase_date",
      TextField: <DateRegister name={"purchase_date"} value={purchase_date} onChange={getDob} />,
    },
    {
      name: "minimum_stock_level",
      TextField: (
        <UserInput
          name={"minimum_stock_level"}
          value={minimum_stock_level}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "high-low", "low-high", "high-stock", "low-stock", "recent", "old"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  const searchSupplies = suppliesDetails.filter((detail) =>
    [
      "supply_name",
      "category",
      "quantity",
      "status",
      "storage_location",
      "supplier",
      "purchase_cost",
      "purchase_date",
    ].includes(detail.name)
  );
  return { suppliesDetails, searchSupplies };
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
