import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { ColorTheme } from "../theme/Colors";

export enum FavouriteIconType {
    DETAIL = "detail",
    LIST_ITEM = "list_item",
}

interface FavouriteIconComponentProps {
    isFavourite: boolean;
    onToggle: () => void;
    type?: FavouriteIconType;
    style?: any;
    count?: number;
    testID?: string;
}
export default function FavouriteIconComponent({ isFavourite, onToggle, type = FavouriteIconType.LIST_ITEM, style, count, testID }
    : FavouriteIconComponentProps) {
        const { colors } = useTheme();

        const themedStyles = createStyles(colors, type);
        
        return (
            <TouchableOpacity
                testID={testID}
                onPress={onToggle}
                activeOpacity={0.85}
                style={[
                    themedStyles.iconContainer,
                    isFavourite ? themedStyles.iconContainerActive : themedStyles.iconContainerInactive,
                    style,
                ]}
            >
                <Ionicons
                    name={isFavourite ? "heart" : "heart-outline"}
                    size={16}
                    color={colors.white}
                />
                {typeof count === "number" && (
                    <Text style={themedStyles.countText}>{count}</Text>
                )}
            </TouchableOpacity>
        );
}

function createStyles(colors: ColorTheme, type: FavouriteIconType) {
    const isDetail = type === FavouriteIconType.DETAIL;

    return StyleSheet.create({
        iconContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            paddingVertical: 6,
            paddingHorizontal: 12,
            gap: 6,
            alignSelf: "flex-start",
            minWidth: 74,
        },
        iconContainerActive: {
            backgroundColor: colors.favIconActive,
            borderWidth: 1,
            borderColor: colors.favBorderActive,
        },
        iconContainerInactive: {
            backgroundColor: colors.favIconInactive,
            borderWidth: 1,
            borderColor: colors.favBorderInactive,
        },
        countText: {
            color: colors.white,
            fontSize: 30 / 2,
            lineHeight: 18,
            fontWeight: "700",
            letterSpacing: 0.2,
        },
    });
}