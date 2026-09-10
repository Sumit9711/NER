// Global Search Universal Index for NER Command Center

export const GLOBAL_SEARCH_RECORDS = [
  // 1. VEHICLE Records
  {
    id: 'MED-07',
    type: 'VEHICLE',
    title: 'MED-07 : Medical Logistics Convoy 07',
    subtitle: 'NDRF 1st Battalion • Kohima Base Hospital • NH-29',
    district: 'Kohima (Nagaland)',
    corridor: 'NH-29',
    routePath: '/vehicles/MED-07',
    keywords: ['med-07', 'medical', 'insulin', 'ndrf', 'angami', 'kohima', 'nh-29', 'trauma']
  },
  {
    id: 'FOOD-12',
    type: 'VEHICLE',
    title: 'FOOD-12 : FCI Essential Grain Fleet 12',
    subtitle: 'Food Corporation of India • Silchar Central Godown • NH-27',
    district: 'Dima Hasao (Haflong)',
    corridor: 'NH-27',
    routePath: '/vehicles/FOOD-12',
    keywords: ['food-12', 'grain', 'rice', 'fci', 'rajen das', 'silchar', 'haflong', 'nh-27']
  },
  {
    id: 'RELIEF-21',
    type: 'VEHICLE',
    title: 'RELIEF-21 : Disaster Relief Convoy 21',
    subtitle: 'Sikkim SDMA • Gangtok Staging Camp • NH-10',
    district: 'Gangtok (Sikkim)',
    corridor: 'NH-10',
    routePath: '/vehicles/RELIEF-21',
    keywords: ['relief-21', 'purification', 'tarpaulins', 'sikkim', 'lepcha', 'gangtok', 'nh-10']
  },
  {
    id: 'MED-14',
    type: 'VEHICLE',
    title: 'MED-14 : Vaccine Cold-Chain Carrier 14',
    subtitle: 'Directorate of Health Services Mizoram • Aizawl Hospital • NH-306',
    district: 'Aizawl (Mizoram)',
    corridor: 'NH-306',
    routePath: '/vehicles/MED-14',
    keywords: ['med-14', 'vaccine', 'plasma', 'mizoram', 'aizawl', 'kolasib', 'nh-306']
  },
  {
    id: 'SUPPLY-08',
    type: 'VEHICLE',
    title: 'SUPPLY-08 : Civil Supplies Bulk Carrier 08',
    subtitle: 'Consumer Affairs & Public Distribution • Imphal Depot • NH-37',
    district: 'Imphal West (Manipur)',
    corridor: 'NH-37',
    routePath: '/vehicles/SUPPLY-08',
    keywords: ['supply-08', 'kerosene', 'lpg', 'manipur', 'imphal', 'jiribam', 'nh-37']
  },
  {
    id: 'AMB-03',
    type: 'VEHICLE',
    title: 'AMB-03 : Advanced Life Support Ambulance 03',
    subtitle: 'Assam Emergency Medical Services • Guwahati Neurological • NH-27',
    district: 'Kamrup Metro (Guwahati)',
    corridor: 'NH-27',
    routePath: '/vehicles/AMB-03',
    keywords: ['amb-03', 'ambulance', 'critical care', 'tezpur', 'guwahati', 'nh-27']
  },

  // 2. INCIDENT Records
  {
    id: 'INC-1042',
    type: 'INCIDENT',
    title: 'INC-1042 : Verified Landslide on NH-6',
    subtitle: 'Mile 28, East Khasi Hills near Shillong • CRITICAL (45m mud slurry)',
    district: 'East Khasi Hills (Shillong)',
    corridor: 'NH-6',
    routePath: '/incidents/INC-1042',
    keywords: ['inc-1042', 'landslide', 'shillong', 'east khasi hills', 'mile 28', 'nh-6', 'mud slurry', 'critical']
  },
  {
    id: 'INC-1041',
    type: 'INCIDENT',
    title: 'INC-1041 : Severe Rockslide on NH-29',
    subtitle: 'Chumukedima Gorge Mile 14 • CRITICAL (Both lanes buried)',
    district: 'Kohima (Nagaland)',
    corridor: 'NH-29',
    routePath: '/incidents/INC-1041',
    keywords: ['inc-1041', 'rockfall', 'rockslide', 'chumukedima', 'dimapur', 'kohima', 'nh-29', 'critical']
  },
  {
    id: 'INC-1040',
    type: 'INCIDENT',
    title: 'INC-1040 : River Surge & Road Scour on NH-10',
    subtitle: 'Teesta Low Bridge Mile 29 • CRITICAL (0.8m standing river water)',
    district: 'Kalimpong / Sikkim Axis',
    corridor: 'NH-10',
    routePath: '/incidents/INC-1040',
    keywords: ['inc-1040', 'flash flood', 'teesta', 'gangtok', 'sevoke', 'nh-10', 'scour']
  },
  {
    id: 'INC-1039',
    type: 'INCIDENT',
    title: 'INC-1039 : Flash Flood & Culvert Silt on NH-37',
    subtitle: 'Kaziranga Southern Bypass • HIGH (Shoulder washouts)',
    district: 'Golaghat / Nagaon',
    corridor: 'NH-37',
    routePath: '/incidents/INC-1039',
    keywords: ['inc-1039', 'flood', 'kaziranga', 'culvert', 'nagaon', 'nh-37', 'waterlogging']
  },
  {
    id: 'INC-1038',
    type: 'INCIDENT',
    title: 'INC-1038 : Clay Slurry Debris on NH-27',
    subtitle: 'Jatinga Valley Descent Mile 22 • HIGH (Single lane alternating)',
    district: 'Dima Hasao (Haflong)',
    corridor: 'NH-27',
    routePath: '/incidents/INC-1038',
    keywords: ['inc-1038', 'mudslide', 'jatinga', 'haflong', 'dima hasao', 'nh-27', 'clay']
  },

  // 3. ROUTE Records
  {
    id: 'ROUTE-NH6',
    type: 'ROUTE',
    title: 'NH-6 : Jorabat - Shillong - Silchar Lifeline',
    subtitle: 'Meghalaya & Assam • Alternative Bypass via Mawryngkneng Active',
    district: 'East Khasi Hills / Ri-Bhoi',
    corridor: 'NH-6',
    routePath: '/route-recommendations',
    keywords: ['nh-6', 'nh6', 'shillong', 'jorabat', 'silchar', 'mawryngkneng', 'route', 'corridor']
  },
  {
    id: 'ROUTE-NH29',
    type: 'ROUTE',
    title: 'NH-29 : Dimapur - Kohima - Imphal Lifeline',
    subtitle: 'Nagaland & Manipur • Niuland-Zhadima Alternate Detour Configured',
    district: 'Kohima / Dimapur',
    corridor: 'NH-29',
    routePath: '/route-recommendations',
    keywords: ['nh-29', 'nh29', 'dimapur', 'kohima', 'imphal', 'niuland', 'route', 'corridor']
  },
  {
    id: 'ROUTE-NH10',
    type: 'ROUTE',
    title: 'NH-10 : Siliguri - Teesta - Gangtok Axis',
    subtitle: 'Sikkim & West Bengal • Lava-Damdim Detour Evaluated',
    district: 'Kalimpong / Gangtok',
    corridor: 'NH-10',
    routePath: '/route-recommendations',
    keywords: ['nh-10', 'nh10', 'siliguri', 'teesta', 'gangtok', 'sikkim', 'route', 'corridor']
  },
  {
    id: 'ROUTE-NH37',
    type: 'ROUTE',
    title: 'NH-37 : Guwahati - Jorhat - Dibrugarh Arterial',
    subtitle: 'Assam Brahmaputra Valley Trunk Route • Heavy Multi-Axle Traffic',
    district: 'Kamrup / Nagaon / Jorhat',
    corridor: 'NH-37',
    routePath: '/route-recommendations',
    keywords: ['nh-37', 'nh37', 'guwahati', 'jorhat', 'dibrugarh', 'nagaon', 'route', 'corridor']
  },
  {
    id: 'ROUTE-NH27',
    type: 'ROUTE',
    title: 'NH-27 : Lumding - Haflong - Silchar Corridor',
    subtitle: 'Assam Hill Section • Jatinga Valley PWD Escort Batching',
    district: 'Dima Hasao / Cachar',
    corridor: 'NH-27',
    routePath: '/route-recommendations',
    keywords: ['nh-27', 'nh27', 'lumding', 'haflong', 'silchar', 'cachar', 'route', 'corridor']
  },

  // 4. DELIVERY Records
  {
    id: 'DEL-8901',
    type: 'DELIVERY',
    title: 'DEL-8901 : Emergency Trauma Kits & Insulin',
    subtitle: 'Convoy: MED-07 • Guwahati &rarr; Kohima Hospital • CRITICAL',
    district: 'Kohima (Nagaland)',
    corridor: 'NH-29',
    routePath: '/deliveries',
    keywords: ['del-8901', 'trauma kits', 'insulin', 'med-07', 'medicines', 'kohima', 'delivery']
  },
  {
    id: 'DEL-8902',
    type: 'DELIVERY',
    title: 'DEL-8902 : Fortified Rice & Baby Formula',
    subtitle: 'Convoy: FOOD-12 • Lumding &rarr; Silchar Godown • HIGH',
    district: 'Cachar (Silchar)',
    corridor: 'NH-27',
    routePath: '/deliveries',
    keywords: ['del-8902', 'rice', 'food', 'formula', 'food-12', 'silchar', 'delivery']
  },
  {
    id: 'DEL-8903',
    type: 'DELIVERY',
    title: 'DEL-8903 : Vaccine Cold-Chain & Blood Plasma',
    subtitle: 'Convoy: MED-14 • Silchar &rarr; Aizawl Hospital • CRITICAL',
    district: 'Aizawl (Mizoram)',
    corridor: 'NH-306',
    routePath: '/deliveries',
    keywords: ['del-8903', 'vaccines', 'plasma', 'cold-chain', 'med-14', 'aizawl', 'delivery']
  },
  {
    id: 'DEL-8905',
    type: 'DELIVERY',
    title: 'DEL-8905 : Pre-Stressed Concrete Bridge Girders',
    subtitle: 'Convoy: CONST-19 • Guwahati &rarr; Mile 28 Restoration • HIGH',
    district: 'East Khasi Hills (NH-6)',
    corridor: 'NH-6',
    routePath: '/deliveries',
    keywords: ['del-8905', 'bridge', 'girders', 'cement', 'construction', 'mile 28', 'delivery']
  },
  {
    id: 'DEL-8906',
    type: 'DELIVERY',
    title: 'DEL-8906 : Ready-to-Eat Emergency Meals & Water',
    subtitle: 'Convoy: RELIEF-21 • Siliguri &rarr; Gangtok Camp • CRITICAL',
    district: 'Gangtok (Sikkim)',
    corridor: 'NH-10',
    routePath: '/deliveries',
    keywords: ['del-8906', 'meals', 'water', 'relief-21', 'food', 'gangtok', 'delivery']
  },
  {
    id: 'DEL-8907',
    type: 'DELIVERY',
    title: 'DEL-8907 : Bailey Bridge Modular Spans',
    subtitle: 'Convoy: CONST-08 • Bongaigaon &rarr; Teesta River Site • CRITICAL',
    district: 'Kalimpong / Sikkim',
    corridor: 'NH-10',
    routePath: '/deliveries',
    keywords: ['del-8907', 'bailey bridge', 'spans', 'bro', 'construction', 'teesta', 'delivery']
  }
];

export const searchGlobalIndex = (query) => {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toLowerCase();

  return GLOBAL_SEARCH_RECORDS.filter((rec) => {
    return (
      rec.id.toLowerCase().includes(q) ||
      rec.title.toLowerCase().includes(q) ||
      rec.subtitle.toLowerCase().includes(q) ||
      rec.district.toLowerCase().includes(q) ||
      rec.corridor.toLowerCase().includes(q) ||
      rec.keywords.some((k) => k.includes(q))
    );
  });
};
