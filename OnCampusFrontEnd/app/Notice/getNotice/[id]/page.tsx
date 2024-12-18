import React, { use } from 'react'
import { getAccessToken } from '@/utils/sessionTokenAccessor'
import POST from '@/server_actions/POST'
import SingleNotice from '@/components/getNotice/SingleNotice'
const GetNotice = async({ params }: { params: { id: string } }) => {
    const token = await getAccessToken()
    if(!token){
        return (
            <div>Not authorized</div>
        )
    }
    const notice = await POST('event/notice/getNotice', {id: params.id})
    if(!notice){
        return (
            <div>Notice not found</div>
        )
    }

  return (
    <SingleNotice notice={notice}/>
  )
}

export default GetNotice