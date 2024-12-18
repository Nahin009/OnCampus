"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Landing() {
  return (
    <div>
      <div className="pt-24">
        <div className="container px-3 mx-auto relative">
          <div className="absolute inset-0 bg-[url('/images/buet.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-left">
              <h1 className="m-12 mt-20 text-4xl font-bold leading-tight text-white">
                ON C A M P U S !
              </h1>
              <p className="leading-normal text-white text-2xl m-12">
                A Collaborative platform for multiple modules like forum, cleb,
                event, notices and so on
              </p>
              <button className="m-12 mb-40 hover:underline bg-white text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              onClick={() => signIn("keycloak")}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24">
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
      </div>


        <hr className="w-full border-lime-300 my-8" />

      <div className="ml-32 my-20">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          Forums
        </h2>

        <Card className="w-3/4 flex-row" placeholder={undefined}>
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
            placeholder={undefined}
          >
            <img
              src="/images/forum.jpg"
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody placeholder={undefined}>
            <Typography
              variant="h6"
              color="gray"
              className="mb-4 uppercase"
              placeholder={undefined}
            >
              Forums
            </Typography>
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2"
              placeholder={undefined}
            >
              5000 Active users can participate at a time
            </Typography>
            <Typography
              color="gray"
              className="mb-8 font-normal"
              placeholder={undefined}
            >
              All The Students and Leaders can collaborate all of their
              socio-academic activities through a single platform
            </Typography>
            <a href="#" className="inline-block">
              <Button
                variant="text"
                className="flex items-center gap-2"
                placeholder={undefined}
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </CardBody>
        </Card>
      </div>

      <div className="mr-32 mb-20 flex">
        <div className="flex-grow"></div>
        <Card className="w-3/4 flex-row" placeholder={undefined}>
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-l-none right-0 absolute h-full"
            placeholder={undefined}
          >
            <img
              src="/images/forum.png"
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody className="w-3/5" placeholder={undefined}>
            <Typography
              variant="h6"
              color="gray"
              className="mb-4 uppercase"
              placeholder={undefined}
            >
              Categorized
            </Typography>
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2"
              placeholder={undefined}
            >
              Single Community Platform for All Sectors
            </Typography>
            <Typography
              color="gray"
              className="mb-8 font-normal"
              placeholder={undefined}
            >
              More than your used social media! and yes... its lot more secured
              and organized...And u can find your specific topics in just a
              click
            </Typography>
            <a href="#" className="inline-block">
              <Button
                variant="text"
                className="flex items-center gap-2"
                placeholder={undefined}
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </CardBody>
        </Card>
      </div>



      <hr className="w-full border-red-300 my-8" />



      <section className="bg-gray-100 border-b py-8">
        <div className="container mx-auto flex flex-col gap-4 items-center pt-4 pb-12">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Other Activities
          </h2>

          <Card
            shadow={false}
            className="relative grid h-[40rem] w-1/2 items-end justify-center overflow-hidden text-center"
            placeholder={undefined}
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('/images/club.jpg')] bg-center"
              placeholder={undefined}
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody
              className="relative py-14 px-6 md:px-12"
              placeholder={undefined}
            >
              <Typography
                variant="small"
                color="white"
                className="mb-6 font-small leading-[1.5]"
                placeholder={undefined}
              >
                A variety of clubs to join and participate to enrich the
                experience and achievements of BUET
              </Typography>

              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded shadow-xl hover:from-purple-500 hover:to-blue-500 hover:shadow-purple-200">
                Go to CLUBS
              </button>
            </CardBody>
          </Card>
          <Card
            shadow={false}
            className="relative grid h-[40rem] w-1/2 items-end justify-center overflow-hidden text-center"
            placeholder={undefined}
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('/images/event.jpg')] bg-center"
              placeholder={undefined}
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody
              className="relative py-14 px-6 md:px-12"
              placeholder={undefined}
            >
              <Typography
                variant="small"
                color="white"
                className="mb-6 font-thin leading-[1.5]"
                placeholder={undefined}
              >
                All the academic, cocurricular and extracurricular events are
                organized and managed through this platform
              </Typography>

              <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold py-2 px-4 rounded shadow-xl hover:from-orange-500 hover:to-red-500 hover:shadow-red-200">
                Go To EVENTS
              </button>
            </CardBody>
          </Card>
          <Card
            shadow={false}
            className="relative grid h-[40rem] w-1/2 items-end justify-center overflow-hidden text-center"
            placeholder={undefined}
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('/images/notice.jpg')] bg-center"
              placeholder={undefined}
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody
              className="relative py-14 px-6 md:px-12"
              placeholder={undefined}
            >
              <Typography
                variant="small"
                color="white"
                className="mb-6 font-small leading-[1.5]"
                placeholder={undefined}
              >
                Did You missed any notice? Don not worry, we have got you
                covered
              </Typography>

              <button className="bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded shadow-xl hover:from-yellow-500 hover:to-green-500 hover:shadow-green-200">
                Go to NOTICES
              </button>
            </CardBody>
          </Card>
        </div>
      </section>

      
    </div>
  );
}
