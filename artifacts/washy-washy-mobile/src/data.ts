export type Service = {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  turnaround: string;
  icon: string;
  tint: string;
};

export type LaundryItem = {
  id: string;
  label: string;
  icon: string;
};

export type Order = {
  id: string;
  service: string;
  items: string;
  pickup: string;
  delivery: string;
  status: string;
  statusDetail: string;
  price: string;
  bagId: string;
};

export const services: Service[] = [
  {
    id: 'wash-fold',
    name: 'Wash & Fold',
    description: 'Everyday clothes, fresh and ready',
    priceLabel: 'From ₹49/kg',
    turnaround: '2–3 days',
    icon: 'tshirt-crew-outline',
    tint: '#DDEBFF',
  },
  {
    id: 'wash-iron',
    name: 'Wash & Iron',
    description: 'Clean, pressed, and neatly folded',
    priceLabel: 'From ₹69/kg',
    turnaround: '2–3 days',
    icon: 'iron-outline',
    tint: '#DDF7F0',
  },
  {
    id: 'iron',
    name: 'Iron Only',
    description: 'Crisp clothes without the wash',
    priceLabel: 'From ₹12/item',
    turnaround: '1–2 days',
    icon: 'hanger',
    tint: '#FFF0D9',
  },
  {
    id: 'dry-clean',
    name: 'Dry Cleaning',
    description: 'Premium care for special pieces',
    priceLabel: 'From ₹99/item',
    turnaround: '3–4 days',
    icon: 'briefcase-outline',
    tint: '#EDE5FF',
  },
];

export const laundryItems: LaundryItem[] = [
  { id: 'shirt', label: 'Shirt', icon: 'tshirt-crew-outline' },
  { id: 'tshirt', label: 'T-shirt', icon: 'tshirt-crew-outline' },
  { id: 'jeans', label: 'Jeans', icon: 'human-male' },
  { id: 'trouser', label: 'Trouser', icon: 'human-male' },
  { id: 'saree', label: 'Saree', icon: 'human-female' },
  { id: 'bedsheet', label: 'Bedsheet', icon: 'bed-outline' },
  { id: 'blanket', label: 'Blanket', icon: 'bed-outline' },
  { id: 'jacket', label: 'Jacket', icon: 'bag-personal-outline' },
];

export const timeSlots = [
  { day: 'Today', date: '18 Sep', slots: ['6–8 PM'] },
  { day: 'Tomorrow', date: '19 Sep', slots: ['8–10 AM', '10 AM–12 PM', '6–8 PM'] },
];

export const orderHistory: Order[] = [
  {
    id: 'LM10231',
    service: 'Wash + Iron',
    items: '4 shirts · 2 jeans · 1 saree',
    pickup: 'Sep 8 · 6–8 PM',
    delivery: 'Delivered Sep 10',
    status: 'Delivered',
    statusDetail: 'Everything is back with you',
    price: '₹425',
    bagId: 'BAG-8F72A9',
  },
  {
    id: 'LM10188',
    service: 'Wash & Fold',
    items: '6 kg everyday laundry',
    pickup: 'Aug 29 · 8–10 AM',
    delivery: 'Delivered Aug 31',
    status: 'Delivered',
    statusDetail: 'Completed on time',
    price: '₹392',
    bagId: 'BAG-7A41C2',
  },
];

export const plans = [
  {
    id: 'weekly',
    name: 'Weekly',
    price: '₹699',
    unit: '/month',
    description: 'Pickup every week',
    detail: 'Up to 8 kg per pickup',
    tint: '#E9F1FF',
  },
  {
    id: 'family',
    name: 'Family',
    price: '₹1,299',
    unit: '/month',
    description: 'For a busy household',
    detail: 'Up to 16 kg per pickup',
    tint: '#DDF7F0',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹1,799',
    unit: '/month',
    description: 'Priority processing + care',
    detail: 'Up to 20 kg per pickup',
    tint: '#FFF0D9',
  },
];

export const copy = {
  greeting: 'Good morning',
  neighborhood: 'Kakkanad',
  apartment: 'Prestige Hillside',
  serviceableAddress: 'Home · Kakkanad',
  localPartner: 'Suds & Co.',
};

export const pendingPriceApproval = {
  estimated: '₹380',
  final: '₹425',
  reason: '2 items needed stain treatment',
  detail: 'We found two pieces that need extra stain treatment for a better finish.',
};
