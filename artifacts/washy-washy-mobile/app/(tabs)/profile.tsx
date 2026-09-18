import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { copy } from '@/src/data';
import { ScreenHeader, StatusPill } from '@/src/ui';
import colors from '@/constants/colors';

const menu = [
  { label: 'Saved addresses', detail: 'Home · Kakkanad', icon: 'location-outline' as const },
  { label: 'Payment methods', detail: 'Secure and private', icon: 'card-outline' as const },
  { label: 'Help & support', detail: 'We’re here when you need us', icon: 'chatbubble-ellipses-outline' as const },
  { label: 'Language', detail: 'English', icon: 'language-outline' as const },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 94 }]} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Profile" subtitle="Your Washy Washy space." />
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>AK</Text></View>
          <View style={styles.profileCopy}><Text style={styles.profileName}>Akhil</Text><Text style={styles.profileEmail}>akhil@example.com</Text></View>
          <StatusPill label="Kakkanad" tone="blue" />
        </View>
        <View style={styles.trustCard}>
          <View style={styles.trustIcon}><MaterialCommunityIcons name="shield-check-outline" size={25} color={colors.light.success} /></View>
          <View style={styles.trustCopy}><Text style={styles.trustTitle}>Your clothes, accounted for.</Text><Text style={styles.trustBody}>Every order gets a tracked bag and a clear handoff history.</Text></View>
        </View>
        <View style={styles.menu}>
          {menu.map((item, index) => (
            <Pressable key={item.label} accessibilityRole="button" onPress={() => Alert.alert(item.label, item.detail)} style={({ pressed }) => [styles.menuRow, index === menu.length - 1 && styles.menuRowLast, pressed && styles.pressed]}>
              <View style={styles.menuIcon}><Ionicons name={item.icon} size={19} color={colors.light.primary} /></View>
              <View style={styles.menuCopy}><Text style={styles.menuLabel}>{item.label}</Text><Text style={styles.menuDetail}>{item.detail}</Text></View>
              <Ionicons name="chevron-forward" size={18} color={colors.light.mutedForeground} />
            </Pressable>
          ))}
        </View>
        <View style={styles.localCard}>
          <Ionicons name="heart-outline" size={19} color={colors.light.coral} />
          <Text style={styles.localText}>Made for {copy.neighborhood}, with local laundry partners.</Text>
        </View>
        <Pressable accessibilityRole="button" style={styles.signOut}><Text style={styles.signOutText}>Sign out</Text></Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.light.background },
  content: { paddingHorizontal: 18, gap: 16 },
  profileCard: { backgroundColor: colors.light.card, borderRadius: 24, padding: 18, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.light.border },
  avatar: { width: 56, height: 56, borderRadius: 20, backgroundColor: colors.light.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.light.primaryForeground, fontFamily: 'Inter_700Bold', fontSize: 18 },
  profileCopy: { flex: 1, marginLeft: 13 },
  profileName: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 17 },
  profileEmail: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 },
  trustCard: { backgroundColor: colors.light.mintSoft, borderRadius: 22, padding: 16, flexDirection: 'row', gap: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.light.mintBorder },
  trustIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: colors.light.card, alignItems: 'center', justifyContent: 'center' },
  trustCopy: { flex: 1 },
  trustTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 14 },
  trustBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 4 },
  menu: { backgroundColor: colors.light.card, borderRadius: 24, paddingHorizontal: 16, borderWidth: 1, borderColor: colors.light.border },
  menuRow: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: colors.light.border },
  menuRowLast: { borderBottomWidth: 0 },
  menuIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.light.blueSoft, alignItems: 'center', justifyContent: 'center' },
  menuCopy: { flex: 1 },
  menuLabel: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  menuDetail: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 4 },
  localCard: { padding: 14, flexDirection: 'row', alignItems: 'center', gap: 9 },
  localText: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 12, flex: 1 },
  signOut: { alignItems: 'center', padding: 14 },
  signOutText: { color: colors.light.coral, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  pressed: { opacity: 0.7 },
});
