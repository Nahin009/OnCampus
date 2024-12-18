"use client";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { LinkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Link from "next/link";
import DateTime from "./getPost/DateTime";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const AllNotices = ({ notices }: { notices: any }) => {
  const [title, setTitle] = useState("");
  const [allNotices, setAllNotices] = useState(notices);
  const filteredTitle: string[] = [];

  notices.forEach((notice) => {
    filteredTitle.push(notice.title);
  });

  const handleOnSelectTitle = (item) => {
    const newTitle = item.name;
    setTitle((prev) => newTitle);
    setAllNotices((prev) =>
      notices.filter(
        (notice) => notice.title === (newTitle === "" ? notice.title : newTitle)
      )
    );
  };

  const handleOnSearchTitle = (value) => {
    setTitle((prev) => value);
    setAllNotices((prev) =>
      notices.filter(
        (notice) => notice.title === (value === "" ? notice.title : value)
      )
    );
  };
  return (
    <Card className="w-full">
      <Typography variant="h4">All notices</Typography>
      <div className="">
          <Typography variant="small" color="blue-gray">
            Title:
          </Typography>
          <ReactSearchAutocomplete
            items={filteredTitle.map((h, i) => ({
              id: i,
              name: h,
            }))}
            resultStringKeyName="name"
            onSelect={handleOnSelectTitle}
            onSearch={(value, results) => {
              handleOnSearchTitle(value);
            }}
            maxResults={5}
            autoFocus
          />
        </div>
      <List>
        {allNotices.map((notice, index) => {
          return (
            <ListItem
              key={index}
              ripple={false}
              className="py-1 pr-1 pl-4 pr-4 border border-slate-400"
            >
              {notice.title}

              <ListItemSuffix>
                <div className="flex flex-row">
                  <DateTime
                    date={new Date(notice.createdAt).toLocaleString()}
                  />
                  <Link href={`/Notice/getNotice/${notice.id}`}>
                    <IconButton variant="text" color="blue-gray">
                      <LinkIcon className="h-5 w-5" />
                    </IconButton>
                  </Link>
                </div>
              </ListItemSuffix>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default AllNotices;
