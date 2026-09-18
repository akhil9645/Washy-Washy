import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { BrandLoader, BrandMark, Button } from '@/src/ui';
import { useApp } from '@/src/store';

const slides = [
  {
    icon: 'qrcode-scan',
    eyebrow: 'EVERY HANDOFF, VISIBLE',
    title: 'Track every step',
    body: 'Your bag gets a QR identity, so you always know where your clothes are and what happens next.',
  },
  {
    icon: 'shield-check-outline',
    eyebrow: 'NO SURPRISE CHARGES',
    title: 'You approve the price',
    body: 'We inspect, explain, and ask before processing or charging anything beyond your estimate.',
  },
  {
    icon: 'storefront-outline',
    eyebrow: 'LOCAL BY DESIGN',
    title: 'Real partners near you',
    body: 'Meet the local laundry partner caring for your order, with apartment collection days that fit your routine.',
  },
];

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { onboardingComplete, completeOnboarding } = useApp();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (onboardingComplete) router.replace('/(tabs)');
  }, [onboardingComplete]);

  if (onboardingComplete === null) {
    return <View style={styles.loading}><BrandLoader /></View>;
  }

  if (onboardingComplete) {
    return null;
  }

  const current = slides[slide];
  const isLast = slide === slides.length - 1;
  const finish = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 18 }]}>
      <View style={styles.header}>
        <View style={styles.brand}><BrandMark small /><Text style={styles.brandText}>washy washy</Text></View>
        <Pressable accessibilityRole="button" onPress={finish} style={styles.skip}><Text style={styles.skipText}>Skip</Text></Pressable>
      </View>
      <View style={styles.content}>
        <View style={styles.iconStage}><View style={styles.iconGlow} /><View style={styles.iconTile}><MaterialCommunityIcons name={current.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={58} color={colors.light.primary} /></View></View>
        <View style={styles.copy}><Text style={styles.eyebrow}>{current.eyebrow}</Text><Text style={styles.title}>{current.title}</Text><Text style={styles.body}>{current.body}</Text></View>
      </View>
      <View style={styles.footer}>
        <View style={styles.dots}>{slides.map((item, index) => <View key={item.title} style={[styles.dot, index === slide && styles.dotActive]} />)}</View>
        <Button label={isLast ? 'Start with trust' : 'Continue'} onPress={() => isLast ? finish() : setSlide((value) => value + 1)} icon={isLast ? 'checkmark' : 'arrow-forward'} />
        <View style={styles.promise}><Ionicons name="shield-checkmark-outline" size={15} color={colors.light.success} /><Text style={styles.promiseText}>We never process or charge without your approval.</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background, paddingHorizontal: 22, justifyContent: 'space-between' },
  loading: { flex: 1, backgroundColor: colors.light.background, alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 17 },
  skip: { padding: 9 },
  skipText: { color: colors.light.mutedForeground, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  content: { flex: 1, justifyContent: 'center', paddingBottom: 36 },
  iconStage: { height: 270, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  iconGlow: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: colors.light.blueSoft },
  iconTile: { width: 142, height: 142, borderRadius: 48, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center', elevation: 4 },
  copy: { alignItems: 'center', paddingHorizontal: 8 },
  eyebrow: { color: colors.light.primary, fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.4, textAlign: 'center' },
  title: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 34, letterSpacing: -1.2, textAlign: 'center', marginTop: 13 },
  body: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 23, textAlign: 'center', marginTop: 12, maxWidth: 320 },
  footer: { gap: 16 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.light.border },
  dotActive: { width: 22, backgroundColor: colors.light.primary },
  promise: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 6 },
  promiseText: { color: colors.light.success, fontFamily: 'Inter_500Medium', fontSize: 11, textAlign: 'center' },
});