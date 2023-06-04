import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "@components/User";


const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <h1>Client Session</h1>
      <div>{JSON.stringify(session)}</div>
      <User />
    </>
  )
}

export default Home