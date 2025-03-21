import { FC } from "react";
import Header from "../../layout/header/Header";

const Home: FC = () => {
  return (
    <div>
      <Header /> {/* 🔹 Вставляем Header */}
      <div className="text-3xl font-bold text-green-300">Tailwind</div>
    </div>
  );
};

export default Home;
