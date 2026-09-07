export const dietData = {
  title: 'Napi étrend',
  subtitle: 'Magas fehérjés, kalóriadeficites étrend',

  macroVersions: [
    {
      id: 'conservative',
      label: 'Konzervatív verzió',
      description: '1,5 g fehérje / ttkg',
      macros: [
        { name: 'Fehérje', grams: 158, kcalPerG: 4, color: '#e67e22' },
        { name: 'Zsír', grams: 45, kcalPerG: 9, color: '#f1b24a' },
        { name: 'Szénhidrát', grams: 120, kcalPerG: 4, color: '#2f7f6d' },
      ],
      totalKcal: 1517,
    },
    {
      id: 'upper',
      label: 'Felső tartomány',
      description: '2 g fehérje / ttkg',
      macros: [
        { name: 'Fehérje', grams: 210, kcalPerG: 4, color: '#e67e22' },
        { name: 'Zsír', grams: 40, kcalPerG: 9, color: '#f1b24a' },
        { name: 'Szénhidrát', grams: 90, kcalPerG: 4, color: '#2f7f6d' },
      ],
      totalKcal: 1560,
    },
    {
      id: 'chosen',
      label: 'Választott terv',
      description: 'Magas fehérje, tartható változat',
      macros: [
        { name: 'Fehérje', grams: 180, kcalPerG: 4, color: '#e67e22' },
        { name: 'Zsír', grams: 45, kcalPerG: 9, color: '#f1b24a' },
        { name: 'Szénhidrát', grams: 100, kcalPerG: 4, color: '#2f7f6d' },
      ],
      totalKcal: 1525,
    },
  ],

  meals: [
    {
      id: 'reggeli',
      name: 'Reggeli',
      icon: '🌅',
      time: '7:00',
      foods: ['2 egész tojás', '200 g tojásfehérje', '40 g zabpehely'],
      macros: { protein: 35, carbs: 25, fat: 12 },
    },
    {
      id: 'tizorai',
      name: 'Tízórai',
      icon: '🥛',
      time: '10:00',
      foods: ['250 g cottage cheese', '1 alma'],
      macros: { protein: 30, carbs: 20, fat: 3 },
    },
    {
      id: 'ebed',
      name: 'Ebéd',
      icon: '🍗',
      time: '13:00',
      foods: ['200 g csirkemell', '100 g főtt rizs', 'saláta'],
      macros: { protein: 50, carbs: 28, fat: 4 },
    },
    {
      id: 'uzsonna',
      name: 'Uzsonna',
      icon: '💪',
      time: '16:00',
      foods: ['30 g fehérjepor', '30 g mandula'],
      macros: { protein: 30, carbs: 5, fat: 15 },
    },
    {
      id: 'vacsora',
      name: 'Vacsora',
      icon: '🌙',
      time: '19:00',
      foods: ['250 g tengeri hal vagy csirkemell', 'párolt brokkoli', '150 g édesburgonya'],
      macros: { protein: 40, carbs: 25, fat: 8 },
    },
  ],

  dailyTotal: {
    protein: 185,
    carbs: 103,
    fat: 42,
    kcalMin: 1500,
    kcalMax: 1550,
  },

  nutrients: [
    {
      id: 'protein',
      name: 'Fehérje',
      color: '#e67e22',
      icon: '🥩',
      primary: [
        'Tojásfehérje',
        'Csirke',
        'Pulyka',
        'Halak (tengeri, édesvízi)',
        'Marhahús',
      ],
      secondary: [
        'Protein por (étrendkiegészítő)',
        'Sovány sajtok (mozzarella, cottage cheese)',
        'Túró',
        'Csirkemell sonka',
      ],
    },
    {
      id: 'carbs',
      name: 'Szénhidrát',
      color: '#2f7f6d',
      icon: '🌾',
      primary: [
        'Rizs (~70% szénhidrát)',
        'Bulgur (~70% szénhidrát)',
        'Zabpehely (~60% szénhidrát)',
        'Édesburgonya (~20% szénhidrát)',
      ],
      secondary: [
        'Főtt burgonya (~20% szénhidrát)',
        'Durum és teljes kiőrlésű tészta (~70%)',
        'Gabonák és hüvelyesek',
        'Teljes kiőrlésű kenyér',
        'Cerbona cukormentes müzliszelet',
      ],
    },
    {
      id: 'fat',
      name: 'Zsír',
      color: '#f1b24a',
      icon: '🫒',
      primary: [
        'Kókuszzsír',
        'Lenmagolaj',
        'Tökmagolaj',
        'Dióolaj',
        'Olajos magvak (dió, mandula, kesudió)',
        'Halolajtok (omega-3)',
        'Olívaolaj (főzéshez)',
        'Extra szűz olívaolaj (öntetnek)',
        'FLORA light margarin',
      ],
      secondary: [],
    },
  ],
}

export const dietDataMale = {
  title: 'Étrend férfinak',
  subtitle: 'Kalóriadeficites étrend – 120 kg-os, ülőmunkát végző férfinak',

  macroVersions: [
    {
      id: 'male_plan',
      label: 'Férfi terv',
      description: '120 kg, ülőmunka',
      macros: [
        { name: 'Fehérje', grams: 215, kcalPerG: 4, color: '#e67e22' },
        { name: 'Zsír', grams: 54, kcalPerG: 9, color: '#f1b24a' },
        { name: 'Szénhidrát', grams: 145, kcalPerG: 4, color: '#2f7f6d' },
      ],
      totalKcal: 1950,
    },
  ],

  meals: [
    {
      id: 'reggeli',
      name: 'Reggeli',
      icon: '🌅',
      time: '07:00',
      foods: ['3 egész tojás', '250 g tojásfehérje', '60 g zabpehely'],
      macros: { protein: 45, carbs: 35, fat: 16 },
    },
    {
      id: 'tizorai',
      name: 'Tízórai',
      icon: '🥛',
      time: '10:00',
      foods: ['250 g cottage cheese', '1 alma', '20 g mandula'],
      macros: { protein: 30, carbs: 25, fat: 10 },
    },
    {
      id: 'ebed',
      name: 'Ebéd',
      icon: '🍗',
      time: '13:00',
      foods: ['250 g grillezett csirkemell', '150 g főtt rizs', 'nagy adag saláta'],
      macros: { protein: 60, carbs: 40, fat: 5 },
    },
    {
      id: 'uzsonna',
      name: 'Uzsonna',
      icon: '💪',
      time: '16:00',
      foods: ['40 g tejsavófehérje', '30 g olajos mag (mandula vagy dió)'],
      macros: { protein: 35, carbs: 5, fat: 15 },
    },
    {
      id: 'vacsora',
      name: 'Vacsora',
      icon: '🌙',
      time: '19:00',
      foods: ['250 g hal vagy pulykamell', '200 g édesburgonya', 'párolt brokkoli vagy vegyes zöldség'],
      macros: { protein: 45, carbs: 40, fat: 8 },
    },
  ],

  dailyTotal: {
    protein: 215,
    carbs: 145,
    fat: 54,
    kcalMin: 1950,
    kcalMax: 1950,
  },

  sources: {
    protein: ['csirkemell', 'pulykamell', 'tojás', 'tojásfehérje', 'sovány marhahús', 'halak', 'cottage cheese', 'túró', 'fehérjepor'],
    carbs: ['zabpehely', 'rizs', 'bulgur', 'édesburgonya', 'teljes kiőrlésű gabonák', 'gyümölcsök mértékkel'],
    fat: ['olívaolaj', 'olajos magvak', 'halolaj', 'lenmagolaj', 'tökmagolaj'],
  },

  note: 'Egy 120 kg-os, ülőmunkát végző férfinál ezzel az étrenddel általában heti 0,5–1 kg fogyás reális cél lehet, különösen ha napi 6–8 ezer lépés vagy 30–45 perc séta is bekerül a programba. Ez már elég magas fehérjét biztosít az izomtömeg megőrzéséhez, miközben a kalóriadeficit támogatja a zsírbontást.',
}