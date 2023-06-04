"use client";

import { useSession } from "next-auth/react"


const User = () => {
    const { data: session, status, update } = useSession();


  return (
    <div><p>Signed in as {JSON.stringify(session)}</p></div>
  )
}

export default User