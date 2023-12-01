import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// theme config import
import themeConfig from "@/configs/themeConfig";

interface LayoutState {
  isRTL: boolean;
  darkMode: boolean;
  isCollapsed: boolean;
  customizer: any;
  semiDarkMode: boolean;
  skin: string;
  contentWidth: string;
  type: string;
  menuHidden: boolean;
  navBarType: string;
  footerType: string;
  mobileMenu: boolean;
  isMonochrome: boolean;
  breadcumb: any[];
}

const initialDarkMode = (): boolean => {
  const item = window.localStorage.getItem("darkMode");
  return item ? JSON.parse(item) : themeConfig.layout.darkMode;
};

const initialSidebarCollapsed = (): boolean => {
  const item = window.localStorage.getItem("sidebarCollapsed");
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed;
};

const initialSemiDarkMode = (): boolean => {
  const item = window.localStorage.getItem("semiDarkMode");
  return item ? JSON.parse(item) : themeConfig.layout.semiDarkMode;
};

const initialRtl = (): boolean => {
  const item = window.localStorage.getItem("direction");
  return item ? JSON.parse(item) : themeConfig.layout.isRTL;
};

const initialSkin = (): string => {
  const item = window.localStorage.getItem("skin");
  return item ? JSON.parse(item) : themeConfig.layout.skin;
};

const initialType = (): string => {
  const item = window.localStorage.getItem("type");
  return item ? JSON.parse(item) : themeConfig.layout.type;
};

const initialMonochrome = (): boolean => {
  const item = window.localStorage.getItem("monochrome");
  return item ? JSON.parse(item) : themeConfig.layout.isMonochrome;
};

const initialBreadcumb = (): BreadcumbType[] => {
  return [];
};

const initialState: LayoutState = {
  isRTL: initialRtl(),
  darkMode: initialDarkMode(),
  isCollapsed: initialSidebarCollapsed(),
  customizer: themeConfig.layout.customizer,
  semiDarkMode: initialSemiDarkMode(),
  skin: initialSkin(),
  contentWidth: themeConfig.layout.contentWidth,
  type: initialType(),
  menuHidden: themeConfig.layout.menu.isHidden,
  navBarType: themeConfig.layout.navBarType,
  footerType: themeConfig.layout.footerType,
  mobileMenu: themeConfig.layout.mobileMenu,
  isMonochrome: initialMonochrome(),
  breadcumb: initialBreadcumb(),
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    // handle dark mode
    handleDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      window.localStorage.setItem("darkMode", JSON.stringify(action.payload));
    },
    // handle sidebar collapsed
    handleSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
      window.localStorage.setItem("sidebarCollapsed", JSON.stringify(action.payload));
    },
    // handle customizer
    handleCustomizer: (state, action: PayloadAction<any>) => {
      state.customizer = action.payload;
    },
    // handle semiDark
    handleSemiDarkMode: (state, action: PayloadAction<boolean>) => {
      state.semiDarkMode = action.payload;
      window.localStorage.setItem("semiDarkMode", JSON.stringify(action.payload));
    },
    // handle rtl
    handleRtl: (state, action: PayloadAction<boolean>) => {
      state.isRTL = action.payload;
      window.localStorage.setItem("direction", JSON.stringify(action.payload));
    },
    // handle skin
    handleSkin: (state, action: PayloadAction<string>) => {
      state.skin = action.payload;
      window.localStorage.setItem("skin", JSON.stringify("bordered"));
      // window.localStorage.setItem("skin", JSON.stringify(action.payload));
    },
    // handle content width
    handleContentWidth: (state, action: PayloadAction<string>) => {
      state.contentWidth = action.payload;
    },
    // handle type
    handleType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
      window.localStorage.setItem("type", JSON.stringify(action.payload));
    },
    // handle menu hidden
    handleMenuHidden: (state, action: PayloadAction<boolean>) => {
      state.menuHidden = action.payload;
    },
    // handle navbar type
    handleNavBarType: (state, action: PayloadAction<string>) => {
      state.navBarType = action.payload;
    },
    // handle footer type
    handleFooterType: (state, action: PayloadAction<string>) => {
      state.footerType = action.payload;
    },
    handleMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.mobileMenu = action.payload;
    },
    handleMonoChrome: (state, action: PayloadAction<boolean>) => {
      state.isMonochrome = action.payload;
      window.localStorage.setItem("monochrome", JSON.stringify(action.payload));
    },
    handleBreadcumb: (state, action: PayloadAction<BreadcumbType[]>) => {
      state.breadcumb = action.payload;
    },
  },
});

export const {
  handleDarkMode,
  handleSidebarCollapsed,
  handleCustomizer,
  handleSemiDarkMode,
  handleRtl,
  handleSkin,
  handleContentWidth,
  handleType,
  handleMenuHidden,
  handleNavBarType,
  handleFooterType,
  handleMobileMenu,
  handleMonoChrome,
  handleBreadcumb,
} = layoutSlice.actions;

export default layoutSlice.reducer;