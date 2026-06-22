export const lightColors: ColorTheme = {
    primary: "#FF4F8F",
    primaryVariant: "#D93F76",
    secondary: "#00BFB0",
    background: "#F7F6FF",
    backgroundSecondary: "#FFFFFF",
    favIconInactive: "rgba(26,22,56,0.35)",
    textPrimary: "#1A1638",
    textSecondary: "#5F5A86",
    textLight: "#8A86A8",
    offer1Background: "#6B70E9",
    error: "#FF3B30",
    white: "#FFFFFF",
    black: "#000000",
    success: "#34C759",
    sale: "#FF3B30",
    new: "#007AFF",
    featured: "#f4b71d",
    default: "#E9E7F5",
    bottomNavMenuBackground: "#FFFFFF",
    bottomNavigationBackground: "#FFFFFF",
    bottomNavigationActiveTint: "#FF4F8F",
    searchIconBackground: "#F1EEFF",
    bottomNavActiveLabel: "#FF4F8F",
    bottomNavInactiveLabel: "#8A86A8",
    menuButton: "#1A1638",
    favIconActive: "#FF5A8B",
    favBorderActive: "rgba(255,255,255,0.7)",
    favBorderInactive: "rgba(255,255,255,0.75)",
    backgroundOverlay: "rgba(5, 5, 14, 0.38)",
    heroImageOverlay: "rgba(0,0,0,0.18)",
    backButtonOverlay: "rgba(26,22,56,0.55)",
    surfaceBorder: "rgba(26,22,56,0.08)",
    rsvpSurface: "rgba(26,22,56,0.10)",
    rsvpSurfaceBorder: "rgba(26,22,56,0.12)",
    tagBackground: "rgba(127, 110, 255, 0.97)",
    tagBorder: "rgba(26,22,56,0.08)"

};

export const darkColors: ColorTheme = {
    primary: "#FF4F8F",
    primaryVariant: "#E64682",
    secondary: "#1BEAD6",
    background: "#08051F",
    backgroundSecondary: "#17133B",
    favIconInactive: "rgba(255,255,255,0.5)",
    textPrimary: "#F5F3FF",
    textSecondary: "#B4AED8",
    offer1Background: "#4E54D9",
    error: "#FF453A",
    white: "#FFFFFF",
    textLight: "#8F89BA",
    black: "#000000",
    success: "#30D158",
    sale: "#FF453A",
    new: "#0A84FF",
    featured: "#f4b71d",
    bottomNavMenuBackground: "#17133B",
    bottomNavigationBackground: "#17133B",
    bottomNavigationActiveTint: "#FF4F8F",
    searchIconBackground: "#221C4D",
    bottomNavActiveLabel: "#FF4F8F",
    bottomNavInactiveLabel: "#8F89BA",
    menuButton: "#F5F3FF",
    default: "#E3E3E3",
    favIconActive: "#FF5A8B", 
    favBorderActive: "rgba(255,255,255,0.25)"  ,
    favBorderInactive: "rgba(255,255,255,0.55)",
    backgroundOverlay: "rgba(5, 5, 14, 0.45)",
    heroImageOverlay: "rgba(0,0,0,0.2)",
    backButtonOverlay: "rgba(0,0,0,0.45)",
    surfaceBorder: "rgba(255,255,255,0.08)",
    rsvpSurface: "rgba(255,255,255,0.13)",
    rsvpSurfaceBorder: "rgba(255,255,255,0.12)",
    tagBackground: "rgba(125,114,212,0.2)",
    tagBorder: "rgba(255,255,255,0.07)"
}; 

export interface ColorTheme {
    primary: string;
    primaryVariant: string;
    secondary: string;
    background: string;
    backgroundSecondary: string;
    favIconInactive: string;
    textPrimary: string;
    textSecondary: string;
    textLight: string;
    offer1Background: string;
    error: string;
    white: string;
    black: string;
    success: string;
    sale: string;
    new: string;
    featured: string;
    default: string;
    bottomNavMenuBackground: string;
    bottomNavigationBackground: string;
    bottomNavigationActiveTint: string;
    searchIconBackground: string;
    bottomNavActiveLabel: string;
    bottomNavInactiveLabel: string;
    menuButton: string;
    favIconActive: string;
    favBorderActive: string;
    favBorderInactive: string;
    backgroundOverlay: string;
    heroImageOverlay: string;
    backButtonOverlay: string;
    surfaceBorder: string;
    rsvpSurface: string;
    rsvpSurfaceBorder: string;
    tagBackground: string;
    tagBorder: string;
} 