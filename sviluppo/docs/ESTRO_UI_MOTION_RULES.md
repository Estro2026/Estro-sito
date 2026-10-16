# ESTRO — UI & Motion Rules · Regola Globale Definitiva Pagine Servizi

**Versione definitiva. Questo documento sovrascrive qualsiasi versione precedente.**

Canonical references:
- **Homepage:** `index.html`
- **Social Media Management:** `servizi/social-media-management.html` ← reference principale struttura/motion
- `servizi/influencer-marketing.html`, `servizi/google-ads.html` ← pagine già lavorate

> Se la working tree differisce da template o storia git, **homepage + SMM attuali vincono sempre.**

---

## 1. PRINCIPIO GENERALE

Non inventare nuovi pattern. Per ogni elemento:

```
esiste già una soluzione corretta in Homepage o SMM?
→ sì: riusala esattamente
→ no: costruiscila coerentemente con quelle reference
```

Evitare: fix isolati · valori diversi pagina per pagina · animazioni improvvisate · duplicazione JS/CSS · nuove logiche quando esiste già un helper condivisibile.

Se più pagine hanno sezioni analoghe → stessi componenti, stessi parametri, stesso motion system.

---

## 2. HERO

Tutte le Hero devono:
- essere completamente visibili nella viewport
- non tagliare titoli/testi
- non avere contenuti fuori schermo
- non creare overflow orizzontale

Se una Hero non entra, nell'ordine:
1. allarga la colonna testo
2. ribilancia la grid
3. riduci gap/padding
4. correggi max-width
5. sistema i line-break
6. solo alla fine valuta un leggero font-size adjustment

**Non comprimere brutalmente la tipografia.**

Reveal al page-load coerente: `kicker → titolo → testo → CTA`

---

## 3. NON SPEZZARE MAI LE PAROLE

Una parola non deve mai spezzarsi internamente. Se un titolo non entra:
- modifica larghezza colonna · grid · max-width · padding · break editoriali
- usa `white-space: nowrap` quando serve su parole o gruppi intenzionali

---

## 4. TITOLI DELLE SEZIONI ANALOGHE

Le sezioni analoghe a `Piani Editoriale & Storytelling` → `Face Filters Personalizzati` (SMM) devono usare la stessa gerarchia tipografica in tutte le pagine Servizi:
- stesso font · font-size · weight · line-height · proporzione · max-width · spacing

**Capitalizzazione:** stile editoriale/minuscolo. **Non usare `text-transform: uppercase`.**
Maiuscoli solo: nomi propri · acronimi · brand · termini come Google Ads, Meta, AI.

---

## 5. TITOLI "EDITORIALI" / GRANDI

Per titoli equivalenti a `TIPS & TRICKS`, grandi statistiche, titoli sezione molto visivi, `ALCUNE COLLABORAZIONI`, `I SETTORI...`, `I TALENT...` ecc.:

→ usa **esattamente** lo stesso reveal di `TIPS & TRICKS` della Homepage.
- stessi: mask/clip · translate · opacity · easing · timing · reverse
- non creare varianti

---

## 6. REVEAL DEI TESTI — REGOLA DEFINITIVA

**Il problema più importante da risolvere globalmente.**

Regola: quando la viewport mostra ~50% sezione A + ~50% sezione B → il testo di B deve avere **già iniziato chiaramente** a comparire.

```
Sezione A dominante
↓
B inizia a entrare
↓
~metà A / metà B nella viewport
  → testo B GIÀ IN REVEAL
↓
B prende il controllo visivo
  → testo B completamente leggibile
```

**Progress locale normalizzato per ogni transizione:**
```
0.00   B nascosta
~0.20  inizio reveal B
0.50   B già chiaramente visibile
~0.70  B completamente leggibile
1.00   B protagonista
```

---

## 7. TUTTI I TESTI — PARAMETRI UNICI

Body, paragrafi, descrizioni e contenuti equivalenti → unico reveal condiviso.

Uniformare: opacity · translate · easing · durata · progress range · scrub · stagger · reverse.

**Non fare tuning manuale sezione per sezione.** Creare/riusare un solo helper globale.

---

## 8. REVEAL DELLE CARD

Reference: card di `TIPS & TRICKS` (Homepage).

Vale per: collaborazioni · settori · servizi · vantaggi · categorie · risultati · casi · grid simili.

Replicare: translate · opacity · stagger · easing · timing.

Le card devono iniziare a rivelarsi nello stesso momento logico del testo della sezione.

---

## 9. SEQUENZE EDITORIALI TIPO SMM

Per tutte le sezioni equivalenti alla sequenza `Piani Editoriale & Storytelling` → `Face Filters Personalizzati` (SMM):

Riusare la stessa logica completa:
- layout · typography · body · immagini · CTA · reveal · fading
- alternanza light/dark · timing · responsive

Non limitarsi a copiare il colore: deve essere la stessa struttura visiva e lo stesso ritmo.

---

## 10. CTA

Le CTA delle sezioni analoghe devono essere identiche a SMM:
- altezza · padding · font-size · border-radius · font-weight · colore · hover · spacing
- usare la stessa classe/componente
- no CTA diverse tra pagine analoghe

---

## 11. TRANSIZIONE TRA SEZIONI

```
A
↓ scroll
A fade-out
+ background A → background B        ← simultanei, sovrapposti
+ contenuto B in reveal
↓
B
```

**Non:** prima finisce A → poi cambia colore → poi appare B.
**Sì:** un unico passaggio fluido.

---

## 12. LIGHT / DARK / FUCSIA

Usare sempre il colore reale della sezione successiva.

```
light → dark
dark → light
light → fucsia
fucsia → light
dark → fucsia
fucsia → dark
```

Nessuna tonalità arbitraria. Fucsia ufficiale: `#DB005A`

---

## 13. HEADER / MENU

**Regola globale definitiva.**

Il colore di `MENU` e icona menu dipende dal background **realmente visibile** sotto l'header, non dalla sezione tecnicamente attiva.

```
background scuro → menu bianco
background chiaro → menu scuro
```

Durante i fade: il menu reagisce durante la transizione.
**Non usare da soli:** activeSection · section ID · IntersectionObserver.

Usare la stessa source of truth del background transition.
Il progress del background deve controllare anche il tema dell'header.
Menu e icona devono condividere `currentColor`.
Questa logica deve essere **globale**, non duplicata pagina per pagina.

---

## 14. IMMAGINI / VIDEO / PLACEHOLDER

- non eliminare visual esistenti
- preserva aspect ratio
- non deformare
- evita crop inutili
- niente overflow
- niente `scale()` aggressivi
- usa `object-fit` / `object-position`

Se un'immagine definitiva non esiste → placeholder neutro mantenendo l'ingombro corretto.

---

## 15. "ALCUNI AMICI SODDISFATTI…"

Ogni pagina con questa sezione → stessa versione approvata.

Identici: titolo · reveal · loghi · dimensioni loghi · righe · spacing · marquee · velocità · responsive · fade dalla sezione precedente.

Usare gli asset aggiornati (`/loghibrand`).

---

## 16. "SAPPIAMO FARE UN SACCO DI ALTRE MAGIE"

Ogni pagina che contiene questa sezione → coerente con SMM.

Riusare: layout · typography · reveal · fading · CTA · responsive · transizione in/out.

Non crearne una variante diversa per ogni servizio.

---

## 17. "PRENDIAMOCI UN CAFFÈ"

Ogni versione deve seguire la SMM.

- stessa UI · stesso font · stessi break
- `PRENDIAMOCI` sempre su una riga
- stesso reveal · stesso CTA styling · stesso finale verso footer

---

## 18. FOOTER

L'ultima sezione non deve cambiare background troppo presto.
Il cambio verso il colore del footer deve avvenire solo nell'ultima parte reale dello scroll.
Non basta che il footer entri in viewport.
Usare la stessa logica già approvata nelle reference.

---

## 19. SCROLL / PERFORMANCE

Non introdurre:
- scroll snap · scrollTo · wheel hijacking · nuovi smooth-scroll manager
- pin sovrapposti · listener duplicati · timeline duplicate

Preferire:
- `transform` · `opacity` · un unico progress per transizione · helper condivisi

Le animazioni devono **seguire lo scroll, non bloccarlo.**

---

## 20. SCROLL-UP

Tutto deve funzionare al contrario.

```
scroll down → reveal
scroll up   → stessa timeline reverse
```

Non creare logiche separate se non strettamente necessario.

---

## 21. RESPONSIVE

Su desktop, tablet e mobile:
- nessuna parola tagliata
- nessun overflow
- nessun contenuto sotto l'header
- nessuna sticky instabile
- titoli leggibili · visual visibili
- motion semplificato se necessario

Non sacrificare usabilità per mantenere un effetto desktop.

---

## 22. METODO DI LAVORO

Prima di toccare una pagina:

```
1. analizza la pagina
2. trova le sezioni analoghe nelle reference (Homepage + SMM)
3. riusa i componenti
4. riusa gli stessi helper
5. elimina logiche duplicate
6. implementa
7. testa scroll lento
8. testa scroll veloce
9. testa scroll-up
10. testa cambio direzione
```

Se vedi un errore evidente di: allineamento · contrasto · timing · overflow · parole spezzate · CTA incoerenti · reveal troppo lento/veloce → **correggilo autonomamente** mantenendo coerenza con le reference.

---

## 23. REGOLA VISIVA CHIAVE

```
viewport:
┌───────────────────────────────┐
│ metà sezione A                │
│                               │
│ metà sezione B                │
│ → testo B GIÀ IN REVEAL       │
└───────────────────────────────┘
```

Questa regola vale per tutte le sezioni analoghe di tutte le pagine Servizi.

---

## 24. OBIETTIVO FINALE

```
NON: 10 pagine · 10 interpretazioni · 10 motion systems
SÌ:  1 design system · 1 motion system · 1 UI language
     → tutte le pagine Servizi
```

Homepage e Social Media Management restano la guida principale.
Usare giudizio da designer e competenza frontend per anticipare e correggere incoerenze senza aspettare istruzioni aggiuntive.
