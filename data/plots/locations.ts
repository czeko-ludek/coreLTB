/**
 * Hierarchical location system for plot search.
 * Structure: województwo → powiat → gmina/miasto → dzielnica/wieś
 *
 * Each entry can be searched and selected to filter plots.
 * `matchCities` — which Plot.city values belong to this location
 * `matchDistricts` — optional: also filter by district (from title parsing)
 */

export type LocationLevel = 'wojewodztwo' | 'powiat' | 'gmina' | 'miejscowosc';

export interface LocationEntry {
  /** URL-safe slug */
  slug: string;
  /** Display name */
  name: string;
  /** Locative case for SEO: "w Wodzislawiu Slaskim" */
  nameLocative: string;
  /** Hierarchy level */
  level: LocationLevel;
  /** Parent slug (e.g. gmina belongs to powiat) */
  parentSlug?: string;
  /** Which Plot.city values this location covers */
  matchCities: string[];
  /** Optional: filter to specific districts only */
  matchDistricts?: string[];
  /** Children slugs */
  children?: string[];
  /**
   * Nominatim query to fetch boundary polygon.
   * Format: search query string for Nominatim Search API.
   * If not set, boundary overlay is not shown for this location.
   */
  nominatimQuery?: string;
}

/** All locations in a flat map (slug → entry) */
export const LOCATIONS: Record<string, LocationEntry> = {
  // ══════════════════════════════════════════
  // WOJEWÓDZTWO
  // ══════════════════════════════════════════
  'slaskie': {
    slug: 'slaskie',
    name: 'Śląskie',
    nameLocative: 'na Śląsku',
    level: 'wojewodztwo',
    matchCities: [], // All cities below
    children: [
      'powiat-wodzislawski', 'powiat-rybnicki', 'powiat-raciborski', 'powiat-mikolowski',
      'powiat-cieszynski', 'powiat-bielski', 'powiat-pszczynski', 'powiat-zywiecki',
      'jastrzebie-zdroj', 'zory', 'bielsko-biala',
    ],
    nominatimQuery: 'województwo śląskie, Polska',
  },

  // ══════════════════════════════════════════
  // POWIAT WODZISLAWSKI
  // ══════════════════════════════════════════
  'powiat-wodzislawski': {
    slug: 'powiat-wodzislawski',
    name: 'Powiat wodzisławski',
    nameLocative: 'w powiecie wodzisławskim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: [
      'Wodzislaw Slaski', 'Wodzisław Śląski',
      'Gorzyce', 'Turza Śląska', 'Radlin', 'Pszów', 'Mszana', 'Marklowice',
      'Lubomia', 'Godow', 'Godów',
    ],
    children: [
      'wodzislaw-slaski', 'gorzyce', 'radlin', 'pszow', 'mszana',
      'marklowice', 'lubomia', 'godow',
    ],
    nominatimQuery: 'powiat wodzisławski, województwo śląskie',
  },

  'wodzislaw-slaski': {
    slug: 'wodzislaw-slaski',
    name: 'Wodzisław Śląski',
    nameLocative: 'w Wodzisławiu Śląskim',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Wodzislaw Slaski', 'Wodzisław Śląski'],
    children: ['kokoszyce', 'turzyczka', 'wilchwy'],
    nominatimQuery: 'Wodzisław Śląski, powiat wodzisławski',
  },
  'kokoszyce': {
    slug: 'kokoszyce',
    name: 'Kokoszyce',
    nameLocative: 'w Kokoszycach',
    level: 'miejscowosc',
    parentSlug: 'wodzislaw-slaski',
    matchCities: ['Wodzislaw Slaski', 'Wodzisław Śląski'],
    matchDistricts: ['Kokoszyce'],
    nominatimQuery: 'Kokoszyce, Wodzisław Śląski, powiat wodzisławski',
  },
  'turzyczka': {
    slug: 'turzyczka',
    name: 'Turzyczka',
    nameLocative: 'w Turzyczce',
    level: 'miejscowosc',
    parentSlug: 'wodzislaw-slaski',
    matchCities: ['Wodzislaw Slaski', 'Wodzisław Śląski'],
    matchDistricts: ['Turzyczka'],
    nominatimQuery: 'Turzyczka, Wodzisław Śląski, powiat wodzisławski',
  },
  'wilchwy': {
    slug: 'wilchwy',
    name: 'Wilchwy',
    nameLocative: 'w Wilchwach',
    level: 'miejscowosc',
    parentSlug: 'wodzislaw-slaski',
    matchCities: ['Wodzislaw Slaski', 'Wodzisław Śląski'],
    matchDistricts: ['Wilchwy'],
    nominatimQuery: 'Wilchwy, Wodzisław Śląski, powiat wodzisławski',
  },

  'gorzyce': {
    slug: 'gorzyce',
    name: 'Gorzyce',
    nameLocative: 'w Gorzycach',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Gorzyce', 'Turza Śląska'],
    children: ['czyzowice', 'turza-slaska', 'belsznica'],
    nominatimQuery: 'gmina Gorzyce, powiat wodzisławski',
  },
  'czyzowice': {
    slug: 'czyzowice',
    name: 'Czyżowice',
    nameLocative: 'w Czyżowicach',
    level: 'miejscowosc',
    parentSlug: 'gorzyce',
    matchCities: ['Gorzyce'],
    matchDistricts: ['Czyżowice'],
    nominatimQuery: 'Czyżowice, gmina Gorzyce, powiat wodzisławski',
  },
  'turza-slaska': {
    slug: 'turza-slaska',
    name: 'Turza Śląska',
    nameLocative: 'w Turzy Śląskiej',
    level: 'miejscowosc',
    parentSlug: 'gorzyce',
    matchCities: ['Gorzyce', 'Turza Śląska'],
    matchDistricts: ['Turza Śląska'],
    nominatimQuery: 'Turza Śląska, gmina Gorzyce, powiat wodzisławski',
  },
  'belsznica': {
    slug: 'belsznica',
    name: 'Bełsznica',
    nameLocative: 'w Bełsznicy',
    level: 'miejscowosc',
    parentSlug: 'gorzyce',
    matchCities: ['Gorzyce'],
    matchDistricts: ['Bełsznica'],
    nominatimQuery: 'Bełsznica, gmina Gorzyce, powiat wodzisławski',
  },

  'radlin': {
    slug: 'radlin',
    name: 'Radlin',
    nameLocative: 'w Radlinie',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Radlin'],
    children: ['biertultowy'],
    nominatimQuery: 'Radlin, powiat wodzisławski',
  },
  'biertultowy': {
    slug: 'biertultowy',
    name: 'Biertułtowy',
    nameLocative: 'w Biertułtowach',
    level: 'miejscowosc',
    parentSlug: 'radlin',
    matchCities: ['Radlin'],
    matchDistricts: ['Biertułtowy'],
    nominatimQuery: 'Biertułtowy, Radlin, powiat wodzisławski',
  },

  'pszow': {
    slug: 'pszow',
    name: 'Pszów',
    nameLocative: 'w Pszowie',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Pszów'],
    nominatimQuery: 'Pszów, powiat wodzisławski',
  },

  'mszana': {
    slug: 'mszana',
    name: 'Mszana',
    nameLocative: 'w Mszanie',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Mszana'],
    children: ['gogolowa'],
    nominatimQuery: 'gmina Mszana, powiat wodzisławski',
  },
  'gogolowa': {
    slug: 'gogolowa',
    name: 'Gogołowa',
    nameLocative: 'w Gogołowej',
    level: 'miejscowosc',
    parentSlug: 'mszana',
    matchCities: ['Mszana'],
    matchDistricts: ['Gogołowa'],
    nominatimQuery: 'Gogołowa, gmina Mszana, powiat wodzisławski',
  },

  'marklowice': {
    slug: 'marklowice',
    name: 'Marklowice',
    nameLocative: 'w Marklowicach',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Marklowice'],
    nominatimQuery: 'gmina Marklowice, powiat wodzisławski',
  },
  'lubomia': {
    slug: 'lubomia',
    name: 'Lubomia',
    nameLocative: 'w Lubomi',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Lubomia'],
    nominatimQuery: 'gmina Lubomia, powiat wodzisławski',
  },
  'godow': {
    slug: 'godow',
    name: 'Godów',
    nameLocative: 'w Godowie',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Godow', 'Godów'],
    children: ['skrzyszow', 'laziska-godow'],
    nominatimQuery: 'gmina Godów, powiat wodzisławski',
  },
  'skrzyszow': {
    slug: 'skrzyszow',
    name: 'Skrzyszów',
    nameLocative: 'w Skrzyszowie',
    level: 'miejscowosc',
    parentSlug: 'godow',
    matchCities: ['Godow', 'Godów'],
    matchDistricts: ['Skrzyszów'],
    nominatimQuery: 'Skrzyszów, gmina Godów, powiat wodzisławski',
  },
  'laziska-godow': {
    slug: 'laziska-godow',
    name: 'Łaziska',
    nameLocative: 'w Łaziskach',
    level: 'miejscowosc',
    parentSlug: 'godow',
    matchCities: ['Godow', 'Godów'],
    matchDistricts: ['Łaziska'],
    nominatimQuery: 'Łaziska, gmina Godów, powiat wodzisławski',
  },

  // ══════════════════════════════════════════
  // POWIAT RYBNICKI (+ Rybnik miasto)
  // ══════════════════════════════════════════
  'powiat-rybnicki': {
    slug: 'powiat-rybnicki',
    name: 'Powiat rybnicki',
    nameLocative: 'w powiecie rybnickim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Rybnik', 'Gaszowice', 'Lyski', 'Łyski', 'Świerklany'],
    children: ['rybnik', 'gaszowice', 'lyski', 'swierklany'],
    nominatimQuery: 'powiat rybnicki, województwo śląskie',
  },

  'rybnik': {
    slug: 'rybnik',
    name: 'Rybnik',
    nameLocative: 'w Rybniku',
    level: 'gmina',
    parentSlug: 'powiat-rybnicki',
    matchCities: ['Rybnik'],
    children: ['ligota-rybnik', 'popielow', 'zamyslow', 'niewiadom-gorny', 'chwalowice'],
    nominatimQuery: 'Rybnik, województwo śląskie',
  },
  'ligota-rybnik': {
    slug: 'ligota-rybnik',
    name: 'Ligota',
    nameLocative: 'w Ligocie',
    level: 'miejscowosc',
    parentSlug: 'rybnik',
    matchCities: ['Rybnik'],
    matchDistricts: ['Ligota'],
    nominatimQuery: 'Ligota, Rybnik, województwo śląskie',
  },
  'popielow': {
    slug: 'popielow',
    name: 'Popielów',
    nameLocative: 'w Popielowie',
    level: 'miejscowosc',
    parentSlug: 'rybnik',
    matchCities: ['Rybnik'],
    matchDistricts: ['Popielów', 'Popielowie'],
    nominatimQuery: 'Popielów, Rybnik, województwo śląskie',
  },
  'zamyslow': {
    slug: 'zamyslow',
    name: 'Zamysłów',
    nameLocative: 'w Zamysłowie',
    level: 'miejscowosc',
    parentSlug: 'rybnik',
    matchCities: ['Rybnik'],
    matchDistricts: ['Zamysłów', 'Zamysłowie'],
    nominatimQuery: 'Zamysłów, Rybnik, województwo śląskie',
  },
  'niewiadom-gorny': {
    slug: 'niewiadom-gorny',
    name: 'Niewiadom Górny',
    nameLocative: 'w Niewiadomiu Górnym',
    level: 'miejscowosc',
    parentSlug: 'rybnik',
    matchCities: ['Rybnik'],
    matchDistricts: ['Niewiadom Górny'],
    nominatimQuery: 'Niewiadom, Rybnik, województwo śląskie',
  },
  'chwalowice': {
    slug: 'chwalowice',
    name: 'Chwałowice',
    nameLocative: 'w Chwałowicach',
    level: 'miejscowosc',
    parentSlug: 'rybnik',
    matchCities: ['Rybnik'],
    matchDistricts: ['Chwałowice'],
    nominatimQuery: 'Chwałowice, Rybnik, województwo śląskie',
  },

  'gaszowice': {
    slug: 'gaszowice',
    name: 'Gaszowice',
    nameLocative: 'w Gaszowicach',
    level: 'gmina',
    parentSlug: 'powiat-rybnicki',
    matchCities: ['Gaszowice'],
    children: ['czernica', 'szczerbice', 'piece'],
    nominatimQuery: 'gmina Gaszowice, powiat rybnicki',
  },
  'czernica': {
    slug: 'czernica',
    name: 'Czernica',
    nameLocative: 'w Czernicy',
    level: 'miejscowosc',
    parentSlug: 'gaszowice',
    matchCities: ['Gaszowice'],
    matchDistricts: ['Czernica'],
    nominatimQuery: 'Czernica, gmina Gaszowice, powiat rybnicki',
  },
  'szczerbice': {
    slug: 'szczerbice',
    name: 'Szczerbice',
    nameLocative: 'w Szczerbicach',
    level: 'miejscowosc',
    parentSlug: 'gaszowice',
    matchCities: ['Gaszowice'],
    matchDistricts: ['Szczerbice'],
    nominatimQuery: 'Szczerbice, gmina Gaszowice, powiat rybnicki',
  },
  'piece': {
    slug: 'piece',
    name: 'Piece',
    nameLocative: 'w Piecach',
    level: 'miejscowosc',
    parentSlug: 'gaszowice',
    matchCities: ['Gaszowice'],
    matchDistricts: ['Piece'],
    nominatimQuery: 'Piece, gmina Gaszowice, powiat rybnicki',
  },

  'lyski': {
    slug: 'lyski',
    name: 'Łyski',
    nameLocative: 'w Łyskach',
    level: 'gmina',
    parentSlug: 'powiat-rybnicki',
    matchCities: ['Lyski', 'Łyski'],
    children: ['pstrazna', 'sumina', 'zytna'],
    nominatimQuery: 'gmina Lyski, powiat rybnicki',
  },
  'pstrazna': {
    slug: 'pstrazna',
    name: 'Pstrążna',
    nameLocative: 'w Pstrążnej',
    level: 'miejscowosc',
    parentSlug: 'lyski',
    matchCities: ['Lyski', 'Łyski'],
    matchDistricts: ['Pstrążna'],
    nominatimQuery: 'Pstrążna, gmina Lyski, powiat rybnicki',
  },
  'sumina': {
    slug: 'sumina',
    name: 'Sumina',
    nameLocative: 'w Suminie',
    level: 'miejscowosc',
    parentSlug: 'lyski',
    matchCities: ['Lyski', 'Łyski'],
    matchDistricts: ['Sumina'],
    nominatimQuery: 'Sumina, gmina Lyski, powiat rybnicki',
  },
  'zytna': {
    slug: 'zytna',
    name: 'Żytna',
    nameLocative: 'w Żytnej',
    level: 'miejscowosc',
    parentSlug: 'lyski',
    matchCities: ['Lyski', 'Łyski'],
    matchDistricts: ['Żytna'],
    nominatimQuery: 'Żytna, gmina Lyski, powiat rybnicki',
  },

  'swierklany': {
    slug: 'swierklany',
    name: 'Świerklany',
    nameLocative: 'w Świerklanach',
    level: 'gmina',
    parentSlug: 'powiat-rybnicki',
    matchCities: ['Świerklany'],
    children: ['jankowice-swierklany'],
    nominatimQuery: 'gmina Świerklany, powiat rybnicki',
  },
  'jankowice-swierklany': {
    slug: 'jankowice-swierklany',
    name: 'Jankowice',
    nameLocative: 'w Jankowicach',
    level: 'miejscowosc',
    parentSlug: 'swierklany',
    matchCities: ['Świerklany'],
    matchDistricts: ['Jankowice'],
    nominatimQuery: 'Jankowice, gmina Świerklany, powiat rybnicki',
  },

  // ══════════════════════════════════════════
  // POWIAT RACIBORSKI
  // ══════════════════════════════════════════
  'powiat-raciborski': {
    slug: 'powiat-raciborski',
    name: 'Powiat raciborski',
    nameLocative: 'w powiecie raciborskim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Nedza', 'Nędza', 'Pietrowice Wielkie', 'Kornowac'],
    children: ['nedza', 'pietrowice-wielkie', 'kornowac'],
    nominatimQuery: 'powiat raciborski, województwo śląskie',
  },
  'nedza': {
    slug: 'nedza',
    name: 'Nędza',
    nameLocative: 'w Nędzy',
    level: 'gmina',
    parentSlug: 'powiat-raciborski',
    matchCities: ['Nedza', 'Nędza'],
    children: ['gorki-slaskie'],
    nominatimQuery: 'gmina Nędza, powiat raciborski',
  },
  'gorki-slaskie': {
    slug: 'gorki-slaskie',
    name: 'Górki Śląskie',
    nameLocative: 'w Górkach Śląskich',
    level: 'miejscowosc',
    parentSlug: 'nedza',
    matchCities: ['Nedza', 'Nędza'],
    matchDistricts: ['Górki'],
    nominatimQuery: 'Górki Śląskie, gmina Nędza, powiat raciborski',
  },
  'pietrowice-wielkie': {
    slug: 'pietrowice-wielkie',
    name: 'Pietrowice Wielkie',
    nameLocative: 'w Pietrowicach Wielkich',
    level: 'gmina',
    parentSlug: 'powiat-raciborski',
    matchCities: ['Pietrowice Wielkie'],
    children: ['cyprzanow'],
    nominatimQuery: 'gmina Pietrowice Wielkie, powiat raciborski',
  },
  'cyprzanow': {
    slug: 'cyprzanow',
    name: 'Cyprzanów',
    nameLocative: 'w Cyprzanowie',
    level: 'miejscowosc',
    parentSlug: 'pietrowice-wielkie',
    matchCities: ['Pietrowice Wielkie'],
    matchDistricts: ['Cyprzanów'],
    nominatimQuery: 'Cyprzanów, gmina Pietrowice Wielkie, powiat raciborski',
  },
  'kornowac': {
    slug: 'kornowac',
    name: 'Kornowac',
    nameLocative: 'w Kornowcu',
    level: 'gmina',
    parentSlug: 'powiat-raciborski',
    matchCities: ['Kornowac'],
    children: ['lance', 'rzuchow'],
    nominatimQuery: 'gmina Kornowac, powiat raciborski',
  },
  'lance': {
    slug: 'lance',
    name: 'Łańce',
    nameLocative: 'w Łańcach',
    level: 'miejscowosc',
    parentSlug: 'kornowac',
    matchCities: ['Kornowac'],
    matchDistricts: ['Łańce'],
    nominatimQuery: 'Łańce, gmina Kornowac, powiat raciborski',
  },
  'rzuchow': {
    slug: 'rzuchow',
    name: 'Rzuchów',
    nameLocative: 'w Rzuchowie',
    level: 'miejscowosc',
    parentSlug: 'kornowac',
    matchCities: ['Kornowac'],
    matchDistricts: ['Rzuchów'],
    nominatimQuery: 'Rzuchów, gmina Kornowac, powiat raciborski',
  },

  // ══════════════════════════════════════════
  // POWIAT MIKOLOWSKI
  // ══════════════════════════════════════════
  'powiat-mikolowski': {
    slug: 'powiat-mikolowski',
    name: 'Powiat mikołowski',
    nameLocative: 'w powiecie mikołowskim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Ornontowice'],
    children: ['ornontowice'],
    nominatimQuery: 'powiat mikołowski, województwo śląskie',
  },
  'ornontowice': {
    slug: 'ornontowice',
    name: 'Ornontowice',
    nameLocative: 'w Ornontowicach',
    level: 'gmina',
    parentSlug: 'powiat-mikolowski',
    matchCities: ['Ornontowice'],
    nominatimQuery: 'gmina Ornontowice, powiat mikołowski',
  },

  // ══════════════════════════════════════════
  // MIASTA NA PRAWACH POWIATU
  // ══════════════════════════════════════════
  'jastrzebie-zdroj': {
    slug: 'jastrzebie-zdroj',
    name: 'Jastrzębie-Zdrój',
    nameLocative: 'w Jastrzębiu-Zdroju',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Jastrzębie-Zdrój', 'Jastrzebie-Zdroj'],
    nominatimQuery: 'Jastrzębie-Zdrój, województwo śląskie',
  },
  'zory': {
    slug: 'zory',
    name: 'Żory',
    nameLocative: 'w Żorach',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Żory', 'Zory'],
    nominatimQuery: 'Żory, województwo śląskie',
  },
  'bielsko-biala': {
    slug: 'bielsko-biala',
    name: 'Bielsko-Biała',
    nameLocative: 'w Bielsku-Białej',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Bielsko-Biała', 'Bielsko-Biala'],
    nominatimQuery: 'Bielsko-Biała, województwo śląskie',
  },

  // ══════════════════════════════════════════
  // POWIAT CIESZYŃSKI
  // ══════════════════════════════════════════
  'powiat-cieszynski': {
    slug: 'powiat-cieszynski',
    name: 'Powiat cieszyński',
    nameLocative: 'w powiecie cieszyńskim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: [
      'Cieszyn', 'Ustroń', 'Skoczów', 'Skoczów (gw)', 'Brenna',
      'Goleszów', 'Hażlach', 'Zebrzydowice', 'Dębowiec', 'Istebna',
      'Górki Wielkie', 'Grodziec', 'Kaczyce', 'Kończyce Wielkie',
    ],
    children: [
      'cieszyn', 'ustron', 'skoczow', 'brenna', 'goleszow',
      'hazlach', 'zebrzydowice', 'debowiec', 'istebna', 'strumien',
    ],
    nominatimQuery: 'powiat cieszyński, województwo śląskie',
  },
  'cieszyn': {
    slug: 'cieszyn',
    name: 'Cieszyn',
    nameLocative: 'w Cieszynie',
    level: 'gmina',
    parentSlug: 'powiat-cieszynski',
    matchCities: ['Cieszyn'],
    nominatimQuery: 'Cieszyn, powiat cieszyński',
  },
  'ustron': {
    slug: 'ustron',
    name: 'Ustroń',
    nameLocative: 'w Ustroniu',
    level: 'gmina',
    parentSlug: 'powiat-cieszynski',
    matchCities: ['Ustroń'],
    nominatimQuery: 'Ustroń, powiat cieszyński',
  },
  'skoczow': {
    slug: 'skoczow',
    name: 'Skoczów',
    nameLocative: 'w Skoczowie',
    level: 'gmina',
    parentSlug: 'powiat-cieszynski',
    matchCities: ['Skoczów', 'Skoczów (gw)'],
    children: ['kiczyce', 'miedzyswiec', 'ochaby-male', 'pogorze-skoczow', 'wilamowice-skoczow'],
    nominatimQuery: 'Skoczów, powiat cieszyński',
  },
  'kiczyce': {
    slug: 'kiczyce',
    name: 'Kiczyce',
    nameLocative: 'w Kiczycach',
    level: 'miejscowosc',
    parentSlug: 'skoczow',
    matchCities: ['Skoczów', 'Skoczów (gw)'],
    matchDistricts: ['Kiczyce'],
    nominatimQuery: 'Kiczyce, Skoczów, powiat cieszyński',
  },
  'miedzyswiec': {
    slug: 'miedzyswiec',
    name: 'Międzyświeć',
    nameLocative: 'w Międzyświeciu',
    level: 'miejscowosc',
    parentSlug: 'skoczow',
    matchCities: ['Skoczów (gw)'],
    matchDistricts: ['Międzyświeć'],
    nominatimQuery: 'Międzyświeć, gmina Skoczów, powiat cieszyński',
  },
  'ochaby-male': {
    slug: 'ochaby-male',
    name: 'Ochaby Małe',
    nameLocative: 'w Ochabach Małych',
    level: 'miejscowosc',
    parentSlug: 'skoczow',
    matchCities: ['Skoczów (gw)'],
    matchDistricts: ['Ochaby Małe'],
    nominatimQuery: 'Ochaby Małe, gmina Skoczów, powiat cieszyński',
  },
  'pogorze-skoczow': {
    slug: 'pogorze-skoczow',
    name: 'Pogórze',
    nameLocative: 'w Pogórzu',
    level: 'miejscowosc',
    parentSlug: 'skoczow',
    matchCities: ['Skoczów (gw)'],
    matchDistricts: ['Pogórze'],
    nominatimQuery: 'Pogórze, gmina Skoczów, powiat cieszyński',
  },
  'wilamowice-skoczow': {
    slug: 'wilamowice-skoczow',
    name: 'Wilamowice',
    nameLocative: 'w Wilamowicach',
    level: 'miejscowosc',
    parentSlug: 'skoczow',
    matchCities: ['Skoczów (gw)'],
    matchDistricts: ['Wilamowice'],
    nominatimQuery: 'Wilamowice, gmina Skoczów, powiat cieszyński',
  },
  'brenna': {
    slug: 'brenna',
    name: 'Brenna',
    nameLocative: 'w Brennej',
    level: 'gmina',
    parentSlug: 'powiat-cieszynski',
    matchCities: ['Brenna', 'Górki Wielkie', 'Grodziec'],
    children: ['gorki-male', 'gorki-wielkie'],
    nominatimQuery: 'gmina Brenna, powiat cieszyński',
  },
  'gorki-male': {
    slug: 'gorki-male',
    name: 'Górki Małe',
    nameLocative: 'w Górkach Małych',
    level: 'miejscowosc',
    parentSlug: 'brenna',
    matchCities: ['Brenna'],
    matchDistricts: ['Górki Małe'],
    nominatimQuery: 'Górki Małe, gmina Brenna, powiat cieszyński',
  },
  'gorki-wielkie': {
    slug: 'gorki-wielkie',
    name: 'Górki Wielkie',
    nameLocative: 'w Górkach Wielkich',
    level: 'miejscowosc',
    parentSlug: 'brenna',
    matchCities: ['Górki Wielkie'],
    nominatimQuery: 'Górki Wielkie, gmina Brenna, powiat cieszyński',
  },
  'goleszow': {
    slug: 'goleszow',
    name: 'Goleszów',
    nameLocative: 'w Goleszowie',
    level: 'gmina',
    parentSlug: 'powiat-cieszynski',
    matchCities: ['Goleszów'],
    children: ['cisownica', 'bazanowice'],
    nominatimQuery: 'gmina Goleszów, powiat cieszyński',
  },
  'cisownica': {
    slug: 'cisownica',
    name: 'Cisownica',
    nameLocative: 'w Cisownicy',
    level: 'miejscowosc',
    parentSlug: 'goleszow',
    matchCities: ['Goleszów'],
    matchDistricts: ['Cisownica'],
    nominatimQuery: 'Cisownica, gmina Goleszów, powiat cieszyński',
  },
  'bazanowice': {
    slug: 'bazanowice',
    name: 'Bażanowice',
    nameLocative: 'w Bażanowicach',
    level: 'miejscowosc',
    parentSlug: 'goleszow',
    matchCities: ['Goleszów'],
    matchDistricts: ['Bażanowice'],
    nominatimQuery: 'Bażanowice, gmina Goleszów, powiat cieszyński',
  },
  'hazlach': {
    slug: 'hazlach',
    name: 'Hażlach',
    nameLocative: 'w Hażlachu',
    level: 'gmina',
    parentSlug: 'powiat-cieszynski',
    matchCities: ['Hażlach', 'Kończyce Wielkie', 'Kaczyce'],
    children: ['pogwizdow', 'zamarski'],
    nominatimQuery: 'gmina Hażlach, powiat cieszyński',
  },
  'pogwizdow': {
    slug: 'pogwizdow',
    name: 'Pogwizdów',
    nameLocative: 'w Pogwizdowie',
    level: 'miejscowosc',
    parentSlug: 'hazlach',
    matchCities: ['Hażlach'],
    matchDistricts: ['Pogwizdów'],
    nominatimQuery: 'Pogwizdów, gmina Hażlach, powiat cieszyński',
  },
  'zamarski': {
    slug: 'zamarski',
    name: 'Zamarski',
    nameLocative: 'w Zamarskach',
    level: 'miejscowosc',
    parentSlug: 'hazlach',
    matchCities: ['Hażlach'],
    matchDistricts: ['Zamarski'],
    nominatimQuery: 'Zamarski, gmina Hażlach, powiat cieszyński',
  },
  'zebrzydowice': {
    slug: 'zebrzydowice',
    name: 'Zebrzydowice',
    nameLocative: 'w Zebrzydowicach',
    level: 'gmina',
    parentSlug: 'powiat-cieszynski',
    matchCities: ['Zebrzydowice'],
    children: ['kaczyce-zebrzydowice', 'konczyce-male'],
    nominatimQuery: 'gmina Zebrzydowice, powiat cieszyński',
  },
  'kaczyce-zebrzydowice': {
    slug: 'kaczyce-zebrzydowice',
    name: 'Kaczyce',
    nameLocative: 'w Kaczycach',
    level: 'miejscowosc',
    parentSlug: 'zebrzydowice',
    matchCities: ['Zebrzydowice'],
    matchDistricts: ['Kaczyce'],
    nominatimQuery: 'Kaczyce, gmina Zebrzydowice, powiat cieszyński',
  },
  'konczyce-male': {
    slug: 'konczyce-male',
    name: 'Kończyce Małe',
    nameLocative: 'w Kończycach Małych',
    level: 'miejscowosc',
    parentSlug: 'zebrzydowice',
    matchCities: ['Zebrzydowice'],
    matchDistricts: ['Kończyce Małe'],
    nominatimQuery: 'Kończyce Małe, gmina Zebrzydowice, powiat cieszyński',
  },
  'debowiec': {
    slug: 'debowiec',
    name: 'Dębowiec',
    nameLocative: 'w Dębowcu',
    level: 'gmina',
    parentSlug: 'powiat-cieszynski',
    matchCities: ['Dębowiec'],
    nominatimQuery: 'gmina Dębowiec, powiat cieszyński',
  },
  'istebna': {
    slug: 'istebna',
    name: 'Istebna',
    nameLocative: 'w Istebnej',
    level: 'gmina',
    parentSlug: 'powiat-cieszynski',
    matchCities: ['Istebna'],
    nominatimQuery: 'gmina Istebna, powiat cieszyński',
  },

  // ══════════════════════════════════════════
  // POWIAT BIELSKI
  // ══════════════════════════════════════════
  'powiat-bielski': {
    slug: 'powiat-bielski',
    name: 'Powiat bielski',
    nameLocative: 'w powiecie bielskim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Jasienica'],
    children: ['jasienica'],
    nominatimQuery: 'powiat bielski, województwo śląskie',
  },
  'jasienica': {
    slug: 'jasienica',
    name: 'Jasienica',
    nameLocative: 'w Jasienicy',
    level: 'gmina',
    parentSlug: 'powiat-bielski',
    matchCities: ['Jasienica'],
    children: ['lazy-jasienica'],
    nominatimQuery: 'gmina Jasienica, powiat bielski',
  },
  'lazy-jasienica': {
    slug: 'lazy-jasienica',
    name: 'Łazy',
    nameLocative: 'w Łazach',
    level: 'miejscowosc',
    parentSlug: 'jasienica',
    matchCities: ['Jasienica'],
    matchDistricts: ['Łazy'],
    nominatimQuery: 'Łazy, gmina Jasienica, powiat bielski',
  },

  // ══════════════════════════════════════════
  // POWIAT PSZCZYŃSKI
  // ══════════════════════════════════════════
  'powiat-pszczynski': {
    slug: 'powiat-pszczynski',
    name: 'Powiat pszczyński',
    nameLocative: 'w powiecie pszczyńskim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Pszczyna', 'Suszec'],
    children: ['pszczyna', 'suszec'],
    nominatimQuery: 'powiat pszczyński, województwo śląskie',
  },
  'pszczyna': {
    slug: 'pszczyna',
    name: 'Pszczyna',
    nameLocative: 'w Pszczynie',
    level: 'gmina',
    parentSlug: 'powiat-pszczynski',
    matchCities: ['Pszczyna'],
    nominatimQuery: 'Pszczyna, powiat pszczyński',
  },
  'suszec': {
    slug: 'suszec',
    name: 'Suszec',
    nameLocative: 'w Suszcu',
    level: 'gmina',
    parentSlug: 'powiat-pszczynski',
    matchCities: ['Suszec'],
    children: ['radostowice'],
    nominatimQuery: 'gmina Suszec, powiat pszczyński',
  },
  'radostowice': {
    slug: 'radostowice',
    name: 'Radostowice',
    nameLocative: 'w Radostowicach',
    level: 'miejscowosc',
    parentSlug: 'suszec',
    matchCities: ['Suszec'],
    matchDistricts: ['Radostowice'],
    nominatimQuery: 'Radostowice, gmina Suszec, powiat pszczyński',
  },

  // ══════════════════════════════════════════
  // POWIAT ŻYWIECKI
  // ══════════════════════════════════════════
  'powiat-zywiecki': {
    slug: 'powiat-zywiecki',
    name: 'Powiat żywiecki',
    nameLocative: 'w powiecie żywieckim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Radziechowy-Wieprz', 'Rajcza'],
    children: ['radziechowy-wieprz', 'rajcza'],
    nominatimQuery: 'powiat żywiecki, województwo śląskie',
  },
  'radziechowy-wieprz': {
    slug: 'radziechowy-wieprz',
    name: 'Radziechowy-Wieprz',
    nameLocative: 'w Radziechowach-Wieprzu',
    level: 'gmina',
    parentSlug: 'powiat-zywiecki',
    matchCities: ['Radziechowy-Wieprz'],
    children: ['wieprz'],
    nominatimQuery: 'gmina Radziechowy-Wieprz, powiat żywiecki',
  },
  'wieprz': {
    slug: 'wieprz',
    name: 'Wieprz',
    nameLocative: 'w Wieprzu',
    level: 'miejscowosc',
    parentSlug: 'radziechowy-wieprz',
    matchCities: ['Radziechowy-Wieprz'],
    matchDistricts: ['Wieprz'],
    nominatimQuery: 'Wieprz, gmina Radziechowy-Wieprz, powiat żywiecki',
  },
  'rajcza': {
    slug: 'rajcza',
    name: 'Rajcza',
    nameLocative: 'w Rajczy',
    level: 'gmina',
    parentSlug: 'powiat-zywiecki',
    matchCities: ['Rajcza'],
    children: ['sol'],
    nominatimQuery: 'gmina Rajcza, powiat żywiecki',
  },
  'sol': {
    slug: 'sol',
    name: 'Sól',
    nameLocative: 'w Soli',
    level: 'miejscowosc',
    parentSlug: 'rajcza',
    matchCities: ['Rajcza'],
    matchDistricts: ['Sól'],
    nominatimQuery: 'Sól, gmina Rajcza, powiat żywiecki',
  },

  // ══════════════════════════════════════════
  // POWIAT STRUMIEŃSKI (Strumień gmina wiejska)
  // ══════════════════════════════════════════
  'strumien': {
    slug: 'strumien',
    name: 'Strumień',
    nameLocative: 'w Strumieniu',
    level: 'gmina',
    parentSlug: 'powiat-cieszynski',
    matchCities: ['Strumień (gw)', 'Strumień'],
    children: ['zbytkow', 'zablocie'],
    nominatimQuery: 'gmina Strumień, powiat cieszyński',
  },
  'zbytkow': {
    slug: 'zbytkow',
    name: 'Zbytków',
    nameLocative: 'w Zbytkowie',
    level: 'miejscowosc',
    parentSlug: 'strumien',
    matchCities: ['Strumień (gw)', 'Strumień'],
    matchDistricts: ['Zbytków'],
    nominatimQuery: 'Zbytków, gmina Strumień, powiat cieszyński',
  },
  'zablocie': {
    slug: 'zablocie',
    name: 'Zabłocie',
    nameLocative: 'w Zabłociu',
    level: 'miejscowosc',
    parentSlug: 'strumien',
    matchCities: ['Strumień (gw)', 'Strumień'],
    matchDistricts: ['Zabłocie'],
    nominatimQuery: 'Zabłocie, gmina Strumień, powiat cieszyński',
  },

};

const LEVEL_LABELS: Record<LocationLevel, string> = {
  wojewodztwo: 'Województwo',
  powiat: 'Powiat',
  gmina: 'Gmina / Miasto',
  miejscowosc: 'Miejscowość',
};

export function getLocationLevelLabel(level: LocationLevel): string {
  return LEVEL_LABELS[level];
}

/** Get all cities covered by a location (including children recursively) */
export function getLocationCities(slug: string): string[] {
  const loc = LOCATIONS[slug];
  if (!loc) return [];

  const cities = new Set(loc.matchCities);

  // Recurse into children
  if (loc.children) {
    for (const childSlug of loc.children) {
      for (const city of getLocationCities(childSlug)) {
        cities.add(city);
      }
    }
  }

  return Array.from(cities);
}

/** Get all districts for a location (if it has matchDistricts) */
export function getLocationDistricts(slug: string): string[] | undefined {
  const loc = LOCATIONS[slug];
  return loc?.matchDistricts;
}

/** Search locations by query string — returns matching entries sorted by relevance */
export function searchLocations(query: string): LocationEntry[] {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase()
    .replace(/ś/g, 's').replace(/ł/g, 'l').replace(/ó/g, 'o')
    .replace(/ą/g, 'a').replace(/ę/g, 'e').replace(/ć/g, 'c')
    .replace(/ń/g, 'n').replace(/ż/g, 'z').replace(/ź/g, 'z');

  const results: { entry: LocationEntry; score: number }[] = [];

  for (const entry of Object.values(LOCATIONS)) {
    const nameNorm = entry.name.toLowerCase()
      .replace(/ś/g, 's').replace(/ł/g, 'l').replace(/ó/g, 'o')
      .replace(/ą/g, 'a').replace(/ę/g, 'e').replace(/ć/g, 'c')
      .replace(/ń/g, 'n').replace(/ż/g, 'z').replace(/ź/g, 'z');

    if (!nameNorm.includes(q)) continue;

    // Score: exact start > contains, gmina > powiat > miejscowosc > wojewodztwo
    let score = 0;
    if (nameNorm.startsWith(q)) score += 10;
    if (nameNorm === q) score += 20;

    // Prefer gmina/miasto level
    if (entry.level === 'gmina') score += 5;
    else if (entry.level === 'powiat') score += 3;
    else if (entry.level === 'miejscowosc') score += 2;
    else if (entry.level === 'wojewodztwo') score += 1;

    results.push({ entry, score });
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.entry);
}

/** Get all location slugs that should have their own SEO page (gmina + miejscowosc) */
export function getAllIndexableLocationSlugs(): string[] {
  return Object.values(LOCATIONS)
    .filter((loc) => loc.level === 'gmina' || loc.level === 'miejscowosc' || loc.level === 'powiat')
    .map((loc) => loc.slug);
}

/** Build breadcrumb path for a location: Slaskie > Powiat wodzislawski > Wodzislaw Slaski */
export function getLocationBreadcrumb(slug: string): LocationEntry[] {
  const path: LocationEntry[] = [];
  let current: LocationEntry | undefined = LOCATIONS[slug];

  while (current) {
    path.unshift(current);
    current = current.parentSlug ? LOCATIONS[current.parentSlug] : undefined;
  }

  return path;
}
