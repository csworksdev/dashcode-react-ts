import { useSelector, useDispatch } from "react-redux";
import { handleContentWidth } from "@/redux/layout";

type ContentWidthTypes = { payload: any; type: "layout/handleContentWidth"; }

const useContentWidth = (): [string, (val: string) => void] => {
  const dispatch = useDispatch();
  const contentWidth = useSelector((state: any) => state.layout.contentWidth);

  // ** Toggles Content Width
  const setContentWidth = (val: string): ContentWidthTypes => dispatch(handleContentWidth(val));

  return [contentWidth, setContentWidth];
};

export default useContentWidth;