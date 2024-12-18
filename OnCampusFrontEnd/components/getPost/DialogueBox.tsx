import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars4Icon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { ContextProvider } from "./SinglePost";
import POST from "@/server_actions/POST";
import GET from "@/server_actions/GET";
import { useRouter } from "next/navigation";

export function DialogueBox({
  author,
  type,
  pid,
  status,
  commentStatus,
}: {
  author: any;
  type: string;
  pid: string;
  status: boolean;
  commentStatus: boolean;
}) {
  const {
    intBy,
    changeIntBy,
    reportedBy,
    user,
    changeStatus,
    changeCommentStatus,
    changeDeleted,
  } = useContext(ContextProvider);

  var check = false;
  intBy.map((u) => {
    if (u.email == user.email) {
      check = true;
    }
  });
  const [isInt, setIsInt] = useState(check);

  var checkReport = false;
  reportedBy.map((u) => {
    if (u.email == user.email) {
      checkReport = true;
    }
  });
  const [isReport, setIsReport] = useState(checkReport);

  const [isOpened, setIsOpened] = useState(status);
  const [isCommentStatus, setIsCommentStatus] = useState(commentStatus);

  const router = useRouter()

  const handleInt = async () => {
    const res = await POST("post/int/", { id: pid, type: "int" });
    if (res) {
      changeIntBy([...intBy, user]);
    }
  };
  const handleUnInt = async () => {
    const res = await POST("post/int/", { id: pid, type: "unInt" });
    if (res) {
      changeIntBy(intBy.filter((u) => u.email != user.email));
    }
  };

  const handleReport = async () => {
    const res = await POST("post/report/", { id: pid, type: "report" });
    if (res) {
      console.log(res)
    }
  };
  const handleUnReport = async () => {
    const res = await POST("post/report/", { id: pid, type: "unReport" });
    if (res) {
      console.log(res)
    }
  };

  const handleOpen = async () => {
    const res = await POST("post/status/", { id: pid, type: "close" });
    if (res) {
      console.log(res);
      changeStatus(false);
    }
  };

  const handleClose = async () => {
    const res = await POST("post/status/", { id: pid, type: "open" });
    if (res) {
      console.log(res);
      changeStatus(true);
    }
  };

  const handleCommentStatusAllow = async () => {
    const res = await POST("post/commentStatus/", {
      id: pid,
      type: "disallow",
    });
    if (res) {
      console.log(res);
      changeCommentStatus(false);
    }
  };

  const handleCommentStatusDisallow = async () => {
    const res = await POST("post/commentStatus/", { id: pid, type: "allow" });
    if (res) {
      console.log(res);
      changeCommentStatus(true);
    }
  };

  return (
    <Menu>
      <MenuHandler>
        <Bars4Icon className="w-8 h-8 cursor-pointer" />
      </MenuHandler>
      <MenuList>
        {user.email == author.email ? (
          <>
            <MenuItem
              onClick={() => {
                if (isOpened) {
                  setIsOpened((prev) => !prev);
                  handleOpen();
                } else {
                  setIsOpened((prev) => !prev);
                  handleClose();
                }
              }}
            >
              {isOpened ? "Close post" : "Open post"}
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (isCommentStatus) {
                  setIsCommentStatus((prev) => !prev);
                  handleCommentStatusAllow();
                } else {
                  setIsCommentStatus((prev) => !prev);
                  handleCommentStatusDisallow();
                }
              }}
            >
              {isCommentStatus ? "Disallow comment" : "Allow comment"}
            </MenuItem>
            {isOpened ? <MenuItem
            onClick={()=>{
              router.push(`/updatePost/${pid}`)
            }}
            >Edit post</MenuItem> : ""}
          </>
        ) : (
          ""
        )}
        {user.email == author.email || user.role == "ADMIN" ? (
          <MenuItem
            onClick={async () => {
              const res = await GET(`post/deletePost/${pid}`);
              if (res) {
                changeDeleted(true);
              }
            }}
          >
            Delete post
          </MenuItem>
        ) : (
          ""
        )}
        {type == "TUITION" && isOpened ? (
          <>
            <MenuItem
              onClick={() => {
                if (isInt) {
                  setIsInt((prev) => !prev);
                  handleUnInt();
                } else {
                  setIsInt((prev) => !prev);
                  handleInt();
                }
              }}
            >
              {isInt ? "UnInt post" : "Int post"}
            </MenuItem>
          </>
        ) : (
          ""
        )}

        {isOpened ? (
          <>
            <MenuItem
              onClick={() => {
                if (isReport) {
                  setIsReport((prev) => !prev);
                  handleUnReport();
                } else {
                  setIsReport((prev) => !prev);
                  handleReport();
                }
              }}
            >
              {isReport ? "UnReport post" : "Report post"}
            </MenuItem>
          </>
        ) : (
          ""
        )}
      </MenuList>
    </Menu>
  );
}
