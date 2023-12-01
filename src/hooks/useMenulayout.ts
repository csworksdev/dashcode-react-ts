import { useSelector, useDispatch } from "react-redux";
import { handleType } from "@/redux/layout";

const useMenuLayout = (): [string, (value: string) => void] => {
  const dispatch = useDispatch();
  const menuType = useSelector((state: any) => state.layout.type);

  const setMenuLayout = (value: string): void => {
    dispatch(handleType(value));
  };

  return [menuType, setMenuLayout];
};

export default useMenuLayout;