import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import CustomText, { CustomTextVariant } from "../../core/components/CustomText";
import { useTheme } from "../../core/hooks/useTheme";
import { MainStackParamList } from "../../core/types/AppNavigationType";
import EventListItem from "../discover/components/EventListItem";

type HostDetailsRouteProp = RouteProp<MainStackParamList, "HostDetails">;
type HostDetailsNavigationProp = NativeStackNavigationProp<MainStackParamList>;

function HostDetailsScreen() {
    const route = useRoute<HostDetailsRouteProp>();
    const navigation = useNavigation<HostDetailsNavigationProp>();
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const host = route.params?.host;

    if (!host) {
        return (
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <View style={styles.errorContainer}>
                    <CustomText style={styles.errorText}>Host details not available</CustomText>
                </View>
            </SafeAreaView>
        );
    }

    const handleEventPress = (event: any) => {
        navigation.navigate("EventDetails", { event });
    };

    const formatFollowers = (count: number) => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`;
        }
        return count.toString();
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    {/* Avatar with Verification Badge */}
                    <View style={styles.avatarContainer}>
                        {host.profileImageUrl ? (
                            <Image
                                source={{ uri: host.profileImageUrl }}
                                style={styles.avatar}
                            />
                        ) : (
                            <View style={[styles.avatar, styles.avatarPlaceholder]}>
                                <Ionicons name="person" size={48} color={colors.textLight} />
                            </View>
                        )}
                        {host.isVerified && (
                            <View style={styles.verificationBadge}>
                                <Ionicons name="checkmark-circle" size={28} color={colors.secondary} />
                            </View>
                        )}
                    </View>

                    {/* Name and Location */}
                    <CustomText variant={CustomTextVariant.TITLE} style={styles.hostName}>
                        {host.name}
                    </CustomText>
                    <View style={styles.locationRow}>
                        <Ionicons name="location" size={16} color={colors.textLight} />
                        <CustomText style={styles.locationText}>{host.location}</CustomText>
                    </View>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <CustomText variant={CustomTextVariant.TITLE} style={styles.statNumber}>
                            {host.eventOrganised?.length || 0}
                        </CustomText>
                        <CustomText style={styles.statLabel}>Events Hosted</CustomText>
                    </View>
                    <View style={styles.statCard}>
                        <CustomText variant={CustomTextVariant.TITLE} style={styles.statNumber}>
                            {formatFollowers(15200)}
                        </CustomText>
                        <CustomText style={styles.statLabel}>Followers</CustomText>
                    </View>
                </View>

                {/* Bio Section */}
                {host.bio && (
                    <View style={styles.bioContainer}>
                        <CustomText style={styles.bioText}>{host.bio}</CustomText>
                    </View>
                )}

                {/* Events Section */}
                {host.eventOrganised && host.eventOrganised.length > 0 && (
                    <View style={styles.eventsSection}>
                        <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.eventsHeader}>
                            Events ({host.eventOrganised.length})
                        </CustomText>
                        <View style={styles.eventsList}>
                            {host.eventOrganised.map((event) => (
                                <TouchableOpacity
                                    key={event.id}
                                    onPress={() => handleEventPress(event)}
                                    activeOpacity={0.9}
                                >
                                    <EventListItem
                                        event={event}
                                        onPress={() => handleEventPress(event)}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

function createStyles(colors: any) {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollView: {
            flex: 1,
        },
        contentContainer: {
            paddingBottom: 32,
        },
        profileSection: {
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 24,
        },
        avatarContainer: {
            position: "relative",
            marginBottom: 16,
        },
        avatar: {
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: colors.primary,
        },
        avatarPlaceholder: {
            backgroundColor: colors.backgroundSecondary,
            justifyContent: "center",
            alignItems: "center",
        },
        verificationBadge: {
            position: "absolute",
            bottom: 4,
            right: 4,
            backgroundColor: colors.background,
            borderRadius: 14,
            padding: 2,
        },
        hostName: {
            color: colors.textPrimary,
            fontSize: 28,
            marginBottom: 8,
            textAlign: "center",
        },
        locationRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
        },
        locationText: {
            color: colors.textLight,
            fontSize: 14,
        },
        statsContainer: {
            flexDirection: "row",
            gap: 12,
            paddingHorizontal: 20,
            paddingBottom: 20,
        },
        statCard: {
            flex: 1,
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 16,
            padding: 16,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: colors.surfaceBorder,
        },
        statNumber: {
            color: colors.textPrimary,
            fontSize: 28,
            marginBottom: 6,
        },
        statLabel: {
            color: colors.textLight,
            fontSize: 12,
            textAlign: "center",
        },
        bioContainer: {
            paddingHorizontal: 20,
            paddingBottom: 24,
        },
        bioText: {
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 22,
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.surfaceBorder,
        },
        eventsSection: {
            paddingHorizontal: 20,
        },
        eventsHeader: {
            marginBottom: 16,
            color: colors.textPrimary,
        },
        eventsList: {
            gap: 12,
        },
        errorContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        errorText: {
            color: colors.textLight,
            fontSize: 14,
        },
    });
}

export default HostDetailsScreen;