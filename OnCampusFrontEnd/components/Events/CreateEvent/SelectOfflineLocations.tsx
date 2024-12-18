import Locations from "@/components/Events/DummyLocations";
import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React from "react";

export default function SelectOfflineLocation() {
  const [value, setValue] = React.useState("");
  return (
    <div className="relative flex w-full max-w-[24rem] bg-white">
      <div className="flex flex-row gap-4">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              placeholder={""}
              ripple={false}
              variant="text"
              color="blue-gray"
              className="flex flex-row h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
            >
              Populars
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M13.78 10.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l.97.97V5.75a.75.75 0 0 1 1.5 0v5.69l.97-.97a.75.75 0 0 1 1.06 0ZM2.22 5.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V4.56l-.97.97a.75.75 0 0 1-1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </MenuHandler>
          <MenuList placeholder={""} className="max-h-[20rem] max-w-[18rem]">
            {Locations.map(({ name }, index) => {
              return (
                <MenuItem
                  placeholder={""}
                  key={name}
                  value={name}
                  className="flex items-center gap-2"
                  onClick={() => {
                    setValue(name);
                    console.log(name);
                  }}
                >
                  {name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </div>
      <Input
        value={value}
        crossOrigin={""}
        onChange={(e) => {
          setValue(e.target.value);
          console.log(e.target.value);
        }}
        label="Location*"
        className="rounded-l-none"
      />
    </div>
  );
}
