import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleDarkMode } from "@/redux/layout";

const useDarkmode = (): [boolean, (mode: boolean) => void] => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: any) => state.layout.darkMode);

  const setDarkMode = (mode: boolean): void => {
    dispatch(handleDarkMode(mode));
  };

  useEffect(() => {
    const body = window.document.body;
    const classNames = {
      dark: "dark",
      light: "light",
    };

    if (isDark) {
      body.classList.add(classNames.dark);
      body.classList.remove(classNames.light);
    } else {
      body.classList.add(classNames.light);
      body.classList.remove(classNames.dark);
    }
  }, [isDark]);

  return [isDark, setDarkMode];
};

export default useDarkmode;