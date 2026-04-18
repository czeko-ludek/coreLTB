# Zasady cenowe - CoreLTB Builders

> **Jedyne zrodlo prawdy o cenach: `data/pricing.ts`**
> Kazda cena na stronie, w artykulach, FAQ, local pages i reklamach MUSI byc weryfikowana z kalkulatorem.

## Stawki za m2 netto (kwiecien 2026)

### Fundamenty
| Typ | Stawka |
|-----|--------|
| Plyta fundamentowa | 1 200 zl/m2 |
| Lawy fundamentowe | 1 000 zl/m2 |
| Piwnica czesciowa | +200 zl/m2 |
| Piwnica cala | +400 zl/m2 |

### Sciany
| Technologia | Stawka |
|-------------|--------|
| Beton komorkowy | 720 zl/m2 |
| Ceramika szlifowana | 880 zl/m2 |
| Silikat (standard CoreLTB) | 1 040 zl/m2 |

### Dach
| Typ | Stawka |
|-----|--------|
| Plaski | 720 zl/m2 |
| Dwuspadowy | 640 zl/m2 |
| Wielospadowy | 800 zl/m2 |

### Kondygnacja
| Typ | Stawka |
|-----|--------|
| Parterowy | 640 zl/m2 |
| Poddasze | 760 zl/m2 |
| Pietrowy | 960 zl/m2 |

### SSZ (stan surowy zamkniety)
| Wariant | Stawka |
|---------|--------|
| Bez garazu | 400 zl/m2 |
| Z garazem jednostanowiskowym | 600 zl/m2 |
| Z garazem dwustanowiskowym | 800 zl/m2 |

### Ogrzewanie (stan deweloperski)
| Typ | Stawka |
|-----|--------|
| Gazowe | 560 zl/m2 |
| Pelet | 640 zl/m2 |
| Pompa ciepla | 720 zl/m2 |

### Wykonczenie pod klucz
| Typ | Stawka |
|-----|--------|
| Pod klucz | 680 zl/m2 |

### VAT
- 8% na budowe domow mieszkalnych do 300 m2

---

## Konfiguracje referencyjne

### STANDARD (silikat, plaski, plyta, gaz, parterowy, brak garazu)
- Per m2 netto: **5 240 zl**
- 100 m2: **524 000 netto / 565 920 brutto**
- 120 m2: **628 800 netto / 679 104 brutto**

### BUDGET (beton komorkowy, dwuspadowy, lawy, gaz, parterowy, brak garazu)
- Per m2 netto: **4 640 zl**
- 100 m2: **464 000 netto / 501 120 brutto**

### PREMIUM (silikat, wielospadowy, plyta, pompa, pietrowy, dwustanowiskowy garaz)
- Per m2 netto: **6 200 zl**
- 100 m2: **620 000 netto / 669 600 brutto**
- 120 m2: **744 000 netto / 803 520 brutto**

### ENERGOOSZCZEDNY (silikat, plaski, plyta, pompa, parterowy, brak garazu)
- Per m2 netto: **5 400 zl**
- 120 m2: **648 000 netto / 699 840 brutto**

---

## Zakresy cenowe (od BUDGET do PREMIUM)
- SSO (stan zero + SSO): **3 000–4 000 zl/m2**
- Deweloperski: **3 960–5 520 zl/m2**
- Pod klucz: **4 640–6 200 zl/m2**
- SSZ (sam etap): **400–800 zl/m2**
- Roznica silikat vs beton komorkowy: **320 zl/m2** (38 400 zl dla 120 m2)

---

## Zasady przy pisaniu tresci

1. **NIGDY nie wymyslaj cen** — zawsze oblicz z `data/pricing.ts`
2. **Podawaj konkretna konfiguracje** przy kazdej cenie (np. "silikat, dach plaski, plyta, gaz")
3. **Nie uzywaj "~" ani "ok."** przy cenach z kalkulatora — to sa dokladne stawki
4. **Zakresy cenowe** uzywaj TYLKO gdy prezentujesz rozne konfiguracje (budget vs premium)
5. **Linkuj do kalkulatora** (`/wycena`) przy kazdej wzmiance o cenach
6. **Przed publikacja** — uruchom kalkulator z dana konfiguracja i porownaj wynik z artykulem
7. **Local pages** moga dodawac narzuty regionalne (tereny gornicze +15-25%), ale bazowe stawki musza byc z pricing.ts

## Wzor obliczania

```
Total netto = area * (FOUNDATION + BASEMENT + WALL + ROOF + FLOOR + SSZ + GARAGE + HEATING + FINISH)
Total brutto = Total netto * 1.08
```

Przyklad: 120m2, silikat, plaski, plyta, gaz, brak garazu, pod klucz:
```
120 * (1200 + 0 + 1040 + 720 + 640 + 400 + 0 + 560 + 680) = 120 * 5240 = 628 800 netto
628 800 * 1.08 = 679 104 brutto
```
