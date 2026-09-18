import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { pendingPriceApproval } from '@/src/data';
import { Button, ScreenHeader, TrustNote } from '@/src/ui';

export default function PriceApprovalScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Price approval" subtitle="Your decision is always required." onBack={() => router.back()} />
        <View style={styles.hero}>
          <View style={styles.heroIcon}><MaterialCommunityIcons name="shield-check-outline" size={31} color={colors.light.primary} /></View>
          <Text style={styles.kicker}>ACTION NEEDED</Text>
          <Text style={styles.title}>We inspected your clothes.</Text>
          <Text style={styles.body}>Here’s exactly what changed, in plain language. Nothing moves forward until you approve.</Text>
        </View>
        <View style={styles.priceCard}>
          <View style={styles.priceRow}><View><Text style={styles.priceLabel}>Estimated</Text><Text style={styles.priceValueMuted}>{pendingPriceApproval.estimated}</Text></View><Ionicons name="arrow-forward" size={22} color={colors.light.mutedForeground} /><View><Text style={styles.priceLabel}>Final</Text><Text style={styles.priceValue}>{pendingPriceApproval.final}</Text></View></View>
          <View style={styles.reason}><Ionicons name="information-circle-outline" size={19} color={colors.light.warning} /><View style={styles.reasonCopy}><Text style={styles.reasonTitle}>{pendingPriceApproval.reason}</Text><Text style={styles.reasonBody}>{pendingPriceApproval.detail}</Text></View></View>
        </View>
        <TrustNote>We never process or charge without your approval.</TrustNote>
        <Button label={`Approve ${pendingPriceApproval.final}`} onPress={() => Alert.alert('Price approved', 'Your laundry can now move into processing.')} icon="checkmark" />
        <Pressable accessibilityRole="button" onPress={() => Alert.alert('Support', 'A support specialist will review this order with you.')} style={styles.supportButton}><Text style={styles.supportText}>Contact support</Text></Pressable>
        <Pressable accessibilityRole="button" onPress={() => Alert.alert('Review requested', 'We’ll hold the order while the team reviews your request.')} style={styles.reviewButton}><Text style={styles.reviewText}>I don’t approve this</Text></Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background },
  content: { paddingHorizontal: 18, gap: 16 },
  hero: { backgroundColor: colors.light.blueWash, borderRadius: 26, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: colors.light.blueBorder },
  heroIcon: { width: 61, height: 61, borderRadius: 21, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center' },
  kicker: { color: colors.light.primary, fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1.3, marginTop: 17 },
  title: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 26, letterSpacing: -0.7, textAlign: 'center', marginTop: 8 },
  body: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 8, maxWidth: 310 },
  priceCard: { backgroundColor: colors.light.card, borderRadius: 24, padding: 19, borderWidth: 1, borderColor: colors.light.border },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceLabel: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 11 },
  priceValueMuted: { color: colors.light.mutedForeground, fontFamily: 'Inter_700Bold', fontSize: 26, marginTop: 4 },
  priceValue: { color: colors.light.primary, fontFamily: 'Inter_700Bold', fontSize: 29, marginTop: 4 },
  reason: { marginTop: 18, paddingTop: 15, borderTopWidth: 1, borderTopColor: colors.light.border, flexDirection: 'row', gap: 9 },
  reasonCopy: { flex: 1 },
  reasonTitle: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  reasonBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 4 },
  supportButton: { alignItems: 'center', padding: 8 },
  supportText: { color: colors.light.primary, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  reviewButton: { alignItems: 'center', padding: 6 },
  reviewText: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 12 },
});