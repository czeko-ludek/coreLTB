/**
 * Pre-computed top 8 projects for homepage carousel.
 *
 * This file exists to avoid importing the full allProjects dataset (~1.8 MB)
 * on the homepage. Only the fields needed by ProjectCard are included.
 *
 * Source order: Z500 first (same as allProjects in data/projects/index.ts).
 * Update this file when changing featured homepage projects.
 */

export const homepageProjects = [
  {
    slug: 'z381',
    alt: 'Wizualizacja projektu Z381',
    title: 'Parterowy dom z dachem 2spadowym oraz 3 sypialniami na 100m2.',
    price: '4 790 zł',
    surfaceArea: '102.64m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'z408',
    alt: 'Wizualizacja projektu Z408',
    title: 'Dom z poddaszem użytkowym, nowoczesną lukarną, garażem i schowkiem na rowery.',
    price: '6 170 zł',
    surfaceArea: '144.55 + 18.37m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'z504',
    alt: 'Wizualizacja projektu Z504',
    title: 'Nowoczesny dom z płaskim dachem, 3 sypialniami, garażem dwustanowiskowym.',
    price: '5 990 zł',
    surfaceArea: '147.26 + 36.91m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'z509',
    alt: 'Wizualizacja projektu Z509',
    title: 'Parterowy, w stylu nowoczesnej stodoły, z dużymi przeszkleniami.',
    price: '5 170 zł',
    surfaceArea: '111.02m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'z565',
    alt: 'Wizualizacja projektu Z565',
    title: 'Dom parterowy z centralnie umieszczoną strefą dzienną oraz garażem na 2 auta.',
    price: '5 790 zł',
    surfaceArea: '131.84 + 34.67m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'z566',
    alt: 'Wizualizacja projektu Z566',
    title: 'Dom parterowy, styl nowoczesna stodoła o układzie "L" z garażem dwustanowiskowym.',
    price: '5 870 zł',
    surfaceArea: '121.79 + 35.88m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'zx214',
    alt: 'Wizualizacja projektu Zx214',
    title: 'Powiększony wariant domu z płaskim dachem i garażem dwustanowiskowym.',
    price: '6 970 zł',
    surfaceArea: '138.63 + 41.92m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'z579',
    alt: 'Wizualizacja projektu Z579',
    title: 'Projekt typu stodoła z poddaszem do adaptacji.',
    price: '6 790 zł',
    surfaceArea: '179.01 + 43.01m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
] as const;
