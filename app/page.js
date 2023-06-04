import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";


const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>{JSON.stringify(session)}</div>
  )
}

export default Home