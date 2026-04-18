import type { CityData } from '../types';

export const mikolowData: CityData = {
  slug: 'mikolow',
  cityName: 'Mikołów',
  cityNameLocative: 'Mikołowie',

  meta: {
    title: 'Budowa Domów Mikołów – Pod Klucz 2026 | CoreLTB Builders',
    description: 'Budowa domu jednorodzinnego w Mikołowie. Stan deweloperski od 3 960 zł/m² netto wg kalkulatora + narzut górniczy 15-25%. Specjalizacja w szkodach górniczych (KWK Bolesław Śmiały). ✓ Lokalna firma ✓ Gwarancja stałej ceny ✓ 8-12 miesięcy realizacji',
  },

  pageHeader: {
    title: 'Budowa Domów Mikołów',
    backgroundImage: '/images/local/mikolow/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW MIKOŁÓW',
    headline: ['Budujesz dom w Mikołowie?', 'Solidna budowa od lokalnego wykonawcy'],
    subtitle: 'Budujemy domy w Mikołowie i powiecie mikołowskim — od centrum po sołectwa. Znamy lokalny teren i dobieramy technologię do warunków Twojej działki. Stan deweloperski od 3 960 zł/m² netto wg kalkulatora, realizacja w 8-12 miesięcy.',
    benefits: [
      'Stan deweloperski wg [kalkulatora](/wycena): od 3 960 zł/m² netto + narzut górniczy na fundament',
      'Znajomość warunków gruntowych w całym powiecie mikołowskim',
      'Pełna odpowiedzialność logistyczna, prawna i techniczna',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Sprawdzimy MPZP i warunki zabudowy',
      'Przedstawimy harmonogram i kosztorys',
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
      label: 'SPECYFIKA BUDOWY W MIKOŁOWIE',
      title: 'Szkody górnicze i ukształtowanie terenu',
      description: 'Budowa domu w powiecie mikołowskim różni się od inwestycji w innych częściach Polski. Lokalizacja ta, będąca częścią Górnośląskiego Okręgu Przemysłowego, niesie ze sobą konkretne wyzwania inżynieryjne, których zignorowanie może prowadzić do pękania ścian czy osiadania budynku już po kilku latach.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Zabezpieczenie przed szkodami górniczymi',
        description: 'Mikołów znajduje się w zasięgu oddziaływania eksploatacji górniczej, m.in. **KWK Bolesław Śmiały**. Tereny te są często sklasyfikowane jako kategoria szkód górniczych od I do III, a miejscami nawet IV.',
        details: [
          'Standardowy fundament to za mało. Budynek na takim terenie musi pracować jak sztywna bryła. Dlatego w naszych realizacjach stosujemy: **Płyty fundamentowe** (działają jak "sztywna taca", na której stoi dom — nawet jeśli grunt pod budynkiem się przemieści, płyta zapobiega pękaniu ścian nośnych), **Wzmocnione zbrojenie** (zwiększamy ilość stali w wieńcach stropowych i nadprożach, stosując pręty żebrowane o wyższej klasie wytrzymałości A-IIIN), **Dylatacje** (w przypadku domów o skomplikowanej bryle dzielimy budynek na mniejsze, niezależne segmenty).',
        ],
      },
      {
        icon: 'mountain',
        title: 'Niwelacja terenu i wody gruntowe',
        description: 'Mikołów charakteryzuje się **pagórkowatym ukształtowaniem terenu** (np. okolice Śląskiego Ogrodu Botanicznego, Mokre). Działki ze spadkiem wymagają precyzyjnej niwelacji i odpowiedniego zaprojektowania poziomu "zero" budynku.',
        details: [
          'Częstym problemem są również **gliniaste grunty**, które słabo przepuszczają wodę. W takich warunkach konieczne jest wykonanie: drenażu opaskowego wokół fundamentów, odprowadzenia wód opadowych do studni chłonnych lub kanalizacji deszczowej, izolacji przeciwwilgociowej fundamentów i ścian piwnic.',
          'Bagatelizowanie tego etapu to prosta droga do zawilgocenia ścian piwnic lub parteru.',
        ],
      },
      {
        icon: 'hardHat',
        title: 'Technologie budowy – murowane czy szkieletowe?',
        description: 'Wybór technologii to decyzja na całe życie. W CORE LTB Builders nie faworyzujemy jednej metody – dobieramy ją do potrzeb klienta, budżetu i specyfiki działki. Analizujemy **Całkowity Koszt Posiadania (TCO)**.',
        details: [
          '**Tradycyjna budowa domów murowanych** (Porotherm, silikaty, beton komórkowy): **Akumulacja ciepła** — masywne ściany działają jak bufor termiczny. Zimą długo trzymają ciepło, latem zapobiegają przegrzewaniu. **Akustyka** — ciężkie materiały (zwłaszcza silikaty) doskonale tłumią dźwięki – ważne przy budowie blisko DK44 czy A4. **Odporność** — technologia murowana, przy odpowiednim zbrojeniu, świetnie znosi naprężenia wynikające ze szkód górniczych.',
          '**Konstrukcja domów szkieletowych** (drewno C24, suszenie komorowe): **Szybkość realizacji** — stan deweloperski możemy osiągnąć w 4-6 miesięcy. **Energooszczędność** — ściana szkieletowa to w większości izolacja – łatwiej uzyskać standard pasywny. **Precyzja** — używamy drewna struganego czterostronnie, które nie będzie się rozsychać ani wypaczać.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-plyta.webp',
      alt: 'Specyfika budowy w Mikołowie - szkody górnicze i teren pagórkowaty',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'trendingUp',
        title: 'Zabezpieczenie przed inflacją',
        description: 'Nasze umowy zawierają jasne klauzule waloryzacyjne. Wiesz, co wpływa na cenę, a co jest stałe. Chronimy Cię przed spekulacyjnymi wzrostami cen materiałów.',
      },
      {
        icon: 'shield',
        title: 'Znajomość lokalnych gruntów',
        description: 'Wiemy, gdzie w Mikołowie występuje kurzawka, a gdzie szkody górnicze wymagają betonu klasy C30/37. Nie uczymy się na Twojej budowie – my to już wiemy.',
      },
      {
        icon: 'users',
        title: 'Własne brygady',
        description: 'Nie jesteśmy "firmą teczkową". Zatrudniamy murarzy, zbrojarzy i cieśli. Dzięki temu mamy pełną kontrolę nad jakością wykonania i terminowością.',
      },
      {
        icon: 'shieldCheck',
        title: 'Obsługa formalna i gwarancja',
        description: 'Reprezentujemy inwestora w urzędach – od pozwolenia po odbiór końcowy. Udzielamy rękojmi i gwarancji na konstrukcję. Wszelkie usterki usuwamy na nasz koszt.',
      },
    ],
  },

  additionalSections: [
    {
      id: 'etapy-realizacji',
      header: {
        label: 'ETAPY WSPÓŁPRACY',
        title: 'Jak przebiega budowa domu w powiecie mikołowskim?',
        description: 'Budowa domów w Mikołowie to proces wymagający uwzględnienia specyficznych uwarunkowań geologicznych oraz formalnych, charakterystycznych dla Górnego Śląska. Generalny wykonawca w tym regionie pełni funkcję nie tylko budowlańca, ale przede wszystkim inżyniera kontraktu, który zarządza ryzykiem inwestycyjnym.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'search',
          title: 'Weryfikacja działki i badanie gruntu',
          description: 'Zlecenie badań geotechnicznych (minimum 3 odwierty), aby określić nośność gruntu i poziom wód gruntowych. To podstawa do wyceny fundamentów i doboru odpowiedniej konstrukcji.',
          details: [
            'W pierwszej kolejności analizujemy **Miejscowy Plan Zagospodarowania Przestrzennego (MPZP)** lub Warunki Zabudowy. W 2026 roku kluczowym elementem jest adaptacja projektu do lokalnych warunków gruntowych – w Mikołowie często mamy do czynienia z terenami poeksploatacyjnymi.',
          ],
        },
        {
          icon: 'fileText',
          title: 'Harmonogram rzeczowo-finansowy',
          description: 'Otrzymujesz dokument, który jest podstawą do wypłaty transz przez bank. Wiążemy się **stałą ceną** na poszczególne etapy, co chroni Cię przed inflacją cen materiałów.',
          details: [
            'Nasz zespół koordynuje uzyskanie pozwolenia na budowę w Starostwie Powiatowym w Mikołowie przy ul. Żwirki i Wigury, co zazwyczaj zajmuje ustawowe 65 dni, pod warunkiem kompletnej dokumentacji.',
          ],
        },
        {
          icon: 'building',
          title: 'Realizacja stanu surowego',
          description: 'To najszybszy i najbardziej spektakularny etap budowy. Na Twojej działce powstaje kompletna konstrukcja budynku.',
          details: [
            'Roboty ziemne i wykonanie fundamentów (na terenach szkód górniczych standardem jest **płyta fundamentowa**). Murowanie ścian z certyfikowanych materiałów ceramicznych lub silikatowych. Wylewanie stropów monolitycznych dla lepszego usztywnienia konstrukcji. Więźba dachowa (drewno klasy C24) i pokrycie dachu.',
          ],
        },
        {
          icon: 'settings',
          title: 'Prace instalacyjne i wykończeniowe',
          description: 'Etap, w którym budynek staje się funkcjonalnym domem pod kątem technicznym.',
          details: [
            'Montaż okien 3-szybowych (pakiety o Uw < 0,9 W/m²K) w technologii ciepłego montażu. Rozprowadzenie instalacji elektrycznych, wod-kan i rekuperacji. Wykonanie tynków maszynowych i wylewek podłogowych z izolacją termiczną. Ocieplenie budynku styropianem grafitowym z tynkiem silikonowym.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-gornicze.webp',
        alt: 'Etapy budowy domu w Mikołowie - harmonogram realizacji',
      },
    },
  ],

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Dzielnice Mikołowa i okolice – gdzie realizujemy inwestycje?',
      description: 'Jako firma stacjonująca w regionie, znamy topografię i specyfikę poszczególnych dzielnic. Nie doliczamy gigantycznych kosztów logistycznych za dojazd, co jest częstą praktyką firm ogólnopolskich. Nasze ekipy operują sprawnie na terenie całego powiatu.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Centrum i Śródmieście' },
      { label: 'Kamionka' },
      { label: 'Borowa Wieś' },
      { label: 'Paniowy' },
      { label: 'Bujaków' },
      { label: 'Mokre' },
      { label: 'Śmiłowice' },
      { label: 'Reta' },
    ],
    hubDescription: 'Obsługujemy wszystkie dzielnice i sołectwa Mikołowa. Znajomość lokalnych MPZP pozwala nam szybciej ocenić potencjał działki. Wiemy, gdzie gmina planuje kanalizację, a gdzie konieczne będzie szambo lub przydomowa oczyszczalnia ścieków.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Budowa domów w Mikołowie – odpowiadamy na Twoje pytania',
      description: 'Zbieramy pytania, które najczęściej słyszymy od klientów planujących budowę w Mikołowie i okolicach.',
      align: 'center',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje budowa domu w 2026 roku i czy budżet 350-500 tys. zł wystarczy na realizację pod klucz?',
        content: [
          { type: 'paragraph', value: 'Stawki wg naszego [kalkulatora](/wycena): SSO **3 000–4 000 zł/m²**, [stan deweloperski](/oferta/kompleksowa-budowa-domow) **3 960–5 520 zł/m²**, pod klucz **4 640–6 200 zł/m²** netto (zależnie od konfiguracji). Na terenach górniczych (KWK Bolesław Śmiały) koszt fundamentu wzrasta o **15–25%** (zbrojona płyta zamiast ław). Budżet 350–500 tys. zł pozwala na dom do ~100 m² w stanie deweloperskim w konfiguracji budżetowej. W CORE LTB Builders pomagamy optymalizować projekty (prosta bryła, dach dwuspadowy).' },
        ],
      },
      {
        question: 'Czy realizujecie budowy na terenach ze szkodami górniczymi w Mikołowie i jak dobieracie odpowiednie fundamenty?',
        content: [
          { type: 'paragraph', value: 'Tak, z powodzeniem budujemy na terenach objętych szkodami górniczymi w Mikołowie, również w zasięgu oddziaływania KWK Bolesław Śmiały. Podstawą jest szczegółowa analiza geologiczna, na bazie której dobieramy rozwiązanie – zazwyczaj jest to solidnie zbrojona **płyta fundamentowa**. Taka konstrukcja najlepiej przenosi naprężenia i minimalizuje ryzyko pęknięć. Projekt konstrukcyjny zawsze dostosowujemy do konkretnej kategorii szkód.' },
        ],
      },
      {
        question: 'Jakie rodzaje domów są obecnie najchętniej budowane w Mikołowie i na które projekty jest największy popyt?',
        content: [
          { type: 'paragraph', value: 'W Mikołowie inwestorzy najchętniej wybierają obecnie domy typu **"nowoczesna stodoła"** oraz kompaktowe **parterówki o powierzchni do 120 m²**. Klienci stawiają na prostą bryłę i energooszczędność. W CORE LTB Builders zauważamy również rosnący popyt na projekty z płaskim dachem, które doskonale wpisują się w lokalny krajobraz, łącząc funkcjonalność z minimalizmem.' },
        ],
      },
      {
        question: 'Ile trwa budowa domu pod klucz w Mikołowie i co wpływa na terminowość?',
        content: [
          { type: 'paragraph', value: '[Budowa domu pod klucz](/oferta/kompleksowa-budowa-domow) w Mikołowie trwa **8–12 miesięcy** od robót ziemnych do przekazania kluczy. Stan surowy zamknięty osiągamy w **3–5 miesięcy**, wykończenie wnętrz to kolejne 3–4 miesiące. Na terminowość wpływa przede wszystkim pora rozpoczęcia (optymalnie marzec–kwiecień), kompletność dokumentacji projektowej i warunki gruntowe. W Mikołowie — na pograniczu stref górniczych i stabilnych — czas fundamentowania może się różnić o 2–3 tygodnie w zależności od dzielnic.' },
        ],
      },
      {
        question: 'Czym różni się budowa pod klucz od stanu deweloperskiego i który wariant wybrać?',
        content: [
          { type: 'paragraph', value: '**Stan deweloperski** to budynek z tynkami, wylewkami, oknami i instalacjami — gotowy do [wykończenia wnętrz](/oferta/wykonczenia-i-aranzacje). **Pod klucz** oznacza dom gotowy do zamieszkania — z podłogami, łazienkami, kuchnią i oświetleniem. Wariant deweloperski wybierają klienci, którzy chcą rozłożyć wydatki w czasie lub samodzielnie dopilnować aranżacji. Pod klucz to rozwiązanie dla tych, którym zależy na jednym wykonawcy i jednym harmonogramie. W Mikołowie realizujemy oba modele — z gwarancją stałej ceny na każdy etap.' },
        ],
      },
    ],
  },

  nearbyCities: [
    { name: 'Tychy', slug: 'tychy' },
    { name: 'Katowice', slug: 'katowice' },
    { name: 'Gliwice', slug: 'gliwice' },
  ],

  areaServed: [
    'Mikołów',
    'Kamionka',
    'Borowa Wieś',
    'Paniowy',
    'Bujaków',
    'Mokre',
    'Śmiłowice',
    'Reta',
  ],
  geoCoordinates: { latitude: '50.1695', longitude: '18.8976' },
};
