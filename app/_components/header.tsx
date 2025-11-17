import Image from "next/image";

import SidebarButton from "./sidebar-button";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white px-3 pt-6">
      <Image src="/logo.svg" alt="Aparatus" width={100} height={26.09} />
      <div className="flex gap-2">
        <SidebarButton />
      </div>
    </header>
  );
};

export default Header;
