"use client";
import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-black p-28 flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 text-center md:justify-between">
        <Typography
          color="white"
          className="font-normal"
          placeholder={undefined}
        >
          &copy; 2024 ON CAMPUS
        </Typography>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              placeholder={undefined}
            >
              BIIS
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              placeholder={undefined}
            >
              BUET official Website
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              placeholder={undefined}
            >
              BUET UG admission
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              placeholder={undefined}
            >
              MOODLE CSE BUET
            </Typography>
          </li>
        </ul>
        <hr className="w-full border-blue-gray-50 my-8" />
      </footer>
    </div>
  );
}
