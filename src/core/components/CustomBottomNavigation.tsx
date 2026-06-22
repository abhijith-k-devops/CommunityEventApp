import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useTheme } from "../hooks/useTheme";
import { ColorTheme } from "../theme/Colors";
import CustomText, { CustomTextVariant } from "./CustomText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRSVP } from "../../presentation/viewmodels/hooks/useRSVP";

interface BottomNavigationProps {
    state: any;
    descriptors: any;
    navigation: any;
}

interface TabConfig {
    name: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
    activeIcon: React.ComponentProps<typeof Ionicons>["name"];
    label: string;
}

export default function CustomBottomNavigation({
    state,
    descriptors,
    navigation,
}: BottomNavigationProps) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = createStyles(colors, insets.bottom);
    const { events } = useRSVP();

    const tabConfig: TabConfig[] = [
        { name: "Home", icon: "compass-outline", activeIcon: "compass", label: "Discover" },
        { name: "MyEvents", icon: "bookmark-outline", activeIcon: "bookmark", label: "My Events" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                {state.routes.map((route: any, index: number) => {
                    const isFocused = state.index === index;
                    const config =
                        tabConfig.find((tab) => tab.name === route.name) ??
                        {
                            name: route.name,
                            icon: "ellipse-outline" as React.ComponentProps<typeof Ionicons>["name"],
                            activeIcon: "ellipse" as React.ComponentProps<typeof Ionicons>["name"],
                            label: descriptors[route.key]?.options?.title ?? route.name,
                        };

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            preventDefault: () => {},
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={[
                                styles.tab,
                                isFocused ? styles.tabActive : styles.tabInactive,
                            ]}
                            activeOpacity={0.8}
                        >
                            <View style={styles.iconWrapper}>
                                <Ionicons
                                    name={isFocused ? config.activeIcon : config.icon}
                                    size={22}
                                    color={
                                        isFocused
                                            ? colors.bottomNavActiveLabel
                                            : colors.bottomNavInactiveLabel
                                    }
                                />
                                {(route.name === "MyEvents" && events.length > 0) && (
                                    <View style={styles.badge}>
                                        <CustomText style={styles.badgeText}>{events.length}</CustomText>
                                    </View>
                                )}
                            </View>
                            <CustomText
                                variant={CustomTextVariant.SUBTEXT}
                                style={[
                                    isFocused ? styles.labelActive : styles.labelInactive,
                                ]}
                            >
                                {config.label}
                            </CustomText>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

function createStyles(colors: ColorTheme, insetBottom: number) {
    return StyleSheet.create({
        container: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.bottomNavigationBackground,
            paddingBottom: Math.max(insetBottom, 10),
            paddingHorizontal: 18,
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: "rgba(255,255,255,0.08)",
        },
        navBar: {
            flexDirection: "row",
            backgroundColor: "transparent",
            borderRadius: 0,
            paddingHorizontal: 0,
            paddingVertical: 0,
            marginHorizontal: 0,
            height: 62,
            alignItems: "center",
            justifyContent: "space-between",
        },
        tab: {
            flex: 1,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 18,
            flexDirection: "column",
            gap: 4,
        },
        tabActive: {
            backgroundColor: "transparent",
        },
        tabInactive: {
            backgroundColor: "transparent",
        },
        iconWrapper: {
            width: 28,
            height: 24,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
        },
        labelActive: {
            fontSize: 12,
            color: colors.bottomNavActiveLabel,
            fontFamily: "Poppins-Medium",
        },
        labelInactive: {
            fontSize: 12,
            color: colors.bottomNavInactiveLabel,
            fontFamily: "Poppins-Regular",
        },
        badge: {
            position: "absolute",
            top: -8,
            right: -8,
            minWidth: 20,
            height: 20,
            borderRadius: 20,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 6,
        },
        badgeText: {
            color: colors.white,
            fontSize: 11,
            fontFamily: "Poppins-SemiBold",
        },
    });
}
