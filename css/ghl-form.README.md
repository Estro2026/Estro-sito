# Form GHL — come funziona lo stile

I form del sito sono di GoHighLevel. Il loro CSS **non** sta nelle pagine:
sta in GHL, e un foglio di stile della pagina non arriva dentro il form
(è in un iframe). Per questo qui ci sono i file da incollare in GHL.

## Cosa incollare dove

GHL → Sites → Forms → *(il form)* → Styles → **Custom CSS** → incolla **un solo file**:

| File | Forms |
|---|---|
| `ghl-form.css` | Contatti: home (sezione Contatti), `contatti.html`, fondo pagina dei servizi, FAQ, news, tips |
| `ghl-form--lavora-con-noi.css` | Lavora con noi (campi bianchi su fucsia) |
| `ghl-form--hero-servizi.css` | Form compatto nella testata delle pagine servizio |

Ogni file contiene già la base comune e la sua variante: non incollarne due nello stesso form.

## Impostazioni nel form GHL (non si fanno da CSS)

- sfondo del form: **trasparente**
- checkbox privacy: **obbligatorio**
- campi su due colonne dove il sito li ha su due colonne (Nome/Cognome, Email/Telefono, Azienda/Sito)
- messaggio dopo l'invio: "Grazie, ti rispondiamo a breve."

## Cosa decide la pagina

Solo il contenitore (`css/responsive.css`, blocco "FORM GHL"): larghezza massima
1240px, centrato, iframe senza bordo né fondo. L'altezza la imposta lo script di GHL.

## Zoom e schermi piccoli

Il form è in un iframe: con lo zoom del browser l'iframe si restringe e le media
query del CSS di GHL si calcolano sulla larghezza dell'iframe. Per questo il CSS
usa solo px, niente larghezze fisse e, sotto i 600px, una colonna con pulsante a
tutta larghezza. I campi restano a 16px: sotto, iOS zooma la pagina al tocco.

## Se cambia il design

Il design di riferimento è quello delle pagine del sito (homepage a 1440px: campi a
pillola 55px, textarea con raggio 36px, label 16px/500, pulsante 14px/600 con bordo
2px). Si modifica il file qui, poi si ri-incolla in GHL: la copia in GHL e questa
devono restare uguali.
