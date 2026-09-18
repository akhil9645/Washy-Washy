import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { copy } from '@/src/data';
import { useApp } from '@/src/store';
import { Button, InfoRow, ScreenHeader, StatusPill, TrustNote } from '@/src/ui';

export default function OrderDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { activeOrder } = useApp();
  const order = activeOrder ?? {
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
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 34 }]} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Order details" subtitle={`#${order.id}`} onBack={() => router.back()} />
        <View style={styles.statusCard}>
          <View style={styles.statusTop}>
            <View style={styles.statusIcon}><MaterialCommunityIcons name="washing-machine" size={28} color={colors.light.primary} /></View>
            <View style={styles.statusCopy}><Text style={styles.statusKicker}>CURRENT STATUS</Text><Text style={styles.statusTitle}>{order.status}</Text><Text style={styles.statusBody}>{order.statusDetail}</Text></View>
            <StatusPill label="On schedule" tone="green" />
          </View>
          <View style={styles.deliveryRow}><Ionicons name="time-outline" size={16} color={colors.light.primary} /><Text style={styles.deliveryLabel}>Expected delivery</Text><Text style={styles.deliveryValue}>{order.delivery}</Text></View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>Handled close to home</Text>
          <View style={styles.partnerRow}>
            <View style={styles.partnerIcon}><MaterialCommunityIcons name="storefront-outline" size={23} color={colors.light.primary} /></View>
            <View style={styles.partnerCopy}><Text style={styles.partnerName}>Handled by {copy.localPartner} near you</Text><Text style={styles.partnerDetail}>Verified local laundry partner · Kakkanad</Text></View>
            <Ionicons name="checkmark-circle" size={21} color={colors.light.success} />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}><Text style={styles.cardTitle}>Price approval</Text><StatusPill label="Approval required" tone="amber" /></View>
          <View style={styles.approvalBox}><View style={styles.approvalIcon}><Ionicons name="shield-checkmark-outline" size={22} color={colors.light.primary} /></View><View style={styles.approvalCopy}><Text style={styles.approvalTitle}>No surprise charges</Text><Text style={styles.approvalBody}>We never process or charge without your approval.</Text></View></View>
          <Button label="View price approval" onPress={() => router.push('/price-approval')} variant="secondary" icon="arrow-forward" style={styles.approvalButton} />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}><Text style={styles.cardTitle}>Condition at pickup</Text><StatusPill label="Awaiting pickup" tone="gray" /></View>
          <Pressable accessibilityRole="button" onPress={() => Alert.alert('Pickup photo', 'The condition photo will appear here as soon as your driver confirms pickup.')} style={styles.photoPreview}>
            <View style={styles.photoPlaceholder}><Ionicons name="camera-outline" size={25} color={colors.light.primary} /><Text style={styles.photoPlaceholderText}>Photo evidence will be added at pickup</Text></View>
            <Ionicons name="expand-outline" size={18} color={colors.light.mutedForeground} />
          </Pressable>
          <Text style={styles.photoNote}>This photo is automatically attached if you ever need help with this order.</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>Order summary</Text>
          <InfoRow icon="shirt-outline" label="Your laundry" value={order.items} />
          <InfoRow icon="sparkles-outline" label="Service" value={order.service} />
          <InfoRow icon="calendar-outline" label="Pickup" value={order.pickup} />
          <InfoRow icon="home-outline" label="Address" value={copy.serviceableAddress} />
          <InfoRow icon="qr-code-outline" label="Tracked bag" value={order.bagId} />
        </View>

        <TrustNote>Every handoff is time-stamped and visible in your tracking timeline.</TrustNote>
        <Button label="Need help with this order?" onPress={() => router.push('/complaint')} variant="secondary" icon="chatbubble-ellipses-outline" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background },
  content: { paddingHorizontal: 18, gap: 14 },
  statusCard: { backgroundColor: colors.light.blueWash, borderRadius: 25, padding: 18, borderWidth: 1, borderColor: colors.light.blueBorder },
  statusTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  statusIcon: { width: 49, height: 49, borderRadius: 16, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center' },
  statusCopy: { flex: 1 },
  statusKicker: { color: colors.light.primary, fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1 },
  statusTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 18, marginTop: 6 },
  statusBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 4 },
  deliveryRow: { marginTop: 17, paddingTop: 13, borderTopWidth: 1, borderTopColor: colors.light.timelineBorder, flexDirection: 'row', alignItems: 'center', gap: 6 },
  deliveryLabel: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 12 },
  deliveryValue: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 12, marginLeft: 'auto' },
  sectionCard: { backgroundColor: colors.light.card, borderRadius: 23, padding: 17, borderWidth: 1, borderColor: colors.light.border },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 13 },
  cardTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 16 },
  partnerRow: { flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 14 },
  partnerIcon: { width: 45, height: 45, borderRadius: 15, backgroundColor: colors.light.mintSoft, alignItems: 'center', justifyContent: 'center' },
  partnerCopy: { flex: 1 },
  partnerName: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  partnerDetail: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 4 },
  approvalBox: { backgroundColor: colors.light.blueWash, borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 13 },
  approvalIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center' },
  approvalCopy: { flex: 1 },
  approvalTitle: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  approvalBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 3 },
  approvalButton: { alignSelf: 'flex-start', marginTop: 13 },
  photoPlaceholder: { alignItems: 'center', gap: 7 },
  photoPlaceholderText: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 11 },
  photoPreview: { minHeight: 126, borderRadius: 17, marginTop: 14, backgroundColor: colors.light.blueWash, borderWidth: 1, borderColor: colors.light.blueBorder, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  photoNote: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 9 },
});