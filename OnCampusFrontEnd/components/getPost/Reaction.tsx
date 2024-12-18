import { IconButton, Typography,  Chip,
  Dialog,
  DialogBody,
  DialogHeader,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix, } from "@material-tailwind/react";
import React from "react";
import AvatarImageText from "./AvatarImageText";
import { useContext } from "react";
import { ContextProvider } from "./SinglePost";
import POST from "@/server_actions/POST";
export default function Reaction({likedBy,type,id}: {likedBy: any[],type: string,id: string}) {
  const {user} = useContext(ContextProvider)
  
  var checker = false
  likedBy.map((u: any) => {
    if(u.email==user.email){
      checker = true
    }
  })
  const [isFavorite, setIsFavorite] = React.useState(checker);
  const [reactions, setReactions] = React.useState(likedBy);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleIsFavorite = async() => {
    if(isFavorite){
      setReactions(prev => prev.filter((u: any) => u.email!=user.email))
      setIsFavorite(prev=>!prev);
      const res = await POST("post/like/"+type,{
        uid: user.id,
        id: id,
        type: "dislike"
      })
      if(res){
        console.log(res);
      }
      
    }
    else{
      setReactions(prev=>  [user,...prev])
      setIsFavorite(prev=>!prev);
      const res = await POST("post/like/"+type,{
        uid: user.id,
        id: id,
        type: "like"
      })
      if(res){
        console.log(res);
      }
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2">
        <IconButton
          placeholder={""}
          variant="text"
          color={isFavorite ? "red" : "blue-gray"}
          onClick={handleIsFavorite}
        >
          {!isFavorite ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="red"
          className="w-8 h-8"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      )}
        </IconButton>
        <IconButton
          variant="text"
          className="rounded-full w-8 h-8"
          placeholder={undefined}
          onClick={() => handleOpen()}
        >
          <Chip value={reactions.length} variant="ghost" className="rounded-full" />
        </IconButton>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        placeholder={undefined}
      >
      <DialogHeader placeholder={undefined}>Reaction body</DialogHeader>
        <DialogBody placeholder={undefined}>
          <List placeholder={undefined}>
            {reactions.map((user: any, index: number) => (
              <ListItem key={index} placeholder={undefined}>
                <AvatarImageText user={user} />
              </ListItem>
            ))}
          </List>
        </DialogBody>
      </Dialog>
      
    </>
  );
}
