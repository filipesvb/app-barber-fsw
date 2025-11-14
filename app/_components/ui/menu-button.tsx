import { MenuIcon } from "lucide-react";
import { Button } from "./button";

const MenuButton = ({ className }: { className?: string }) => {
  return (
    <Button variant={"outline"} size={"icon"} className={` ${className}`}>
      <MenuIcon />
    </Button>
  );
};

export default MenuButton;
