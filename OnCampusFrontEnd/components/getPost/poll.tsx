import { Card, List } from "@material-tailwind/react";
import PollOptions from "./pollOptions";
import { useState } from "react";
import React from "react";
export const CProvider = React.createContext({
  options: [],
  changeOptionStates: (newOptionStates: any[]) => {},
});

export default function PollList({ options }: { options: any[] }) {
  const [optionStates, setOptionStates] = useState(options);
  const changeOptionStates = (newOptionStates: any[]) => {
    setOptionStates(newOptionStates);
  };

  return (
    <CProvider.Provider
      value={{ options: optionStates, changeOptionStates: changeOptionStates }}
    >
      <Card className="w-full shadow-none" placeholder={undefined}>
        <List className="border-0" placeholder={undefined}>
          {optionStates.map((option, index) => (
            <PollOptions key={index} opt={option} index={index} options={options} />
          ))}
        </List>
      </Card>
    </CProvider.Provider>
  );
}
