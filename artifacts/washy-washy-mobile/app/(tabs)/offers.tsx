import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ScreenHeader, StatusPill, TrustNote } from '@/src/ui';
import colors from '@/constants/colors';

const offers = [
  { id: 'welcome', title: 'A fresher first pickup', body: 'Get ₹100 off your first scheduled pickup in Kakkanad.', code: 'FRESH100', tint: colors.light.blueWash, icon: 'sparkles-outline' as const },
  { id: 'community', title: 'Apartment laundry day', body: 'Join your community collection for a smoother pickup window.', code: 'COMMUNITY', tint: colors.light.mintSoft, icon: 'people-outline' as const },
];

export default function OffersScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 94 }]} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Offers" subtitle="Small wins for a lighter laundry day." />
        <TrustNote>Offers are applied before you confirm your pickup.</TrustNote>
        <View style={styles.offerList}>
          {offers.map((offer) => (
            <View key={offer.id} style={[styles.offer, { backgroundColor: offer.tint }]}>
              <View style={styles.offerTop}><View style={styles.offerIcon}><Ionicons name={offer.icon} size={22} color={colors.light.primary} /></View><StatusPill label="Available" tone="green" /></View>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerBody}>{offer.body}</Text>
              <View style={styles.offerCode}><Text style={styles.offerCodeLabel}>CODE</Text><Text style={styles.offerCodeText}>{offer.code}</Text></View>
              <Button label="Use offer" onPress={() => Alert.alert('Offer saved', `${offer.code} will be available when you schedule your pickup.`)} variant="secondary" icon="arrow-forward" style={styles.offerButton} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background },
  content: { paddingHorizontal: 18, gap: 18 },
  offerList: { gap: 14 },
  offer: { borderRadius: 24, padding: 18, borderWidth: 1, borderColor: colors.light.border },
  offerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  offerIcon: { width: 48, height: 48, borderRadius: 17, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center' },
  offerTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 19, letterSpacing: -0.4, marginTop: 16 },
  offerBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, marginTop: 6 },
  offerCode: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 },
  offerCodeLabel: { color: colors.light.mutedForeground, fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1 },
  offerCodeText: { color: colors.light.primary, fontFamily: 'Inter_700Bold', fontSize: 13, letterSpacing: 1 },
  offerButton: { alignSelf: 'flex-start', marginTop: 15 },
});
