import { Dispatch, FC, SetStateAction } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./Sorting.module.scss";
import { EnumSorting } from "./sorting.interface";
import { sortingData } from "./sorting.data";
import { FaSnowflake, FaStar, FaRegStar, FaSplotch } from "react-icons/fa";

const { SubMenu, Item } = Menu;

interface ISorting {
  sortType: EnumSorting;
  setSortType: Dispatch<SetStateAction<EnumSorting>>;
}
const Sorting: FC<ISorting> = ({ sortType, setSortType }) => {
  const handleClick = (key: string) => {
    console.log("Clicked option:", key);
    // Добавьте здесь свою логику для каждого пункта
  };

  return (
    <Menu
      className="absolute top-25 left-0" // Сдвигаем на 4px вниз от верхней границы контейнера
      style={{
        width: 150,
        zIndex: 1, // Убедитесь, что меню выше других элементов
      }}
      mode="vertical"
    >
      <SubMenu
        className={styles.container}
        style={{ color: "#568E73" }}
        key="sub2"
        icon={<FaRegStar style={{ color: "#568E73" }} />}
        title={
          <span
            className={styles.title}
            style={{ color: "#568E73", fontWeight: 700, fontSize: 16 }}
          >
            {sortingData.find((sort) => sort.value == sortType)?.label}
          </span>
        }
        popupClassName="custom-submenu-popup"
      >
        {sortingData.map((sort) => (
          <Item key={sort.value} onClick={() => setSortType(sort.value)}>
            {sort.label}
          </Item>
        ))}
      </SubMenu>
    </Menu>
  );
};

export default Sorting;
