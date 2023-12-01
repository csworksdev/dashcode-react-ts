import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleSkin } from "@/redux/layout";

type SkinTypes = { payload: any; type: "layout/handleSkin"; }

const useSkin = (skins?: string): [string, (mod: string) => void] => {
  const dispatch = useDispatch();
  const skin = useSelector((state: any) => state.layout.skin);

  const setSkin = (mod: string): SkinTypes => dispatch(handleSkin(mod));

  useEffect(() => {
    const body = window.document.body;
    const classNames = {
      default: "skin--bordered",
      bordered: "skin--bordered",
    };

    if (skin === "default") {
      body.classList.add(classNames.bordered);
      body.classList.remove(classNames.default);
    } else if (skin === "bordered") {
      body.classList.add(classNames.bordered);
      body.classList.remove(classNames.default);
    }
  }, [skin]);

  return [skin, setSkin];
};

export default useSkin;