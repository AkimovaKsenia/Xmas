import { FC, PropsWithChildren } from "react";
import cn from "clsx";

const Heading: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <h1
      className={cn(
        "font-black text-[#568E73] text-6xl w-3/5 ml-auto",
        className
      )}
    >
      {children}
    </h1>
  );
};
export default Heading;
