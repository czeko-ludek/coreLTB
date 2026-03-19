/**
 * PRICING CONFIG — Kalkulator wyceny budowy domu
 *
 * Uśrednione ceny rynkowe (Śląsk/Małopolska, 2026).
 * TODO: Zastąpić dokładnymi danymi CoreLTB po konsultacji z Dawidem.
 *
 * Każdy etap rozbity na: materiały (z ilościami), robocizna, sprzęt/transport.
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

export interface MaterialItem {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number; // zł/unit
  total: number;
}

export interface StageBreakdown {
  label: string;
  materials: MaterialItem[];
  robocizna: number;
  sprzet: number;
  total: { min: number; max: number };
}

export interface EstimateBreakdown {
  stages: StageBreakdown[];
  garaz: { min: number; max: number };
  total: { min: number; max: number };
  czasRealizacji: { min: number; max: number };
  materialTotal: number;
  robociznaTotal: number;
  sprzetTotal: number;
}

// ─── Pricing Data ───────────────────────────────────────

const SPREAD = 0.08;
const TIME_BASE = { min: 10, max: 14 };

/** Koszt garażu (ryczałt, netto) */
const GARAGE_COST: Record<GarageType, { min: number; max: number }> = {
  brak: { min: 0, max: 0 },
  jednostanowiskowy: { min: 38000, max: 52000 },
  dwustanowiskowy: { min: 62000, max: 82000 },
};

/** Modyfikatory standardu wykończenia — wpływa na instalacje i wykończenie */
const FINISH_MODIFIERS: Record<FinishType, { instalacje: number; wykonczenie: number }> = {
  sso: { instalacje: 0.0, wykonczenie: 0.0 },
  deweloperski: { instalacje: 1.0, wykonczenie: 0.6 },
  pod_klucz: { instalacje: 1.0, wykonczenie: 1.0 },
};

/** Modyfikatory ogrzewania — wpływa na koszt instalacji */
const HEATING_COST_PER_M2: Record<HeatingType, number> = {
  gazowe: 180,
  pompa_ciepla: 320,
  elektryczne: 120,
};

/** Dane materiałów ściennych */
const WALL_DATA: Record<WallType, { name: string; perM2: number; unit: string; unitPrice: number }> = {
  beton_komorkowy: { name: 'Bloczek z betonu komórkowego', perM2: 8, unit: 'szt', unitPrice: 12 },
  ceramika: { name: 'Pustak ceramiczny szlifowany', perM2: 16, unit: 'szt', unitPrice: 8.5 },
  silikat: { name: 'Bloczek silikatowy', perM2: 12, unit: 'szt', unitPrice: 7 },
};

/** Dane materiałów dachowych */
const ROOF_DATA: Record<RoofType, { multiplier: number; materialName: string; unitPrice: number }> = {
  plaski: { multiplier: 0.85, materialName: 'Membrana PVC / papa termozgrzewalna', unitPrice: 95 },
  dwuspadowy: { multiplier: 1.0, materialName: 'Blachodachówka + membrana', unitPrice: 75 },
  wielospadowy: { multiplier: 1.25, materialName: 'Blachodachówka + membrana + obróbki', unitPrice: 90 },
};

// ─── Calculator ─────────────────────────────────────────

export function calculateEstimate(config: CalculatorConfig): EstimateBreakdown {
  const { area, floors, wallType, roofType, garage, finish, heating } = config;

  // Współczynniki geometryczne
  const isParterowy = floors === 'parterowy';
  const isPietrowy = floors === 'pietrowy';
  const footprint = isParterowy ? area : isPietrowy ? area / 2 : area * 0.6; // rzut fundamentu
  const wallHeight = isParterowy ? 2.8 : isPietrowy ? 5.6 : 4.5;
  const perimeter = Math.sqrt(footprint) * 4 * 1.1; // obwód z korektą na kształt
  const wallArea = perimeter * wallHeight;
  const roofArea = footprint * ROOF_DATA[roofType].multiplier;

  const stages: StageBreakdown[] = [];

  // ─── 1. FUNDAMENTY I PRACE ZIEMNE ───
  {
    const betonM3 = Math.round(footprint * 0.35); // płyta/ławy ~35cm
    const stalKg = Math.round(betonM3 * 85); // ~85 kg/m³
    const szalunkiM2 = Math.round(perimeter * 0.8);
    const wykopyM3 = Math.round(footprint * 0.6);
    const izolacjaM2 = Math.round(footprint * 1.15);

    const materials: MaterialItem[] = [
      { name: 'Beton C25/30', quantity: betonM3, unit: 'm³', unitPrice: 380, total: betonM3 * 380 },
      { name: 'Stal zbrojeniowa', quantity: stalKg, unit: 'kg', unitPrice: 5.2, total: Math.round(stalKg * 5.2) },
      { name: 'Szalunki systemowe', quantity: szalunkiM2, unit: 'm²', unitPrice: 35, total: szalunkiM2 * 35 },
      { name: 'Izolacja przeciwwilgociowa', quantity: izolacjaM2, unit: 'm²', unitPrice: 45, total: izolacjaM2 * 45 },
      { name: 'Podsypka piaskowo-żwirowa', quantity: wykopyM3, unit: 'm³', unitPrice: 65, total: wykopyM3 * 65 },
    ];

    const matTotal = materials.reduce((s, m) => s + m.total, 0);
    const robocizna = Math.round(matTotal * 0.55);
    const sprzet = Math.round(wykopyM3 * 120 + betonM3 * 80); // koparka + pompa
    const stageTotal = matTotal + robocizna + sprzet;

    stages.push({
      label: 'Fundamenty i prace ziemne',
      materials,
      robocizna,
      sprzet,
      total: spreadRange(stageTotal),
    });
  }

  // ─── 2. ŚCIANY I KONSTRUKCJA ───
  {
    const wallData = WALL_DATA[wallType];
    const bloczkiSzt = Math.round(wallArea * wallData.perM2);
    const zaprawaKg = Math.round(wallArea * 5);
    const nadprozaSzt = Math.round(area / 15); // ~1 na 15m² (okna/drzwi)
    const wieniecBeton = Math.round(perimeter * 0.12); // wieniec ~0.12 m³/mb
    const wieniecStal = Math.round(wieniecBeton * 90);

    // Strop
    const stropM2 = isPietrowy || floors === 'poddasze' ? Math.round(footprint) : 0;
    const stropBeton = Math.round(stropM2 * 0.18); // ~18cm grubości

    const materials: MaterialItem[] = [
      { name: wallData.name, quantity: bloczkiSzt, unit: wallData.unit, unitPrice: wallData.unitPrice, total: Math.round(bloczkiSzt * wallData.unitPrice) },
      { name: 'Zaprawa murarska', quantity: zaprawaKg, unit: 'kg', unitPrice: 1.2, total: Math.round(zaprawaKg * 1.2) },
      { name: 'Nadproża prefabrykowane', quantity: nadprozaSzt, unit: 'szt', unitPrice: 180, total: nadprozaSzt * 180 },
      { name: 'Beton wieńce C20/25', quantity: wieniecBeton, unit: 'm³', unitPrice: 350, total: Math.round(wieniecBeton * 350) },
      { name: 'Stal zbrojeniowa (wieńce)', quantity: wieniecStal, unit: 'kg', unitPrice: 5.2, total: Math.round(wieniecStal * 5.2) },
    ];

    if (stropM2 > 0) {
      materials.push(
        { name: 'Strop — beton C25/30', quantity: stropBeton, unit: 'm³', unitPrice: 380, total: stropBeton * 380 },
        { name: 'Strop — belki i pustaki', quantity: stropM2, unit: 'm²', unitPrice: 85, total: stropM2 * 85 },
      );
    }

    const matTotal = materials.reduce((s, m) => s + m.total, 0);
    const robocizna = Math.round(matTotal * 0.5);
    const sprzet = Math.round(area * 15); // dźwig, rusztowania
    const stageTotal = matTotal + robocizna + sprzet;

    stages.push({
      label: 'Ściany i konstrukcja',
      materials,
      robocizna,
      sprzet,
      total: spreadRange(stageTotal),
    });
  }

  // ─── 3. DACH I WIĘŹBA ───
  {
    const roofData = ROOF_DATA[roofType];
    const wiezbaM3 = roofType === 'plaski' ? 0 : Math.round(roofArea * 0.04 * 10) / 10;
    const pokrycieM2 = Math.round(roofArea);
    const foliaM2 = Math.round(roofArea * 1.1);
    const ociepleniaM2 = Math.round(roofArea * 0.9);
    const rynnyMb = Math.round(perimeter * 0.8);

    const materials: MaterialItem[] = [];

    if (wiezbaM3 > 0) {
      materials.push({ name: 'Drewno konstrukcyjne C24', quantity: wiezbaM3, unit: 'm³', unitPrice: 1800, total: Math.round(wiezbaM3 * 1800) });
    }
    materials.push(
      { name: roofData.materialName, quantity: pokrycieM2, unit: 'm²', unitPrice: roofData.unitPrice, total: Math.round(pokrycieM2 * roofData.unitPrice) },
      { name: 'Folia wstępnego krycia', quantity: foliaM2, unit: 'm²', unitPrice: 8, total: foliaM2 * 8 },
      { name: 'Ocieplenie dachu (wełna 25cm)', quantity: ociepleniaM2, unit: 'm²', unitPrice: 55, total: ociepleniaM2 * 55 },
      { name: 'Rynny i rury spustowe PVC', quantity: rynnyMb, unit: 'mb', unitPrice: 75, total: rynnyMb * 75 },
    );

    const matTotal = materials.reduce((s, m) => s + m.total, 0);
    const robocizna = Math.round(matTotal * 0.6);
    const sprzet = Math.round(roofArea * 12); // dźwig, podnośnik
    const stageTotal = matTotal + robocizna + sprzet;

    stages.push({
      label: 'Dach i więźba dachowa',
      materials,
      robocizna,
      sprzet,
      total: spreadRange(stageTotal),
    });
  }

  // ─── 4. OKNA I DRZWI ───
  {
    const oknaSzt = Math.round(area / 12); // ~1 okno na 12m²
    const drzwiZew = isPietrowy ? 2 : 1;
    const drzwiWew = Math.round(area / 18);
    const parapetySzt = oknaSzt;

    const materials: MaterialItem[] = [
      { name: 'Okna PVC trzyszybowe', quantity: oknaSzt, unit: 'szt', unitPrice: 1800, total: oknaSzt * 1800 },
      { name: 'Drzwi zewnętrzne antywłamaniowe', quantity: drzwiZew, unit: 'szt', unitPrice: 4500, total: drzwiZew * 4500 },
      { name: 'Drzwi wewnętrzne', quantity: drzwiWew, unit: 'szt', unitPrice: 850, total: drzwiWew * 850 },
      { name: 'Parapety wewnętrzne + zewnętrzne', quantity: parapetySzt, unit: 'kpl', unitPrice: 280, total: parapetySzt * 280 },
    ];

    const matTotal = materials.reduce((s, m) => s + m.total, 0);
    const robocizna = Math.round(matTotal * 0.25);
    const sprzet = 0;
    const stageTotal = matTotal + robocizna + sprzet;

    stages.push({
      label: 'Stolarka okienna i drzwiowa',
      materials,
      robocizna,
      sprzet,
      total: spreadRange(stageTotal),
    });
  }

  // ─── 5. INSTALACJE ───
  const finishMod = FINISH_MODIFIERS[finish];
  if (finishMod.instalacje > 0) {
    const elektrykaPkt = Math.round(area * 1.2); // ~1.2 pkt/m²
    const wodKanPkt = Math.round(area * 0.3);
    const ogrzewanieCost = Math.round(area * HEATING_COST_PER_M2[heating]);
    const kanalizacjaMb = Math.round(perimeter * 0.6 + 15);

    const materials: MaterialItem[] = [
      { name: 'Instalacja elektryczna', quantity: elektrykaPkt, unit: 'pkt', unitPrice: 120, total: elektrykaPkt * 120 },
      { name: 'Instalacja wod-kan', quantity: wodKanPkt, unit: 'pkt', unitPrice: 350, total: wodKanPkt * 350 },
      { name: `Ogrzewanie — ${HEATING_LABELS[heating].toLowerCase()}`, quantity: 1, unit: 'kpl', unitPrice: ogrzewanieCost, total: ogrzewanieCost },
      { name: 'Kanalizacja zewnętrzna', quantity: kanalizacjaMb, unit: 'mb', unitPrice: 180, total: kanalizacjaMb * 180 },
      { name: 'Wentylacja mechaniczna', quantity: 1, unit: 'kpl', unitPrice: Math.round(area * 45), total: Math.round(area * 45) },
    ];

    const matTotal = materials.reduce((s, m) => s + m.total, 0);
    const robocizna = Math.round(matTotal * 0.45);
    const sprzet = Math.round(area * 8);
    const stageTotal = matTotal + robocizna + sprzet;

    stages.push({
      label: 'Instalacje (elektryka, wod-kan, ogrzewanie)',
      materials,
      robocizna,
      sprzet,
      total: spreadRange(stageTotal),
    });
  }

  // ─── 6. WYKOŃCZENIE ───
  if (finishMod.wykonczenie > 0) {
    const tynkiM2 = Math.round(wallArea * 0.85 + footprint); // ściany wew + sufity
    const wylewkiM2 = Math.round(area);
    const podlogiM2 = finishMod.wykonczenie >= 1.0 ? Math.round(area) : 0;
    const malowanieM2 = finishMod.wykonczenie >= 1.0 ? Math.round(wallArea * 0.85 + footprint) : 0;
    const glazuraM2 = finishMod.wykonczenie >= 1.0 ? Math.round(area * 0.15) : 0;
    const elewacjaM2 = Math.round(wallArea * 0.75);

    const materials: MaterialItem[] = [
      { name: 'Tynki gipsowe maszynowe', quantity: tynkiM2, unit: 'm²', unitPrice: 35, total: tynkiM2 * 35 },
      { name: 'Wylewki samopoziomujące', quantity: wylewkiM2, unit: 'm²', unitPrice: 42, total: wylewkiM2 * 42 },
      { name: 'Elewacja (styropian + tynk)', quantity: elewacjaM2, unit: 'm²', unitPrice: 140, total: elewacjaM2 * 140 },
    ];

    if (podlogiM2 > 0) {
      materials.push(
        { name: 'Podłogi (panele/gres)', quantity: podlogiM2, unit: 'm²', unitPrice: 95, total: podlogiM2 * 95 },
      );
    }
    if (malowanieM2 > 0) {
      materials.push(
        { name: 'Malowanie ścian i sufitów', quantity: malowanieM2, unit: 'm²', unitPrice: 18, total: malowanieM2 * 18 },
      );
    }
    if (glazuraM2 > 0) {
      materials.push(
        { name: 'Glazura i terakota (łazienki)', quantity: glazuraM2, unit: 'm²', unitPrice: 160, total: glazuraM2 * 160 },
        { name: 'Biały montaż łazienkowy', quantity: Math.ceil(area / 80), unit: 'kpl', unitPrice: 5500, total: Math.ceil(area / 80) * 5500 },
      );
    }

    const matTotal = materials.reduce((s, m) => s + m.total, 0);
    const robocizna = Math.round(matTotal * 0.55 * finishMod.wykonczenie);
    const sprzet = Math.round(area * 5);
    const stageTotal = matTotal + robocizna + sprzet;

    stages.push({
      label: finishMod.wykonczenie >= 1.0 ? 'Wykończenie pod klucz' : 'Wykończenie (stan deweloperski)',
      materials,
      robocizna,
      sprzet,
      total: spreadRange(stageTotal),
    });
  }

  // ─── Totals ───
  const garageCost = GARAGE_COST[garage];
  const stagesSum = stages.reduce((s, st) => s + (st.total.min + st.total.max) / 2, 0);
  const totalBase = stagesSum + (garageCost.min + garageCost.max) / 2;

  const materialTotal = stages.reduce((s, st) => s + st.materials.reduce((ms, m) => ms + m.total, 0), 0);
  const robociznaTotal = stages.reduce((s, st) => s + st.robocizna, 0);
  const sprzetTotal = stages.reduce((s, st) => s + st.sprzet, 0);

  const timeScale = area / 140;
  const timeMin = Math.round(TIME_BASE.min * Math.sqrt(timeScale));
  const timeMax = Math.round(TIME_BASE.max * Math.sqrt(timeScale));

  return {
    stages,
    garaz: garageCost,
    total: {
      min: round5k(totalBase * (1 - SPREAD)),
      max: round5k(totalBase * (1 + SPREAD)),
    },
    czasRealizacji: { min: timeMin, max: timeMax },
    materialTotal,
    robociznaTotal,
    sprzetTotal,
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
  gazowe: 'Kocioł gazowy',
  pompa_ciepla: 'Pompa ciepła',
  elektryczne: 'Ogrzewanie elektryczne',
};
