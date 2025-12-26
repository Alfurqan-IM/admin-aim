import React from "react";
import { useDispatch } from "react-redux";
import { handelChangeEvent } from "../features/events/eventSlice";
import {
  GenderInput,
  MultiLineInput,
  UserInput,
} from "../components copy";
import { useSelector } from "react-redux";
import { handleChangeEnq } from "../features/enquiries/enquirySlice";
import { handleChangeReg } from "../features/registerations/registerationSlice";
import { handleChangeQuran } from "features/quran/quranSlice";
export const useEventInputs = () => {
  const { title, status, event_url, description } = useSelector((store) => store.events);
  const dispatch = useDispatch();
  const getInput = (e) => {
    const { name, value } = e.target;
    dispatch(handelChangeEvent({ name, value }));
  };
  const eventInputDetails = [
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
    {
      name: "status",
      TextField: (
        <GenderInput
          name={"status"}
          value={status}
          type={"text"}
          gender={["---", "ongoing", "upcoming", "completed"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "event_url",
      TextField: (
        <UserInput
          name={"event_url"}
          value={event_url}
          type={"url"}
          placeholder="https://example.com"
          handleChange={getInput}
        />
      ),
    },
    
  ];
  return { eventInputDetails };
};

export const useEnqInp = () => {
  const { status } = useSelector((store) => store.enquiries);
  const dispatch = useDispatch();
  const getInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeEnq({ name, value }));
  };
  const enqInput = [
    {
      name: "status",
      TextField: (
        <GenderInput
          name={"status"}
          value={status}
          type={"text"}
          gender={["---", "resolved", "pending"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { enqInput };
};

export const useSurahInp = () => {
  const { verse, surah, text, translation, transliteration } = useSelector((store) => store.quran);
  const dispatch = useDispatch();
  const getInput = (e) => {
    const { name } = e.target;
    let value;
    value = e.target.value;
    if (name === "verse") {
      value = Number(e.target.value);
    }
    dispatch(handleChangeQuran({ name, value }));
  };
  const surahInputs = [
    {
      name: "surah",
      TextField: <UserInput name={"surah"} value={surah} type={"name"} handleChange={getInput} />,
    },
    {
      name: "verse",
      TextField: <UserInput name={"verse"} value={verse} type={"number"} handleChange={getInput} />,
    },
    {
      name: "text",
      TextField: (
        <UserInput
          name={"text"}
          value={text}
          type={"text"}
          handleChange={getInput}
          placeholder="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
          //validationError={validationError}
          //message={"Please provide a valid email address"}
        />
      ),
    },
    {
      name: "translation",
      TextField: (
        <MultiLineInput
          name={"translation"}
          value={translation}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "transliteration",
      TextField: (
        <MultiLineInput
          name={"transliteration"}
          value={transliteration}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { surahInputs };
};

export const useRegInp = () => {
  const { programme, category, discovery_method } = useSelector((store) => store.registerations);
  const dispatch = useDispatch();

  const getInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeReg({ name, value }));
  };
  const regInputs = [
    {
      name: "programme",
      TextField: (
        <UserInput name={"programme"} value={programme} type={"text"} handleChange={getInput} />
      ),
    },
    {
      name: "category",
      TextField: (
        <GenderInput
          name={"category"}
          value={category}
          type={"text"}
          gender={["---", "Youth", "Adult"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "discovery_method",
      TextField: (
        <GenderInput
          name={"discovery_method"}
          value={discovery_method}
          type={"text"}
          gender={[
            "---",
            "Masjid",
            "Social_Media",
            "Email_Campaign",
            "Referral",
            "Website",
            "Event_Workshop",
            "Advertisement",
            "Friends",
            "Other",
          ]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { regInputs };
};

