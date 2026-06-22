import { StyleSheet, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { ColorTheme } from "../theme/Colors";
import CustomText, { CustomTextVariant } from "./CustomText";


export enum CustomPillType {
    SALE = "Sale",
    NEW = "New",
    FEATURED = "Featured",
    DEFAULT = "Default",
}

interface CustomPillProps {
    text: string;
    type: CustomPillType;
    style?: any;
}
function CustomPill({ text, type, style }: CustomPillProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors, type);
    return (
        <View style={[styles.pill, style]}>
            <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.pillText}>{text}</CustomText>
        </View>
    );
}
    
function createStyles(colors: ColorTheme, type?: CustomPillType) {
    return StyleSheet.create({
        pill: {
            paddingHorizontal: 8,
            paddingVertical: 6,
            borderRadius: 16,
            alignSelf: "flex-start",
            backgroundColor:
                type === CustomPillType.SALE
                    ? colors.sale
                    : type === CustomPillType.NEW
                    ? colors.new
                    : type === CustomPillType.FEATURED
                    ? colors.primary
                    : colors.tagBackground,
        },
        pillText: {
            fontSize: 10,
            color: colors.white,
        },
    });
}

export default CustomPill;