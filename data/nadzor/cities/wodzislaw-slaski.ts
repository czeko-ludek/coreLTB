import type { NadzorCityData } from '../types';

export const wodzislawNadzorData: NadzorCityData = {
  slug: 'kierownik-budowy-wodzislaw-slaski',
  cityName: 'Wodzisław Śląski',
  cityNameLocative: 'Wodzisławiu Śląskim',

  meta: {
    title:
      'Kierownik Budowy Wodzisław Śląski – Nadzór Inwestorski od 5 000 zł | CoreLTB',
    description:
      'Kierownik budowy i inspektor nadzoru inwestorskiego w Wodzisławiu Śląskim. Cennik od 5 000 zł brutto. Zabezpieczenia do IV kategorii szkód górniczych. ✓ Uprawnienia bez ograniczeń ✓ Znajomość PINB i Starostwa ✓ Dojazd wliczony',
  },

  pageHeader: {
    title: 'Kierownik Budowy Wodzisław Śląski',
    backgroundImage: '/images/uslugi/nadzor-i-doradztwo/hero.webp',
  },

  // ── HERO — unikalne pola ──
  emotionalHero: {
    subtitle:
      'Powiat wodzisławski to teren górniczy, gdzie brak nadzoru to proszenie się o kłopoty. Śląski grunt, obciążony historią wydobywczą KWK ROW, wymaga bezkompromisowego podejścia inżynieryjnego. Przejmujemy pełną odpowiedzialność techniczną za Twoją inwestycję — od kontroli zbrojenia po odbiór końcowy przez PINB.',
    benefits: [
      'Jawny cennik: kierownik budowy / inspektor nadzoru od 5 000 zł brutto',
      'Zabezpieczenia budynków do IV kategorii szkód górniczych',
      'Znajomość lokalnego PINB i Starostwa Powiatowego (ul. Bogumińska)',
    ],
  },

  // ── SERVICES header ──
  services: {
    header: {
      label: 'ZAKRES USŁUG W WODZISŁAWIU',
      title: 'Co nadzorujemy w powiecie wodzisławskim?',
      description:
        'Nadzorujemy budowy domów, rozbudowy i nadbudowy. Koordynujemy ekipy, prowadzimy dziennik budowy i pilnujemy harmonogramu — aby transze kredytu były uwalniane bez opóźnień.',
      align: 'center',
      theme: 'light',
    },
  },

  // ── SPECYFIKA — case studies Radlin/Kokoszyce ──
  localExpertise: {
    header: {
      label: 'SPECYFIKA POWIATU WODZISŁAWSKIEGO',
      title: 'Szkody górnicze — co kontrolujemy na budowie?',
      description:
        'Grunty w powiecie wodzisławskim charakteryzują się dużą zmiennością — od plastycznych glin po tereny bezpośrednio narażone na tąpnięcia KWK ROW. Inspektor spoza regionu nie rozpozna tych zagrożeń. My znamy ten teren od lat.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Kontrola zbrojenia i fundamentów',
        description:
          'Zabezpieczenie budynku do IV kategorii szkód wymaga rygorystycznych norm. Płyta fundamentowa musi działać jak sztywna taca — w razie wstrząsu cały budynek pracuje równomiernie.',
        details: [
          'Weryfikujemy zastosowanie betonu wodoszczelnego klasy minimum **C25/30 o stopniu W8**',
          'Sprawdzamy podwójne zbrojenie krzyżowe z certyfikowanej stali **B500SP**',
          'Kontrolujemy grubość płyty fundamentowej (**25–30 cm** wg obliczeń konstruktora)',
          'Nadzorujemy wykonanie **dylatacji systemowych** absorbujących ruchy tektoniczne',
        ],
      },
      {
        icon: 'mapPin',
        title: 'Doświadczenie w terenie: Radlin II i Kokoszyce',
        description:
          'Teoria to jedno, ale to praktyka weryfikuje kompetencje. W powiecie wodzisławskim mierzyliśmy się z najbardziej wymagającymi warunkami gruntowymi.',
        details: [
          '**Radlin II** — kurzawka na głębokości 1,2 m + nieprzepuszczalna glina. Wymusiliśmy wymianę gruntu na 80 cm, zagęszczenie kruszywa do Is=0,98 i drenaż opaskowy',
          '**Kokoszyce** — strefa silnych oddziaływań eksploatacyjnych. Nadzoraliśmy gęste rdzenie usztywniające w narożnikach i wieńce stropowe 25×30 cm. Budynek odporny na tąpnięcia do 3,5° Richtera',
        ],
      },
      {
        icon: 'fileText',
        title: 'Współpraca z PINB i Starostwem Powiatowym',
        description:
          'Znamy procedury lokalnych urzędów przy ul. Bogumińskiej. Kompletujemy dokumentację powykonawczą 14 dni przed zgłoszeniem, asystujemy przy kontrolach PINB i przejmujemy na siebie ewentualne wyjaśnienia — co skraca procedury odbioru.',
      },
    ],
    image: {
      src: '/images/uslugi/nadzor-i-doradztwo/filozofia-nadzoru.webp',
      alt: 'Inspektor nadzoru CoreLTB weryfikujący zbrojenie na budowie w Wodzisławiu Śląskim',
    },
  },

  // ── CENNIK — unikalne pola ──
  pricing: {
    note: 'Dojazd na terenie powiatu wodzisławskiego wliczony w cenę. Wycena indywidualna na podstawie projektu jest zawsze darmowa.',
  },

  // ── DZIELNICE ──
  districts: {
    header: {
      label: 'OBSZAR DZIAŁANIA',
      title: 'Wodzisław Śląski i okolice — gdzie dojeżdżamy?',
      description:
        'Nasza baza logistyczna jest w regionie. Gwarantujemy błyskawiczną reakcję na wezwanie — nawet jeśli betonowanie zaplanowano na wczesny poranek.',
      align: 'center',
      theme: 'light',
    },
    description:
      'Obsługujemy wszystkie dzielnice Wodzisławia Śląskiego i gminy ościenne: Radlin, Rydułtowy, Gorzyce, Mszana, Godów. Brak ukrytych kosztów za dojazd na plac budowy w obrębie powiatu.',
    items: [
      'Wilchwy', 'Jedłownik', 'Kokoszyce', 'Radlin', 'Zawada', 'Nowe Miasto',
      'Trzy Wzgórza', 'Gorzyce', 'Mszana', 'Godów', 'Rydułtowy', 'Pszów',
    ],
  },

  // ── FAQ ──
  faq: {
    header: {
      label: 'NAJCZĘSTSZE PYTANIA',
      title: 'Kierownik budowy Wodzisław Śląski — pytania i odpowiedzi',
      description:
        'Odpowiadamy na pytania, które najczęściej słyszymy od inwestorów budujących w powiecie wodzisławskim.',
      align: 'center',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje nadzór kierownika budowy w Wodzisławiu Śląskim?',
        content: [
          { type: 'paragraph', value: 'Koszt pełnienia funkcji kierownika budowy w Wodzisławiu Śląskim startuje od **5 000 zł brutto** za cały proces budowy domu jednorodzinnego. Cena zależy od metrażu, technologii i kategorii szkód górniczych na działce.' },
          { type: 'paragraph', value: 'Pojedyncza wizyta kontrolna na budowie to **500–800 zł**. Odbiór mieszkania od dewelopera — od **500 zł**. Wycena indywidualna na podstawie projektu jest zawsze **darmowa**.' },
        ],
      },
      {
        question: 'Jak sprawdzić działkę pod kątem szkód górniczych w okolicach Wodzisławia?',
        content: [
          { type: 'paragraph', value: 'Zagrożenie sprawdzamy wnioskując o opinię do Polskiej Grupy Górniczej lub Okręgowego Urzędu Górniczego. **Pomagamy przebrnąć przez te formalności.** Następnie, na podstawie wyznaczonej kategorii szkód i badań geotechnicznych, doradzamy odpowiedni typ fundamentu.' },
          { type: 'paragraph', value: 'Na terenach tąpających (Kokoszyce, Radlin) najlepiej sprawdza się płyta fundamentowa ze wzmocnionym zbrojeniem (B500SP, podwójna siatka). Gwarantuje bezpieczeństwo konstrukcji na dekady.' },
        ],
      },
      {
        question: 'Na jakim etapie inwestycji należy zatrudnić kierownika budowy?',
        content: [
          { type: 'paragraph', value: 'Najlepiej **tuż po uzyskaniu pozwolenia na budowę**, jeszcze przed zgłoszeniem rozpoczęcia robót. Kierownik przejmuje plac, rejestruje elektroniczny dziennik budowy w Starostwie Powiatowym i dokonuje pierwszych wpisów warunkujących legalny start prac.' },
          { type: 'paragraph', value: 'Posiadamy szerokie uprawnienia — możemy natychmiast **wstrzymać prace** w przypadku zagrożenia bezpieczeństwa lub rażących odstępstw od projektu. Im wcześniej zweryfikujemy Twój projekt, tym więcej kosztownych błędów wyeliminujemy.' },
        ],
      },
      {
        question: 'Czy obsługujecie wszystkie dzielnice Wodzisławia i okoliczne gminy?',
        content: [
          { type: 'paragraph', value: 'Tak, świadczymy usługi kierownika budowy w całym Wodzisławiu Śląskim — Wilchwy, Jedłownik, Kokoszyce, Zawada, Nowe Miasto — oraz w gminach ościennych: **Radlin, Rydułtowy, Gorzyce, Mszana, Godów, Pszów**.' },
          { type: 'paragraph', value: 'Koszt dojazdu na plac budowy w obrębie powiatu wodzisławskiego jest **wliczony w cenę współpracy**. Jesteśmy na miejscu zawsze, gdy wymaga tego proces technologiczny.' },
        ],
      },
      {
        question: 'Jak wygląda odbiór końcowy budynku przez PINB?',
        content: [
          { type: 'paragraph', value: 'Kompletujemy pełną dokumentację powykonawczą (protokoły kominiarskie, elektryczne, oświadczenia instalatorów) na **14 dni** przed planowanym zgłoszeniem. Kierownik dokonuje ostatecznego wpisu w elektronicznym dzienniku, potwierdzając zgodność z projektem.' },
          { type: 'paragraph', value: 'Zgłaszamy budynek do PINB w Wodzisławiu Śląskim i **przejmujemy na siebie ewentualne kontrole i wyjaśnienia**. Przekazujemy gotowy obiekt z pełnym pakietem gwarancyjnym. Szczegóły: [Kierownik budowy i nadzór inwestorski — pełna oferta →](/oferta/nadzor-i-doradztwo)' },
        ],
      },
    ],
  },

  relatedLinks: {
    mainServicePage: '/oferta/nadzor-i-doradztwo',
    localBuildPage: '/obszar-dzialania/wodzislaw-slaski',
  },

  areaServed: [
    'Wodzisław Śląski', 'Wilchwy', 'Jedłownik', 'Kokoszyce', 'Radlin',
    'Zawada', 'Nowe Miasto', 'Trzy Wzgórza', 'Gorzyce', 'Mszana', 'Godów',
    'Rydułtowy', 'Pszów',
  ],
  geoCoordinates: { latitude: '50.0022', longitude: '18.4610' },
};
