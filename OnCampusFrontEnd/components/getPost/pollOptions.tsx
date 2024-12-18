"use client";

import {
  Chip,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Progress
} from "@material-tailwind/react";

import AvatarImageText from "./AvatarImageText";
import {ContextProvider} from "./SinglePost";
import React from "react";
import { useContext } from "react";
import { CProvider } from "./poll";
import POST from "@/server_actions/POST";
export default function PollOptions({opt, index,options}: {opt: any, index: number,options: any[]}) {
  const [open, setOpen] = React.useState(false);
  const {user,status} = React.useContext(ContextProvider)
  const [option, setOption] = React.useState(opt);
  const { changeOptionStates} = useContext(CProvider)
  var checker = false
  option.votedBy.map((u: any) => {
    if(u.email==user.email){
      checker = true
    }
  })
  var totalVotes = 0
  
  options.map((o: any) => {
    totalVotes+=o.votedBy.length
  })
  const [selected, setSelected] = React.useState(checker);

  const handleSelected = async() => {
    if(!status){ 
      return
    }
    if(selected){
      setSelected(prev=>!prev);
      var t = [...options]
      t[index].votedBy = t[index].votedBy.filter((u: any) => u.email!=user.email)
      changeOptionStates(t)
      
      const res = await POST("post/vote/",{
        uid: user.id,
        id: option.optionID,
        type: "down"
      })
      if(res){
        console.log(res);
      }
    }
    else{
      setSelected(prev=>!prev);
      var t = [...options]
      t[index].votedBy.push(user)
      changeOptionStates(t)
      
      const res = await POST("post/vote/",{
        uid: user.id,
        id: option.optionID,
        type: "up"
      })
      if(res){
        console.log(res);
      }
    }
    
  };

  const handleOpen = () => setOpen(!open);
  return (
    <>
    <ListItem
      className="border-2 m-2 w-auto hover:shadow-md"
      placeholder={undefined}
      ripple={false}
    >
      <ListItemPrefix placeholder={undefined}>
        <IconButton
          variant= "text"
          className="rounded-full h-5 w-5"
          placeholder={undefined}
          onClick={() => handleSelected()}
        >
            {!selected ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
          </svg>
          
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
          
        )}
        </IconButton>
        <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          placeholder={undefined}
        >
          <DialogHeader placeholder={undefined}>Option Body</DialogHeader>
          <DialogBody placeholder={undefined}>
            <List placeholder={undefined}>
              {option.votedBy.map((user: any, index: number) => (
                <ListItem key={index} placeholder={undefined}>
                  <AvatarImageText user={user} />
                </ListItem>
              ))}
            </List>
          </DialogBody>
        </Dialog>
      </ListItemPrefix>
      <div className="w-1/2">
        {option.title}
      </div>
      
      <ListItemSuffix placeholder={undefined}>
        <IconButton
          variant="text"
          className="rounded-full w-8 h-8"
          placeholder={undefined}
          onClick={() => handleOpen()}
        >
          <Chip value={option.votedBy.length} variant="ghost" className="rounded-full" />
        </IconButton>
      </ListItemSuffix>
    </ListItem>
    <Progress className="" size="lg" value={ totalVotes==0? 0 :Math.round((option.votedBy.length/totalVotes)*100)} label={` `} />
    </>
  );
}
