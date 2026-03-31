/**
 * Prawdziwe opinie z wizytówki Google Business Profile
 * Źródło: CoreLTB Builders Sp. z o.o. — Google Maps
 *
 * Ostatnia aktualizacja: 2026-03-31
 * UWAGA: Dane aktualizować ręcznie po pojawieniu się nowych opinii.
 */

export interface GoogleReview {
  /** Imię i nazwisko z profilu Google */
  readonly author: string;
  /** Inicjały do avatara */
  readonly initials: string;
  /** Ocena 1-5 gwiazdek */
  readonly rating: number;
  /** Treść opinii */
  readonly text: string;
  /** Relatywna data z Google */
  readonly relativeDate: string;
  /** Kontekst / firma (opcjonalne, np. "Globmill Sp. z o.o.") */
  readonly company?: string;
}

export interface GoogleReviewsData {
  /** Łączna ocena firmy w Google */
  readonly aggregateRating: number;
  /** Łączna liczba opinii w Google */
  readonly totalReviews: number;
  /** Lista wybranych opinii do wyświetlenia */
  readonly reviews: readonly GoogleReview[];
}

export const googleReviewsData: GoogleReviewsData = {
  aggregateRating: 5.0,
  totalReviews: 12,

  reviews: [
    {
      author: 'Marcin D.',
      initials: 'MD',
      rating: 5,
      text: 'Na firmę CoreLTB trafiłem przez Oferteo i był to strzał w dziesiątkę. Pan Tomasz i jego ekipa postawili mi dom od fundamentów do prawie stanu deweloperskiego — w warunkach, które wielu wykonawców by odrzuciło. Na działce nie ma wody ani prądu, a mimo to firma radziła sobie sama. Zero wymówek, po prostu robota do przodu. Kontakt z Panem Tomaszem to czysta przyjemność — zawsze dostępny, konkretny, bez ściemy. Polecam z czystym sumieniem.',
      relativeDate: '6 dni temu',
    },
    {
      author: 'Wojciech Kozieł',
      initials: 'WK',
      rating: 5,
      text: 'Razem z narzeczoną szukaliśmy pomocy przy starcie z projektem. Inne firmy próbowały „torpedować" nasze pomysły. Natomiast Pan Tomasz wraz z Panią Basią przyjęli nas bez wahania i wysłuchali wszystkich oczekiwań. Panu Tomaszowi można zadać jakiekolwiek pytanie — odpowiada bez mrugnięcia, a gdy mieliśmy wątpliwości, wyciągał kalkulator i rozkładał odpowiedź na czynniki. Zdecydowanie polecam każdemu, kto zaczyna przygotowania do startu z marzeniem.',
      relativeDate: 'miesiąc temu',
    },
    {
      author: 'Dawid Rduch',
      initials: 'DR',
      rating: 5,
      text: 'CoreLTB budowali mi dom do stanu surowego otwartego. Współpraca od A do Z bezproblemowa. Kosztorys się zgadzał, żadnych niespodzianek finansowych po drodze.',
      relativeDate: 'tydzień temu',
    },
    {
      author: 'Karol Tulec',
      initials: 'KT',
      rating: 5,
      text: 'Mogę polecić CoreLTB Builders jako rzetelną, profesjonalną firmę. Dbają o jakość i płynny przebieg całego procesu budowy domu. Wszystko bez żadnych problemów.',
      relativeDate: '6 dni temu',
    },
    {
      author: 'Iwona Sz.',
      initials: 'IS',
      rating: 5,
      text: 'Ekipa mega profesjonalnie podchodzi do swojej pracy, codziennie niezależnie od pogody, leje, nie leje przyjeżdżają punktualnie, szybko i bardzo precyzyjnie robią swoją robotę. I wszystko w przystępnej cenie!',
      relativeDate: 'rok temu',
    },
    {
      author: 'Michał Roszak',
      initials: 'MR',
      rating: 5,
      text: 'Firma CoreLTB wykonała dla naszej firmy projekt techniczny wraz z uzyskaniem opinii rzeczoznawcy p.poż. Pracownicy wykazali duży profesjonalizm, doświadczenie, terminowość oraz wysoką jakość. Polecamy jako sprawdzonego wykonawcę.',
      relativeDate: '2 lata temu',
      company: 'Globmill Sp. z o.o.',
    },
    {
      author: 'Adam R.',
      initials: 'AR',
      rating: 5,
      text: 'Firma z fantastycznym podejściem do Klienta. Dużo cierpliwości do tematów związanych z urzędami i ich decyzjami oraz duży profesjonalizm i nieocenione wsparcie.',
      relativeDate: 'rok temu',
    },
    {
      author: 'Monika Niewola',
      initials: 'MN',
      rating: 5,
      text: 'Polecam. Zawsze dobrze doradzają, nie wpędzają w niepotrzebne koszty, a wszystko jest na takim poziomie jak powinno. 100%!',
      relativeDate: 'rok temu',
    },
    {
      author: 'Paweł Płocica',
      initials: 'PP',
      rating: 5,
      text: 'Zdecydowanie polecam. Bardzo fachowe podejście do klienta. Połączenie ogromnej wiedzy i doświadczenia z wielkim zaangażowaniem i profesjonalizmem.',
      relativeDate: '2 lata temu',
    },
    {
      author: 'S P',
      initials: 'SP',
      rating: 5,
      text: 'Solidna i rzetelna firma. Wszystko na czas. Jesteśmy bardzo zadowoleni.',
      relativeDate: 'rok temu',
    },
    {
      author: 'Joanna Sap',
      initials: 'JS',
      rating: 5,
      text: 'Polecam! Pełen profesjonalizm, rzetelność i fachowość. Widać, że znają się na rzeczy!',
      relativeDate: '2 lata temu',
    },
    {
      author: 'Grzegorz N.',
      initials: 'GN',
      rating: 5,
      text: 'Zdecydowanie polecam! Niezwykle fachowe podejście do klienta. Pracownicy charakteryzują się ogromną wiedzą i wieloletnim doświadczeniem, a także niesamowitym zaangażowaniem. To miejsce naprawdę wyróżnia się na tle innych.',
      relativeDate: '2 lata temu',
    },
  ],
};
