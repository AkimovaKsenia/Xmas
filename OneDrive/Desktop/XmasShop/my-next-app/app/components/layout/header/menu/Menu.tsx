import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuItem from "./menu-item/MenuItem";
import { menu } from "./menu.data";

import styles from "./Menu.module.scss";

const Menu: FC = () => {
  return (
    <div className={styles.menu}>
      <Link href="/">
        <Image
          src="/logo.jpg"
          alt="Xmas"
          width={100}
          height={100}
          className="rounded-full overflow-hidden border-1 shadow-lg ml-4"
        />
      </Link>

      <nav>
        <ul className="flex items-center gap-4">
          {menu.map((item) => (
            <MenuItem key={item.link} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default Menu;
