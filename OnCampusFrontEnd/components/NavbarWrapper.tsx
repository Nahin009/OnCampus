import React from 'react'
import  {NavbarDark}  from './Navbar'
import GET from '@/server_actions/GET'
import { getAccessToken } from '@/utils/sessionTokenAccessor'
const NavbarWrapper = async() => {
  const token = await getAccessToken()
  if(!token){
      return (
          <div>Not authorized</div>
      )
  }
  const user = await GET('user/getUser')
  const res = await GET('post/getNotification/new')
  return (
    <>
        <NavbarDark user={user} notifications={res?res.newNotifications:null}/>
    </>
  )
}

export default NavbarWrapper