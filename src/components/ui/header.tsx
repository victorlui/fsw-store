"use client";
import { MouseEventHandler } from "react";
import {
  HomeIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar } from "./avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "./separator";

const Header: React.FC = () => {
  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  const renderButton = (
    label: string,
    clickVery: MouseEventHandler<HTMLButtonElement>,
  ) => {
    return (
      <Button
        variant="outline"
        className="w-full gap-2 text-left"
        onClick={clickVery}
      >
        <LogInIcon size={16} />
        {label}
      </Button>
    );
  };

  function verifyUserLogged() {
    switch (status) {
      case "authenticated":
        return renderButton("Fazer Logout", handleLogoutClick);

      case "unauthenticated":
        return renderButton("Fazer Login", handleLoginClick);

      default:
        return null;
    }
  }

  return (
    <Card className="flex items-center justify-between p-[2rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data?.user?.name?.[0].toLocaleUpperCase()}
                  </AvatarFallback>

                  {data?.user?.image && <AvatarImage src={data?.user?.image} />}
                </Avatar>

                <p className="font-medium">{data.user.name}</p>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-2 flex flex-col gap-3">
            {verifyUserLogged()}

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <HomeIcon size={16} />
              Início
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <PercentIcon size={16} />
              Ofertas
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <PercentIcon size={16} />
              Catálogo
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold">
        <span className="text-primary">FSW </span>Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Header;
