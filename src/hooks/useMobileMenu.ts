import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleMobileMenu } from "@/redux/layout";
import { useLocation } from "react-router-dom";

const useMobileMenu = (): [boolean, (val: boolean) => void] => {
  const dispatch = useDispatch();
  const mobileMenu = useSelector((state: any) => state.layout.mobileMenu);
  const location = useLocation();

  // ** Toggles Mobile Menu
  const setMobileMenu = (val: boolean) => dispatch(handleMobileMenu(val));

  return [mobileMenu, setMobileMenu];
};

export default useMobileMenu;