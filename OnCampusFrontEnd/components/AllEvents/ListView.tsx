import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { eventTypes } from "../Events/DummyTypes";

function ListView({ events }: { events: any[] }) {
  const [eventList, setEventList] = useState<any[]>(events);

  const [searchTitle, setSearchTitle] = useState<string>("");

  const [filtereByTime, setFilterByTime] = useState<string>("all"); // all, past, upcoming, running

  const [filterByType, setFilterByType] = useState<string>("all"); // all, online, offline

  const [filterByTags, setFilterByTags] = useState<string>("all");

  const [sortBy, setSortBy] = useState<string>("createdAt"); // createdAt, startDate, finishDate, twisting(current running -> upcoming -> past by createdAt)

  useEffect(() => {
    const filterAndSort = () => {
      let actualEvents = [...events];

      actualEvents = actualEvents.filter((event: any) => {
        return event.title.toLowerCase().includes(searchTitle.toLowerCase());
      });

      if (filtereByTime === "all") {
      } else if (filtereByTime === "past") {
        actualEvents = actualEvents.filter((event: any) => {
          return new Date(event.finishDate) < new Date();
        });
      } else if (filtereByTime === "upcoming") {
        actualEvents = actualEvents.filter((event: any) => {
          return new Date(event.startDate) > new Date();
        });
      } else if (filtereByTime === "running") {
        actualEvents = actualEvents.filter((event: any) => {
          return (
            new Date(event.startDate) < new Date() &&
            new Date(event.finishDate) > new Date()
          );
        });
      }

      if (filterByType === "all") {
      } else if (filterByType === "Online") {
        actualEvents = actualEvents.filter((event: any) => {
          return event.eventType === "Online";
        });
      } else if (filterByType === "Offline") {
        actualEvents = actualEvents.filter((event: any) => {
          return event.eventType === "Offline";
        });
      } else if (filterByType === "Both") {
        actualEvents = actualEvents.filter((event: any) => {
          return event.eventType === "Both";
        });
      }

      if (filterByTags === "all") {
      } else {
        actualEvents = actualEvents.filter((event: any) => {
          return event.tag === filterByTags;
        });
      }

      if (sortBy === "createdAt") {
        actualEvents.sort((a: any, b: any) => {
          return a.createdAt - b.createdAt;
        });
      } else if (sortBy === "startDate") {
        actualEvents.sort((a: any, b: any) => {
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        });
      } else if (sortBy === "finishDate") {
        actualEvents.sort((a: any, b: any) => {
          return (
            new Date(a.finishDate).getTime() - new Date(b.finishDate).getTime()
          );
        });
      } else if (sortBy === "twisting") {
        const now = new Date();
        const current = actualEvents.filter((event: any) => {
          return (
            new Date(event.startDate) < now && new Date(event.finishDate) > now
          );
        });
        current.sort((a: any, b: any) => {
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        });
        const upcoming = actualEvents.filter((event: any) => {
          return new Date(event.startDate) > now;
        });
        upcoming.sort((a: any, b: any) => {
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        });
        const past = actualEvents.filter((event: any) => {
          return new Date(event.finishDate) < now;
        });
        past.sort((a: any, b: any) => {
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        });

        actualEvents = [...current, ...upcoming, ...past];
      }
      setEventList(actualEvents);
    };

    filterAndSort();
  }, [
    filterByTags,
    filterByType,
    filtereByTime,
    sortBy,
    searchTitle,
    events,
  ]);

  const handleSearch = (e: any) => {
    setSearchTitle(e.target.value);
  };

  const handleFilterByTime = (e: any) => {
    // let actualEvents = [...eventList];
    // console.log(e.target.value);
    // if (e.target.value === "all") {
    // } else if (e.target.value === "past") {
    //   actualEvents.filter((event: any) => {
    //     return new Date(event.finishDate) < new Date();
    //   });
    // } else if (e.target.value === "upcoming") {
    //   actualEvents.filter((event: any) => {
    //     return new Date(event.startDate) > new Date();
    //   });
    // } else if (e.target.value === "running") {
    //   actualEvents.filter((event: any) => {
    //     return (
    //       new Date(event.startDate) < new Date() &&
    //       new Date(event.finishDate) > new Date()
    //     );
    //   });
    // }
    // setEventList([...actualEvents]);
    setFilterByTime(e.target.value);
  };

  const handleFilterByType = (e: any) => {
    // let actualEvents = [...eventList];
    // if (e.target.value === "all") {
    // } else if (e.target.value === "online") {
    //   actualEvents.filter((event: any) => {
    //     return event.eventType === "online";
    //   });
    // } else if (e.target.value === "offline") {
    //   actualEvents.filter((event: any) => {
    //     return event.eventType === "offline";
    //   });
    // }

    // setEventList(actualEvents);
    setFilterByType(e.target.value);
  };

  const handleFilterByTags = (e: any) => {
    // let actualEvents = [...eventList];
    // if (e.target.value === "all") {
    // } else {
    //   actualEvents.filter((event: any) => {
    //     return event.tag === e.target.value;
    //   });
    // }

    // setEventList(actualEvents);
    setFilterByTags(e.target.value);
  };

  const handleSortBy = (e: any) => {
    // let actualEvents = [...eventList];
    // if (e.target.value === "createdAt") {
    //   actualEvents.sort((a: any, b: any) => {
    //     return a.createdAt - b.createdAt;
    //   });
    // } else if (e.target.value === "startDate") {
    //   actualEvents.sort((a: any, b: any) => {
    //     return (
    //       new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    //     );
    //   });
    // } else if (e.target.value === "finishDate") {
    //   actualEvents.sort((a: any, b: any) => {
    //     return (
    //       new Date(a.finishDate).getTime() - new Date(b.finishDate).getTime()
    //     );
    //   });
    // } else if (e.target.value === "twisting") {
    //   const now = new Date();
    //   const current = actualEvents.filter((event: any) => {
    //     return (
    //       new Date(event.startDate) < now && new Date(event.finishDate) > now
    //     );
    //   });
    //   current.sort((a: any, b: any) => {
    //     return (
    //       new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    //     );
    //   });
    //   const upcoming = actualEvents.filter((event: any) => {
    //     return new Date(event.startDate) > now;
    //   });
    //   upcoming.sort((a: any, b: any) => {
    //     return (
    //       new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    //     );
    //   });
    //   const past = actualEvents.filter((event: any) => {
    //     return new Date(event.finishDate) < now;
    //   });
    //   past.sort((a: any, b: any) => {
    //     return (
    //       new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    //     );
    //   });

    //   actualEvents = [...current, ...upcoming, ...past];
    // }

    // setEventList(actualEvents);
    setSortBy(e.target.value);
  };

  const router = useRouter();

  const redirect = (id: string) => () => {
    router.push(`/SingleEvent/${id}`);
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="w-3/5">
          <ul>
            {eventList.map((event: any) => (
              <li key={event.id}>
                <div className="my-6 shadow-xl rounded-xl bg-blue-gray-100 p-8 flex flex-col gap-4">
                  <div className=" font-semibold text-2xl"> {event.title}</div>
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>

                    <div className="">
                      {event.startDate} - {event.finishDate}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>

                    <div className="">{event.location}</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6h.008v.008H6V6Z"
                      />
                    </svg>

                    <div className="">{event.tag}</div>
                  </div>
                  <div className="">
                    <Button
                      variant="text"
                      onClick={redirect(event.id)}
                      className=" text-blue-700 underline"
                    >
                      See Details...
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/5 p-8 ml-12">
          <div className="flex flex-col gap-4">
            <div>
              <div className="relative w-3/5 min-w-2/5 h-10">
                <input
                  value={searchTitle}
                  onChange={handleSearch}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Search by Title
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Filter by Time</label>
              <select
                value={filtereByTime}
                onChange={handleFilterByTime}
                className="w-3/5 appearance-auto bg-white border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              >
                <option value="all" className="py-2">
                  All
                </option>
                <option value="past" className="py-2">
                  Past
                </option>
                <option value="upcoming" className="py-2">
                  Upcoming
                </option>
                <option value="running" className="py-2">
                  Running
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Filter by Type</label>
              <select
                value={filterByType}
                onChange={handleFilterByType}
                className="w-3/5 appearance-auto bg-white border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              >
                <option value="all">All</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Filter by Tags</label>
              <select
                value={filterByTags}
                onChange={handleFilterByTags}
                className="w-3/5 appearance-auto bg-white border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              >
                <option value="all">All</option>
                {eventTypes.map((tag) => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Sort by</label>
              <select
                value={sortBy}
                onChange={handleSortBy}
                className="w-3/5 appearance-auto bg-white border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              >
                <option value="createdAt">Created At</option>
                <option value="startDate">Start Date</option>
                <option value="finishDate">Finish Date</option>
                <option value="twisting">running-upcoming-past(sort by startdate)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListView;
