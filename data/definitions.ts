/**
 * Definicje i wyjaśnienia terminów używanych w projektach
 * Służy do wyświetlania tooltipów z informacjami dla użytkownika
 */

export interface TermDefinition {
  term: string;
  definition: string;
}

export const termDefinitions: Record<string, string> = {
  // Powierzchnie
  'Powierzchnia użytkowa': `Powierzchnia użytkowa: Powierzchnia wszystkich pomieszczeń z wyłączeniem pomieszczenia technicznego, garażu, pomieszczenia gospodarczego, strychu. Przy obmiarach nie uwzględnia się tynków i okładzin ściennych.

Powierzchnia netto: Jest to powierzchnia wszystkich pomieszczeń budynku mierzona w poziomie podłogi z uwzględnieniem tynków i okładzin ścian. Nie pomniejsza się powierzchni pomieszczeń o zmiennej wysokości – np. na poddaszu. Prościej mówiąc – to tak jak by rozłożyć we wszystkich pomieszczeniach wykładzinę na podłodze.

Do powierzchni użytkowej nie wliczamy: garaży, pomieszczeń technicznych i gospodarczych, kotłowni, nieużytkowych strychów, poddaszy do późniejszej adaptacji na cele mieszkalne, ogrodów zimowych i składzików ogrodowych znajdujących się poza budynkiem.`,

  'Powierzchnia użytkowa / netto': `Powierzchnia użytkowa: Powierzchnia wszystkich pomieszczeń z wyłączeniem pomieszczenia technicznego, garażu, pomieszczenia gospodarczego, strychu. Przy obmiarach nie uwzględnia się tynków i okładzin ściennych.

Powierzchnia netto: Jest to powierzchnia wszystkich pomieszczeń budynku mierzona w poziomie podłogi z uwzględnieniem tynków i okładzin ścian. Nie pomniejsza się powierzchni pomieszczeń o zmiennej wysokości – np. na poddaszu. Prościej mówiąc – to tak jak by rozłożyć we wszystkich pomieszczeniach wykładzinę na podłodze.

Do powierzchni użytkowej nie wliczamy: garaży, pomieszczeń technicznych i gospodarczych, kotłowni, nieużytkowych strychów, poddaszy do późniejszej adaptacji na cele mieszkalne, ogrodów zimowych i składzików ogrodowych znajdujących się poza budynkiem.`,

  'Kubatura': 'Kubatura: Objętość pomieszczeń, czyli powierzchnia pomieszczeń pomnożona przez wysokość danej kondygnacji. Do obliczenia kubatury przyjęliśmy wysokość liczoną od podłogi – od spodu stropu lub do spodu stropodachu.',

  'Kąt nachylenia dachu': 'Kąt nachylenia dachu - kąt nachylenia dachu w stosunku do podłoża.',

  'Powierzchnia zabudowy': 'Powierzchnia zabudowy: Jest to powierzchnia obrysu ścian zewnętrznych budynku. Do powierzchni zabudowy nie wlicza się: podziemnych części budynku, pochylni samochodowych, schodów zewnętrznych, ganków, daszków nad wejściami, galerii oraz wszelkich nadwieszeń kondygnacji. Ale uwzględnia się np. ogrody zimowe lub inne elementy przybudowane.',

  'Wysokość domu': 'Wysokość domu - wysokość liczona od poziomu gruntu do kalenicy bądź attyki.',

  'Powierzchnia dachu': 'Powierzchnia dachu - łączna powierzchnia dachu z wyłączeniem okien dachowych.',

  // Instalacje i energia
  'Instalacja grzewcza': 'Instalacja grzewcza - przewidziany typ ogrzewania dla projektu.',

  'Energia pierwotna (Ep)': 'Energia pierwotna (Ep) - ilość energii wydobytej u źródła i potrzebnej do pokrycia zapotrzebowania na ogrzanie domu, przygotowanie ciepłej wody użytkowej, wentylację mechaniczną klimatyzację.',

  'Energia końcowa (Ek)': 'Energia końcowa (Ek) - ilość energii, którą należy zakupić do ogrzewania domu, przygotowania ciepłej wody użytkowej, wentylacji mechanicznej i klimatyzacji. Ściślej, jest to energia w przeliczeniu na 1 m² na rok.',

  // Stany budowy (dla tabeli kosztów)
  'Stan zerowy': 'Stan zerowy - roboty ziemne, fundamenty, ściany podziemia, podkłady, izolacje.',

  'Stan surowy otwarty': 'Stan surowy otwarty - ściany nośne i działowe, konstrukcja i stropy, schody, kominy, konstrukcja dachu podłoże i pokrycie, izolacje.',

  'Prace wykończeniowe': 'Prace wykończeniowe - tynki i okładziny ścian i sufitów, posadzki, drzwi wewnętrzne itp.',
};

/**
 * Sprawdza czy dany termin ma definicję
 */
export function hasDefinition(term: string): boolean {
  return term in termDefinitions;
}

/**
 * Pobiera definicję dla danego terminu
 */
export function getDefinition(term: string): string | null {
  return termDefinitions[term] || null;
}
