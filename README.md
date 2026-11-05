# nina-30

Fødselsdagsinvitation til Nina på [30ogi.live](https://30ogi.live). Ren HTML, CSS og JS i en enkelt fil, ingen build og ingen eksterne afhængigheder.

Tidspunktet står øverst i scriptet i `public/index.html` (`START`).

Hosting: importer `nixosModules.default` fra flaket, så sætter Caddy domænet op med automatisk HTTPS. DNS skal pege `30ogi.live` og `www.30ogi.live` (A/AAAA) på serveren.

Lokalt: `python -m http.server -d public` eller bare åbn `public/index.html` i browseren.
