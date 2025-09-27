import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="col-span-8 grid grid-cols-subgrid items-center"
      role="banner"
    >
      <h1 className="col-span-1 text-2xl font-extrabold">lateral.gg</h1>
      <nav
        className="col-span-5 col-start-3 justify-self-center"
        role="navigation"
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/events">Events</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/calendar">Calendar</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/community">Community</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <Icon
        className="col-span-1 justify-self-end text-2xl"
        icon="ph:user-light"
        role="button"
      />
    </header>
  );
}
