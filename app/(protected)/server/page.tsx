
// rafc

import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";



const ServerPage = async () => {
    // burdan geldi cunku session.data? -- hookda
    const user = await currentUser();


  return (
    <UserInfo 
    user={user}
    label="💻 Genel Bilgiler"
    />
  )
}

export default ServerPage;