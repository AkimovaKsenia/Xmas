import { FC } from "react";
import { IMenuLink } from "./menu-item.interface";
import Link from "next/link";

interface IMenuItem {
  item: IMenuLink;
}

const MenuItem: FC<IMenuItem> = ({ item }) => {
  return (
    <li>
      <Link className="uppercase tracking-widest" href={item.link}>
        {item.name}
      </Link>
    </li>
  );
};

export default MenuItem;
