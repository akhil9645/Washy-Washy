import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { orderHistory } from '@/src/data';
import { useApp } from '@/src/store';
import { EmptyState, OrderCard, ScreenHeader, SectionTitle, StatusPill } from '@/src/ui';
import colors from '@/constants/colors';

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const { activeOrder } = useApp();
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 94 }]} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Orders" subtitle="Every pickup, easy to find." />
        {activeOrder ? (
          <View style={styles.activeBlock}>
            <SectionTitle title="In progress" />
            <OrderCard order={activeOrder} onTrack={() => router.push('/track')} />
          </View>
        ) : (
          <View style={styles.emptyWrap}><EmptyState title="No active pickups" body="Your next laundry day can start with one quick booking." action="Schedule a pickup" onAction={() => router.push('/booking')} /></View>
        )}
        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitle}>Past orders</Text>
          <StatusPill label={`${orderHistory.length} orders`} tone="gray" />
        </View>
        <View style={styles.list}>
          {orderHistory.map((order) => <OrderCard key={order.id} order={order} onReorder={() => router.push('/booking')} />)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background },
  content: { paddingHorizontal: 18, gap: 22 },
  activeBlock: {},
  emptyWrap: { backgroundColor: colors.light.card, borderRadius: 24, borderWidth: 1, borderColor: colors.light.border },
  historyHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 18, letterSpacing: -0.3 },
  list: { gap: 12 },
});
