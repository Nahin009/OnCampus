import { Breadcrumbs } from "@material-tailwind/react";

export default function BreadcrumbsDefault({
  type,
  tags,
}: {
  type: string;
  tags: string[];
}) {
  return (
    <>
        <div>
          <Breadcrumbs placeholder={""} className="bg-white">
            <a href="/" className="opacity-60">
              Posts
            </a>
            <a href={"/"} className="opacity-60">
              {type}
            </a>
            {tags.map((tag,index) => (
              <a key={index}href={"/"+type+"/"+tag}>
                {tag}
              </a>
            ))}
          </Breadcrumbs>
          </div>
    </>
  );
}
