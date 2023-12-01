import { handleSemiDarkMode } from "@/redux/layout";
import { useSelector, useDispatch } from "react-redux";

const useSemiDark = (): [boolean, (val: boolean) => void] => {
  const dispatch = useDispatch();
  const isSemiDark = useSelector((state: any) => state.layout.semiDarkMode);

  const setSemiDark = (val: boolean) => dispatch(handleSemiDarkMode(val));

  return [isSemiDark, setSemiDark];
};

export default useSemiDark;