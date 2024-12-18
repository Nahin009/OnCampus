"use client";
import React, { use, useEffect } from "react";

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

const Creations = ({ mapper }: { mapper: any }) => {
  console.log(mapper);
  const [analysisType, setAnalysisType] = React.useState("");

  const [likedByKeys, setLikedByKeys] = React.useState<string[]>([]);
  const [savedByKeys, setSavedByKeys] = React.useState<string[]>([]);
  const [viewedByKeys, setViewedByKeys] = React.useState<string[]>([]);
  const [reportedByKeys, setReportedByKeys] = React.useState<string[]>([]);
  const [likedByValues, setLikedByValues] = React.useState<string[]>([]);
  const [savedByValues, setSavedByValues] = React.useState<string[]>([]);
  const [viewedByValues, setViewedByValues] = React.useState<string[]>([]);
  const [reportedByValues, setReportedByValues] = React.useState<string[]>([]);

  const likedByConfigPie = {
    type: "pie",
    width: 280,
    height: 280,
    series: likedByValues,
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Likes pie chart",
      },
      dataLabels: {
        enabled: true,
      },
      // colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5"],
      legend: {
        show: true,
      },
    },
  };

  const savedByConfigPie = {
    type: "pie",
    width: 280,
    height: 280,
    series: savedByValues,
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Saves pie chart",
      },
      dataLabels: {
        enabled: true,
      },
      // colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5"],
      legend: {
        show: true,
      },
    },
  };

  const viewsByConfigPie = {
    type: "pie",
    width: 280,
    height: 280,
    series: viewedByValues,
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Views pie chart",
      },
      dataLabels: {
        enabled: true,
      },
      // colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5"],
      legend: {
        show: true,
      },
    },
  };

  const reportedByConfigPie = {
    type: "pie",
    width: 280,
    height: 280,
    series: reportedByValues,
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Reports pie chart",
      },
      dataLabels: {
        enabled: true,
      },
      // colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5"],
      legend: {
        show: true,
      },
    },
  };

  const likedByConfig = {
    type: "bar",
    height: 240,
    width:  "100%",
    series: [
      {
        name: "Likes",
        data: likedByValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Likes chart",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
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
        categories: likedByKeys,
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

  const savedByConfig = {
    type: "bar",
    height: 240,
    width:  "100%",
    series: [
      {
        name: "Saves",
        data: savedByValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Saves chart",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
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
        categories: savedByKeys,
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

  const viewedByConfig = {
    type: "bar",
    height: 240,
    width:  "100%",
    series: [
      {
        name: "Views",
        data: viewedByValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Views chart",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
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
        categories: viewedByKeys,
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

  const reportedByConfig = {
    type: "bar",
    height: 240,
    width:  "100%",
    series: [
      {
        name: "Reports",
        data: reportedByValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Reports chart",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
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
        categories: reportedByKeys,
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

  useEffect(() => {
    if (analysisType === "") return;
    if (analysisType === "Per tag") {
      setLikedByKeys(['DISCUSSION','BLOOD','TUITION','PRODUCT']);
      setLikedByValues([mapper['DISCUSSION'].likedBy, mapper['BLOOD'].likedBy, mapper['TUITION'].likedBy, mapper['PRODUCT'].likedBy]);
      setSavedByKeys(['DISCUSSION','BLOOD','TUITION','PRODUCT']);
      setSavedByValues([mapper['DISCUSSION'].savedBy, mapper['BLOOD'].savedBy, mapper['TUITION'].savedBy, mapper['PRODUCT'].savedBy]);
      setViewedByKeys(['DISCUSSION','BLOOD','TUITION','PRODUCT']);
      setViewedByValues([mapper['DISCUSSION'].viewedBy, mapper['BLOOD'].viewedBy, mapper['TUITION'].viewedBy, mapper['PRODUCT'].viewedBy]);
      setReportedByKeys(['DISCUSSION','BLOOD','TUITION','PRODUCT']);
      setReportedByValues([mapper['DISCUSSION'].reportedCount, mapper['BLOOD'].reportedCount, mapper['TUITION'].reportedCount, mapper['PRODUCT'].reportedCount]);
    } else if (analysisType === "Per type") {
      setLikedByKeys(['General','Batch','Dept','BatchDept']);
      setLikedByValues([mapper['General'].likedBy, mapper['Batch'].likedBy, mapper['Dept'].likedBy, mapper['BatchDept'].likedBy]);
      setSavedByKeys(['General','Batch','Dept','BatchDept']);
      setSavedByValues([mapper['General'].savedBy, mapper['Batch'].savedBy, mapper['Dept'].savedBy, mapper['BatchDept'].savedBy]);
      setViewedByKeys(['General','Batch','Dept','BatchDept']);
      setViewedByValues([mapper['General'].viewedBy, mapper['Batch'].viewedBy, mapper['Dept'].viewedBy, mapper['BatchDept'].viewedBy]);
      setReportedByKeys(['General','Batch','Dept','BatchDept']);
      setReportedByValues([mapper['General'].reportedCount, mapper['Batch'].reportedCount, mapper['Dept'].reportedCount, mapper['BatchDept'].reportedCount]);
    } else if (analysisType === "Per type tag") {
      setLikedByKeys(['General-DISCUSSION','Batch-DISCUSSION','Dept-DISCUSSION','BatchDept-DISCUSSION','General-BLOOD','Batch-BLOOD','Dept-BLOOD','BatchDept-BLOOD','General-TUITION','Batch-TUITION','Dept-TUITION','BatchDept-TUITION','General-PRODUCT','Batch-PRODUCT','Dept-PRODUCT','BatchDept-PRODUCT']);
      setLikedByValues([mapper['General']['DISCUSSION'].likedBy, mapper['Batch']['DISCUSSION'].likedBy, mapper['Dept']['DISCUSSION'].likedBy, mapper['BatchDept']['DISCUSSION'].likedBy, mapper['General']['BLOOD'].likedBy, mapper['Batch']['BLOOD'].likedBy, mapper['Dept']['BLOOD'].likedBy, mapper['BatchDept']['BLOOD'].likedBy, mapper['General']['TUITION'].likedBy, mapper['Batch']['TUITION'].likedBy, mapper['Dept']['TUITION'].likedBy, mapper['BatchDept']['TUITION'].likedBy, mapper['General']['PRODUCT'].likedBy, mapper['Batch']['PRODUCT'].likedBy, mapper['Dept']['PRODUCT'].likedBy, mapper['BatchDept']['PRODUCT'].likedBy]);
      setSavedByKeys(['General-DISCUSSION','Batch-DISCUSSION','Dept-DISCUSSION','BatchDept-DISCUSSION','General-BLOOD','Batch-BLOOD','Dept-BLOOD','BatchDept-BLOOD','General-TUITION','Batch-TUITION','Dept-TUITION','BatchDept-TUITION','General-PRODUCT','Batch-PRODUCT','Dept-PRODUCT','BatchDept-PRODUCT']);
      setSavedByValues([mapper['General']['DISCUSSION'].savedBy, mapper['Batch']['DISCUSSION'].savedBy, mapper['Dept']['DISCUSSION'].savedBy, mapper['BatchDept']['DISCUSSION'].savedBy, mapper['General']['BLOOD'].savedBy, mapper['Batch']['BLOOD'].savedBy, mapper['Dept']['BLOOD'].savedBy, mapper['BatchDept']['BLOOD'].savedBy, mapper['General']['TUITION'].savedBy, mapper['Batch']['TUITION'].savedBy, mapper['Dept']['TUITION'].savedBy, mapper['BatchDept']['TUITION'].savedBy, mapper['General']['PRODUCT'].savedBy, mapper['Batch']['PRODUCT'].savedBy, mapper['Dept']['PRODUCT'].savedBy, mapper['BatchDept']['PRODUCT'].savedBy]);
      setViewedByKeys(['General-DISCUSSION','Batch-DISCUSSION','Dept-DISCUSSION','BatchDept-DISCUSSION','General-BLOOD','Batch-BLOOD','Dept-BLOOD','BatchDept-BLOOD','General-TUITION','Batch-TUITION','Dept-TUITION','BatchDept-TUITION','General-PRODUCT','Batch-PRODUCT','Dept-PRODUCT','BatchDept-PRODUCT']);
      setViewedByValues([mapper['General']['DISCUSSION'].viewedBy, mapper['Batch']['DISCUSSION'].viewedBy, mapper['Dept']['DISCUSSION'].viewedBy, mapper['BatchDept']['DISCUSSION'].viewedBy, mapper['General']['BLOOD'].viewedBy, mapper['Batch']['BLOOD'].viewedBy, mapper['Dept']['BLOOD'].viewedBy, mapper['BatchDept']['BLOOD'].viewedBy, mapper['General']['TUITION'].viewedBy, mapper['Batch']['TUITION'].viewedBy, mapper['Dept']['TUITION'].viewedBy, mapper['BatchDept']['TUITION'].viewedBy, mapper['General']['PRODUCT'].viewedBy, mapper['Batch']['PRODUCT'].viewedBy, mapper['Dept']['PRODUCT'].viewedBy, mapper['BatchDept']['PRODUCT'].viewedBy]);
      setReportedByKeys(['General-DISCUSSION','Batch-DISCUSSION','Dept-DISCUSSION','BatchDept-DISCUSSION','General-BLOOD','Batch-BLOOD','Dept-BLOOD','BatchDept-BLOOD','General-TUITION','Batch-TUITION','Dept-TUITION','BatchDept-TUITION','General-PRODUCT','Batch-PRODUCT','Dept-PRODUCT','BatchDept-PRODUCT']);
      setReportedByValues([mapper['General']['DISCUSSION'].reportedCount, mapper['Batch']['DISCUSSION'].reportedCount, mapper['Dept']['DISCUSSION'].reportedCount, mapper['BatchDept']['DISCUSSION'].reportedCount, mapper['General']['BLOOD'].reportedCount, mapper['Batch']['BLOOD'].reportedCount, mapper['Dept']['BLOOD'].reportedCount, mapper['BatchDept']['BLOOD'].reportedCount, mapper['General']['TUITION'].reportedCount, mapper['Batch']['TUITION'].reportedCount, mapper['Dept']['TUITION'].reportedCount, mapper['BatchDept']['TUITION'].reportedCount, mapper['General']['PRODUCT'].reportedCount, mapper['Batch']['PRODUCT'].reportedCount, mapper['Dept']['PRODUCT'].reportedCount, mapper['BatchDept']['PRODUCT'].reportedCount]);
    }
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
          <Option value="Per tag">Per tag</Option>
          <Option value="Per type">Per type</Option>
          <Option value="Per type tag">Per type tag</Option>
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
                  Likes Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Visualize the number of likes {analysisType}
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...likedByConfig} />
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
                  Like Pie Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Visualize the number of likes {analysisType} in pie chart
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...likedByConfigPie} />
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
                  Saves Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Visualize the number of saves {analysisType}
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...savedByConfig} />
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
                  Saves Pie Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Visualize the number of saves {analysisType} in pie chart
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...savedByConfigPie} />
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
                  Views Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Visualize the number of views {analysisType}
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...viewedByConfig} />
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
                Views Pie Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Visualize the number of views {analysisType} in pie chart
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...viewsByConfigPie} />
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
                  Reported Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Visualize the number of reports {analysisType}
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...reportedByConfig} />
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
                Reported Pie Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Visualize the number of reports {analysisType} in pie chart
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...reportedByConfigPie} />
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
