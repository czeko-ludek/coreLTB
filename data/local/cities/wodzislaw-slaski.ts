import type { CityData } from '../types';

export const wodzislawData: CityData = {
  slug: 'wodzislaw-slaski',
  cityName: 'Wodzisław Śląski',
  cityNameLocative: 'Wodzisławiu Śląskim',

  meta: {
    title: 'Budowa Domów Wodzisław Śląski – Generalny Wykonawca | CoreLTB Builders',
    description: 'Profesjonalna budowa domów w Wodzisławiu Śląskim. Specjalizujemy się w terenach górniczych. Płyty fundamentowe, wzmocnione konstrukcje. ✓ 15 lat doświadczenia ✓ Gwarancja',
  },

  pageHeader: {
    title: 'Budowa Domów Wodzisław Śląski',
    backgroundImage: '/images/local/wodzislaw-slaski/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW WODZISŁAW ŚLĄSKI',
    headline: ['Planujesz budowę w Wodzisławiu?', 'Mamy tu bazę i własne ekipy'],
    subtitle: 'Wodzisław Śląski to nasz dom — tu mamy bazę sprzętową i własne brygady budowlane. Budujemy domy od stanu zero do klucza, znamy każdą dzielnicę i lokalne warunki gruntowe. 15 lat doświadczenia w powiecie wodzisławskim.',
    benefits: [
      '15 lat doświadczenia w powiecie wodzisławskim',
      'Własne ekipy i sprzęt — bez pośredników',
      'Jeden partner = pełna odpowiedzialność za efekt końcowy',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Dobierzemy optymalną technologię budowy',
      'Przedstawimy harmonogram i kosztorys',
      'Odpowiemy na wszystkie Twoje pytania',
    ],
    ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
    ctaBoxButtons: [
      { text: 'Zadzwoń do Nas', variant: 'secondary' },
      { text: 'Napisz do Nas', href: '/kontakt', variant: 'secondary' },
    ],
  },

  expertise: {
    header: {
      label: 'SPECYFIKA WODZISŁAWIA',
      title: 'Budowa na szkodach górniczych — nasza specjalizacja',
      description: 'Wodzisław Śląski (KWK ROW) wymaga specjalistycznej wiedzy geotechnicznej. Odkształcenia terenu, niecki obniżeniowe i wstrząsy to codzienność, z którą nasze budynki muszą sobie radzić przez dekady.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Fundamenty pod teren górniczy',
        description: 'W Wodzisławiu standardem staje się **płyta fundamentowa** — sztywna taca, która "pływa" razem z gruntem, chroniąc konstrukcję przed pękaniem. Koszt wyższy o **15-20%** od ław, ale to polisa ubezpieczeniowa dla Twojego domu.',
        details: [
          'W zależności od tego, czy Twoja działka znajduje się w I, II, III czy IV kategorii szkód górniczych, dobieramy odpowiedni sposób posadowienia budynku. Na terenach stabilnych wystarczą tradycyjne ławy fundamentowe, jednak w Wodzisławiu coraz częściej standardem staje się **płyta fundamentowa**.',
          'Płyta fundamentowa działa jak sztywna taca. Gdy grunt pod budynkiem pracuje (osiada nierównomiernie lub przesuwa się poziomo), płyta "pływa" razem z nim, zachowując sztywność całej konstrukcji. Dzięki temu unikamy pękania ścian, co jest typowym objawem przy zastosowaniu zwykłych ław na terenie górniczym. Nasz zespół inżynierów przelicza ilość stali zbrojeniowej (często stosujemy stal o podwyższonej ciągliwości A-IIIN) tak, aby fundament przeniósł naprężenia rozciągające wynikające z krzywizny terenu.',
        ],
      },
      {
        icon: 'shield',
        title: 'Wzmocnienia konstrukcji',
        description: 'Budynek na szkodach górniczych musi być spięty klamrą: **wieńce żelbetowe** na wielu poziomach, trzpienie pionowe w narożnikach i dylatacje dla złożonych brył. To szkielet, który trzyma ściany w ryzach.',
        details: [
          '**Wieńce żelbetowe** — nie tylko na poziomie stropu, ale często również wieńce obwodowe na poziomie fundamentów oraz dodatkowe wieńce podmurłatowe. Tworzą one szkielet, który trzyma ściany w ryzach.',
          '**Trzpienie żelbetowe** — są to pionowe słupy żelbetowe ukryte wewnątrz ścian murowanych (np. w narożnikach budynku i przy dużych otworach okiennych). Łączą one fundament z wieńcem dachowym, usztywniając całą bryłę.',
          '**Dylatacje** — w przypadku domów o skomplikowanej bryle, dzielimy budynek na niezależne segmenty, aby każdy z nich mógł pracować osobno bez przenoszenia naprężeń niszczących.',
        ],
      },
      {
        icon: 'settings',
        title: 'Technologia murowana',
        description: 'Budujemy wyłącznie w technologii murowanej: ceramika poryzowana, beton komórkowy, silikaty. **Nie budujemy domów szkieletowych.** Domy murowane są bezkonkurencyjne pod względem [trwałości i TCO](/oferta/kompleksowa-budowa-domow).',
        details: [
          '**Ceramika poryzowana (np. Porotherm)** — pustaki ceramiczne wypalane z gliny charakteryzują się świetną paroprzepuszczalnością ("oddychanie ścian") i dobrą izolacyjnością termiczną. Są odporne na ściskanie, co jest kluczowe przy projektowaniu budynków na szkodach górniczych.',
          '**Beton komórkowy (np. Ytong, Solbet)** — materiał lekki, ciepły i łatwy w obróbce. Jego struktura porów powietrznych sprawia, że jest doskonałym izolatorem, a precyzja wymiarowa pozwala na murowanie na cienką spoinę, eliminując mostki termiczne.',
          '**Bloki silikatowe** — rozwiązanie dla inwestorów ceniących ciszę. Silikaty mają bardzo dużą gęstość, dzięki czemu zapewniają doskonałą izolacyjność akustyczną. Duża masa termiczna sprawia, że dom z silikatów wolno się nagrzewa latem i wolno wychładza zimą, stabilizując mikroklimat wnętrza.',
        ],
      },
      {
        icon: 'shieldCheck',
        title: 'Zarządzanie ryzykiem',
        description: 'Diagnozujemy ryzyka geotechniczne **przed podpisaniem umowy** — żadnych szoków cenowych. Posiadamy pełne ubezpieczenie OC + polisę CAR, chroniącą Twoją inwestycję od zdarzeń losowych.',
        details: [
          'Często spotykamy się z sytuacją, gdzie inwestor ma budżet wyliczony "na styk" pod projekt typowy. Jednak w Wodzisławiu, zanim wylejemy pierwszy kubik betonu, musimy zmierzyć się z gruntem. Badania geotechniczne to absolutna podstawa — często okazuje się, że pod warstwą humusu zalega nienośna glina lub grunty nasypowe (typowe dla Śląska). Wymaga to **wymiany gruntu**, stabilizacji cementem lub wykonania drenażu opaskowego.',
          'Jako generalny wykonawca posiadamy pełne ubezpieczenie OC (Odpowiedzialności Cywilnej) oraz polisę CAR (Contractors\' All Risks) dla prowadzonych inwestycji. Oznacza to, że Twoja inwestycja jest chroniona finansowo od zdarzeń losowych. Działamy w pełni legalnie — każda ekipa jest zgłoszona, a budowa prowadzona zgodnie z przepisami BHP.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-plyta.webp',
      alt: 'Budowa domu na szkodach górniczych w Wodzisławiu Śląskim',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'shield',
        title: 'Znamy lokalny grunt',
        description: 'Odkształcenia terenu, niecki obniżeniowe, grunty nasypowe — to nie teoria, to nasza codzienność. Wiemy, jak zbroić fundament pod każdą kategorię szkód w Wodzisławiu.',
      },
      {
        icon: 'trendingUp',
        title: 'Przejrzystość finansowa',
        description: 'Kosztorys z podziałem na etapy, stała cena w umowie i harmonogram płatności dopasowany do transz kredytowych. Żadnych ukrytych kosztów.',
      },
      {
        icon: 'settings',
        title: 'Lokalna baza logistyczna',
        description: 'Nasze zaplecze sprzętowe jest w regionie. Nie doliczamy "kilometrówek" za dojazd z odległych miast. Krótszy łańcuch dostaw = niższe koszty i szybsza reakcja.',
      },
      {
        icon: 'shieldCheck',
        title: 'Gwarancja i rękojmia',
        description: 'Udzielamy pełnej gwarancji na konstrukcję i wykonane prace. Działamy legalnie, z polisą OC i CAR. Wszelkie usterki usuwamy na nasz koszt.',
      },
    ],
  },

  additionalSections: [
    {
      id: 'etapy-realizacji',
      header: {
        label: 'ETAPY REALIZACJI',
        title: 'Co budujemy w Wodzisławiu Śląskim? Nasz zakres usług',
        description: 'Jako generalny wykonawca skupiamy się na solidnych technologiach murowanych. Nie eksperymentujemy z lekkimi szkieletami w rejonach zagrożonych wstrząsami. Nasza oferta jest modułowa – możesz zlecić nam stan surowy lub pełen stan deweloperski.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'building',
          title: 'Stan zerowy i roboty ziemne',
          description: 'Wykonujemy niwelację terenu, wymianę gruntu (często konieczną na gliniastych terenach Wodzisławia) oraz wylewamy fundamenty i płyty fundamentowe zbrojone zgodnie z kategorią szkód górniczych.',
        },
        {
          icon: 'hardHat',
          title: 'Stan surowy otwarty (SSO)',
          description: 'To trzon naszej działalności. Obejmuje precyzyjne murowanie ścian nośnych z ceramiki lub silikatów oraz wykonanie stropów żelbetowych monolitycznych. Budowa w stanie surowym to etap, gdzie decyduje się statyka budynku.',
        },
        {
          icon: 'settings',
          title: 'Konstrukcja i pokrycie dachu',
          description: 'Montujemy więźbę dachową impregnowaną ciśnieniowo oraz układamy pokrycia ciężkie (dachówka ceramiczna/betonowa) lub lekkie (blachodachówka), zawsze z pełnym deskowaniem dla zwiększenia sztywności bryły. Dachy i więźby dachowe wykonujemy z uwzględnieniem lokalnych stref wiatrowych.',
        },
        {
          icon: 'paintBrush',
          title: 'Stolarka otworowa (Stan Surowy Zamknięty)',
          description: 'Instalujemy okna w systemie "ciepłego montażu" (z taśmami paroszczelnymi i paroprzepuszczalnymi), co jest kluczowe dla spełnienia norm WT 2021 i przyszłych wymogów EPBD. Montaż okien i drzwi zamyka bryłę budynku.',
        },
        {
          icon: 'settings',
          title: 'Instalacje sanitarne i elektryczne',
          description: 'Rozprowadzamy systemy wod-kan, ogrzewanie podłogowe oraz elektrykę, w tym okablowanie pod systemy Smart Home. Instalacje wewnętrzne są u nas projektowane pod kątem energooszczędności.',
        },
        {
          icon: 'keyRound',
          title: 'Stan deweloperski',
          description: 'Finalny etap obejmujący tynki maszynowe (gipsowe lub cementowo-wapienne), wylewki anhydrytowe lub betonowe oraz ocieplenie poddasza pianą PUR lub wełną. Wykończenie wnętrz przygotowuje dom do prac malarskich i montażu podłóg.',
        },
      ],
    },
  ],

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Dzielnice Wodzisławia Śląskiego – gdzie realizujemy inwestycje?',
      description: 'Jesteśmy stąd, dlatego logistyka nie stanowi dla nas problemu. Nie doliczamy gigantycznych kwot za dojazd, bo nasze bazy są w regionie. Znamy specyfikę poszczególnych dzielnic Wodzisławia Śląskiego, co pozwala nam precyzyjniej szacować koszty robót ziemnych i fundamentowych.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Wilchwy' }, { label: 'Jedłownik' }, { label: 'Kokoszyce' },
      { label: 'Radlin II' }, { label: 'Zawada' }, { label: 'Nowe Miasto' },
      { label: 'Trzy Wzgórza' }, { label: 'Gorzyce' }, { label: 'Mszana' },
      { label: 'Godów' },
    ],
    hubDescription: 'Obsługujemy inwestycje na terenie całego miasta oraz w gminach ościennych. Znamy lokalne wymogi MPZP (Miejscowych Planów Zagospodarowania Przestrzennego).',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Etapy współpracy – od projektu do kluczy',
      description: 'Budowa domu to proces złożony, ale dla naszych klientów staramy się go maksymalnie uprościć. Przejrzystość na każdym etapie to nasza zasada.',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        question: 'Jak wygląda proces formalności i adaptacji projektu?',
        content: [
          { type: 'paragraph', value: 'Zanim wbijemy pierwszą łopatę, pomagamy w gąszczu biurokracji. Współpracujemy z lokalnymi architektami przy **adaptacji projektu** do warunków działki. W Wodzisławiu Śląskim kluczowe jest uzyskanie uzgodnień dotyczących szkód górniczych (często wymagana opinia geologiczno-górnicza).' },
          { type: 'paragraph', value: 'Pomagamy w kompletowaniu dokumentacji do Starostwa Powiatowego w celu uzyskania pozwolenia na budowę. Weryfikujemy projekt pod kątem ewentualnych mostków termicznych i proponujemy optymalizacje, które obniżą koszty budowy bez utraty jakości.' },
        ],
      },
      {
        question: 'Jak przebiega realizacja prac na budowie?',
        content: [
          { type: 'paragraph', value: 'Po uzyskaniu PnB (Pozwolenia na Budowę), przejmujemy plac budowy.' },
          { type: 'list', items: [
            '**Ogrodzenie i zaplecze:** Zabezpieczamy teren, ustawiamy toaletę, organizujemy przyłącze prądu budowlanego (prowizorkę).',
            '**Kierownik Budowy:** Nasz [kierownik budowy w Wodzisławiu](/kierownik-budowy-wodzislaw-slaski) (od 5 000 zł) prowadzi Dziennik Budowy (coraz częściej w formie elektronicznej EDB), nadzoruje kluczowe etapy (zbrojenie, betonowanie) i odpowiada za zgodność prac z projektem.',
            '**Odbiory częściowe:** Każdy etap (fundamenty, ściany, dach) kończy się odbiorem wewnętrznym. Nie zakrywamy instalacji tynkiem, dopóki nie przejdą prób ciśnieniowych i nie wykonamy dokumentacji fotograficznej instalacji podtynkowych.',
            '**Czystość:** Utrzymujemy porządek na budowie. Segregujemy odpady budowlane i zapewniamy kontenery na gruz.',
          ]},
        ],
      },
      {
        question: 'Co z dyrektywą EPBD i przyszłością energetyczną domu?',
        content: [
          { type: 'paragraph', value: 'Budując dom dzisiaj, musisz myśleć o jego wartości za 10-15 lat. Unia Europejska wprowadza dyrektywę EPBD, która dąży do budownictwa bezemisyjnego. Domy, które nie będą spełniać rygorystycznych norm energetycznych, stracą na wartości rynkowej i będą trudne do sprzedania.' },
          { type: 'paragraph', value: 'Dlatego w CoreLTB Builders nie budujemy "na minimum normowe". Promujemy rozwiązania, które wyprzedzają obecne Warunki Techniczne (WT 2021). Skupiamy się na **szczelności powietrznej** budynku. Nieszczelny dom to straty ciepła, których nie zatrzyma nawet najgrubszy styropian. Zalecamy wykonanie **Blower Door Test** (testu szczelności) przed tynkami, aby wykryć i uszczelnić wszelkie przedmuchy.' },
          { type: 'paragraph', value: 'Montujemy rekuperację (często z odzyskiem wilgoci - entalpią), co staje się standardem w nowoczesnym budownictwie. Twój dom ma być aktywem, a nie obciążeniem finansowym.' },
        ],
      },
    ],
  },

  nearbyCities: [
    { name: 'Rybnik', slug: 'rybnik', context: '20 km na północ' },
    { name: 'Gliwice', slug: 'gliwice', context: '50 km na północny-wschód' },
  ],

  areaServed: [
    'Wodzisław Śląski', 'Wilchwy', 'Jedłownik', 'Kokoszyce', 'Radlin II',
    'Zawada', 'Nowe Miasto', 'Trzy Wzgórza', 'Gorzyce', 'Mszana', 'Godów',
  ],
  geoCoordinates: { latitude: '50.0022', longitude: '18.4610' },
};
