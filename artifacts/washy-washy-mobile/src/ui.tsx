import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';

export function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <View style={[styles.brandMark, small && styles.brandMarkSmall]}>
      <MaterialCommunityIcons name="water" size={small ? 16 : 20} color={colors.light.primary} />
      <View style={styles.brandFold} />
    </View>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  right,
  onBack,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <View style={styles.screenHeader}>
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color={colors.light.foreground} />
        </Pressable>
      ) : (
        <View style={styles.headerBrand}>
          <BrandMark small />
          <Text style={styles.headerBrandText}>washy washy</Text>
        </View>
      )}
      <View style={styles.headerTextBlock}>
        <Text style={styles.screenTitle}>{title}</Text>
        {subtitle ? <Text style={styles.screenSubtitle}>{subtitle}</Text> : null}
      </View>
      {right ?? <View style={styles.headerSpacer} />}
    </View>
  );
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  loading = false,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.buttonPrimary : variant === 'secondary' ? styles.buttonSecondary : styles.buttonGhost,
        (disabled || loading) && styles.buttonDisabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={isPrimary ? colors.light.primaryForeground : colors.light.primary} /> : null}
      {!loading ? <Text style={[styles.buttonText, !isPrimary && styles.buttonTextDark]}>{label}</Text> : null}
      {!loading && icon ? <Ionicons name={icon} size={18} color={isPrimary ? colors.light.primaryForeground : colors.light.primary} /> : null}
    </Pressable>
  );
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable accessibilityRole="button" onPress={onAction}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function StatusPill({ label, tone = 'blue' }: { label: string; tone?: 'blue' | 'green' | 'amber' | 'gray' }) {
  const toneStyles = {
    blue: { backgroundColor: colors.light.blueSoft, color: colors.light.primary },
    green: { backgroundColor: colors.light.mintSoft, color: colors.light.success },
    amber: { backgroundColor: colors.light.amberSoft, color: colors.light.warning },
    gray: { backgroundColor: colors.light.secondary, color: colors.light.mutedForeground },
  } as const;
  const toneStyle = toneStyles[tone];
  return (
    <View style={[styles.statusPill, { backgroundColor: toneStyle.backgroundColor }]}>
      <View style={[styles.statusDot, { backgroundColor: toneStyle.color }]} />
      <Text style={[styles.statusPillText, { color: toneStyle.color }]}>{label}</Text>
    </View>
  );
}

export function IconTile({ icon, tint = colors.light.blueSoft, size = 48 }: { icon: string; tint?: string; size?: number }) {
  return (
    <View style={[styles.iconTile, { backgroundColor: tint, width: size, height: size, borderRadius: size / 3 }]}>
      <MaterialCommunityIcons name={icon as keyof typeof MaterialCommunityIcons.glyphMap} size={size * 0.48} color={colors.light.primary} />
    </View>
  );
}

export function ServiceCard({
  service,
  selected,
  onPress,
  compact = false,
}: {
  service: { name: string; description: string; priceLabel: string; turnaround: string; icon: string; tint: string };
  selected?: boolean;
  onPress?: () => void;
  compact?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.serviceCard, compact && styles.serviceCardCompact, selected && styles.serviceCardSelected, pressed && styles.pressed]}
    >
      <IconTile icon={service.icon} tint={service.tint} size={compact ? 44 : 52} />
      <View style={styles.serviceCardBody}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceDescription}>{service.description}</Text>
        <View style={styles.serviceMeta}>
          <Text style={styles.servicePrice}>{service.priceLabel}</Text>
          <Text style={styles.serviceTurnaround}>{service.turnaround}</Text>
        </View>
      </View>
      {selected ? <Ionicons name="checkmark-circle" size={22} color={colors.light.primary} /> : null}
    </Pressable>
  );
}

export function OrderCard({ order, onTrack, onReorder }: { order: { id: string; service: string; items: string; pickup: string; delivery: string; status: string; statusDetail: string; price: string; bagId: string }; onTrack?: () => void; onReorder?: () => void }) {
  return (
    <View style={styles.orderCard}>
      <View style={styles.orderCardTop}>
        <View>
          <Text style={styles.eyebrow}>ORDER #{order.id}</Text>
          <Text style={styles.orderService}>{order.service}</Text>
        </View>
        <StatusPill label={order.status} tone={order.status === 'Delivered' ? 'green' : 'blue'} />
      </View>
      <Text style={styles.orderItems}>{order.items}</Text>
      <View style={styles.orderMetaRow}>
        <View style={styles.orderMeta}>
          <Ionicons name="calendar-outline" size={15} color={colors.light.mutedForeground} />
          <Text style={styles.orderMetaText}>{order.pickup}</Text>
        </View>
        <Text style={styles.orderPrice}>{order.price}</Text>
      </View>
      {onTrack || onReorder ? (
        <View style={styles.orderActions}>
          {onTrack ? <Button label="Track order" onPress={onTrack} variant="secondary" icon="navigate-outline" style={styles.orderActionButton} /> : null}
          {onReorder ? <Button label="Reorder" onPress={onReorder} variant="ghost" icon="repeat-outline" style={styles.orderActionButton} /> : null}
        </View>
      ) : null}
    </View>
  );
}

export function InfoRow({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}><Ionicons name={icon} size={18} color={colors.light.primary} /></View>
      <View style={styles.infoText}><Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoValue}>{value}</Text></View>
    </View>
  );
}

export function Field({ label, value, onChangeText, placeholder }: { label: string; value: string; onChangeText: (text: string) => void; placeholder?: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.light.mutedForeground} />
    </View>
  );
}

export function TrustNote({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.trustNote, style]}>
      <Ionicons name="shield-checkmark-outline" size={17} color={colors.light.success} />
      <Text style={styles.trustText}>{children}</Text>
    </View>
  );
}

export function EmptyState({ title, body, action, onAction }: { title: string; body: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}><Feather name="inbox" size={24} color={colors.light.primary} /></View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
      {action && onAction ? <Button label={action} onPress={onAction} style={styles.emptyButton} /> : null}
    </View>
  );
}

export function WasherHero({ onPress }: { onPress: () => void }) {
  return (
    <LinearGradient colors={[colors.light.primary, colors.light.primaryDeep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
      <View style={styles.heroOrb} />
      <View style={styles.heroCopy}>
        <Text style={styles.heroKicker}>FRESH CLOTHES, LESS TO DO</Text>
        <Text style={styles.heroTitle}>Laundry day, handled.</Text>
        <Text style={styles.heroBody}>Book a pickup in under a minute. We’ll take it from here.</Text>
        <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.heroCta, pressed && styles.pressed]}>
          <Text style={styles.heroCtaText}>Schedule pickup</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.light.primary} />
        </Pressable>
      </View>
      <View style={styles.heroIcon}><MaterialCommunityIcons name="washing-machine" size={66} color={colors.light.primaryForeground} /></View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  brandMark: { width: 44, height: 44, borderRadius: 15, backgroundColor: colors.light.mintSoft, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  brandMarkSmall: { width: 30, height: 30, borderRadius: 10 },
  brandFold: { position: 'absolute', bottom: 8, right: 8, width: 9, height: 4, backgroundColor: colors.light.mint, borderRadius: 4, transform: [{ rotate: '-25deg' }] },
  screenHeader: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  headerBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerBrandText: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 17, letterSpacing: -0.4 },
  headerTextBlock: { flex: 1 },
  screenTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 22, letterSpacing: -0.7 },
  screenSubtitle: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 13, marginTop: 3 },
  iconButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 21, backgroundColor: colors.light.card },
  headerSpacer: { width: 42 },
  button: { minHeight: 48, paddingHorizontal: 18, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  buttonPrimary: { backgroundColor: colors.light.primary },
  buttonSecondary: { backgroundColor: colors.light.blueSoft },
  buttonGhost: { backgroundColor: 'transparent', paddingHorizontal: 8 },
  buttonDisabled: { opacity: 0.55 },
  buttonText: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: colors.light.primaryForeground },
  buttonTextDark: { color: colors.light.primary },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 18, letterSpacing: -0.3 },
  sectionAction: { color: colors.light.primary, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  statusPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 99, flexDirection: 'row', alignItems: 'center', gap: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusPillText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  iconTile: { alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  serviceCard: { minHeight: 116, backgroundColor: colors.light.card, borderRadius: 22, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 13, borderWidth: 1, borderColor: colors.light.border },
  serviceCardCompact: { minHeight: 88, padding: 11, borderRadius: 18 },
  serviceCardSelected: { borderColor: colors.light.primary, borderWidth: 2, backgroundColor: colors.light.blueWash },
  serviceCardBody: { flex: 1 },
  serviceName: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 15 },
  serviceDescription: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4, lineHeight: 17 },
  serviceMeta: { flexDirection: 'row', gap: 9, alignItems: 'center', marginTop: 8 },
  servicePrice: { color: colors.light.primary, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  serviceTurnaround: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 11 },
  orderCard: { backgroundColor: colors.light.card, borderRadius: 24, padding: 18, borderWidth: 1, borderColor: colors.light.border },
  orderCardTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' },
  eyebrow: { color: colors.light.mutedForeground, fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1 },
  orderService: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 17, marginTop: 5 },
  orderItems: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 13, marginTop: 12 },
  orderMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  orderMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  orderMetaText: { color: colors.light.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 12 },
  orderPrice: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 17 },
  orderActions: { flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 6 },
  orderActionButton: { flex: 1 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  infoIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.light.blueSoft, alignItems: 'center', justifyContent: 'center' },
  infoText: { flex: 1 },
  infoLabel: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 12 },
  infoValue: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 14, marginTop: 3 },
  field: { gap: 8 },
  fieldLabel: { color: colors.light.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  input: { backgroundColor: colors.light.card, borderWidth: 1, borderColor: colors.light.border, borderRadius: 14, minHeight: 48, paddingHorizontal: 14, color: colors.light.foreground, fontFamily: 'Inter_400Regular', fontSize: 14 },
  trustNote: { backgroundColor: colors.light.mintSoft, borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  trustText: { color: colors.light.success, fontFamily: 'Inter_500Medium', fontSize: 12, flex: 1, lineHeight: 17 },
  emptyState: { alignItems: 'center', paddingHorizontal: 26, paddingVertical: 40 },
  emptyIcon: { width: 56, height: 56, borderRadius: 20, backgroundColor: colors.light.blueSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  emptyTitle: { color: colors.light.foreground, fontFamily: 'Inter_700Bold', fontSize: 18, textAlign: 'center' },
  emptyBody: { color: colors.light.mutedForeground, fontFamily: 'Inter_400Regular', fontSize: 13, textAlign: 'center', lineHeight: 19, marginTop: 7 },
  emptyButton: { marginTop: 18 },
  hero: { borderRadius: 28, minHeight: 236, padding: 22, overflow: 'hidden', flexDirection: 'row', position: 'relative' },
  heroCopy: { flex: 1, zIndex: 1 },
  heroKicker: { color: colors.light.mint, fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.2 },
  heroTitle: { color: colors.light.primaryForeground, fontFamily: 'Inter_700Bold', fontSize: 28, letterSpacing: -1.1, marginTop: 12, maxWidth: 230 },
  heroBody: { color: colors.light.heroText, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, marginTop: 9, maxWidth: 245 },
  heroCta: { backgroundColor: colors.light.primaryForeground, borderRadius: 14, minHeight: 42, paddingHorizontal: 14, alignSelf: 'flex-start', marginTop: 18, flexDirection: 'row', alignItems: 'center', gap: 9 },
  heroCtaText: { color: colors.light.primary, fontFamily: 'Inter_700Bold', fontSize: 13 },
  heroIcon: { width: 78, height: 78, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', marginTop: 18, marginRight: 2 },
  heroOrb: { position: 'absolute', width: 210, height: 210, borderRadius: 110, right: -72, bottom: -92, backgroundColor: 'rgba(75,198,185,0.18)' },
});
