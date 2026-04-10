
export const COLORS = {
  SAFFRON: '#D4882E',
  SAFFRON_LIGHT: '#F0C878',
  GREEN_DEEP: '#2E5339',
  GREEN_MID: '#3D7A52',
  CREAM: '#FAF6F0',
  CREAM_DARK: '#F0E8DC',
  INK: '#1A1A18',
  INK_SOFT: '#4A4A45',
  INK_MUTED: '#7A7A72',
  BORDER: '#E8E0D5',
  DARK_SCENE: '#0C0E0A'
};

export const MOCK_PRODUCTS: any[] = [
  {
    id: 'triphala-churna',
    name: 'Triphala Churna',
    label: 'Ayurvedic Detoxifier & Rejuvenator',
    shortDesc: 'Classic Ayurvedic powder for digestion, systemic cleansing and vitality. 100 gms.',
    price: 150,
    image: '/images/TriphalaChurna_2.png',
    category: 'Wellness',
    features: [
      { title: 'Gentle Detox', desc: 'Promotes regular bowel movements.', icon: 'eco' },
      { title: 'Digestive Health', desc: 'Soothes the digestive tract.', icon: 'health_and_safety' },
      { title: 'Antioxidant Rich', desc: 'Supports overall immunity.', icon: 'verified' }
    ],
    botanicals: [
      { name: 'Amla', desc: 'Rich in Vitamin C, it strengthens digestion and immunity.', image: 'https://picsum.photos/seed/amla/400/400' },
      { name: 'Haritaki', desc: 'Known for its gently laxative and detoxifying properties.', image: 'https://picsum.photos/seed/haritaki/400/400' },
      { name: 'Vibhitaki', desc: 'Supports respiratory health and tissue toning.', image: 'https://picsum.photos/seed/vibhitaki/400/400' }
    ],
    ritual: [
      { title: 'Measure', desc: 'Take 1 tsp of Triphala Churna.' },
      { title: 'Mix', desc: 'Mix with warm water.' },
      { title: 'Consume', desc: 'Drink before bedtime or morning on empty stomach.' }
    ],
    results: [
      { percentage: '92%', text: 'Reported better morning digestion.' }
    ]
  },
  {
    id: 'yummunity',
    name: 'Yummunity Kids',
    label: 'Immunity Booster',
    shortDesc: 'A delicious immunity-boosting syrup formulated specifically for children.',
    price: 250,
    image: '/images/Yummunity Bottle.png',
    category: 'Wellness',
    features: [
      { title: 'Kid-Friendly Taste', desc: 'Formulated to be delicious and easy to consume.', icon: 'child_care' },
      { title: 'Builds Immunity', desc: 'Strengthens natural defenses in children.', icon: 'shield' },
      { title: 'Natural Ingredients', desc: 'Safe, Ayurvedic formulation.', icon: 'eco' }
    ],
    botanicals: [
      { name: 'Tulsi', desc: 'Holy Basil, known for its immunomodulatory properties.', image: 'https://picsum.photos/seed/tulsi/400/400' },
      { name: 'Guduchi', desc: 'Powerful adaptogen that supports immune function.', image: 'https://picsum.photos/seed/guduchi/400/400' }
    ],
    ritual: [
      { title: 'Measure', desc: 'Take 1-2 tsp.' },
      { title: 'Consume', desc: 'Drink directly or mix with warm water/milk.' }
    ],
    results: [
      { percentage: '88%', text: 'Parents reported fewer sick days.' }
    ]
  },
  {
    id: 'trip-caps',
    name: 'Trip Caps',
    label: 'Constipation Relief',
    shortDesc: 'Smooth movement and relief from constipation in a convenient capsule.',
    price: 220,
    image: '/images/Tripcaps_1.png',
    category: 'Wellness',
    features: [
      { title: 'Quick Relief', desc: 'Effective overnight relief from constipation.', icon: 'fast_forward' },
      { title: 'Non-Habit Forming', desc: 'Gentle on the bowels, no dependency.', icon: 'verified_user' },
      { title: 'Convenient', desc: 'Easy to swallow capsules for travel.', icon: 'medication' }
    ],
    botanicals: [
      { name: 'Senna', desc: 'Natural laxative herb to aid bowel movements.', image: 'https://picsum.photos/seed/senna/400/400' },
      { name: 'Fennel', desc: 'Soothes cramping and bloating associated with constipation.', image: 'https://picsum.photos/seed/fennel/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: 'Take 1-2 capsules.' },
      { title: 'Timing', desc: 'Consume with warm water before bedtime.' }
    ],
    results: [
      { percentage: '95%', text: 'Reported comfortable morning relief.' }
    ]
  },
  {
    id: 'zeer-alka',
    name: 'Zeer Alka Syrup',
    label: 'Kidney Health & Urinary Alkaliser',
    shortDesc: 'Natural Urinary Alkaliser and Kidney Support. 200ml bottle.',
    price: 220,
    image: '/images/ZeerAlka_1.png',
    category: 'Therapeutics',
    features: [
      { title: 'Normalizes pH', desc: 'Balances acidity in the urinary tract to prevent crystal formation.', icon: 'water_drop' },
      { title: 'Flushes Toxins', desc: 'Natural diuretic properties flush out harmful bacteria.', icon: 'air' },
      { title: 'Relieves Burning', desc: 'Soothes urinary lining and provides quick relief.', icon: 'local_fire_department' }
    ],
    botanicals: [
      { name: 'Varuna', desc: 'Renowned for its ability to break down renal calculi.', image: 'https://picsum.photos/seed/varuna/400/400' },
      { name: 'Punarnava', desc: 'Acts as a natural diuretic and kidney rejuvenator.', image: 'https://picsum.photos/seed/punarnava/400/400' },
      { name: 'Gokshura', desc: 'Promotes healthy urinary function.', image: 'https://picsum.photos/seed/gokshura/400/400' }
    ],
    ritual: [
      { title: 'Measure', desc: 'Take 10-15ml.' },
      { title: 'Mix', desc: 'Dilute with equal parts water.' },
      { title: 'Consume', desc: 'Take thrice daily after meals.' },
      { title: 'Hydrate', desc: 'Maintain hydration by drinking fluids.' }
    ],
    results: [
      { percentage: '95%', text: 'Reported quick relief from burning sensation.' }
    ]
  },
  {
    id: 'widari-forte',
    name: 'Widari Forte Granules',
    label: 'Supports Male Vitality',
    shortDesc: 'Ayurvedic formulation designed to address the modern Male Infertility Crisis and sexual insufficiencies.',
    price: 750,
    image: '/images/WidariForte_2.png',
    category: 'Therapeutics',
    features: [
      { title: 'Enhances Vitality', desc: 'Natural energy boosters that work at the cellular level.', icon: 'bolt' },
      { title: 'Reproductive Health', desc: 'Balances hormones and improves male reproductive performance.', icon: 'health_and_safety' },
      { title: 'Reduces Stress', desc: 'Adaptogenic ingredients that help manage cortisol.', icon: 'psychology' }
    ],
    botanicals: [
      { name: 'Ashwagandha', desc: 'Reduces cortisol and boosts muscle strength and testosterone.', image: 'https://picsum.photos/seed/ashwagandha/400/400' },
      { name: 'Safed Musli', desc: 'Potent aphrodisiac and improves sperm count and motility.', image: 'https://picsum.photos/seed/musli/400/400' },
      { name: 'Gokshura', desc: 'Supports urogenital health and enhances drive.', image: 'https://picsum.photos/seed/gokshura/400/400' }
    ],
    ritual: [
      { title: 'Measure', desc: 'Take 1 tsp (5g) of granules.' },
      { title: 'Mix', desc: 'Mix thoroughly with a cup of warm milk.' }
    ],
    results: [
      { percentage: '88%', text: 'Reported increased energy.' }
    ]
  },
  {
    id: 'thyrogard',
    name: 'ThyroGard',
    label: 'Regain Your Natural Rhythm',
    shortDesc: 'A potent Ayurvedic blend formulated to boost thyroid function and balance metabolism naturally.',
    price: 450,
    image: '/images/Thyro_1.png',
    category: 'Wellness',
    features: [
      { title: 'Balances Metabolism', desc: 'Optimizes metabolic rate to help manage weight.', icon: 'bolt' },
      { title: 'Supports Energy', desc: 'Combats fatigue and lethargy.', icon: 'vital_signs' },
      { title: 'Herbal Formula', desc: '100% herbal with no synthetic fillers.', icon: 'potted_plant' }
    ],
    botanicals: [
      { name: 'Kanchanar', desc: 'Traditional herb for thyroid health.', image: 'https://picsum.photos/seed/kanchanar/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: 'Take 1-2 capsules daily.' }
    ],
    results: [
      { percentage: '91%', text: 'Reported better energy levels.' }
    ]
  },
  {
    id: 'suventris',
    name: 'Suventris',
    label: 'Uterine Tonic for Complete Women\'s Wellness',
    shortDesc: 'Ayurvedic formulation designed to support female reproductive health and balance hormones.',
    price: 280,
    image: '/images/Suventris_1.png',
    category: 'Wellness',
    features: [
      { title: 'Regulates Cycles', desc: 'Promotes hormonal balance to ensure regular menstrual cycles.', icon: 'event_repeat' },
      { title: 'Reduces Discomfort', desc: 'Effective in managing menstrual cramps and backaches.', icon: 'sentiment_satisfied' },
      { title: 'Nourishes Repro System', desc: 'Strengthens uterine muscles.', icon: 'monitor_heart' }
    ],
    botanicals: [
      { name: 'Ashoka', desc: 'The "remover of sorrows", known for uterine health.', image: 'https://picsum.photos/seed/ashoka/400/400' },
      { name: 'Lodhra', desc: 'Helps balance Pitta and Kapha.', image: 'https://picsum.photos/seed/lodhra/400/400' },
      { name: 'Shatavari', desc: 'The premier female rejuvenative tonic in Ayurveda.', image: 'https://picsum.photos/seed/shatavari/400/400' }
    ],
    ritual: [
      { title: 'Measure', desc: 'Take 2 tsp (10ml).' },
      { title: 'Consume', desc: 'Twice daily.' }
    ],
    results: [
      { percentage: '85%', text: 'Reported more regular cycles.' }
    ]
  },
  {
    id: 'redema',
    name: 'Redema',
    label: 'Relief from Edema',
    shortDesc: 'Relief from Edema & Promotes Healthy Weight Loss',
    price: 320,
    image: '/images/Redema_2.png',
    category: 'Wellness',
    features: [
      { title: 'Reduces Water Retention', desc: 'Helps eliminate excess fluid buildup.', icon: 'opacity' },
      { title: 'Supports Healthy Weight', desc: 'Assists in weight management.', icon: 'fitness_center' },
      { title: 'Natural Diuretic', desc: 'Gentle action supporting kidney health.', icon: 'water_drop' }
    ],
    botanicals: [
      { name: 'Punarnava', desc: 'Traditional diuretic.', image: 'https://picsum.photos/seed/punarnava/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: '2 tablets.' },
      { title: 'Consume', desc: 'Take daily with water.' }
    ],
    results: [
      { percentage: '89%', text: 'Reported reduced swelling.' }
    ]
  },
  {
    id: 'pyril-ds',
    name: 'Pyril-DS',
    label: 'Advanced Anti-Pyretic',
    shortDesc: 'Advanced Ayurvedic formulation providing fast relief from high temperature and body aches.',
    price: 150,
    image: '/images/PyrilDS_2.png',
    category: 'Wellness',
    features: [
      { title: 'Fast Relief', desc: 'Quickly reduces temperature.', icon: 'local_fire_department' },
      { title: '100% Herbal', desc: 'Safe for long-term use.', icon: 'eco' },
      { title: 'Clinically Proven', desc: 'Proven efficacy.', icon: 'science' }
    ],
    botanicals: [
      { name: 'Guduchi', desc: 'Immunity booster and antipyretic.', image: 'https://picsum.photos/seed/guduchip/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: '1 tablet.' },
      { title: 'Consume', desc: 'Take as needed.' }
    ],
    results: [
      { percentage: '94%', text: 'Reported fast temperature relief.' }
    ]
  },
  {
    id: 'orthoraksha',
    name: 'OrthoRaksha Oil',
    label: 'Deep Penetrating Ayurvedic Joint & Muscle Pain Relief',
    shortDesc: 'Formulated to address various types of musculoskeletal discomfort using ancient Taila Paka Vidhi.',
    price: 350,
    image: '/images/OrthoRaksha_2.png',
    category: 'Wellness',
    features: [
      { title: 'Fast Relief', desc: '10x Faster Absorption.', icon: 'local_fire_department' },
      { title: 'Active Herbs', desc: '12+ Botanical Extracts.', icon: 'spa' },
      { title: 'Lasting Comfort', desc: '24hr Joint Support.', icon: 'accessibility_new' }
    ],
    botanicals: [
      { name: 'Mahanarayana Tailam', desc: 'Nourishes wasted muscles and strengthens bones.', image: 'https://picsum.photos/seed/mahanarayana/400/400' }
    ],
    ritual: [
      { title: 'Warm & Apply', desc: 'Gentle Massage.' },
      { title: 'Fomentation', desc: 'Hot water bag after 30 mins.' }
    ],
    results: [
      { percentage: '96%', text: 'Reported reduced joint stiffness.' }
    ]
  },
  {
    id: 'mahanarayana',
    name: 'Mahanarayana Tailam',
    label: 'Ultimate Neuromuscular Rejuvenation',
    shortDesc: 'A profound, nourishing blend of over 40 herbs designed to deeply restore neuromuscular vitalty.',
    price: 350,
    image: '/images/MahanarayanaTaila_1.png',
    category: 'Wellness',
    features: [
      { title: 'Neuromuscular', desc: 'Rehabilitates nerve function.', icon: 'psychology' },
      { title: 'Restorative', desc: 'Rebuilds physical strength.', icon: 'fitness_center' },
      { title: 'Vata Pacifying', desc: 'Relieves severe Vata imbalances.', icon: 'spa' }
    ],
    botanicals: [
      { name: 'Ashwagandha', desc: 'Provides immense strength.', image: 'https://picsum.photos/seed/ashwagandha/400/400' },
      { name: 'Shatavari', desc: 'Supreme cooling & nourishing herb.', image: 'https://picsum.photos/seed/shatavari/400/400' }
    ],
    ritual: [
      { title: 'Abhyanga', desc: 'Warm oil and massage daily.' },
      { title: 'Basti', desc: 'Specialized pooling therapy.' }
    ],
    results: [
      { percentage: '98%', text: 'Reported improved mobility.' }
    ]
  },
  {
    id: 'nilomit',
    name: 'Nilomit Tablets',
    label: 'Natural Nausea Relief',
    shortDesc: 'Fast acting Ayurvedic relief from nausea, vomiting, and acid indigestion without drowsiness.',
    price: 120,
    image: '/images/Nilomit_2..png',
    category: 'Wellness',
    features: [
      { title: 'Non-sedative', desc: 'Motion sickness relief.', icon: 'sailing' },
      { title: 'Safe', desc: 'Morning sickness relief.', icon: 'pregnant_woman' },
      { title: 'Digestive Comfort', desc: 'Calms gastric mucosa.', icon: 'local_dining' }
    ],
    botanicals: [
      { name: 'Shunthi', desc: 'Dry Ginger for anti-nausea.', image: 'https://picsum.photos/seed/shunthi/400/400' },
      { name: 'Dhanyaka', desc: 'Coriander to pacify Pitta.', image: 'https://picsum.photos/seed/dhanyaka/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: '1-2 tablets.' },
      { title: 'Consume', desc: 'Taken with water as needed.' }
    ],
    results: [
      { percentage: '92%', text: 'Reported immediate comfort.' }
    ]
  },
  {
    id: 'daily-dew',
    name: 'Daily Dew Moisturizer',
    label: 'Heritage-Rich Ayurvedic Formula for Golden Glow',
    shortDesc: 'Experience the golden glow of Ayurveda. Daily Dew is a light, deeply nourishing moisturizer infused with Kashmiri Saffron and Kumkumadi Oil, designed to provide 24-hour hydration without any greasy residue.',
    price: 1499,
    image: '/images/Daily Dew.png',
    category: 'Skin & Hair Care',
    features: [
      { title: 'Deep Hydration', desc: 'Moisturizes skin', icon: 'water_drop' },
      { title: 'Non-Greasy', desc: 'Light texture', icon: 'flare' },
      { title: '24h Moisture', desc: 'Long lasting', icon: 'schedule' }
    ],
    botanicals: [
      { name: 'Kumkumadi Oil', desc: 'Known as "Miraculous Elixir" for skin brightening and anti-aging.', image: 'https://picsum.photos/seed/kumkumadi/400/400' },
      { name: 'Rose Water', desc: 'Steam-distilled petals to balance pH and soothe inflammation.', image: 'https://picsum.photos/seed/rosewater/400/400' }
    ],
    ritual: [
      { title: 'Cleanse', desc: 'Wash your face with a mild cleanser and pat dry gently.' },
      { title: 'Apply', desc: 'Take a pea-sized amount and dot it all over your face.' },
      { title: 'Massage', desc: 'Massage in upward circular motions until fully absorbed.' }
    ],
    results: [
      { percentage: '98%', text: 'Users reported a natural golden glow.' }
    ]
  },
  {
    id: 'madhuchari-churna',
    name: 'Madhuchari Churna',
    label: 'Ayurvedic Blood Sugar Regulator',
    shortDesc: 'Regulates blood sugar and boosts metabolism. 100g.',
    price: 350,
    image: '/images/MadhumehariChurna_2.png',
    category: 'Wellness',
    features: [
      { title: 'Regulates Sugar', desc: 'Balances blood glucose naturally.', icon: 'monitor_weight' },
      { title: 'Boosts Metabolism', desc: 'Aids in weight management.', icon: 'bolt' },
      { title: 'Pancreatic Health', desc: 'Rejuvenates beta cells.', icon: 'health_and_safety' }
    ],
    botanicals: [
      { name: 'Gurmar', desc: 'Helps curb sugar cravings.', image: 'https://picsum.photos/seed/gurmar/400/400' },
      { name: 'Jamun Seed', desc: 'Supports healthy blood sugar levels.', image: 'https://picsum.photos/seed/jamun/400/400' }
    ],
    ritual: [
      { title: 'Measure', desc: 'Take 1 tsp.' },
      { title: 'Consume', desc: 'With warm water before meals.' }
    ],
    results: [
      { percentage: '88%', text: 'Reported improved sugar levels.' }
    ]
  },
  {
    id: 'laksha-capsules',
    name: 'Laksha Capsules',
    label: 'Advanced Bone Healing',
    shortDesc: 'Natural formula for accelerating bone healing and improving bone mineral density.',
    price: 450,
    image: '/images/Laksha_1.png',
    category: 'Therapeutics',
    features: [
      { title: 'Fracture Healing', desc: 'Accelerates bone recovery.', icon: 'healing' },
      { title: 'Enhanced Density', desc: 'Strengthens bones.', icon: 'fitness_center' },
      { title: 'Bone Nourishment', desc: 'Provides vital minerals.', icon: 'spa' }
    ],
    botanicals: [
      { name: 'Laksha', desc: 'Superior herb for bone restoration.', image: 'https://picsum.photos/seed/laksha/400/400' },
      { name: 'Asthishrinkhala', desc: 'Promotes osteoblast differentiation.', image: 'https://picsum.photos/seed/asthi/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: 'Take 1-2 capsules daily.' }
    ],
    results: [
      { percentage: '94%', text: 'Reported faster recovery times.' }
    ]
  },
  {
    id: 'hepableen-syrup',
    name: 'Hepableen Syrup',
    label: 'The Holistic Liver Stimulant & Appetizer',
    shortDesc: 'A 100% Ayurvedic Liver Tonic that protects from toxins and enhances liver function.',
    price: 425,
    image: '/images/HAPABLEEN 3.jpg',
    category: 'Wellness',
    features: [
      { title: 'Stimulates Appetite', desc: 'Improves digestion and appetite.', icon: 'restaurant' },
      { title: 'Supports Detox', desc: 'Promotes liver detoxification.', icon: 'shield_moon' },
      { title: '100% Ayurvedic', desc: 'Pure Ayurvedic tradition.', icon: 'eco' }
    ],
    botanicals: [
      { name: 'Bhringraj', desc: 'Powerful liver tonic.', image: 'https://picsum.photos/seed/bhringraj/400/400' },
      { name: 'Kalmegh', desc: 'Protects the liver.', image: 'https://picsum.photos/seed/kalmegh/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: 'Take 10ml.' },
      { title: 'Consume', desc: 'Twice daily after meals.' }
    ],
    results: [
      { percentage: '96%', text: 'Reported better digestion.' }
    ]
  },
  {
    id: 'hepableen-tablets',
    name: 'Hepableen Tablets',
    label: 'Total Hepatic Restoration',
    shortDesc: 'A non-hormonal liver tonic designed for complete liver protection and cellular detoxification.',
    price: 499,
    image: '/images/Hepableen Tablets.png',
    category: 'Therapeutics',
    features: [
      { title: 'Regenerates Cells', desc: 'Stimulates liver repair.', icon: 'restart_alt' },
      { title: 'Protects from Toxins', desc: 'Neutralizes hepatotoxins.', icon: 'shield_with_heart' },
      { title: 'Enhances Function', desc: 'Optimizes bile secretion.', icon: 'bolt' }
    ],
    botanicals: [
      { name: 'Bhumyamalaki', desc: 'The liver healer.', image: 'https://picsum.photos/seed/bhumya/400/400' },
      { name: 'Katuki', desc: 'Potent detoxifier.', image: 'https://picsum.photos/seed/katuki/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: '1-2 tablets daily.' },
      { title: 'Medium', desc: 'With warm water after meals.' }
    ],
    results: [
      { percentage: '98%', text: 'Reported improved liver function.' }
    ]
  },
  {
    id: 'livercure',
    name: 'Livercure Complex Forte',
    label: 'The Triple-Action Liver Protocol',
    shortDesc: 'Complete liver protective supplement formulated for chronic liver conditions and detoxification.',
    price: 899,
    image: '/images/Livercure_2.png',
    category: 'Therapeutics',
    features: [
      { title: 'Comprehensive Protection', desc: 'Shields liver cells from toxins.', icon: 'shield' },
      { title: 'Aids Regeneration', desc: 'Rebuilds healthy liver tissue.', icon: 'health_and_safety' },
      { title: 'Detoxifies System', desc: 'Flushes harmful free radicals.', icon: 'cleaning_services' }
    ],
    botanicals: [
      { name: 'Kalmegh', desc: 'Powerful antioxidant.', image: 'https://picsum.photos/seed/kalmegh/400/400' },
      { name: 'Punarnava', desc: 'Rejuvenates and cleanses.', image: 'https://picsum.photos/seed/punarnava/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: 'Take 1-2 tablets per serving.' },
      { title: 'Consume', desc: 'Twice daily after meals.' }
    ],
    results: [
      { percentage: '99%', text: 'Reported effective systemic detoxification.' }
    ]
  },
  {
    id: 'combifore',
    name: 'Combifore',
    label: 'Natural Relief',
    shortDesc: 'Combifore is a premium therapeutic solution specifically engineered for anti-arthritic support and effective pain relief.',
    price: 35,
    image: '/images/Combifore_2.png',
    category: 'Therapeutics',
    features: [
      { title: 'Joint Mobility', desc: 'Significantly reduces stiffness in joints.', icon: 'mop' },
      { title: 'Rapid Relief', desc: 'Quick-acting formula targets localized pain.', icon: 'bolt' },
      { title: 'Long-term Care', desc: 'Supports healthy cartilage and bone density.', icon: 'shield' }
    ],
    botanicals: [
      { name: 'Sallaki', desc: 'Potent anti-inflammatory agent.', image: 'https://picsum.photos/seed/sallaki/400/400' },
      { name: 'Guggul', desc: 'Clears toxins from joints.', image: 'https://picsum.photos/seed/guggul/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: 'One tablet twice daily after meals.' }
    ],
    results: [
      { percentage: '95%', text: 'Reported better mobility.' }
    ]
  },
  {
    id: 'gtp-mental-fitness',
    name: 'GTP Mental Fitness',
    label: 'Stress Reduction & Memory Enhancement',
    shortDesc: 'A specialized Ayurvedic formulation designed to harmonize neural pathways and enhance cognitive clarity.',
    price: 35,
    image: '/images/GTP_1.png',
    category: 'Therapeutics',
    features: [
      { title: 'Neural Balance', desc: 'Restores natural neurotransmitter equilibrium.', icon: 'energy_savings_leaf' },
      { title: 'Cognitive Speed', desc: 'Enhances data processing and mental recall.', icon: 'speed' },
      { title: 'Cortisol Control', desc: 'Regulates stress hormone levels for better focus.', icon: 'sleep' }
    ],
    botanicals: [
      { name: 'Brahmi', desc: 'Renowned brain tonic that sharpens memory.', image: 'https://picsum.photos/seed/brahmi/400/400' },
      { name: 'Shankhapushpi', desc: 'Improves learning and mental capacity.', image: 'https://picsum.photos/seed/shankhapushpi/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: 'Take 1-2 capsules twice daily.' }
    ],
    results: [
      { percentage: '92%', text: 'Reported better focus and concentration.' }
    ]
  },
  {
    id: 'aa-caps',
    name: 'AA Caps',
    label: 'Breathe Easy',
    shortDesc: 'A scientifically formulated therapeutic supplement designed to relieve respiratory tract disorders.',
    price: 25,
    image: '/images/AAcaps_1.png',
    category: 'Therapeutics',
    features: [
      { title: 'Respiratory Relief', desc: 'Helps in clearing the respiratory tract.', icon: 'air' },
      { title: 'Immune Support', desc: 'Strengthens natural defense mechanisms.', icon: 'shield' },
      { title: 'Fast Acting', desc: 'Quick absorption for faster relief.', icon: 'verified' }
    ],
    botanicals: [
      { name: 'Vasa', desc: 'Potent anti-inflammatory and bronchodilatory properties.', image: 'https://picsum.photos/seed/vasa/400/400' },
      { name: 'Tulsi', desc: 'An adaptogen that boosts immunity and clears mucus.', image: 'https://picsum.photos/seed/tulsi/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: 'One capsule twice daily.' }
    ],
    results: [
      { percentage: '88%', text: 'Reported easier breathing.' }
    ]
  },
  {
    id: 'd-tabs',
    name: 'D-Tabs',
    label: 'Empower Your Metabolism',
    shortDesc: 'Advanced Ayurvedic formulation scientifically designed by Jammi to manage non-insulin dependent diabetes.',
    price: 35,
    image: '/images/Dtabs_2.png',
    category: 'Therapeutics',
    features: [
      { title: 'Improves Insulin Sensitivity', desc: 'Enhances your body\'s natural response to insulin.', icon: 'psychology' },
      { title: 'Tones The Pancreas', desc: 'Provides nourishment to pancreatic cells.', icon: 'local_pharmacy' },
      { title: 'Alleviates Complications', desc: 'Helps reduce fatigue, frequent urination, and thirst.', icon: 'monitor_weight' }
    ],
    botanicals: [
      { name: 'Gudmar', desc: 'The sugar destroyer; suppresses sweet cravings.', image: 'https://picsum.photos/seed/gudmar/400/400' },
      { name: 'Karela', desc: 'Mimics insulin for faster glucose metabolism.', image: 'https://picsum.photos/seed/karela/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: '1 tablet twice daily.' }
    ],
    results: [
      { percentage: '90%', text: 'Reported better glycemic control.' }
    ]
  },
  {
    id: 'cyst-evit',
    name: 'Cyst Evit',
    label: 'Women\'s Health',
    shortDesc: 'A specialized phyto-therapeutic formulation to help manage PCOS/PCOD naturally, restoring hormonal harmony.',
    price: 35,
    image: '/images/Cyst_1.png',
    category: 'Therapeutics',
    features: [
      { title: 'Hormonal Balance', desc: 'Restores harmony and ovulatory health.', icon: 'balance' },
      { title: 'Regulates Cycles', desc: 'Promotes regular menstrual cycles.', icon: 'water_drop' },
      { title: 'Weight Management', desc: 'Aids in weight control for PCOS/PCOD.', icon: 'monitor_weight' }
    ],
    botanicals: [
      { name: 'Ashoka', desc: 'A renowned uterine tonic that helps regulate menstrual cycles.', image: 'https://picsum.photos/seed/ashoka/400/400' },
      { name: 'Shatavari', desc: 'Nourishes the reproductive system, and regulates estrogen levels.', image: 'https://picsum.photos/seed/shatavari/400/400' }
    ],
    ritual: [
      { title: 'Dosage', desc: '10-15 ml twice daily.' }
    ],
    results: [
      { percentage: '85%', text: 'Reported regular cycles.' }
    ]
  },
  {
    id: 'bff-balm',
    name: 'BFF - Best Foot Forward',
    label: 'Restorative Foot & Heel Balm',
    shortDesc: 'Our rich, buttery balm penetrates thick skin to deeply moisturize dry, cracked heels and fatigued feet.',
    price: 22,
    image: '/images/BFF_1.png',
    category: 'Body Care',
    features: [
      { title: 'Heals', desc: 'Repairs cracked heels.', icon: 'eco' },
      { title: 'Soothes', desc: 'Calms fatigued feet.', icon: 'shield' },
      { title: 'Restores', desc: 'Deeply moisturizes thick skin.', icon: 'auto_awesome' }
    ],
    botanicals: [
      { name: 'Kokum Butter', desc: 'Deep moisturizing butter.', image: 'https://picsum.photos/seed/kokum/400/400' }
    ],
    ritual: [
      { title: 'Apply', desc: 'Massage onto clean, dry feet before bedtime.' }
    ],
    results: [
      { percentage: '98%', text: 'Reported softer heels overnight.' }
    ]
  },
  {
    id: 'uvsafe-sunscreen',
    name: 'UVSafe Ayurvedic Protection SPF 50',
    label: '125-Year Heritage',
    shortDesc: 'A century-old Ayurvedic recipe refined for the modern world. Developed by the master pharmacists at Jammi, our formula uses the cooling properties of Aloe Vera and the restorative power of Saffron to protect your skin from the harshest sun.',
    price: 845,
    originalPrice: 1150,
    image: '/images/UVSafe.png',
    category: 'Skin & Hair Care',
    features: [
      { title: 'Triple-Shield Protection', desc: 'Broad spectrum defense against UVA, UVB, and Blue Light.', icon: 'shield_moon' },
      { title: 'Natural Golden Glow', desc: 'Infused with Kashmiri Saffron for instant skin brightening.', icon: 'auto_awesome' },
      { title: 'Non-Greasy Formula', desc: 'Ayurvedic oils that absorb instantly without a white cast.', icon: 'water_drop' }
    ],
    botanicals: [
      { name: 'Pure Saffron', desc: 'Handpicked Kashmiri Saffron threads known for skin brightening.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeJYlPvYZXzgO2YyYDNugG1wAMz_4QIO1C14jnIUWAUh0zltrkg0RlBVDJGafM-dchJGOdAoX5-Qq6pcOO7MC9tEt9QsYxTDH_rvDvZYRz0YMwfP3uYCEmOpn_8O8LN3FD7cj1GN7MABLVTaiAb8ND3yP1shc7pBN1YE_Jhst-WS_24twFQa9ADmYOLmBNlxpEmFq2bLasMnpGNwabnnedG1SNV7wWUIJ5NXLilYiz6hqXjhuUfRUtE0NCj_rolEAYtpM894Tw2wY' },
      { name: 'Aloe Vera', desc: 'Premium organic pulp to cool and hydrate sun-exposed skin.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMS-AZKFWSJjUKB9OOXL4mYpPqhVGUlA5F7xIe7hVvyZw0HDbj9VzmvxR9dhGN82T9a5oL08UIlZUA1zoNIEX45G3GNZOoq1MOH6L__xP4ggkTWwxoDcnlLbuUunjd7PEHwTr-pQP7hrO1rg6e9LiBzU5RbBnVJQ2fPU9H2ygIjbDDmtgycWQjbiBGYVwONQJ9BsgojRavxn3ud8ONb_YGeuNT7eQL_86bVxXo76hv5ICGLK7_7XWzc1Wahks2dC6M6f3ZoTIS2xE' },
      { name: 'Zinc Oxide', desc: 'Natural mineral filter for immediate UVA/UVB protection.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF368r9U90aGIDQ2m53N5s1XVKLlXD-tvnMUWmCd_rFaoqR_EC1bMxY8Xt7EzD4YH1ZGlKcogs4ddP44tSTvCGUT6tSlj_F72vjmCLEKmjWeqNTj0J_OFb8l9NFNJxu5g-sQwsHT4Zwt2TQNFY9vL_4ftRi9FINz9rCZ_rZX48gvstr4p_8e_go-R9dzTv-4WGpCmBjRV8Y7Nehq-CWruIm6Gts_XSzgWYyJWuKAOpOyfHUnZp6DLlhUOkCywtBCcFwLlOaWjrTrY' }
    ],
    ritual: [
      { title: 'Cleanse', desc: 'Wash your face with a mild herbal cleanser and pat dry.' },
      { title: 'Apply', desc: 'Apply a pea-sized amount evenly across face and neck.' },
      { title: 'Wait', desc: 'Allow 15 minutes for absorption before sun exposure.' }
    ],
    results: [
      { percentage: '85%', text: 'Reported transparent, glowing finish.' }
    ]
  },
  {
    id: 'timeless-anti-ageing',
    name: 'Timeless Anti-Ageing Cream',
    label: 'Science of Ageless Beauty',
    shortDesc: 'A restorative Ayurvedic formula crafted with pure Guggul and Ashwagandha. Experience a visible transformation as it targets fine lines and restores your skin\'s youthful radiance.',
    price: 85,
    originalPrice: null,
    image: '/images/Timeless.png',
    category: 'Skin & Hair Care',
    features: [
      { title: 'Reduces Wrinkles', desc: 'Clinically proven to reduce the depth of fine lines and visible wrinkles within 4 weeks of consistent use.', icon: 'auto_fix_high' },
      { title: 'Firms Skin', desc: 'Improves skin elasticity and promotes natural collagen production for a lifted, more contoured appearance.', icon: 'dry_cleaning' },
      { title: 'Restores Youth', desc: 'Deeply nourishes the dermal layers to restore natural radiance and smooth uneven skin texture.', icon: 'flare' }
    ],
    botanicals: [
      { name: 'Pure Guggul', desc: 'A potent resin known for its incredible ability to support natural skin regeneration and lipid balance.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-yf4CwxHUIHQYFHb5Y5EAhvG6AngQVW5qZVTBobllDCgWqCl53K2n39h4Yahc3H49zfRIhZhlRNVCrMWim-wnXs_yS_SxO3b1xCpXXMhKAbeCjE0X4igxcr6d9bZATHg254utr1rLr2T4YaV-UV2d3Lq_EiolE3iuqxvB2WdapfkO3HcEIzoP4T01KNnveEzUPbMPiItX-fr8b7oax02inRzUQ089JJuCqrM_KBAjOqEgMr22NrS0_pEv8nZws0SwhGVNwzcY0Z8' },
      { name: 'Ashwagandha', desc: 'The "King of Herbs" that provides powerful antioxidant protection against environmental stressors.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWk7UOnWrBYETdk38x-pQMKhyF6AvqFJXEPM7XoWZQCrcUWSPkqQg8tcf1-eLnC74mR-CrJN4DsXXplGrYeh1-o2QfkwpaQl9v78C8Cxl7dQLyieUuyNju_hNn0b5o_vsOWYk34bS0WowJgZJciXOfgWeKO1otKgjSNScThbVqTHiaDGk7Aj0mPNsanLW227N90c_66XuFZy6sERzmxGTaUJAZQS3QjUwZWgIRGXMrz_A9a4uPe04W2Jg_liUFwn2PV5GMXp0l-M' },
      { name: 'Rosehip Oil', desc: 'Packed with Vitamin A and C, it brightens the complexion and helps fade dark spots naturally.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfJkDZlV205dyH3guDD00SNWeQ4frB0gYk9L97yzrXkfdzlKt_fTDSefgso_TQ2yWrjLIAFhy7w6UH1qxr3YqmNr-cSOICpqAhsp3pP1C88G0WVyPWF1-9IX29gsIiALak_iIRquokqNr5RD1Eqo2CaTHvzlVxPUmHN3VGFVkM0xMOl61zYsDEWRTJ6dLA8Vt6rbdDeoWCuJ84j0hz9l46s9TVJMbd2XnjWQ0Qb7--Hv6uo6-_7UTbA9IGdV_ECq__iWGu896NFfE' }
    ],
    ritual: [
      { title: 'Cleanse', desc: 'Start with a clean, dry face. Use a gentle cleanser to remove all impurities.' },
      { title: 'Massage', desc: 'Apply a pea-sized amount to your fingertips and gently massage onto face and neck in upward circular motions.' },
      { title: 'Absorb', desc: 'Allow the cream to fully absorb for 2-3 minutes before applying sunscreen or makeup.' }
    ],
    results: [
      { percentage: '95%', text: 'Noticeable difference in the fine lines.' }
    ]
  },
  {
    id: 'soft-lips',
    name: 'SoftLips',
    label: 'Premium Heritage Lip Care',
    shortDesc: 'A luxurious lip butter enriched with natural emollients. Provides deep hydration and protection for soft, supple lips all day long. 15g.',
    price: 180,
    image: '/images/SoftLips_1.png',
    category: 'Skin & Hair Care',
    features: [
      { title: 'Intense Hydration', desc: 'Deeply moisturizes for soft, supple lips.', icon: 'water_drop' },
      { title: 'Natural Plumpness', desc: 'Enhances the natural volume and color of lips.', icon: 'favorite' },
      { title: 'Authentic Care', desc: 'Crafted with traditional Ayurvedic methods.', icon: 'history_edu' }
    ],
    botanicals: [
      { name: 'Shea Butter', desc: 'Rich in fatty acids and vitamins for deep nourishment.', image: 'https://picsum.photos/seed/shea/400/400' },
      { name: 'Almond Oil', desc: 'Helps in lightening dark lips and providing extra moisture.', image: 'https://picsum.photos/seed/almond/400/400' },
      { name: 'Rose Petals', desc: 'Known for their soothing properties and natural tint.', image: 'https://picsum.photos/seed/rose/400/400' }
    ],
    ritual: [
      { title: 'Prep', desc: 'Ensure lips are clean and dry.' },
      { title: 'Apply', desc: 'Take a small amount and smooth over lips.' },
      { title: 'Repeat', desc: 'Use frequently throughout the day as needed.' }
    ],
    results: [
      { percentage: '98%', text: 'Reported instantly softer lips.' }
    ]
  },
  {
    id: 'kumkumadi-serum',
    name: 'Kumkumadi Serum',
    label: 'Radiance & Anti-aging',
    shortDesc: 'A powerful blend of saffron and 25 precious herbs. Lightens pigmentation, reduces fine lines, and imparts a natural, golden glow.',
    price: 95,
    originalPrice: 120,
    image: '/images/Kumkumadi Serum.jpeg',
    category: 'Skin & Hair Care',
    features: [
      { title: 'Fades Pigmentation', desc: 'Targeted action against dark spots and uneven skin tone.', icon: 'auto_fix_high' },
      { title: 'Deep Hydration', desc: 'Locks in moisture for a plump, supple appearance all day long.', icon: 'water_drop' },
      { title: 'Firms Skin', desc: 'Promotes skin elasticity and reduces the appearance of fine lines.', icon: 'dry_cleaning' }
    ],
    botanicals: [
      { name: 'Pure Kashmiri Saffron', desc: 'Renowned for its skin-lightening and rejuvenating properties.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2H_cW4y7kH8wX9p8r2T1t3Q9U4_R8O4r7P1IeXWz7_x0Gz5w1BxgXnO9y_2x5xL-_u3E5yq0I8Jc2r1Y8-yAxeW-_zG4B_3m6_b1eT7g0M7U9x6P1Dxe1e9Gv1P6d_4QJ' },
      { name: 'Sandalwood (Chandan)', desc: 'Cools the skin and helps clear blemishes and acne marks.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1_B4T6y8O9R8x2P8q4T1q3R9W5_R8P4q7P1IeXWz7_x0Gz5w1BxgXnO9y_2x5xL-_u3E5yq0I8Jc2r1Y8-yAxeW-_zG4B_3m6_b1eT7g0M7U9x6P1Dxe1e9Gv1P6d_4QK' },
      { name: 'Lotus Extracts', desc: 'Rich in antioxidants, it conditions and calms irritated skin.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9_V3R5t7K8P7w1Q7p3T1p3S9X6_R8Q4p7P1IeXWz7_x0Gz5w1BxgXnO9y_2x5xL-_u3E5yq0I8Jc2r1Y8-yAxeW-_zG4B_3m6_b1eT7g0M7U9x6P1Dxe1e9Gv1P6d_4QL' }
    ],
    ritual: [
      { title: 'Cleanse', desc: 'Start with a mild cleanser to prepare your skin.' },
      { title: 'Apply', desc: 'Take 2-3 drops of the serum on your fingertips.' },
      { title: 'Massage', desc: 'Gently massage onto face and neck in upward strokes until fully absorbed.' }
    ],
    results: [
      { percentage: '92%', text: 'Reported glowing skin within 2 weeks.' }
    ]
  },
  {
    id: 'keshpro-oil',
    name: 'KeshPro Oil',
    label: 'Intensive Hair Therapy',
    shortDesc: 'A traditional Ayurvedic hair oil infused with Bhringraj and Amla. Stops hair fall, prevents premature greying, and stimulates new hair growth.',
    price: 34,
    originalPrice: 45,
    image: '/images/KeshPro.png',
    category: 'Skin & Hair Care',
    features: [
      { title: 'Reduces Hair Fall', desc: 'Strengthens roots and minimizes breakage significantly.', icon: 'local_florist' },
      { title: 'Promotes Growth', desc: 'Stimulates dormant follicles for thicker, voluminous hair.', icon: 'trending_up' },
      { title: 'Cools Scalp', desc: 'Relieves stress and prevents scalp infections and dandruff.', icon: 'ac_unit' }
    ],
    botanicals: [
      { name: 'Bhringraj', desc: 'The "King of Herbs" for hair growth and restoring natural color.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3V_fA-Q0O2B9B3pXo3sM_AItP5Q_wX2y9d1L9d6r2y_u2-9bO4Cg2_C-b9L5tYvR6uA1iA2_s9oBxUvK2R9mX5qT6vU7wO5H7uE5pQ0H8bC2mD1fG7kL4jP1vN5hC_Q3m1_K4W9eL' },
      { name: 'Amla', desc: 'Rich in Vitamin C, it strengthens the hair shaft and adds intense shine.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3V_fA-Q0O2B9B3pXo3sM_AItP5Q_wX2y9d1L9d6r2y_u2-9bO4Cg2_C-b9L5tYvR6uA1iA2_s9oBxUvK2R9mX5qT6vU7wO5H7uE5pQ0H8bC2mD1fG7kL4jP1vN5hC_Q3m1_K4W9eM' },
      { name: 'Brahmi', desc: 'Nourishes the scalp, reduces stress-induced hair loss, and conditions hair.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3V_fA-Q0O2B9B3pXo3sM_AItP5Q_wX2y9d1L9d6r2y_u2-9bO4Cg2_C-b9L5tYvR6uA1iA2_s9oBxUvK2R9mX5qT6vU7wO5H7uE5pQ0H8bC2mD1fG7kL4jP1vN5hC_Q3m1_K4W9eN' }
    ],
    ritual: [
      { title: 'Warm Oil', desc: 'Slightly warm the oil for better penetration.' },
      { title: 'Massage', desc: 'Massage deeply into the scalp and coat the lengths of your hair.' },
      { title: 'Leave On', desc: 'Leave for at least 30 minutes, or overnight for best results, before washing.' }
    ],
    results: [
      { percentage: '88%', text: 'Noticed reduced hair fall in 1 month.' }
    ]
  },
  {
    id: 'glow-complexion-cream',
    name: 'Glow Complexion Cream',
    label: 'Luminous Skin, Naturally',
    shortDesc: 'Our signature complexion cream is a lightweight, non-greasy formula that deeply hydrates while brightening the skin tone. Infused with ancient botanicals, it reveals your natural radiance after just one application.',
    price: 72,
    originalPrice: 85,
    image: '/images/Glow.png',
    category: 'Skin & Hair Care',
    features: [
      { title: 'Evens Skin Tone', desc: 'Targeted saffron extract works to reduce dark spots and hyperpigmentation for a balanced complexion.', icon: 'sparkles' },
      { title: 'Deep Hydration', desc: 'Lock in moisture for 24 hours with lotus seed oil that penetrates deep into skin layers.', icon: 'water_drop' },
      { title: 'Natural Glow', desc: 'Revitalize dull skin with sandalwood, providing an immediate radiant finish without the shine.', icon: 'sunny' }
    ],
    botanicals: [
      { name: 'Pure Kashmiri Saffron', desc: 'Harvested by hand, saffron is a powerful antioxidant that clarifies and brightens skin.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh7B5bQZVApJrWjGKx1CUJ0ZsIKdPjQPcFfQxB9qsiKDj-KuhMyMneE06_qBEKTjJrqRzRS5lCqDXd9tkO_LrzBGAhUCIIIxv-WEfBpES-j_vUd7zqd4gFxQq4hyY4uCDediK3Bceb0nyhTZnnRBY-KWRDb4hFtJh8VMaaoq_H_CdEgAvsfwtfoSl8GOqqqQQnzmgRjgc4gldOHQr2ODj4O0E0UameXgaRiWvsWPGxVMl16FnKUuosKyMbMvr2EjDiVenntc78ECY' },
      { name: 'Lotus Seed Extract', desc: 'A natural skin conditioner that restores elasticity and improves overall texture.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp5a76Eh66Nm_mvJohHNuunUC7nJa2lWXH57x7y5fLqdDYrlWBkUMLbh0xEJ18G6gos0OkvTFp4uMXBZbC21rqcrt1pXEVoQNv-4kQdu-YMzdrnYRBHb9CDDUxYGNVd_Wn_bI3rGOdP_dhZjiNGsIB5xxO1S8GR8NmX1Ci799szkGbdkuPvQ7EsQO2ePa66aOIS4R4XxaeP9NEDh36LduJGLHbxhPpd5Dc7IiYEKnycgSwDhOf8qA-bXQb5MCt65H1EN-m3VglN3o' },
      { name: 'Mysore Sandalwood', desc: 'Known for its cooling properties, it soothes redness and refines pores.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh7B5bQZVApJrWjGKx1CUJ0ZsIKdPjQPcFfQxB9qsiKDj-KuhMyMneE06_qBEKTjJrqRzRS5lCqDXd9tkO_LrzBGAhUCIIIxv-WEfBpES-j_vUd7zqd4gFxQq4hyY4uCDediK3Bceb0nyhTZnnRBY-KWRDb4hFtJh8VMaaoq_H_CdEgAvsfwtfoSl8GOqqqQQnzmgRjgc4gldOHQr2ODj4O0E0UameXgaRiWvsWPGxVMl16FnKUuosKyMbMvr2EjDiVenntc78ECZ' }
    ],
    ritual: [
      { title: 'Cleanse', desc: 'Wash your face with a gentle cleanser and pat dry.' },
      { title: 'Apply', desc: 'Take a pea-sized amount and dot across your forehead, cheeks, and chin.' },
      { title: 'Massage', desc: 'Gently massage in upward circular motions until fully absorbed.' }
    ],
    results: [
      { percentage: '80%', text: 'Reported noticeably brighter skin.' }
    ]
  },
  {
    id: 'flawless-pack',
    name: 'Flawless Pack',
    label: 'Revitalizing & Firming',
    shortDesc: 'A potent weekly ritual designed to restore skin elasticity and natural radiance. This dual-action pack combines ancient Ayurvedic wisdom with modern dermatological science to detoxify pores and firm the facial contours.',
    price: 84,
    originalPrice: null,
    image: '/images/Flawless.png',
    category: 'Skin & Hair Care',
    features: [
      { title: 'Skin Firming', desc: 'Promotes collagen production and tightens the appearance of sagging skin for a lifted look.', icon: 'dry_cleaning' },
      { title: 'Deep Cleansing', desc: 'Draws out impurities and pollutants from deep within the pores without stripping moisture.', icon: 'cleaning_services' },
      { title: 'Youthful Glow', desc: 'Brightens complexion and evens skin tone using traditional Ayurvedic extracts.', icon: 'auto_awesome' }
    ],
    botanicals: [
      { name: 'Manjistha', desc: 'Known as the \'Rubia Cordifolia\', it purifies blood and provides a vibrant, healthy complexion.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7tAZa-gtKLYCcejl_ny9yvdC692L4J1aVQMUWPuggXQPP_tHeahj-bungVx_mxpvRnerhjec5w_mzka6O0j_GzGDTAWfAELUBRK3HnqnguC6jkEBkq5Rqte1QG7Ff0tBDwIwEdbV6humY4U-EHAfJuz3NF5FJCbY2qqSQLNw0gUls5urYZ0Tx6AN-Kov68NK7_wyJ5mkC3G9mRzc7eR1QkqNZlhCOfynzkxS3Vh8R53BBJvOFGWK1JriyPjW-W-g2pj7trgnx0x4' },
      { name: 'Turmeric (Curcumin)', desc: 'A powerful anti-inflammatory and antioxidant that heals and protects the skin barrier.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7tAZa-gtKLYCcejl_ny9yvdC692L4J1aVQMUWPuggXQPP_tHeahj-bungVx_mxpvRnerhjec5w_mzka6O0j_GzGDTAWfAELUBRK3HnqnguC6jkEBkq5Rqte1QG7Ff0tBDwIwEdbV6humY4U-EHAfJuz3NF5FJCbY2qqSQLNw0gUls5urYZ0Tx6AN-Kov68NK7_wyJ5mkC3G9mRzc7eR1QkqNZlhCOfynzkxS3Vh8R53BBJvOFGWK1JriyPjW-W-g2pj7trgnx0x5' },
      { name: 'Therapeutic Clay', desc: 'Fine-milled minerals that gently exfoliate and detoxify for a smooth, refined texture.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7tAZa-gtKLYCcejl_ny9yvdC692L4J1aVQMUWPuggXQPP_tHeahj-bungVx_mxpvRnerhjec5w_mzka6O0j_GzGDTAWfAELUBRK3HnqnguC6jkEBkq5Rqte1QG7Ff0tBDwIwEdbV6humY4U-EHAfJuz3NF5FJCbY2qqSQLNw0gUls5urYZ0Tx6AN-Kov68NK7_wyJ5mkC3G9mRzc7eR1QkqNZlhCOfynzkxS3Vh8R53BBJvOFGWK1JriyPjW-W-g2pj7trgnx0x6' }
    ],
    ritual: [
      { title: 'Prepare', desc: 'Cleanse your skin thoroughly and pat dry. Take a small amount of the pack.' },
      { title: 'Apply', desc: 'Spread an even layer over face and neck, avoiding the eye area. Relax for 15 minutes.' },
      { title: 'Rinse', desc: 'Gently massage with lukewarm water to exfoliate, then rinse off completely.' }
    ],
    results: [
      { percentage: '94%', text: 'Reported firmer, revitalized skin.' }
    ]
  },
  {
    id: 'crush-n-brush',
    name: 'Crush N\' Brush Ayurvedic Pellets',
    label: 'Sustainable Oral Care',
    shortDesc: 'Ancient Wisdom meets Modern Convenience. Experience a plastic-free smile crafted from centuries-old Ayurvedic botanicals.',
    price: 15,
    originalPrice: null,
    image: '/images/CrushNBrush_2.png',
    category: 'Oral Care  Wellness',
    features: [
      { title: 'Enamel Protection', desc: 'Strengthens teeth naturally.', icon: 'shield' },
      { title: 'Fresh Breath', desc: 'Long-lasting Ayurvedic freshness.', icon: 'air' },
      { title: 'Travel-friendly', desc: 'Convenient plastic-free packaging.', icon: 'luggage' }
    ],
    botanicals: [
      { name: 'Neem', desc: 'Natural antibacterial element.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Hvl9I4wTJeb2KAMMGbycsJtSjIDDQuDb9bQG4keN1hUnk4hP2wsXeRbL_9-LGPhH0Bc2VhhTwJCH3HGZ0L0rOQk9bkQ12GZUlVTYfjpLMygiiiSg4oPdb1kktiOQd2SWfqpx8XC8RVJGfq8leeS6xNU5bxTXkPGTqcSTatYn7JdjWK6i_3PnajOE2L07-6Q0ek49ap2KGipuNV1Q6bjVzWgM5TCWYLLmmIf0sOxJCdmp1E8MTjVSVXpocOsSH-sTnBXsMt5HzRJ' },
      { name: 'Clove', desc: 'For soothing gums and fresh breath.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Hvl9I4wTJeb2KAMMGbycsJtSjIDDQuDb9bQG4keN1hUnk4hP2wsXeRbL_9-LGPhH0Bc2VhhTwJCH3HGZ0L0rOQk9bkQ12GZUlVTYfjpLMygiiiSg4oPdb1kktiOQd2SWfqpx8XC8RVJGfq8leeS6xNU5bxTXkPGTqcSTatYn7JdjWK6i_3PnajOE2L07-6Q0ek49ap2KGipuNV1Q6bjVzWgM5TCWYLLmmIf0sOxJCdmp1E8MTjVSVXpocOsSH-sTnBXsMt5HzRK' },
      { name: 'Mint', desc: 'Cooling natural flavor.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Hvl9I4wTJeb2KAMMGbycsJtSjIDDQuDb9bQG4keN1hUnk4hP2wsXeRbL_9-LGPhH0Bc2VhhTwJCH3HGZ0L0rOQk9bkQ12GZUlVTYfjpLMygiiiSg4oPdb1kktiOQd2SWfqpx8XC8RVJGfq8leeS6xNU5bxTXkPGTqcSTatYn7JdjWK6i_3PnajOE2L07-6Q0ek49ap2KGipuNV1Q6bjVzWgM5TCWYLLmmIf0sOxJCdmp1E8MTjVSVXpocOsSH-sTnBXsMt5HzRL' }
    ],
    ritual: [
      { title: 'Crush', desc: 'Place one pellet in mouth and crush lightly with your molars.' },
      { title: 'Brush', desc: 'Wet your toothbrush and brush normally. Watch it foam naturally.' },
      { title: 'Rinse', desc: 'Rinse and enjoy that long-lasting Ayurvedic freshness.' }
    ],
    results: [
      { percentage: '90%', text: 'Reported better oral hygiene.' }
    ]
  },
  {
    id: 'clear-marks',
    name: 'Clear Marks',
    label: 'Heritage Formula',
    shortDesc: 'Advanced Ayurvedic formulation for flawless, radiant skin.',
    price: 34,
    originalPrice: 42,
    image: '/images/Clear Marks.jpeg',
    category: 'Skin & Hair Care',
    features: [
      { title: 'Reduces blemishes', desc: 'Addresses hyperpigmentation and acne scars.', icon: 'auto_fix_high' },
      { title: 'Evens skin tone', desc: 'Improves skin health from within.', icon: 'palette' },
      { title: 'Natural glow', desc: 'Reveals a flawless, radiant complexion.', icon: 'light_mode' }
    ],
    botanicals: [
      { name: 'Saffron', desc: 'Brightens complexion', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFXwSDBiF-wO4u5p8xQ8XUeG_1tCHu_71Z1IeXWz7_x0Gz5w1BxgXnO9y_2x5xL-_u3E5yq0I8Jc2r1Y8-yAxeW-_zG4B_3m6_b1eT7g0M7U9x6P1Dxe1e9Gv1P6d_4QJ' },
      { name: 'Manjistha', desc: 'Blood purifier', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7tAZa-gtKLYCcejl_ny9yvdC692L4J1aVQMUWPuggXQPP_tHeahj-bungVx_mxpvRnerhjec5w_mzka6O0j_GzGDTAWfAELUBRK3HnqnguC6jkEBkq5Rqte1QG7Ff0tBDwIwEdbV6humY4U-EHAfJuz3NF5FJCbY2qqSQLNw0gUls5urYZ0Tx6AN-Kov68NK7_wyJ5mkC3G9mRzc7eR1QkqNZlhCOfynzkxS3Vh8R53BBJvOFGWK1JriyPjW-W-g2pj7trgnx0x4' },
      { name: 'Turmeric', desc: 'Anti-inflammatory', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7tAZa-gtKLYCcejl_ny9yvdC692L4J1aVQMUWPuggXQPP_tHeahj-bungVx_mxpvRnerhjec5w_mzka6O0j_GzGDTAWfAELUBRK3HnqnguC6jkEBkq5Rqte1QG7Ff0tBDwIwEdbV6humY4U-EHAfJuz3NF5FJCbY2qqSQLNw0gUls5urYZ0Tx6AN-Kov68NK7_wyJ5mkC3G9mRzc7eR1QkqNZlhCOfynzkxS3Vh8R53BBJvOFGWK1JriyPjW-W-g2pj7trgnx0x5' }
    ],
    ritual: [
      { title: 'Prepare', desc: 'Cleanse your skin thoroughly and pat dry.' },
      { title: 'Apply', desc: 'Apply to affected areas or all over face.' },
      { title: 'Absorb', desc: 'Allow to fully absorb into skin.' }
    ],
    results: [
      { percentage: '100%', text: 'Herbal & Clinically Proven formula.' }
    ]
  }
];

export const MOCK_DOCTORS = [
  {
    id: 'd1',
    name: 'Dr. V. Raghavan, MD (Ay)',
    specialty: 'Ayurvedic Physician & Clinical Researcher',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWv7uisAZHK2OhbqW1yJyLQLuu5GUtQshdmtpssbvU_utXTSesrzE4IP-vOZHpklKHDt5SpbhMjsJUxt3YQb7k6YrDO6CsrY9szTbhu8-ErDCwoQwy6gZ7PAN3_ipetrykzrIJ8TqtdzNk4cJnpDlsoqE5bgNb_615i8_0nhdiVzvA1wTwGjpOlA8AfETG4vEPB9jIk9SQGe-I8HrymBctFYNEfS6bAlHxQRwM0z7xhd918iKxp3P5VuSY7sJmJbTxa1XvIZKF3dw',
    quote: "Jammi's commitment to preserving classical Ayurvedic processes while adhering to modern analytical standards is what makes them a trusted partner for medical professionals."
  }
];
