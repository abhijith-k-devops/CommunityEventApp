import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../core/hooks/useTheme";
import CustomText from "../../../core/components/CustomText";

interface FilterChipProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

export default function FilterChip({ label, selected, onPress }: FilterChipProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={selected ? styles.chipActive : styles.chip}
        >
            <CustomText style={selected ? styles.textActive : styles.text}>{label}</CustomText>
        </TouchableOpacity>
    );
}

function createStyles(colors: any) {
    return StyleSheet.create({
        chip: {
            paddingHorizontal: 18,
            height: 42,
            borderRadius: 21,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.searchIconBackground,
            borderWidth: 1,
            overflow: "visible",
            borderColor: "rgba(255,255,255,0.08)",
        },
        chipActive: {
            paddingHorizontal: 22,
            height: 42,
            borderRadius: 21,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primary,
            overflow: "visible",
        },
        text: {
            color: colors.textLight,
            fontFamily: "Poppins-Medium",
            fontSize: 13,
        },
        textActive: {
            color: colors.white,
            fontFamily: "Poppins-SemiBold",
            fontSize: 13,
        },
    });
}
