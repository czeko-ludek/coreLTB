/**
 * Regional data for intelligent SEO content generation on plot listing pages.
 *
 * Each region has unique facts about geology, transport, infrastructure,
 * construction considerations, and character — used by generateLocationSeoContent()
 * to produce genuinely unique descriptions per location.
 *
 * Data hierarchy: powiat → gmina → miejscowosc
 * Child locations inherit parent data, with optional overrides.
 */

// ── Types ──

export interface RegionData {
  /** Slug matching LocationEntry.slug */
  slug: string;

  /** Terrain/geology facts — critical for construction context */
  terrain: {
    /** e.g. "równinny", "pagórkowaty", "podgórski" */
    type: string;
    /** Specific geology notes */
    geology: string;
    /** Mining influence level: 'none' | 'low' | 'medium' | 'high' */
    miningInfluence: 'none' | 'low' | 'medium' | 'high';
    /** Special construction considerations */
    constructionNotes?: string;
    /** Flood risk areas */
    floodRisk?: string;
    /** Soil type */
    soilType?: string;
  };

  /** Transport & accessibility */
  transport: {
    /** Nearest major roads (e.g. "A1", "DK78", "DW935") */
    majorRoads: string[];
    /** Distance to nearest highway interchange (km) */
    highwayDistanceKm?: number;
    /** Highway name */
    highwayName?: string;
    /** Nearest large city for reference */
    nearestCity?: string;
    /** Distance to that city (km) */
    nearestCityDistanceKm?: number;
    /** Rail connection */
    railConnection?: string;
    /** Public transport quality: 'good' | 'moderate' | 'limited' */
    publicTransport: 'good' | 'moderate' | 'limited';
  };

  /** Area character */
  character: {
    /** 'urban' | 'suburban' | 'rural' | 'mountain' | 'periurban' */
    type: string;
    /** Descriptive text about the neighborhood character */
    description: string;
    /** Notable districts/neighborhoods for residential */
    residentialAreas?: string[];
    /** Key amenities nearby */
    amenities?: string[];
  };

  /** Infrastructure & utilities */
  infrastructure: {
    /** Municipal water/sewer coverage quality */
    municipalUtilities: 'full' | 'partial' | 'limited';
    /** Gas network availability */
    gasNetwork: 'widespread' | 'partial' | 'rare';
    /** Internet/fiber */
    fiberOptic?: boolean;
    /** Notes about utility specifics */
    notes?: string;
  };

  /** Unique selling points for the area */
  highlights: string[];

  /** Construction-specific advice for this region */
  buildingAdvice: string[];

  /** Optional: price context compared to region */
  priceContext?: string;
}

// ── Regional Data ──

export const REGION_DATA: Record<string, RegionData> = {

  // ══════════════════════════════════════════════════════════════
  // POWIAT WODZISLAWSKI
  // ══════════════════════════════════════════════════════════════

  'powiat-wodzislawski': {
    slug: 'powiat-wodzislawski',
    terrain: {
      type: 'równinno-falisty',
      geology: 'Podłoże karbońskie przykryte glinami czwartorzędowymi. Liczne warstwy iłów pylastych i glin zwałowych na głębokości 1,5-4 m.',
      miningInfluence: 'high',
      constructionNotes: 'Aktywna eksploatacja węgla kamiennego (KWK ROW, Marcel). Wymagane badanie geotechniczne i opinia górnicza przed zakupem działki. Na terenach III-IV kategorii szkód — obowiązkowa płyta fundamentowa.',
      soilType: 'gliny pylaste, iły, lokalnie piaski',
    },
    transport: {
      majorRoads: ['A1', 'DK78', 'DW933', 'DW932'],
      highwayDistanceKm: 5,
      highwayName: 'A1',
      nearestCity: 'Katowice',
      nearestCityDistanceKm: 60,
      publicTransport: 'good',
      railConnection: 'Linia kolejowa 158 (Rybnik–Chałupki) z przystankami w Wodzisławiu, Gorzycach i Godowie',
    },
    character: {
      type: 'suburban',
      description: 'Powiat łączy charakter miejski Wodzisławia i Radlina z gminami wiejskimi o luźnej zabudowie jednorodzinnej. Bliskość granicy czeskiej i autostrady A1 zapewnia dobrą komunikację.',
      residentialAreas: ['Kokoszyce', 'Wilchwy', 'Turza Śląska', 'Czyżowice', 'Marklowice'],
      amenities: ['Szpital powiatowy', 'Galeria Karuzela', 'Aquapark', 'Stadion miejski'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
      fiberOptic: true,
      notes: 'Sieć kanalizacji miejskiej w Wodzisławiu i Radlinie. Gminy wiejskie (Gorzyce, Godów, Lubomia) — częściowo szamba/przydomowe oczyszczalnie.',
    },
    highlights: [
      'Bezpośredni dostęp do autostrady A1 (węzeł Gorzyczki — 5 min)',
      'Bliskość granicy czeskiej — Ostrawa 30 km',
      'Ceny działek 30-50% niższe niż w aglomeracji katowickiej',
      'Rozbudowana sieć szkół i przedszkoli',
    ],
    buildingAdvice: [
      'Przed zakupem działki zamów opinię górniczo-geologiczną w Okręgowym Urzędzie Górniczym',
      'Na terenach kategorii III-IV szkód górniczych stosuj płytę fundamentową zamiast ław',
      'Sprawdź planowaną eksploatację górniczą w Planie Ruchu kopalni — wpływa na wartość działki',
      'Ubezpieczenie od szkód górniczych jest standardem — kopalnia pokrywa koszty napraw',
    ],
    priceContext: 'Jedne z najniższych cen działek budowlanych w województwie śląskim — średnio 80-150 zł/m².',
  },

  'wodzislaw-slaski': {
    slug: 'wodzislaw-slaski',
    terrain: {
      type: 'równinno-falisty',
      geology: 'Podłoże karbońskie z pokrywą glin czwartorzędowych. Lokalnie kurzawki w rejonie Zawady i części Kokoszyc.',
      miningInfluence: 'high',
      constructionNotes: 'Wpływ KWK ROW (ruch Marcel i Chwałowice). Większość dzielnic w I-III kategorii szkód. Kokoszyce i Wilchwy — przeważnie I-II kategoria, korzystniejsze warunki.',
      soilType: 'gliny, iły pylaste',
      floodRisk: 'Punktowo wzdłuż potoku Jedłownickiego (rejon ul. Radlińskiej)',
    },
    transport: {
      majorRoads: ['A1', 'DK78', 'DW933'],
      highwayDistanceKm: 8,
      highwayName: 'A1',
      nearestCity: 'Rybnik',
      nearestCityDistanceKm: 15,
      publicTransport: 'good',
      railConnection: 'Stacja Wodzisław Śląski — linia 158 do Rybnika i Chałupek',
    },
    character: {
      type: 'urban',
      description: 'Stolica powiatu z rozwiniętą infrastrukturą miejską. Dzielnice peryferyjne — Kokoszyce, Wilchwy, Turzyczka — oferują spokojne tereny pod zabudowę jednorodzinną przy zachowaniu bliskości centrum z pełnym zapleczem usługowym.',
      residentialAreas: ['Kokoszyce', 'Wilchwy', 'Turzyczka', 'Jedłownik Osiedle'],
      amenities: ['Szpital powiatowy', 'Galeria Karuzela', 'Aquapark', 'Kino', 'Urząd skarbowy', '3 licea ogólnokształcące'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
      fiberOptic: true,
      notes: 'Pełna kanalizacja miejska w centrum i większości dzielnic. W Kokoszycach — sieć kanalizacyjna rozbudowywana etapowo.',
    },
    highlights: [
      'Pełna infrastruktura miejska — szkoły, szpital, urzędy, handel',
      'Dzielnice Kokoszyce i Wilchwy — spokojna zabudowa jednorodzinna',
      'Do autostrady A1 (węzeł Mszana) — 8 km',
      'Centrum przesiadkowe — autobusy do Rybnika, Jastrzębia, Raciborza',
    ],
    buildingAdvice: [
      'Kokoszyce i Wilchwy mają najkorzystniejsze warunki budowlane w mieście — niższa kategoria szkód',
      'MPZP obejmuje większość terenów pod zabudowę — sprawdź symbol strefy (MN = jednorodzinna)',
      'W rejonie Zawady i Nowego Miasta — wyższe kategorie szkód, konieczna płyta fundamentowa',
    ],
    priceContext: 'Ceny w Wodzisławiu — 100-200 zł/m². Kokoszyce i Wilchwy droższe (150-250 zł/m²) ze względu na lepsze warunki gruntowe.',
  },

  'gorzyce': {
    slug: 'gorzyce',
    terrain: {
      type: 'równinny',
      geology: 'Nizina nadrzeczna Odry i Olzy. Podłoże aluwialne z warstwami piasków i żwirów. Poziom wód gruntowych wyższy niż w miastach.',
      miningInfluence: 'medium',
      constructionNotes: 'Rejon Turzy Śląskiej pod wpływem KWK ROW (ruch Marcel). Gorzyce-centrum i Czyżowice — minimalne wpływy górnicze. Uwaga na wysoki poziom wód gruntowych przy Odrze.',
      soilType: 'piaski, żwiry aluwialne, gliny',
      floodRisk: 'Okolice Odry (rejon Olzy i Uchylska) — strefa zalewowa Q1%',
    },
    transport: {
      majorRoads: ['DW933', 'DW935'],
      highwayDistanceKm: 3,
      highwayName: 'A1',
      nearestCity: 'Wodzisław Śląski',
      nearestCityDistanceKm: 5,
      publicTransport: 'moderate',
    },
    character: {
      type: 'rural',
      description: 'Gmina wiejska o charakterze podmiejskim, z dobrym dostępem do autostrady A1 (węzeł Gorzyczki). Turza Śląska, Czyżowice i Bełsznica to popularne lokalizacje pod budowę domu — stosunkowo tanie działki przy zachowaniu bliskości miast.',
      residentialAreas: ['Czyżowice', 'Turza Śląska', 'Bełsznica', 'Olza'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
      notes: 'Kanalizacja gminna budowana etapowo. W Turzy Śląskiej i Czyżowicach — częściowo szamba. Woda z wodociągu gminnego.',
    },
    highlights: [
      'Węzeł autostradowy A1 Gorzyczki — bezpośredni zjazd',
      'Jedne z najtańszych działek budowlanych w powiecie',
      'Bliskość granicy czeskiej — 2 km do przejścia w Gorzyczkach',
      'Spokojna zabudowa wiejska z dobrym dojazdem do Wodzisławia (5 km)',
    ],
    buildingAdvice: [
      'W rejonie Turzy Śląskiej — sprawdź kategorię szkód górniczych przed zakupem',
      'Działki bliżej Odry — konieczne badanie poziomu wód gruntowych',
      'Czyżowice — najstabilniejsze warunki gruntowe w gminie',
      'Sprawdź podłączenie do kanalizacji — w wielu miejscowościach trzeba planować szambo ekologiczne',
    ],
    priceContext: 'Najtańsze działki w powiecie — od 50-60 zł/m² w Turzy Śląskiej, 80-130 zł/m² w Czyżowicach.',
  },

  'radlin': {
    slug: 'radlin',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Podłoże karbońskie z pokrywą glin. Teren lekko pofałdowany — różnice wysokości do 30 m na obszarze miasta.',
      miningInfluence: 'high',
      constructionNotes: 'Silny wpływ KWK Marcel (daw. Rymer). Znaczna część miasta w II-III kategorii szkód. Biertułtowy — nieco korzystniejsze warunki.',
      soilType: 'gliny zwałowe, iły',
    },
    transport: {
      majorRoads: ['DW932', 'DW933'],
      highwayDistanceKm: 10,
      highwayName: 'A1',
      nearestCity: 'Rybnik',
      nearestCityDistanceKm: 8,
      publicTransport: 'good',
    },
    character: {
      type: 'urban',
      description: 'Małe miasto (17 tys. mieszkańców) z silną tożsamością lokalną. Biertułtowy — zielona dzielnica z nowszą zabudową jednorodzinną. Centrum Radlina — gęstsza zabudowa.',
      residentialAreas: ['Biertułtowy', 'Obszary', 'Głożyny'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
      fiberOptic: true,
    },
    highlights: [
      'Pełna infrastruktura miejska w kompaktowym mieście',
      'Biertułtowy — jedna z popularniejszych lokalizacji dla młodych rodzin',
      'Blisko Rybnika (8 km) i Wodzisławia (7 km)',
    ],
    buildingAdvice: [
      'Większość Radlina w II-III kategorii szkód — fundamenty wymagają wzmocnień',
      'Biertułtowy — korzystniejsze warunki, ale sprawdź mapę zagrożeń',
      'Miasto ma aktualny MPZP dla większości terenów pod zabudowę',
    ],
  },

  'mszana': {
    slug: 'mszana',
    terrain: {
      type: 'równinny',
      geology: 'Podłoże karbońskie, pokrywa glin czwartorzędowych. Teren stosunkowo płaski.',
      miningInfluence: 'medium',
      constructionNotes: 'Częściowy wpływ KWK Marcel. Gogołowa — minimalne wpływy górnicze.',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['A1', 'DW933'],
      highwayDistanceKm: 2,
      highwayName: 'A1',
      nearestCity: 'Wodzisław Śląski',
      nearestCityDistanceKm: 7,
      publicTransport: 'moderate',
    },
    character: {
      type: 'rural',
      description: 'Gmina wiejska położona bezpośrednio przy węźle autostradowym A1 Mszana. Spokojna okolica z nowszą zabudową jednorodzinną, popularna wśród osób pracujących w Rybniku i Wodzisławiu.',
      residentialAreas: ['Mszana', 'Gogołowa'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
    },
    highlights: [
      'Węzeł autostradowy A1 Mszana — bezpośrednio w gminie',
      'Między Rybnikiem (12 km) a Wodzisławiem (7 km)',
      'Gogołowa — minimalne wpływy górnicze, dobre warunki budowlane',
    ],
    buildingAdvice: [
      'Gogołowa — korzystniejsze warunki geotechniczne niż Mszana-centrum',
      'Bliskość A1 to zaleta komunikacyjna, ale sprawdź odległość od pasa drogowego (hałas)',
    ],
  },

  'godow': {
    slug: 'godow',
    terrain: {
      type: 'równinny',
      geology: 'Nizina przy granicy z Czechami. Podłoże aluwialno-glacjalne, lokalnie torfy.',
      miningInfluence: 'low',
      constructionNotes: 'Jeden z najstabilniejszych terenów w powiecie wodzisławskim. Standardowe ławy fundamentowe wystarczające.',
      soilType: 'piaski, gliny, lokalnie torfy',
    },
    transport: {
      majorRoads: ['DW933', 'DW935'],
      highwayDistanceKm: 5,
      highwayName: 'A1',
      nearestCity: 'Wodzisław Śląski',
      nearestCityDistanceKm: 8,
      publicTransport: 'moderate',
      railConnection: 'Przystanek Godów na linii 158 (Rybnik–Chałupki)',
    },
    character: {
      type: 'rural',
      description: 'Gmina przygraniczna z Czechami o spokojnym, wiejskim charakterze. Skrzyszów i Łaziska — popularne lokalizacje pod budowę domu ze względu na niskie ceny i stabilny grunt.',
      residentialAreas: ['Skrzyszów', 'Łaziska', 'Godów'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
    },
    highlights: [
      'Minimalne wpływy górnicze — stabilny grunt pod budowę',
      'Najniższe ceny działek w okolicy',
      'Spokojna okolica przy granicy czeskiej',
      'Połączenie kolejowe z Rybnikiem',
    ],
    buildingAdvice: [
      'Sprawdź, czy działka nie leży na terenach torfowych — konieczna wymiana gruntu',
      'Stabilne warunki geotechniczne — ławy fundamentowe zazwyczaj wystarczające',
      'Kanalizacja gminna w budowie — w wielu miejscach konieczne szambo ekologiczne',
    ],
    priceContext: 'Działki od 40-80 zł/m² — najtańsze w powiecie wodzisławskim.',
  },

  'marklowice': {
    slug: 'marklowice',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Teren lekko pofałdowany, podłoże gliniste.',
      miningInfluence: 'medium',
      constructionNotes: 'Wpływ dawnej eksploatacji KWK Marcel. Warunki zróżnicowane — konieczne badanie per działka.',
      soilType: 'gliny, iły',
    },
    transport: {
      majorRoads: ['DW932'],
      highwayDistanceKm: 10,
      highwayName: 'A1',
      nearestCity: 'Wodzisław Śląski',
      nearestCityDistanceKm: 5,
      publicTransport: 'moderate',
    },
    character: {
      type: 'suburban',
      description: 'Kompaktowa gmina podmiejska między Wodzisławiem a Radlinem. Nowa zabudowa jednorodzinna, spokojna okolica z dobrym dostępem do infrastruktury obu miast.',
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
    },
    highlights: [
      'Między Wodzisławiem (5 km) a Rybnikiem (12 km)',
      'Pełna infrastruktura — kanalizacja, gaz, światłowód',
      'Kompaktowa gmina — wszystko blisko',
    ],
    buildingAdvice: [
      'Sprawdź kategorię szkód — zróżnicowanie na małej powierzchni',
      'Gmina z dobrym MPZP — większość terenów ma plan miejscowy',
    ],
  },

  'lubomia': {
    slug: 'lubomia',
    terrain: {
      type: 'równinny',
      geology: 'Nizina nadrzeczna. Podłoże piaszczysto-gliniaste, lokalnie namuły.',
      miningInfluence: 'low',
      soilType: 'piaski, gliny',
    },
    transport: {
      majorRoads: ['DW935'],
      highwayDistanceKm: 12,
      highwayName: 'A1',
      nearestCity: 'Wodzisław Śląski',
      nearestCityDistanceKm: 10,
      publicTransport: 'limited',
    },
    character: {
      type: 'rural',
      description: 'Spokojna gmina wiejska na zachodnich obrzeżach powiatu. Duże działki, luźna zabudowa, charakter rolniczo-leśny.',
    },
    infrastructure: {
      municipalUtilities: 'limited',
      gasNetwork: 'rare',
      notes: 'Brak kanalizacji gminnej — szamba lub przydomowe oczyszczalnie. Gaz w ograniczonym zakresie.',
    },
    highlights: [
      'Duże działki w niskich cenach',
      'Otoczenie lasów i terenów zielonych',
      'Minimalne wpływy górnicze',
    ],
    buildingAdvice: [
      'Planuj szambo ekologiczne lub przydomową oczyszczalnię — brak kanalizacji',
      'Sprawdź możliwość podłączenia gazu — alternatywą pompa ciepła',
      'Dojazd — drogi gminne częściowo szutrowe, zweryfikuj przed zakupem',
    ],
  },

  'pszow': {
    slug: 'pszow',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Podłoże karbońskie, pokrywa glin. Teren pofałdowany.',
      miningInfluence: 'high',
      constructionNotes: 'Historyczny wpływ KWK Anna. Wymagane badanie geotechniczne.',
      soilType: 'gliny, iły',
    },
    transport: {
      majorRoads: ['DW932'],
      nearestCity: 'Rybnik',
      nearestCityDistanceKm: 10,
      publicTransport: 'moderate',
    },
    character: {
      type: 'urban',
      description: 'Małe miasto (14 tys.) z historycznym centrum i tradycjami pielgrzymkowymi (Bazylika NMP). Ceny działek niższe niż w sąsiednim Rybniku.',
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
    },
    highlights: [
      'Pełna infrastruktura miejska w niskich cenach',
      'Bazylika NMP — lokalna atrakcja',
      'Blisko Rybnika i Wodzisławia',
    ],
    buildingAdvice: [
      'Historyczne tereny górnicze — konieczne badanie geotechniczne',
      'Sprawdź archiwalne mapy górnicze w Wyższym Urzędzie Górniczym',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // POWIAT RYBNICKI + RYBNIK
  // ══════════════════════════════════════════════════════════════

  'powiat-rybnicki': {
    slug: 'powiat-rybnicki',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Płaskowyż Rybnicki — teren pagórkowaty, podłoże karbońskie z pokrywą glin i piasków czwartorzędowych.',
      miningInfluence: 'high',
      constructionNotes: 'Aktywna eksploatacja KWK Chwałowice, Jankowice. W gminach Gaszowice i Lyski — niższe kategorie szkód.',
      soilType: 'gliny zwałowe, piaski, iły',
    },
    transport: {
      majorRoads: ['A1', 'DK78', 'DK81', 'DW935'],
      highwayDistanceKm: 3,
      highwayName: 'A1',
      nearestCity: 'Katowice',
      nearestCityDistanceKm: 45,
      publicTransport: 'good',
      railConnection: 'Linia kolejowa 140 i 158 przez Rybnik',
    },
    character: {
      type: 'suburban',
      description: 'Rybnik (140 tys.) jako centrum z 27 dzielnicami, otoczony gminami wiejskimi o luźnej zabudowie. Dynamiczny rozwój zabudowy jednorodzinnej w dzielnicach peryferyjnych.',
      residentialAreas: ['Ligota', 'Zamysłów', 'Popielów', 'Ochojec', 'Kamień'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
      fiberOptic: true,
    },
    highlights: [
      'Rybnik — trzecie miasto subregionu zachodniego (140 tys. mieszkańców)',
      'Węzły A1 Żory i Świerklany — 10-15 min',
      'Rybnickie Morze — rekreacja, plaże, sport wodny',
      '27 dzielnic — od miejskich po wiejskie',
    ],
    buildingAdvice: [
      'Dzielnice południowe (Ligota, Zamysłów, Popielów) — niższe kategorie szkód',
      'Dzielnice północne (Niedobczyce, Chwałowice) — wyższe kategorie, konieczna płyta',
      'Rybnik intensywnie rozbudowuje kanalizację — sprawdź aktualne przyłącza',
    ],
  },

  'rybnik': {
    slug: 'rybnik',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Płaskowyż Rybnicki — teren zróżnicowany, od równinnych dzielnic południowych po pagórkowate północne. Podłoże karbońskie.',
      miningInfluence: 'high',
      constructionNotes: 'KWK Chwałowice i Jankowice aktywne. Dzielnice: Chwałowice, Niewiadom — III-IV kat. Ligota, Zamysłów, Popielów — I-II kat., korzystne warunki.',
      soilType: 'gliny, piaski, iły',
      floodRisk: 'Punktowo wzdłuż rzeki Rudy i Nacyny',
    },
    transport: {
      majorRoads: ['DK78', 'DK81', 'DW935'],
      highwayDistanceKm: 12,
      highwayName: 'A1',
      nearestCity: 'Katowice',
      nearestCityDistanceKm: 45,
      publicTransport: 'good',
      railConnection: 'Stacja Rybnik — linie do Katowic, Wodzisławia, Raciborza',
    },
    character: {
      type: 'urban',
      description: 'Miasto 27 dzielnic — od centrum z pełnym zapleczem usługowym po dzielnice peryferyjne o wiejskim charakterze. Dynamiczny rozwój nowej zabudowy jednorodzinnej w Ligocie, Zamysłowie, Ochojcu i Popielowie. Program rewitalizacji "Rybnik się zmienia" przyciąga nowych mieszkańców.',
      residentialAreas: ['Ligota', 'Zamysłów', 'Popielów', 'Ochojec', 'Kamień', 'Boguszowice'],
      amenities: ['Galeria Rybnik', 'Szpital im. Piaseckiego', '3 baseny', 'Rybnickie Morze', 'Teatr Ziemi Rybnickiej', '10 szkół średnich'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
      fiberOptic: true,
      notes: 'Pełna infrastruktura miejska. Kanalizacja deszczowa i sanitarna w większości dzielnic. Program eliminacji niskiej emisji.',
    },
    highlights: [
      'Ligota i Zamysłów — najchętniej wybierane dzielnice pod budowę domu',
      'Rybnickie Morze i Park Kultury — rekreacja w mieście',
      'Pełna infrastruktura oświatowa — od przedszkoli po szkoły wyższe',
      'Program "Rybnik się zmienia" — rewitalizacja, nowe drogi rowerowe, parki',
    ],
    buildingAdvice: [
      'Ligota, Zamysłów, Popielów — I-II kategoria szkód, często wystarczą ławy fundamentowe',
      'Chwałowice, Niewiadom — III-IV kategoria, obowiązkowa płyta fundamentowa',
      'Ochojec — popularna lokalizacja, ale sprawdź MPZP (część terenów rolnych)',
      'Rybnik prowadzi program dopłat do wymiany ogrzewania — uwzględnij przy wyborze pieca',
    ],
    priceContext: 'Ceny działek w Rybniku: Ligota/Zamysłów 150-300 zł/m², dzielnice peryferyjne od 80 zł/m². Drożej niż powiat wodzisławski, taniej niż Katowice.',
  },

  'gaszowice': {
    slug: 'gaszowice',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Podłoże karbońskie z pokrywą glin. Teren lekko pofałdowany.',
      miningInfluence: 'low',
      constructionNotes: 'Gmina poza strefą aktywnej eksploatacji. Korzystne warunki pod budowę — standardowe fundamenty wystarczające.',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['DW935'],
      highwayDistanceKm: 15,
      highwayName: 'A1',
      nearestCity: 'Rybnik',
      nearestCityDistanceKm: 10,
      publicTransport: 'moderate',
    },
    character: {
      type: 'rural',
      description: 'Spokojna gmina wiejska na południe od Rybnika. Miejscowości Czernica, Szczerbice i Piece — popularne wśród rodzin szukających ciszy i dużych działek z dojazdem do Rybnika.',
      residentialAreas: ['Czernica', 'Szczerbice', 'Piece'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
      notes: 'Kanalizacja w budowie. Wodociąg gminny dostępny.',
    },
    highlights: [
      'Minimalne wpływy górnicze — stabilny grunt',
      'Cisza i zieleń 10 min od centrum Rybnika',
      'Duże działki w przystępnych cenach',
    ],
    buildingAdvice: [
      'Dobre warunki geotechniczne — standardowe fundamenty wystarczające',
      'Sprawdź dostępność kanalizacji — w Szczerbicach i Piecach częściowo szamba',
    ],
    priceContext: 'Działki 60-120 zł/m² — taniej niż dzielnice Rybnika przy zbliżonym dojazdie.',
  },

  'lyski': {
    slug: 'lyski',
    terrain: {
      type: 'równinno-falisty',
      geology: 'Dolina Rudy — podłoże aluwialne, lokalnie piaszczyste. Otoczenie lasów Nadleśnictwa Rybnik.',
      miningInfluence: 'low',
      soilType: 'piaski, żwiry, gliny',
      floodRisk: 'Punktowo wzdłuż rzeki Rudy — sprawdź mapę zagrożeń powodziowych',
    },
    transport: {
      majorRoads: ['DW920'],
      nearestCity: 'Rybnik',
      nearestCityDistanceKm: 12,
      publicTransport: 'limited',
    },
    character: {
      type: 'rural',
      description: 'Gmina leśno-wiejska w dolinie rzeki Rudy. Pstrążna, Sumina, Żytna — urokliwe wioski otoczone lasami. Idealna lokalizacja dla osób szukających spokoju i kontaktu z naturą.',
      residentialAreas: ['Pstrążna', 'Sumina', 'Żytna', 'Lyski'],
    },
    infrastructure: {
      municipalUtilities: 'limited',
      gasNetwork: 'rare',
      notes: 'Ograniczona kanalizacja — dominują szamba i oczyszczalnie przydomowe. Gaz w ograniczonym zasięgu.',
    },
    highlights: [
      'Otoczenie lasów — bliskość natury',
      'Minimalne wpływy górnicze',
      'Niskie ceny działek',
      'Rzeka Ruda — spacery, wędkowanie',
    ],
    buildingAdvice: [
      'Sprawdź mapę zagrożeń powodziowych — rzeka Ruda wylewa w okresach roztopów',
      'Podłoże piaszczyste — dobre warunki dla drenażu, ale sprawdź nośność',
      'Planuj ogrzewanie bez gazu — pompa ciepła lub pellet',
      'Drogi dojazdowe częściowo szutrowe — zweryfikuj stan nawierzchni',
    ],
  },

  'swierklany': {
    slug: 'swierklany',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Podłoże karbońskie. Teren pod wpływem KWK Jankowice.',
      miningInfluence: 'high',
      constructionNotes: 'Aktywna eksploatacja — wymagane wzmocnione fundamenty. Jankowice — bezpośredni wpływ kopalni.',
      soilType: 'gliny, iły',
    },
    transport: {
      majorRoads: ['DW935'],
      highwayDistanceKm: 8,
      highwayName: 'A1',
      nearestCity: 'Rybnik',
      nearestCityDistanceKm: 7,
      publicTransport: 'moderate',
    },
    character: {
      type: 'rural',
      description: 'Gmina wiejska między Rybnikiem a Żorami. Jankowice — miejscowość przy kopalni, z niższymi cenami działek.',
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
    },
    highlights: [
      'Blisko Rybnika (7 km) i Żor (5 km)',
      'Niskie ceny działek',
      'Węzeł A1 Świerklany w budowie/planowany',
    ],
    buildingAdvice: [
      'Konieczna opinia górnicza i geotechnika',
      'Płyta fundamentowa zalecana w większości lokalizacji',
      'Kopalnia pokrywa koszty napraw szkód górniczych — sprawdź polisę',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // POWIAT RACIBORSKI
  // ══════════════════════════════════════════════════════════════

  'powiat-raciborski': {
    slug: 'powiat-raciborski',
    terrain: {
      type: 'równinny',
      geology: 'Nizina Śląska — podłoże aluwialne Odry. Gleby urodzajne, lessowe.',
      miningInfluence: 'none',
      soilType: 'lessy, gliny, piaski aluwialne',
      floodRisk: 'Dolina Odry — historyczne powodzie (1997, 2010). Sprawdź mapy zagrożeń.',
    },
    transport: {
      majorRoads: ['DK45', 'DW935'],
      nearestCity: 'Racibórz',
      publicTransport: 'moderate',
    },
    character: {
      type: 'rural',
      description: 'Gminy wiejskie o charakterze rolniczym. Brak wpływów górniczych — stabilne warunki budowlane. Ceny działek niższe niż w powiatach górniczych.',
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
    },
    highlights: [
      'Brak wpływów górniczych — stabilny grunt',
      'Niskie ceny działek',
      'Charakter rolniczy — duże, płaskie działki',
    ],
    buildingAdvice: [
      'Sprawdź mapę zagrożeń powodziowych — bliskość Odry',
      'Gleby lessowe — dobra nośność, ale wrażliwe na zamakanie',
      'Standardowe fundamenty (ławy) wystarczające w większości lokalizacji',
    ],
  },

  'nedza': {
    slug: 'nedza',
    terrain: {
      type: 'równinny',
      geology: 'Nizina nadrzeczna Odry. Podłoże aluwialne — piaski, żwiry, namuły.',
      miningInfluence: 'none',
      soilType: 'piaski, żwiry aluwialne',
      floodRisk: 'Bliskość Odry — sprawdź strefę zalewową Q1% i Q0,2%',
    },
    transport: {
      majorRoads: ['DW935'],
      nearestCity: 'Racibórz',
      nearestCityDistanceKm: 10,
      publicTransport: 'limited',
    },
    character: {
      type: 'rural',
      description: 'Gmina wiejska z Górkami Śląskimi jako główną miejscowością pod zabudowę. Charakter rolniczy, spokojne otoczenie, duże działki.',
      residentialAreas: ['Górki Śląskie', 'Nędza', 'Szymocice'],
    },
    infrastructure: {
      municipalUtilities: 'limited',
      gasNetwork: 'partial',
    },
    highlights: [
      'Zero wpływów górniczych — idealny grunt pod budowę',
      'Duże, płaskie działki w niskich cenach',
      'Spokojna okolica wiejska',
    ],
    buildingAdvice: [
      'Sprawdź odległość od wałów Odry i strefę zalewową',
      'Podłoże piaszczyste — dobre drenowanie, ale sprawdź nośność (badanie geotechniczne)',
      'Planuj szambo ekologiczne — kanalizacja gminna ograniczona',
    ],
  },

  'pietrowice-wielkie': {
    slug: 'pietrowice-wielkie',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Podłoże lessowe na wzniesieniach Płaskowyżu Głubczyckiego. Urodzajne gleby.',
      miningInfluence: 'none',
      soilType: 'lessy, gliny lessowe',
    },
    transport: {
      majorRoads: ['DW416'],
      nearestCity: 'Racibórz',
      nearestCityDistanceKm: 15,
      publicTransport: 'limited',
    },
    character: {
      type: 'rural',
      description: 'Gmina o charakterze rolniczym na Płaskowyżu Głubczyckim. Cyprzanów — spokojna miejscowość z widokami na okoliczne wzgórza.',
    },
    infrastructure: {
      municipalUtilities: 'limited',
      gasNetwork: 'rare',
    },
    highlights: [
      'Brak jakichkolwiek wpływów górniczych',
      'Piękne widoki — pagórkowaty teren',
      'Najtańsze działki w regionie',
    ],
    buildingAdvice: [
      'Gleby lessowe — dobra nośność, ale wrażliwe na zamakanie, konieczny drenaż',
      'Teren pagórkowaty — uwzględnij koszty niwelacji',
      'Planuj ogrzewanie alternatywne — ograniczony dostęp do gazu',
    ],
  },

  'kornowac': {
    slug: 'kornowac',
    terrain: {
      type: 'równinno-falisty',
      geology: 'Przejście między Niziną Śląską a Płaskowyżem. Podłoże gliniaste.',
      miningInfluence: 'none',
      soilType: 'gliny, lessy',
    },
    transport: {
      majorRoads: ['DW935'],
      nearestCity: 'Racibórz',
      nearestCityDistanceKm: 12,
      publicTransport: 'limited',
    },
    character: {
      type: 'rural',
      description: 'Mała gmina wiejska — Łańce i Rzuchów to spokojne wsie z nową zabudową jednorodzinną.',
    },
    infrastructure: {
      municipalUtilities: 'limited',
      gasNetwork: 'rare',
    },
    highlights: [
      'Zero wpływów górniczych',
      'Niskie ceny — duże działki',
      'Spokój i cisza',
    ],
    buildingAdvice: [
      'Standardowe fundamenty wystarczające',
      'Ograniczona infrastruktura — planuj autonomiczne media (studnia, oczyszczalnia, pompa ciepła)',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // POWIAT MIKOLOWSKI
  // ══════════════════════════════════════════════════════════════

  'powiat-mikolowski': {
    slug: 'powiat-mikolowski',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Wyżyna Śląska — podłoże karbońskie, pokrywa glin.',
      miningInfluence: 'medium',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['A4', 'DK44', 'DW928'],
      highwayDistanceKm: 5,
      highwayName: 'A4',
      nearestCity: 'Katowice',
      nearestCityDistanceKm: 20,
      publicTransport: 'good',
    },
    character: {
      type: 'suburban',
      description: 'Powiat w bezpośrednim sąsiedztwie Katowic. Mikołów i Ornontowice — popularne lokalizacje dla osób pracujących w aglomeracji.',
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
      fiberOptic: true,
    },
    highlights: [
      'Bliskość Katowic — 20 km',
      'Autostrada A4 w zasięgu',
      'Dobra komunikacja autobusowa z aglomeracją',
    ],
    buildingAdvice: [
      'Sprawdź wpływy dawnej eksploatacji górniczej',
      'Ceny wyższe niż w powiatach zachodnich — bliskość Katowic',
    ],
  },

  'ornontowice': {
    slug: 'ornontowice',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Wyżyna Śląska. Podłoże karbońskie z pokrywą glin czwartorzędowych.',
      miningInfluence: 'medium',
      constructionNotes: 'Historyczny wpływ KWK Budryk (Ornontowice). Część terenów stabilna, część w II kategorii.',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['DW928', 'DW925'],
      highwayDistanceKm: 8,
      highwayName: 'A4',
      nearestCity: 'Mikołów',
      nearestCityDistanceKm: 5,
      publicTransport: 'moderate',
    },
    character: {
      type: 'suburban',
      description: 'Gmina podmiejska między Mikołowem a Gliwicami. Popularna wśród rodzin z Katowic szukających spokojniejszej lokalizacji z zachowaniem dostępu do aglomeracji.',
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
      fiberOptic: true,
    },
    highlights: [
      'Między Mikołowem (5 km) a Gliwicami (10 km)',
      'Pełna infrastruktura — kanalizacja, gaz, światłowód',
      'Komunikacja autobusowa do Katowic',
      'Nowa zabudowa jednorodzinna — młode osiedle',
    ],
    buildingAdvice: [
      'Zróżnicowane warunki — konieczne badanie geotechniczne per działka',
      'Część gminy stabilna (ławy OK), część wymaga wzmocnionych fundamentów',
    ],
    priceContext: 'Ceny 120-200 zł/m² — drożej niż powiat wodzisławski, ale blisko aglomeracji katowickiej.',
  },

  // ══════════════════════════════════════════════════════════════
  // MIASTA NA PRAWACH POWIATU
  // ══════════════════════════════════════════════════════════════

  'jastrzebie-zdroj': {
    slug: 'jastrzebie-zdroj',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Pogórze Śląskie — teren pofałdowany, podłoże karbońskie.',
      miningInfluence: 'high',
      constructionNotes: 'KWK Borynia-Zofiówka aktywna. Większość miasta w II-IV kategorii szkód. Konieczna opinia górnicza i geotechnika.',
      soilType: 'gliny, iły, piaski',
    },
    transport: {
      majorRoads: ['DK81', 'DW937'],
      highwayDistanceKm: 15,
      highwayName: 'A1',
      nearestCity: 'Rybnik',
      nearestCityDistanceKm: 20,
      publicTransport: 'good',
    },
    character: {
      type: 'urban',
      description: 'Miasto uzdrowiskowe (90 tys.) z tradycjami górniczymi. Zdrojowa część miasta — tereny rekreacyjne, parki, sanatorium. Dzielnice peryferyjne z nową zabudową jednorodzinną.',
      residentialAreas: ['Szeroka', 'Bzie', 'Zdrój'],
      amenities: ['Park Zdrojowy', 'Termy Jastrzębie', 'Hala Widowiskowa', 'Szpital'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
      fiberOptic: true,
    },
    highlights: [
      'Status uzdrowiska — termy, parki zdrojowe',
      'Pełna infrastruktura miejska',
      'Ceny działek niższe niż w Rybniku',
      'Termy Jastrzębie — rekreacja',
    ],
    buildingAdvice: [
      'Wymagana opinia górnicza — KWK Borynia-Zofiówka aktywna',
      'Dzielnica Zdrój — korzystniejsze warunki gruntowe niż centrum',
      'Sprawdź ograniczenia zabudowy w strefie uzdrowiskowej',
    ],
  },

  'zory': {
    slug: 'zory',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Pogórze Śląskie — teren pofałdowany. Podłoże karbońskie, pokrywa glin.',
      miningInfluence: 'medium',
      constructionNotes: 'Historyczny wpływ KWK Żory (zamknięta). Warunki stabilizujące się. Niektóre rejony nadal w II kategorii.',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['A1', 'DK81'],
      highwayDistanceKm: 3,
      highwayName: 'A1',
      nearestCity: 'Rybnik',
      nearestCityDistanceKm: 15,
      publicTransport: 'good',
    },
    character: {
      type: 'urban',
      description: 'Miasto (60 tys.) z bezpośrednim dostępem do autostrady A1. Osiedle Pawlikowice i Kleszczówka — dynamiczny rozwój zabudowy jednorodzinnej.',
      residentialAreas: ['Pawlikowice', 'Kleszczówka', 'Rój'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
      fiberOptic: true,
    },
    highlights: [
      'Węzeł A1 Żory — bezpośredni zjazd',
      'Kopalnia zamknięta — warunki gruntowe stabilizujące się',
      'Dynamiczny rozwój nowych osiedli',
      'Dobra komunikacja z Katowicami (40 min A1)',
    ],
    buildingAdvice: [
      'Kopalnia zamknięta, ale sprawdź historyczne mapy — relikty chodników',
      'Pawlikowice i Kleszczówka — stabilne warunki, nowa zabudowa',
      'Węzeł A1 — zaleta, ale sprawdź odległość od pasa drogowego',
    ],
    priceContext: 'Ceny 120-200 zł/m² — zbliżone do Rybnika, ale z lepszym dostępem do A1.',
  },

  'bielsko-biala': {
    slug: 'bielsko-biala',
    terrain: {
      type: 'podgórski',
      geology: 'Pogórze Śląskie — teren wyraźnie pofałdowany, przejście w Beskid Mały. Podłoże fliszowe (piaskowce, łupki).',
      miningInfluence: 'none',
      constructionNotes: 'Brak wpływów górniczych. Wyzwanie: nachylenie terenu i warunki fliszowe. Na stokach — konieczne badanie stateczności i drenaż.',
      soilType: 'gliny zwietrzelinowe, piaski, lokalnie flisz karpacki',
    },
    transport: {
      majorRoads: ['S1', 'S52', 'DK1'],
      highwayDistanceKm: 5,
      highwayName: 'S1/S52',
      nearestCity: 'Katowice',
      nearestCityDistanceKm: 60,
      publicTransport: 'good',
      railConnection: 'Stacja Bielsko-Biała Główna — IC do Warszawy, Krakowa',
    },
    character: {
      type: 'urban',
      description: 'Miasto (170 tys.) u podnóża Beskidów. Łączy charakter miejski z górskim. Osiedla na wzgórzach oferują panoramiczne widoki na góry. Silny ośrodek akademicki i przemysłowy (FIAT/Stellantis).',
      residentialAreas: ['Kamienica', 'Straconka', 'Olszówka', 'Lipnik'],
      amenities: ['Uniwersytet', 'Lotnisko Kaniów', 'Stok narciarski Szyndzielnia', 'Galeria Sfera', '2 szpitale'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
      fiberOptic: true,
    },
    highlights: [
      'U podnóża Beskidów — widoki, góry, narty',
      'Brak wpływów górniczych',
      'Ekspresowa S1 — 50 min do Katowic',
      'Ośrodek akademicki i przemysłowy',
    ],
    buildingAdvice: [
      'Działki na stokach — konieczne badanie stateczności zbocza',
      'Podłoże fliszowe — zmienne warunki, geotechnika obowiązkowa',
      'Na nachylonych działkach — drenaż opaskowy chroni fundamenty',
      'Wyższe koszty robót ziemnych na terenie pagórkowatym',
    ],
    priceContext: 'Ceny 150-400 zł/m² — wyższe niż powiat wodzisławski/rybnicki. Działki z widokiem na góry — premium.',
  },

  // ══════════════════════════════════════════════════════════════
  // POWIAT CIESZYNSKI
  // ══════════════════════════════════════════════════════════════

  'powiat-cieszynski': {
    slug: 'powiat-cieszynski',
    terrain: {
      type: 'podgórski',
      geology: 'Pogórze Śląskie przechodzące w Beskid Śląski. Podłoże fliszowe — naprzemianlegle warstwy piaskowców i łupków. Teren wyraźnie pofałdowany.',
      miningInfluence: 'none',
      constructionNotes: 'Brak wpływów górniczych. Główne wyzwanie — nachylenie terenu, grunt fliszowy i osuwiska. Na stokach konieczne badanie geotechniczne z oceną stateczności.',
      soilType: 'gliny zwietrzelinowe, piaski, flisz karpacki',
    },
    transport: {
      majorRoads: ['S1', 'S52', 'DK81', 'DW941'],
      nearestCity: 'Bielsko-Biała',
      nearestCityDistanceKm: 30,
      publicTransport: 'moderate',
      railConnection: 'Linia kolejowa 190 (Bielsko-Biała–Cieszyn–Zebrzydowice)',
    },
    character: {
      type: 'periurban',
      description: 'Powiat pogórzański i beskidzki — od miejskiego Cieszyna przez uzdrowiskowy Ustroń po górskie gminy Brenna i Istebna. Charakter rekreacyjno-turystyczny z dynamicznym rozwojem zabudowy jednorodzinnej.',
      residentialAreas: ['Skoczów', 'Ustroń', 'Goleszów', 'Brenna'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
      notes: 'W miastach (Cieszyn, Ustroń, Skoczów) — pełna infrastruktura. Gminy wiejskie — częściowo szamba i studnie.',
    },
    highlights: [
      'Beskid Śląski — widoki, turystyka, narty',
      'Zero wpływów górniczych',
      'Bliskość granicy czeskiej — Český Těšín',
      'Uzdrowiska — Ustroń, Wisła (sąsiedni powiat)',
    ],
    buildingAdvice: [
      'Na stokach — badanie stateczności zbocza jest krytyczne (osuwiska!)',
      'Podłoże fliszowe — zmienne warunki na krótkim dystansie',
      'W gminach górskich — wyższe koszty fundamentów i robót ziemnych',
      'Sprawdź dojazd zimowy — drogi górskie mogą być trudne',
    ],
  },

  'cieszyn': {
    slug: 'cieszyn',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Pogórze Cieszyńskie — teren pofałdowany nad Olzą. Podłoże fliszowe.',
      miningInfluence: 'none',
      soilType: 'gliny, piaski, flisz',
    },
    transport: {
      majorRoads: ['DK1', 'DW938'],
      nearestCity: 'Bielsko-Biała',
      nearestCityDistanceKm: 35,
      publicTransport: 'good',
      railConnection: 'Stacja Cieszyn — linia 190 do Bielska',
    },
    character: {
      type: 'urban',
      description: 'Historyczne miasto na granicy z Czechami (Český Těšín). Piękna starówka, charakter kulturalny. Peryferie — tereny pod zabudowę z widokami na Beskidy.',
      amenities: ['Teatr im. Mickiewicza', 'Zamek Piastowski', 'Szpital', 'Most Przyjaźni'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
    },
    highlights: [
      'Historyczne miasto z pełną infrastrukturą',
      'Granica czeska — dwujęzyczny charakter',
      'Widoki na Beskidy',
      'Brak wpływów górniczych',
    ],
    buildingAdvice: [
      'Peryferie Cieszyna — teren pagórkowaty, sprawdź nachylenie',
      'Strefa ochrony konserwatorskiej w centrum — ograniczenia zabudowy',
    ],
  },

  'ustron': {
    slug: 'ustron',
    terrain: {
      type: 'podgórski',
      geology: 'Dolina Wisły w otoczeniu Beskidu Śląskiego. Podłoże fliszowe. Teren zróżnicowany — od płaskiej doliny po strome stoki.',
      miningInfluence: 'none',
      soilType: 'gliny zwietrzelinowe, piaski rzeczne, flisz',
    },
    transport: {
      majorRoads: ['DW941'],
      nearestCity: 'Cieszyn',
      nearestCityDistanceKm: 15,
      publicTransport: 'moderate',
    },
    character: {
      type: 'mountain',
      description: 'Uzdrowisko w dolinie Wisły. Status zdrojowy wpływa na charakter zabudowy i ceny. Działki z widokiem na Czantorię i Równicę — premium. Popularne wśród zamożniejszych inwestorów.',
      amenities: ['Sanatorium', 'Wyciąg na Czantorię', 'Basen', 'Parki zdrojowe'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
    },
    highlights: [
      'Status uzdrowiska — czyste powietrze, tereny zielone',
      'Widoki na Beskidy — Czantoria, Równica',
      'Wyciągi narciarskie w granicach miasta',
    ],
    buildingAdvice: [
      'Strefa uzdrowiskowa — ograniczenia zabudowy, sprawdź plan miejscowy',
      'Działki na stokach — wyższe koszty fundamentów',
      'Drenaż krytyczny — nachylony teren + opady beskidzkie',
    ],
    priceContext: 'Działki 200-500+ zł/m² — premium uzdrowiskowe. Najdroższe z widokiem na góry.',
  },

  'skoczow': {
    slug: 'skoczow',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Pogórze Cieszyńskie — umiarkowanie pofałdowany teren nad Wisłą. Podłoże fliszowo-gliniaste.',
      miningInfluence: 'none',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['DK81', 'DW941'],
      nearestCity: 'Bielsko-Biała',
      nearestCityDistanceKm: 20,
      publicTransport: 'moderate',
      railConnection: 'Przystanek Skoczów — linia 190',
    },
    character: {
      type: 'periurban',
      description: 'Miasto (15 tys.) i gmina wiejska z wieloma sołectwami. Kiczyce, Międzyświeć, Ochaby Małe, Pogórze — popularne lokalizacje pod budowę domu. Dobry kompromis między ceną a dostępem do infrastruktury.',
      residentialAreas: ['Kiczyce', 'Międzyświeć', 'Ochaby Małe', 'Pogórze', 'Wilamowice'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
      notes: 'W mieście — pełna infrastruktura. Sołectwa — zróżnicowane: część ma kanalizację, część szamba.',
    },
    highlights: [
      'Kompromis cena-infrastruktura — tańsze niż Bielsko/Ustroń',
      'Liczne sołectwa z terenami pod budowę',
      'Brak wpływów górniczych',
      'Dojazd do Bielska 20 min',
    ],
    buildingAdvice: [
      'Sołectwa — sprawdź dostępność kanalizacji i gazu',
      'Teren pagórkowaty — na stokach sprawdź nachylenie i odpływ wód',
      'Kiczyce i Pogórze — popularne, ceny rosną',
    ],
  },

  'brenna': {
    slug: 'brenna',
    terrain: {
      type: 'podgórski',
      geology: 'Beskid Śląski — teren wyraźnie pofałdowany do górskiego. Podłoże fliszowe z piaskowcami godulskimi.',
      miningInfluence: 'none',
      constructionNotes: 'Teren górski — osuwiska, wysoki poziom opadów, nachylone stoki. Konieczne badanie geotechniczne z oceną stateczności zbocza.',
      soilType: 'gliny zwietrzelinowe, flisz',
      floodRisk: 'Potok Brennica — punktowe zagrożenie w dolinie',
    },
    transport: {
      majorRoads: ['DW942'],
      nearestCity: 'Skoczów',
      nearestCityDistanceKm: 10,
      publicTransport: 'limited',
    },
    character: {
      type: 'mountain',
      description: 'Gmina beskidzka — Brenna, Górki Wielkie i Górki Małe. Charakter turystyczno-rekreacyjny z dynamicznie rosnącą zabudową jednorodzinną. Widoki na Beskidy, lasy, cisza.',
      residentialAreas: ['Górki Wielkie', 'Górki Małe', 'Brenna-centrum'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
      notes: 'Kanalizacja w centrum Brennej. W Górkach — częściowo szamba. Gaz w ograniczonym zakresie.',
    },
    highlights: [
      'Beskid Śląski — widoki, lasy, szlaki turystyczne',
      'Górki Wielkie — znane z Zofii Kossak-Szczuckiej',
      'Brak wpływów górniczych',
      'Rosnąca popularność — nowe domy w górskim otoczeniu',
    ],
    buildingAdvice: [
      'Obowiązkowe badanie geotechniczne — ryzyko osuwisk na stokach',
      'Drenaż opaskowy konieczny — intensywne opady beskidzkie',
      'Wyższe koszty budowy — transport materiałów w góry, trudniejszy dostęp',
      'Sprawdź dojazd zimowy — drogi górskie mogą być śliskie',
    ],
    priceContext: 'Działki 80-200 zł/m². Z widokiem na góry — droższe. Strome stoki — tańsze ale wyższe koszty budowy.',
  },

  'goleszow': {
    slug: 'goleszow',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Pogórze Cieszyńskie — umiarkowanie pofałdowany teren. Podłoże gliniasto-fliszowe.',
      miningInfluence: 'none',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['DW938'],
      nearestCity: 'Cieszyn',
      nearestCityDistanceKm: 8,
      publicTransport: 'moderate',
    },
    character: {
      type: 'rural',
      description: 'Gmina wiejska pod Cieszynem. Cisownica i Bażanowice — spokojne wsie z nową zabudową, popularne wśród rodzin z Cieszyna.',
      residentialAreas: ['Cisownica', 'Bażanowice', 'Goleszów'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
    },
    highlights: [
      'Blisko Cieszyna (8 km) — spokój bez rezygnacji z infrastruktury',
      'Brak wpływów górniczych',
      'Umiarkowane ceny',
    ],
    buildingAdvice: [
      'Teren pagórkowaty — sprawdź nachylenie działki',
      'Cisownica — sprawdź dostępność kanalizacji',
    ],
  },

  'hazlach': {
    slug: 'hazlach',
    terrain: {
      type: 'równinno-falisty',
      geology: 'Pogórze Cieszyńskie — łagodny teren przy Wiśle. Podłoże gliniaste.',
      miningInfluence: 'none',
      soilType: 'gliny, piaski aluwialne',
    },
    transport: {
      majorRoads: ['DW938'],
      nearestCity: 'Cieszyn',
      nearestCityDistanceKm: 10,
      publicTransport: 'moderate',
    },
    character: {
      type: 'rural',
      description: 'Gmina wiejska z wieloma sołectwami. Pogwizdów i Zamarski — spokojne tereny pod zabudowę z dobrym dojazdem do Cieszyna.',
      residentialAreas: ['Pogwizdów', 'Zamarski', 'Kończyce Wielkie'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
    },
    highlights: [
      'Brak wpływów górniczych',
      'Łagodny, płaski teren',
      'Niskie ceny działek',
    ],
    buildingAdvice: [
      'Sprawdź dostępność kanalizacji w sołectwach',
      'Łagodny teren — niższe koszty fundamentów niż w Beskidach',
    ],
  },

  'zebrzydowice': {
    slug: 'zebrzydowice',
    terrain: {
      type: 'równinny',
      geology: 'Równina u podnóża Pogórza. Podłoże gliniaste.',
      miningInfluence: 'none',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['DK81'],
      nearestCity: 'Cieszyn',
      nearestCityDistanceKm: 12,
      publicTransport: 'moderate',
      railConnection: 'Stacja Zebrzydowice — linia 190, przejście graniczne kolejowe z Czechami',
    },
    character: {
      type: 'rural',
      description: 'Gmina przygraniczna z Czechami. Kaczyce i Kończyce Małe — popularne lokalizacje pod budowę. Równy teren, niskie ceny.',
      residentialAreas: ['Kaczyce', 'Kończyce Małe', 'Zebrzydowice'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
    },
    highlights: [
      'Przejście graniczne kolejowe z Czechami',
      'Równy teren — niskie koszty budowy',
      'Brak wpływów górniczych',
    ],
    buildingAdvice: [
      'Równy teren — standardowe fundamenty wystarczające',
      'Sprawdź kanalizację — w części gmin szamba',
    ],
  },

  'strumien': {
    slug: 'strumien',
    terrain: {
      type: 'równinny',
      geology: 'Kotlina Oświęcimska — płaski teren nad Wisłą. Podłoże aluwialne.',
      miningInfluence: 'none',
      soilType: 'piaski, żwiry aluwialne, gliny',
      floodRisk: 'Bliskość Wisły — sprawdź strefę zalewową',
    },
    transport: {
      majorRoads: ['DK81'],
      nearestCity: 'Bielsko-Biała',
      nearestCityDistanceKm: 25,
      publicTransport: 'moderate',
    },
    character: {
      type: 'rural',
      description: 'Gmina w Kotlinie Oświęcimskiej. Zbytków i Zabłocie — spokojne wsie z płaskim terenem pod budowę.',
      residentialAreas: ['Zbytków', 'Zabłocie'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
    },
    highlights: [
      'Płaski teren — niskie koszty fundamentów',
      'Brak wpływów górniczych',
      'Niskie ceny działek',
    ],
    buildingAdvice: [
      'Sprawdź mapę zagrożeń powodziowych — Wisła',
      'Podłoże aluwialne — sprawdź poziom wód gruntowych',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // POWIAT BIELSKI
  // ══════════════════════════════════════════════════════════════

  'powiat-bielski': {
    slug: 'powiat-bielski',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Pogórze Śląskie — umiarkowanie pofałdowany teren.',
      miningInfluence: 'none',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['S1', 'DK1'],
      nearestCity: 'Bielsko-Biała',
      publicTransport: 'moderate',
    },
    character: {
      type: 'periurban',
      description: 'Gminy podmiejskie Bielska-Białej. Jasienica — popularna lokalizacja pod budowę domu.',
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
    },
    highlights: [
      'Bliskość Bielska-Białej',
      'Brak wpływów górniczych',
      'Ekspresowa S1 w zasięgu',
    ],
    buildingAdvice: [
      'Teren pagórkowaty — sprawdź nachylenie',
      'Gminy wiejskie — sprawdź kanalizację i gaz',
    ],
  },

  'jasienica': {
    slug: 'jasienica',
    terrain: {
      type: 'pagórkowaty',
      geology: 'Pogórze Śląskie. Podłoże gliniaste z piaskami.',
      miningInfluence: 'none',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['DK1', 'S1'],
      nearestCity: 'Bielsko-Biała',
      nearestCityDistanceKm: 10,
      publicTransport: 'moderate',
    },
    character: {
      type: 'periurban',
      description: 'Duża gmina wiejska pod Bielskiem. Łazy i inne sołectwa — popularne lokalizacje pod budowę. Dobry kompromis cena-dojazd.',
      residentialAreas: ['Łazy', 'Jasienica', 'Mazańcowice'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'partial',
    },
    highlights: [
      '10 min od Bielska-Białej',
      'Niższe ceny niż w mieście',
      'Ekspresowa S1 blisko',
    ],
    buildingAdvice: [
      'Sprawdź kanalizację w sołectwach',
      'Pagórkowaty teren — uwzględnij koszty niwelacji',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // POWIAT PSZCZYNSKI
  // ══════════════════════════════════════════════════════════════

  'powiat-pszczynski': {
    slug: 'powiat-pszczynski',
    terrain: {
      type: 'równinny',
      geology: 'Kotlina Oświęcimska — płaski teren. Podłoże gliniasto-piaszczyste.',
      miningInfluence: 'low',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['DK1', 'S1', 'DW935'],
      nearestCity: 'Katowice',
      nearestCityDistanceKm: 30,
      publicTransport: 'moderate',
    },
    character: {
      type: 'periurban',
      description: 'Powiat między Katowicami a Bielskiem. Pszczyna — historyczne miasto z zamkiem, parkiem zamkowym. Suszec — gmina podmiejska.',
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'widespread',
    },
    highlights: [
      'Pszczyna — historyczny charakter, park zamkowy',
      'S1 — szybki dojazd do Katowic i Bielska',
      'Równy teren — niskie koszty fundamentów',
    ],
    buildingAdvice: [
      'Pszczyna — sprawdź strefę ochrony konserwatorskiej',
      'Równy teren — standardowe fundamenty wystarczające',
    ],
  },

  'pszczyna': {
    slug: 'pszczyna',
    terrain: {
      type: 'równinny',
      geology: 'Kotlina Oświęcimska. Płaski teren nad Pszczynką.',
      miningInfluence: 'low',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['DK1', 'S1'],
      nearestCity: 'Katowice',
      nearestCityDistanceKm: 30,
      publicTransport: 'good',
    },
    character: {
      type: 'periurban',
      description: 'Historyczne miasto z zamkiem i parkiem. Obrzeża — dynamiczny rozwój zabudowy jednorodzinnej. Popularne wśród rodzin z Katowic.',
      amenities: ['Zamek Pszczyński', 'Park Zamkowy', 'Szpital', 'Szkoły'],
    },
    infrastructure: {
      municipalUtilities: 'full',
      gasNetwork: 'widespread',
    },
    highlights: [
      'Historyczny charakter — zamek, park',
      'S1 — 30 min do Katowic',
      'Pełna infrastruktura miejska',
    ],
    buildingAdvice: [
      'Sprawdź strefę ochrony konserwatorskiej w centrum',
      'Obrzeża — sprawdź MPZP, nie wszystkie tereny pod zabudowę',
    ],
    priceContext: 'Ceny 150-300 zł/m² — wyższe niż powiat wodzisławski, konkurencyjne wobec Katowic.',
  },

  'suszec': {
    slug: 'suszec',
    terrain: {
      type: 'równinno-falisty',
      geology: 'Podłoże gliniaste. Teren lekko pofałdowany.',
      miningInfluence: 'medium',
      constructionNotes: 'Wpływ KWK Krupiński (zamknięta 2017). Warunki stabilizujące się.',
      soilType: 'gliny, piaski',
    },
    transport: {
      majorRoads: ['DW935'],
      nearestCity: 'Pszczyna',
      nearestCityDistanceKm: 8,
      publicTransport: 'moderate',
    },
    character: {
      type: 'rural',
      description: 'Gmina wiejska z Radostowicami jako popularne sołectwo pod budowę. Kopalnia zamknięta — ceny działek niższe niż w Pszczynie.',
      residentialAreas: ['Radostowice', 'Suszec', 'Rudziczka'],
    },
    infrastructure: {
      municipalUtilities: 'partial',
      gasNetwork: 'widespread',
    },
    highlights: [
      'Kopalnia zamknięta — warunki gruntowe stabilizujące się',
      'Niższe ceny niż w Pszczynie',
      'Gaz szeroko dostępny',
    ],
    buildingAdvice: [
      'Sprawdź historyczne wpływy górnicze — kopalnia zamknięta ale relikty możliwe',
      'Warunki stabilizujące się — badanie geotechniczne wskaże aktualny stan',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // POWIAT ZYWIECKI
  // ══════════════════════════════════════════════════════════════

  'powiat-zywiecki': {
    slug: 'powiat-zywiecki',
    terrain: {
      type: 'podgórski',
      geology: 'Beskid Żywiecki — teren górski. Podłoże fliszowe (piaskowce magurskie).',
      miningInfluence: 'none',
      soilType: 'gliny zwietrzelinowe, flisz',
    },
    transport: {
      majorRoads: ['DK1', 'DW945'],
      nearestCity: 'Bielsko-Biała',
      nearestCityDistanceKm: 40,
      publicTransport: 'limited',
    },
    character: {
      type: 'mountain',
      description: 'Powiat górski — Beskid Żywiecki. Gminy Radziechowy-Wieprz i Rajcza — charakter turystyczno-rekreacyjny z rosnącą zabudową jednorodzinną.',
    },
    infrastructure: {
      municipalUtilities: 'limited',
      gasNetwork: 'rare',
    },
    highlights: [
      'Beskid Żywiecki — góry, lasy, narty',
      'Brak wpływów górniczych',
      'Niskie ceny działek',
    ],
    buildingAdvice: [
      'Teren górski — konieczne badanie stateczności zbocza',
      'Dojazd zimowy — sprawdź odśnieżanie drogi',
      'Planuj ogrzewanie bez gazu — pompa ciepła lub pellet',
      'Wyższe koszty transportu materiałów budowlanych',
    ],
  },

  'radziechowy-wieprz': {
    slug: 'radziechowy-wieprz',
    terrain: {
      type: 'podgórski',
      geology: 'Beskid Żywiecki. Teren zróżnicowany — od doliny po stoki.',
      miningInfluence: 'none',
      soilType: 'gliny zwietrzelinowe',
    },
    transport: {
      majorRoads: ['DW945'],
      nearestCity: 'Żywiec',
      nearestCityDistanceKm: 10,
      publicTransport: 'limited',
    },
    character: {
      type: 'mountain',
      description: 'Gmina beskidzka. Wieprz — sołectwo z dostępem do infrastruktury. Spokojna, górska okolica.',
    },
    infrastructure: {
      municipalUtilities: 'limited',
      gasNetwork: 'rare',
    },
    highlights: [
      'Górska cisza i widoki',
      'Niskie ceny',
      'Brak wpływów górniczych',
    ],
    buildingAdvice: [
      'Sprawdź dojazd zimowy',
      'Planuj autonomiczne media',
      'Badanie geotechniczne na stoku — konieczne',
    ],
  },

  'rajcza': {
    slug: 'rajcza',
    terrain: {
      type: 'podgórski',
      geology: 'Beskid Żywiecki — dolina Soły. Podłoże fliszowe.',
      miningInfluence: 'none',
      soilType: 'gliny, piaski rzeczne',
      floodRisk: 'Dolina Soły — sprawdź strefę zalewową',
    },
    transport: {
      majorRoads: ['DW945'],
      nearestCity: 'Żywiec',
      nearestCityDistanceKm: 20,
      publicTransport: 'limited',
    },
    character: {
      type: 'mountain',
      description: 'Gmina u stóp Pilska i Babiej Góry. Charakter turystyczno-rekreacyjny. Sól — sołectwo z tradycjami uzdrowiskowymi.',
    },
    infrastructure: {
      municipalUtilities: 'limited',
      gasNetwork: 'rare',
    },
    highlights: [
      'U stóp Pilska — narty, turystyka',
      'Urokliwa beskidzka okolica',
      'Niskie ceny działek',
    ],
    buildingAdvice: [
      'Sprawdź strefę zalewową Soły',
      'Drogi górskie — trudniejszy dojazd zimą',
      'Autonomiczne media — brak kanalizacji i gazu w większości',
    ],
  },
};

/**
 * Get region data for a location slug.
 * Falls back to parent slug if no direct match.
 */
export function getRegionData(slug: string): RegionData | undefined {
  return REGION_DATA[slug];
}

/**
 * Get region data with fallback to parent location.
 * E.g. 'kokoszyce' → falls back to 'wodzislaw-slaski' → 'powiat-wodzislawski'
 */
export function getRegionDataWithFallback(slug: string, parentSlug?: string): RegionData | undefined {
  const direct = REGION_DATA[slug];
  if (direct) return direct;

  if (parentSlug) {
    return REGION_DATA[parentSlug];
  }

  return undefined;
}
