// Deliveries Dataset for NER Logistics Platform

export const DELIVERY_CATEGORIES = [
  'All Categories',
  'Medicines',
  'Food',
  'Agricultural Produce',
  'Construction Materials'
];

export const DELIVERY_PRIORITIES = [
  'All Priorities',
  'CRITICAL',
  'HIGH',
  'NORMAL'
];

export const DELIVERY_STATUSES = [
  'All Statuses',
  'IN_TRANSIT',
  'DELIVERED',
  'DELAYED',
  'PENDING_CLEARANCE'
];

export const DELIVERIES_DATA = [
  {
    deliveryId: 'DEL-8901',
    vehicle: 'MED-07',
    category: 'Medicines',
    commodity: 'Emergency Trauma Kits & Insulin',
    origin: 'Guwahati Medical Depot (Assam)',
    destination: 'Kohima Base Hospital (Nagaland)',
    corridor: 'NH-29',
    status: 'DELAYED',
    eta: 'Today 17:45 IST',
    delay: '+35 min',
    delayMinutes: 35,
    priority: 'CRITICAL',
    weight: '14 MT',
    driver: 'Havildar P. Angami',
    consignee: 'Nagaland State Health Directorate'
  },
  {
    deliveryId: 'DEL-8902',
    vehicle: 'FOOD-12',
    category: 'Food',
    commodity: 'Fortified Rice & Baby Formula',
    origin: 'Lumding Railhead (Assam)',
    destination: 'Silchar Central Godown (Assam)',
    corridor: 'NH-27',
    status: 'DELAYED',
    eta: 'Today 17:45 IST',
    delay: '+90 min',
    delayMinutes: 90,
    priority: 'HIGH',
    weight: '45 MT',
    driver: 'Rajen Das',
    consignee: 'Food Corporation of India (Barak Valley)'
  },
  {
    deliveryId: 'DEL-8903',
    vehicle: 'MED-14',
    category: 'Medicines',
    commodity: 'Vaccine Cold-Chain & Blood Plasma',
    origin: 'Silchar Civil Hospital (Assam)',
    destination: 'Aizawl Civil Hospital (Mizoram)',
    corridor: 'NH-306',
    status: 'IN_TRANSIT',
    eta: 'Today 16:25 IST',
    delay: '+35 min',
    delayMinutes: 35,
    priority: 'CRITICAL',
    weight: '8 MT',
    driver: 'Lalthan Mawia',
    consignee: 'Directorate of Health Services Mizoram'
  },
  {
    deliveryId: 'DEL-8904',
    vehicle: 'AGRI-04',
    category: 'Agricultural Produce',
    commodity: 'Organic Ginger & Pineapples (FPO Export)',
    origin: 'Bokajan Farmers Cooperative (Assam)',
    destination: 'Guwahati Cargo Terminal (Assam)',
    corridor: 'NH-39',
    status: 'IN_TRANSIT',
    eta: 'Today 18:10 IST',
    delay: '+15 min',
    delayMinutes: 15,
    priority: 'NORMAL',
    weight: '22 MT',
    driver: 'M. Bordoloi',
    consignee: 'NERAMAC Cold Storage Facility'
  },
  {
    deliveryId: 'DEL-8905',
    vehicle: 'CONST-19',
    category: 'Construction Materials',
    commodity: 'Pre-Stressed Concrete Girders & Cement',
    origin: 'Guwahati Cement Terminal',
    destination: 'Mile 28 Landslide Restoration Depot (NH-6)',
    corridor: 'NH-6',
    status: 'IN_TRANSIT',
    eta: 'Today 15:30 IST',
    delay: 'On Schedule',
    delayMinutes: 0,
    priority: 'HIGH',
    weight: '38 MT',
    driver: 'K. R. Sangma',
    consignee: 'Meghalaya PWD Emergency Repair Cell'
  },
  {
    deliveryId: 'DEL-8906',
    vehicle: 'RELIEF-21',
    category: 'Food',
    commodity: 'Emergency Ready-to-Eat Meals & Purified Water',
    origin: 'Siliguri Disaster Hub (West Bengal)',
    destination: 'Gangtok Disaster Staging Camp (Sikkim)',
    corridor: 'NH-10',
    status: 'DELAYED',
    eta: 'Today 21:10 IST',
    delay: '+2h 40m',
    delayMinutes: 160,
    priority: 'CRITICAL',
    weight: '26 MT',
    driver: 'Subedar T. Lepcha',
    consignee: 'Sikkim State Disaster Management Authority'
  },
  {
    deliveryId: 'DEL-8907',
    vehicle: 'CONST-08',
    category: 'Construction Materials',
    commodity: 'Prefabricated Bailey Bridge Modular Spans',
    origin: 'Bongaigaon Engineering Yard (Assam)',
    destination: 'Teesta River Bypass Site (NH-10)',
    corridor: 'NH-27 / NH-10',
    status: 'IN_TRANSIT',
    eta: 'Tomorrow 08:00 IST',
    delay: '+45 min',
    delayMinutes: 45,
    priority: 'CRITICAL',
    weight: '52 MT',
    driver: 'Gurmeet Singh (Heavy Transport)',
    consignee: 'Border Roads Organisation (Project Swastik)'
  },
  {
    deliveryId: 'DEL-8908',
    vehicle: 'AGRI-11',
    category: 'Agricultural Produce',
    commodity: 'Fresh Kiwis & Large Cardamom',
    origin: 'Ziro Valley Farmers Collective (Arunachal)',
    destination: 'Guwahati Wholesale Market (Assam)',
    corridor: 'NH-13',
    status: 'IN_TRANSIT',
    eta: 'Today 20:45 IST',
    delay: 'On Schedule',
    delayMinutes: 0,
    priority: 'NORMAL',
    weight: '16 MT',
    driver: 'Tage Duyu',
    consignee: 'Northeast Fresh Produce Aggregators'
  },
  {
    deliveryId: 'DEL-8909',
    vehicle: 'SUPPLY-08',
    category: 'Food',
    commodity: 'LPG Domestic Gas Cylinders & Kerosene',
    origin: 'Silchar Bottling Plant (Assam)',
    destination: 'Imphal Public Distribution Depot (Manipur)',
    corridor: 'NH-37',
    status: 'PENDING_CLEARANCE',
    eta: 'Today 20:30 IST',
    delay: '+1h 10m',
    delayMinutes: 70,
    priority: 'HIGH',
    weight: '32 MT',
    driver: 'N. Ningombam',
    consignee: 'Consumer Affairs & Public Distribution Manipur'
  },
  {
    deliveryId: 'DEL-8910',
    vehicle: 'MED-03',
    category: 'Medicines',
    commodity: 'Dialysis Consumables & Surgical Equipment',
    origin: 'Guwahati Medical Warehouse',
    destination: 'Agartala Government Medical College (Tripura)',
    corridor: 'NH-8',
    status: 'DELIVERED',
    eta: 'Today 09:30 IST',
    delay: 'On Time (0 min)',
    delayMinutes: 0,
    priority: 'HIGH',
    weight: '12 MT',
    driver: 'S. Debbarma',
    consignee: 'Tripura Health Services Directorate'
  }
];

export const DELIVERY_STATS = {
  totalTonnageInTransit: '384 MT',
  deliveredThisWeek: '2,140 MT',
  criticalPriorityCount: 4,
  highPriorityCount: 4,
  normalPriorityCount: 2,
  onTimeDeliveryRate: '78.5%'
};
