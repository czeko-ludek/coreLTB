import type { CityData } from '../types';

export const katowiceData: CityData = {
  slug: 'katowice',
  cityName: 'Katowice',
  cityNameLocative: 'Katowicach',

  meta: {
    title: 'Budowa Domów Katowice – Kompleksowe Wykonawstwo 2026 | CoreLTB Builders',
    description: 'Budowa domu jednorodzinnego w Katowicach. Koszt stanu deweloperskiego od 5500-6500 zł/m². Specjalizacja w terenach górniczych. ✓ Lokalna baza logistyczna ✓ Gwarancja stałej ceny ✓ 12-18 miesięcy realizacji',
  },

  pageHeader: {
    title: 'Budowa Domów Katowice',
    backgroundImage: '/images/local/katowice/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW KATOWICE',
    headline: ['Budujesz dom w Katowicach?', 'Mamy bazę logistyczną tuż obok'],
    subtitle: 'Budujemy domy jednorodzinne w Katowicach — od Podlesia po Zarzecze. Nasza baza jest kilkanaście minut stąd, co oznacza szybką reakcję na budowie i zero kosztów dojazdu. Realizacja w 12-18 miesięcy ze stałą ceną w umowie.',
    benefits: [
      'Stan deweloperski od 5 500–6 500 zł/m² netto (2026)',
      'Lokalna baza logistyczna = szybka reakcja na budowie',
      'Technologia dobrana do warunków gruntowych Twojej działki',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Przedstawimy realny harmonogram 12-18 miesięcy',
      'Przygotujemy wstępny kosztorys inwestycji',
      'Odpowiemy na wszystkie Twoje pytania',
    ],
    ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
    ctaBoxButtons: [
      { text: 'Zadzwoń do Nas', href: 'tel:+48664123757', variant: 'secondary' },
      { text: 'Wyceń budowę', href: '/wycena', variant: 'secondary' },
    ],
  },

  expertise: {
    header: {
      label: 'SPECYFIKA REGIONU',
      title: 'Szkody górnicze a budowa domu w Katowicach',
      description: 'Budowanie na Śląsku, a w szczególności w Katowicach, wymaga specjalistycznej wiedzy inżynieryjnej. Większość terenów inwestycyjnych znajduje się w zasięgu oddziaływania eksploatacji górniczej. Ignorowanie tego faktu na etapie projektu to prosty przepis na pęknięte ściany i uszkodzoną konstrukcję już po kilku latach.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Fundamenty na terenach górniczych – Płyta vs Ławy',
        description: 'Standardowe ławy fundamentowe, które sprawdzają się w centralnej Polsce, w Katowicach często są niewystarczające.',
        details: [
          '**Sztywność konstrukcji:** Na terenach II, III i IV kategorii szkód górniczych rekomendujemy **płytę fundamentową**. Działa ona jak sztywna taca, na której "pływa" cały budynek podczas wstrząsów.',
          '**Zbrojenie:** W naszych realizacjach stosujemy stal zbrojeniową o podwyższonej klasie ciągliwości (A-IIIN). Ilość stali w fundamencie jest często o **30-40% wyższa** niż w standardowym projekcie.',
          '**Dylatacje i zabezpieczenia:** Budynek musi być odpowiednio zdylatowany od elementów zewnętrznych (tarasy, schody wejściowe), aby ruchy gruntu nie powodowały naprężeń niszczących elewację.',
        ],
      },
      {
        icon: 'fileText',
        title: 'Adaptacja projektu do kategorii terenu',
        description: 'Każdy "gotowy" projekt domu wymaga adaptacji do warunków miejscowych. W Katowicach inżynier adaptujący musi uwzględnić przyspieszenia poziome gruntu, krzywiznę terenu oraz odkształcenia poziome.',
        details: [
          'Realizując inwestycję z nami, masz pewność, że **kierownik budowy** dopilnuje zgodności wykonania z tymi zaostrzonymi rygorami. Nie oszczędzamy na betonie i stali tam, gdzie decyduje się stabilność Twojego domu. [Kierownik budowy Katowice — cennik od 5 000 zł →](/kierownik-budowy-katowice)',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-zbrojenie.webp',
      alt: 'Szkody górnicze w Katowicach - fundamenty i zabezpieczenia',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'shield',
        title: 'Doświadczenie w szkodach górniczych',
        description: 'Nie uczymy się na Twoim domu. Mamy udokumentowane realizacje na terenach III i IV kategorii szkód górniczych w Katowicach i miastach ościennych.',
      },
      {
        icon: 'shieldCheck',
        title: 'Gwarancja stałej ceny',
        description: 'Podpisując umowę, otrzymujesz gwarancję ceny na dany etap. Posiadamy klauzule waloryzacyjne, które są transparentne i uczciwe, ale chronimy Cię przed spekulacyjnymi wzrostami cen materiałów, magazynując je z wyprzedzeniem.',
      },
      {
        icon: 'users',
        title: 'Niezależny nadzór',
        description: 'Współpracujemy z kierownikami budowy, którzy dbają o Twój interes, a nie tylko o "szybkie zalanie betonu". Każdy etap kończy się formalnym odbiorem technicznym.',
      },
      {
        icon: 'fileCheck',
        title: 'Pomoc w odbiorach',
        description: 'Nie zostawiamy Cię z kluczami w ręku. Asystujemy przy odbiorach budynku przez PINB (Powiatowy Inspektorat Nadzoru Budowlanego), dostarczając komplet dokumentacji powykonawczej.',
      },
    ],
  },

  additionalSections: [
    {
      id: 'etapy-realizacji',
      header: {
        label: 'ETAPY REALIZACJI',
        title: 'Ile trwa budowa domu w Katowicach? (Standardy 2026)',
        description: 'Średni czas realizacji dla domu o powierzchni 150 m² w technologii tradycyjnej (murowanej) wynosi od 12 do 18 miesięcy do momentu wprowadzenia się. Harmonogram jest ściśle uzależniony od pór roku oraz przerw technologicznych niezbędnych dla wiązania betonu i wysychania tynków.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'hardHat',
          title: 'Etap 1: Stan Surowy Otwarty (SSO) – 3 do 4 miesięcy',
          description: 'To najszybszy i najbardziej spektakularny etap budowy. W ciągu niespełna kwartału na Twojej działce powstaje kompletna konstrukcja budynku.',
          details: [
            '**Fundamenty:** Wykonanie płyty fundamentowej lub ław zajmuje około **2-3 tygodni**. Na terenach górniczych czas ten może się wydłużyć o **5-7 dni** ze względu na wzmocnione zbrojenie (nawet do **150-180 kg stali na m³ betonu**).',
            '**Ściany nośne i stropy:** Murowanie ścian i wylewanie stropów to kolejne **4-6 tygodni**.',
            '**Więźba i pokrycie dachu:** Konstrukcja dachu wraz z foliowaniem i łatowaniem zamyka ten etap w kolejnych **3-4 tygodniach**.',
          ],
        },
        {
          icon: 'paintBrush',
          title: 'Etap 2: Stan Surowy Zamknięty (SSZ) – 2 do 4 tygodni',
          description: 'Zamknięcie bryły budynku pozwala na prowadzenie prac wewnątrz niezależnie od pogody. To krótki, ale kluczowy etap.',
          details: [
            '**Okna:** Montaż stolarki okiennej w technologii "ciepłego montażu" (taśmy paroszczelne + paroprzepuszczalne). Okna 3-szybowe o Uw ≤ 0,9 W/m²K.',
            '**Drzwi wejściowe:** Instalacja drzwi o podwyższonej odporności na włamanie (klasa RC2 lub wyższa).',
            '**Brama garażowa:** Montaż bramy segmentowej z napędem i izolacją termiczną.',
          ],
        },
        {
          icon: 'clipboard',
          title: 'Etap 3: Stan Deweloperski – 5 do 7 miesięcy',
          description: 'To moment, w którym budynek "zwalnia", ale dzieje się w nim najwięcej prac instalacyjnych.',
          details: [
            '**Instalacje:** Rozprowadzenie elektryki, hydrauliki, ogrzewania podłogowego i rekuperacji – **3-5 tygodni**.',
            '**Tynki i wylewki:** Wykonanie tynków wewnętrznych i wylewek podłogowych wymaga czasu na wyschnięcie. Technologicznie musimy odczekać minimum **4-6 tygodni**, aby wilgotność podłoża spadła poniżej **3-4% CM**.',
            '**Ocieplenie:** Montaż styropianu grafitowego (20 cm) lub wełny mineralnej na elewacji + tynk silikonowy.',
          ],
        },
        {
          icon: 'keyRound',
          title: 'Etap 4: Budowa Pod Klucz – 2 do 3 miesięcy',
          description: 'Opcja dla inwestorów, którzy chcą wprowadzić się do w pełni gotowego domu bez koordynowania ekip wykończeniowych.',
          details: [
            '**Łazienki i kuchnia:** Kompleksowe wykończenie — płytki, biały montaż, armatura.',
            '**Podłogi i drzwi:** Układanie paneli, desek lub płytek. Montaż drzwi wewnętrznych.',
            '**Malowanie i detale:** Malowanie ścian farbami lateksowymi, montaż listew przypodłogowych, oświetlenia i gniazdek dekoracyjnych.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-gornicze.webp',
        alt: 'Etapy budowy domu w Katowicach - harmonogram 2026',
      },
    },
  ],

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Dzielnice Katowic – gdzie najczęściej realizujemy inwestycje?',
      description: 'Katowice to miasto o bardzo zróżnicowanej strukturze geologicznej i urbanistycznej. Jako lokalny wykonawca znamy specyfikę poszczególnych dzielnic, co pozwala nam precyzyjnie planować logistykę i unikać problemów z dojazdem ciężkiego sprzętu.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Podlesie' },
      { label: 'Zarzecze' },
      { label: 'Kostuchna' },
      { label: 'Murcki' },
      { label: 'Panewniki' },
      { label: 'Ligota' },
      { label: 'Brynów' },
      { label: 'Dąbrówka Mała' },
      { label: 'Szopienice' },
      { label: 'Giszowiec' },
    ],
    hubDescription: 'Najwięcej inwestycji realizujemy w południowych dzielnicach miasta. Podlesie i Zarzecze charakteryzują się dużą ilością nowych inwestycji. Kostuchna i Murcki wymagają szczególnej uwagi na szkody górnicze (historyczna eksploatacja KWK Murcki-Staszic). Panewniki i Ligota to wyzwania logistyczne – wąskie działki i ograniczenia tonażowe.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Budowa domu w Katowicach – odpowiadamy na Twoje wątpliwości',
      description: 'Zbieramy pytania, które najczęściej słyszymy od klientów planujących budowę w Katowicach i okolicach.',
      align: 'center',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje budowa domu 100–150 m² w Katowicach w 2026 roku?',
        content: [
          { type: 'paragraph', value: 'Koszt stanu deweloperskiego startuje od **5500-6500 zł netto za m²**. Realizacja domu 100–150 m² w standardzie pod klucz zazwyczaj wynosi od 750 tys. zł wzwyż. Budżet 450–650 tys. zł pozwoli na doprowadzenie inwestycji do stanu deweloperskiego. Dokładny kosztorys przygotowujemy po analizie projektu.' },
        ],
      },
      {
        question: 'Jakie są ukryte koszty budowy domu w Katowicach?',
        content: [
          { type: 'paragraph', value: '**Przyłącza mediów:** Doprowadzenie wody, prądu, gazu i kanalizacji może wynieść od **15 000 do 40 000 zł** w zależności od odległości od sieci. **Zagospodarowanie terenu:** Ogrodzenie, podjazd, niwelacja – kolejne **30 000-60 000 zł**. **Badania geotechniczne:** Koszt rzędu **1500-2000 zł**, ale absolutnie niezbędny dla właściwego doboru fundamentów.' },
        ],
      },
      {
        question: 'Czy realizujecie budowy na terenach szkód górniczych?',
        content: [
          { type: 'paragraph', value: 'Tak, to nasza specjalizacja. Realizujemy inwestycje na terenach objętych wpływami eksploatacji górniczej do IV kategorii. Stosujemy płyty fundamentowe ze wzmocnionym zbrojeniem (o **30-40% więcej stali** niż w standardzie) oraz stal klasy A-IIIN o podwyższonej ciągliwości.' },
        ],
      },
      {
        question: 'Jaki projekt domu wychodzi najtaniej w budowie?',
        content: [
          { type: 'paragraph', value: 'Najtańszy w budowie jest dom na planie prostokąta z dachem dwuspadowym. **Brak lukarn i wykuszy** – lukarna oszczędza od **3000 do 5000 zł** na jednym elemencie. **Balkony** to drogi element i potencjalny mostek termiczny. Dach wielospadowy jest o **20-30% droższy** niż dwuspadowy.' },
        ],
      },
      {
        question: 'Dlaczego warto wybrać generalnego wykonawcę zamiast systemu gospodarczego?',
        content: [
          { type: 'paragraph', value: '**Ceny materiałów:** Zamawiamy hurtowo – klient indywidualny płaci marżę wyższą o **15-20%**. **VAT:** Usługa budowlana z materiałem to **8% VAT**, zakup samodzielny to **23% VAT**. **Odpowiedzialność:** Masz jedną umowę i jedną gwarancję. Realnie oszczędność systemu gospodarczego jest iluzoryczna (często poniżej 5%), a ryzyko błędów – ogromne.' },
        ],
      },
    ],
  },

  nearbyCities: [
    { name: 'Tychy', slug: 'tychy' },
    { name: 'Mikołów', slug: 'mikolow' },
    { name: 'Jaworzno', slug: 'jaworzno' },
  ],

  areaServed: [
    'Katowice',
    'Podlesie',
    'Zarzecze',
    'Kostuchna',
    'Murcki',
    'Panewniki',
    'Ligota',
    'Brynów',
    'Giszowiec',
    'Szopienice',
    'Dąbrówka Mała',
  ],
  geoCoordinates: { latitude: '50.2649', longitude: '19.0238' },
};
