# Warty — dyżury (PWA)

Aplikacja **nie zawiera żadnych danych**. Grafik wczytujesz sam ze swojego pliku,
a plik zostaje wyłącznie w pamięci przeglądarki na tym urządzeniu — nic nie jest
wysyłane na serwer.

## Zawartość paczki
- `index.html` — cała aplikacja
- `vendor/xlsx.mini.min.js` — biblioteka do czytania Excela (działa offline)
- `manifest.json`, `sw.js`, `icons/` — obsługa PWA / offline

## Wczytywanie danych
Rozwiń sekcję **„Dane (tylko na tym urządzeniu)"** na dole i wskaż plik
**xlsx / xls** albo **csv**. Można wskazać kilka plików naraz, można też
przeciągnąć je na okno.

Arkusz Excela nie musi być zwykłą tabelką — rozpoznawany jest układ z pliku
"Dyżury obozowe": nagłówek dnia w pierwszej kolumnie, wiersz "Miejsce dyżuru",
pod nim wiersz z opisami wart, a niżej miejsca i nazwiska w kolumnach.
Każdy arkusz staje się osobnym źródłem, które można włączać i wyłączać.
Arkusz z "noc" w nazwie trafia do dyżurów nocnych.

Jeśli arkusz jest zwykłą tabelką, wystarczy, że ma kolumny `imię` i `nazwisko`;
rozpoznawane są też `dzień`, `miejsce`, `pora` / `godzina`, `płeć`.

Wczytane pliki zostają po zamknięciu aplikacji. Usuwa się je krzyżykiem
przy nazwie w sekcji „Dane".

## Jak działa
- puste pole i brak filtrów → cały grafik, dzień po dniu
- wybór dnia i/lub warty → kto gdzie ma być
- wpisanie imienia lub nazwiska → karta osoby z jej wszystkimi dyżurami
- przyciski Wszystkie / Dzienne / Nocne zawężają rodzaj dyżuru

## Hosting i instalacja
Netlify: projekt → zakładka Deploys → przeciągnij folder (drop tworzy NOWY projekt).
iOS: Safari → Udostępnij → "Dodaj do ekranu początkowego".

Uwaga dla iOS: dane w pamięci przeglądarki mogą zostać skasowane po ok. 7 dniach
nieużywania aplikacji — wtedy trzeba wskazać plik ponownie.
