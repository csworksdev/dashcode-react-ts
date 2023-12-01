import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import useSidebar from "@/hooks/useSidebar";
import useSkin from "@/hooks/useSkin";
import { FiAlignLeft, FiMenu } from "react-icons/fi";

const SidebarLogo: React.FC<{ menuHover: boolean }> = ({ menuHover }) => {
  const [collapsed, setMenuCollapsed] = useSidebar();
  const [skin] = useSkin();
  const [mode] = useDarkMode();

  return (
    <div
      className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] px-4 
      ${menuHover ? "logo-hovered" : ""}
      ${
        skin === "bordered"
          ? " border-b border-r-0 border-slate-200 dark:border-slate-700"
          : " border-none"
      }
      
      `}
    >
      <Link to="/dashboard">
        <div className="flex items-center space-x-4">
          {/* <div className="logo-icon">
            {!isDark && !isSemiDark ? (
              <img className="main-sidebar-logo" src={Logo} alt="" />
            ) : (
              <img src={Logo} alt="" />
            )}
          </div> */}

          {(!collapsed || menuHover) && (
            <div>
              {
                mode ?
                <img className="css-ma-fma-wf-aw2" src="/assets/images/new-logo-text-white.png" alt="" /> :
                // <img className="css-ma-fma-wf-aw2" src="/assets/images/logo-white.png" alt="" /> :
                // <img className="css-ma-fma-wf-aw2" src="/assets/images/logo-1.png" alt="" />
                <img className="css-ma-fma-wf-aw2" src="/assets/images/new-logo-text-black.png" alt="" />
              }
              {/* <h1 className="main-sidebar-logo-text font-bold text-slate-900 dark:text-slate-100">
                SIPD
              </h1> */}
            </div>
          )}
        </div>
      </Link>

      {(!collapsed || menuHover) && (
        <div onClick={() => setMenuCollapsed(!collapsed)} className={`css-ja-fj-awj-3`}>
			{
				collapsed ? 
				<FiMenu size={25} /> : 
				<FiAlignLeft size={25} />
			}
		</div>
      )}
    </div>
  );
};

export default SidebarLogo;