import React from "react";
import {
  DateRegister,
  GenderInput,
  // InputFileUpload,
  MultiLineInput,
  PasswordInput,
  PhoneInputs,
  RangeSlider,
  Subscribe,
  UserInput,
} from "../components copy";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handelChange, handlePhoneInput } from "../features/users/userSlice";
// import {
//   handelChangeEmp,
//   handleDob,
//   handlePhoneInputEmp,
// } from "../features/banners/employeesSlice";
import { convertToDateOnly } from "../utils";
import { handelChangeBan } from "features/banners/bannerSlice";
import { handleDate } from "features/banners/bannerSlice";
// import { useUploadEmployeeImages } from "../features/employees/employeesThunk";
// import RangeSlider from "../components/TextField";
// import { InputFileUpload } from "../components/TextField";

const useRegister = () => {
  const {
    email,
    first_name,
    last_name,
    password,
    address,
    phone,
    gender,
    notification,
    //..................search params
    gendersearch,
    isVerified,
    blacklisted,
    subscribed,
    sort,
  } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const [validationError, setValidationError] = React.useState(false);
  const validateEmail = (email) => {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getInput = (e) => {
    const { name } = e.target;
    let value;
    value = e.target.value;
    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setValidationError(!isValidEmail);
    }
    if (name === "notification") {
      value = e.target.checked;
      return dispatch(handelChange({ name, value }));
    }
    dispatch(handelChange({ name, value }));
  };

  const getPhoneNumber = (phone) => {
    dispatch(handlePhoneInput(phone));
  };

  const status = {
    name: "email",
    TextField: (
      <UserInput
        name={"email"}
        value={email}
        type={"email"}
        handleChange={getInput}
        validationError={validationError}
        message={"Please provide a valid email address"}
      />
    ),
  };

  const userDetails = [
    {
      name: "last_name",
      TextField: (
        <UserInput name={"last_name"} value={last_name} type={"text"} handleChange={getInput} />
      ),
    },

    {
      name: "password",
      TextField: (
        <PasswordInput
          name={"password"}
          value={password}
          type={"password"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "address",
      TextField: (
        <MultiLineInput name={"address"} value={address} type={"text"} handleChange={getInput} />
      ),
    },
    {
      name: "gender",
      TextField: (
        <GenderInput
          name={"gender"}
          value={gender}
          type={"text"}
          gender={["male", "female"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "subscribe",
      TextField: (
        <Subscribe
          name={"notification"}
          value={notification}
          type={"checkbox"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "phone",
      TextField: (
        <PhoneInputs name={"phone"} value={phone} type={"tel"} handleChange={getPhoneNumber} />
      ),
    },
  ];

  const searchUsers = [
    {
      name: "last_name",
      TextField: (
        <UserInput name={"last_name"} value={last_name} type={"text"} handleChange={getInput} />
      ),
    },
    {
      name: "email",
      TextField: (
        <UserInput
          name={"email"}
          value={email}
          type={"email"}
          handleChange={getInput}
          validationError={validationError}
          message={"Please provide a valid email address"}
        />
      ),
    },
    {
      name: "phone",
      TextField: (
        <PhoneInputs name={"phone"} value={phone} type={"tel"} handleChange={getPhoneNumber} />
      ),
    },
    {
      name: "gender",
      TextField: (
        <GenderInput
          name={"gendersearch"}
          value={gendersearch}
          type={"text"}
          gender={["---", "male", "female"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "verified",
      TextField: (
        <GenderInput
          name={"isVerified"}
          value={isVerified}
          type={"text"}
          gender={["---", "verified", "not verified"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "blacklisted",
      TextField: (
        <GenderInput
          name={"blacklisted"}
          value={blacklisted}
          type={"text"}
          gender={["---", "blacklisted", "not blacklisted"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "subscribed",
      TextField: (
        <GenderInput
          name={"subscribed"}
          value={subscribed}
          type={"text"}
          gender={["---", "subscribed", "not subscribed"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "sorted",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["male", "female", "A-Z", "Z-A", "admin"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { status, userDetails, searchUsers };
};

export default useRegister;

export const useBanner = () => {
  const { title, description, time, year, start_date, end_date, isEdit, pages, sort } = useSelector(
    (store) => store.banners
  );
  const dispatch = useDispatch();
  const [validationError, setValidationError] = React.useState(false);
  const validateEmail = (email) => {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const getInput = (e) => {
    const { name } = e.target;
    let value;
    value = e.target.value;
    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setValidationError(!isValidEmail);
      // if (!isValidEmail) return;
    }
    if (name === "salary") {
      value = Number(e.target.value);
      return dispatch(handelChangeBan({ name, value }));
    }
    dispatch(handelChangeBan({ name, value }));
  };
  // const getPhoneNumber = (phone) => {
  //   dispatch(handlePhoneInputEmp(phone));
  // };

  const getDate = (e) => {
    const { name, value } = e.target;
    const isoDate = new Date(value).toISOString();
    dispatch(handleDate({ name, date: isoDate }));
  };

  const bannerDetails = [
    {
      name: "title",
      TextField: <UserInput name={"title"} value={title} type={"text"} handleChange={getInput} />,
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
    // {
    //   name: "gender",
    //   TextField: (
    //     <GenderInput
    //       name={"gender"}
    //       value={gender}
    //       type={"text"}
    //       gender={["male", "female"]}
    //       handleChange={getInput}
    //     />
    //   ),
    // },
    // {
    //   name: "phone",
    //   TextField: (
    //     <PhoneInputs name={"phone"} value={phone} type={"tel"} handleChange={getPhoneNumber} />
    //   ),
    // },
    {
      name: "time",
      TextField: (
        <UserInput
          name={"time"}
          value={time}
          type={"text"}
          handleChange={getInput}
          placeholder="4 hours per week"
        />
      ),
    },
    {
      name: "year",
      TextField: <UserInput name={"year"} value={year} type={"number"} handleChange={getInput} />,
    },
    {
      name: "start_date",
      TextField: <DateRegister name={"start_date"} value={start_date} onChange={getDate} />,
    },
    {
      name: "end_date",
      TextField: <DateRegister name={"end_date"} value={end_date} onChange={getDate} />,
    },
    // {
    //   name: "email",
    //   TextField: (
    //     <UserInput
    //       name={"email"}
    //       value={email}
    //       type={"email"}
    //       handleChange={getInput}
    //       validationError={validationError}
    //       message={"Please provide a valid email address"}
    //     />
    //   ),
    // },
    // {
    //   name: "address",
    //   TextField: (
    //     <MultiLineInput name={"address"} value={address} type={"text"} handleChange={getInput} />
    //   ),
    // },
    // {
    //   name: "role",
    //   TextField: <UserInput name={"role"} value={role} type={"text"} handleChange={getInput} />,
    // },
    // {
    //   name: "department",
    //   TextField: (
    //     <GenderInput
    //       name={"department"}
    //       value={department}
    //       type={"text"}
    //       gender={["---", "beekeeping", "operation", "administration"]}
    //       handleChange={getInput}
    //     />
    //   ),
    // },
    // {
    //   name: "salary",
    //   TextField: <UserInput name={"salary"} value={salary} type={"text"} handleChange={getInput} />,
    // },
    // {
    //   name: "employment_status",
    //   TextField: (
    //     <GenderInput
    //       name={"employment_status"}
    //       value={employment_status}
    //       type={"text"}
    //       gender={["---", "active", "inactive", "terminated"]}
    //       handleChange={getInput}
    //     />
    //   ),
    // },
    // {
    //   name: "employment_type",
    //   TextField: (
    //     <GenderInput
    //       name={"employment_type"}
    //       value={employment_type}
    //       type={"text"}
    //       gender={["---", "full staff", "contract staff", "station supervisor(ext)"]}
    //       handleChange={getInput}
    //     />
    //   ),
    // },
    // {
    //   name: "skill",
    //   TextField: (
    //     <MultiLineInput name={"skill"} value={skill} type={"text"} handleChange={getInput} />
    //   ),
    // },
    // {
    //   name: "notes",
    //   TextField: (
    //     <MultiLineInput name={"notes"} value={notes} type={"text"} handleChange={getInput} />
    //   ),
    // },
  ];
  // Filtering the relevant fields
  // const searchEmployees = bannerDetails.filter((detail) =>
  //   ["first_name", "last_name", "role", "dob", "joining_date"].includes(detail.name)
  // );

  // const remainingFields = [
  //   {
  //     name: "salaryRange",
  //     TextField: (
  //       <RangeSlider name={"salaryRange"} value={salaryRange} min={1000} max={100000} step={1000} />
  //     ),
  //   },

  //   {
  //     name: "employment_status",
  //     TextField: (
  //       <GenderInput
  //         name={"employment_status"}
  //         value={employment_status}
  //         type={"text"}
  //         gender={["---", "active", "inactive", "terminated"]}
  //         handleChange={getInput}
  //       />
  //     ),
  //   },
  //   {
  //     name: "employment_type",
  //     TextField: (
  //       <GenderInput
  //         name={"employment_type"}
  //         value={employment_type}
  //         type={"text"}
  //         gender={["---", "full staff", "contract staff", "station supervisor(ext)"]}
  //         handleChange={getInput}
  //       />
  //     ),
  //   },
  //   {
  //     name: "sort",
  //     TextField: (
  //       <GenderInput
  //         name={"sort"}
  //         value={sort}
  //         type={"text"}
  //         gender={["---", "A-Z", "Z-A", "high-low", "low-high", "youngest", "oldest"]}
  //         handleChange={getInput}
  //       />
  //     ),
  //   },
  // ];
  // searchEmployees.push(...remainingFields);

  return { bannerDetails };
};
