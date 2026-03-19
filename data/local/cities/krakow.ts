import type { CityData } from '../types';

export const krakowData: CityData = {
  slug: 'krakow',
  cityName: 'Kraków',
  cityNameLocative: 'Krakowie',

  meta: {
    title: 'Budowa Domów Kraków – Generalny Wykonawca 2026 | CoreLTB Builders',
    description:
      'Budowa domu jednorodzinnego w Krakowie. Znamy specyfikę południowych dzielnic — MPZP, warunki gruntowe, procedury konserwatorskie. ✓ Stan deweloperski od 6 000 zł/m² ✓ Gwarancja stałej ceny ✓ 10-16 miesięcy',
  },

  pageHeader: {
    title: 'Budowa Domów Kraków',
    backgroundImage: '/images/local/krakow/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW KRAKÓW',
    headline: ['Budujesz dom w Krakowie?', 'Solidna budowa ze stałą ceną'],
    subtitle:
      'Budujemy domy jednorodzinne w południowych i zachodnich dzielnicach Krakowa — od Swoszowic po Wolę Justowską. Znamy lokalne MPZP, warunki gruntowe i procedury. Realizacja w 10-16 miesięcy ze stałą ceną w umowie.',
    benefits: [
      'Stan deweloperski od 6 000–7 000 zł/m² netto (2026)',
      'Znajomość krakowskich MPZP i procedur konserwatorskich',
      'Stała cena w umowie — bez niespodzianek w trakcie budowy',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Sprawdzimy MPZP i ograniczenia konserwatorskie',
      'Przedstawimy kosztorys z gwarancją stałej ceny',
      'Odpowiemy na wszystkie Twoje pytania',
    ],
    ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
    ctaBoxButtons: [
      { text: 'Zadzwoń do Nas', href: 'tel:+48664123757', variant: 'secondary' },
      { text: 'Napisz do Nas', href: '#kontakt', variant: 'secondary' },
    ],
  },

  expertise: {
    header: {
      label: 'SPECYFIKA BUDOWY W KRAKOWIE',
      title: 'MPZP, warunki gruntowe i formalności — co warto wiedzieć',
      description:
        'Kraków to specyficzny rynek budowlany. Restrykcyjne MPZP, ochrona konserwatorska, drogie działki i zróżnicowane warunki gruntowe — od zalewowych terenów Wisły po skalistą Jurę. Jako [generalny wykonawca](/oferta/kompleksowa-budowa-domow) pomagamy przejść przez cały proces — od analizy działki po odbiór w PINB.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Zróżnicowane grunty — od Wisły po Jurę',
        description:
          'Południowe dzielnice Krakowa (Swoszowice, Sidzina, Skotniki) leżą na gruntach aluwialnych Wisły. Zachodnie (Bielany, Przegorzały, Wola Justowska) — na wapieniach jurajskich. Swoszowice mają dodatkowo historyczne wydobycie siarki i gipsu. Każda lokalizacja wymaga innego podejścia do fundamentu.',
        details: [
          'W dolinie Wisły (Tyniec, Kostrze, Skotniki) poziom wód gruntowych bywa **1-2 m** pod powierzchnią — konieczny drenaż opaskowy i hydroizolacja ciężka. Na wzgórzach jurajskich (Przegorzały, Bielany) grunt jest skalisto-wapienny z możliwymi zjawiskami krasowymi. W Swoszowicach podłoże zawiera warstwy gipsu i margli siarkowych z **historycznym wydobyciem (XV-XX w.)** — badanie geotechniczne to tu absolutna konieczność.',
        ],
      },
      {
        icon: 'shield',
        title: 'MPZP i konserwator — procedury trwają dłużej',
        description:
          'Kraków ma jedne z najbardziej restrykcyjnych MPZP w Polsce. Wiele dzielnic objętych jest ochroną konserwatorską (strefy A, B, K) lub krajobrazową (Park Krajobrazowy Dolinki Krakowskie). To wpływa na projekt, materiały i harmonogram.',
        details: [
          'W strefach konserwatorskich wymagana jest **opinia Miejskiego Konserwatora Zabytków** — czas oczekiwania **4-8 tygodni**. MPZP mogą narzucać: kąt dachu, kolor elewacji, materiał pokrycia, wysokość zabudowy, nawet proporcje okien. Znamy te regulacje i uwzględniamy je **na etapie projektu**, nie w trakcie budowy. Unikasz dzięki temu kosztownych zmian i opóźnień.',
        ],
      },
      {
        icon: 'settings',
        title: 'Drogie działki = optymalizacja projektu',
        description:
          'Działki budowlane w Krakowie kosztują **300–800 zł/m²** — wielokrotnie więcej niż na Śląsku. Przy takiej inwestycji w grunt, oszczędzanie na wykonawcy to fałszywa ekonomia. Stawiamy na TCO: stała cena, terminowość, brak reklamacji.',
        details: [
          'Przy działce za **300-500 tys. zł** budżet na dom jest pod presją. Dlatego optymalizujemy: doradzamy w wyborze projektu (prosta bryła = niższy koszt), dobieramy materiały z optymalnym stosunkiem cena/jakość, zamawiamy hurtowo z rabatami. Cena w umowie jest **ryczałtowa** — nie dopisujemy kosztów w trakcie. To pozwala Ci planować budżet całej inwestycji bez niespodzianek.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-wykop.webp',
      alt: 'Budowa domu w Krakowie — specyfika południowych dzielnic miasta',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'mapPin',
        title: 'Dojeżdżamy z Jaworzna — 40 km',
        description:
          'Nasza baza operacyjna w Jaworznie to 40 km od południowych dzielnic Krakowa. Autostrada A4 i obwodnica S52 zapewniają szybki dojazd. Brygady są na budowie punkt 7:00.',
      },
      {
        icon: 'trendingUp',
        title: 'TCO — liczymy koszty na dekady',
        description:
          'Przy krakowskich cenach działek każda złotówka się liczy. Pokazujemy kalkulację TCO: stała cena budowy, niskie koszty eksploatacji (dom energooszczędny), minimalne nakłady na konserwację.',
      },
      {
        icon: 'building',
        title: 'Własne ekipy — bez pośredników',
        description:
          'Własne brygady murarskie, zbrojarskie i ciesielskie. Szalunki i sprzęt posiadamy — nie wynajmujemy. To oznacza kontrolę jakości i terminów na każdym etapie.',
      },
      {
        icon: 'shieldCheck',
        title: 'Ryczałt + OC + kary umowne',
        description:
          'Stała cena w umowie, polisa OC wykonawcy i kary umowne za opóźnienia. Jedna umowa, jedna odpowiedzialność — bez przerzucania problemów między podwykonawcami.',
      },
    ],
  },

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Dzielnice Krakowa i okolice',
      description:
        'Budujemy domy jednorodzinne w południowych i zachodnich dzielnicach Krakowa, gdzie dominuje zabudowa jednorodzinna. Znamy specyfikę MPZP i warunki gruntowe poszczególnych lokalizacji.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Swoszowice' },
      { label: 'Wola Justowska' },
      { label: 'Tyniec' },
      { label: 'Kostrze' },
      { label: 'Bielany' },
      { label: 'Przegorzały' },
      { label: 'Sidzina' },
      { label: 'Skotniki' },
      { label: 'Opatkowice' },
      { label: 'Kliny' },
      { label: 'Kosocice' },
      { label: 'Bodzów' },
      { label: 'Pychowice' },
      { label: 'Libertów' },
      { label: 'Zabierzów' },
      { label: 'Mogilany' },
      { label: 'Wieliczka' },
      { label: 'Skawina' },
    ],
    hubDescription:
      'Koncentrujemy się na dzielnicach z zabudową jednorodzinną: Swoszowice, Wola Justowska, Tyniec, Kostrze, Bielany, Przegorzały, Sidzina. Obsługujemy też gminy podkrakowskie — Zabierzów, Mogilany, Wieliczkę, Libertów. Dojazd z Jaworzna (A4) zajmuje 35-45 minut.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Budowa domu w Krakowie — odpowiadamy na pytania',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje budowa domu w Krakowie w 2026 roku?',
        content: [
          {
            type: 'paragraph',
            value:
              'Stan surowy otwarty (SSO) to **3 000–3 800 zł/m²**, [stan deweloperski](/oferta/kompleksowa-budowa-domow) — **6 000–7 000 zł/m²**, realizacja pod klucz — **7 500–9 500 zł/m²**. Ceny w Krakowie są wyższe niż na Śląsku o **5-15%** — głównie przez droższy transport i logistykę (korki, ograniczenia tonażowe, strefy czystego transportu). Na działkach w dolinie Wisły dolicz **10-18 tys. zł** na hydroizolację i drenaż.',
          },
        ],
      },
      {
        question: 'Czy krakowskie MPZP mocno ograniczają budowę?',
        content: [
          {
            type: 'paragraph',
            value:
              'Tak — Kraków ma jedne z najbardziej szczegółowych MPZP w Polsce. Mogą narzucać: kąt dachu (np. 30-45°), kolor elewacji (np. wyłącznie beże/szarości), materiał pokrycia (np. dachówka ceramiczna), wysokość kalenicy, a w strefach konserwatorskich — nawet proporcje i rozmieszczenie okien. **Sprawdzamy MPZP na samym początku** — przed projektem, nie po. Dzięki temu unikasz kosztownych zmian.',
          },
        ],
      },
      {
        question: 'Nie jesteście z Krakowa — dlaczego Was wybrać?',
        content: [
          {
            type: 'paragraph',
            value:
              'Nasza baza jest 40 km stąd (Jaworzno, A4). Brygady dojeżdżają codziennie — punkt 7:00 na budowie. **Nie jesteśmy pośrednikiem** z krakowskim biurem i podwykonawcami ze Śląska. Jesteśmy tymi wykonawcami — z własnym sprzętem, własnymi ekipami i pełną odpowiedzialnością. Cena stała w umowie, polisa OC, kary umowne za opóźnienia. Bez „dopisywania" kosztów.',
          },
        ],
      },
      {
        question: 'Ile trwa budowa domu w Krakowie?',
        content: [
          {
            type: 'paragraph',
            value:
              'Od wbicia łopaty do stanu deweloperskiego: **8–12 miesięcy**. Pod klucz: dodatkowe **2–3 miesiące**. W Krakowie formalności trwają dłużej niż na Śląsku: opinia konserwatora (**4-8 tyg.**), pozwolenie na budowę (**2-3 miesiące**), uzgodnienia z ZIKiT. Uwzględniamy te terminy w harmonogramie od samego początku.',
          },
        ],
      },
      {
        question: 'Czy budujecie też pod Krakowem — Wieliczka, Zabierzów, Mogilany?',
        content: [
          {
            type: 'paragraph',
            value:
              'Tak — gminy podkrakowskie to nasze naturalne terytorium. Wieliczka, Zabierzów, Mogilany, Libertów, Skawina — wszystkie w zasięgu 40-50 km od naszej bazy. Działki pod Krakowem są **30-50% tańsze** niż w granicach miasta, a warunki budowlane często prostsze (mniej restrykcyjne MPZP, łatwiejsza logistyka). Realizujemy tam inwestycje na tych samych warunkach co w Krakowie.',
          },
        ],
      },
    ],
  },

  additionalSections: [
    {
      id: 'etapy-realizacji',
      header: {
        label: 'ETAPY REALIZACJI',
        title: 'Od analizy MPZP do klucza — krok po kroku',
        description:
          'W Krakowie budowa zaczyna się od formalności — MPZP, konserwator, warunki zabudowy. Jako [generalny wykonawca](/oferta/kompleksowa-budowa-domow) koordynujemy cały proces od pierwszej wizji lokalnej po odbiór w PINB.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'building',
          title: 'Stan Surowy Otwarty (SSO)',
          description:
            'Roboty ziemne, fundament dobrany do warunków geotechnicznych, ściany murowane, stropy monolityczne, więźba dachowa i pokrycie dachu.',
          details: [
            'Technologia fundamentu zależy od lokalizacji: ławy na stabilnym podłożu jurajskim, płyta z drenażem w dolinie Wisły. Ściany murowane z ceramiki lub silikatu (dobór wg MPZP i preferencji). Stropy żelbetowe monolityczne — najlepsza sztywność w każdych warunkach. Więźba z drewna C24, pokrycie dachowe zgodne z wymaganiami MPZP.',
          ],
        },
        {
          icon: 'hardHat',
          title: 'Stan Deweloperski',
          description:
            'Budynek gotowy z zewnątrz, przygotowany do wykończenia. Okna, instalacje, tynki, wylewki, ocieplenie.',
          details: [
            'Okna 3-szybowe (Uw <0,9 W/m²K) w ciepłym montażu, instalacje elektryczne, wod-kan, ogrzewanie podłogowe, przygotowanie pod rekuperację. Tynki gipsowe, wylewki anhydrytowe, ocieplenie **styropianem grafitowym 20 cm** z tynkiem silikonowym (kolor wg MPZP).',
          ],
        },
        {
          icon: 'keyRound',
          title: 'Budowa Pod Klucz',
          description:
            'Pełne wykończenie wnętrz — łazienki, podłogi, drzwi, malowanie. Przekazujemy gotowy dom z dokumentacją.',
          details: [
            'Kompleksowe wykończenie wnętrz, montaż armatury i osprzętu. Przekazujemy wysprzątany dom z kompletem dokumentacji powykonawczej, gwarancjami i protokołem odbioru PINB Kraków.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-standard.webp',
        alt: 'Etapy budowy domu w Krakowie — od analizy MPZP do wykończenia pod klucz',
      },
    },
  ],

  nearbyCities: [
    { name: 'Jaworzno', slug: 'jaworzno', context: '40 km na zachód (A4)' },
    { name: 'Chrzanów', slug: 'chrzanow', context: '50 km na zachód' },
    { name: 'Katowice', slug: 'katowice', context: '75 km na zachód (A4)' },
  ],

  areaServed: [
    'Kraków',
    'Swoszowice',
    'Wola Justowska',
    'Tyniec',
    'Kostrze',
    'Bielany',
    'Przegorzały',
    'Sidzina',
    'Skotniki',
    'Opatkowice',
    'Kliny',
    'Kosocice',
    'Bodzów',
    'Pychowice',
    'Zabierzów',
    'Mogilany',
    'Wieliczka',
    'Libertów',
    'Skawina',
  ],
  geoCoordinates: { latitude: '50.0647', longitude: '19.9450' },
};
