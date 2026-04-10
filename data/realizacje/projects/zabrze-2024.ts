/**
 * REALIZACJA: Dom jednorodzinny w Zabrzu — ul. Gwiazdy Polarnej (2024–2025)
 * Status: W trakcie — stan deweloperski
 *
 * Dane z opisu klienta + analiza zdjęć z budowy.
 * Technologia: ceramika szlifowana 24.5 cm, strop monolityczny,
 * więźba C24 + pełne deskowanie + blacha na rąbek stojący,
 * pompa ciepła Buderus, rekuperacja, inteligentny dom LOXONE.
 */

import type { RealizationData } from '../types';

const IMG = '/images/realizacje/zabrze-2024';

export const zabrze2024: RealizationData = {
  slug: 'dom-jednorodzinny-zabrze-gwiazdy-polarnej',

  meta: {
    title: 'Budowa domu 200 m\u00B2 w Zabrzu krok po kroku - Realizacja ze zdjeciami | CoreLTB',
    description:
      'Budowa domu parterowego 200 m\u00B2 w Zabrzu krok po kroku. 8 etapow ze zdjeciami: fundamenty, sciany ceramiczne, strop monolityczny, blacha na rabek, pompa ciepla Buderus, inteligentny dom LOXONE.',
  },

  project: {
    title: 'Budowa domu 200 m\u00B2 w Zabrzu - krok po kroku',
    location: 'Zabrze, ul. Gwiazdy Polarnej',
    city: 'zabrze',
    surfaceArea: 200,
    floors: 'Parterowy z garażem dwustanowiskowym',
    technology: 'Murowany — pustaki ceramiczne szlifowane 24,5 cm',
    roofType: 'Wielospadowy, blacha na rąbek stojący',
    projectSource: undefined,
    projectSlug: undefined,
    startDate: 'Październik 2024',
    endDate: undefined,
    status: 'in-progress',
    heroImage: `${IMG}/hero.webp`,
    progress: 85,
  },

  stages: [
    // ── ETAP 1: Fundamenty ──────────────────────────────────────
    {
      id: 'fundamenty',
      order: 1,
      title: 'Fundamenty — ławy na bloczkach zalewowych',
      icon: 'layers',
      dateLabel: 'Październik 2024',
      duration: '3 tygodnie',
      narrative: [
        'Budowa rozpoczęła się od wytyczenia geodezyjnego budynku i robót ziemnych. Grunt w tej części Zabrza okazał się stabilny — gliny pylaste o dobrej nośności, co potwierdziło badanie geotechniczne.',
        'Ławy fundamentowe wykonano z bloczków zalewowych, zbrojonych stalą B500SP. Na ławach wylano ściany fundamentowe, które zaizolowano masą bitumiczną dwuskładnikową — rozwiązanie trwalsze od klasycznej emulsji jednoskładnikowej, odporne na pękanie przy osiadaniu gruntu.',
        'Izolację termiczną fundamentów stanowi XPS 300 o grubości 15 cm — polistyren ekstrudowany o wysokiej wytrzymałości na ściskanie, niezbędny w strefie kontaktu z gruntem. Całość zabezpieczono folią kubełkową.',
      ],
      images: [
        {
          src: `${IMG}/fundamenty-lawy-zbrojenie.webp`,
          alt: 'Ławy fundamentowe ze zbrojeniem — budowa domu w Zabrzu',
          caption: 'Ławy fundamentowe z widocznym zbrojeniem i kanalizacją podposadzkową',
        },
        {
          src: `${IMG}/fundamenty-bloczki-zalewowe.webp`,
          alt: 'Bloczki zalewowe na ścianach fundamentowych domu w Zabrzu',
          caption: 'Ściany fundamentowe z bloczków zalewowych ze zbrojeniem pionowym',
        },
        {
          src: `${IMG}/fundamenty-izolacja-detal.webp`,
          alt: 'Zbrojenie ław fundamentowych z izolacją — detal',
          caption: 'Zbrojenie ław z izolacją XPS i folią kubełkową',
        },
        {
          src: `${IMG}/fundamenty-hydroizolacja-panorama.webp`,
          alt: 'Panorama fundamentów z hydroizolacją — dom 200 m2 w Zabrzu',
          caption: 'Panorama fundamentów z kompletną hydroizolacją',
        },
        {
          src: `${IMG}/fundamenty-zalane.webp`,
          alt: 'Zalane ławy fundamentowe — chudziak betonowy na podbudowie',
          caption: 'Ławy po zalaniu betonem — widoczna podsypka i zbrojenie',
        },
      ],
      expertInsight: {
        title: 'Masa bitumiczna dwuskładnikowa vs jednoskładnikowa',
        content: [
          'W tej realizacji zastosowaliśmy masę bitumiczną dwuskładnikową zamiast popularniejszej jednoskładnikowej. Różnica? Masa 2K (dwuskładnikowa) tworzy elastyczną, bezszwową powłokę odporną na pękanie — nawet przy mikro-osiadaniach fundamentu.',
          'Jednoskładnikowe emulsje bitumiczne są tańsze, ale po wyschnięciu stają się kruche i mogą pękać w miejscach naprężeń. Przy domu 200 m² koszt różnicy to ok. 2 000–3 000 zł — niewielka cena za spokój na 50+ lat. Na terenach górniczych Śląska wymagania dotyczące fundamentów są jeszcze wyższe — więcej o tym w naszym artykule o <a href="/baza-wiedzy/plyta-fundamentowa-tereny-gornicze">płycie fundamentowej na terenach górniczych</a>.',
        ],
      },
      technicalFacts: [
        { label: 'Typ fundamentu', value: 'Ławy na bloczkach zalewowych', icon: 'layers' },
        { label: 'Izolacja termiczna', value: 'XPS 300, 15 cm', icon: 'thermometerSnowflake' },
        { label: 'Hydroizolacja', value: 'Masa bitumiczna 2K', icon: 'shield' },
        { label: 'Czas trwania', value: '3 tygodnie', icon: 'clock' },
      ],
    },

    // ── ETAP 2: Ściany ──────────────────────────────────────────
    {
      id: 'sciany',
      order: 2,
      title: 'Ściany konstrukcyjne i działowe',
      icon: 'brickWall',
      dateLabel: 'Grudzień 2024 — Luty 2025',
      duration: '8 tygodni',
      narrative: [
        'Ściany nośne wymurowano z pustaków ceramicznych szlifowanych o grubości 24,5 cm — materiał łączony na cienką spoinę klejową (1–3 mm). Ceramika szlifowana zapewnia doskonałą akumulację cieplną, wysoką nośność na ściskanie i naturalną regulację wilgotności w pomieszczeniach.',
        'Ściany działowe wykonano również z pustaków ceramicznych szlifowanych o grubości 11,5 cm. To świadomy wybór — ceramika w ścianach działowych daje lepszą izolację akustyczną niż beton komórkowy (Rw 44 dB vs ~37 dB przy tej samej grubości).',
        'Na zdjęciach widać charakterystyczny kolor pustaków ceramicznych i precyzję murowania na cienką spoinę — różnica poziomów między kolejnymi warstwami nie przekracza 1 mm.',
      ],
      images: [
        {
          src: `${IMG}/sciany-widok-ogolny.webp`,
          alt: 'Ściany z pustaków ceramicznych szlifowanych — widok na budowę domu w Zabrzu',
          caption: 'Ściany nośne w trakcie murowania — pustaki ceramiczne szlifowane 24,5 cm',
        },
        {
          src: `${IMG}/sciany-ceramika-wnetrze.webp`,
          alt: 'Wnętrze pokoju z murowanymi ścianami ceramicznymi — budowa w Zabrzu',
          caption: 'Ściany nośne od wewnątrz — widoczna precyzja murowania na cienką spoinę',
        },
        {
          src: `${IMG}/sciany-dzialowe-strop.webp`,
          alt: 'Ściany działowe ceramiczne pod stropem monolitycznym',
          caption: 'Ściany działowe 11,5 cm pod stropem — widoczne nadproża',
        },
        {
          src: `${IMG}/sciany-otwor-drzwiowy.webp`,
          alt: 'Otwór drzwiowy w ścianach ceramicznych z nadprożem',
          caption: 'Precyzyjnie wymurowany otwór drzwiowy z nadprożem prefabrykowanym',
        },
      ],
      expertInsight: {
        title: 'Ceramika szlifowana — dlaczego warto dopłacić?',
        content: [
          'Pustaki ceramiczne szlifowane (np. Porotherm, Wienerberger) mają idealnie równe powierzchnie, co pozwala na murowanie na cienką spoinę (1–3 mm zamiast tradycyjnych 10–15 mm). Efekt? Mniej mostków termicznych, szybszy montaż i mniejsze zużycie zaprawy.',
          'W porównaniu z betonem komórkowym (Ytong/Solbet), ceramika szlifowana oferuje: lepszą akumulację cieplną (dom wolniej stygnie zimą, wolniej nagrzewa się latem), wyższą nośność na ściskanie (10+ MPa vs 3–4 MPa) i naturalną paroprzepuszczalność — ściany „oddychają".',
        ],
      },
      technicalFacts: [
        { label: 'Materiał nośny', value: 'Ceramika szlifowana 24,5 cm', icon: 'brickWall' },
        { label: 'Ściany działowe', value: 'Ceramika szlifowana 11,5 cm', icon: 'brickWall' },
        { label: 'Spoina', value: 'Cienkowarstwowa 1–3 mm', icon: 'ruler' },
        { label: 'Czas trwania', value: '8 tygodni', icon: 'clock' },
      ],
    },

    // ── ETAP 3: Strop monolityczny ──────────────────────────────
    {
      id: 'strop',
      order: 3,
      title: 'Strop monolityczny żelbetowy',
      icon: 'columns3',
      dateLabel: 'Luty — Marzec 2025',
      duration: '2 tygodnie',
      narrative: [
        'Strop wykonano jako monolityczny żelbetowy — wylewany na mokro na szalunkach stropowych podpartych stemplami. To rozwiązanie droższe od stropu gęstożebrowego, ale dające pełną swobodę projektową — dowolne rozpięcia, otwory i podcienia.',
        'Przy budynku o powierzchni 200 m² ze złożonym rzutem i garażem dwustanowiskowym strop monolityczny był optymalnym wyborem. Grubość płyty 18 cm, beton klasy C25/30, zbrojenie projektowe według obliczeń konstruktora.',
        'Na zdjęciach widać stemple podtrzymujące szalunek — pozostają na miejscu minimum 21 dni po betonowaniu, aby beton osiągnął wymaganą wytrzymałość.',
      ],
      images: [
        {
          src: `${IMG}/strop-stemple.webp`,
          alt: 'Stemple stropowe podtrzymujące strop monolityczny — dom w Zabrzu',
          caption: 'Stemple podtrzymujące strop — widoczna ściana działowa ceramiczna',
        },
        {
          src: `${IMG}/strop-widok-garaz.webp`,
          alt: 'Widok z garażu na strop monolityczny i przygotowane drewno na więźbę',
          caption: 'Widok z garażu — strop gotowy, drewno na więźbę dostarczone',
        },
        {
          src: `${IMG}/strop-korytarz.webp`,
          alt: 'Korytarz z widocznym stropem monolitycznym i ścianami działowymi',
          caption: 'Korytarz — strop monolityczny nad ścianami działowymi ceramicznymi',
        },
      ],
      technicalFacts: [
        { label: 'Typ stropu', value: 'Monolityczny żelbetowy', icon: 'columns3' },
        { label: 'Grubość', value: '18 cm', icon: 'ruler' },
        { label: 'Beton', value: 'C25/30', icon: 'box' },
        { label: 'Czas dojrzewania', value: 'Min. 21 dni', icon: 'clock' },
      ],
    },

    // ── ETAP 4: Więźba dachowa ──────────────────────────────────
    {
      id: 'wiezba-dachowa',
      order: 4,
      title: 'Więźba dachowa — drewno C24 z pełnym deskowaniem',
      icon: 'triangle',
      dateLabel: 'Marzec 2025',
      duration: '2 tygodnie',
      narrative: [
        'Więźba dachowa została wykonana z drewna suszonego klasy C24 — certyfikowanego i impregnowanego ciśnieniowo środkiem grzybobójczym i owadobójczym. Klasa C24 oznacza gwarantowaną wytrzymałość na zginanie 24 MPa — standard wymagany przez konstruktora.',
        'Konstrukcja wielospadowa z dużymi okapami to jedno z bardziej wymagających zadań ciesielskich. Na zdjęciach z drona widać złożoność połączeń krokwi narożnych i koszowych — każde połączenie wykonane tradycyjnie, na cięcia ciesielskie z dodatkowym mocowaniem stalowymi łącznikami.',
        'Kluczowa decyzja projektowa: pełne deskowanie zamiast łat. Deskowanie stanowi podkład pod blachę na rąbek stojący — pokrycie, które wymaga idealnie równej powierzchni pod spodem. Zastosowano deski o grubości 25 mm, łączone na zakładkę.',
      ],
      images: [
        {
          src: `${IMG}/wiezba-dron-panorama.webp`,
          alt: 'Więźba dachowa z drona — widok na konstrukcję wielospadową domu w Zabrzu',
          caption: 'Więźba wielospadowa z lotu ptaka — drewno C24 certyfikowane',
        },
        {
          src: `${IMG}/wiezba-konstrukcja-bliska.webp`,
          alt: 'Konstrukcja więźby dachowej z bliska — krokwie i płatwie drewniane',
          caption: 'Detal konstrukcji — krokwie narożne i koszowe z drewna C24',
        },
        {
          src: `${IMG}/wiezba-wielospadowa-detal.webp`,
          alt: 'Złożona konstrukcja więźby wielospadowej — połączenia krokwi',
          caption: 'Złożoność połączeń krokwi w dachu wielospadowym',
        },
        {
          src: `${IMG}/wiezba-deskowanie-montaz.webp`,
          alt: 'Montaż pełnego deskowania na więźbie — ekipa ciesielska na dachu',
          caption: 'Montaż pełnego deskowania — podkład pod blachę na rąbek',
        },
      ],
      expertInsight: {
        title: 'Pełne deskowanie — kiedy jest konieczne?',
        content: [
          'Standardowy dach z dachówką lub blachodachówką montuje się na łatach (listwy 4x6 cm co 30–35 cm). Blacha na rąbek stojący wymaga jednak pełnego deskowania — pokrycie jest cienkie i odkształca się na nierównym podłożu.',
          'Pełne deskowanie to dodatkowy koszt (~40–60 zł/m² za materiał + robociznę), ale daje też korzyści: lepszą sztywność dachu, dodatkową warstwę izolacji akustycznej i ułatwiony montaż membrany wstępnego krycia.',
        ],
      },
      technicalFacts: [
        { label: 'Drewno', value: 'Sosna C24, certyfikowane', icon: 'tree' },
        { label: 'Typ dachu', value: 'Wielospadowy', icon: 'triangle' },
        { label: 'Deskowanie', value: 'Pełne, deski 25 mm', icon: 'layers' },
        { label: 'Impregnacja', value: 'Ciśnieniowa, grzybobójcza', icon: 'shield' },
      ],
    },

    // ── ETAP 5: Pokrycie dachu ──────────────────────────────────
    {
      id: 'pokrycie-dachu',
      order: 5,
      title: 'Pokrycie dachu — blacha na rąbek stojący',
      icon: 'home',
      dateLabel: 'Marzec — Kwiecień 2025',
      duration: '2 tygodnie',
      narrative: [
        'Pokrycie dachu stanowi blacha na rąbek stojący — wykonywana na miejscu z taśmy blacharskiej na specjalnej maszynie zwijającej. Każdy arkusz formowany jest indywidualnie pod wymiar połaci, bez poprzecznych łączeń — to eliminuje ryzyko przecieków.',
        'Blacha na rąbek to jedno z najbardziej eleganckich i trwałych pokryć dachowych. Charakterystyczne pionowe przetłoczenia (rąbki) nadają dachowi nowoczesny, minimalistyczny wygląd. Trwałość pokrycia to 50+ lat przy minimalnej konserwacji.',
        'System odprowadzenia wód opadowych wykonano z rynien stalowych ciągnionych — trwalszych niż popularne rynny PVC, odpornych na UV i deformacje termiczne. Rynny stalowe patynują się z czasem, co podkreśla charakter budynku.',
      ],
      images: [
        {
          src: `${IMG}/dach-rabek-dron.webp`,
          alt: 'Gotowy dach z blachy na rąbek stojący — widok z drona na dom parterowy w Zabrzu',
          caption: 'Gotowe pokrycie z blachy na rąbek stojący — widok z drona, okna dachowe VELUX',
        },
        {
          src: `${IMG}/dach-rabek-naroznik.webp`,
          alt: 'Detal narożnika dachu z blachy na rąbek stojący — obróbka blacharska',
          caption: 'Narożnik dachu wielospadowego — precyzyjna obróbka blacharska na rąbek',
        },
        {
          src: `${IMG}/dach-deskowanie-pelne.webp`,
          alt: 'Pełne deskowanie dachu przed montażem blachy na rąbek — dom w Zabrzu',
          caption: 'Deskowanie pełne — podkład pod blachę na rąbek (etap pośredni)',
        },
      ],
      expertInsight: {
        title: 'Blacha na rąbek vs dachówka vs blachodachówka',
        content: [
          'Blacha na rąbek stojący to premium wśród pokryć dachowych. Zalety: minimalistyczny wygląd, brak poprzecznych łączeń (szczelność), lekkość (5 kg/m² vs 45 kg/m² przy dachówce ceramicznej), trwałość 50+ lat. Wada: wymaga pełnego deskowania i doświadczonego blacharza.',
          'Dachówka ceramiczna jest najtrwalsza (80+ lat) i najcięższa — wymaga mocniejszej więźby. Blachodachówka to kompromis cenowy — szybki montaż na łatach, 30+ lat trwałości, ale gorsza estetyka i głośniejsza przy deszczu.',
        ],
      },
      technicalFacts: [
        { label: 'Pokrycie', value: 'Blacha na rąbek stojący', icon: 'home' },
        { label: 'Wykonanie', value: 'Formowana na miejscu', icon: 'hammer' },
        { label: 'Rynny', value: 'Stalowe ciągnione', icon: 'waves' },
        { label: 'Trwałość', value: '50+ lat', icon: 'shield' },
      ],
    },

    // ── ETAP 6: Kanalizacja zewnętrzna ──────────────────────────
    {
      id: 'kanalizacja-zewnetrzna',
      order: 6,
      title: 'Kanalizacja zewnętrzna',
      icon: 'plug',
      dateLabel: 'Maj 2025',
      duration: '1 tydzień',
      narrative: [
        'Kanalizacja zewnętrzna to jeden z tych etapów, które nie wyglądają efektownie, ale mają kluczowe znaczenie dla funkcjonowania domu. Rury PVC o średnicy 160 mm ułożono w wykopach wzdłuż fundamentów z odpowiednim spadkiem (min. 2%) w kierunku przyłącza miejskiego.',
        'Na zdjęciach widać charakterystyczne pomarańczowe rury kanalizacyjne PVC-U przeznaczone do instalacji zewnętrznych (podziemnych). Trójniki i kolanka pozwalają na podłączenie odpływów z łazienek, kuchni i wpustów podłogowych garażu.',
        'Wszystkie połączenia wykonano na uszczelki gumowe i przetestowano szczelność przed zasypaniem — to standard, który eliminuje ryzyko kosztownych napraw w przyszłości.',
      ],
      images: [
        {
          src: `${IMG}/kanalizacja-rury-wykop.webp`,
          alt: 'Rury kanalizacyjne PVC w wykopie wzdłuż fundamentów domu w Zabrzu',
          caption: 'Rury kanalizacyjne PVC 160 mm w wykopie przy fundamentach',
        },
        {
          src: `${IMG}/kanalizacja-trasa.webp`,
          alt: 'Trasa kanalizacji zewnętrznej z kręgami studziennymi',
          caption: 'Trasa kanalizacji z widocznymi kręgami studziennymi',
        },
        {
          src: `${IMG}/kanalizacja-przy-budynku.webp`,
          alt: 'Kanalizacja zewnętrzna poprowadzona wzdłuż ściany budynku',
          caption: 'Rury ułożone ze spadkiem min. 2% w kierunku przyłącza',
        },
      ],
      technicalFacts: [
        { label: 'Rury', value: 'PVC-U DN 160 mm', icon: 'plug' },
        { label: 'Spadek', value: 'Min. 2%', icon: 'layers' },
        { label: 'Połączenia', value: 'Na uszczelki gumowe', icon: 'shieldCheck' },
        { label: 'Czas trwania', value: '5 dni roboczych', icon: 'clock' },
      ],
    },

    // ── ETAP 7: Stolarka okienna — SSZ ──────────────────────────
    {
      id: 'stolarka-okienna',
      order: 7,
      title: 'Stolarka okienna i drzwi — stan surowy zamknięty',
      icon: 'doorClosed',
      dateLabel: 'Czerwiec 2025',
      duration: '2 tygodnie',
      narrative: [
        'Montaż stolarki okiennej to moment, w którym budynek przechodzi ze stanu surowego otwartego do zamkniętego — od tej chwili wnętrze jest chronione przed deszczem, wiatrem i mrozem.',
        'Zastosowano okna PCV marki Oknoplast — trzyszybowe, w kolorze antracytowym od zewnątrz. Montaż wykonano w systemie Illbruck — szczelnym, trójwarstwowym systemie opartym na taśmach rozprężnych i paroizolacyjnych. To standard montażu RAL, który eliminuje mostki termiczne wokół okien.',
        'Jednocześnie zamontowano bramę garażową segmentową i drzwi wejściowe. Na zdjęciach z drona widać gotowy dach z blachy na rąbek, zamontowane okna i bramę — budynek w pełnym stanie surowym zamkniętym.',
      ],
      images: [
        {
          src: `${IMG}/ssz-front-panorama.webp`,
          alt: 'Dom w stanie surowym zamkniętym — front z oknami i dachem z blachy na rąbek',
          caption: 'Stan surowy zamknięty — front budynku z dużymi przeszkleniami',
        },
        {
          src: `${IMG}/ssz-garaz-brama.webp`,
          alt: 'Garaż z bramą segmentową i dachem z blachy — dom w Zabrzu',
          caption: 'Garaż dwustanowiskowy z bramą segmentową',
        },
        {
          src: `${IMG}/ssz-okna-bok.webp`,
          alt: 'Boczna elewacja z oknami PCV Oknoplast — stan surowy zamknięty',
          caption: 'Okna Oknoplast w montażu Illbruck — widok z boku',
        },
        {
          src: `${IMG}/ssz-wejscie-garaz.webp`,
          alt: 'Widok na wejście i garaż — dom w Zabrzu w stanie surowym zamkniętym',
          caption: 'Elewacja frontowa z wejściem i garażem — okna dachowe VELUX',
        },
      ],
      expertInsight: {
        title: 'System montażu Illbruck — dlaczego to ważne?',
        content: [
          'Montaż okien w systemie Illbruck (lub równoważnym RAL) to trzy warstwy uszczelnienia: warstwa wewnętrzna (paroizolacyjna) chroni pianę PUR przed wilgocią z wnętrza, warstwa środkowa (piana PUR) izoluje termicznie i akustycznie, warstwa zewnętrzna (paroprzepuszczalna) odprowadza wilgoć na zewnątrz.',
          'Bez tego systemu piana montażowa degraduje się w 3–5 lat — traci właściwości izolacyjne, pojawiają się mostki termiczne i wilgoć w ościeżach. Koszt montażu RAL jest wyższy o ok. 30–50 zł/okno, ale gwarantuje szczelność przez cały okres użytkowania. Montaż stolarki to kluczowy etap przejścia ze stanu surowego otwartego do zamkniętego — szczegóły i koszty SSO znajdziesz w poradniku <a href="/baza-wiedzy/stan-surowy-otwarty-poradnik">Stan surowy otwarty - co zawiera?</a>.',
        ],
      },
      technicalFacts: [
        { label: 'Okna', value: 'Oknoplast PCV, trzyszybowe', icon: 'doorClosed' },
        { label: 'Montaż', value: 'System Illbruck (RAL)', icon: 'shieldCheck' },
        { label: 'Brama garażowa', value: 'Segmentowa, dwustanowiskowa', icon: 'doorClosed' },
        { label: 'Kolor', value: 'Antracyt zewn. / biały wewn.', icon: 'paintBrush' },
      ],
    },

    // ── ETAP 8: Instalacje wewnętrzne ───────────────────────────
    {
      id: 'instalacje',
      order: 8,
      title: 'Instalacje wewnętrzne — ogrzewanie, rekuperacja, inteligentny dom',
      icon: 'flame',
      dateLabel: 'Lipiec — Wrzesień 2025',
      duration: '10 tygodni',
      narrative: [
        'Etap instalacji to najbardziej złożony okres budowy — równolegle pracują ekipy hydraulików, elektryków, wentylatorów i automatyków. W tym domu zakres instalacji jest wyjątkowo szeroki: oprócz standardowych instalacji wod-kan i elektrycznych, wykonano ogrzewanie podłogowe na całej powierzchni, rekuperację mechaniczną oraz inteligentny dom w systemie LOXONE.',
        'Ogrzewanie podłogowe zasilane jest pompą ciepła powietrze-woda Buderus — wydajnym i ekologicznym źródłem ciepła. Na zdjęciach widać charakterystyczne niebieskie pętle rur PEX ułożone na matach systemowych z folią odbijającą ciepło, zabezpieczone taśmą dylatacyjną przy ścianach.',
        'System rekuperacji (wentylacji mechanicznej z odzyskiem ciepła) widoczny jest na zdjęciach jako niebieskie rury prowadzone pod stropem. Rekuperator odzyskuje ponad 90% ciepła z powietrza wywiewanego — w domu 200 m² to oszczędność 3 000–5 000 zł rocznie na ogrzewaniu.',
        'Tynki gipsowe maszynowe wykonano w pomieszczeniach suchych (salon, kuchnia, korytarz, sypialnie, garaż), natomiast w pomieszczeniach mokrych (kotłownia, łazienki) zastosowano tynki cementowe — bardziej odporne na wilgoć i stanowiące lepsze podłoże pod płytki.',
      ],
      images: [
        {
          src: `${IMG}/instalacje-salon-podlogowka.webp`,
          alt: 'Ogrzewanie podłogowe w salonie z rekuperacją — dom inteligentny w Zabrzu',
          caption: 'Salon — ogrzewanie podłogowe i rury rekuperacji pod stropem',
        },
        {
          src: `${IMG}/instalacje-salon-okna.webp`,
          alt: 'Salon z ogrzewaniem podłogowym i dużymi oknami tarasowymi',
          caption: 'Salon z widokiem na taras — podłogówka przed wylewką',
        },
        {
          src: `${IMG}/instalacje-sypialnia.webp`,
          alt: 'Ogrzewanie podłogowe w sypialni — rury PEX na macie systemowej',
          caption: 'Sypialnia — pętle ogrzewania podłogowego na folii odbijającej',
        },
        {
          src: `${IMG}/instalacje-lazienka-laser.webp`,
          alt: 'Łazienka z ogrzewaniem podłogowym i tynkiem cementowym — laser niwelacyjny',
          caption: 'Łazienka — tynk cementowy, podłogówka, kontrola laserowa poziomu',
        },
        {
          src: `${IMG}/instalacje-korytarz.webp`,
          alt: 'Korytarz z ogrzewaniem podłogowym i tynkami gipsowymi',
          caption: 'Korytarz — ogrzewanie podłogowe z rozdziałem stref grzewczych',
        },
        {
          src: `${IMG}/instalacje-rekuperacja-sypialnia.webp`,
          alt: 'Sypialnia z rekuperacją i ogrzewaniem podłogowym — widok na instalacje',
          caption: 'Sypialnia — rury rekuperacji pod sufitem i ogrzewanie podłogowe',
        },
      ],
      challenge: {
        title: 'Koordynacja 4 branż instalacyjnych jednocześnie',
        description:
          'Przy tak szerokim zakresie instalacji (wod-kan, CO podłogowe, elektryka z automatyką LOXONE, rekuperacja) kluczowa jest kolejność prac. Każda ekipa potrzebuje dostępu do tych samych ścian i podłóg — kolizje tras są nieuniknione bez starannego planowania.',
        solution:
          'Przed rozpoczęciem prac instalacyjnych przeprowadziliśmy spotkanie koordynacyjne wszystkich branż z naniesionymi trasami na rzut budynku. Kanalizacja grawitacyjna (brak elastyczności tras) miała priorytet, następnie CO podłogowe, elektryka z LOXONE i na końcu rekuperacja pod stropem.',
      },
      expertInsight: {
        title: 'System inteligentnego domu LOXONE — co daje?',
        content: [
          'LOXONE to system automatyki budynkowej, który integruje ogrzewanie, oświetlenie, rolety, alarm i multimedia w jednym panelu sterowania. W przeciwieństwie do „gadżetowych" rozwiązań smart home (np. Google Home), LOXONE działa lokalnie — bez chmury, bez opóźnień, bez ryzyka utraty dostępu.',
          'W tym domu LOXONE steruje strefami ogrzewania podłogowego (każdy pokój niezależnie), wentylacją mechaniczną (rekuperator dostosowuje obroty do jakości powietrza), oświetleniem i roletami. Koszt systemu to ok. 25 000–40 000 zł dla domu 200 m², ale oszczędności na energii zwracają inwestycję w 5–7 lat. Pompa ciepła, rekuperacja i LOXONE to elementy składające się na <a href="/baza-wiedzy/dom-energooszczedny-slask">dom energooszczędny</a> — więcej o tym w naszym przewodniku.',
        ],
      },
      technicalFacts: [
        { label: 'Ogrzewanie', value: 'Podłogowe + pompa ciepła Buderus', icon: 'flame' },
        { label: 'Wentylacja', value: 'Rekuperacja, odzysk 90%+', icon: 'wind' },
        { label: 'Automatyka', value: 'Inteligentny dom LOXONE', icon: 'zap' },
        { label: 'Tynki', value: 'Gipsowe (suche) + cementowe (mokre)', icon: 'paintBrush' },
      ],
    },
  ],

  midCTAs: [
    {
      afterStageOrder: 3,
      variant: 'calculator',
      headline: 'Ile kosztuje budowa domu 200 m²?',
      description:
        'Sprawdź orientacyjny koszt budowy domu parterowego z garażem w naszym kalkulatorze — wynik w 60 sekund.',
    },
    {
      afterStageOrder: 6,
      variant: 'consultation',
      headline: 'Planujesz budowę domu na Śląsku?',
      description:
        'Umów bezpłatną konsultację z naszym inżynierem. Omówimy Twój projekt, działkę i optymalną technologię.',
    },
  ],

  summary: {
    headline: 'Budowa w toku — trwają prace wykończeniowe',
    description: [
      'Realizacja domu przy ul. Gwiazdy Polarnej w Zabrzu przebiega zgodnie z harmonogramem. Od wykopu w październiku 2024 do stanu deweloperskiego we wrześniu 2025 — 11 miesięcy intensywnej pracy.',
      'Aktualnie trwają prace wykończeniowe: sufity z płyt kartonowo-gipsowych, elewacja z ociepleniem styropianowym (λ=0,031) i tynkiem Caparol z imitacją deski elewacyjnej. Planowane zakończenie budowy: zima 2025/2026.',
    ],
    stats: [
      { label: 'Powierzchnia', value: '~200 m\u00B2' },
      { label: 'Czas budowy', value: '12 miesięcy (plan)' },
      { label: 'Zaawansowanie', value: '~85%' },
      { label: 'Technologia', value: 'Ceramika + rąbek + LOXONE' },
    ],
  },

  faq: {
    header: {
      label: 'FAQ',
      title: 'Najczęściej zadawane pytania',
      description: 'Odpowiedzi na pytania dotyczące budowy domu parterowego 200 m² w Zabrzu.',
    },
    items: [
      {
        question: 'Ile kosztuje budowa domu 200 m² w stanie deweloperskim?',
        content: [
          {
            type: 'paragraph',
            value:
              'Koszt budowy domu parterowego 200 m² w stanie deweloperskim zależy od technologii, standardu materiałów i lokalizacji. Orientacyjny zakres to **650 000–900 000 zł netto** (bez działki). Sprawdź szczegółowy cennik dla regionu w naszym artykule o <a href="/obszar-dzialania/zabrze">budowie domu w Zabrzu</a> lub uzyskaj dokładną wycenę w [naszym kalkulatorze](/wycena) w 60 sekund.',
          },
        ],
      },
      {
        question: 'Dlaczego wybrano ceramikę szlifowaną zamiast silikatu czy betonu komórkowego?',
        content: [
          {
            type: 'paragraph',
            value:
              'Ceramika szlifowana łączy zalety obu materiałów: doskonałą akumulację cieplną (dom wolniej stygnie), wysoką nośność na ściskanie (10+ MPa), naturalną paroprzepuszczalność i bardzo dobrą izolację akustyczną. Murowanie na cienką spoinę (1–3 mm) eliminuje mostki termiczne.',
          },
        ],
      },
      {
        question: 'Czym jest blacha na rąbek stojący i dlaczego jest droższa?',
        content: [
          {
            type: 'paragraph',
            value:
              'Blacha na rąbek stojący to pokrycie dachowe formowane na miejscu z taśmy blacharskiej. Każdy arkusz jest ciągły — bez poprzecznych łączeń, co eliminuje ryzyko przecieków. Wymaga pełnego deskowania i doświadczonego blacharza, stąd wyższy koszt (o 30–50% vs blachodachówka), ale trwałość to 50+ lat.',
          },
        ],
      },
      {
        question: 'Czy system LOXONE jest opłacalny w domu jednorodzinnym?',
        content: [
          {
            type: 'paragraph',
            value:
              'System LOXONE kosztuje ok. 25 000–40 000 zł dla domu 200 m², ale inteligentne sterowanie ogrzewaniem, wentylacją i oświetleniem obniża rachunki o 20–30%. Przy rocznych kosztach energii ~8 000–12 000 zł, inwestycja zwraca się w 5–7 lat — a komfort użytkowania jest nieporównywalny od pierwszego dnia.',
          },
        ],
      },
      {
        question: 'Ile trwa budowa domu parterowego 200 m²?',
        content: [
          {
            type: 'paragraph',
            value:
              'Typowy czas budowy domu parterowego 200 m² to **10–14 miesięcy** od wykopu do stanu pod klucz. Stan surowy zamknięty osiągamy zwykle w 6–8 miesięcy. Na czas wpływają: warunki gruntowe, pogoda, dostępność materiałów i zakres instalacji (inteligentny dom wymaga więcej czasu na koordynację).',
          },
        ],
      },
    ],
  },

  relatedRealizations: [],
};
