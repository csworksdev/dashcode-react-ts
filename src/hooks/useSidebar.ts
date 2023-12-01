import { useSelector, useDispatch } from "react-redux";
import { handleSidebarCollapsed } from "@/redux/layout";

type SidebarCollapsedTypes = { payload: any; type: "layout/handleSidebarCollapsed"; }

const useSidebar = (): [boolean, (val: boolean) => void] => {
  const dispatch = useDispatch();
  const collapsed = useSelector((state: any) => state.layout.isCollapsed);

  // ** Toggles Menu Collapsed
  const setMenuCollapsed = (val: boolean): SidebarCollapsedTypes => dispatch(handleSidebarCollapsed(val));

  return [collapsed, setMenuCollapsed];
};

export default useSidebar;