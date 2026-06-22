import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import CustomText, { CustomTextVariant } from "../../../core/components/CustomText";
import { useTheme } from "../../../core/hooks/useTheme";
import { Host } from "../../../domain/model/Host";

interface OrganizerCardProps {
    host: Host;
    attendeeCount: number;
    onPress: () => void;
}

export default function OrganizerCard({ host, attendeeCount, onPress }: OrganizerCardProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <TouchableOpacity onPress={onPress} style={styles.organizerCard}>
            <Image source={{ uri: host.profileImageUrl }} style={styles.organizerAvatar} />
            <View style={styles.organizerTextWrap}>
                <View style={styles.organizerTitleRow}>
                    <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.organizerName}>
                        {host.name}
                    </CustomText>
                    {host.isVerified && <Ionicons name="checkmark-circle" size={18} color={colors.secondary} />}
                </View>
                <CustomText style={styles.organizerMeta}>
                    {Math.max(attendeeCount * 35, 1000) / 1000}k followers  •  {host.eventOrganised?.length || 1} events
                </CustomText>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
        </TouchableOpacity>
    );
}

const createStyles = (colors: any) =>
    StyleSheet.create({
        organizerCard: {
            marginTop: 24,
            borderRadius: 8,
            backgroundColor: colors.backgroundSecondary,
            borderWidth: 1,
            borderColor: colors.surfaceBorder,
            paddingHorizontal: 8,
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        organizerAvatar: {
            width: 45,
            height: 45,
            borderRadius: 30,
        },
        organizerTextWrap: {
            flex: 1,
        },
        organizerTitleRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginBottom: 2,
        },
        organizerName: {
            color: colors.textPrimary,
            fontSize: 16,
        },
        organizerMeta: {
            color: colors.textLight,
            fontSize: 12,
        },
    });
