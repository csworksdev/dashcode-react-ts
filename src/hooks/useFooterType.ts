import { useSelector, useDispatch } from "react-redux";
import { handleFooterType } from "@/redux/layout";

const useFooterType = (): [string, (val: string) => void] => {
  const dispatch = useDispatch();
  const footerType = useSelector((state: any) => state.layout.footerType);
  const setFooterType = (val: string) => dispatch(handleFooterType(val));
  return [footerType, setFooterType];
};

export default useFooterType;