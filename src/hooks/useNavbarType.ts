import { useSelector, useDispatch } from "react-redux";
import { handleNavBarType } from "@/redux/layout";

const useNavbarType = (): [string, (val: string) => void] => {
  const dispatch = useDispatch();
  const navbarType = useSelector((state: any) => state.layout.navBarType);
  const setNavbarType = (val: string) => dispatch(handleNavBarType(val));
  return [navbarType, setNavbarType];
};

export default useNavbarType;