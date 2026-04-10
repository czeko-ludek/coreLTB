/**
 * REALIZACJE — Shared Expert Content Library
 * Pre-written expert insights and technical facts per build stage.
 * Used to enrich brief descriptions from the construction manager.
 */

import type { ExpertInsight, TechnicalFact } from './types';
import type { IconName } from '@/components/ui/Icon';

interface StageDefaults {
  icon: IconName;
  defaultExpertInsight: ExpertInsight;
  defaultTechnicalFacts: TechnicalFact[];
}

export const STAGE_LIBRARY: Record<string, StageDefaults> = {
  'roboty-ziemne': {
    icon: 'tractor',
    defaultExpertInsight: {
      title: 'Dlaczego badanie geotechniczne jest obowiazkiem inwestora?',
      content: [
        'Prawo budowlane (art. 34 ust. 3 pkt 4) wymaga opinii geotechnicznej jako zalacznika do projektu budowlanego. Bez niej nie otrzymasz pozwolenia na budowe.',
        'Na Slasku szczegolnie istotne sa kategorie szkod gorniczych -- w strefach III-V konieczne jest wzmocnione zbrojenie fundamentow i specjalne dylatacje. Badanie geotechniczne okresla nosnosc gruntu, poziom wod gruntowych i ewentualne zaleganie nasypow niebudowlanych.',
      ],
      linkTo: '/baza-wiedzy/plyta-fundamentowa-tereny-gornicze',
      linkLabel: 'Wiecej o fundamentach na terenach gorniczych',
    },
    defaultTechnicalFacts: [
      { label: 'Typowy czas', value: '3-7 dni', icon: 'clock' },
      { label: 'Sprzet', value: 'Koparka gasienicowa', icon: 'tractor' },
      { label: 'Glebokosc', value: '0.8-1.5 m (zaleznie od projektu)', icon: 'layers' },
    ],
  },

  'fundamenty': {
    icon: 'layers',
    defaultExpertInsight: {
      title: 'Plyta fundamentowa czy lawy -- kiedy co wybrac?',
      content: [
        'Lawy fundamentowe to klasyczne rozwiazanie, tansze o 15-25% od plyty. Sprawdzaja sie na gruntach nosnych (piasek, glina zwarta) z niskim poziomem wod gruntowych.',
        'Plyta fundamentowa jest wymagana na gruntach slabych, terenach gorniczych (kat. III+) i przy wysokim poziomie wod gruntowych. Daje rowniez lepsza izolacje termiczna i moze sluzyc jako gotowa podloga parteru.',
      ],
      linkTo: '/baza-wiedzy/plyta-fundamentowa-tereny-gornicze',
      linkLabel: 'Poradnik: plyta fundamentowa na terenach gorniczych',
    },
    defaultTechnicalFacts: [
      { label: 'Typowy czas', value: '2-4 tygodnie', icon: 'clock' },
      { label: 'Beton', value: 'C20/25 lub C25/30', icon: 'box' },
      { label: 'Zbrojenie', value: 'Stal B500SP', icon: 'ruler' },
    ],
  },

  'sciany-parteru': {
    icon: 'brickWall',
    defaultExpertInsight: {
      title: 'Silikat, ceramika czy beton komorkowy?',
      content: [
        'Bloczki silikatowe (np. Silka) to nasz standard -- oferuja najlepsza akumulacje cieplna, doskonala izolacje akustyczna (Rw 50+ dB) i wysoka nosnosc. Sa ciezsze niz beton komorkowy, co wymaga solidniejszych fundamentow, ale daja trwalsze sciany.',
        'Ceramika poryzowana (np. Porotherm) to kompromis -- lzejsza od silikatu, lepsza termicznie, ale mniej wytrzymala mechanicznie. Beton komorkowy (np. Ytong) jest najlzejszy i najszybszy w murowaniu, ale wymaga staranniejszego zbrojenia i tynkowania.',
      ],
    },
    defaultTechnicalFacts: [
      { label: 'Typowy czas', value: '3-5 tygodni', icon: 'clock' },
      { label: 'Material', value: 'Bloczki silikatowe', icon: 'brickWall' },
      { label: 'Grubosc sciany', value: '24 cm + ocieplenie', icon: 'ruler' },
    ],
  },

  'strop-wieniec': {
    icon: 'columns3',
    defaultExpertInsight: {
      title: 'Strop monolityczny vs prefabrykowany -- co lepsze?',
      content: [
        'Strop monolityczny (wylewany na mokro) daje pelna swobode projektowa -- dowolne rozpietosci, otwory, podcienia. Jest drogi w wykonaniu, ale niezastapiony przy nietypowych rzutach.',
        'Strop gestozemowy (Teriva, Smart) to standard w budownictwie jednorodzinnym -- szybki montaz, nizsza cena, wystarczajaca nosnosc do 6m rozpietosci. Wieniec zelbetowy spinajacy sciany na szczycie jest obowiazkowy niezaleznie od typu stropu.',
      ],
    },
    defaultTechnicalFacts: [
      { label: 'Typowy czas', value: '1-2 tygodnie', icon: 'clock' },
      { label: 'Typ', value: 'Gestozemowy lub monolityczny', icon: 'layers' },
      { label: 'Nosnosc', value: '3.5-5.0 kN/m2', icon: 'ruler' },
    ],
  },

  'wiezba-dachowa': {
    icon: 'triangle',
    defaultExpertInsight: {
      title: 'Wiezba tradycyjna czy kratownicowa?',
      content: [
        'Wiezba tradycyjna (krokwiowo-platkowa) pozwala na wykorzystanie poddasza jako uzytkowego -- pelna wysokosc pomieszczen, mozliwosc wstawienia okien dachowych. Wymaga doswiadczonej ekipy ciesielskiej.',
        'Kratownice prefabrykowane montuje sie szybciej (1-2 dni vs tydzien), sa tansze, ale poddasze pozostaje nieuzyteczne. Idealny wybor dla domow parterowych bez poddasza uzytkowego.',
      ],
    },
    defaultTechnicalFacts: [
      { label: 'Typowy czas', value: '1-2 tygodnie', icon: 'clock' },
      { label: 'Drewno', value: 'Sosna C24, impregnowana', icon: 'tree' },
      { label: 'Kat nachylenia', value: '30-45 stopni', icon: 'triangle' },
    ],
  },

  'pokrycie-dachu': {
    icon: 'home',
    defaultExpertInsight: {
      title: 'Dachowka ceramiczna, betonowa czy blachodachowka?',
      content: [
        'Dachowka ceramiczna to najtrwalsza opcja (50+ lat), odporna na UV i mrozy. Jest najciezsza -- wymaga mocniejszej wiezby, ale doskonale tlumi deszcz i wiatr.',
        'Blachodachowka to kompromis -- lekka, szybka w montazu, 30+ lat trwalosci. Wymaga dobrej membrany pod spodem (paroprzepuszczalnej), bo przy cienkim pokryciu rosnie ryzyko kondensacji.',
      ],
    },
    defaultTechnicalFacts: [
      { label: 'Typowy czas', value: '1-2 tygodnie', icon: 'clock' },
      { label: 'Material', value: 'Dachowka lub blachodachowka', icon: 'home' },
    ],
  },

  'stolarka-okienna': {
    icon: 'doorClosed',
    defaultExpertInsight: {
      title: 'Na co zwrocic uwage przy wyborze okien?',
      content: [
        'Kluczowy parametr to wspolczynnik przenikania ciepla Uw -- od 2021 r. wymagany jest max. 0.9 W/m2K. Dobre okna trzyszybowe osiagaja 0.7-0.8 W/m2K.',
        'Rownie wazny jest montaz -- nawet najlepsze okno zle zamontowane bedzie przeciekac i przemarzac. Stosujemy montaz trjwarstwowy (piana + tasma paroprzepuszczalna wewnatrz + paroszczelna na zewnatrz) zgodny z wytycznymi RAL.',
      ],
    },
    defaultTechnicalFacts: [
      { label: 'Parametr Uw', value: '0.7-0.9 W/m2K', icon: 'thermometerSnowflake' },
      { label: 'Montaz', value: 'Trzywarstwowy (RAL)', icon: 'shieldCheck' },
    ],
  },

  'instalacje': {
    icon: 'plug',
    defaultExpertInsight: {
      title: 'Kolejnosc instalacji -- dlaczego to wazne?',
      content: [
        'Instalacje wykonujemy w scisle okreslonej kolejnosci: najpierw kanalizacja (bo jest grawitacyjna i nie da sie jej poprowadzic "gdziekolwiek"), potem woda, centralka ogrzewania, elektryka i na koncu wentylacja.',
        'Kazda instalacja wymaga osobnych prób szczelnosci i protokolow odbioru. To dokumenty niezbedne do uzyskania pozwolenia na uzytkowanie.',
      ],
    },
    defaultTechnicalFacts: [
      { label: 'Typowy czas', value: '3-5 tygodni', icon: 'clock' },
      { label: 'Zakres', value: 'Wod-kan, CO, elektryka, wentylacja', icon: 'plug' },
    ],
  },

  'tynki-elewacja': {
    icon: 'paintBrush',
    defaultExpertInsight: {
      title: 'Ocieplenie -- styropian czy welna?',
      content: [
        'Styropian grafitowy (EPS 031-033) to standard na sciany -- tanszy, latwiejszy w montazu, nie nasiaka woda. Grubosc 15-20 cm spelnia normy WT 2021.',
        'Welna mineralna jest lepsza pozarowo (niepalna, klasa A1) i paroprzepuszczalna. Obowiazkowa przy scianach drewnianych i szkieletowych. Drozsza o 30-40% od styropianu.',
      ],
    },
    defaultTechnicalFacts: [
      { label: 'Typowy czas', value: '3-6 tygodni', icon: 'clock' },
      { label: 'Ocieplenie', value: '15-20 cm styropianu', icon: 'thermometerSnowflake' },
      { label: 'Tynk', value: 'Silikonowy lub silikatowy', icon: 'paintBrush' },
    ],
  },

  'wykonczenie': {
    icon: 'keyRound',
    defaultExpertInsight: {
      title: 'Stan deweloperski vs pod klucz -- roznice',
      content: [
        'Stan deweloperski obejmuje tynki wewnetrzne, wylewki, bialy montaz lazienek (bez plytki, bez armatury), instalacje gotowe do podlaczenia. Inwestor sam wykonczauje wnetrza.',
        'Stan pod klucz to pelne wykonczenie -- podlogi, plytki, malowanie, bialy montaz, kuchnia, drzwi wewnetrzne. Inwestor wchodzi z meblami. Roznica kosztowa to 800-1500 zl/m2.',
      ],
      linkTo: '/oferta/kompleksowa-budowa-domow',
      linkLabel: 'Porownaj standardy wykonczenia',
    },
    defaultTechnicalFacts: [
      { label: 'Typowy czas', value: '2-4 miesiace', icon: 'clock' },
      { label: 'Zakres', value: 'Tynki, wylewki, podlogi, malowanie', icon: 'paintBrush' },
    ],
  },
};

/** Get defaults for a stage ID, or return generic fallback */
export function getStageDefaults(stageId: string): StageDefaults {
  return STAGE_LIBRARY[stageId] || {
    icon: 'hammer' as IconName,
    defaultExpertInsight: {
      title: 'Wiedza ekspercka',
      content: ['Szczegolowe informacje dostepne po kontakcie z naszym inzynierem.'],
    },
    defaultTechnicalFacts: [],
  };
}
