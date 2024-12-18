"use client";

declare global {
  interface Window {
    gapi: any;
  }
}

import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";

const AddEventGoogleCalender: React.FC = () => {
  const [gapiInited, setGapiInited] = useState<boolean>(false);
  const [gisInited, setGisInited] = useState<boolean>(false);
  const [tokenClient, setTokenClient] = useState<any>(null);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://apis.google.com/js/api.js";
    script1.async = true;
    script1.defer = true;
    script1.onload = gapiLoaded;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://accounts.google.com/gsi/client";
    script2.async = true;
    script2.defer = true;
    script2.onload = gisLoaded;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const gapiLoaded = () => {
    window.gapi.load("client", initializeGapiClient);
  };

  const initializeGapiClient = async () => {
    await window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: [DISCOVERY_DOC],
      scope: SCOPES,
    });
    setGapiInited(true);
    maybeEnableButtons();
  };

  const gisLoaded = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "",
    });
    setTokenClient(client);
    setGisInited(true);
    maybeEnableButtons();
  };

  const maybeEnableButtons = () => {
    if (gapiInited && gisInited) {
      document.getElementById("authorize_button")!.style.visibility = "visible";
    }
  };

  const handleAuthClick = () => {
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      //   document.getElementById("signout_button")!.style.visibility = "visible";
      //   document.getElementById("authorize_button")!.innerText = "Refresh";
      await addEventToCalendar();
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  };

  //   const handleSignoutClick = () => {
  //     const token = window.gapi.client.getToken();
  //     if (token !== null) {
  //       google.accounts.oauth2.revoke(token.access_token);
  //       window.gapi.client.setToken("");
  //       document.getElementById("authorize_button")!.innerText = "Authorize";
  //       document.getElementById("signout_button")!.style.visibility = "hidden";
  //     }
  //   };

  const addEventToCalendar = async () => {
    const event = {
        summary: 'Google I/O 2015',
        location: '800 Howard St., San Francisco, CA 94103',
        description: 'A chance to hear more about Google\'s developer products.',
        start: {
          dateTime: '2015-05-28T09:00:00-07:00',
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: '2015-05-28T17:00:00-07:00',
          timeZone: 'America/Los_Angeles',
        },
        recurrence: [
          'RRULE:FREQ=DAILY;COUNT=2',
        ],
        attendees: [
          { email: 'lpage@example.com' },
          { email: 'sbrin@example.com' },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      };

    const request = window.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    try {
      const response = await request;
      console.log("Event created:", response.data.htmlLink);
    } catch (error: any) {
      console.error("Error creating event:", error.message);
    }
  };

  return (
    <div>
      <Typography color="blue">Google Calendar API Quickstart</Typography>
      <button
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg border border-blue-gray-500 text-blue-gray-500 hover:opacity-75 focus:ring focus:ring-blue-gray-200 active:opacity-[0.85] flex items-center gap-3 flex-row"
        id="authorize_button"
        onClick={handleAuthClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-8 w-8"
        >
          <rect width="22" height="22" x="13" y="13" fill="#fff" />
          <polygon
            fill="#1e88e5"
            points="25.68,20.92 26.688,22.36 28.272,21.208 28.272,29.56 30,29.56 30,18.616 28.56,18.616"
          />
          <path
            fill="#1e88e5"
            d="M22.943,23.745c0.625-0.574,1.013-1.37,1.013-2.249c0-1.747-1.533-3.168-3.417-3.168 c-1.602,0-2.972,1.009-3.33,2.453l1.657,0.421c0.165-0.664,0.868-1.146,1.673-1.146c0.942,0,1.709,0.646,1.709,1.44 c0,0.794-0.767,1.44-1.709,1.44h-0.997v1.728h0.997c1.081,0,1.993,0.751,1.993,1.64c0,0.904-0.866,1.64-1.931,1.64 c-0.962,0-1.784-0.61-1.914-1.418L17,26.802c0.262,1.636,1.81,2.87,3.6,2.87c2.007,0,3.64-1.511,3.64-3.368 C24.24,25.281,23.736,24.363,22.943,23.745z"
          />
          <polygon
            fill="#fbc02d"
            points="34,42 14,42 13,38 14,34 34,34 35,38"
          />
          <polygon
            fill="#4caf50"
            points="38,35 42,34 42,14 38,13 34,14 34,34"
          />
          <path
            fill="#1e88e5"
            d="M34,14l1-4l-1-4H9C7.343,6,6,7.343,6,9v25l4,1l4-1V14H34z"
          />
          <polygon fill="#e53935" points="34,34 34,42 42,34" />
          <path fill="#1565c0" d="M39,6h-5v8h8V9C42,7.343,40.657,6,39,6z" />
          <path fill="#1565c0" d="M9,42h5v-8H6v5C6,40.657,7.343,42,9,42z" />
        </svg>
        Add To Calender
      </button>
      {/* <button id="signout_button" onClick={handleSignoutClick}>
        Sign Out
      </button> */}
    </div>
  );
};

export default AddEventGoogleCalender;
