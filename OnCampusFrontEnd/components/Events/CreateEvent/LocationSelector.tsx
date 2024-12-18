import { Input, Option, Select, Typography } from "@material-tailwind/react";
import { useState } from "react";
import SelectOfflineLocation from "./SelectOfflineLocations";

const locationTypes = [
  {
    id: 1,
    name: "Online",
  },
  {
    id: 2,
    name: "Offline",
  },
  {
    id: 3,
    name: "Both",
  },
  {
    id: 4,
    name: "None",
  },
];

function LocationSelector() {
  const [locationOption, setLocationOpton] = useState<string | undefined>("");
  const handleChange = (selected: string | undefined) => {
    setLocationOpton(selected);
    console.log(selected);
  };
  return (
    <div className="mt-1 flex flex-col gap-1">
      <div className="w-1/3">
        <Select
          size="md"
          label="Select Location Type"
          className="bg-white"
          placeholder={undefined}
          value={locationOption}
          onChange={handleChange}
        >
          {/* <Option value="">Nothing</Option> */}
          {locationTypes.map((type) => (
            <Option key={type.id} value={type.name}>
              {type.name}
            </Option>
          ))}
        </Select>
      </div>

      <div className="">
        {locationOption && (
          <div className="w-full p-4">
            {locationOption === "Online" ? (
              <div className="flex flex-col gap-1 w-1/2">
                <Typography
                  placeholder={""}
                  variant="small"
                  className="text-blue-gray-600"
                >
                  Online Link
                </Typography>
                <Input
                  crossOrigin={""}
                  label="Meeting Link*"
                  placeholder="to be announced..."
                  className="bg-white"
                />
              </div>
            ) : locationOption === "Offline" ? (
              <div className="flex flex-col gap-1">
                <Typography
                  placeholder={""}
                  variant="small"
                  className="text-blue-gray-600"
                >
                  Offline venue
                </Typography>
                <SelectOfflineLocation />
              </div>
            ) : locationOption === "Both" ? (
              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-1 w-1/3">
                  <Typography
                    placeholder={""}
                    variant="small"
                    className="text-blue-gray-600"
                  >
                    Online Link
                  </Typography>
                  <Input
                    crossOrigin={""}
                    label="Meeting Link*"
                    placeholder="to be announced..."
                    className="bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1 mx-auto">
                  <Typography
                    placeholder={""}
                    variant="small"
                    className="text-blue-gray-600"
                  >
                    Offline venue
                  </Typography>
                  <SelectOfflineLocation />
                </div>
              </div>
            ) : (
              <h1 className="text-yellow-800">No Location is Applicable!</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationSelector;
