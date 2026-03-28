/**
 * CoreLTB Builders — Google Ads Deep Dive Export v1.0
 *
 * Eksportuje WSZYSTKIE dane z konta Google Ads do Google Sheet:
 *
 * Tab 1:  "Kampanie dziennie"     — dzienny breakdown kampanii
 * Tab 2:  "Search Terms"          — wyszukiwane hasla PMax
 * Tab 3:  "Kategorie ST"          — kategorie search terms
 * Tab 4:  "Assets"                — skutecznosc naglowkow, opisow, obrazow
 * Tab 5:  "Lokalizacje"           — miasta z nazwami (focus: Slask)
 * Tab 6:  "Godziny"               — rozklad godzinowy
 * Tab 7:  "Dni tygodnia"          — poniedzialek-niedziela
 * Tab 8:  "Urzadzenia"            — mobile/desktop/tablet dziennie
 * Tab 9:  "Sieci"                 — Search vs Display vs YouTube vs Maps
 * Tab 10: "Landing Pages"         — ktore strony docelowe konwertuja
 * Tab 11: "Typ klikniecia"        — naglowek vs sitelink vs CTA vs mapa vs telefon
 * Tab 12: "Wiek"                  — grupy wiekowe
 * Tab 13: "Plec"                  — kobiety vs mezczyzni
 * Tab 14: "Konwersje"             — typy konwersji (calculator/consultation/plot_analysis/phone)
 * Tab 15: "Placements"            — gdzie wyswietlaly sie reklamy (strony/kanaly YT)
 * Tab 16: "Budget Pace"           — tempo wydatkowania budzetu vs plan
 * Tab 17: "Podsumowanie"          — KPI, faza nauki, alerty, rekomendacje
 *
 * KONTO: 374-981-3686 (CoreLTB Builders)
 * KAMPANIA: CoreLTB — PMax
 * START: 2026-03-24
 * BUDZET: 50 zl/dzien
 *
 * INSTRUKCJA:
 * 1. Utworz nowy Google Sheet (sheets.new)
 * 2. Wklej URL w SPREADSHEET_URL ponizej
 * 3. Wklej swoj email w EMAIL
 * 4. Google Ads -> Narzedzia -> Skrypty -> Wklej -> Uruchom
 * 5. Zaplanuj: codziennie o 7:00 (budowlanka wstaje wczesnie)
 *
 * v1.0 — CoreLTB Deep Dive Edition
 */

/*** ============ USTAWIENIA ============ ***/

var SPREADSHEET_URL = ""; // <- Wklej URL swojego Google Sheet
var EMAIL = "dawidrduchtarget@gmail.com";
var DAYS_BACK = 30;
var MIN_IMPRESSIONS = 1;

// CoreLTB — daty i budzet kampanii
var CAMPAIGN_START_DATE = "2026-03-24";
var DAILY_BUDGET = 50; // zl/dzien
var TARGET_CPA = 50;   // cel CPA < 50 zl (M1), potem < 30 zl (M3)

// CoreLTB — konwersje i ich wartosci
var CONVERSION_VALUES = {
  "calculator_lead": 150,    // /wycena — najcieplejszy lead
  "consultation_lead": 100,  // /umow-konsultacje
  "plot_analysis_lead": 80,  // /analiza-dzialki
  "phone_click": 50          // klikniecie telefonu
};

// CoreLTB — miasta docelowe (P0/P1/P2)
var CITY_PRIORITIES = {
  // P0 — Rdzen (bazy, najtansze CPC)
  "Rybnik": "P0", "Wodzislaw Slaski": "P0", "Jaworzno": "P0",
  // P1 — Bliskie (15-40 km)
  "Zory": "P1", "Jastrzebie-Zdroj": "P1", "Tychy": "P1", "Gliwice": "P1",
  // P2 — Dalsze (30-50 km, drozsze CPC)
  "Katowice": "P2", "Zabrze": "P2", "Mikolow": "P2", "Raciborz": "P2",
  "Chrzanow": "P2", "Sosnowiec": "P2", "Bytom": "P2", "Bielsko-Biala": "P2"
};

// CoreLTB — kategorie search terms (budowlanka)
var SEARCH_TERM_CATEGORIES = {
  "budowa": ["budowa dom", "budowa domu", "budujemy dom", "budowa domow", "dom jednorodzinny", "dom parterowy", "dom pietrowy"],
  "kalkulator": ["kalkulator", "wycena", "ile kosztuje", "koszt budowy", "cena budowy", "oblicz koszt", "kosztorys"],
  "firma": ["firma budowlana", "generalny wykonawca", "ekipa budowlana", "wykonawca"],
  "pod-klucz": ["pod klucz", "stan deweloperski", "sso", "stan surowy", "deweloperski"],
  "nadzor": ["kierownik budowy", "nadzor", "inspektor", "nadzor inwestorski"],
  "projekty": ["projekt domu", "projekty domow", "gotowy projekt"],
  "lokalne": ["rybnik", "wodzislaw", "jaworzno", "katowice", "gliwice", "tychy", "zory", "jastrzebie", "zabrze", "mikolow", "raciborz", "slask"],
  "brand": ["coreltb", "core ltb", "coreltb builders"],
  "dzialka": ["dzialka", "analiza dzialki", "warunki zabudowy", "mpzp"],
  "technologia": ["murowany", "silikat", "ceramika", "beton komorkowy", "ytong", "silka"]
};

// Negative keyword suggestions — frazy do potencjalnego wykluczenia
// Aktualizowane na podstawie realnych search terms z kampanii
var NEGATIVE_KEYWORD_PATTERNS = [
  // Praca
  "praca", "oferty pracy", "zatrudnienie", "pracownik", "murarz praca",
  // Edukacja
  "kurs", "szkolenie", "studia", "technikum",
  // Nie nasza technologia (potwierdzone w search terms 25-28.03)
  "szkieletow", "modulow", "modularny", "prefabrykowan", "prefabrykat",
  "kontenerow", "drewnian", "z bali", "bale drewniane",
  "keramzyt", "keramzytobeton", "keramzytow",
  // Deweloper/mieszkanie
  "deweloper", "mieszkanie", "blok", "kawalerka", "apartament", "wynajem",
  // Remont (potwierdzone: "firmy remontowe jaworzno")
  "remont", "odnawianie", "renowacja", "malowanie", "remontow",
  // False positives kalkulator
  "excel", "arkusz", "szablon", "pobierz", "pdf",
  // Sprzedaz dzialek
  "dzialka na sprzedaz", "kupno dzialki",
  // Poza zasiegiem
  "warszawa", "gdansk", "poznan", "wroclaw", "lodz", "szczecin", "lublin", "bialystok",
  // Konkurenci (potwierdzone w search terms 25-28.03)
  "abakon", "spec bau", "adamietz", "bud mak", "mawit",
  // Sklepy budowlane (nie nasza usluga)
  "sklep budowlan", "sklepy budowlan",
  // Inne nieistotne
  "joker"
];

/*** ============ KONIEC USTAWIEN ============ ***/


function main() {
  Logger.log("=== CoreLTB Deep Dive Export v1.0 START ===");

  var ss;
  if (SPREADSHEET_URL) {
    ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  } else {
    ss = SpreadsheetApp.create("CoreLTB Ads Deep Dive " + today(), 10000, 20);
    SPREADSHEET_URL = ss.getUrl();
  }

  var dateRange = getDateRange(DAYS_BACK);
  var timeCheck = AdsApp.getExecutionInfo().getRemainingTime();
  Logger.log("Czas dostepny: " + timeCheck + " sek");
  Logger.log("Okres: ostatnie " + DAYS_BACK + " dni");
  Logger.log("Dni od startu kampanii: " + campaignAgeDays());

  // Kolejnosc od najwazniejszych (gdyby timeout)
  safeRun("Tab 1: Kampanie dziennie", function() { exportCampaignDaily(ss, dateRange); });
  safeRun("Tab 2: Search Terms", function() { exportPMaxSearchTerms(ss, dateRange); });
  safeRun("Tab 3: Assets", function() { exportAssetPerformance(ss, dateRange); });
  safeRun("Tab 4: Lokalizacje", function() { exportLocations(ss, dateRange); });
  safeRun("Tab 5: Godziny", function() { exportHourOfDay(ss, dateRange); });
  safeRun("Tab 6: Dni tygodnia", function() { exportDayOfWeek(ss, dateRange); });
  safeRun("Tab 7: Urzadzenia", function() { exportDevices(ss, dateRange); });
  safeRun("Tab 8: Sieci", function() { exportNetworks(ss, dateRange); });
  safeRun("Tab 9: Landing Pages", function() { exportLandingPages(ss, dateRange); });
  safeRun("Tab 10: Typ klikniecia", function() { exportClickType(ss, dateRange); });
  safeRun("Tab 11: Wiek", function() { exportAgeRange(ss, dateRange); });
  safeRun("Tab 12: Plec", function() { exportGender(ss, dateRange); });
  safeRun("Tab 13: Konwersje", function() { exportConversions(ss, dateRange); });
  safeRun("Tab 14: Placements", function() { exportPlacements(ss, dateRange); });
  safeRun("Tab 15: Budget Pace", function() { exportBudgetPace(ss, dateRange); });
  safeRun("Tab 16: ST Alerty", function() { exportSearchTermAlerts(ss, dateRange); });
  safeRun("Tab 17: Podsumowanie", function() { exportSummary(ss, dateRange); });

  // Email
  try {
    var ageDays = campaignAgeDays();
    var phase = ageDays <= 14 ? "FAZA NAUKI" : ageDays <= 28 ? "PIERWSZA OPTYMALIZACJA" : "AKTYWNA";

    MailApp.sendEmail(EMAIL,
      "[CoreLTB Ads] " + phase + " — Raport " + today(),
      "Raport Google Ads CoreLTB Builders (Deep Dive v1.0) jest gotowy:\n" + SPREADSHEET_URL +
      "\n\nKampania: CoreLTB — PMax" +
      "\nDzien kampanii: " + ageDays + " (" + phase + ")" +
      "\nOkres raportu: ostatnie " + DAYS_BACK + " dni" +
      "\nBudzet dzienny: " + DAILY_BUDGET + " zl" +
      "\nCel CPA: < " + TARGET_CPA + " zl" +
      "\n\nWygenerowano: " + new Date().toLocaleString()
    );
  } catch(e) { Logger.log("Email error: " + e); }

  Logger.log("=== DONE === " + SPREADSHEET_URL);
}


// =====================================================
// SAFE RUNNER
// =====================================================
function safeRun(label, fn) {
  var remaining = AdsApp.getExecutionInfo().getRemainingTime();
  if (remaining < 60) {
    Logger.log("!! TIMEOUT — pomijam: " + label + " (zostalo " + remaining + "s)");
    return;
  }
  try {
    Logger.log("> " + label);
    fn();
  } catch(e) {
    Logger.log("!! " + label + " — BLAD: " + e);
  }
}


// =====================================================
// 1. KAMPANIE — STATYSTYKI DZIENNE
// =====================================================
function exportCampaignDaily(ss, dateRange) {
  var query = [
    "SELECT",
    "  segments.date,",
    "  campaign.name,",
    "  campaign.status,",
    "  campaign.advertising_channel_type,",
    "  campaign.bidding_strategy_type,",
    "  metrics.impressions,",
    "  metrics.clicks,",
    "  metrics.cost_micros,",
    "  metrics.conversions,",
    "  metrics.conversions_value,",
    "  metrics.all_conversions,",
    "  metrics.all_conversions_value,",
    "  metrics.ctr,",
    "  metrics.average_cpc,",
    "  metrics.interactions,",
    "  metrics.interaction_rate,",
    "  metrics.view_through_conversions",
    "FROM campaign",
    "WHERE segments.date BETWEEN " + dateRange,
    "  AND campaign.status != 'REMOVED'",
    "ORDER BY segments.date DESC"
  ].join("\n");

  var data = [[
    "Data", "Kampania", "Status", "Typ", "Strategia",
    "Wyswietlenia", "Klikniecia", "Koszt (zl)",
    "Konwersje", "Wart. konw. (zl)", "Wszystkie konw.", "Wart. wszyst. konw. (zl)",
    "CTR", "CPC (zl)", "CPA (zl)",
    "Interakcje", "Wsp. interakcji",
    "View-through konw.",
    "Dzien kampanii", "Budzet plan (zl)", "% budzetu"
  ]];

  var results = AdsApp.search(query);
  while (results.hasNext()) {
    var r = results.next();
    var costZl = r.metrics.costMicros / 1000000;
    var conv = r.metrics.conversions;
    var cpa = conv > 0 ? costZl / conv : 0;
    var dayNum = daysSince(CAMPAIGN_START_DATE, r.segments.date);
    var budgetPct = DAILY_BUDGET > 0 ? (costZl / DAILY_BUDGET * 100) : 0;

    data.push([
      r.segments.date,
      r.campaign.name,
      r.campaign.status,
      r.campaign.advertisingChannelType,
      r.campaign.biddingStrategyType,
      r.metrics.impressions,
      r.metrics.clicks,
      costZl.toFixed(2),
      fix(conv),
      fix(r.metrics.conversionsValue),
      fix(r.metrics.allConversions),
      fix(r.metrics.allConversionsValue),
      pct(r.metrics.ctr),
      micro(r.metrics.averageCpc),
      cpa > 0 ? cpa.toFixed(2) : "—",
      r.metrics.interactions,
      pct(r.metrics.interactionRate),
      r.metrics.viewThroughConversions || 0,
      dayNum >= 0 ? dayNum : "przed startem",
      DAILY_BUDGET.toFixed(2),
      budgetPct.toFixed(1) + "%"
    ]);
  }

  writeToSheet(ss, "Kampanie dziennie", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 2. SEARCH TERMS (search_term_view — dane jak w UI "Wyszukiwane hasla")
// =====================================================
function exportPMaxSearchTerms(ss, dateRange) {
  // --- METODA 1: search_term_view (standardowa, dziala dla Search i czesc PMax) ---
  var allTerms = [[
    "Kampania", "Wyszukiwane haslo",
    "Wyswietlenia", "Klikniecia", "CTR", "Konwersje", "Wart. konw. (zl)",
    "Koszt (zl)", "CPC (zl)", "CPA (zl)",
    "Kategoria CoreLTB", "Potencjalne wykluczenie?"
  ]];

  try {
    var results = AdsApp.search([
      "SELECT",
      "  campaign.name,",
      "  search_term_view.search_term,",
      "  metrics.impressions,",
      "  metrics.clicks,",
      "  metrics.ctr,",
      "  metrics.conversions,",
      "  metrics.conversions_value,",
      "  metrics.cost_micros,",
      "  metrics.average_cpc",
      "FROM search_term_view",
      "WHERE segments.date BETWEEN " + dateRange,
      "  AND metrics.impressions >= " + MIN_IMPRESSIONS,
      "ORDER BY metrics.impressions DESC"
    ].join("\n"));

    while (results.hasNext()) {
      var r = results.next();
      var termText = (r.searchTermView.searchTerm || "").toLowerCase();
      var coreltbCat = categorizeSearchTerm(termText);
      var isNegative = shouldBeNegative(termText);
      var conv = r.metrics.conversions;
      var cost = r.metrics.costMicros / 1000000;

      allTerms.push([
        r.campaign.name,
        r.searchTermView.searchTerm,
        r.metrics.impressions,
        r.metrics.clicks,
        pct(r.metrics.ctr),
        fix(conv),
        fix(r.metrics.conversionsValue),
        cost.toFixed(2),
        micro(r.metrics.averageCpc),
        conv > 0 ? (cost / conv).toFixed(2) : "—",
        coreltbCat,
        isNegative ? "TAK — " + isNegative : ""
      ]);

      if (AdsApp.getExecutionInfo().getRemainingTime() < 120) {
        Logger.log("  !! Timeout search_term_view");
        break;
      }
    }
    Logger.log("  search_term_view: " + (allTerms.length - 1) + " fraz");
  } catch(e) {
    Logger.log("  search_term_view error: " + e);
  }

  writeToSheet(ss, "Search Terms", allTerms);

  // --- METODA 2: campaign_search_term_insight (PMax kategorie — dodatkowe dane) ---
  var allCats = [[
    "Kampania", "Kategoria", "Wyswietlenia", "Klikniecia", "Konwersje", "Wartosc konw."
  ]];
  var catTerms = [[
    "Kampania", "Kategoria", "Subkategoria", "Wyszukiwane haslo",
    "Wyswietlenia", "Klikniecia", "Konwersje", "Wartosc konw.",
    "Kategoria CoreLTB", "Potencjalne wykluczenie?"
  ]];

  var campaigns = AdsApp.search([
    "SELECT campaign.id, campaign.name",
    "FROM campaign",
    "WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX' AND campaign.status = 'ENABLED'"
  ].join("\n"));

  while (campaigns.hasNext()) {
    var c = campaigns.next();
    var cId = c.campaign.id;
    var cName = c.campaign.name;
    Logger.log("  PMax insight: " + cName + " (ID: " + cId + ")");

    try {
      var cats = AdsApp.search([
        "SELECT",
        "  campaign_search_term_insight.category_label,",
        "  campaign_search_term_insight.id,",
        "  metrics.impressions, metrics.clicks, metrics.conversions, metrics.conversions_value",
        "FROM campaign_search_term_insight",
        "WHERE segments.date BETWEEN " + dateRange,
        "  AND campaign_search_term_insight.campaign_id = '" + cId + "'",
        "  AND metrics.impressions >= " + MIN_IMPRESSIONS,
        "ORDER BY metrics.impressions DESC"
      ].join("\n"));

      while (cats.hasNext()) {
        var cat = cats.next();
        var catLabel = cat.campaignSearchTermInsight.categoryLabel;
        var catId = cat.campaignSearchTermInsight.id;

        allCats.push([
          cName, catLabel,
          cat.metrics.impressions, cat.metrics.clicks,
          fix(cat.metrics.conversions), fix(cat.metrics.conversionsValue)
        ]);

        try {
          var terms = AdsApp.search([
            "SELECT",
            "  segments.search_term, segments.search_subcategory,",
            "  metrics.impressions, metrics.clicks, metrics.conversions, metrics.conversions_value",
            "FROM campaign_search_term_insight",
            "WHERE segments.date BETWEEN " + dateRange,
            "  AND campaign_search_term_insight.campaign_id = '" + cId + "'",
            "  AND campaign_search_term_insight.id = '" + catId + "'"
          ].join("\n"));

          while (terms.hasNext()) {
            var t = terms.next();
            if (t.metrics.impressions >= MIN_IMPRESSIONS) {
              var termText2 = (t.segments.searchTerm || "").toLowerCase();
              catTerms.push([
                cName, catLabel,
                t.segments.searchSubcategory || "",
                t.segments.searchTerm,
                t.metrics.impressions, t.metrics.clicks,
                fix(t.metrics.conversions), fix(t.metrics.conversionsValue),
                categorizeSearchTerm(termText2),
                shouldBeNegative(termText2) ? "TAK — " + shouldBeNegative(termText2) : ""
              ]);
            }
          }
        } catch(e) { /* skip — insight terms might not be available yet */ }

        if (AdsApp.getExecutionInfo().getRemainingTime() < 120) break;
      }
    } catch(e) { Logger.log("  PMax insight error: " + e); }
  }

  writeToSheet(ss, "Kategorie ST", allCats);
  if (catTerms.length > 1) {
    writeToSheet(ss, "PMax Insight Terms", catTerms);
  }
  Logger.log("  -> Cats: " + (allCats.length - 1) + ", Insight terms: " + (catTerms.length - 1));
}


// =====================================================
// 3. ASSET PERFORMANCE
// =====================================================
function exportAssetPerformance(ss, dateRange) {
  var query = [
    "SELECT",
    "  campaign.name,",
    "  asset.name,",
    "  asset.text_asset.text,",
    "  asset.type,",
    "  asset_group_asset.status,",
    "  asset_group_asset.field_type,",
    "  asset_group_asset.performance_label,",
    "  metrics.impressions,",
    "  metrics.clicks,",
    "  metrics.conversions,",
    "  metrics.cost_micros,",
    "  metrics.ctr",
    "FROM asset_group_asset",
    "WHERE segments.date BETWEEN " + dateRange,
    "ORDER BY metrics.impressions DESC"
  ].join("\n");

  var data = [[
    "Kampania", "Nazwa assetu", "Tekst", "Typ", "Status", "Rola",
    "Ocena Google", "Wyswietlenia", "Klikniecia", "CTR",
    "Konwersje", "Koszt (zl)", "CPA (zl)", "Rekomendacja"
  ]];

  var results = AdsApp.search(query);
  while (results.hasNext()) {
    var r = results.next();
    var conv = r.metrics.conversions;
    var cost = r.metrics.costMicros / 1000000;
    var perfLabel = "";
    try { perfLabel = r.assetGroupAsset.performanceLabel || ""; } catch(e) {}

    // Rekomendacja na podstawie oceny Google
    var recommendation = "";
    if (perfLabel === "LOW") {
      recommendation = "USUN — niska skutecznosc";
    } else if (perfLabel === "BEST") {
      recommendation = "ZACHOWAJ — najlepsza skutecznosc";
    } else if (perfLabel === "GOOD") {
      recommendation = "OK";
    } else if (perfLabel === "LEARNING") {
      recommendation = "Faza nauki — nie ruszac";
    }

    data.push([
      r.campaign.name || "",
      r.asset.name || "",
      r.asset.textAsset ? r.asset.textAsset.text : "",
      r.asset.type || "",
      r.assetGroupAsset.status || "",
      r.assetGroupAsset.fieldType || "",
      perfLabel || "—",
      r.metrics.impressions,
      r.metrics.clicks,
      pct(r.metrics.ctr),
      fix(conv),
      cost.toFixed(2),
      conv > 0 ? (cost / conv).toFixed(2) : "—",
      recommendation
    ]);
  }

  writeToSheet(ss, "Assets", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 4. LOKALIZACJE (z nazwami miast + priorytet CoreLTB)
// =====================================================
function exportLocations(ss, dateRange) {
  // Pobierz mape ID -> nazwa miasta
  var geoNames = {};
  try {
    var geoResults = AdsApp.search([
      "SELECT geo_target_constant.resource_name, geo_target_constant.name,",
      "  geo_target_constant.canonical_name, geo_target_constant.target_type",
      "FROM geo_target_constant",
      "WHERE geo_target_constant.country_code = 'PL' AND geo_target_constant.status = 'ENABLED'"
    ].join("\n"));
    while (geoResults.hasNext()) {
      var g = geoResults.next();
      var gId = g.geoTargetConstant.resourceName.split('/')[1];
      geoNames[gId] = {
        name: g.geoTargetConstant.name,
        canonical: g.geoTargetConstant.canonicalName,
        type: g.geoTargetConstant.targetType
      };
    }
    Logger.log("  Geo mapa: " + Object.keys(geoNames).length + " lokalizacji PL");
  } catch(e) { Logger.log("  Geo mapa error (nie krytyczne): " + e); }

  var data = [[
    "Kampania", "Miasto ID", "Miasto", "Region ID", "Region", "Typ",
    "Wyswietlenia", "Klikniecia", "Konwersje", "Koszt (zl)", "CTR",
    "CPA (zl)", "Priorytet CoreLTB"
  ]];

  try {
    var results = AdsApp.search([
      "SELECT",
      "  campaign.name,",
      "  segments.geo_target_city,",
      "  segments.geo_target_region,",
      "  geographic_view.location_type,",
      "  metrics.impressions, metrics.clicks, metrics.conversions,",
      "  metrics.cost_micros, metrics.ctr",
      "FROM geographic_view",
      "WHERE segments.date BETWEEN " + dateRange + " AND metrics.impressions > 0",
      "ORDER BY metrics.impressions DESC"
    ].join("\n"));

    while (results.hasNext()) {
      var r = results.next();

      var cityRes = "";
      try { cityRes = String(r.segments.geoTargetCity || ""); } catch(ee) {}
      var cityId = (cityRes && cityRes.indexOf('/') > -1) ? cityRes.split('/')[1] : "";
      var cityGeo = geoNames[cityId] || {};

      var regionRes = "";
      try { regionRes = String(r.segments.geoTargetRegion || ""); } catch(ee) {}
      var regionId = (regionRes && regionRes.indexOf('/') > -1) ? regionRes.split('/')[1] : "";
      var regionGeo = geoNames[regionId] || {};

      var cityName = cityGeo.name || cityId || "—";
      var conv = r.metrics.conversions;
      var cost = r.metrics.costMicros / 1000000;

      // Sprawdz priorytet miasta
      var priority = getCityPriority(cityName);

      data.push([
        r.campaign.name,
        cityId,
        cityName,
        regionId,
        regionGeo.name || regionId || "—",
        r.geographicView.locationType || "",
        r.metrics.impressions,
        r.metrics.clicks,
        fix(conv),
        cost.toFixed(2),
        pct(r.metrics.ctr),
        conv > 0 ? (cost / conv).toFixed(2) : "—",
        priority
      ]);
    }
    Logger.log("  geo_target_city OK");
  } catch(e) {
    Logger.log("  geo_target_city error: " + e + " — fallback bez miast");
    data = [[
      "Kampania", "ID", "Nazwa", "Typ", "Canonical", "—",
      "Wyswietlenia", "Klikniecia", "Konwersje", "Koszt (zl)", "CTR",
      "CPA (zl)", "Priorytet CoreLTB"
    ]];
    try {
      var fb = AdsApp.search([
        "SELECT campaign.name, geographic_view.country_criterion_id, geographic_view.location_type,",
        "  metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros, metrics.ctr",
        "FROM geographic_view",
        "WHERE segments.date BETWEEN " + dateRange + " AND metrics.impressions > 0",
        "ORDER BY metrics.impressions DESC"
      ].join("\n"));
      while (fb.hasNext()) {
        var r = fb.next();
        var cId = String(r.geographicView.countryCriterionId);
        var geo = geoNames[cId] || {};
        var geoName = geo.name || cId;
        data.push([
          r.campaign.name, cId, geoName, r.geographicView.locationType, geo.canonical || "", "",
          r.metrics.impressions, r.metrics.clicks, fix(r.metrics.conversions),
          micro(r.metrics.costMicros), pct(r.metrics.ctr),
          r.metrics.conversions > 0 ? (r.metrics.costMicros / 1000000 / r.metrics.conversions).toFixed(2) : "—",
          getCityPriority(geoName)
        ]);
      }
    } catch(e2) { Logger.log("  geographic_view fallback error: " + e2); }
  }

  writeToSheet(ss, "Lokalizacje", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 5. GODZINY
// =====================================================
function exportHourOfDay(ss, dateRange) {
  var data = [[
    "Kampania", "Godzina", "Wyswietlenia", "Klikniecia", "CTR",
    "Konwersje", "Koszt (zl)", "CPC (zl)", "W harmonogramie?"
  ]];

  var results = AdsApp.search([
    "SELECT campaign.name, segments.hour,",
    "  metrics.impressions, metrics.clicks, metrics.ctr,",
    "  metrics.conversions, metrics.cost_micros, metrics.average_cpc",
    "FROM campaign",
    "WHERE segments.date BETWEEN " + dateRange,
    "  AND campaign.status != 'REMOVED' AND metrics.impressions > 0",
    "ORDER BY segments.hour ASC"
  ].join("\n"));

  while (results.hasNext()) {
    var r = results.next();
    var hour = r.segments.hour;
    // Kampania jest zaplanowana 6:00-22:00
    var inSchedule = (hour >= 6 && hour < 22) ? "TAK" : "POZA (6-22)";

    data.push([
      r.campaign.name, hour + ":00",
      r.metrics.impressions, r.metrics.clicks, pct(r.metrics.ctr),
      fix(r.metrics.conversions), micro(r.metrics.costMicros), micro(r.metrics.averageCpc),
      inSchedule
    ]);
  }

  writeToSheet(ss, "Godziny", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 6. DNI TYGODNIA
// =====================================================
function exportDayOfWeek(ss, dateRange) {
  var data = [[
    "Kampania", "Dzien tygodnia", "Wyswietlenia", "Klikniecia", "CTR",
    "Konwersje", "Koszt (zl)", "CPC (zl)", "CPA (zl)"
  ]];
  var dayNames = {
    "MONDAY": "Poniedzialek", "TUESDAY": "Wtorek", "WEDNESDAY": "Sroda",
    "THURSDAY": "Czwartek", "FRIDAY": "Piatek", "SATURDAY": "Sobota", "SUNDAY": "Niedziela"
  };

  var results = AdsApp.search([
    "SELECT campaign.name, segments.day_of_week,",
    "  metrics.impressions, metrics.clicks, metrics.ctr,",
    "  metrics.conversions, metrics.cost_micros, metrics.average_cpc",
    "FROM campaign",
    "WHERE segments.date BETWEEN " + dateRange,
    "  AND campaign.status != 'REMOVED' AND metrics.impressions > 0",
    "ORDER BY segments.day_of_week ASC"
  ].join("\n"));

  while (results.hasNext()) {
    var r = results.next();
    var day = r.segments.dayOfWeek;
    var conv = r.metrics.conversions;
    var cost = r.metrics.costMicros / 1000000;

    data.push([
      r.campaign.name, dayNames[day] || day,
      r.metrics.impressions, r.metrics.clicks, pct(r.metrics.ctr),
      fix(conv), cost.toFixed(2), micro(r.metrics.averageCpc),
      conv > 0 ? (cost / conv).toFixed(2) : "—"
    ]);
  }

  writeToSheet(ss, "Dni tygodnia", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 7. URZADZENIA (dziennie)
// =====================================================
function exportDevices(ss, dateRange) {
  var data = [[
    "Kampania", "Urzadzenie", "Data", "Wyswietlenia", "Klikniecia", "CTR",
    "Konwersje", "Koszt (zl)", "CPC (zl)", "CPA (zl)"
  ]];
  var devNames = {
    "MOBILE": "Mobile", "DESKTOP": "Desktop",
    "TABLET": "Tablet", "CONNECTED_TV": "TV", "OTHER": "Inne"
  };

  var results = AdsApp.search([
    "SELECT campaign.name, segments.device, segments.date,",
    "  metrics.impressions, metrics.clicks, metrics.ctr,",
    "  metrics.conversions, metrics.cost_micros, metrics.average_cpc",
    "FROM campaign",
    "WHERE segments.date BETWEEN " + dateRange,
    "  AND campaign.status != 'REMOVED' AND metrics.impressions > 0",
    "ORDER BY segments.date DESC, metrics.impressions DESC"
  ].join("\n"));

  while (results.hasNext()) {
    var r = results.next();
    var dev = r.segments.device;
    var conv = r.metrics.conversions;
    var cost = r.metrics.costMicros / 1000000;

    data.push([
      r.campaign.name, devNames[dev] || dev, r.segments.date,
      r.metrics.impressions, r.metrics.clicks, pct(r.metrics.ctr),
      fix(conv), cost.toFixed(2), micro(r.metrics.averageCpc),
      conv > 0 ? (cost / conv).toFixed(2) : "—"
    ]);
  }

  writeToSheet(ss, "Urzadzenia", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 8. SIECI (Search vs Display vs YouTube vs Cross-network)
// =====================================================
function exportNetworks(ss, dateRange) {
  var data = [[
    "Kampania", "Siec", "Data", "Wyswietlenia", "Klikniecia", "CTR",
    "Konwersje", "Koszt (zl)", "CPA (zl)", "% kosztu"
  ]];
  var netNames = {
    "SEARCH": "Search",
    "SEARCH_PARTNERS": "Search Partners",
    "CONTENT": "Display",
    "YOUTUBE_SEARCH": "YouTube Search",
    "YOUTUBE_WATCH": "YouTube Watch",
    "MIXED": "Mixed/PMax",
    "CROSS_NETWORK": "Cross-network"
  };

  var results = AdsApp.search([
    "SELECT campaign.name, segments.ad_network_type, segments.date,",
    "  metrics.impressions, metrics.clicks, metrics.ctr,",
    "  metrics.conversions, metrics.cost_micros",
    "FROM campaign",
    "WHERE segments.date BETWEEN " + dateRange,
    "  AND campaign.status != 'REMOVED' AND metrics.impressions > 0",
    "ORDER BY segments.date DESC, metrics.impressions DESC"
  ].join("\n"));

  // Zbierz dane i policz calkowity koszt na % udzial
  var rows = [];
  var totalCostAll = 0;
  while (results.hasNext()) {
    var r = results.next();
    var cost = r.metrics.costMicros / 1000000;
    totalCostAll += cost;
    rows.push({
      name: r.campaign.name,
      net: r.segments.adNetworkType,
      date: r.segments.date,
      imp: r.metrics.impressions,
      clicks: r.metrics.clicks,
      ctr: r.metrics.ctr,
      conv: r.metrics.conversions,
      cost: cost
    });
  }

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var net = row.net;
    data.push([
      row.name, netNames[net] || net, row.date,
      row.imp, row.clicks, pct(row.ctr),
      fix(row.conv), row.cost.toFixed(2),
      row.conv > 0 ? (row.cost / row.conv).toFixed(2) : "—",
      totalCostAll > 0 ? (row.cost / totalCostAll * 100).toFixed(1) + "%" : "—"
    ]);
  }

  writeToSheet(ss, "Sieci", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 9. LANDING PAGES — ktore strony konwertuja
// =====================================================
function exportLandingPages(ss, dateRange) {
  var data = [[
    "Kampania", "Landing Page URL", "Strona CoreLTB",
    "Wyswietlenia", "Klikniecia", "CTR",
    "Konwersje", "Koszt (zl)", "CPA (zl)", "Conv Rate"
  ]];

  var results = AdsApp.search([
    "SELECT campaign.name, landing_page_view.unexpanded_final_url,",
    "  metrics.impressions, metrics.clicks, metrics.ctr,",
    "  metrics.conversions, metrics.cost_micros",
    "FROM landing_page_view",
    "WHERE segments.date BETWEEN " + dateRange + " AND metrics.impressions > 0",
    "ORDER BY metrics.clicks DESC"
  ].join("\n"));

  while (results.hasNext()) {
    var r = results.next();
    var conv = r.metrics.conversions;
    var cost = r.metrics.costMicros / 1000000;
    var clicks = r.metrics.clicks;
    var url = r.landingPageView.unexpandedFinalUrl || "";

    // Rozpoznaj strone CoreLTB
    var pageName = identifyLandingPage(url);
    var convRate = clicks > 0 ? (conv / clicks * 100) : 0;

    data.push([
      r.campaign.name,
      url,
      pageName,
      r.metrics.impressions, clicks, pct(r.metrics.ctr),
      fix(conv), cost.toFixed(2),
      conv > 0 ? (cost / conv).toFixed(2) : "—",
      convRate > 0 ? convRate.toFixed(2) + "%" : "0%"
    ]);
  }

  writeToSheet(ss, "Landing Pages", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 10. TYP KLIKNIECIA
// =====================================================
function exportClickType(ss, dateRange) {
  var data = [[
    "Kampania", "Typ klikniecia", "Wyswietlenia", "Klikniecia", "CTR",
    "Konwersje", "Koszt (zl)"
  ]];
  var clickNames = {
    "URL_CLICKS": "Klik w naglowek",
    "CALLS": "Telefon (z reklamy)",
    "SITELINKS": "Sitelink",
    "APP_DEEPLINK": "App deeplink",
    "BREADCRUMBS": "Breadcrumbs",
    "CALL_TRACKING": "Call tracking",
    "CLICK_ON_ENGAGEMENT_AD": "Engagement",
    "GET_DIRECTIONS": "Wyznacz trase (Maps)",
    "LOCATION_EXPANSION": "Lokalizacja (Maps)",
    "LOCATION_FORMAT_CALL": "Telefon (z Maps)",
    "LOCATION_FORMAT_DIRECTIONS": "Trasa (z Maps)",
    "LOCATION_FORMAT_IMAGE": "Obraz (z Maps)",
    "LOCATION_FORMAT_LANDING_PAGE": "Landing (z Maps)",
    "LOCATION_FORMAT_MAP": "Mapa (klik)",
    "LOCATION_FORMAT_STORE_INFO": "Info firmy (Maps)",
    "LOCATION_FORMAT_TEXT": "Tekst (z Maps)",
    "OFFER_PRINTS": "Oferta druk",
    "OTHER": "Inne",
    "STORE_LOCATOR": "Lokalizator",
    "SWIPEABLE_GALLERY_AD_HEADLINE": "Galeria naglowek",
    "SWIPEABLE_GALLERY_AD_SEE_MORE": "Galeria wiecej",
    "SWIPEABLE_GALLERY_AD_SITELINK_ONE": "Galeria sitelink",
    "VIDEO_APP_STORE_CLICKS": "Video -> App Store",
    "VIDEO_CALL_TO_ACTION_CLICKS": "Video CTA",
    "VIDEO_CARD_ACTION_HEADLINE_CLICKS": "Video karta",
    "VIDEO_END_CAP_CLICKS": "Video end cap",
    "VIDEO_WEBSITE_CLICKS": "Video -> strona",
    "VISUAL_SITELINKS": "Visual sitelink",
    "WIRELESS_PLAN": "Plan bezprzewodowy"
  };

  var results = AdsApp.search([
    "SELECT campaign.name, segments.click_type,",
    "  metrics.impressions, metrics.clicks, metrics.ctr,",
    "  metrics.conversions, metrics.cost_micros",
    "FROM campaign",
    "WHERE segments.date BETWEEN " + dateRange,
    "  AND campaign.status != 'REMOVED' AND metrics.clicks > 0",
    "ORDER BY metrics.clicks DESC"
  ].join("\n"));

  while (results.hasNext()) {
    var r = results.next();
    var ct = r.segments.clickType;
    data.push([
      r.campaign.name, clickNames[ct] || ct,
      r.metrics.impressions, r.metrics.clicks, pct(r.metrics.ctr),
      fix(r.metrics.conversions), micro(r.metrics.costMicros)
    ]);
  }

  writeToSheet(ss, "Typ klikniecia", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 11. WIEK
// =====================================================
function exportAgeRange(ss, dateRange) {
  var data = [[
    "Kampania", "Grupa wiekowa", "Wyswietlenia", "Klikniecia", "CTR",
    "Konwersje", "Koszt (zl)", "CPA (zl)", "Komentarz"
  ]];
  var ageNames = {
    "AGE_RANGE_18_24": "18-24", "AGE_RANGE_25_34": "25-34",
    "AGE_RANGE_35_44": "35-44", "AGE_RANGE_45_54": "45-54",
    "AGE_RANGE_55_64": "55-64", "AGE_RANGE_65_UP": "65+",
    "AGE_RANGE_UNDETERMINED": "Nieokreslony"
  };
  // Budowa domu — typowy inwestor to 28-50 lat
  var targetAges = { "25-34": true, "35-44": true, "45-54": true };

  var results = AdsApp.search([
    "SELECT campaign.name, ad_group_criterion.age_range.type,",
    "  metrics.impressions, metrics.clicks, metrics.ctr,",
    "  metrics.conversions, metrics.cost_micros",
    "FROM age_range_view",
    "WHERE segments.date BETWEEN " + dateRange + " AND metrics.impressions > 0",
    "ORDER BY metrics.impressions DESC"
  ].join("\n"));

  while (results.hasNext()) {
    var r = results.next();
    var age = r.adGroupCriterion.ageRange.type;
    var ageName = ageNames[age] || age;
    var conv = r.metrics.conversions;
    var cost = r.metrics.costMicros / 1000000;
    var comment = targetAges[ageName] ? "Grupa docelowa (inwestor budowlany)" : "";

    data.push([
      r.campaign.name, ageName,
      r.metrics.impressions, r.metrics.clicks, pct(r.metrics.ctr),
      fix(conv), cost.toFixed(2),
      conv > 0 ? (cost / conv).toFixed(2) : "—",
      comment
    ]);
  }

  writeToSheet(ss, "Wiek", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 12. PLEC
// =====================================================
function exportGender(ss, dateRange) {
  var data = [[
    "Kampania", "Plec", "Wyswietlenia", "Klikniecia", "CTR",
    "Konwersje", "Koszt (zl)", "CPA (zl)"
  ]];
  var genderNames = {
    "MALE": "Mezczyzna", "FEMALE": "Kobieta", "UNDETERMINED": "Nieokreslona"
  };

  var results = AdsApp.search([
    "SELECT campaign.name, ad_group_criterion.gender.type,",
    "  metrics.impressions, metrics.clicks, metrics.ctr,",
    "  metrics.conversions, metrics.cost_micros",
    "FROM gender_view",
    "WHERE segments.date BETWEEN " + dateRange + " AND metrics.impressions > 0",
    "ORDER BY metrics.impressions DESC"
  ].join("\n"));

  while (results.hasNext()) {
    var r = results.next();
    var g = r.adGroupCriterion.gender.type;
    var conv = r.metrics.conversions;
    var cost = r.metrics.costMicros / 1000000;

    data.push([
      r.campaign.name, genderNames[g] || g,
      r.metrics.impressions, r.metrics.clicks, pct(r.metrics.ctr),
      fix(conv), cost.toFixed(2),
      conv > 0 ? (cost / conv).toFixed(2) : "—"
    ]);
  }

  writeToSheet(ss, "Plec", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 13. KONWERSJE (po typie akcji — dziennie)
// =====================================================
function exportConversions(ss, dateRange) {
  var data = [[
    "Kampania", "Data", "Typ konwersji", "Formularz",
    "Konwersje", "Wartosc (zl)", "Oczekiwana wartosc (zl)", "Komentarz"
  ]];

  var results = AdsApp.search([
    "SELECT campaign.name, segments.date, segments.conversion_action_name,",
    "  metrics.all_conversions, metrics.all_conversions_value",
    "FROM campaign",
    "WHERE segments.date BETWEEN " + dateRange,
    "  AND campaign.status != 'REMOVED' AND metrics.all_conversions > 0",
    "ORDER BY segments.date DESC"
  ].join("\n"));

  while (results.hasNext()) {
    var r = results.next();
    var convName = r.segments.conversionActionName || "";
    var convCount = r.metrics.allConversions;
    var convValue = r.metrics.allConversionsValue;

    // Mapuj na formularz CoreLTB
    var formName = "";
    var expectedValue = "";
    var comment = "";

    if (convName.indexOf("calculator") > -1) {
      formName = "/wycena";
      expectedValue = CONVERSION_VALUES["calculator_lead"];
      comment = "Najcieplejszy lead — zna cene";
    } else if (convName.indexOf("consultation") > -1) {
      formName = "/umow-konsultacje";
      expectedValue = CONVERSION_VALUES["consultation_lead"];
      comment = "Ciepry lead — chce rozmawiac";
    } else if (convName.indexOf("plot_analysis") > -1) {
      formName = "/analiza-dzialki";
      expectedValue = CONVERSION_VALUES["plot_analysis_lead"];
      comment = "Ciepry lead — ma dzialke";
    } else if (convName.indexOf("phone") > -1) {
      formName = "Telefon";
      expectedValue = CONVERSION_VALUES["phone_click"];
      comment = "Klikniecie numeru tel.";
    } else {
      formName = "Inne";
      comment = convName;
    }

    // Sprawdz czy wartosc jest ulamkowa (Consent Mode modeling)
    if (convCount > 0 && convCount < 1) {
      comment += " | ULAMKOWA (Consent Mode)";
    }

    data.push([
      r.campaign.name, r.segments.date, convName, formName,
      fix(convCount), fix(convValue),
      expectedValue ? (expectedValue * convCount).toFixed(0) : "—",
      comment
    ]);
  }

  writeToSheet(ss, "Konwersje", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 14. PLACEMENTS
// =====================================================
function exportPlacements(ss, dateRange) {
  var data = [[
    "Kampania", "Placement (strona/kanal)", "Typ",
    "Wyswietlenia", "Klikniecia", "CTR",
    "Konwersje", "Koszt (zl)", "Do wykluczenia?"
  ]];

  try {
    var results = AdsApp.search([
      "SELECT campaign.name, group_placement_view.display_name,",
      "  group_placement_view.placement_type, group_placement_view.target_url,",
      "  metrics.impressions, metrics.clicks, metrics.ctr,",
      "  metrics.conversions, metrics.cost_micros",
      "FROM group_placement_view",
      "WHERE segments.date BETWEEN " + dateRange + " AND metrics.impressions > 0",
      "ORDER BY metrics.impressions DESC"
    ].join("\n"));

    while (results.hasNext()) {
      var r = results.next();
      var displayName = r.groupPlacementView.displayName || r.groupPlacementView.targetUrl || "";
      var placementType = r.groupPlacementView.placementType || "";
      var conv = r.metrics.conversions;
      var cost = r.metrics.costMicros / 1000000;

      // Flaga do wykluczenia — gry mobilne, appki dla dzieci, nieistotne
      var excludeFlag = shouldExcludePlacement(displayName, placementType, conv, cost);

      data.push([
        r.campaign.name,
        displayName,
        placementType,
        r.metrics.impressions, r.metrics.clicks, pct(r.metrics.ctr),
        fix(conv), cost.toFixed(2),
        excludeFlag
      ]);
    }
  } catch(e) {
    Logger.log("  Placements error: " + e);
    data.push(["Brak danych placements", e.toString()]);
  }

  writeToSheet(ss, "Placements", data);
  Logger.log("  -> " + (data.length - 1) + " wierszy");
}


// =====================================================
// 15. BUDGET PACE — tempo wydatkowania
// =====================================================
function exportBudgetPace(ss, dateRange) {
  var data = [["Metryka", "Wartosc", "Komentarz"]];

  try {
    var results = AdsApp.search([
      "SELECT segments.date, metrics.cost_micros, metrics.impressions,",
      "  metrics.clicks, metrics.conversions",
      "FROM campaign",
      "WHERE segments.date BETWEEN " + dateRange,
      "  AND campaign.status != 'REMOVED'",
      "ORDER BY segments.date ASC"
    ].join("\n"));

    var dailyData = {};
    while (results.hasNext()) {
      var r = results.next();
      var date = r.segments.date;
      if (!dailyData[date]) {
        dailyData[date] = { cost: 0, imp: 0, clicks: 0, conv: 0 };
      }
      dailyData[date].cost += r.metrics.costMicros / 1000000;
      dailyData[date].imp += r.metrics.impressions;
      dailyData[date].clicks += r.metrics.clicks;
      dailyData[date].conv += r.metrics.conversions;
    }

    var dates = Object.keys(dailyData).sort();
    var totalCost = 0;
    var totalConv = 0;
    var daysActive = dates.length;

    data.push(["", "", ""]);
    data.push(["--- BUDZET ---", "", ""]);
    data.push(["Budzet dzienny", DAILY_BUDGET + " zl", ""]);
    data.push(["Budzet miesięczny", (DAILY_BUDGET * 30.4).toFixed(0) + " zl", ""]);
    data.push(["Dni aktywne", daysActive, ""]);
    data.push(["Budzet planowany (okres)", (DAILY_BUDGET * daysActive).toFixed(2) + " zl", ""]);
    data.push(["", "", ""]);

    data.push(["--- DZIENNIE ---", "", ""]);
    data.push(["Data", "Wydano (zl)", "% budzetu", "Klikniecia", "Konwersje", "CPA (zl)", "Koszt kumulowany (zl)", "Budzet kumulowany (zl)", "Roznica (zl)"]);

    for (var i = 0; i < dates.length; i++) {
      var d = dailyData[dates[i]];
      totalCost += d.cost;
      totalConv += d.conv;
      var plannedCumulative = DAILY_BUDGET * (i + 1);
      var diff = plannedCumulative - totalCost;

      data.push([
        dates[i],
        d.cost.toFixed(2),
        (d.cost / DAILY_BUDGET * 100).toFixed(1) + "%",
        d.clicks,
        fix(d.conv),
        d.conv > 0 ? (d.cost / d.conv).toFixed(2) : "—",
        totalCost.toFixed(2),
        plannedCumulative.toFixed(2),
        (diff > 0 ? "+" : "") + diff.toFixed(2)
      ]);
    }

    // Podsumowanie tempa
    data.push(["", "", ""]);
    data.push(["--- PODSUMOWANIE TEMPA ---", "", ""]);
    var avgDaily = daysActive > 0 ? totalCost / daysActive : 0;
    var paceVsBudget = DAILY_BUDGET > 0 ? (avgDaily / DAILY_BUDGET * 100) : 0;
    data.push(["Sredni koszt dzienny", avgDaily.toFixed(2) + " zl", paceVsBudget < 80 ? "Niedowydatkowanie — Google moze potrzebowac wiecej danych" : paceVsBudget > 110 ? "Przekroczenie — sprawdz" : "OK"]);
    data.push(["Tempo vs budzet", paceVsBudget.toFixed(1) + "%", ""]);
    data.push(["CPA sredni", totalConv > 0 ? (totalCost / totalConv).toFixed(2) + " zl" : "brak konwersji", totalConv > 0 && (totalCost / totalConv) < TARGET_CPA ? "Ponizej celu " + TARGET_CPA + " zl" : ""]);
    data.push(["Prognoza miesieczna", (avgDaily * 30.4).toFixed(0) + " zl", ""]);

  } catch(e) {
    Logger.log("  Budget pace error: " + e);
    data.push(["BLAD", e.toString()]);
  }

  writeToSheet(ss, "Budget Pace", data);
  Logger.log("  -> Budget Pace OK");
}


// =====================================================
// 16. SEARCH TERM ALERTS — potencjalne negative keywords
// =====================================================
function exportSearchTermAlerts(ss, dateRange) {
  var data = [[
    "Wyszukiwane haslo", "Wyswietlenia", "Klikniecia", "Konwersje",
    "Koszt (zl)", "Powod", "Akcja"
  ]];

  // Przeiteruj Search Terms i znajdz te do wykluczenia
  try {
    var campaigns = AdsApp.search([
      "SELECT campaign.id, campaign.name",
      "FROM campaign",
      "WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX' AND campaign.status = 'ENABLED'"
    ].join("\n"));

    while (campaigns.hasNext()) {
      var c = campaigns.next();
      var cId = c.campaign.id;

      try {
        var cats = AdsApp.search([
          "SELECT campaign_search_term_insight.category_label,",
          "  campaign_search_term_insight.id",
          "FROM campaign_search_term_insight",
          "WHERE segments.date BETWEEN " + dateRange,
          "  AND campaign_search_term_insight.campaign_id = '" + cId + "'",
          "  AND metrics.impressions >= 1"
        ].join("\n"));

        while (cats.hasNext()) {
          var cat = cats.next();
          var catId = cat.campaignSearchTermInsight.id;

          try {
            var terms = AdsApp.search([
              "SELECT segments.search_term,",
              "  metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros",
              "FROM campaign_search_term_insight",
              "WHERE segments.date BETWEEN " + dateRange,
              "  AND campaign_search_term_insight.campaign_id = '" + cId + "'",
              "  AND campaign_search_term_insight.id = '" + catId + "'"
            ].join("\n"));

            while (terms.hasNext()) {
              var t = terms.next();
              var term = (t.segments.searchTerm || "").toLowerCase();
              var negReason = shouldBeNegative(term);
              var cost = t.metrics.costMicros / 1000000;
              var conv = t.metrics.conversions;

              // Dodaj do alertow jesli: pasuje do negative patterns LUB wydaje dużo bez konwersji
              if (negReason) {
                data.push([
                  t.segments.searchTerm, t.metrics.impressions, t.metrics.clicks,
                  fix(conv), cost.toFixed(2),
                  negReason, "WYKLUCZ"
                ]);
              } else if (cost > 10 && conv < 0.5) {
                // Wydano > 10 zl bez konwersji
                data.push([
                  t.segments.searchTerm, t.metrics.impressions, t.metrics.clicks,
                  fix(conv), cost.toFixed(2),
                  "Wysoki koszt bez konwersji (>" + cost.toFixed(0) + " zl)",
                  "ROZWAŻ WYKLUCZENIE"
                ]);
              }
            }
          } catch(e) { /* skip */ }

          if (AdsApp.getExecutionInfo().getRemainingTime() < 90) break;
        }
      } catch(e) { Logger.log("  ST Alerts cats error: " + e); }
    }
  } catch(e) { Logger.log("  ST Alerts error: " + e); }

  // Posortuj — najpierw WYKLUCZ, potem ROZWAŻ
  if (data.length > 1) {
    var header = data.shift();
    data.sort(function(a, b) {
      if (a[6] === "WYKLUCZ" && b[6] !== "WYKLUCZ") return -1;
      if (a[6] !== "WYKLUCZ" && b[6] === "WYKLUCZ") return 1;
      return parseFloat(b[4]) - parseFloat(a[4]); // po koszcie malejaco
    });
    data.unshift(header);
  }

  writeToSheet(ss, "ST Alerty", data);
  Logger.log("  -> " + (data.length - 1) + " alertow");
}


// =====================================================
// 17. PODSUMOWANIE (KPI + faza nauki + rekomendacje)
// =====================================================
function exportSummary(ss, dateRange) {
  var data = [["Metryka", "Wartosc", "Komentarz"]];

  try {
    var totals = AdsApp.search([
      "SELECT metrics.impressions, metrics.clicks, metrics.cost_micros,",
      "  metrics.conversions, metrics.conversions_value,",
      "  metrics.all_conversions, metrics.all_conversions_value,",
      "  metrics.ctr, metrics.average_cpc, metrics.view_through_conversions",
      "FROM campaign",
      "WHERE segments.date BETWEEN " + dateRange + " AND campaign.status != 'REMOVED'"
    ].join("\n"));

    var totalImp = 0, totalClicks = 0, totalCost = 0;
    var totalConv = 0, totalConvVal = 0;
    var totalAllConv = 0, totalAllConvVal = 0;
    var totalVTC = 0;

    while (totals.hasNext()) {
      var r = totals.next();
      totalImp += r.metrics.impressions;
      totalClicks += r.metrics.clicks;
      totalCost += r.metrics.costMicros;
      totalConv += r.metrics.conversions;
      totalConvVal += r.metrics.conversionsValue;
      totalAllConv += r.metrics.allConversions;
      totalAllConvVal += r.metrics.allConversionsValue;
      totalVTC += (r.metrics.viewThroughConversions || 0);
    }

    var costZl = totalCost / 1000000;
    var cpc = totalClicks > 0 ? costZl / totalClicks : 0;
    var cpa = totalConv > 0 ? costZl / totalConv : 0;
    var ctr = totalImp > 0 ? (totalClicks / totalImp * 100) : 0;
    var convRate = totalClicks > 0 ? (totalConv / totalClicks * 100) : 0;
    var ageDays = campaignAgeDays();

    // === INFORMACJE O KAMPANII ===
    data.push(["--- KAMPANIA ---", "", ""]);
    data.push(["Nazwa", "CoreLTB — PMax", ""]);
    data.push(["Konto", "374-981-3686", ""]);
    data.push(["Start kampanii", CAMPAIGN_START_DATE, ""]);
    data.push(["Dzien kampanii", ageDays, ""]);

    // Faza
    var phase, phaseComment;
    if (ageDays <= 14) {
      phase = "FAZA NAUKI (T1-T2)";
      phaseComment = "NIE RUSZAC — AI sie uczy. Nie zmieniac budzetu, assetow ani strategii.";
    } else if (ageDays <= 28) {
      phase = "PIERWSZA OPTYMALIZACJA (T3-T4)";
      phaseComment = "Sprawdz: assety Low, placements, search terms, CPA.";
    } else if (ageDays <= 60) {
      phase = "SKALOWANIE (M2)";
      phaseComment = "Jesli CPA < " + TARGET_CPA + " zl — rozważ zwiększenie budzetu. Dodaj Asset Group 2 (nadzor).";
    } else if (ageDays <= 120) {
      phase = "KAMPANIA SEARCH + REMARKETING (M3-M4)";
      phaseComment = "Uruchom kampanie Search, remarketing. Rozważ Meta Pixel.";
    } else {
      phase = "DOJRZALA KAMPANIA (M5+)";
      phaseComment = "Pelna optymalizacja. Target CPA, offline conversions, A/B testy LP.";
    }
    data.push(["Faza", phase, phaseComment]);
    data.push(["", "", ""]);

    // === KPI ===
    data.push(["--- KPI (ostatnie " + DAYS_BACK + " dni) ---", "", ""]);
    data.push(["Wyswietlenia", totalImp, totalImp > 500 ? "OK" : totalImp > 100 ? "Malo — kampania sie rozkreca" : "Bardzo malo — sprawdz konfiguracje"]);
    data.push(["Klikniecia", totalClicks, ""]);
    data.push(["CTR", ctr.toFixed(2) + "%", ctr > 5 ? "Swietny" : ctr > 3 ? "OK" : ctr > 1 ? "Przecietny" : "Niski — sprawdz naglowki"]);
    data.push(["Koszt laczny", costZl.toFixed(2) + " zl", ""]);
    data.push(["Sredni CPC", cpc.toFixed(2) + " zl", cpc < 1 ? "Bardzo tani" : cpc < 2 ? "Tani (typowe dla budowlanki Slask)" : cpc < 3 ? "OK" : "Drogi — sprawdz frazy"]);
    data.push(["Konwersje (Primary)", fix(totalConv), totalConv >= 30 ? "Wystarczajaco do Target CPA" : totalConv >= 15 ? "Blisko minimum Smart Bidding" : "Za malo — AI potrzebuje 15-30/mies."]);
    data.push(["CPA", cpa > 0 ? cpa.toFixed(2) + " zl" : "brak konwersji", cpa > 0 && cpa < 30 ? "Swietny (< 30 zl)" : cpa > 0 && cpa < TARGET_CPA ? "Pod celem (< " + TARGET_CPA + " zl)" : cpa > 0 ? "Powyzej celu — optymalizuj" : ""]);
    data.push(["Conversion Rate", convRate.toFixed(2) + "%", convRate > 5 ? "Swietny" : convRate > 2 ? "OK (typowe)" : "Niski — sprawdz LP"]);
    data.push(["Wartosc konwersji", totalConvVal.toFixed(2) + " zl", ""]);
    data.push(["Wszystkie konwersje", fix(totalAllConv), "Wlacznie z phone_click i ulamkowymi (Consent Mode)"]);
    data.push(["View-through konwersje", totalVTC, "Osoby ktore WIDZIALY reklame i pozniej konwertowaly"]);
    data.push(["ROAS", costZl > 0 ? ((totalConvVal / costZl) * 100).toFixed(0) + "%" : "—", ""]);
    data.push(["", "", ""]);

    // === KONTEKST BUDOWLANY ===
    data.push(["--- KONTEKST BUDOWLANY ---", "", ""]);
    data.push(["Sredni kontrakt", "500 000 zl", ""]);
    data.push(["Konwersja lead -> klient", "~5%", ""]);
    data.push(["Wartosc leada", "25 000 zl", "(500k * 5%)"]);
    data.push(["Dopuszczalny CPA", "do 500 zl", "(ale cel operacyjny: " + TARGET_CPA + " zl)"]);
    if (totalConv > 0) {
      var monthlyLeads = totalConv / DAYS_BACK * 30;
      var monthlyClients = monthlyLeads * 0.05;
      var monthlyRevenue = monthlyClients * 500000;
      data.push(["Prognoza leadow/mies.", monthlyLeads.toFixed(1), ""]);
      data.push(["Prognoza klientow/mies.", monthlyClients.toFixed(2), ""]);
      data.push(["Prognoza przychodu/mies.", monthlyRevenue.toFixed(0) + " zl", ""]);
      data.push(["Prognoza ROAS (real)", costZl > 0 ? ((monthlyRevenue / (costZl / DAYS_BACK * 30))).toFixed(0) + ":1" : "—", ""]);
    }
    data.push(["", "", ""]);

    // === ALERTY ===
    data.push(["--- ALERTY ---", "", ""]);

    if (totalConv === 0 && ageDays > 14) {
      data.push(["ALERT", "0 konwersji po " + ageDays + " dniach", "SPRAWDZ: czy GTM/GA4 laduje poprawnie, czy konwersje sa zaimportowane do Ads"]);
    }
    if (cpa > TARGET_CPA * 2 && totalConv > 0) {
      data.push(["ALERT", "CPA " + cpa.toFixed(0) + " zl > 2x cel (" + TARGET_CPA + " zl)", "Sprawdz search terms, landing pages, placements"]);
    }
    if (ctr < 1 && totalImp > 500) {
      data.push(["ALERT", "CTR < 1%", "Naglowki i opisy nie przyciagaja — sprawdz tab Assets"]);
    }
    if (totalConv > 0 && totalConv < 1 && totalConv !== Math.floor(totalConv)) {
      data.push(["INFO", "Ulamkowe konwersje: " + fix(totalConv), "Consent Mode modeling — uzytkownicy nie akceptuja cookies. Rozważ native Google Ads tag."]);
    }
    if (costZl / Math.max(ageDays, 1) < DAILY_BUDGET * 0.5) {
      data.push(["INFO", "Niedowydatkowanie budzetu", "Google nie wydaje calego budzetu — moze brak wyswietlen w okolicy. Sprawdz lokalizacje."]);
    }

    // === REKOMENDACJE ===
    data.push(["", "", ""]);
    data.push(["--- REKOMENDACJE ---", "", ""]);

    if (ageDays <= 14) {
      data.push(["1.", "Nie zmieniaj niczego", "Faza nauki — AI testuje kanaly i frazy"]);
      data.push(["2.", "Sprawdzaj search terms codziennie", "Dodawaj negative keywords na smieci"]);
      data.push(["3.", "Sprawdz czy konwersje sie rejestruja", "GA4 DebugView / Realtime"]);
    } else if (ageDays <= 28) {
      data.push(["1.", "Sprawdz raport assetow", "Usun assety z ocena LOW"]);
      data.push(["2.", "Placement report", "Wyklucz gry mobilne, appki"]);
      data.push(["3.", "Search terms", "Dodaj negative keywords"]);
      data.push(["4.", "Landing pages", "Czy /wycena konwertuje najlepiej?"]);
    } else {
      data.push(["1.", "Ocen CPA vs cel " + TARGET_CPA + " zl", ""]);
      data.push(["2.", "Rozważ zwiekszyc budzet jesli CPA < " + TARGET_CPA + " zl", ""]);
      data.push(["3.", "Dodaj Asset Group 2: Nadzor i kierownik budowy", ""]);
      data.push(["4.", "Przygotuj kampanie Search na high-intent frazy", ""]);
      data.push(["5.", "Wdroz native Google Ads Conversion Tag (nie tylko GA4 import)", ""]);
    }

    // === TODO Z DOCS ===
    data.push(["", "", ""]);
    data.push(["--- TODO (z kampania-pmax-budowa-domow.md) ---", "", ""]);
    data.push(["TODO", "Native Google Ads Conversion Tag w GTM", "PRIORYTET — eliminuje 24-72h opoznienia"]);
    data.push(["TODO", "Podpiac trackEstimateView() w CalculatorForm", "Micro-conversion"]);
    data.push(["TODO", "Podpiac trackFormFocus() na polach kontaktowych", "Micro-conversion"]);
    data.push(["TODO", "Podpiac trackCTAClick() na kluczowych CTA", "Micro-conversion"]);
    data.push(["TODO", "phone_click jako konwersja Dodatkowa (50 zl) w Google Ads", ""]);
    data.push(["TODO", "Eksport leadow z Facebook Ads -> Customer Match", ""]);

    data.push(["", "", ""]);
    data.push(["Raport wygenerowany", new Date().toLocaleString(), "Skrypt: CoreLTB Deep Dive v1.0"]);

  } catch(e) {
    Logger.log("  Summary error: " + e);
    data.push(["BLAD", e.toString()]);
  }

  writeToSheet(ss, "Podsumowanie", data);
  Logger.log("  -> Podsumowanie OK");
}


// =====================================================
// HELPERS — CoreLTB specific
// =====================================================

/**
 * Kategoryzuj search term do grupy budowlanej CoreLTB
 */
function categorizeSearchTerm(term) {
  term = term.toLowerCase();
  for (var cat in SEARCH_TERM_CATEGORIES) {
    var keywords = SEARCH_TERM_CATEGORIES[cat];
    for (var i = 0; i < keywords.length; i++) {
      if (term.indexOf(keywords[i]) > -1) {
        return cat;
      }
    }
  }
  return "inne";
}

/**
 * Sprawdz czy search term powinien byc negative keyword
 * Zwraca powod lub pusty string
 */
function shouldBeNegative(term) {
  term = term.toLowerCase();
  for (var i = 0; i < NEGATIVE_KEYWORD_PATTERNS.length; i++) {
    if (term.indexOf(NEGATIVE_KEYWORD_PATTERNS[i]) > -1) {
      return "Pasuje do wzorca: '" + NEGATIVE_KEYWORD_PATTERNS[i] + "'";
    }
  }
  return "";
}

/**
 * Sprawdz priorytet miasta dla CoreLTB
 */
function getCityPriority(cityName) {
  if (!cityName || cityName === "—") return "";

  // Sprawdz dokladne dopasowanie
  if (CITY_PRIORITIES[cityName]) return CITY_PRIORITIES[cityName];

  // Sprawdz czesciowe dopasowanie (bo Google moze uzyc roznych form)
  var cityLower = cityName.toLowerCase();
  for (var city in CITY_PRIORITIES) {
    if (cityLower.indexOf(city.toLowerCase()) > -1 || city.toLowerCase().indexOf(cityLower) > -1) {
      return CITY_PRIORITIES[city];
    }
  }
  return "Poza lista";
}

/**
 * Rozpoznaj landing page CoreLTB
 */
function identifyLandingPage(url) {
  if (!url) return "";
  if (url.indexOf("/wycena") > -1) return "LP1: Kalkulator /wycena";
  if (url.indexOf("/umow-konsultacje") > -1) return "LP2: Konsultacja";
  if (url.indexOf("/analiza-dzialki") > -1) return "LP3: Analiza dzialki";
  if (url.indexOf("/kontakt") > -1) return "LP4: Kontakt";
  if (url.indexOf("/projekty/") > -1) return "Projekt domu (detail)";
  if (url.indexOf("/projekty") > -1) return "Projekty (listing)";
  if (url.indexOf("/obszar-dzialania/") > -1) {
    var slug = url.split("/obszar-dzialania/")[1];
    if (slug) slug = slug.replace(/\//g, "");
    return "Strona lokalna: " + (slug || "");
  }
  if (url.indexOf("/oferta/") > -1) return "Oferta";
  if (url.indexOf("/baza-wiedzy/") > -1) return "Baza wiedzy (artykul)";
  if (url.indexOf("/kierownik-budowy") > -1) return "Kierownik budowy";
  if (url.indexOf("coreltb.pl") > -1 && (url.endsWith("/") || url.endsWith("coreltb.pl"))) return "Strona glowna";
  return url;
}

/**
 * Sprawdz czy placement powinien byc wykluczony
 */
function shouldExcludePlacement(name, type, conv, cost) {
  var nameLower = (name || "").toLowerCase();

  // Gry mobilne
  var gamePatterns = ["game", "gra", "puzzle", "candy", "clash", "angry", "temple run", "subway", "fruit"];
  for (var i = 0; i < gamePatterns.length; i++) {
    if (nameLower.indexOf(gamePatterns[i]) > -1) {
      return "TAK — gra mobilna";
    }
  }

  // Appki dla dzieci
  var kidsPatterns = ["kids", "dzieci", "baby", "cartoon", "nursery", "lullaby"];
  for (var i = 0; i < kidsPatterns.length; i++) {
    if (nameLower.indexOf(kidsPatterns[i]) > -1) {
      return "TAK — appka/content dla dzieci";
    }
  }

  // Wysoki koszt bez konwersji
  if (cost > 5 && conv < 0.5) {
    return "ROZWAZ — wydano " + cost.toFixed(2) + " zl bez konwersji";
  }

  return "";
}

/**
 * Ile dni od startu kampanii
 */
function campaignAgeDays() {
  return daysSince(CAMPAIGN_START_DATE, today());
}

/**
 * Ile dni miedzy dwoma datami (format YYYY-MM-DD)
 */
function daysSince(startStr, endStr) {
  var start = new Date(startStr);
  var end = new Date(endStr);
  return Math.floor((end - start) / (1000 * 60 * 60 * 24));
}


// =====================================================
// HELPERS — ogolne
// =====================================================

function writeToSheet(ss, sheetName, data) {
  var sheet = ss.getSheetByName(sheetName);
  if (sheet) { sheet.clear(); } else { sheet = ss.insertSheet(sheetName); }

  if (data.length > 0) {
    // Wyrownaj kolumny
    var numCols = data[0].length;
    for (var r = 1; r < data.length; r++) {
      while (data[r].length < numCols) data[r].push("");
      if (data[r].length > numCols) data[r] = data[r].slice(0, numCols);
    }
    sheet.getRange(1, 1, data.length, numCols).setValues(data);

    // Header: ciemnozielony (budowlanka) zamiast kremowego
    sheet.getRange(1, 1, 1, numCols).setFontWeight("bold").setBackground("#1a3a2a").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
    for (var i = 1; i <= numCols; i++) sheet.autoResizeColumn(i);
  }

  // Usun domyslny arkusz
  try {
    var def = ss.getSheetByName("Sheet1") || ss.getSheetByName("Arkusz1");
    if (def && ss.getSheets().length > 1) ss.deleteSheet(def);
  } catch(e) {}
}

function getDateRange(n) {
  var end = new Date(); var start = new Date();
  start.setDate(end.getDate() - n);
  var fmt = function(d) {
    return Utilities.formatDate(d, AdsApp.currentAccount().getTimeZone(), "yyyyMMdd");
  };
  return "'" + fmt(start) + "' AND '" + fmt(end) + "'";
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function micro(v) {
  if (!v || isNaN(v)) return "0.00";
  return (v / 1000000).toFixed(2);
}

function fix(v) {
  return v ? v.toFixed(1) : "0";
}

function pct(v) {
  return v ? (v * 100).toFixed(2) + "%" : "0%";
}
