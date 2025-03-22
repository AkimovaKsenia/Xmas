import { FC } from "react";

import Menu from "./menu/Menu";
import SearchComponent from "./search/Search";
import Cart from "./cart/Cart";
import styles from "./Header.module.scss";
const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Menu />
      <SearchComponent />
      <Cart />
    </header>
  );
};
export default Header;
