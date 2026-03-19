/**
 * PRICING CONFIG — Kalkulator wyceny budowy domu
 *
 * Ceny oparte na rzeczywistych wycenach CoreLTB Builders (Śląsk/Małopolska, 2026).
 * Referencja: Wycena_5199 — 114 m² parterowy → ~790k netto (deweloperski)
 *
 * Format wyceny: etapy z ceną ryczałtową + lista prac (bez rozbicia na materiały/robociznę).
 *
 * Etapy budowy wg nomenklatury CoreLTB:
 * 1. Stan Zero (fundamenty, prace ziemne, kanalizacja podposadzkowa)
 * 2. Stan Surowy Otwarty (ściany, strop, dach, kominy, ocieplenie dachu)
 * 3. Stan Surowy Zamknięty (stolarka okienna/drzwiowa, instalacje)
 * 4. Stan Deweloperski (tynki, wylewki, elewacja, ogrzewanie, rekuperacja)
 * 5. Pod klucz (podłogi, glazura, malowanie, biały montaż)
 */

// ─── Types ──────────────────────────────────────────────

export type WallType = 'beton_komorkowy' | 'ceramika' | 'silikat';
export type RoofType = 'plaski' | 'dwuspadowy' | 'wielospadowy';
export type FloorType = 'parterowy' | 'poddasze' | 'pietrowy';
export type GarageType = 'brak' | 'jednostanowiskowy' | 'dwustanowiskowy';
export type FinishType = 'sso' | 'deweloperski' | 'pod_klucz';
export type HeatingType = 'gazowe' | 'pompa_ciepla' | 'elektryczne';

export interface CalculatorConfig {
  area: number;
  floors: FloorType;
  wallType: WallType;
  roofType: RoofType;
  garage: GarageType;
  finish: FinishType;
  heating: HeatingType;
}

export interface StageBreakdown {
  label: string;
  description: string;
  /** Lista prac uwzględnionych w etapie (wyświetlana jako bullet points) */
  includedItems: string[];
  total: { min: number; max: number };
}

export interface EstimateBreakdown {
  stages: StageBreakdown[];
  garaz: { min: number; max: number };
  total: { min: number; max: number };
  totalBrutto: { min: number; max: number };
  rabat: number; // % rabatu
  totalPoRabacie: { min: number; max: number };
  totalPoRabacieBrutto: { min: number; max: number };
  czasRealizacji: { min: number; max: number };
  gwarancja: { konstrukcja: number; pozostale: number }; // miesiące
}

// ─── Pricing Data ───────────────────────────────────────

const SPREAD = 0.06; // ±6% zakres
const VAT = 0.08; // 8% VAT na budowę domów mieszkalnych
const RABAT = 0.08; // 8% standardowy rabat

const TIME_BASE = { min: 10, max: 14 }; // miesiące dla ~140m²

/**
 * Bazowe stawki per m² (netto) — kalibrowane na wycenie 114m² parterowy deweloperski = ~790k
 *
 * Referencja (Wycena 5199, 114m²):
 * Stan Zero:         202 133 zł → ~1 773 zł/m²
 * Stan Surowy Otwarty: 291 948 zł → ~2 561 zł/m²
 * Stan Surowy Zamknięty: 108 403 zł → ~951 zł/m²
 * Stan Deweloperski:  251 297 zł → ~2 204 zł/m²
 * TOTAL:             853 781 zł → ~6 935 zł/m² (deweloperski, ze wszystkim)
 */
const BASE_RATES_PER_M2 = {
  stanZero: 1773,
  sso: 2561,
  ssz: 951,
  deweloperski: 2204,
  podKlucz: 850, // wykończenie pod klucz (podłogi, glazura, biały montaż, malowanie)
};

/** Modyfikatory za typ kondygnacji (wpływ na koszty konstrukcji) */
const FLOOR_MODIFIERS: Record<FloorType, { stanZero: number; sso: number; ssz: number }> = {
  parterowy: { stanZero: 1.0, sso: 1.0, ssz: 1.0 },
  poddasze: { stanZero: 0.85, sso: 1.12, ssz: 1.05 },
  pietrowy: { stanZero: 0.8, sso: 1.18, ssz: 1.08 },
};

/** Modyfikatory za typ ścian */
const WALL_MODIFIERS: Record<WallType, number> = {
  beton_komorkowy: 1.0,
  ceramika: 1.06,
  silikat: 0.95,
};

/** Modyfikatory za typ dachu */
const ROOF_MODIFIERS: Record<RoofType, number> = {
  plaski: 0.88,
  dwuspadowy: 1.0,
  wielospadowy: 1.15,
};

/** Modyfikator ogrzewania (wpływ na etap deweloperski) */
const HEATING_MODIFIERS: Record<HeatingType, number> = {
  gazowe: 1.0,
  pompa_ciepla: 1.12,
  elektryczne: 0.92,
};

/** Koszt garażu (ryczałt, netto) */
const GARAGE_COST: Record<GarageType, { min: number; max: number }> = {
  brak: { min: 0, max: 0 },
  jednostanowiskowy: { min: 38000, max: 52000 },
  dwustanowiskowy: { min: 62000, max: 82000 },
};

// ─── Calculator ─────────────────────────────────────────

export function calculateEstimate(config: CalculatorConfig): EstimateBreakdown {
  const { area, floors, wallType, roofType, garage, finish, heating } = config;

  const floorMod = FLOOR_MODIFIERS[floors];
  const wallMod = WALL_MODIFIERS[wallType];
  const roofMod = ROOF_MODIFIERS[roofType];
  const heatingMod = HEATING_MODIFIERS[heating];

  const stages: StageBreakdown[] = [];

  // ─── 1. STAN ZERO ───
  {
    const base = area * BASE_RATES_PER_M2.stanZero * floorMod.stanZero;
    const total = Math.round(base);

    stages.push({
      label: 'Stan Zero',
      description: 'Prace ziemne, fundamenty, kanalizacja podposadzkowa oraz nadzór budowlany.',
      includedItems: [
        'Kierownik Budowy i Inżynier Budowy',
        'Geodeta — wytyczenie obiektu',
        'Geotechnik — badanie gruntu',
        'Kanalizacja Podposadzkowa',
        'Płyta Fundamentowa żelbetowa z izolacją',
        'Prace Ziemne — wykopy, niwelacja, zagęszczanie',
        'Hydroizolacja fundamentów',
        'Podsypka piaskowo-żwirowa (podbudowa)',
      ],
      total: spreadRange(total),
    });
  }

  // ─── 2. STAN SUROWY OTWARTY ───
  {
    const base = area * BASE_RATES_PER_M2.sso * floorMod.sso * wallMod * roofMod;
    const total = Math.round(base);

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
      total: spreadRange(total),
    });
  }

  // ─── 3. STAN SUROWY ZAMKNIĘTY ───
  {
    const base = area * BASE_RATES_PER_M2.ssz * floorMod.ssz;
    const total = Math.round(base);

    stages.push({
      label: 'Stan Surowy Zamknięty',
      description: 'Montaż stolarki okiennej i drzwiowej oraz kompletne instalacje wewnętrzne.',
      includedItems: [
        'Okna PCV trzyszybowe (Oknoplast / Krispol / Eko-Okna)',
        'Instalacja Elektryczna — kompletna z rozdzielnią',
        'Instalacja Wod-Kan — kompletna',
        'Drzwi zewnętrzne antywłamaniowe Gerda',
        'Parapety wewnętrzne i zewnętrzne',
      ],
      total: spreadRange(total),
    });
  }

  // ─── 4. STAN DEWELOPERSKI (jeśli wybrany) ───
  if (finish === 'deweloperski' || finish === 'pod_klucz') {
    const base = area * BASE_RATES_PER_M2.deweloperski * heatingMod;
    const total = Math.round(base);

    const heatingName = heating === 'gazowe'
      ? 'Ogrzewanie gazowe — kocioł kondensacyjny + podłogówka'
      : heating === 'pompa_ciepla'
        ? 'Pompa ciepła powietrze-woda + ogrzewanie podłogowe'
        : 'Ogrzewanie elektryczne — grzejniki + podłogówka';

    stages.push({
      label: 'Stan Deweloperski',
      description: 'Kompletne instalacje, tynki, wylewki, elewacja z ociepleniem — dom gotowy do wykończenia wnętrz.',
      includedItems: [
        'Rekuperacja — centrala z kanałami i anemostatami',
        heatingName,
        'Tynki gipsowe maszynowe (Knauf / Baumit)',
        'Izolacja posadzki — styropian EPS 150',
        'Jastrych cementowy zbrojony',
        'Sufity podwieszane z płyt GK na ruszcie',
        'Styropian EPS fasadowy λ=0,031 — ocieplenie ścian',
        'Tynk silikatowy zewnętrzny z obróbką cokołu (Baumit / KABE)',
      ],
      total: spreadRange(total),
    });
  }

  // ─── 5. POD KLUCZ (jeśli wybrany) ───
  if (finish === 'pod_klucz') {
    const base = area * BASE_RATES_PER_M2.podKlucz;
    const total = Math.round(base);

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
      total: spreadRange(total),
    });
  }

  // ─── Totals ───
  const garageCost = GARAGE_COST[garage || 'brak'];
  const stagesSum = stages.reduce((s, st) => s + (st.total.min + st.total.max) / 2, 0);
  const totalBase = stagesSum + (garageCost.min + garageCost.max) / 2;

  const totalNetto = { min: round5k(totalBase * (1 - SPREAD)), max: round5k(totalBase * (1 + SPREAD)) };
  const totalBrutto = { min: Math.round(totalNetto.min * (1 + VAT)), max: Math.round(totalNetto.max * (1 + VAT)) };
  const totalPoRabacie = { min: round5k(totalNetto.min * (1 - RABAT)), max: round5k(totalNetto.max * (1 - RABAT)) };
  const totalPoRabacieBrutto = { min: Math.round(totalPoRabacie.min * (1 + VAT)), max: Math.round(totalPoRabacie.max * (1 + VAT)) };

  const timeScale = area / 140;
  const finishTimeAdd = finish === 'pod_klucz' ? 3 : finish === 'deweloperski' ? 1 : 0;
  const timeMin = Math.round(TIME_BASE.min * Math.sqrt(timeScale)) + finishTimeAdd;
  const timeMax = Math.round(TIME_BASE.max * Math.sqrt(timeScale)) + finishTimeAdd;

  return {
    stages,
    garaz: garageCost,
    total: totalNetto,
    totalBrutto,
    rabat: RABAT,
    totalPoRabacie,
    totalPoRabacieBrutto,
    czasRealizacji: { min: timeMin, max: timeMax },
    gwarancja: { konstrukcja: 120, pozostale: 60 },
  };
}

function spreadRange(value: number): { min: number; max: number } {
  return {
    min: round1k(value * (1 - SPREAD)),
    max: round1k(value * (1 + SPREAD)),
  };
}

function round1k(n: number): number {
  return Math.round(n / 1000) * 1000;
}

function round5k(n: number): number {
  return Math.round(n / 5000) * 5000;
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
  deweloperski: 'Stan deweloperski',
  pod_klucz: 'Pod klucz',
};

export const HEATING_LABELS: Record<HeatingType, string> = {
  gazowe: 'Ogrzewanie gazowe',
  pompa_ciepla: 'Pompa ciepła',
  elektryczne: 'Ogrzewanie elektryczne',
};
