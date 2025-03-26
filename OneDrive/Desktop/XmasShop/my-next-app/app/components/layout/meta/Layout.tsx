import { FC, PropsWithChildren } from "react";
import styles from "./layout.module.scss";
import Header from "../header/Header";

const Layout: FC<PropsWithChildren> = ({ children, ...rest }) => {
  return (
    <div className={styles.layout}>
      <main>
        <section className={styles.content}>{children}</section>
      </main>
    </div>
  );
};
export default Layout;
