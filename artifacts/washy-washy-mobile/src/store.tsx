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
  setDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
  confirmBooking: (order: Order) => void;
  clearActiveOrder: () => void;
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

  useEffect(() => {
    AsyncStorage.getItem('washy-active-order')
      .then((value) => {
        if (value) setActiveOrder(JSON.parse(value) as Order);
      })
      .catch(() => undefined);
  }, []);

  const confirmBooking = (order: Order) => {
    setActiveOrder(order);
    void AsyncStorage.setItem('washy-active-order', JSON.stringify(order));
  };

  const clearActiveOrder = () => {
    setActiveOrder(null);
    void AsyncStorage.removeItem('washy-active-order');
  };

  const value = useMemo(
    () => ({ activeOrder, draft, setDraft, confirmBooking, clearActiveOrder }),
    [activeOrder, draft],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
