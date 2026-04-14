/**
 * PRICING CONFIG — Kalkulator wyceny budowy domu
 *
 * Stawki per m² (netto) — addytywne komponenty.
 * Total = (fundamenty + piwnica + ściany + więźba + poziomy + SSZ_base + garaż + ogrzewanie) × m²
 *
 * Etapy budowy wg nomenklatury CoreLTB — grupują stawki do prezentacji:
 * 1. Stan Zero — fundamenty (z infrastrukturą) + piwnica (opcja)
 * 2. Stan Surowy Otwarty — ściany + więźba + poziomy
 * 3. Stan Surowy Zamknięty — okna, drzwi, instalacje (base) + garaż (opcja)
 * 4. Stan Deweloperski — ogrzewanie + tynki, wylewki, elewacja
 * 5. Pod klucz — wykończenie wnętrz
 *
 * Zasada: "brak" piwnicy/garażu = 0 zł. Koszty bazowe (kanalizacja,
 * hydroizolacja, okna, instalacje) są jawnie w stawkach fundamentów i SSZ.
 */

// ─── Types ──────────────────────────────────────────────

export type WallType = 'beton_komorkowy' | 'ceramika' | 'silikat';
export type RoofType = 'plaski' | 'dwuspadowy' | 'wielospadowy';
export type FloorType = 'parterowy' | 'poddasze' | 'pietrowy';
export type GarageType = 'brak' | 'jednostanowiskowy' | 'dwustanowiskowy';
export type FinishType = 'sso' | 'ssz' | 'deweloperski' | 'pod_klucz';
export type HeatingType = 'gazowe' | 'pompa_ciepla' | 'pelet';
export type FoundationType = 'plyta' | 'lawy';
export type BasementType = 'brak' | 'czesciowa' | 'cala';

export interface CalculatorConfig {
  area: number;
  floors: FloorType;
  wallType: WallType;
  roofType: RoofType;
  garage: GarageType;
  finish: FinishType;
  heating: HeatingType;
  foundation: FoundationType;
  basement: BasementType;
}

export interface StageBreakdown {
  label: string;
  description: string;
  /** Lista prac uwzględnionych w etapie (wyświetlana jako bullet points) */
  includedItems: string[];
  total: number;
}

export interface EstimateBreakdown {
  stages: StageBreakdown[];
  total: number;
  totalBrutto: number;
  czasRealizacji: { min: number; max: number };
  gwarancja: { konstrukcja: number; pozostale: number }; // miesiące
}

// ─── Stawki per m² (netto) ──────────────────────────────

const VAT = 0.08; // 8% VAT na budowę domów mieszkalnych

const TIME_BASE = { min: 10, max: 14 }; // miesiące dla ~140m²

/**
 * Fundamenty — zł/m²
 * Zawiera: fundament + kanalizacja podposadzkowa + hydroizolacja + podsypka + nadzór
 */
/**
 * Fundamenty — zł/m²
 * Zawiera: fundament + kanalizacja podposadzkowa + hydroizolacja + podsypka + nadzór
 */
const FOUNDATION_RATES: Record<FoundationType, number> = {
  plyta: 1200,
  lawy: 1000,
};

/** Ściany — zł/m² */
const WALL_RATES: Record<WallType, number> = {
  beton_komorkowy: 720,
  ceramika: 880,
  silikat: 1040,
};

/** Więźba dachowa — zł/m² */
const ROOF_RATES: Record<RoofType, number> = {
  plaski: 720,
  dwuspadowy: 640,
  wielospadowy: 800,
};

/** Poziomy domu — zł/m² */
const FLOOR_RATES: Record<FloorType, number> = {
  parterowy: 640,
  poddasze: 760,
  pietrowy: 960,
};

/**
 * Piwnica — zł/m² (dopłata)
 * Brak = 0 zł — nie wybierasz, nie płacisz.
 */
const BASEMENT_RATES: Record<BasementType, number> = {
  brak: 0,
  czesciowa: 200,
  cala: 400,
};

/** Ogrzewanie — zł/m² */
const HEATING_RATES: Record<HeatingType, number> = {
  pompa_ciepla: 720,
  gazowe: 560,
  pelet: 640,
};

/**
 * SSZ base — zł/m²
 * Okna, drzwi zewnętrzne, instalacje elektryczne i wod-kan, parapety.
 * Zawsze wchodzi w SSZ niezależnie od garażu.
 */
const SSZ_BASE_RATE = 400;

/**
 * Garaż — zł/m² (dopłata)
 * Brak = 0 zł — nie wybierasz, nie płacisz.
 */
const GARAGE_RATES: Record<GarageType, number> = {
  brak: 0,
  jednostanowiskowy: 200,
  dwustanowiskowy: 400,
};

// ─── Calculator ─────────────────────────────────────────

export function calculateEstimate(config: CalculatorConfig): EstimateBreakdown {
  const { area, floors, wallType, roofType, garage, finish, heating, foundation, basement } = config;

  const stages: StageBreakdown[] = [];

  // ─── 1. STAN ZERO (fundamenty + piwnica) ───
  {
    const rate = FOUNDATION_RATES[foundation] + BASEMENT_RATES[basement];
    const total = Math.round(area * rate);

    const foundationName = foundation === 'plyta'
      ? 'Płyta fundamentowa żelbetowa z izolacją'
      : 'Ławy fundamentowe żelbetowe z izolacją';

    const items: string[] = [
      'Kierownik Budowy i Inżynier Budowy',
      'Geodeta — wytyczenie obiektu',
      'Geotechnik — badanie gruntu',
      foundationName,
      'Kanalizacja podposadzkowa',
      'Hydroizolacja fundamentów',
      'Podsypka piaskowo-żwirowa (podbudowa)',
    ];

    if (basement !== 'brak') {
      items.push(
        basement === 'cala'
          ? 'Piwnica pod całym domem — ściany, izolacja, schody'
          : 'Piwnica pod częścią domu — ściany, izolacja, schody'
      );
    }

    stages.push({
      label: 'Stan Zero',
      description: 'Fundamenty, kanalizacja podposadzkowa oraz nadzór budowlany.',
      includedItems: items,
      total,
    });
  }

  // ─── 2. STAN SUROWY OTWARTY (ściany + więźba + poziomy) ───
  {
    const rate = WALL_RATES[wallType] + ROOF_RATES[roofType] + FLOOR_RATES[floors];
    const total = Math.round(area * rate);

    const roofName = roofType === 'plaski'
      ? 'Dach płaski z membraną PVC'
      : roofType === 'dwuspadowy'
        ? 'Dach dwuspadowy — konstrukcja drewniana'
        : 'Dach wielospadowy — konstrukcja drewniana z obróbkami';

    const wallName = wallType === 'beton_komorkowy'
      ? 'Ściany z bloczków betonu komórkowego (H+H / Ytong / Solbet)'
      : wallType === 'ceramika'
        ? 'Ściany z pustaków ceramicznych szlifowanych'
        : 'Ściany z bloczków silikatowych';

    const items: string[] = [
      wallName,
      'Ściany działowe z bloczków betonu komórkowego 12 cm',
    ];

    if (floors === 'pietrowy' || floors === 'poddasze') {
      items.push('Strop monolityczny żelbetowy');
    }

    items.push(
      roofName,
      roofType !== 'plaski' ? 'Dachówka betonowa z obróbkami blacharskimi' : 'Membrana PVC / papa termozgrzewalna',
      'Rynny i rury spustowe PCV',
      'Wyłaz strychowy',
      'Kominy izolowane (spalinowy + wentylacyjny)',
      'Piana PUR — ocieplenie dachu od wewnątrz',
      'Podbitka dachowa',
    );

    stages.push({
      label: 'Stan Surowy Otwarty',
      description: 'Ściany konstrukcyjne i działowe, strop, więźba dachowa, pokrycie dachu, kominy i ocieplenie dachu.',
      includedItems: items,
      total,
    });
  }

  // ─── 3. STAN SUROWY ZAMKNIĘTY (okna/drzwi/instalacje + garaż) ───
  if (finish === 'ssz' || finish === 'deweloperski' || finish === 'pod_klucz') {
    const rate = SSZ_BASE_RATE + GARAGE_RATES[garage];
    const total = Math.round(area * rate);

    const items: string[] = [
      'Okna PCV trzyszybowe (Oknoplast / Krispol / Eko-Okna)',
      'Instalacja Elektryczna — kompletna z rozdzielnią',
      'Instalacja Wod-Kan — kompletna',
      'Drzwi zewnętrzne antywłamaniowe Gerda',
      'Parapety wewnętrzne i zewnętrzne',
    ];

    if (garage !== 'brak') {
      items.push(
        garage === 'jednostanowiskowy'
          ? 'Garaż jednostanowiskowy'
          : 'Garaż dwustanowiskowy'
      );
    }

    stages.push({
      label: 'Stan Surowy Zamknięty',
      description: 'Montaż stolarki okiennej i drzwiowej, instalacje wewnętrzne oraz garaż.',
      includedItems: items,
      total,
    });
  }

  // ─── 4. STAN DEWELOPERSKI (ogrzewanie) — jeśli wybrany ───
  if (finish === 'deweloperski' || finish === 'pod_klucz') {
    const rate = HEATING_RATES[heating];
    const total = Math.round(area * rate);

    const heatingName = heating === 'gazowe'
      ? 'Ogrzewanie gazowe — kocioł kondensacyjny + podłogówka'
      : heating === 'pompa_ciepla'
        ? 'Pompa ciepła powietrze-woda + ogrzewanie podłogowe'
        : 'Ogrzewanie na pelet — kocioł z podajnikiem + podłogówka';

    stages.push({
      label: 'Stan Deweloperski',
      description: 'Ogrzewanie, tynki, wylewki, elewacja z ociepleniem — dom gotowy do wykończenia wnętrz.',
      includedItems: [
        'Wentylacja grawitacyjna',
        heatingName,
        'Tynki gipsowe maszynowe (Knauf / Baumit)',
        'Izolacja posadzki — styropian EPS 150',
        'Jastrych cementowy zbrojony',
        'Sufity podwieszane z płyt GK na ruszcie',
        'Styropian EPS fasadowy λ=0,031 — ocieplenie ścian',
        'Tynk silikatowy zewnętrzny z obróbką cokołu (Baumit / KABE)',
      ],
      total,
    });
  }

  // ─── 5. POD KLUCZ — jeśli wybrany ───
  if (finish === 'pod_klucz') {
    const rate = 680;
    const total = Math.round(area * rate);

    stages.push({
      label: 'Wykończenie pod klucz',
      description: 'Kompletne wykończenie wnętrz — dom gotowy do zamieszkania.',
      includedItems: [
        'Podłogi — panele laminowane / gres (klasa użytkowa AC4+)',
        'Glazura i terakota — łazienki i kuchnia',
        'Malowanie ścian i sufitów (2 warstwy, farba lateksowa)',
        'Biały montaż łazienkowy (umywalka, WC, prysznic/wanna, baterie)',
        'Drzwi wewnętrzne z ościeżnicą regulowaną',
      ],
      total,
    });
  }

  // ─── Totals ───
  const totalNetto = stages.reduce((s, st) => s + st.total, 0);
  const totalBrutto = Math.round(totalNetto * (1 + VAT));

  const timeScale = area / 140;
  const finishTimeAdd = finish === 'pod_klucz' ? 3 : finish === 'deweloperski' ? 1 : 0;
  const basementTimeAdd = basement === 'cala' ? 2 : basement === 'czesciowa' ? 1 : 0;
  const timeMin = Math.round(TIME_BASE.min * Math.sqrt(timeScale)) + finishTimeAdd + basementTimeAdd;
  const timeMax = Math.round(TIME_BASE.max * Math.sqrt(timeScale)) + finishTimeAdd + basementTimeAdd;

  return {
    stages,
    total: totalNetto,
    totalBrutto,
    czasRealizacji: { min: timeMin, max: timeMax },
    gwarancja: { konstrukcja: 120, pozostale: 60 },
  };
}

// ─── Labels ─────────────────────────────────────────────

export const WALL_LABELS: Record<WallType, string> = {
  beton_komorkowy: 'Beton komórkowy',
  ceramika: 'Ceramika szlifowana',
  silikat: 'Bloczek silikatowy',
};

export const ROOF_LABELS: Record<RoofType, string> = {
  plaski: 'Płaski',
  dwuspadowy: 'Dwuspadowy',
  wielospadowy: 'Wielospadowy',
};

export const FLOOR_LABELS: Record<FloorType, string> = {
  parterowy: 'Parterowy',
  poddasze: 'Z poddaszem użytkowym',
  pietrowy: 'Piętrowy',
};

export const GARAGE_LABELS: Record<GarageType, string> = {
  brak: 'Brak',
  jednostanowiskowy: 'Jedno\u00ADstanowiskowy',
  dwustanowiskowy: 'Dwu\u00ADstanowiskowy',
};

export const FINISH_LABELS: Record<FinishType, string> = {
  sso: 'Stan surowy otwarty',
  ssz: 'Stan surowy zamknięty',
  deweloperski: 'Stan deweloperski',
  pod_klucz: 'Pod klucz',
};

export const HEATING_LABELS: Record<HeatingType, string> = {
  gazowe: 'Ogrzewanie gazowe',
  pompa_ciepla: 'Pompa ciepła',
  pelet: 'Ogrzewanie na pelet',
};

export const FOUNDATION_LABELS: Record<FoundationType, string> = {
  plyta: 'Płyta fundamentowa',
  lawy: 'Ławy fundamentowe',
};

export const BASEMENT_LABELS: Record<BasementType, string> = {
  brak: 'Brak',
  czesciowa: 'Pod częścią domu',
  cala: 'Pod całym domem',
};
