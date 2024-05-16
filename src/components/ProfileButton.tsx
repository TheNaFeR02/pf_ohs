'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { signOut } from 'next-auth/react'


const ProfileButton = () => {

  const handleLogout = async () => {
    console.log("logged out")
    // await fetch(parseURL("/api/auth/logout/"), {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    // }).then((response) => {
    //   if (response.ok) {
    //     router.push("/")
    //   }
    // }).catch((error) => {
    //   console.log("Error while logging out!", error);
    // });

    // logOutProvider();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/13905276?v=4"
            alt="Avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton;