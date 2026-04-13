"use client";

import { Menu } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./reuseable-components/language-switcher";
import { useAuthUser } from "./providers/AuthUserProvider";
import { useMutation } from "@tanstack/react-query";
import axiosApi from "@/config/axiosInstance";
import { toast } from "sonner";
import { usePathname } from "next/navigation";



interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
    signout: {
      title: "Sign out",
      url: "/sign-out";
    }
  };
}

const Navbar1 = ({
  logo = {
    url: "/home",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "home" },

    {
      title: "Invoices",
      url: "invoices",
    },
    {
      title: "Users",
      url: "/users",
    },
    {
      title: "Blog",
      url: "#",
    },
  ],
  auth = {
    login: { title: "Login", url: "/sign-in" },
    signup: { title: "Sign up", url: "/sign-up" },
    signout: { title: "Sign out", url: "/sign-out" },
  },
  className,
}: Navbar1Props) => {
  const pathname = usePathname();

  const { user, setUser } = useAuthUser();

  console.log(user)
  //  ======================== Sign Out Mutation ======================== \\
  const signOut = useMutation({
    mutationFn: async () => {
      const res = await axiosApi.post("/api/auth/sign-out");
      return res.data;
    },
    onSuccess: () => {
      setUser(null);
      toast.success("Sign out successful!", {
        position: "top-center",
      });

    },
    onError: () => {
      toast.error("Sign out failed. Please try again.", {
        position: "top-center",
      });
    },
  });

  const handleSignOut = () => {
    signOut.mutate();
  };

  return (
    <section className={cn("py-4 px-10", className)}>
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex w-full mx-auto">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item, pathname))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Auth Buttons */}
          <div className="flex gap-2">
            <LanguageSwitcher />
            {
              user ?
                (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    disabled={signOut.isPending}
                  >
                    {signOut.isPending ? "Signing out..." : auth.signout.title}
                  </Button>
                )
                :
                (
                  <Button asChild variant="outline" size="sm">
                    <a href={auth.login.url}>{auth.login.title}</a>
                  </Button>
                )
            }


            {/* <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button> */}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item, pathname))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center">
                      <LanguageSwitcher />
                    </div>
                    {user ? (
                      <Button
                        variant="outline"
                        onClick={handleSignOut}
                        disabled={signOut.isPending}
                      >
                        {signOut.isPending ? "Signing out..." : auth.signout.title}
                      </Button>
                    ) : (
                      <Button asChild variant="outline">
                        <a href={auth.login.url}>{auth.login.title}</a>
                      </Button>
                    )}
                    {/* <Button asChild>
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button> */}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const normalizePath = (url: string) => {
  if (!url || url.startsWith("#") || url.startsWith("http")) {
    return "";
  }

  const withSlash = url.startsWith("/") ? url : `/${url}`;
  return withSlash.replace(/\/$/, "") || "/";
};

const isActivePath = (currentPath: string, itemUrl: string) => {
  const normalizedCurrent = (currentPath || "/").replace(/\/$/, "") || "/";
  const normalizedItem = normalizePath(itemUrl);

  if (!normalizedItem) {
    return false;
  }

  if (normalizedCurrent === normalizedItem) {
    return true;
  }

  return normalizedCurrent.startsWith(`${normalizedItem}/`);
};

const renderMenuItem = (item: MenuItem, pathname: string) => {
  if (item.items) {
    const isGroupActive = item.items.some((subItem) => isActivePath(pathname, subItem.url));

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger
          className={cn(isGroupActive && "bg-muted text-primary")}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} pathname={pathname} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  const isActive = isActivePath(pathname, item.url);

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground",
          isActive && "bg-muted text-primary"
        )}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, pathname: string) => {
  if (item.items) {
    const isGroupActive = item.items.some((subItem) => isActivePath(pathname, subItem.url));

    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger
          className={cn(
            "text-md py-0 font-semibold hover:no-underline",
            isGroupActive && "text-primary"
          )}
        >
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} pathname={pathname} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  const isActive = isActivePath(pathname, item.url);

  return (
    <a
      key={item.title}
      href={item.url}
      className={cn("text-md font-semibold", isActive && "text-primary")}
    >
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item, pathname }: { item: MenuItem; pathname: string }) => {
  const isActive = isActivePath(pathname, item.url);

  return (
    <a
      className={cn(
        "flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground",
        isActive && "bg-muted text-primary"
      )}
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };
