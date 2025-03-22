import { FC, useState } from "react";
import styles from "./Search.module.scss";
import { Input } from "antd";

const { Search } = Input;
const SearchComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={styles.search}>
      <Search
        placeholder="Your Change..."
        loading
        enterButton
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
  );
};
export default SearchComponent;
