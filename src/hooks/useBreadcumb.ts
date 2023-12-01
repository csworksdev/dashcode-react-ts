import { useSelector, useDispatch } from "react-redux";
import { handleBreadcumb } from "@/redux/layout";

type PayloadTypes = { payload: any; type: "layout/handleBreadcumb"; }

const useBreadcumb = (): [BreadcumbType[], (val: BreadcumbType[]) => void] => {
  const dispatch = useDispatch();
  const Breadcumb: BreadcumbType[] = useSelector((state: any) => state.layout.breadcumb);

  // ** Toggles Content Width
  const setBreadcumb = (val: BreadcumbType[]): PayloadTypes => dispatch(handleBreadcumb(val));

  return [Breadcumb, setBreadcumb];
};

export default useBreadcumb;