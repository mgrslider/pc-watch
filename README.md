# Warty — dyżury (PWA)

Aplikacja **nie zawiera żadnych danych**. Grafik wczytujesz sam ze swojego pliku,
a plik zostaje wyłącznie w pamięci przeglądarki na tym urządzeniu — nic nie jest
wysyłane na serwer.

## Zawartość paczki
- `index.html` — cała aplikacja
- `vendor/xlsx.mini.min.js` — biblioteka do czytania Excela (działa offline)
- `manifest.json`, `sw.js`, `icons/` — obsługa PWA / offline

Uwaga dla iOS: dane w pamięci przeglądarki mogą zostać skasowane po ok. 7 dniach
nieużywania aplikacji — wtedy trzeba wskazać plik ponownie.
