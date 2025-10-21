# Nieużywane Komponenty w Projekcie CoreLTB Builders

**Data utworzenia**: 2025-01-21
**Ostatnia aktualizacja**: 2025-01-21

## Wprowadzenie

Ten dokument zawiera listę komponentów, które zostały wyłączone z użycia w podstronie `/oferta/kompleksowa-budowa-domow` po wprowadzeniu nowej sekcji **CooperationTimelineSection**.

## Status Komponentów

### ✅ Aktywne Komponenty (używane na stronie usługi V2)

Poniższe komponenty są **AKTUALNIE UŻYWANE** na stronie `/oferta/kompleksowa-budowa-domow`:

#### Sections (Sekcje):
- `PageHeader` - Nagłówek strony z breadcrumbs
- `ServiceIntroSection` - Sekcja intro z tekstem i CTA
- `PhilosophyTimelineSection` - Filozofia firmy (3 punkty)
- `CaseStudiesSection` - Dowód społeczny (case studies z karuzelą)
- `ProcessInfographicSection` - Infografika procesu (5 kroków w grid)
- `ServicesAccordionSection` - Rozwijane sekcje usług (accordion)
- `ClientTestimonialsSection` - Opinie klientów (grid 3 kolumny)
- `CooperationTimelineSection` ✨ **NOWY** - Etapy współpracy (8 kroków z scrollspy)
- `ContactCTASection` - Formularz kontaktowy + FAQ

#### Shared Components (Komponenty współdzielone):
- `CaseStudyCard` - Karta case study
- `ProcessStepDetailed` - Szczegółowy krok procesu
- `AccordionItem` - Rozwijany element accordion
- `TimelineNav` ✨ **NOWY** - Nawigacja timeline'a (8 ikon)
- `TimelineStep` ✨ **NOWY** - Krok timeline'a z interaktywnym scrollspy
- `TestimonialCard` - Karta opinii klienta
- `SliderArrow` - Strzałka karuzeli (użyta w CaseStudiesSection)
- `SectionHeader` - Reużywalny nagłówek sekcji
- `NumberedListItem` - Numerowany element listy (użyty w PhilosophyTimelineSection)

### ⚠️ Deprecated Komponenty (używane tylko w V1)

Poniższe komponenty są **NIEUŻYWANE** na nowej stronie V2, ale są nadal dostępne w starym pliku `pageOLD.tsx` (backup):

#### Sections (Stara wersja V1):
- `ServiceHeroSection` - Zastąpiony przez EmotionalHeroSection / PageHeader + ServiceIntroSection
- `IconicFeaturesSection` - Zastąpiony przez ProcessInfographicSection
- `FlexibilitySection` - Nie ma odpowiednika w V2 (feature usunięty)
- `ProcessTimelineSection` - Zastąpiony przez CooperationTimelineSection
- `ServiceAreaSection` - Nie ma odpowiednika w V2 (feature usunięty)
- `ProofSection` - Częściowo zastąpiony przez CaseStudiesSection i ClientTestimonialsSection
- `ContentSection` - Zastąpiony przez ServicesAccordionSection
- `RealizationsGallery` - Nie ma odpowiednika w V2 (galeria przeniesiona do dedykowanych stron projektów)

#### Shared Components (Stara wersja V1):
- `ServiceFeatureCard` - Używany w IconicFeaturesSection (deprecated)
- `FlexibilityOptionCard` - Używany w FlexibilitySection (deprecated)
- `ProcessStepCard` - Zastąpiony przez ProcessStepDetailed
- `ProofStatCard` - Używany w ProofSection (deprecated)

## Szczegóły Nowej Implementacji

### CooperationTimelineSection

**Lokalizacja**: `/components/sections/CooperationTimelineSection.tsx`

**Opis**: Interaktywna sekcja timeline'a z 8 etapami współpracy, która wykorzystuje:
- **Intersection Observer API** do automatycznego wykrywania aktywnego kroku podczas scrollowania
- **Smooth scroll** do płynnego przewijania po kliknięciu na ikonę w nawigacji
- **Responsywny layout**: dwukolumnowy (desktop) i jednokolumnowy (mobile)

**Użyte technologie**:
- `react-intersection-observer` - do trackingu widoczności kroków
- `next/image` - do optymalizacji obrazów
- `clsx` - do warunkowych klas CSS

**Składowe komponenty**:
1. **TimelineNav** (`/components/shared/TimelineNav.tsx`)
   - Nawigacja skrótowa z 8 ikonami
   - Tooltips na hover
   - Aktywny stan wizualny (złote tło)
   - Horizontal scroll na mobile

2. **TimelineStep** (`/components/shared/TimelineStep.tsx`)
   - Osobny layout dla mobile i desktop
   - Formatowanie tekstu z pogrubieniami (markdown `**tekst**`)
   - Vertical timeline line łącząca kroki
   - Callback `onInView` dla synchronizacji z nawigacją

**Dane**: `/data/servicesV2.ts` → `cooperationTimeline` (8 kroków)

**Obrazy**: `/public/images/uslugi/kompleksowa-budowa-domow/timeline/`
- dzialka-budowlana.jpg
- projekt-domu.jpg
- przylacza-budowlane.jpg
- pozwolenie-na-budowe.jpg
- wsparcie-finansowanie.jpg
- realizacja-budowy.jpg
- zagospodarowanie-terenu.jpg
- odbior-gwarancja.jpg

## Rekomendacje

### Dla Deweloperów:
1. **NIE USUWAJ** komponentów deprecated - mogą być potrzebne jako referencja
2. Jeśli potrzebujesz stworzyć nową usługę, **użyj struktury V2** (`servicesV2.ts`)
3. Folder `/public/images/uslugi/[slug]/timeline/` powinien zawierać 8 obrazów dla każdej usługi używającej CooperationTimelineSection

### Dla Przyszłych Migracji:
- Stara wersja (V1) znajduje się w `pageOLD.tsx` i `services.ts`
- Nowa wersja (V2) znajduje się w `page.tsx` i `servicesV2.ts`
- Aby wrócić do starej wersji:
  ```bash
  mv app/oferta/[slug]/page.tsx app/oferta/[slug]/pageV2.tsx
  mv app/oferta/[slug]/pageOLD.tsx app/oferta/[slug]/page.tsx
  ```

## Notatki Techniczne

### Naprawione Błędy podczas Implementacji:
1. **SliderArrow** - Dodano prop `className?: string` dla elastycznego pozycjonowania
2. **Button** - Dodano props `type?: 'button' | 'submit' | 'reset'` i `disabled?: boolean`
3. **Icon.tsx** - Dodano ikony timeline: `draftingCompass`, `plug`, `stamp`, `landmark`, `shovel`, `keyRound`
4. **app/layout.tsx** - Dodano `data-scroll-behavior="smooth"` dla smooth scrolling
5. **CaseStudiesSection** - Naprawiono `direction="left|right"` zamiast `"prev|next"`

### Kluczowe Zmiany w Interfejsach:
- `ServiceV2` - Dodano pole `cooperationTimeline?: CooperationTimelineData`
- `CooperationTimelineStep` - Nowy interface z polami: `id`, `number`, `icon`, `label`, `title`, `content`, `imageSrc`, `imageAlt`
- `TimelineNavItem` - Wymaga pola `number: number` (nie index!)
- `TimelineStepProps` - Wymaga callback `onInView: (stepNumber: number) => void`

---

**Autor**: Claude Code
**Wersja dokumentu**: 1.0
**Status**: ✅ Kompletny
