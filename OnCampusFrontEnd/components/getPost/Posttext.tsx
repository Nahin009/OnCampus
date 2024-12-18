import { Typography, Card } from "@material-tailwind/react";
import Parser from "html-react-parser";
export default function PosText({ title, content }: { title: string, content: string }) {
  return (
    <div className="w-full">
      <Typography className="py-2" placeholder={""} variant="h5">
        {title ?? "Title"}
      </Typography>
      <div className="bg-white border border-slate-500 shadow-md p-1 m-1">
        {content ? <div dangerouslySetInnerHTML={{ __html: content }}></div> : ""}
      </div>
    </div>
  );
}
