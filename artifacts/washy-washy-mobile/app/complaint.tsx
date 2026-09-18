import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { useApp } from '@/src/store';
import { Button, ScreenHeader, TrustNote } from '@/src/ui';

const categories = ['Missing item', 'Damaged item', 'Stain issue', 'Wrong item', 'Late delivery', 'Price issue'];

export default function ComplaintScreen() {
  const insets = useSafeAreaInsets();
  const { activeOrder } = useApp();
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Need help?" subtitle={activeOrder ? `Order #${activeOrder.id}` : 'We’ll make it right.'} onBack={() => router.back()} />
        <View style={styles.slaCard}><View style={styles.slaIcon}><Ionicons name="time-outline" size={22} color={colors.light.success} /></View><View style={styles.slaCopy}><Text style={styles.slaTitle}>We typically respond within 4 hours.</Text><Text style={styles.slaBody}>Your complaint is attached to the order and routed to the local support team.</Text></View></View>
        <View style={styles.section}><Text style={styles.label}>What went wrong?</Text><View style={styles.chips}>{categories.map((item) => <Pressable key={item} accessibilityRole="button" accessibilityState={{ selected: category === item }} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}><Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text></Pressable>)}</View></View>
        <View style={styles.section}><Text style={styles.label}>Tell us a little more</Text><TextInput accessibilityLabel="Complaint description" multiline value={description} onChangeText={setDescription} placeholder="Add details so we can resolve this quickly." placeholderTextColor={colors.light.mutedForeground} style={styles.textInput} textAlignVertical="top" /></View>
        <View style={styles.evidence}><View style={styles.evidenceIcon}><Ionicons name="camera-outline" size={21} color={colors.light.primary} /></View><View style={styles.evidenceCopy}><Text style={styles.evidenceTitle}>Condition photo attached automatically</Text><Text style={styles.evidenceBody}>The pickup evidence for this order will be included when available, so you don’t have to hunt for it.</Text></View></View>
        <TrustNote>Complaint status and response time will stay visible here.</TrustNote>
        <Button label="Submit complaint" onPress={() => Alert.alert('Complaint submitted', 'Your support request is under review.')} icon="arrow-forward" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background },
  content: { paddingHorizontal: 18, gap: 18 },
  slaCard: { backgroundColor: colors.light.mintSoft, borderRadius: 21, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 11, borderWidth: 1, borderColor: colors.light.mintBorder },
  slaIcon: { width: 43, height: 43, borderRadius: 14, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center' },
  slaCopy: { flex: 1 },
  slaTitle: { color: colors.light.success, fontFamily: 'Inter_700Bold', fontSize: 13 },
  slaBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 4 },
  section: { gap: 10 },
  label: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 15 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { minHeight: 39, paddingHorizontal: 13, borderRadius: 13, backgroundColor: colors.light.card, borderWidth: 1, borderColor: colors.light.border, justifyContent: 'center' },
  chipActive: { backgroundColor: colors.light.primary, borderColor: colors.light.primary },
  chipText: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 12 },
  chipTextActive: { color: colors.light.primaryForeground },
  textInput: { minHeight: 125, backgroundColor: colors.light.card, borderWidth: 1, borderColor: colors.light.border, borderRadius: 17, padding: 14, color: colors.light.foreground, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19 },
  evidence: { backgroundColor: colors.light.blueWash, borderRadius: 19, padding: 14, flexDirection: 'row', gap: 11, borderWidth: 1, borderColor: colors.light.blueBorder },
  evidenceIcon: { width: 41, height: 41, borderRadius: 13, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center' },
  evidenceCopy: { flex: 1 },
  evidenceTitle: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  evidenceBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 4 },
});