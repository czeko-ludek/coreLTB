// data/projects/manual.ts
// 5 projektow wlasnych (recznie dodanych)

import type { Project } from './types';

export const manualProjects: Project[] = [
  {
    slug: 'zb5-duo',
    source: 'own',
    id: 'Zb5 duo',
    title: 'Dom dwulokalowy w stylu współczesnym z dużymi przeszkleniami',
    alt: 'Wizualizacja domu ZB5 Duo',
    price: '10 900 zł',
    availability: '3 dni robocze',
    surfaceArea: '248 + 38m²',
    estimatedBuildCost: '984 tys. zł',
    technology: 'MUROWANY',
    category: 'dwulokalowy',
    dateAdded: Date.parse('2025-12-01'),
    galleryImageCount: 5, // Łączna liczba zdjęć w galerii (main.jpg + 4x gallery-X.jpg)
    floorPlans: [
      {
        name: 'Parter',
        area: '106,4m²',
        image: 'plan-parter.webp',
        rooms: [
          { name: 'Garaż', area: '19,1 m²' },
          { name: 'Hol', area: '10,3 m²' },
          { name: 'Kuchnia', area: '5,3 m²' },
          { name: 'Pomieszczenie gospodarcze', area: '5,3 m²' },
          { name: 'Salon', area: '30,0 m²' },
          { name: 'Sień', area: '5,0 m²' },
          { name: 'WC', area: '2,6 m²' },
          { name: 'Garaż', area: '19,1 m²' },
          { name: 'Hol', area: '10,3 m²' },
          { name: 'Kuchnia', area: '5,3 m²' },
          { name: 'Pomieszczenie gospodarcze', area: '5,3 m²' },
          { name: 'Salon', area: '30,0 m²' },
          { name: 'Sień', area: '5,0 m²' },
          { name: 'WC', area: '2,6 m²' },
        ],
      },
      {
        name: 'Poddasze',
        area: '141,5m²',
        image: 'plan-poddasze.webp',
        rooms: [
          { name: 'Garderoba', area: '3,7 m²' },
          { name: 'Hol', area: '5,8 m²' },
          { name: 'Łazienka', area: ' 15,3 m²' },
          { name: 'Pokój', area: '15,9 m²' },
          { name: 'Pokój', area: '16,1 m²' },
          { name: 'Pokój', area: '16,5 m²' },
          { name: 'Schody', area: '5,4 m²' },
          { name: 'Garderoba', area: '3,7 m²' },
          { name: 'Hol', area: '5,8 m²' },
          { name: 'Łazienka', area: ' 15,3 m²' },
          { name: 'Pokój', area: '15,9 m²' },
          { name: 'Pokój', area: '16,1 m²' },
          { name: 'Pokój', area: '16,5 m²' },
          { name: 'Schody', area: '5,4 m²' },
        ],
      },
    ],
    specifications: [
      {
        title: 'Powierzchnia i wymiary',
        items: [
          { label: 'Powierzchnia użytkowa / netto', value: '247,9 / 312,9 m²' },
          { label: 'Powierzchnia zabudowy', value: '212,6 m²' },
          { label: 'Powierzchnia garażu', value: '38,2 m²' },
          { label: 'Kubatura', value: '877,94 m³' },
          { label: 'Wysokość domu', value: '9,33 m' },
          { label: 'Kąt nachylenia dachu', value: '35° / 5°' },
          { label: 'Powierzchnia dachu', value: '248,5 m²' },
          { label: 'Wysokość ścianki kolankowej', value: '1,48 m' },
          { label: 'Minimalne wymiary działki', value: '22,9 x 21,78 m' },
        ],
      },
      {
        title: 'Technologia i konstrukcja',
        items: [
          { label: 'Strop (parter)', value: 'gęstożebrowy' },
          { label: 'Pokrycie dachu', value: 'gont / blacha / blachodachówka / dachówka' },
          { label: 'Technologia', value: 'murowany' },
          { label: 'Konstrukcja dachu', value: 'więźba tradycyjna' },
          {
            label: 'Założenia projektowe konstrukcji',
            value: 'Konstrukcja zgodna z normami Eurokod. Projekt konstrukcji wykonany został przy założeniach:\n• III strefa wiatrowa dla H = 300m n.p.m. obciążenia wiatrem (300 N/m2)\n• III strefa śniegowa dla H = 300m n.p.m. obciążenia śniegiem (1200 N/m2)\n• głębokość przemarzania gruntu hz = 1,2m\n• budynek zaliczono do I-ej kategorii geotechnicznej\n• obliczeniowy graniczny opór podłoża gruntowego założono: mxQf = 150kPa'
          },
        ],
      },
      {
        title: 'Instalacje',
        items: [
          { label: 'Instalacja grzewcza', value: 'kocioł na gaz' },
          { label: 'Instalacja CWU', value: 'kocioł na gaz, pompa ciepła powietrzna' },
          { label: 'Instalacje uzupełniające', value: 'kominek (bez rozprowadzenia), grzejniki' },
          { label: 'Rodzaj wentylacji', value: 'mechaniczna (rekuperacja)' },
          { label: 'Energia pierwotna (Ep)', value: '65,86 kWh/m²/rok' },
          { label: 'Energia końcowa (Ek)', value: '49,5 kWh/m²/rok' },
          { label: 'Uwagi', value: 'Jeżeli w danym pomieszczeniu nie ma możliwości zastosowania grzejnika/-ów wówczas stosujemy ogrzewanie podłogowe' },
        ],
      },
      {
        title: 'Opis funkcjonalny',
        items: [
          {
            label: 'Opis',
            value: 'Zb5 duo to tradycyjny dom dwulokalowy z dachem dwuspadowym, nowoczesną bryłą i jednostanowiskowym garażem dla każdego lokalu. Może być pobudowany również jako zabudowa szeregowa, ponieważ nie posiada bocznych otworów okiennych. Charakterystyczne dlatego budynku są duże przeszklenia. Ze strony ogrodowej zastosowano wykusze.\n\nU progu wita nas zadaszone wejście do sieni, z której są dwa wejścia: do pomieszczenia gospodarczego oraz w głąb domu. Centralny ośrodek strefy dziennej stanowi przestronny salon z kominkiem i aneksem kuchennym.\n\nSchody umieszczone w środkowej części domu prowadzą na poddasze użytkowe, gdzie architekt zaprojektował 3 sypialnie i ogólnodostępną garderobę oraz łazienkę na końcu holu.'
          },
          {
            label: 'Inne nazwy projektu',
            value: 'WAE1511, TAG-399, SZ5 Zb5 duo CE (DOM OZ8-57)'
          },
        ],
      },
    ],
    costCalculation: {
      title: 'Kalkulacja szacunkowa Zb5 duo',
      items: [
        { name: 'Stan zerowy', prices: { average: '167 228 zł', min: '149 311 zł' } },
        { name: 'Stan surowy otwarty', prices: { average: '609 891 zł', min: '544 545 zł' } },
        { name: 'Stan surowy zamknięty', prices: { average: '983 695 zł', min: '878 299 zł' } },
        { name: 'Instalacje', prices: { average: '147 554 zł', min: '131 745 zł' } },
        { name: 'Prace wykończeniowe', prices: { average: '442 663 zł', min: '395 234 zł' } },
        { name: 'Razem', prices: { average: '1 573 912 zł', min: '1 405 278 zł' } },
      ],
    },
  },
  {
    slug: 'zx201',
    source: 'own',
    id: 'Zx201',
    title: 'Nowoczesny dom z przestronnym salonem, dużymi przeszkleniami',
    alt: 'Wizualizacja domu Zx201',
    price: '5 490 zł',
    availability: '3 dni robocze',
    surfaceArea: '108m²',
    estimatedBuildCost: '354 tys. zł',
    technology: 'MUROWANY',
    category: 'parterowy',
    dateAdded: Date.parse('2025-11-15'),
    galleryImageCount: 5,
    floorPlans: [
      {
        name: 'Parter',
        area: '108,1m²',
        image: 'plan-parter.webp',
        rooms: [
            { name: 'Sień', area: '4,9 m²' },
            { name: 'Garderoba', area: '4,9 m²' },
            { name: 'Hol', area: '10,5 m²' },
            { name: 'Łazienka', area: '7,5 m²' },
            { name: 'Pokój', area: '12,4 m²' },
            { name: 'Pokój', area: '12,0 m²' },
            { name: 'Pokój', area: '11,6 m²' },
            { name: 'Łazienka', area: '3,1 m²' },
            { name: 'Pomieszczenie gospodarcze', area: '4,6 m²' },
            { name: 'Salon+kuchnia', area: '41,2 m²' },
        ],
      },
    ],
    specifications: [
      {
        title: 'Powierzchnia i wymiary',
        items: [
          { label: 'Powierzchnia użytkowa / netto', value: '108,1 / 112,7 m²' },
          { label: 'Powierzchnia zabudowy', value: '149,7 m²' },
          { label: 'Kubatura', value: '416,74 m³' },
          { label: 'Wysokość domu', value: '7,74 m' },
          { label: 'Kąt nachylenia dachu', value: '30° / 20°' },
          { label: 'Powierzchnia dachu', value: '208,1 m²' },
          { label: 'Minimalne wymiary działki', value: '20,36 x 21,26 m' },
        ],
      },
      {
        title: 'Technologia i konstrukcja',
        items: [
          { label: 'Pokrycie dachu', value: 'gont / blacha / blachodachówka / dachówka' },
          { label: 'Technologia', value: 'murowany' },
          { label: 'Posadowienie', value: 'fundament liniowy' },
          { label: 'Konstrukcja dachu', value: 'żelbetowy (stropodach)' },
          {
            label: 'Założenia projektowe konstrukcji',
            value: 'Konstrukcja zgodna z normami Eurokod. Projekt konstrukcji wykonany został przy założeniach:\n• III strefa wiatrowa dla H = 300m n.p.m. obciążenia wiatrem (300 N/m2)\n• III strefa śniegowa dla H = 300m n.p.m. obciążenia śniegiem (1200 N/m2)\n• głębokość przemarzania gruntu hz = 1,2m\n• budynek zaliczono do I-ej kategorii geotechnicznej\n• obliczeniowy graniczny opór podłoża gruntowego założono: mxQf = 150kPa'
          },
        ],
      },
      {
        title: 'Instalacje',
        items: [
          { label: 'Instalacja grzewcza', value: 'kocioł na gaz' },
          { label: 'Instalacja CWU', value: 'kocioł na gaz, kolektory słoneczne' },
          { label: 'Instalacje uzupełniające', value: 'kominek (bez rozprowadzenia), grzejniki' },
          { label: 'Rodzaj wentylacji', value: 'mechaniczna (rekuperacja)' },
          { label: 'Energia pierwotna (Ep)', value: '57,59 kWh/m²/rok' },
          { label: 'Energia końcowa (Ek)', value: '58,63 kWh/m²/rok' },
          { label: 'Uwagi', value: 'Jeżeli w danym pomieszczeniu nie ma możliwości zastosowania grzejnika/-ów wówczas stosujemy ogrzewanie podłogowe' },
        ],
      },
      {
        title: 'Opis funkcjonalny',
        items: [
          {
            label: 'Opis',
            value: 'Zx201 to nowoczesny, parterowy dom z dużymi przeszkleniami od strony frontu i ogrodu. Cechą charakterystyczną bryły jest wyraźny podział na dwie części, poprzez zastosowanie różnicy wysokości elewacji. Pierwsza część to strefa dzienna, natomiast druga to strefa wejściowa i nocna. Ten zabieg pozwolił na stworzenie nietypowej przestrzeni.\n\nNiestandardowo pomieszczenie gospodarcze stało się elementem dekoracyjnym salonu, dzięki zastosowaniu kominka. Pokój znajdujący się na przeciwko pomieszczenia gospodarczego, może pełnić rolę gabinetu (gość nie przechodzi ani przez strefę dzienną ani nocną), dlatego zaletą jest również usytuowana w pobliżu łazienka.\n\nNiezwykłe jest to, iż pomimo niewielkiego metrażu, w domu Zx201 jest możliwość zastosowania antresoli we wszystkich pokojach, dzięki temu otrzymujemy dodatkową przestrzeń. Kolejnym atutem domku jest możliwość dobudowania garażu zarówno od strony frontu jak i bocznej elewacji. Na wizualizacjach zaproponowano wiatę. Warto również wspomnieć, iż domek można zbliźniaczyć.\n\nProjekt Zx201 jest stworzony dla ludzi ceniących sobie oryginalny wygląd oraz funkcjonalną przestrzeń zamkniętą w niewielkiej powierzchni.'
          },
        ],
      },
    ],
    costCalculation: {
      title: 'Kalkulacja szacunkowa Zx201',
      items: [
        { name: 'Stan zerowy', prices: { average: '60 220 zł', min: '53 768 zł' } },
        { name: 'Stan surowy otwarty', prices: { average: '219 625 zł', min: '196 094 zł' } },
        { name: 'Stan surowy zamknięty', prices: { average: '354 234 zł', min: '316 281 zł' } },
        { name: 'Instalacje', prices: { average: '53 135 zł', min: '47 442 zł' } },
        { name: 'Prace wykończeniowe', prices: { average: '159 406 zł', min: '142 326 zł' } },
        { name: 'Razem', prices: { average: '566 775 zł', min: '506 049 zł' } },
      ],
    },
  },
  {
    slug: 'z357-d-ecodom',
    source: 'own',
    id: 'Z357 D EcoDom',
    title: 'Dom z poddaszem użytkowym, garażem dwustanowiskowym oraz antresolą.',
    alt: 'Wizualizacja domu Z357 D EcoDom',
    price: '8 100 zł', // Brak danych
    availability: '3 dni robocze', // Brak danych
    surfaceArea: '177 + 34m²',
    estimatedBuildCost: '810 000 zł',
    technology: 'DREWNIANY',
    category: 'z-poddaszem',
    dateAdded: Date.parse('2025-10-20'),
    galleryImageCount: 4, // Domyślna wartość, do uzupełnienia
    floorPlans: [
      {
        name: 'Parter',
        area: '95,8m2',
        image: 'plan-parter.webp', // Nazwa pliku do uzupełnienia
        rooms: [
          { name: 'Sień', area: '5,3 m²' },
          { name: 'Hol', area: '9,7 m²' },
          { name: 'WC', area: '3,2 m²' },
          { name: 'Kuchnia', area: '12,5 m²' },
          { name: 'Spiżarnia', area: '3,2 m²' },
          { name: 'Pokój', area: '13,3 m²' },
          { name: 'Garderoba', area: '6,9 m²' },
          { name: 'Łazienka', area: '6,7 m²' },
          { name: 'Salon+jadalnia', area: '34,9 m²' },
          { name: 'Pomieszczenie gospodarcze', area: '6,6 m²' },
          { name: 'Garaż', area: '33,6 m²' },
        ],
      },
      {
        name: 'Poddasze',
        area: '81,6m²',
        image: 'plan-poddasze.webp', // Nazwa pliku do uzupełnienia
        rooms: [
            { name: 'Hol', area: '17,4 m²' },
            { name: 'Pokój', area: '11,4 m²' },
            { name: 'Garderoba', area: '10,5 m²' },
            { name: 'Pokój', area: '11,4 m²' },
            { name: 'Garderoba', area: '8,7 m²' },
            { name: 'Pokój', area: '13,6 m²' },
            { name: 'Garderoba', area: '6,8 m²' },
            { name: 'Łazienka', area: '6,8 m²' },
            { name: 'Łazienka', area: '11,8 m²' },
            { name: 'Pralnia', area: '3,4 m²' },
            { name: 'Schody', area: '3,8 m²' },
        ],
      },
    ],
    specifications: [
      {
        title: 'Powierzchnia i wymiary',
        items: [
          { label: 'Powierzchnia użytkowa / netto', value: '177,5 / 241,5 m²' },
          { label: 'Powierzchnia zabudowy', value: '165,0 m²' },
          { label: 'Powierzchnia garażu', value: '33,6 m²' },
          { label: 'Kubatura', value: '742,47 m³' },
          { label: 'Wysokość domu', value: '8 m' },
          { label: 'Kąt nachylenia dachu', value: '40°' },
          { label: 'Powierzchnia dachu', value: '251,34 m²' },
          { label: 'Wysokość ścianki kolankowej', value: '1,55 m' },
          { label: 'Minimalne wymiary działki', value: '24,22 x 22,12 m' },
        ],
      },
      {
        title: 'Technologia i konstrukcja',
        items: [
          { label: 'Strop (parter)', value: 'drewniany' },
          { label: 'Pokrycie dachu', value: 'gont / blacha / blachodachówka / dachówka' },
          { label: 'Posadowienie', value: 'fundament liniowy' },
          { label: 'Konstrukcja dachu', value: 'więźba tradycyjna' },
          {
            label: 'Założenia projektowe konstrukcji',
            value: 'Projekt konstrukcji wykonany został przy założeniach:\n• III strefa wiatrowa dla H = 300m n.p.m. obciążenia wiatrem (300 N/m2)\n• III strefa śniegowa dla H = 300m n.p.m. obciążenia śniegiem (1200 N/m2)\n• głębokość przemarzania gruntu hz = 1,2m\n• budynek zaliczono do I-ej kategorii geotechnicznej\n• obliczeniowy graniczny opór podłoża gruntowego założono: mxQf = 150kPa'
          },
        ],
      },
      {
        title: 'Instalacje',
        items: [
          { label: 'Instalacja grzewcza', value: 'kocioł na gaz' },
          { label: 'Instalacja CWU', value: 'kocioł na gaz' },
          { label: 'Rodzaj wentylacji', value: 'mechaniczna (rekuperacja)' },
          { label: 'Energia pierwotna (Ep)', value: '25,15 kWh/m²/rok' },
          { label: 'Energia końcowa (Ek)', value: '65,81 kWh/m²/rok' },
        ],
      },
    ],
    costCalculation: {
      title: 'Kalkulacja szacunkowa Zx201',
      items: [
        { name: 'Stan zerowy', prices: { average: '94 119 zł', min: '84 035 zł' } },
        { name: 'Stan surowy otwarty', prices: { average: '343 259 zł', min: '306 481 zł' } },
        { name: 'Stan surowy zamknięty', prices: { average: '553 644 zł', min: '494 325 zł' } },
        { name: 'Instalacje', prices: { average: '83 047 zł', min: '74 149 zł' } },
        { name: 'Prace wykończeniowe', prices: { average: '249 140 zł', min: '222 446 zł' } },
        { name: 'Razem', prices: { average: '885 831 zł', min: '790 921 zł' } },
      ],
    },
  },
  {
    slug: 'zx251',
    source: 'own',
    id: 'Zx251',
    title: 'Dom z wysokim salonem, wydzieloną sypialnią , dużymi przeszkleniami',
    alt: 'Wizualizacja domu Zx251',
    price: '7 940 zł',
    availability: '3 dni robocze', // Brak danych
    surfaceArea: '157 + 55 m²',
    estimatedBuildCost: '747 tys. zł',
    technology: 'MUROWANY',
    category: 'z-poddaszem',
    dateAdded: Date.parse('2025-09-10'),
    galleryImageCount: 5, // Domyślna wartość, do uzupełnienia
    floorPlans: [
      {
        name: 'Parter',
        area: '118,2m²',
        image: 'plan-parter.webp', // Nazwa pliku do uzupełnienia
        rooms: [
          { name: 'Sień', area: '3,6 m²' },
          { name: 'Hol', area: '9,7 m²' },
          { name: 'Kuchnia', area: '9,5 m²' },
          { name: 'Salon+jadalnia', area: '45,0 m²' },
          { name: 'Łazienka', area: '5,2 m²' },
          { name: 'Pokój', area: '17,7 m²' },
          { name: 'Garderoba', area: '4,2 m²' },
          { name: 'Łazienka', area: '6,6 m²' },
          { name: 'Pokój', area: '17,1 m²' },
          { name: 'Pomieszczenie gospodarcze', area: '7,1 m²' },
          { name: 'Garaż', area: '55,1 m²' },
        ],
      },
      {
        name: 'Poddasze',
        area: '38,8m²',
        image: 'plan-poddasze.webp', // Nazwa pliku do uzupełnienia
        rooms: [
          { name: 'Hol', area: '4,1 m²' },
          { name: 'Łazienka', area: '2,8 m²' },
          { name: 'Pokój', area: '17,1 m²' },
          { name: 'Garderoba', area: '8,2 m²' },
          { name: 'Pokój', area: '20,5 m²' },
          { name: 'Schody', area: '4,1 m²' },
        ],
      },
    ],
    specifications: [
      {
        title: 'Powierzchnia i wymiary',
        items: [
          { label: 'Powierzchnia użytkowa / netto', value: '157,1 / 237,6 m²' },
          { label: 'Powierzchnia zabudowy', value: '229,0 m²' },
          { label: 'Powierzchnia garażu', value: '55,1 m²' },
          { label: 'Kubatura', value: '938,27 m³' },
          { label: 'Wysokość domu', value: '8,58 m' },
          { label: 'Kąt nachylenia dachu', value: '30°' },
          { label: 'Powierzchnia dachu', value: '315,2 m²' },
          { label: 'Wysokość ścianki kolankowej', value: '0,37 m' },
          { label: 'Minimalne wymiary działki', value: '22,85 x 24,86 m' },
        ],
      },
      {
        title: 'Technologia i konstrukcja',
        items: [
          { label: 'Strop (parter)', value: 'żelbetowy' },
          { label: 'Pokrycie dachu', value: 'gont / blacha / blachodachówka / dachówka' },
          { label: 'Technologia', value: 'murowany' },
          { label: 'Posadowienie', value: 'fundament liniowy' },
          { label: 'Konstrukcja dachu', value: 'więźba tradycyjna' },
          {
            label: 'Założenia projektowe konstrukcji',
            value: 'Konstrukcja zgodna z normami Eurokod. Projekt konstrukcji wykonany został przy założeniach:\n• III strefa wiatrowa dla H = 300m n.p.m. obciążenia wiatrem (300 N/m2)\n• III strefa śniegowa dla H = 300m n.p.m. obciążenia śniegiem (1200 N/m2)\n• głębokość przemarzania gruntu hz = 1,2m\n• budynek zaliczono do I-ej kategorii geotechnicznej\n• obliczeniowy graniczny opór podłoża gruntowego założono: mxQf = 150kPa'
          },
        ],
      },
      {
        title: 'Instalacje',
        items: [
          { label: 'Instalacja grzewcza', value: 'kocioł na gaz' },
          { label: 'Instalacja CWU', value: 'kocioł na gaz, kolektory słoneczne' },
          { label: 'Rodzaj wentylacji', value: 'mechaniczna (rekuperacja)' },
          { label: 'Energia pierwotna (Ep)', value: '57,86 kWh/m²/rok' },
          { label: 'Energia końcowa (Ek)', value: '57,09 kWh/m²/rok' },
        ],
      },
      {
        title: 'Opis funkcjonalny',
        items: [
          {
            label: 'Opis',
            value: 'Wychodząc naprzeciw oczekiwaniom naszych klientów, stworzyliśmy projekt Zx251, w którym zaprojektowano garaż na 2 stanowiska (sama przestrzeń garażu pozwala na dodatkową aranżację i wydzielenie miejsca np.na rowery lub motor).\n\nStrefa prywatna czyli sypialnia główna z garderobą i łazienką jest bardzo wyraźnie oddzielona od pozostałej części domu. Dużym atutem jest tutaj wyjście na ogród, które również daje poczucie intymności. Dla wymagających osób idealnym rozwiązaniem może okazać się pokój na parterze, który może pełnić rolę gabinetu lub pokoju gościnnego. Na piętrze znajdują się pokoje dla dzieci.\n\nSalon z jadalnią i kuchnia jest miejscem dla miłośników dużych przestrzeni. Wysokie okna dają piękny widok, a wysunięcie dachu ochrania nie tylko przed deszczem, ale również przed wpadaniem nadmiernej ilości słońca w upalne dni.'
          },
        ],
      },
    ],
    costCalculation: {
      title: 'Kalkulacja szacunkowa Zx251',
      items: [
        { name: 'Stan zerowy', prices: { average: '127 003 zł', min: '113 396 zł' } },
        { name: 'Stan surowy otwarty', prices: { average: '463 188 zł', min: '413 561 zł' } },
        { name: 'Stan surowy zamknięty', prices: { average: '747 077 zł', min: '667 033 zł' } },
        { name: 'Instalacje', prices: { average: '112 062 zł', min: '100 055 zł' } },
        { name: 'Prace wykończeniowe', prices: { average: '336 185 zł', min: '300 165 zł' } },
        { name: 'Razem', prices: { average: '1 195 324 zł', min: '1 067 253 zł' } },
      ],
    },
  },
  {
    slug: 'z357',
    source: 'own',
    id: 'Z357',
    title: 'Dom nowoczesna stodoła z poddaszem, garażem dwustanowiskowym oraz antresolą',
    alt: 'Wizualizacja domu Z357',
    price: '6 700 zł',
    availability: '3 dni robocze',
    surfaceArea: '179 + 33 m²',
    estimatedBuildCost: '559 tys. zł',
    technology: 'MUROWANY',
    category: 'z-poddaszem',
    dateAdded: Date.parse('2025-08-05'),
    galleryImageCount: 5, // Domyślna wartość, do uzupełnienia
    floorPlans: [
      {
        name: 'Parter',
        area: '94,7m²',
        image: 'plan-parter.webp', // Nazwa pliku do uzupełnienia
        rooms: [
          { name: 'Sień', area: '5,2 m²' },
          { name: 'Hol', area: '11,1 m²' },
          { name: 'WC', area: '3,2 m²' },
          { name: 'Kuchnia', area: '11,7 m²' },
          { name: 'Spiżarnia', area: '2,8 m²' },
          { name: 'Salon+jadalnia', area: '34,2 m²' },
          { name: 'Pokój', area: '13,1 m²' },
          { name: 'Garderoba', area: '6,8 m²' },
          { name: 'Łazienka', area: '6,6 m²' },
          { name: 'Pomieszczenie gospodarcze', area: '6,6 m²' },
          { name: 'Garaż', area: '33,0 m²' },
        ],
      },
      {
        name: 'Poddasze',
        area: '84,3m²',
        image: 'plan-poddasze.webp', // Nazwa pliku do uzupełnienia
        rooms: [
          { name: 'Hol', area: '18,5 m²' },
          { name: 'Pokój', area: '13,5 m²' },
          { name: 'Garderoba', area: '6,9 m²' },
          { name: 'Łazienka', area: '6,9 m²' },
          { name: 'Łazienka', area: '11,3 m²' },
          { name: 'Pralnia', area: '2,9 m²' },
          { name: 'Garderoba', area: '10,6 m²' },
          { name: 'Pokój', area: '11,4 m²' },
          { name: 'Garderoba', area: '8,7 m²' },
          { name: 'Pokój', area: '11,4 m²' },
          { name: 'Schody', area: '3,8 m²' },
        ],
      },
    ],
    specifications: [
      {
        title: 'Powierzchnia i wymiary',
        items: [
          { label: 'Powierzchnia użytkowa / netto', value: '179,0 / 239,9 m²' },
          { label: 'Powierzchnia zabudowy', value: '176,6 m²' },
          { label: 'Powierzchnia garażu', value: '33,0 m²' },
          { label: 'Kubatura', value: '739,12 m³' },
          { label: 'Wysokość domu', value: '8 m' },
          { label: 'Kąt nachylenia dachu', value: '40°' },
          { label: 'Powierzchnia dachu', value: '265,29 m²' },
          { label: 'Wysokość ścianki kolankowej', value: '0,9 m' },
          { label: 'Minimalne wymiary działki', value: '24,46 x 22,46 m' },
        ],
      },
      {
        title: 'Technologia i konstrukcja',
        items: [
          { label: 'Strop (parter)', value: 'żelbetowy' },
          { label: 'Pokrycie dachu', value: 'blacha / dachówka' },
          { label: 'Technologia', value: 'murowany' },
          { label: 'Posadowienie', value: 'fundament liniowy' },
          { label: 'Konstrukcja dachu', value: 'więźba tradycyjna' },
          {
            label: 'Założenia projektowe konstrukcji',
            value: 'Konstrukcja zgodna z normami Eurokod. Projekt konstrukcji wykonany został przy założeniach:\n• III strefa wiatrowa dla H = 300m n.p.m. obciążenia wiatrem (300 N/m2)\n• III strefa śniegowa dla H = 300m n.p.m. obciążenia śniegiem (1200 N/m2)\n• głębokość przemarzania gruntu hz = 1,2m\n• budynek zaliczono do I-ej kategorii geotechnicznej\n• obliczeniowy graniczny opór podłoża gruntowego założono: mxQf = 150kPa'
          },
        ],
      },
      {
        title: 'Instalacje',
        items: [
          { label: 'Instalacja grzewcza', value: 'kocioł na biomasę' },
          { label: 'Instalacja CWU', value: 'kocioł na biomasę, kolektory słoneczne' },
          { label: 'Instalacje uzupełniające', value: 'kominek (bez rozprowadzenia), grzejniki' },
          { label: 'Rodzaj wentylacji', value: 'mechaniczna (rekuperacja)' },
          { label: 'Energia pierwotna (Ep)', value: '24,17 kWh/m²/rok' },
          { label: 'Energia końcowa (Ek)', value: '60,93 kWh/m²/rok' },
          { label: 'Uwagi', value: 'Jeżeli w danym pomieszczeniu nie ma możliwości zastosowania grzejnika/-ów wówczas stosujemy ogrzewanie podłogowe' },
        ],
      },
      {
        title: 'Opis funkcjonalny',
        items: [
          {
            label: 'Opis',
            value: 'Projekt domu z antresolą, poddaszem użytkowym, spadzistym dachem i dwustanowiskowym garażem. Sprosta oczekiwaniom nawet najbardziej wymagającego inwestora.\n\nKonstrukcja zadaszenia przedniej części domu jest tożsama z tylną, natomiast elewacje wykonano w jasnych kolorach, z płytek klinkierowych i białego tynku.\n\nParter to dzienna strefa domu. Duże przeszklenia stanowią niewątpliwie wielki atut prezentowanego projektu. Całą jedną ścianę przeszklono w celu doświetlenia wnętrza, a przede wszystkim dwukondygnacyjnego salonu z antresolą.\n\nPonad trzydziestometrowy salon z kominkiem z łatwością pomieści pianino, które może pełnić funkcję nie tylko ozdobną. Kuchnię można oddzielić ścianką działową od części jadalnej.\n\nBezsporną zaletę stanowi położony w parterze pokój z garderobą i łazienką. Może być wykorzystywany jako „prywatny apartament" dla osoby starszej, lub dla kogoś z odwiedzających nas gości.\n\nPoddasze użytkowe stanowiące piętro, to nocna strefa domu. Mieści się tam druga główna sypialnia z prywatną łazienką i garderobą, oraz dwie sypialnie z garderobami dla dzieci.\n\nZ357 zaprojektowano na planie litery T i jest on skierowany do osób lubiących styl elegancki.'
          },
        ],
      },
    ],
    costCalculation: {
      title: 'Kalkulacja szacunkowa Z357',
      items: [
        { name: 'Stan zerowy', prices: { average: '95 063 zł', min: '84 878 zł' } },
        { name: 'Stan surowy otwarty', prices: { average: '346 702 zł', min: '309 555 zł' } },
        { name: 'Stan surowy zamknięty', prices: { average: '559 196 zł', min: '499 282 zł' } },
        { name: 'Instalacje', prices: { average: '83 879 zł', min: '74 892 zł' } },
        { name: 'Prace wykończeniowe', prices: { average: '251 638 zł', min: '224 677 zł' } },
        { name: 'Razem', prices: { average: '894 713 zł', min: '798 851 zł' } },
      ],
    },
  },
];
