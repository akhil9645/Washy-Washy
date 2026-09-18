import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Order } from './data';

type BookingDraft = {
  serviceId: string;
  items: Record<string, number>;
  timeSlot: string;
  day: string;
  instructions: string[];
};

type AppContextValue = {
  activeOrder: Order | null;
  draft: BookingDraft;
  onboardingComplete: boolean | null;
  setDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
  confirmBooking: (order: Order) => void;
  clearActiveOrder: () => void;
  completeOnboarding: () => void;
};

const defaultDraft: BookingDraft = {
  serviceId: 'wash-iron',
  items: { shirt: 4, jeans: 2, saree: 1 },
  timeSlot: '6–8 PM',
  day: 'Today',
  instructions: ['Separate clothes'],
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [draft, setDraft] = useState<BookingDraft>(defaultDraft);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem('washy-active-order'),
      AsyncStorage.getItem('washy-onboarding-complete'),
    ])
      .then(([orderValue, onboardingValue]) => {
        if (orderValue) setActiveOrder(JSON.parse(orderValue) as Order);
        setOnboardingComplete(onboardingValue === 'true');
      })
      .catch(() => setOnboardingComplete(false));
  }, []);

  const confirmBooking = (order: Order) => {
    setActiveOrder(order);
    void AsyncStorage.setItem('washy-active-order', JSON.stringify(order));
  };

  const clearActiveOrder = () => {
    setActiveOrder(null);
    void AsyncStorage.removeItem('washy-active-order');
  };

  const completeOnboarding = () => {
    setOnboardingComplete(true);
    void AsyncStorage.setItem('washy-onboarding-complete', 'true');
  };

  const value = useMemo(
    () => ({ activeOrder, draft, onboardingComplete, setDraft, confirmBooking, clearActiveOrder, completeOnboarding }),
    [activeOrder, draft, onboardingComplete],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
