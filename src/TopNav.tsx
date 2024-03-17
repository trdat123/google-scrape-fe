import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { NavLink } from "react-router-dom";

const TopNav = () => {
    return (
        <div className="w-full h-28 flex items-center justify-center">
            <NavigationMenu className="flex items-center justify-center">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavLink className="text-sm font-bold mx-3" to="home">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home page</NavigationMenuLink>
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink className="text-sm font-bold mx-3" to="history">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>History</NavigationMenuLink>
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default TopNav;
