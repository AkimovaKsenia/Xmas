import { useTypedSelector } from "@/app/hooks/useTypedSelector";

export const useCarousel = () => useTypedSelector((state) => state.carousel);
