/**
 * REALIZACJA: Dom jednorodzinny w Mikołowie (2025)
 * Status: W trakcie budowy
 *
 * TODO: Zamien placeholdery na prawdziwe dane od szefa
 * TODO: Zamien placeholder zdjecia na prawdziwe z budowy
 */

import type { RealizationData } from '../types';

export const mikolow2025: RealizationData = {
  slug: 'dom-jednorodzinny-mikolow-2025',

  meta: {
    title: 'Budowa domu w Mikołowie 2025 — Dziennik budowy | CoreLTB',
    description:
      'Sledz budowe domu jednorodzinnego 156 m2 w Mikołowie krok po kroku. Dziennik budowy z eksperckimi komentarzami, zdjeciami z kazdego etapu i praktycznymi poradami.',
  },

  project: {
    title: 'Dom jednorodzinny w Mikołowie',
    location: 'Mikolow, dzielnica Mokre',
    city: 'mikolow',
    surfaceArea: 156,
    floors: 'Parterowy z poddaszem uzytkowym',
    technology: 'Murowany — bloczki silikatowe Silka',
    roofType: 'Dwuspadowy, dachowka ceramiczna',
    projectSource: 'GaleriaDomow — Dom przy Bukowej 15',
    projectSlug: undefined, // TODO: dodaj slug jesli mamy ten projekt w bazie
    startDate: 'Luty 2025',
    endDate: undefined, // w trakcie
    status: 'in-progress',
    heroImage: '/images/realizacje/mikolow-2025/hero.webp',
    progress: 25,
  },

  stages: [
    // ── ETAP 1: Roboty ziemne ────────────────────────────────
    {
      id: 'roboty-ziemne',
      order: 1,
      title: 'Roboty ziemne i wykop',
      icon: 'tractor',
      dateLabel: 'Marzec 2025',
      duration: '1 tydzien',
      narrative: [
        'Budowa rozpoczela sie od wytyczenia geodezyjnego budynku na dzialce. Geodeta wyznaczyl osi budynku i poziom zero wzgledem reperu.',
        'Grunty w tym rejonie Mikolowa (dzielnica Mokre) to gliny pylaste kategorii III — nosnosc wystarczajaca dla law fundamentowych, ale wymagajaca starannego odwodnienia wykopu. Wykop wykonal team z koparka gasienicowa CAT 320.',
        'Przed rozpoczeciem robot zlecilismy badanie geotechniczne, ktore potwierdzilo brak szkod gorniczych w tej czesci Mikolowa i okreslilo poziom wod gruntowych na 2.1 m p.p.t.',
      ],
      images: [
        {
          src: '/images/wykop-pod-budowe.webp',
          alt: 'Wykop pod fundamenty domu jednorodzinnego w Mikołowie — widok na przygotowana dzialke',
          caption: 'Wykop pod lawy fundamentowe, glebokosc 1.2 m',
        },
        {
          src: '/images/wykop-pod-budowe.webp',
          alt: 'Koparka gasienicowa podczas robot ziemnych na budowie w Mikołowie',
          caption: 'Roboty ziemne — usuwanie warstwy humusu',
        },
        {
          src: '/images/wykop-pod-budowe.webp',
          alt: 'Geodeta wyznaczajacy osie budynku na dzialce w Mikołowie',
          caption: 'Wytyczenie geodezyjne osi budynku',
        },
      ],
      expertInsight: {
        title: 'Dlaczego badanie geotechniczne jest obowiazkiem inwestora?',
        content: [
          'Prawo budowlane (art. 34 ust. 3 pkt 4) wymaga opinii geotechnicznej jako zalacznika do projektu budowlanego. Bez niej nie otrzymasz pozwolenia na budowe.',
          'Na Slasku szczegolnie istotne sa kategorie szkod gorniczych — w strefach III-V konieczne jest wzmocnione zbrojenie fundamentow i specjalne dylatacje. W przypadku Mikolowa (dzielnica Mokre) teren jest poza strefa wplywow gorniczych, co znacznie upraszcza projekt.',
        ],
        linkTo: '/baza-wiedzy/plyta-fundamentowa-tereny-gornicze',
        linkLabel: 'Wiecej o fundamentach na terenach gorniczych',
      },
      technicalFacts: [
        { label: 'Glebokosc wykopu', value: '1.2 m', icon: 'layers' },
        { label: 'Typ gruntu', value: 'Glina pylasta kat. III', icon: 'mountain' },
        { label: 'Wody gruntowe', value: '2.1 m p.p.t.', icon: 'waves' },
        { label: 'Czas trwania', value: '5 dni roboczych', icon: 'clock' },
      ],
    },

    // ── ETAP 2: Fundamenty ───────────────────────────────────
    {
      id: 'fundamenty',
      order: 2,
      title: 'Fundamenty — lawy zelbetowe',
      icon: 'layers',
      dateLabel: 'Marzec–Kwiecien 2025',
      duration: '3 tygodnie',
      narrative: [
        'Po analizie gruntu i konsultacji z konstruktorem zdecydowalismy sie na klasyczne lawy fundamentowe zamiast plyty — grunty w tej czesci Mikolowa sa na tyle nosne, ze plyta byalby przeprojektowaniem.',
        'Lawy o przekroju 60x30 cm, zbrojone stalą B500SP (4 prety fi 12 mm, strzemiona fi 6 co 25 cm). Na lawach wylano sciany fundamentowe z bloczkow betonowych 24 cm, zaizolowane dwukrotnie emulsja bitumiczna + folia kubbelkowa.',
        'Caly proces trwal 3 tygodnie, wliczajac czas na sezonowanie betonu (min. 7 dni przed obciazeniem).',
      ],
      images: [
        {
          src: '/images/fundamenty-zbrojenie.webp',
          alt: 'Zbrojenie law fundamentowych — stal B500SP, prety fi 12 mm',
          caption: 'Zbrojenie law fundamentowych przed zalaniem betonem',
        },
        {
          src: '/images/plyta-fundamentowa-zalana.webp',
          alt: 'Lawy fundamentowe po zalaniu betonem C25/30',
          caption: 'Lawy po zalaniu — beton C25/30',
        },
        {
          src: '/images/hydroizolacja-fundamenty.webp',
          alt: 'Hydroizolacja scian fundamentowych — emulsja bitumiczna i folia kubbelkowa',
          caption: 'Hydroizolacja scian fundamentowych',
        },
      ],
      challenge: {
        title: 'Wyzwanie: Opady deszczu podczas betonowania',
        description:
          'W drugim tygodniu marca napotkalismy 4 dni ciaglych opadow deszczu, ktore zagrozily harmonogramowi betonowania law.',
        solution:
          'Zabezpieczylismy wykop folia PE i zamontowalismy pompe odwadniajaca. Betonowanie przeprowadzilismy w oknie pogodowym w sobote, przy temperaturze 8°C — w dopuszczalnym zakresie dla betonu C25/30.',
      },
      expertInsight: {
        title: 'Lawy czy plyta fundamentowa — kiedy co wybrac?',
        content: [
          'Lawy fundamentowe to klasyczne rozwiazanie, tansze o 15-25% od plyty. Sprawdzaja sie na gruntach nosnych (piasek, glina zwarta) z niskim poziomem wod gruntowych.',
          'Plyta fundamentowa jest wymagana na gruntach slabych, terenach gorniczych (kat. III+) i przy wysokim poziomie wod gruntowych. W przypadku Mikolowa (Mokre) lawy byly optymalnym wyborem.',
        ],
        linkTo: '/baza-wiedzy/plyta-fundamentowa-tereny-gornicze',
        linkLabel: 'Porownaj: plyta fundamentowa vs lawy',
      },
      technicalFacts: [
        { label: 'Przekroj law', value: '60 x 30 cm', icon: 'ruler' },
        { label: 'Beton', value: 'C25/30, W6', icon: 'box' },
        { label: 'Zbrojenie', value: '4 x fi 12 mm B500SP', icon: 'ruler' },
        { label: 'Hydroizolacja', value: '2x emulsja + folia', icon: 'umbrella' },
      ],
    },

    // ── ETAP 3: Sciany parteru ───────────────────────────────
    {
      id: 'sciany-parteru',
      order: 3,
      title: 'Sciany nosne parteru',
      icon: 'brickWall',
      dateLabel: 'Kwiecien–Maj 2025',
      duration: '4 tygodnie',
      narrative: [
        'Murowanie scian nosnych parteru z bloczkow silikatowych Silka 24 cm na zaprawie cienkowarstwowej. Silikat to nasz standard — doskonala akumulacja cieplna, izolacja akustyczna Rw 52 dB i wysoka nosnosc na sciskanie (15+ MPa).',
        'Rownolegle ze scianami nośnymi murowano sciany dzialowe z silikatu 12 cm. Nadproza okienne i drzwiowe wykonano z prefabrykowanych belek L19 i systemowych nadprozy Silka.',
        'Na tym etapie zamontowalismy rowniez korytek instalacyjnych w scianach — wczesniejsze planowanie tras instalacji pozwala uniknac kosztownego kucia po murze.',
      ],
      images: [
        {
          src: '/images/realizacje/mikolow-2025/sciany-01.webp',
          alt: 'Murowanie scian z bloczkow silikatowych Silka w domu w Mikolowie',
          caption: 'Sciany nosne parteru — bloczki silikatowe Silka 24 cm',
        },
        {
          src: '/images/realizacje/mikolow-2025/sciany-02.webp',
          alt: 'Nadproza okienne z prefabrykowanych belek L19',
          caption: 'Nadproza okienne — belki prefabrykowane L19',
        },
      ],
      expertInsight: {
        title: 'Silikat, ceramika czy beton komorkowy?',
        content: [
          'Bloczki silikatowe (np. Silka) to nasz standard — oferuja najlepsza akumulacje cieplna, doskonala izolacje akustyczna (Rw 50+ dB) i wysoka nosnosc. Sa ciezsze niz beton komorkowy, co wymaga solidniejszych fundamentow, ale daja trwalsze sciany.',
          'Ceramika poryzowana (np. Porotherm) to kompromis — lzejsza od silikatu, lepsza termicznie, ale mniej wytrzymala mechanicznie. Beton komorkowy (Ytong) jest najlzejszy i najszybszy, ale wymaga staranniejszego zbrojenia.',
        ],
      },
      technicalFacts: [
        { label: 'Material', value: 'Silka 24 cm', icon: 'brickWall' },
        { label: 'Nosnosc', value: '15+ MPa', icon: 'shieldCheck' },
        { label: 'Akustyka', value: 'Rw 52 dB', icon: 'shield' },
        { label: 'Zaprawa', value: 'Cienkowarstwowa', icon: 'layers' },
      ],
    },

    // ── ETAP 4: Strop i wieniec ──────────────────────────────
    {
      id: 'strop-wieniec',
      order: 4,
      title: 'Strop i wieniec zelbetowy',
      icon: 'columns3',
      dateLabel: 'Maj 2025',
      duration: '2 tygodnie',
      narrative: [
        'Na scianach parteru wykonalismy strop gestozemowy typu Teriva o rozpietosci 5.4 m — optymalny dla tego rzutu. Belki stropowe ulozone co 60 cm, wypelnienie pustakow ceramicznych, naddatek zbrojeniowy w strefach przypodporowych.',
        'Wieniec zelbetowy (25x24 cm, 4 prety fi 12 mm) spina sciany na obwodzie i przenosi obciazenia z wiezby dachowej rowno na sciany nosne. Betonowanie stropu i wienca odbywalo sie jednoczesnie — jeden dzien zalewki.',
      ],
      images: [
        {
          src: '/images/realizacje/mikolow-2025/strop-01.webp',
          alt: 'Strop gestozemowy Teriva na budowie domu parterowego w Mikolowie',
          caption: 'Strop gestozemowy Teriva — rozpietosc 5.4 m',
        },
        {
          src: '/images/realizacje/mikolow-2025/strop-02.webp',
          alt: 'Betonowanie stropu i wienca zelbetowego',
          caption: 'Betonowanie stropu — pompa do betonu',
        },
      ],
      technicalFacts: [
        { label: 'Typ stropu', value: 'Gestozemowy Teriva', icon: 'columns3' },
        { label: 'Rozpietosc', value: '5.4 m', icon: 'ruler' },
        { label: 'Wieniec', value: '25x24 cm, 4xfi12', icon: 'layers' },
        { label: 'Beton', value: 'C25/30', icon: 'box' },
      ],
    },

    // ── ETAP 5: Wiezba dachowa ───────────────────────────────
    {
      id: 'wiezba-dachowa',
      order: 5,
      title: 'Wiezba dachowa',
      icon: 'triangle',
      dateLabel: 'Czerwiec 2025',
      duration: '2 tygodnie',
      narrative: [
        'Wiezba krokwiowo-platkowa z drewna sosnowego klasy C24, impregnowanego cisnieniowo srodkiem grzybobojczym i owadobojczym. Kat nachylenia dachu 38 stopni — optymalny dla dachowki ceramicznej i uzytkowego poddasza.',
        'Konstrukcja wsparta na murlatach 14x14 cm, kotwiczonych do wienca stalowymi kotwami M12 co 120 cm. Platwie posrednie na slupkach — pozwalaja na otwarta przestrzen poddasza bez kolizji ze sciankami dzialowymi.',
      ],
      images: [
        {
          src: '/images/realizacje/mikolow-2025/wiezba-01.webp',
          alt: 'Montaz wiezby dachowej krokwiowo-platkowej na domu w Mikolowie',
          caption: 'Wiezba krokwiowo-platkowa — drewno C24',
        },
      ],
      expertInsight: {
        title: 'Wiezba tradycyjna czy kratownicowa?',
        content: [
          'Wiezba tradycyjna (krokwiowo-platkowa) pozwala na wykorzystanie poddasza jako uzytkowego — pelna wysokosc pomieszczen, mozliwosc wstawienia okien dachowych.',
          'Kratownice prefabrykowane montuje sie szybciej (1-2 dni vs tydzien), sa tansze, ale poddasze pozostaje nieuzyteczne. W tym projekcie poddasze jest uzytkowe, wiec wiezba tradycyjna byla jedynym sensownym rozwiazaniem.',
        ],
      },
      technicalFacts: [
        { label: 'Typ', value: 'Krokwiowo-platkowa', icon: 'triangle' },
        { label: 'Drewno', value: 'Sosna C24, impregnowana', icon: 'tree' },
        { label: 'Kat nachylenia', value: '38 stopni', icon: 'triangle' },
        { label: 'Murlatych', value: '14x14 cm, kotwy M12', icon: 'ruler' },
      ],
    },

    // ── ETAP 6: Pokrycie dachu ───────────────────────────────
    {
      id: 'pokrycie-dachu',
      order: 6,
      title: 'Pokrycie dachu i orynnowanie',
      icon: 'home',
      dateLabel: 'Czerwiec–Lipiec 2025',
      duration: '2 tygodnie',
      narrative: [
        'Dach pokryty dachowka ceramiczna Roben Piemont w kolorze antracytowym. Pod dachowka membrana wstepnego krycia (paroprzepuszczalna, Sd < 0.02 m), kontrlatty 4x6 cm tworzace szczeline wentylacyjna i latty 4x5 cm co 33 cm.',
        'Orynnowanie z blachy tytan-cynk — trwalsze niz plastikowe (50+ lat vs 15-20), elegancko starzejace sie w kolorze naturalnej patyny. System Rheinzink o srednicy rynien 150 mm i rur spustowych 100 mm.',
      ],
      images: [
        {
          src: '/images/realizacje/mikolow-2025/dach-01.webp',
          alt: 'Pokrycie dachu dachowka ceramiczna Roben Piemont antracyt',
          caption: 'Dachowka ceramiczna Roben Piemont — antracyt',
        },
      ],
      technicalFacts: [
        { label: 'Pokrycie', value: 'Dachowka Roben Piemont', icon: 'home' },
        { label: 'Orynnowanie', value: 'Tytan-cynk Rheinzink', icon: 'waves' },
        { label: 'Membrana', value: 'Paroprzepuszczalna Sd<0.02', icon: 'shield' },
      ],
    },

    // ── ETAP 7: Stolarka okienna (SSZ) ───────────────────────
    {
      id: 'stolarka-okienna',
      order: 7,
      title: 'Stolarka okienna i drzwi — Stan Surowy Zamkniety',
      icon: 'doorClosed',
      dateLabel: 'Lipiec 2025',
      duration: '1 tydzien',
      narrative: [
        'Montaz okien trzyszybowych PVC w kolorze antracytowym od zewnatrz (okleina RAL 7016) i bialym od wewnatrz. Wspolczynnik Uw = 0.78 W/m2K — znacznie ponizej wymaganego 0.9.',
        'Montaz trójwarstwowy zgodny z wytycznymi RAL: piana poliuretanowa w warstwie srodkowej, tasma paroprzepuszczalna po stronie wewnetrznej, tasma paroszczelna na zewnatrz. To kluczowe dla szczelnosci i eliminacji mostkow termicznych.',
        'Po zamontowaniu stolarki budynek osiaga stan surowy zamkniety (SSZ) — chroniony przed warunkami atmosferycznymi, gotowy na prace instalacyjne.',
      ],
      images: [
        {
          src: '/images/realizacje/mikolow-2025/okna-01.webp',
          alt: 'Montaz okien trzyszybowych PVC w domu w Mikolowie — montaz trojwarstwowy RAL',
          caption: 'Okna trzyszybowe — montaz trojwarstwowy RAL',
        },
      ],
      expertInsight: {
        title: 'Na co zwrocic uwage przy wyborze okien?',
        content: [
          'Kluczowy parametr to wspolczynnik przenikania ciepla Uw — od 2021 r. wymagany jest max. 0.9 W/m2K. Dobre okna trzyszybowe osiagaja 0.7-0.8 W/m2K.',
          'Równie wazny jest montaz — nawet najlepsze okno zle zamontowane bedzie przeciekac i przemarzac. Stosujemy montaz trojwarstwowy (piana + tasma paroprzepuszczalna wewnatrz + paroszczelna na zewnatrz) zgodny z wytycznymi RAL.',
        ],
      },
      technicalFacts: [
        { label: 'Okna', value: 'PVC, trzyszybowe, Uw 0.78', icon: 'doorClosed' },
        { label: 'Montaz', value: 'Trojwarstwowy RAL', icon: 'shieldCheck' },
        { label: 'Kolor', value: 'Antracyt RAL 7016 / bialy', icon: 'paintBrush' },
      ],
    },

    // ── ETAP 8: Instalacje ───────────────────────────────────
    {
      id: 'instalacje',
      order: 8,
      title: 'Instalacje wewnetrzne',
      icon: 'plug',
      dateLabel: 'Sierpien–Wrzesien 2025',
      duration: '5 tygodni',
      narrative: [
        'Etap instalacji to najintensywniejszy okres koordynacyjny na budowie — rownolegle pracuja ekipy hydraulikow, elektryków i wentylatorow. Kolejnosc: kanalizacja (grawitacyjna, brak elastycznosci tras) → wodociag → CO → elektryka → wentylacja.',
        'Ogrzewanie: pompa ciepla powietrze-woda z zasobnikiem CWU 200l. Ogrzewanie podlogowe na calym parterze, grzejniki lazienkowe na poddaszu. Rekuperator z odzyskiem ciepla 90%+ zapewnia wentylacje mechaniczna calego budynku.',
      ],
      images: [
        {
          src: '/images/realizacje/mikolow-2025/instalacje-01.webp',
          alt: 'Instalacja ogrzewania podlogowego — rury PEX na podlodze parteru',
          caption: 'Ogrzewanie podlogowe — rury PEX ulozone na macie systemowej',
        },
        {
          src: '/images/realizacje/mikolow-2025/instalacje-02.webp',
          alt: 'Rozdzielnia elektryczna i okablowanie w stanie surowym',
          caption: 'Instalacja elektryczna — rozdzielnia i okablowanie',
        },
      ],
      technicalFacts: [
        { label: 'Ogrzewanie', value: 'Pompa ciepla + podlogowka', icon: 'flame' },
        { label: 'Wentylacja', value: 'Rekuperator, odzysk 90%+', icon: 'wind' },
        { label: 'CWU', value: 'Zasobnik 200l', icon: 'waves' },
        { label: 'Elektryka', value: '42 obwody, rozdzielnia 3-rzedowa', icon: 'zap' },
      ],
    },

    // ── ETAP 9: Tynki i elewacja ─────────────────────────────
    {
      id: 'tynki-elewacja',
      order: 9,
      title: 'Ocieplenie, tynki i elewacja',
      icon: 'paintBrush',
      dateLabel: 'Pazdziernik–Listopad 2025',
      duration: '5 tygodni',
      narrative: [
        'Prace trwaja. Ocieplenie scian styropianem grafitowym 20 cm (lambda 0.031 W/mK) metoda ETICS (lekka-mokra). Tynk zewnetrzny silikonowy w kolorze bialym z akcentami drewnopodobnymi na elewacji frontowej.',
        'Wewnatrz tynki gipsowe maszynowe, gladzie na sciany pod malowanie. Wylewki anhydrytowe na ogrzewanie podlogowe — plaskie i szybkoschnace, pozwalaja na wczesniejsze ukladanie podlog.',
      ],
      images: [
        {
          src: '/images/realizacje/mikolow-2025/elewacja-01.webp',
          alt: 'Ocieplenie elewacji styropianem grafitowym 20 cm — metoda ETICS',
          caption: 'Ocieplenie elewacji — styropian grafitowy 20 cm',
        },
      ],
      technicalFacts: [
        { label: 'Ocieplenie', value: '20 cm styropian 031', icon: 'thermometerSnowflake' },
        { label: 'Tynk zewn.', value: 'Silikonowy, bialy', icon: 'paintBrush' },
        { label: 'Tynk wewn.', value: 'Gipsowy maszynowy + gladz', icon: 'paintBrush' },
        { label: 'Wylewki', value: 'Anhydrytowe 6.5 cm', icon: 'layers' },
      ],
    },
  ],

  midCTAs: [
    {
      afterStageOrder: 3,
      variant: 'calculator',
      headline: 'Planujesz budowe podobnego domu?',
      description:
        'Sprawdz orientacyjny koszt budowy domu parterowego 156 m2 w naszym kalkulatorze — wynik w 60 sekund.',
    },
    {
      afterStageOrder: 7,
      variant: 'consultation',
      headline: 'Masz pytania o proces budowy?',
      description:
        'Umow bezplatna konsultacje z naszym inzynierem. Odpowiemy na kazde pytanie dotyczace budowy.',
    },
  ],

  summary: {
    headline: 'Budowa w toku — sledz postepy',
    description: [
      'Realizacja domu w Mikolowie przebiega zgodnie z harmonogramem. Aktualnie trwaja prace elewacyjne i wykonczeniowe — planowane zakonczenie: grudzien 2025.',
      'Aktualizujemy ten dziennik budowy po kazdym zakonczonym etapie. Wróc za kilka tygodni, zeby zobaczyc postepy!',
    ],
    stats: [
      { label: 'Powierzchnia', value: '156 m2' },
      { label: 'Czas budowy (plan)', value: '10 miesiecy' },
      { label: 'Zaawansowanie', value: '~80%' },
      { label: 'Etap', value: '9 z 10' },
    ],
  },

  faq: {
    header: {
      label: 'FAQ',
      title: 'Najczesciej zadawane pytania',
      description: 'Odpowiedzi na pytania, ktore najczesciej slyszymy od inwestorow.',
    },
    items: [
      {
        question: 'Ile trwa budowa domu parterowego z poddaszem?',
        content: [
          {
            type: 'paragraph',
            value:
              'Typowy czas budowy domu parterowego z poddaszem uzytkowym (120-180 m2) to **8-12 miesiecy** od wykopu do stanu pod klucz. Stan surowy zamkniety osiagamy zwykle w 4-5 miesiecy.',
          },
          {
            type: 'paragraph',
            value:
              'Na czas wplywaja: warunki gruntowe, pogoda (zima moze wstrzymac prace mokre), dostepnosc materialow i decyzje inwestora dotyczace zmian w trakcie budowy.',
          },
        ],
      },
      {
        question: 'Czy moge odwiedzic budowe w trakcie realizacji?',
        content: [
          {
            type: 'paragraph',
            value:
              'Tak — zachecamy do regularnych wizyt na budowie! Nasz kierownik budowy jest dostepny na miejscu i chetnie pokaze postepy prac. Prosimy jedynie o wczesniejsze umowienie terminu i stosowanie sie do zasad BHP (kask, buty robocze).',
          },
        ],
      },
      {
        question: 'Co dokladnie zawiera stan surowy zamkniety (SSZ)?',
        content: [
          {
            type: 'paragraph',
            value:
              'Stan surowy zamkniety obejmuje: fundamenty, sciany nosne i dzialowe, stropy, wiezbe dachowa z pokryciem, stolkarke okienna i drzwi zewnetrzne. Budynek jest zabezpieczony przed warunkami atmosferycznymi.',
          },
          {
            type: 'list',
            items: [
              'Fundamenty (lawy lub plyta)',
              'Sciany nosne i dzialowe',
              'Stropy z wiencem zelbetowym',
              'Kompletna wiezba dachowa z pokryciem',
              'Okna i drzwi zewnetrzne zamontowane',
              'Orynnowanie',
            ],
          },
        ],
      },
      {
        question: 'Jaki jest koszt budowy domu 156 m2?',
        content: [
          {
            type: 'paragraph',
            value:
              'Koszt budowy zalezy od wielu czynnikow: standardu wykonczenia, technologii, lokalizacji i warunkow gruntowych. Orientacyjna wycene mozesz uzyskac w **60 sekund** w naszym [kalkulatorze budowy](/wycena).',
          },
        ],
      },
    ],
  },

  relatedRealizations: [],
};
