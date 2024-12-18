'use client';
import React from 'react'
import { Button } from "../components/Mat_tail_export";

const Client = ({e,GET}:{e:string,GET:(e:string)=>void}) => {
  return (
    <div>
        <Button onClick={() => GET(e)} placeholder={undefined}>GET request</Button>
    </div>
  )
}

export default Client