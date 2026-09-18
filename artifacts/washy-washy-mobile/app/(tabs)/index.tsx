import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { copy, orderHistory, services } from '@/src/data';
import { useApp } from '@/src/store';
import { OrderCard, SectionTitle, ServiceCard, TrustNote, WasherHero } from '@/src/ui';
import colors from '@/constants/colors';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { activeOrder } = useApp();
  const currentOrder = activeOrder ?? {
    id: 'LM10231',
    service: 'Wash + Iron',
    items: '4 shirts · 2 jeans · 1 saree',
    pickup: 'Today · 6–8 PM',
    delivery: 'Expected tomorrow',
    status: 'Pickup scheduled',
    statusDetail: 'Your driver will arrive during your slot',
    price: '₹380 est.',
    bagId: 'BAG-8F72A9',
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>{copy.greeting}<Text style={styles.greetingDot}>.</Text></Text>
            <Pressable accessibilityRole="button" style={styles.locationRow}>
              <Ionicons name="location-outline" size={15} color={colors.light.primary} />
              <Text style={styles.location}>{copy.neighborhood}</Text>
              <Ionicons name="chevron-down" size={14} color={colors.light.mutedForeground} />
            </Pressable>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={() => Alert.alert('You’re all set', 'No new updates right now.')} style={styles.notification}>
            <Ionicons name="notifications-outline" size={21} color={colors.light.foreground} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <WasherHero onPress={() => router.push('/booking')} />
        <View style={styles.trustLine}><TrustNote>Tracked bags · transparent pricing · local partners</TrustNote></View>

        <View style={styles.section}>
          <SectionTitle title="Your active order" action="View details" onAction={() => router.push('/track')} />
          <OrderCard order={currentOrder} onTrack={() => router.push('/track')} />
        </View>

        <View style={styles.section}>
          <SectionTitle title="Services" action="See all" />
          <View style={styles.serviceGrid}>
            {services.slice(0, 4).map((service) => (
              <View key={service.id} style={styles.serviceGridItem}>
                <ServiceCard service={service} compact onPress={() => router.push('/booking')} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.apartmentCard}>
          <View style={styles.apartmentIcon}><MaterialCommunityIcons name="office-building-outline" size={23} color={colors.light.primary} /></View>
          <View style={styles.apartmentCopy}>
            <Text style={styles.apartmentKicker}>COMMUNITY COLLECTION</Text>
            <Text style={styles.apartmentTitle}>{copy.apartment} has a laundry day</Text>
            <Text style={styles.apartmentBody}>Wednesday · 6–8 PM · 12 residents scheduled</Text>
          </View>
          <Ionicons name="arrow-forward" size={18} color={colors.light.primary} />
        </View>

        <View style={styles.weeklyCard}>
          <View style={styles.weeklyBadge}><Ionicons name="repeat" size={15} color={colors.light.primary} /><Text style={styles.weeklyBadgeText}>WEEKLY LAUNDRY</Text></View>
          <Text style={styles.weeklyTitle}>Never worry about laundry again.</Text>
          <Text style={styles.weeklyBody}>A simple plan for a lighter week, with pickups that fit your routine.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.push('/(tabs)/plans')} style={styles.weeklyButton}><Text style={styles.weeklyButtonText}>Explore plans</Text><Ionicons name="arrow-forward" size={17} color={colors.light.primary} /></Pressable>
        </View>

        <View style={styles.section}>
          <SectionTitle title="Repeat your last order" />
          <OrderCard order={orderHistory[0]} onReorder={() => router.push('/booking')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background },
  content: { paddingHorizontal: 18, gap: 22 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 27, letterSpacing: -1 },
  greetingDot: { color: colors.light.mint },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 7 },
  location: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 13 },
  notification: { width: 44, height: 44, borderRadius: 16, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.light.border },
  notificationDot: { position: 'absolute', top: 11, right: 11, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.light.coral, borderWidth: 1.5, borderColor: colors.light.card },
  trustLine: { marginTop: -8 },
  section: {},
  serviceGrid: { gap: 10 },
  serviceGridItem: { width: '100%' },
  apartmentCard: { backgroundColor: colors.light.blueWash, borderRadius: 23, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: colors.light.blueBorder },
  apartmentIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center' },
  apartmentCopy: { flex: 1 },
  apartmentKicker: { color: colors.light.primary, fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1 },
  apartmentTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 14, marginTop: 5 },
  apartmentBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 5 },
  weeklyCard: { backgroundColor: colors.light.mintSoft, borderRadius: 24, padding: 19, borderWidth: 1, borderColor: colors.light.mintBorder },
  weeklyBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  weeklyBadgeText: { color: colors.light.success, fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1 },
  weeklyTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 21, letterSpacing: -0.6, marginTop: 12 },
  weeklyBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, marginTop: 6 },
  weeklyButton: { alignSelf: 'flex-start', marginTop: 15, backgroundColor: colors.light.blueSoft, minHeight: 44, paddingHorizontal: 15, borderRadius: 15, flexDirection: 'row', alignItems: 'center', gap: 8 },
  weeklyButtonText: { color: colors.light.primary, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
});
