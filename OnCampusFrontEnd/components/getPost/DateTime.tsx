import { Typography } from "@material-tailwind/react";

function DateTime({ date }: { date: string}) {
  return (
    <>
      <div className="m-2 flex flex-row gap-2 text-indigo-400">
        <svg
          className="w-4 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z"
            clipRule="evenodd"
          />
        </svg>

        <Typography variant="lead" placeholder={undefined} className="text-sm">
          {date??""}
        </Typography>
      </div>
    </>
  );
}

export default DateTime;
