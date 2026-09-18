import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { plans } from '@/src/data';
import { Button, InfoRow, ScreenHeader, TrustNote } from '@/src/ui';
import colors from '@/constants/colors';

export default function PlansScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 94 }]} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Subscriptions" subtitle="Make laundry automatic." />
        <View style={styles.intro}>
          <View style={styles.introIcon}><Ionicons name="repeat" size={25} color={colors.light.primary} /></View>
          <Text style={styles.introTitle}>A better laundry rhythm</Text>
          <Text style={styles.introBody}>Choose a plan that fits your home. Pause, skip, or cancel anytime — no awkward calls.</Text>
        </View>
        <View style={styles.planList}>
          {plans.map((plan, index) => (
            <Pressable key={plan.id} accessibilityRole="button" accessibilityState={{ selected: selectedPlan === plan.id }} onPress={() => setSelectedPlan(plan.id)} style={({ pressed }) => [styles.plan, index === 1 && styles.planFeatured, selectedPlan === plan.id && styles.planSelected, pressed && styles.pressed]}>
              {index === 1 ? <View style={styles.popular}><Text style={styles.popularText}>MOST POPULAR</Text></View> : null}
              <View style={styles.planTop}>
                <View style={[styles.planIcon, { backgroundColor: plan.tint }]}><Ionicons name={index === 2 ? 'sparkles-outline' : 'repeat-outline'} size={20} color={colors.light.primary} /></View>
                <View style={styles.planNameWrap}><Text style={styles.planName}>{plan.name}</Text><Text style={styles.planDescription}>{plan.description}</Text></View>
                <View style={styles.priceWrap}><Text style={styles.planPrice}>{plan.price}</Text><Text style={styles.planUnit}>{plan.unit}</Text></View>
              </View>
              <View style={styles.planBottom}><Text style={styles.planDetail}>{plan.detail}</Text><Ionicons name="arrow-forward-circle" size={22} color={colors.light.primary} /></View>
            </Pressable>
          ))}
        </View>
        <View style={styles.manageCard}>
          <Text style={styles.manageTitle}>{selectedPlan ? `${plans.find((plan) => plan.id === selectedPlan)?.name} plan selected` : 'No active subscription'}</Text>
          <Text style={styles.manageBody}>Your plans are always transparent. We’ll show your next pickup and remaining allowance here.</Text>
          <Button label={selectedPlan ? 'Continue with plan' : 'Choose a plan'} onPress={() => selectedPlan ? Alert.alert('Plan selected', 'Your plan choice is saved for the next step.') : setSelectedPlan(plans[0].id)} icon="arrow-forward" style={styles.manageButton} />
        </View>
        <View style={styles.details}>
          <InfoRow icon="calendar-outline" label="Next pickup" value="Not scheduled" />
          <InfoRow icon="pie-chart-outline" label="Allowance" value="Available after you subscribe" />
          <InfoRow icon="pause-circle-outline" label="Flexible management" value="Pause or skip whenever you need" />
        </View>
        <TrustNote>Secure payments and clear renewal reminders.</TrustNote>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background },
  content: { paddingHorizontal: 18, gap: 18 },
  intro: { backgroundColor: colors.light.blueWash, borderRadius: 25, padding: 20, borderWidth: 1, borderColor: colors.light.blueBorder },
  introIcon: { width: 48, height: 48, borderRadius: 17, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center' },
  introTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 23, letterSpacing: -0.6, marginTop: 16 },
  introBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, marginTop: 7 },
  planList: { gap: 12 },
  plan: { backgroundColor: colors.light.card, borderRadius: 22, padding: 16, borderWidth: 1, borderColor: colors.light.border },
  planFeatured: { borderColor: colors.light.primary, borderWidth: 2 },
  planSelected: { backgroundColor: colors.light.blueWash },
  popular: { position: 'absolute', top: -1, right: 16, backgroundColor: colors.light.primary, borderBottomLeftRadius: 9, borderBottomRightRadius: 9, paddingHorizontal: 9, paddingVertical: 5 },
  popularText: { color: colors.light.primaryForeground, fontFamily: 'Inter_700Bold', fontSize: 8, letterSpacing: 0.8 },
  planTop: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  planIcon: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  planNameWrap: { flex: 1 },
  planName: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 16 },
  planDescription: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 4 },
  priceWrap: { alignItems: 'flex-end' },
  planPrice: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 18 },
  planUnit: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 2 },
  planBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.light.border },
  planDetail: { color: colors.light.primary, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  manageCard: { backgroundColor: colors.light.foreground, borderRadius: 23, padding: 19 },
  manageTitle: { color: colors.light.primaryForeground, fontFamily: 'Inter_700Bold', fontSize: 17 },
  manageBody: { color: '#C9D3E8', fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 7 },
  manageButton: { backgroundColor: colors.light.mint, alignSelf: 'flex-start', marginTop: 16 },
  details: { backgroundColor: colors.light.card, borderRadius: 22, paddingHorizontal: 15, borderWidth: 1, borderColor: colors.light.border },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
});
