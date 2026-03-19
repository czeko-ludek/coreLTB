import type { NadzorCityData } from '../types';

export const katowiceNadzorData: NadzorCityData = {
  slug: 'kierownik-budowy-katowice',
  cityName: 'Katowice',
  cityNameLocative: 'Katowicach',

  meta: {
    title:
      'Kierownik Budowy Katowice – Nadzór Inwestorski od 5 000 zł | CoreLTB',
    description:
      'Kierownik budowy i inspektor nadzoru inwestorskiego w Katowicach. Cennik od 5 000 zł brutto. Specjalizacja: szkody górnicze, odbiory, dziennik budowy. ✓ Uprawnienia bez ograniczeń ✓ OC 500 000 zł ✓ Dojazd wliczony w cenę',
  },

  pageHeader: {
    title: 'Kierownik Budowy Katowice',
    backgroundImage: '/images/local/katowice/nadzor-hero.webp',
  },

  // ── HERO — unikalne pola ──
  emotionalHero: {
    subtitle:
      'Zgodnie z prawem budowlanym, zatrudnienie kierownika jest obowiązkowe przy każdej inwestycji wymagającej pozwolenia na budowę. Choć przepisy z 2026 roku zwalniają z tego obowiązku domy do 70 m², w praktyce brak nadzoru to ogromne ryzyko konstrukcyjne i finansowe. Przejmujemy pełną odpowiedzialność techniczną za Twoją inwestycję w Katowicach.',
    benefits: [
      'Jawny cennik: kierownik budowy / inspektor nadzoru od 5 000 zł brutto',
      'Uprawnienia budowlane bez ograniczeń + wpis do ŚOIIB',
      'Polisa OC na kwotę 500 000 zł — Twoje bezpieczeństwo',
    ],
  },

  // ── SERVICES header ──
  services: {
    header: {
      label: 'ZAKRES USŁUG W KATOWICACH',
      title: 'Kiedy potrzebujesz kierownika budowy?',
      description:
        'Nadzorujemy zarówno nowe budowy, jak i rozbudowy istniejących budynków. Każde zlecenie traktujemy indywidualnie — zakres i liczbę wizyt dopasowujemy do Twojego projektu.',
      align: 'center',
      theme: 'light',
    },
  },

  // ── SPECYFIKA KATOWIC — szkody górnicze ──
  localExpertise: {
    header: {
      label: 'SPECYFIKA INWESTYCJI W KATOWICACH',
      title: 'Szkody górnicze — dlaczego nadzór jest tu koniecznością?',
      description:
        'Tereny w Katowicach i okolicznych powiatach bardzo często objęte są wpływami eksploatacji górniczej. Wstrząsy, tąpania i systematyczne osiadanie gruntu to realne zagrożenie dla konstrukcji, które nie zostały odpowiednio usztywnione. Znamy lokalną specyfikę geologiczną — wiemy, jak zachowują się gliny pęczniejące, nasypy niekontrolowane czy niebezpieczna kurzawka.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Kontrola zbrojenia i fundamentów',
        description:
          'W zależności od kategorii szkód górniczych (I–IV), projekt narzuca specyficzne wzmocnienia. My rygorystycznie pilnujemy ich wykonania na placu budowy.',
        details: [
          'Sprawdzamy ciągłość ław i zastosowanie grubszych prętów zbrojeniowych (np. **stal żebrowana fi 16** zamiast standardowej fi 12)',
          'Weryfikujemy poprawność **dylatacji systemowych**, które pozwalają bryle budynku bezpiecznie "pracować" podczas wstrząsów',
          'Nadzorujemy betonowanie wieńców stropowych i **trzpieni żelbetowych**, które spinają całą konstrukcję jak sztywna klamra',
          'Kontrolujemy zastosowanie **elastycznych przyłączy instalacyjnych** (wod-kan), zapobiegając ich zerwaniu przy ruchach gruntu',
        ],
      },
      {
        icon: 'mapPin',
        title: 'Dzielnice o podwyższonym ryzyku',
        description:
          'Znamy kategorie szkód górniczych dla poszczególnych dzielnic Katowic. To wiedza, której inspektor spoza regionu po prostu nie ma.',
        details: [
          '**Podlesie, Kostuchna, Murcki** — eksploatacja KWK Murcki-Staszic, kategoria III–IV',
          '**Giszowiec, Szopienice** — historyczna eksploatacja, niestabilne grunty nasypowe',
          '**Panewniki, Ligota** — zróżnicowane warunki, konieczna indywidualna geotechnika',
        ],
      },
      {
        icon: 'fileText',
        title: 'Współpraca z PINB Katowice',
        description:
          'Prowadzimy kompletną dokumentację zgodną z wymaganiami Powiatowego Inspektoratu Nadzoru Budowlanego w Katowicach. Asystujemy przy kontrolach, przygotowujemy dokumenty powykonawcze i pilnujemy terminów zgłoszeń — co skraca procedury urzędowe o minimum 14 dni.',
      },
    ],
    image: {
      src: '/images/local/katowice/nadzor-specyfika.webp',
      alt: 'Kontrola zbrojenia fundamentów na budowie w Katowicach — inspektor mierzy rozstaw prętów stalowych',
    },
  },

  // ── CENNIK — unikalne pola ──
  pricing: {
    note: 'Dojazd na terenie Katowic wliczony w cenę. Wycena indywidualna na podstawie projektu budowlanego jest zawsze darmowa.',
  },

  // ── DZIELNICE ──
  districts: {
    header: {
      label: 'OBSZAR DZIAŁANIA',
      title: 'Dzielnice Katowic i okolice — gdzie dojeżdżamy?',
      description:
        'Nasza baza logistyczna znajduje się blisko głównych węzłów komunikacyjnych (A4, DK81). Gwarantujemy błyskawiczną reakcję — nawet jeśli betonowanie płyty fundamentowej zaplanowano na 6:00 rano.',
      align: 'center',
      theme: 'light',
    },
    description:
      'Dojeżdżamy na Piotrowice, Kostuchnę, Podlesie, Ligotę, Brynów czy Dąb w czasie nieprzekraczającym 20–25 minut. Brak ukrytych kosztów za dojazd na plac budowy na terenie miasta. Obsługujemy również Mikołów, Tychy, Chorzów i Siemianowice Śląskie.',
    items: [
      'Piotrowice', 'Kostuchna', 'Podlesie', 'Ligota', 'Brynów', 'Dąb',
      'Panewniki', 'Murcki', 'Giszowiec', 'Szopienice', 'Dąbrówka Mała', 'Zarzecze',
    ],
  },

  // ── FAQ ──
  faq: {
    header: {
      label: 'NAJCZĘSTSZE PYTANIA',
      title: 'Kierownik budowy Katowice — pytania i odpowiedzi',
      description:
        'Odpowiadamy na pytania, które najczęściej słyszymy od inwestorów budujących w Katowicach i okolicach.',
      align: 'center',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje nadzór kierownika budowy w Katowicach?',
        content: [
          { type: 'paragraph', value: 'Koszt pełnienia funkcji kierownika budowy lub inspektora nadzoru inwestorskiego w Katowicach startuje od **5 000 zł brutto** za cały proces budowy domu jednorodzinnego. Cena zależy od metrażu, technologii budowy i kategorii terenu górniczego.' },
          { type: 'paragraph', value: 'Jednorazowy odbiór techniczny mieszkania od dewelopera to koszt od **500 zł**. Pojedyncza wizyta kontrolna na budowie — **500–800 zł**. Wycena indywidualna na podstawie projektu jest zawsze **darmowa**.' },
        ],
      },
      {
        question: 'Czy obsługujecie wszystkie dzielnice Katowic i czy dojazd jest wliczony?',
        content: [
          { type: 'paragraph', value: 'Tak, świadczymy usługi kierownika budowy we wszystkich dzielnicach Katowic — od Piotrowic po Szopienice. **Koszt dojazdu na plac budowy w obrębie miasta jest wliczony w cenę współpracy.** Obsługujemy również okoliczne miasta: Mikołów, Tychy, Chorzów i Siemianowice Śląskie.' },
        ],
      },
      {
        question: 'Na jakim etapie inwestycji należy zatrudnić kierownika budowy?',
        content: [
          { type: 'paragraph', value: 'Najlepiej **tuż po uzyskaniu pozwolenia na budowę**, jeszcze przed zgłoszeniem rozpoczęcia robót. Kierownik odpowiada za techniczną stronę inwestycji od pierwszego dnia. Rejestrujemy dziennik budowy w wydziale architektury w ciągu 48 godzin od zlecenia i dokonujemy pierwszych wpisów warunkujących legalny start prac.' },
          { type: 'paragraph', value: 'Im szybciej zweryfikujemy Twój projekt, tym więcej kosztownych błędów wyeliminujemy **przed wylaniem pierwszego kubika betonu**.' },
        ],
      },
      {
        question: 'Czy na szkodach górniczych w Katowicach nadzór jest obowiązkowy?',
        content: [
          { type: 'paragraph', value: 'Kierownik budowy jest obowiązkowy prawnie przy każdym pozwoleniu na budowę. Inspektor nadzoru inwestorskiego bywa **nakazany przez urząd** w strefach szczególnych zagrożeń. Na terenach III i IV kategorii szkód górniczych (Podlesie, Murcki, Kostuchna) urząd może nałożyć taki wymóg w decyzji o pozwoleniu.' },
          { type: 'paragraph', value: 'Nawet jeśli formalnie nie jest wymagany — **inżyniersko jest to konieczność**. Wykonawcy spoza Śląska regularnie bagatelizują wymóg wzmocnionego zbrojenia (fi 16 zamiast fi 12) i dylatacji budynku. Bez nadzoru fundament może popękać przy pierwszym silniejszym wstrząsie.' },
        ],
      },
      {
        question: 'Czy kierownik budowy przeprowadza końcowy odbiór domu?',
        content: [
          { type: 'paragraph', value: 'Tak. Końcowy odbiór techniczny to jeden z najważniejszych momentów inwestycji. Przygotowujemy komplet dokumentacji powykonawczej i **asystujemy przy odbiorze przez PINB** (Powiatowy Inspektorat Nadzoru Budowlanego w Katowicach). Kompletujemy oświadczenia instalatorów i potwierdzamy gotowość obiektu — co skraca procedury urzędowe o minimum 14 dni.' },
          { type: 'paragraph', value: 'Szczegóły naszego podejścia do nadzoru: [Kierownik budowy i nadzór inwestorski — pełna oferta →](/oferta/nadzor-i-doradztwo)' },
        ],
      },
    ],
  },

  relatedLinks: {
    mainServicePage: '/oferta/nadzor-i-doradztwo',
    localBuildPage: '/obszar-dzialania/katowice',
  },

  areaServed: [
    'Katowice', 'Piotrowice', 'Kostuchna', 'Podlesie', 'Ligota', 'Brynów',
    'Dąb', 'Panewniki', 'Murcki', 'Giszowiec', 'Szopienice', 'Dąbrówka Mała',
    'Zarzecze', 'Mikołów', 'Tychy', 'Chorzów',
  ],
  geoCoordinates: { latitude: '50.2649', longitude: '19.0238' },
};
