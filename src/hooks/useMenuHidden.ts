import { useSelector, useDispatch } from "react-redux";
import { handleMenuHidden } from "@/redux/layout";

const useMenuHidden = (): [boolean, (value: boolean) => void] => {
  const dispatch = useDispatch();
  const menuHidden = useSelector((state: any) => state.layout.menuHidden);

  const setMenuHidden = (value: boolean): void => {
    dispatch(handleMenuHidden(value));
  };

  return [menuHidden, setMenuHidden];
};

export default useMenuHidden;