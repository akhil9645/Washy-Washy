import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/src/store';
import { Button, ScreenHeader, StatusPill, TrustNote } from '@/src/ui';
import colors from '@/constants/colors';

const timeline = [
  { title: 'Pickup scheduled', time: 'Today · 6:00 PM', detail: 'Your driver is assigned for the evening slot.', icon: 'calendar-check-outline', state: 'done' },
  { title: 'Clothes picked up', time: 'Pending', detail: 'We’ll update this when your bag is collected.', icon: 'bag-personal-outline', state: 'current' },
  { title: 'Received by laundry', time: 'Pending', detail: 'Your local partner will scan the bag on arrival.', icon: 'storefront-outline', state: 'next' },
  { title: 'Inspection', time: 'Pending', detail: 'We’ll confirm the final price before any extra charge.', icon: 'magnify', state: 'next' },
  { title: 'Washing & care', time: 'Pending', detail: 'Your clothes will be cleaned with the selected care.', icon: 'washing-machine', state: 'next' },
  { title: 'Quality check', time: 'Pending', detail: 'Every order gets a final check before packing.', icon: 'check-decagram-outline', state: 'next' },
  { title: 'Out for delivery', time: 'Pending', detail: 'We’ll let you know when your driver is on the way.', icon: 'truck-delivery-outline', state: 'next' },
  { title: 'Delivered', time: 'Pending', detail: 'Your fresh laundry is back with you.', icon: 'home-heart', state: 'next' },
];

export default function TrackScreen() {
  const insets = useSafeAreaInsets();
  const { activeOrder } = useApp();
  const order = activeOrder ?? { id: 'LM10231', service: 'Wash + Iron', items: '4 shirts · 2 jeans · 1 saree', pickup: 'Today · 6–8 PM', delivery: 'Expected tomorrow', status: 'Pickup scheduled', statusDetail: 'Your driver will arrive during your slot', price: '₹380 est.', bagId: 'BAG-8F72A9' };
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 36 }]} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Track order" subtitle={`#${order.id}`} onBack={() => router.back()} />
        <View style={styles.statusCard}>
          <View style={styles.statusCardTop}><View><Text style={styles.statusKicker}>CURRENT STATUS</Text><Text style={styles.statusTitle}>Pickup scheduled</Text><Text style={styles.statusBody}>Your driver will arrive today between 6–8 PM.</Text></View><View style={styles.statusIcon}><MaterialCommunityIcons name="truck-fast-outline" size={31} color={colors.light.primary} /></View></View>
          <View style={styles.statusLine}><StatusPill label="On schedule" tone="green" /><Text style={styles.deliveryText}>Expected delivery tomorrow</Text></View>
        </View>
        <View style={styles.timelineCard}>
          <Text style={styles.cardTitle}>Your laundry journey</Text>
          <Text style={styles.cardBody}>Simple updates at every handoff, from your door and back.</Text>
          <View style={styles.timeline}>
            {timeline.map((item, index) => <TimelineItem key={item.title} item={item} last={index === timeline.length - 1} />)}
          </View>
        </View>
        <View style={styles.bagCard}>
          <View style={styles.bagTop}><View style={styles.bagIcon}><MaterialCommunityIcons name="qrcode-scan" size={24} color={colors.light.primary} /></View><View style={styles.bagCopy}><Text style={styles.bagLabel}>LAUNDRY BAG</Text><Text style={styles.bagId}>{order.bagId}</Text></View><Ionicons name="shield-checkmark" size={22} color={colors.light.success} /></View>
          <View style={styles.qr}><View style={styles.qrPattern}><MaterialCommunityIcons name="qrcode" size={75} color={colors.light.foreground} /></View><Text style={styles.qrText}>Your bag is securely tracked through every handoff.</Text></View>
        </View>
        <TrustNote>Final pricing is always approved by you before charging.</TrustNote>
        <Button label="Need help?" onPress={() => undefined} variant="secondary" icon="chatbubble-ellipses-outline" />
      </ScrollView>
    </View>
  );
}

function TimelineItem({ item, last }: { item: (typeof timeline)[number]; last: boolean }) {
  const done = item.state === 'done';
  const current = item.state === 'current';
  return <View style={styles.timelineItem}><View style={styles.timelineRail}><View style={[styles.timelineDot, done && styles.timelineDotDone, current && styles.timelineDotCurrent]}>{done ? <Ionicons name="checkmark" size={12} color={colors.light.primaryForeground} /> : <MaterialCommunityIcons name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={14} color={current ? colors.light.primary : colors.light.mutedForeground} />}</View>{!last ? <View style={[styles.timelineConnector, done && styles.timelineConnectorDone]} /> : null}</View><View style={[styles.timelineContent, last && styles.timelineContentLast]}><View style={styles.timelineTitleRow}><Text style={[styles.timelineTitle, current && styles.timelineTitleCurrent]}>{item.title}</Text><Text style={styles.timelineTime}>{item.time}</Text></View><Text style={styles.timelineDetail}>{item.detail}</Text></View></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background },
  content: { paddingHorizontal: 18, gap: 16 },
  statusCard: { backgroundColor: colors.light.blueWash, borderRadius: 25, padding: 19, borderWidth: 1, borderColor: colors.light.blueBorder },
  statusCardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  statusKicker: { color: colors.light.primary, fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1.1 },
  statusTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 23, letterSpacing: -0.6, marginTop: 8 },
  statusBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 5, maxWidth: 240 },
  statusIcon: { width: 58, height: 58, borderRadius: 19, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' },
  statusLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 19, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.light.timelineBorder },
  deliveryText: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 11 },
  timelineCard: { backgroundColor: colors.light.card, borderRadius: 25, padding: 19, borderWidth: 1, borderColor: colors.light.border },
  cardTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 18 },
  cardBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 5 },
  timeline: { marginTop: 20 },
  timelineItem: { flexDirection: 'row', gap: 11, minHeight: 63 },
  timelineRail: { width: 24, alignItems: 'center' },
  timelineDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.light.secondary, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  timelineDotDone: { backgroundColor: colors.light.success },
  timelineDotCurrent: { backgroundColor: colors.light.blueSoft, borderWidth: 1.5, borderColor: colors.light.primary },
  timelineConnector: { position: 'absolute', top: 22, bottom: -4, width: 1.5, backgroundColor: colors.light.border },
  timelineConnectorDone: { backgroundColor: colors.light.timelineDone },
  timelineContent: { flex: 1, paddingBottom: 17 },
  timelineContentLast: { paddingBottom: 0 },
  timelineTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6 },
  timelineTitle: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  timelineTitleCurrent: { color: colors.light.primary, fontFamily: 'Inter_700Bold' },
  timelineTime: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 10 },
  timelineDetail: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 4 },
  bagCard: { backgroundColor: colors.light.foreground, borderRadius: 25, padding: 19 },
  bagTop: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  bagIcon: { width: 45, height: 45, borderRadius: 15, backgroundColor: colors.light.mint, alignItems: 'center', justifyContent: 'center' },
  bagCopy: { flex: 1 },
  bagLabel: { color: '#9AACCD', fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1 },
  bagId: { color: colors.light.primaryForeground, fontFamily: 'Inter_700Bold', fontSize: 16, letterSpacing: 0.4, marginTop: 4 },
  qr: { marginTop: 18, borderRadius: 16, backgroundColor: colors.light.primaryForeground, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  qrPattern: { width: 74, height: 74, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.light.primaryForeground },
  qrText: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 11, lineHeight: 16, flex: 1 },
});
