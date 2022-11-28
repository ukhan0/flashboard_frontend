/* Sidebar */
export const SET_SIDEBAR_SHADOW = 'THEME_OPTIONS/SET_SIDEBAR_SHADOW';
export const SET_SIDEBAR_TOGGLE_MOBILE = 'THEME_OPTIONS/SET_SIDEBAR_TOGGLE_MOBILE';
export const SET_SIDEBAR_FIXED = 'THEME_OPTIONS/SET_SIDEBAR_FIXED';
export const SET_SIDEBAR_TOGGLE = 'THEME_OPTIONS/SET_SIDEBAR_TOGGLE';
export const SET_SIDEBAR_USERBOX = 'THEME_OPTIONS/SET_SIDEBAR_USERBOX';
export const SET_SIDEBAR_HOVER = 'THEME_OPTIONS/SET_SIDEBAR_HOVER';
export const SET_SIDEBAR_DISPLAY = 'THEME_OPTIONS/SET_SIDEBAR_DISPLAY';

export const setSidebarShadow = sidebarShadow => ({
  type: SET_SIDEBAR_SHADOW,
  sidebarShadow
});
export const setSidebarToggleMobile = sidebarToggleMobile => ({
  type: SET_SIDEBAR_TOGGLE_MOBILE,
  sidebarToggleMobile
});
export const setSidebarFixed = sidebarFixed => ({
  type: SET_SIDEBAR_FIXED,
  sidebarFixed
});
export const setSidebarToggle = sidebarToggle => ({
  type: SET_SIDEBAR_TOGGLE,
  sidebarToggle
});
export const setSidebarUserbox = sidebarUserbox => ({
  type: SET_SIDEBAR_USERBOX,
  sidebarUserbox
});
export const setSidebarHover = sidebarHover => ({
  type: SET_SIDEBAR_HOVER,
  sidebarHover
});
export const setSidebarDisplay = showSidebar => ({
  type: SET_SIDEBAR_DISPLAY,
  showSidebar
});

/* Header */
export const SET_HEADER_FIXED = 'THEME_OPTIONS/SET_HEADER_FIXED';
export const SET_HEADER_SHADOW = 'THEME_OPTIONS/SET_HEADER_SHADOW';

export const setHeaderFixed = headerFixed => ({
  type: SET_HEADER_FIXED,
  headerFixed
});
export const setHeaderShadow = headerShadow => ({
  type: SET_HEADER_SHADOW,
  headerShadow
});

/* Main content */
export const SET_CONTENT_BACKGROUND = 'THEME_OPTIONS/SET_CONTENT_BACKGROUND';

export const setContentBackground = contentBackground => ({
  type: SET_CONTENT_BACKGROUND,
  contentBackground
});

/* Footer */
export const SET_FOOTER_FIXED = 'THEME_OPTIONS/SET_FOOTER_FIXED';
export const SET_FOOTER_SHADOW = 'THEME_OPTIONS/SET_FOOTER_SHADOW';

export const setFooterFixed = footerFixed => ({
  type: SET_FOOTER_FIXED,
  footerFixed
});
export const setFooterShadow = footerShadow => ({
  type: SET_FOOTER_SHADOW,
  footerShadow
});

export default function reducer(
  state = {
    /* Sidebar */
    sidebarShadow: false,
    sidebarFixed: true,
    sidebarToggleMobile: true,
    sidebarUserbox: true,
    sidebarToggle: true,
    sidebarHover: false,
    showSidebar: true,

    /* Header */
    headerFixed: true,
    headerShadow: true,

    /* Main content */
    contentBackground: '',

    /* Footer */
    footerFixed: false,
    footerShadow: false,
  },
  action
) {
  switch (action.type) {
    /* Sidebar */
    case SET_SIDEBAR_SHADOW:
      return {
        ...state,
        sidebarShadow: action.sidebarShadow
      };
    case SET_SIDEBAR_FIXED:
      return {
        ...state,
        sidebarFixed: action.sidebarFixed
      };
    case SET_SIDEBAR_TOGGLE_MOBILE:
      return {
        ...state,
        sidebarToggleMobile: action.sidebarToggleMobile
      };
    case SET_SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebarToggle: action.sidebarToggle
      };
    case SET_SIDEBAR_HOVER:
      return {
        ...state,
        sidebarHover: action.sidebarHover
      };
    case SET_SIDEBAR_DISPLAY:
      return {
        ...state,
        showSidebar: action.showSidebar,
        sidebarToggle: !action.showSidebar
      };
    case SET_SIDEBAR_USERBOX:
      return {
        ...state,
        sidebarUserbox: action.sidebarUserbox
      };

    /* Header */
    case SET_HEADER_FIXED:
      return {
        ...state,
        headerFixed: action.headerFixed
      };
    case SET_HEADER_SHADOW:
      return {
        ...state,
        headerShadow: action.headerShadow
      };

    /* Main content */
    case SET_CONTENT_BACKGROUND:
      return {
        ...state,
        contentBackground: action.contentBackground
      };

    /* Footer */
    case SET_FOOTER_FIXED:
      return {
        ...state,
        footerFixed: action.footerFixed
      };
    case SET_FOOTER_SHADOW:
      return {
        ...state,
        footerShadow: action.footerShadow
      };

    default:
      break;
  }
  return state;
}
