import {
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { NavLink } from "react-router-dom";
import { HistoryIcon, HomeIcon, UserIcon } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function TopNav() {
    const { isAuthenticated, user, logout } = useAuth0();

    return (
        <div className="w-full mb-5 flex items-center justify-center">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>
                        <HomeIcon size={18} />
                        <NavLink className="ml-2 text-sm font-bold" to="/">
                            Home
                        </NavLink>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <HistoryIcon size={18} />
                        <NavLink className="ml-2 text-sm font-bold" to="history">
                            History
                        </NavLink>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    {isAuthenticated && (
                        <>
                            <MenubarTrigger>
                                <UserIcon size={18} className="mr-2" />
                                Profiles
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarGroup className="flex justify-center">
                                    <MenubarItem>
                                        <Avatar>
                                            <AvatarImage src={user?.picture} />
                                            <AvatarFallback>User</AvatarFallback>
                                        </Avatar>
                                    </MenubarItem>
                                    <MenubarItem>{user?.email} </MenubarItem>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarItem
                                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                    className="text-red-500"
                                    inset
                                >
                                    Log Out
                                </MenubarItem>
                            </MenubarContent>
                        </>
                    )}
                </MenubarMenu>
            </Menubar>
        </div>
    );
}

export default TopNav;
