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
    slug: 'z506',
    alt: 'Wizualizacja projektu Z506',
    title: 'Nowoczesny parterowy dom z płaskim dachem, 4 sypialniami i garażem dwustanowiskowym.',
    price: '5 990 zł',
    surfaceArea: '174.42 + 37.18m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'z507',
    alt: 'Wizualizacja projektu Z507',
    title: 'Piętrowy dom z nowoczesną elewacją, 4 sypialniami i garażem.',
    price: '5 990 zł',
    surfaceArea: '163.58 + 37.18m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'z394',
    alt: 'Wizualizacja projektu Z394',
    title: 'Nowoczesny dom parterowy z dachem 2spadowym na 100m2 z garażem 1stanowiskowym.',
    price: '4 990 zł',
    surfaceArea: '105.97 + 19.64m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'z398',
    alt: 'Wizualizacja projektu Z398',
    title: 'Nowoczesny dom parterowy z dachem wielospadowym na 135m2.',
    price: '4 990 zł',
    surfaceArea: '135.85m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
  {
    slug: 'z399',
    alt: 'Wizualizacja projektu Z399',
    title: 'Dom z poddaszem użytkowym z nowoczesną lukarną, garażem.',
    price: '5 170 zł',
    surfaceArea: '135.74 + 19.64m²',
    technology: 'MUROWANY' as const,
    source: 'z500' as const,
  },
] as const;
