# STRATEGIA SEO - CoreLTB Builders

**Data utworzenia:** 2025-12-09
**Status:** W trakcie rozwijania

---

## 1. ARCHITEKTURA URL I TOPIC CLUSTERS

### Kluczowe Wnioski z Researchu

**Źródła:**
- SEMrush: [Topic Clusters](https://www.semrush.com/blog/topic-clusters/)
- SEMrush: [Website Architecture](https://www.semrush.com/blog/website-structure/)
- HubSpot: [Topic Clusters SEO](https://blog.hubspot.com/marketing/topic-clusters-seo)
- Geneo: [Best Practices 2025](https://geneo.app/blog/best-practices-topic-clusters-pillar-pages-google-authority-seo-2025/)

---

### MIT: "Autorytet Folderów"

**❌ NIEPRAWDA:**
> "Google ocenia autorytet folderów - struktura `/filar/artykul` ma większą moc SEO niż `/blog/artykul`"

**✅ PRAWDA (SEMrush):**
> "Cluster pages can be hierarchically organized (`/pillar/cluster`) or on the same level. **It doesn't impact the performance.**"

**Kluczowy insight:**
- Google nie ocenia "mocy folderów" od ~2018 (Hummingbird update)
- Liczy się **topical authority** = internal linking + content depth
- URL depth ≠ SEO power

---

### Decyzja dla CoreLTB Builders

#### LANDING PAGES USŁUG → Hierarchia
```
/oferta/nadzor-i-doradztwo                    # Pillar (główna usługa)
/oferta/nadzor-i-doradztwo/inspektor-nadzoru  # Sub-usługa (landing page)
/oferta/nadzor-i-doradztwo/odbiory-techniczne # Sub-usługa (landing page)
```

**Dlaczego hierarchia?**
- ✅ To portfolio USŁUG, nie artykuły
- ✅ Hierarchia = lepsza dla UX i conversion
- ✅ Breadcrumbs naturalne
- ✅ Logiczne dla użytkownika

#### ARTYKUŁY BLOGOWE → Flat Structure
```
/blog/jak-wybrac-inspektora-nadzoru           # Artykuł edukacyjny
/blog/ile-kosztuje-nadzor-budowlany           # Artykuł edukacyjny
```

**Dlaczego flat?**
- ✅ Krótsze URLe (lepsze CTR w SERPach)
- ✅ Elastyczność (1 artykuł może linkować do wielu usług)
- ✅ Łatwiejsze zarządzanie w CMS

---

### Internal Linking - KLUCZOWE

**Wzorzec (SEMrush/HubSpot):**
- ✅ Pillar → linkuje do WSZYSTKICH clusters
- ✅ Cluster → linkuje do pilara
- ✅ Cluster ↔ Cluster → lateral linking
- ✅ 3-5 linków kontekstowych per artykuł

**Anchory:**
- ✅ Opisowe, naturalne ("sprawdź naszą ofertę nadzoru")
- ❌ Generyczne ("kliknij tutaj", "więcej")

---

### Best Practices URL (SEMrush)

1. **Short & Clear:** Max 60 znaków
2. **Keyword in Slug:** `/oferta/nadzor-i-doradztwo` (nie `/oferta/usluga-1`)
3. **Top-Level Pillars:** Pillary bezpośrednio pod domeną
4. **Lowercase + Hyphens:** Tylko małe litery i myślniki

---

## 2. CONTENT STRATEGY

### Topic Clusters - Struktura

**1 Pillar Page = 8-12 Cluster Articles**

Przykład dla `/oferta/nadzor-i-doradztwo`:
- 8-12 artykułów w `/blog/`
- Każdy linkuje do pilara
- Pillar ma sekcję "Przydatne Poradniki" linkującą do artykułów

---

## 3. TODO - DO ZAIMPLEMENTOWANIA

- [ ] Dodać sekcję "Przydatne Poradniki" do każdej strony usługi (pillar)
- [ ] Stworzyć `/blog` hub
- [ ] Napisać 8-12 artykułów per każdy z 6 filarów
- [ ] Skonfigurować bidirectional linking
- [ ] Dodać Schema.org dla BlogPosting
- [ ] Update sitemap.xml

---

## 4. METRYKI DO ŚLEDZENIA

- Organic traffic per pillar
- Internal link ratio (pillar ↔ clusters)
- Average session duration per cluster
- Conversion rate (cluster → pillar → kontakt)

---

**Ostatnia aktualizacja:** 2025-12-09
