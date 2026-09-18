import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { copy, laundryItems, services, timeSlots } from '@/src/data';
import { useApp } from '@/src/store';
import { Button, ServiceCard, TrustNote } from '@/src/ui';
import colors from '@/constants/colors';

const steps = ['Service', 'Items', 'Pickup', 'Review'];

export default function BookingScreen() {
  const insets = useSafeAreaInsets();
  const { draft, setDraft, confirmBooking } = useApp();
  const [step, setStep] = useState(0);
  const [showPricing, setShowPricing] = useState(false);

  const selectedService = services.find((service) => service.id === draft.serviceId) ?? services[1];
  const itemCount = Object.values(draft.items).reduce((sum, count) => sum + count, 0);
  const estimated = selectedService.id === 'iron' ? 240 + itemCount * 12 : selectedService.id === 'dry-clean' ? 300 + itemCount * 99 : 260 + itemCount * 30;
  const canContinue = step === 0 || step === 2 || itemCount > 0;
  const itemSummary = Object.entries(draft.items).filter(([, count]) => count > 0).map(([id, count]) => `${count} ${laundryItems.find((item) => item.id === id)?.label.toLowerCase() ?? id}`).join(' · ');

  const next = () => {
    if (step < 3) setStep((current) => current + 1);
    else {
      const newOrder = {
        id: `LM${Math.floor(10300 + Math.random() * 300)}`,
        service: selectedService.name,
        items: itemSummary || 'Laundry items to be inspected',
        pickup: `${draft.day} · ${draft.timeSlot}`,
        delivery: 'Expected tomorrow',
        status: 'Pickup scheduled',
        statusDetail: 'Your driver will arrive during your slot',
        price: `₹${estimated} est.`,
        bagId: 'BAG-8F72A9',
      };
      confirmBooking(newOrder);
      router.replace('/track');
    }
  };

  const back = () => {
    if (step === 0) router.back();
    else setStep((current) => current - 1);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.top}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close booking" onPress={back} style={styles.close}><Ionicons name={step === 0 ? 'close' : 'arrow-back'} size={21} color={colors.light.foreground} /></Pressable>
        <View style={styles.topTitle}><Text style={styles.kicker}>NEW PICKUP</Text><Text style={styles.title}>{steps[step]}</Text></View>
        <Text style={styles.stepCount}>{step + 1}/{steps.length}</Text>
      </View>
      <View style={styles.progress}>
        {steps.map((label, index) => <View key={label} style={styles.progressItem}><View style={[styles.progressTrack, index <= step && styles.progressTrackActive]} /><Text style={[styles.progressLabel, index === step && styles.progressLabelActive]}>{label}</Text></View>)}
      </View>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 110 }]} showsVerticalScrollIndicator={false}>
        {step === 0 ? <ServiceStep serviceId={draft.serviceId} onSelect={(serviceId) => setDraft((current) => ({ ...current, serviceId }))} /> : null}
        {step === 1 ? <ItemsStep items={draft.items} onChange={(items) => setDraft((current) => ({ ...current, items }))} /> : null}
        {step === 2 ? <PickupStep day={draft.day} timeSlot={draft.timeSlot} onChange={(day, timeSlot) => setDraft((current) => ({ ...current, day, timeSlot }))} /> : null}
        {step === 3 ? <ReviewStep service={selectedService.name} items={itemSummary} day={draft.day} timeSlot={draft.timeSlot} estimated={estimated} showPricing={showPricing} onTogglePricing={() => setShowPricing((value) => !value)} /> : null}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Text style={styles.footerEstimate}><Text style={styles.footerEstimateLabel}>Estimate </Text>₹{estimated}–₹{estimated + 35}</Text>
        <Button label={step === 3 ? 'Confirm pickup' : 'Continue'} onPress={next} disabled={!canContinue} icon="arrow-forward" style={styles.footerButton} />
      </View>
    </View>
  );
}

function ServiceStep({ serviceId, onSelect }: { serviceId: string; onSelect: (id: string) => void }) {
  return <View style={styles.stepBody}><Text style={styles.prompt}>What do you need cleaned?</Text><Text style={styles.helper}>Choose the care that fits your clothes.</Text><View style={styles.stack}>{services.map((service) => <ServiceCard key={service.id} service={service} selected={service.id === serviceId} onPress={() => onSelect(service.id)} />)}</View><TrustNote style={styles.stepTrust}>Prices are configured by our local laundry partners and confirmed after inspection.</TrustNote></View>;
}

function ItemsStep({ items, onChange }: { items: Record<string, number>; onChange: (items: Record<string, number>) => void }) {
  const [unsure, setUnsure] = useState(false);
  const update = (id: string, delta: number) => onChange({ ...items, [id]: Math.max(0, (items[id] ?? 0) + delta) });
  return <View style={styles.stepBody}><Text style={styles.prompt}>What are you sending?</Text><Text style={styles.helper}>A rough count is perfect. We’ll inspect and confirm the final price.</Text><View style={styles.itemList}>{laundryItems.map((item) => <View key={item.id} style={styles.itemRow}><View style={styles.itemIdentity}><View style={styles.itemIcon}><MaterialCommunityIcons name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={19} color={colors.light.primary} /></View><Text style={styles.itemLabel}>{item.label}</Text></View><View style={styles.stepper}><Pressable accessibilityRole="button" accessibilityLabel={`Remove one ${item.label}`} onPress={() => update(item.id, -1)} style={styles.stepperButton}><Ionicons name="remove" size={16} color={colors.light.primary} /></Pressable><Text style={styles.stepperValue}>{items[item.id] ?? 0}</Text><Pressable accessibilityRole="button" accessibilityLabel={`Add one ${item.label}`} onPress={() => update(item.id, 1)} style={styles.stepperButton}><Ionicons name="add" size={16} color={colors.light.primary} /></Pressable></View></View>)}</View><Pressable accessibilityRole="checkbox" accessibilityState={{ checked: unsure }} onPress={() => setUnsure((value) => !value)} style={styles.unsure}><View style={[styles.checkbox, unsure && styles.checkboxActive]}>{unsure ? <Ionicons name="checkmark" size={15} color={colors.light.primaryForeground} /> : null}</View><View style={styles.unsureCopy}><Text style={styles.unsureTitle}>I’m not sure</Text><Text style={styles.unsureBody}>No problem — we’ll inspect and confirm the final price after pickup.</Text></View></Pressable></View>;
}

function PickupStep({ day, timeSlot, onChange }: { day: string; timeSlot: string; onChange: (day: string, timeSlot: string) => void }) {
  return <View style={styles.stepBody}><Text style={styles.prompt}>When should we pick it up?</Text><Text style={styles.helper}>Only available slots are shown for your area.</Text><View style={styles.dayList}>{timeSlots.map((dayOption) => <View key={dayOption.day} style={styles.dayBlock}><View style={styles.dayTitleRow}><Text style={styles.dayTitle}>{dayOption.day}</Text><Text style={styles.dayDate}>{dayOption.date}</Text></View><View style={styles.slotRow}>{dayOption.slots.map((slot) => <Pressable key={slot} accessibilityRole="button" accessibilityState={{ selected: day === dayOption.day && timeSlot === slot }} onPress={() => onChange(dayOption.day, slot)} style={[styles.slot, day === dayOption.day && timeSlot === slot && styles.slotActive]}><Ionicons name="time-outline" size={17} color={day === dayOption.day && timeSlot === slot ? colors.light.primaryForeground : colors.light.primary} /><Text style={[styles.slotText, day === dayOption.day && timeSlot === slot && styles.slotTextActive]}>{slot}</Text></Pressable>)}</View></View>)}</View><View style={styles.addressCard}><View style={styles.addressIcon}><Ionicons name="home-outline" size={21} color={colors.light.primary} /></View><View style={styles.addressCopy}><Text style={styles.addressLabel}>PICKUP ADDRESS</Text><Text style={styles.addressTitle}>{copy.serviceableAddress}</Text><Text style={styles.addressBody}>Serviceable in Kakkanad</Text></View><Ionicons name="checkmark-circle" size={21} color={colors.light.success} /></View></View>;
}

function ReviewStep({ service, items, day, timeSlot, estimated, showPricing, onTogglePricing }: { service: string; items: string; day: string; timeSlot: string; estimated: number; showPricing: boolean; onTogglePricing: () => void }) {
  return <View style={styles.stepBody}><Text style={styles.prompt}>Review your pickup</Text><Text style={styles.helper}>A clear estimate now. Final price only after inspection.</Text><View style={styles.reviewCard}><View style={styles.reviewTop}><View style={styles.reviewIcon}><MaterialCommunityIcons name="washing-machine" size={25} color={colors.light.primary} /></View><View><Text style={styles.reviewService}>{service}</Text><Text style={styles.reviewItems}>{items || 'Laundry items to be inspected'}</Text></View></View><View style={styles.reviewDivider} /><ReviewRow icon="calendar-outline" label="Pickup" value={`${day} · ${timeSlot}`} /><ReviewRow icon="home-outline" label="Address" value={copy.serviceableAddress} /><ReviewRow icon="bicycle-outline" label="Delivery" value="Expected tomorrow" /><View style={styles.reviewDivider} /><View style={styles.totalRow}><Text style={styles.totalLabel}>Estimated total</Text><Text style={styles.totalValue}>₹{estimated}</Text></View><Text style={styles.finalNote}>Final amount may change after inspection. We’ll notify you before charging any additional amount.</Text></View><Pressable accessibilityRole="button" onPress={onTogglePricing} style={styles.pricingToggle}><Text style={styles.pricingToggleText}>How pricing works</Text><Ionicons name={showPricing ? 'chevron-up' : 'chevron-down'} size={16} color={colors.light.primary} /></Pressable>{showPricing ? <View style={styles.pricingBox}><PriceLine label="Estimated laundry" value={`₹${estimated - 30}`} /><PriceLine label="Possible special handling" value="₹30" /><PriceLine label="Estimated total" value={`₹${estimated}`} strong /></View> : null}<TrustNote>We never silently update your price. You approve any change.</TrustNote></View>;
}

function ReviewRow({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return <View style={styles.reviewRow}><Ionicons name={icon} size={18} color={colors.light.primary} /><Text style={styles.reviewRowLabel}>{label}</Text><Text style={styles.reviewRowValue}>{value}</Text></View>;
}

function PriceLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <View style={styles.priceLine}><Text style={[styles.priceLabel, strong && styles.priceStrong]}>{label}</Text><Text style={[styles.priceValue, strong && styles.priceStrong]}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background },
  top: { paddingHorizontal: 18, minHeight: 67, flexDirection: 'row', alignItems: 'center', gap: 12 },
  close: { width: 42, height: 42, borderRadius: 15, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center' },
  topTitle: { flex: 1 },
  kicker: { color: colors.light.primary, fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1.3 },
  title: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 19, marginTop: 3 },
  stepCount: { color: colors.light.mutedForeground, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  progress: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 10, flexDirection: 'row', gap: 6 },
  progressItem: { flex: 1, gap: 6 },
  progressTrack: { height: 4, borderRadius: 3, backgroundColor: colors.light.border },
  progressTrackActive: { backgroundColor: colors.light.primary },
  progressLabel: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 10 },
  progressLabelActive: { color: colors.light.primary, fontFamily: 'Inter_700Bold' },
  content: { paddingHorizontal: 18 },
  stepBody: { paddingTop: 18, gap: 16 },
  prompt: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 27, letterSpacing: -0.9, maxWidth: 300 },
  helper: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, marginTop: -8 },
  stack: { gap: 11 },
  stepTrust: { marginTop: 2 },
  itemList: { backgroundColor: colors.light.card, borderRadius: 22, paddingHorizontal: 15, borderWidth: 1, borderColor: colors.light.border },
  itemRow: { minHeight: 67, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.light.border },
  itemIdentity: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  itemIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.light.blueSoft, alignItems: 'center', justifyContent: 'center' },
  itemLabel: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepperButton: { width: 28, height: 28, borderRadius: 10, backgroundColor: colors.light.blueSoft, alignItems: 'center', justifyContent: 'center' },
  stepperValue: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 14, minWidth: 12, textAlign: 'center' },
  unsure: { flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: colors.light.blueWash, padding: 14, borderRadius: 17 },
  checkbox: { width: 23, height: 23, borderRadius: 8, borderWidth: 1.5, borderColor: colors.light.primary, alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: colors.light.primary },
  unsureCopy: { flex: 1 },
  unsureTitle: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  unsureBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 3 },
  dayList: { gap: 17 },
  dayBlock: { gap: 10 },
  dayTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dayTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 15 },
  dayDate: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 12 },
  slotRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  slot: { minHeight: 50, backgroundColor: colors.light.card, borderWidth: 1, borderColor: colors.light.border, borderRadius: 15, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 7 },
  slotActive: { backgroundColor: colors.light.primary, borderColor: colors.light.primary },
  slotText: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  slotTextActive: { color: colors.light.primaryForeground },
  addressCard: { backgroundColor: colors.light.card, borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: colors.light.border },
  addressIcon: { width: 43, height: 43, borderRadius: 14, backgroundColor: colors.light.blueSoft, alignItems: 'center', justifyContent: 'center' },
  addressCopy: { flex: 1 },
  addressLabel: { color: colors.light.mutedForeground, fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1 },
  addressTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 14, marginTop: 4 },
  addressBody: { color: colors.light.success, fontFamily: 'Inter_500Medium', fontSize: 11, marginTop: 4 },
  reviewCard: { backgroundColor: colors.light.card, borderRadius: 24, padding: 18, borderWidth: 1, borderColor: colors.light.border },
  reviewTop: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  reviewIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.light.blueSoft, alignItems: 'center', justifyContent: 'center' },
  reviewService: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 16 },
  reviewItems: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 4 },
  reviewDivider: { borderTopWidth: 1, borderTopColor: colors.light.border, marginVertical: 14 },
  reviewRow: { flexDirection: 'row', alignItems: 'center', gap: 9, minHeight: 29 },
  reviewRowLabel: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 12 },
  reviewRowValue: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 12, marginLeft: 'auto', maxWidth: '58%', textAlign: 'right' },
  totalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  totalLabel: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  totalValue: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 21 },
  finalNote: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 8 },
  pricingToggle: { minHeight: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 3 },
  pricingToggleText: { color: colors.light.primary, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  pricingBox: { backgroundColor: colors.light.blueWash, borderRadius: 16, padding: 14, gap: 11 },
  priceLine: { flexDirection: 'row', justifyContent: 'space-between' },
  priceLabel: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 12 },
  priceValue: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  priceStrong: { color: colors.light.primary, fontFamily: 'Inter_700Bold' },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.light.background, borderTopWidth: 1, borderTopColor: colors.light.border, paddingHorizontal: 18, paddingTop: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  footerEstimate: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 15 },
  footerEstimateLabel: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11 },
  footerButton: { flex: 1 },
});
