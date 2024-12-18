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

  var participatedByKeys: string[] = ['Workshop', 'Seminar', 'Sports', 'Competition', 'Rag_concert', 'Shapa_day', 'Flashmob', 'Cultural', 'Picnic', 'Tour', 'Normal_Online_Event', 'Normal_Offline_Event']
  var participatedByValues: string[] = [mapper['Workshop'].participatedBy, mapper['Seminar'].participatedBy, mapper['Sports'].participatedBy, mapper['Competition'].participatedBy, mapper['Rag_concert'].participatedBy, mapper['Shapa_day'].participatedBy, mapper['Flashmob'].participatedBy, mapper['Cultural'].participatedBy, mapper['Picnic'].participatedBy, mapper['Tour'].participatedBy, mapper['Normal_Online_Event'].participatedBy, mapper['Normal_Offline_Event'].participatedBy]

  var savedByKeys: string[] = ['Workshop', 'Seminar', 'Sports', 'Competition', 'Rag_concert', 'Shapa_day', 'Flashmob', 'Cultural', 'Picnic', 'Tour', 'Normal_Online_Event', 'Normal_Offline_Event']
  var savedByValues: string[] = [mapper['Workshop'].savedBy, mapper['Seminar'].savedBy, mapper['Sports'].savedBy, mapper['Competition'].savedBy, mapper['Rag_concert'].savedBy, mapper['Shapa_day'].savedBy, mapper['Flashmob'].savedBy, mapper['Cultural'].savedBy, mapper['Picnic'].savedBy, mapper['Tour'].savedBy, mapper['Normal_Online_Event'].savedBy, mapper['Normal_Offline_Event'].savedBy]

  const participatedByConfigPie = {
    type: "pie",
    width: 280,
    height: 280,
    series: participatedByValues,
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Participating pie chart",
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

  const participatedByConfig = {
    type: "bar",
    height: 240,
    width: "100%",
    series: [
      {
        name: "Participatings",
        data: participatedByValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "Participating chart",
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
        categories: participatedByKeys,
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

  const savedByConfig = {
    type: "bar",
    height: 240,
    width: "100%",
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

  return (
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
              Particiapating Chart
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
              Visualize the number of Particiapatings
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0">
          <Chart {...participatedByConfig} />
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
              Participating Pie Chart
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
              Visualize the number of participatings in pie chart
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mt-4 grid place-items-center px-2">
          <Chart {...participatedByConfigPie} />
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
              Visualize the number of savings
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
              Visualize the number of savings in pie chart
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mt-4 grid place-items-center px-2">
          <Chart {...savedByConfigPie} />
        </CardBody>
      </Card>
    </>
  );
};

export default Creations;
