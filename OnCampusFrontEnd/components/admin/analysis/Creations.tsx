"use client";
import React, { use, useEffect } from "react";
import GET from "@/server_actions/GET";

import {
  Textarea,
  Button,
  IconButton,
  Card,
  Input,
  Checkbox,
  Typography,
  Select,
  Option,
  Alert,
  Radio,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";

import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Creations = () => {
  const [analysisType, setAnalysisType] = React.useState("");
  const [dayKeys, setDayKeys] = React.useState([]);
  const [weekKeys, setWeeekKeys] = React.useState([]);
  const [monthKeys, setMonthKeys] = React.useState([]);
  const [yearKeys, setYearKeys] = React.useState([]);
  const [dayValues, setDayValues] = React.useState([]);
  const [weekValues, setWeekValues] = React.useState([]);
  const [monthValues, setMonthValues] = React.useState([]);
  const [yearValues, setYearValues] = React.useState([]);

  const dayConfig = {
    type: "line",
    width: "100%",
    height: 240,
    series: [
      {
        name: "Days",
        data: dayValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Per day chart",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: dayKeys,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const weekConfig = {
    type: "line",
    width: "100%",
    height: 240,
    series: [
      {
        name: "Weeks(1st sunday)",
        data: weekValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Per week chart",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: weekKeys,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const monthConfig = {
    type: "line",
    width: "100%",
    height: 240,
    series: [
      {
        name: "Months",
        data: monthValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Per month chart",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: monthKeys,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const yearConfig = {
    type: "line",
    width: "100%",
    height: 240,
    series: [
      {
        name: "Years",
        data: yearValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Per year chart",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: yearKeys,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  // Function to count occurrences per time interval
  const countByInterval = (data: any, interval: any) => {
    const counts = {};

    data.forEach((item) => {
      const createdAt = new Date(item.createdAt);
      const key = getIntervalKey(createdAt, interval);
      counts[key] = (counts[key] || 0) + 1;
    });

    // Sort the keys in descending order
    const sortedKeys = Object.keys(counts).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    // Take the 12 most recent entries
    var recentEntries = sortedKeys.slice(0, 12);
    recentEntries = recentEntries.slice().reverse();

    // Create a new object with the sorted and filtered keys
    const sortedCounts = {};
    recentEntries.forEach((key) => {
      sortedCounts[key] = counts[key];
    });

    return sortedCounts;
  };

  // Function to get interval key based on the specified interval
  const getIntervalKey = (date: any, interval: any) => {
    switch (interval) {
      case "day":
        return date.toISOString().split("T")[0]; // YYYY-MM-DD
      case "week":
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay()); // Set to Sunday of the week
        return weekStart.toISOString().split("T")[0]; // YYYY-MM-DD
      case "month":
        return date.toISOString().split("T")[0].substring(0, 7); // YYYY-MM
      case "year":
        return date.toISOString().split("T")[0].substring(0, 4); // YYYY
      default:
        throw new Error("Invalid interval");
    }
  };

  useEffect(() => {
    if (analysisType === "") return;
    if (analysisType === "Written Posts")
      GET(`user/analysis/writtenPosts`).then((res) => {
        var data;
        data = countByInterval(res.posts, "day");
        setDayKeys(Object.keys(data));
        setDayValues(Object.values(data));
        data = countByInterval(res.posts, "week");
        setWeeekKeys(Object.keys(data));
        setWeekValues(Object.values(data));
        data = countByInterval(res.posts, "month");
        setMonthKeys(Object.keys(data));
        setMonthValues(Object.values(data));
        data = countByInterval(res.posts, "year");
        setYearKeys(Object.keys(data));
        setYearValues(Object.values(data));
      });
    else if (analysisType === "Added notices")
      GET(`user/analysis/addedNotices`).then((res) => {
        var data;
        data = countByInterval(res.notices, "day");
        setDayKeys(Object.keys(data));
        setDayValues(Object.values(data));
        data = countByInterval(res.notices, "week");
        setWeeekKeys(Object.keys(data));
        setWeekValues(Object.values(data));
        data = countByInterval(res.notices, "month");
        setMonthKeys(Object.keys(data));
        setMonthValues(Object.values(data));
        data = countByInterval(res.notices, "year");
        setYearKeys(Object.keys(data));
        setYearValues(Object.values(data));
      });
    else if (analysisType === "Created events")
      GET(`user/analysis/createdEvents`).then((res) => {
        var data;
        data = countByInterval(res.events, "day");
        setDayKeys(Object.keys(data));
        setDayValues(Object.values(data));
        data = countByInterval(res.events, "week");
        setWeeekKeys(Object.keys(data));
        setWeekValues(Object.values(data));
        data = countByInterval(res.events, "month");
        setMonthKeys(Object.keys(data));
        setMonthValues(Object.values(data));
        data = countByInterval(res.events, "year");
        setYearKeys(Object.keys(data));
        setYearValues(Object.values(data));
      });
  }, [analysisType]);

  return (
    <>
      <div className="flex items-center justify-center my-6">
        <Select
          value={analysisType}
          onChange={(e) => {
            setAnalysisType(e ?? "");
          }}
          variant="static"
          label="Select type:"
        >
          <Option value="Written Posts">Written Posts</Option>
          <Option value="Added notices">Added notices</Option>
          <Option value="Created events">Created events</Option>
        </Select>
      </div>
      {analysisType != "" ? (
        <>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
              <Square3Stack3DIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Per Day Chart
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                Visualize the number of {analysisType} per day
                <br />
                (Only recent 12 entries are shown)
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...dayConfig} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
              <Square3Stack3DIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Per Week Chart
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                Visualize the number of {analysisType} per week
                <br />
                (Only recent 12 entries are shown)
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...weekConfig} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
              <Square3Stack3DIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Per Month Chart
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                Visualize the number of {analysisType} per month
                <br />
                (Only recent 12 entries are shown)
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...monthConfig} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
              <Square3Stack3DIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Per Year Chart
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                Visualize the number of {analysisType} per year
                <br />
                (Only recent 12 entries are shown)
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...yearConfig} />
          </CardBody>
        </Card>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Creations;
