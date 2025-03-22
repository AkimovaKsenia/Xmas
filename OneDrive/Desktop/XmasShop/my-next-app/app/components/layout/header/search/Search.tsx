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
        style={{
          boxShadow: "none", // убираем тень
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#008D64"; // меняем цвет рамки при фокусе
        }}
        onBlur={(e) => {
          e.target.style.borderColor = ""; // возвращаем стандартный цвет рамки при потере фокуса
        }}
      />
    </div>
  );
};
export default SearchComponent;
