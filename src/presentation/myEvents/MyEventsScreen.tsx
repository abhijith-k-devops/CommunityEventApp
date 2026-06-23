import { FlatList, StyleSheet, Text, View, ActivityIndicator, useWindowDimensions } from "react-native";
import { useTheme } from "../../core/hooks/useTheme";
import { useRSVP } from "../viewmodels/hooks/useRSVP";
import { Events } from "../../domain/model/Events";
import EventListItem from "../discover/components/EventListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../core/types/AppNavigationType";
import CustomText, { CustomTextVariant } from "../../core/components/CustomText";

type MyEventsNavigationProp = NativeStackNavigationProp<MainStackParamList>;

function MyEventsScreen() {
    const theme = useTheme();
    const { width } = useWindowDimensions();
    const isTwoColumn = width >= 768;
    const numColumns = isTwoColumn ? 2 : 1;
    const styles = createStyles(theme.colors);
    const { events, isLoading } = useRSVP();
    const navigation = useNavigation<MyEventsNavigationProp>();

    const handleEventPress = (event: Events) => {
        navigation.getParent()?.navigate("EventDetails", { event });
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loadingText}>Loading your events...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <FlatList
                key={`my-events-list-${numColumns}`}
                data={events}
                numColumns={numColumns}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <EventListItem
                        event={item}
                        onPress={() => handleEventPress(item)}
                        containerStyle={isTwoColumn ? styles.gridCard : styles.singleColumnCard}
                    />
                )}
                columnWrapperStyle={isTwoColumn ? styles.columnWrapper : undefined}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <CustomText variant={CustomTextVariant.TITLE} style={styles.headerTitle}>
                            My Events
                        </CustomText>
                        <CustomText style={styles.headerSubtitle}>
                            {events.length} event{events.length !== 1 ? "s" : ""} saved
                        </CustomText>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <CustomText style={styles.emptyTitle}>No Events Yet</CustomText>
                        <CustomText style={styles.emptyText}>
                            Events you RSVP to will appear here. Go to Discover to find events!
                        </CustomText>
                    </View>
                }
                scrollEnabled={true}
            />
        </SafeAreaView>
    );
}

function createStyles(colors: any) {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: colors.background,
        },
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        listContent: {
            paddingBottom: 20,
        },
        singleColumnCard: {
            marginHorizontal: 16,
            marginVertical: 12,
        },
        gridCard: {
            width: "48%",
            marginHorizontal: "1%",
            marginVertical: 8,
        },
        columnWrapper: {
            paddingHorizontal: 8,
        },
        header: {
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 12,
        },
        headerTitle: {
            color: colors.textPrimary,
            fontSize: 28,
            marginBottom: 4,
        },
        headerSubtitle: {
            color: colors.textLight,
            fontSize: 14,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        loadingText: {
            marginTop: 12,
            fontSize: 16,
            color: colors.textPrimary,
            fontFamily: "Poppins-Medium",
        },
        emptyContainer: {
            paddingHorizontal: 20,
            paddingTop: 60,
            alignItems: "center",
        },
        emptyTitle: {
            color: colors.textPrimary,
            fontSize: 20,
            fontFamily: "Poppins-SemiBold",
            marginBottom: 8,
        },
        emptyText: {
            color: colors.textLight,
            fontSize: 14,
            textAlign: "center",
            lineHeight: 20,
        },
    });
}

export default MyEventsScreen;