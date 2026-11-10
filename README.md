# nina-30

Fødselsdagsinvitation til Nina på [30ogi.live](https://30ogi.live). Ren HTML, CSS og JS, ingen build og ingen eksterne afhængigheder.

## Sider

| Fil | Hvad den er |
| --- | --- |
| `index.html` | Indgangen: spinner, henter og viser den side der passer til tidspunktet |
| `invite.html` | Invitationen: fest, nedtælling og kalenderknap |
| `loading.html` | Monokrom indlæsningsside med nedtælling og progressbar |
| `site.js` | Fælles tidsstempler og visning af sider |

### Routing

`index.html` er ikke en side i sig selv — den er indgangen. Den henter den side, der passer til tidspunktet, og sætter den ind i siden. **URL'en ændrer sig aldrig**, og der er ingen redirects: adressen til invitationen er altid bare domænet.

`site.js` holder en liste over siderne, og den side hvis tidspunkt er nået, er den aktuelle:

```js
pages: [
  { file: 'loading.html', from: BIRTH },
  { file: 'invite.html',  from: REVEAL }
]
```

- `showPage(fil)` henter siden og sætter den ind i `#app`. Stiler, titel og favicon følger med, og scripts genoprettes, så de kører.
- `SITE.current()` fortæller hvilken side der passer til tidspunktet.
- `SITE.next(fil)` fortæller hvilken side der følger efter.

En ny side skal bare sættes ind på listen — indgangen og de andre sider følger automatisk.

`invite.html` og `loading.html` kan stadig åbnes hver for sig, og fungerer da som almindelige sider.

Fædselsdagsfesten står i `invite.html` (`START`, 24. november 2026 kl. 16.00 i lokal tid). Tidspunktet for hvornår invitationen åbner står i `site.js` (`reveal`), og progressbaren tæller fra Ninas fødsel (`birth`, 14. november 1996 kl. 08.22 CET) frem til `reveal` — præcis 30 år.

## Hosting

Sitet ligger på **GitHub Pages**. Hver push til `main` udløser `.github/workflows/pages.yml`, som pakker sidens filer og deployer dem. Den udgivne side består af `index.html`, `invite.html`, `loading.html`, `site.js`, `CNAME` og `.nojekyll`; repo-beskeder som `README.md`, `flake.nix` og `module.nix` bliver ikke publiceret.

### DNS

Domænet er hos Porkbun. For at GitHub Pages skal servere `30ogi.live`, skal følgende records sættes op:

| Navn | Type | Værdi |
| --- | --- | --- |
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `@` | AAAA | `2606:50c0:8000::153` |
| `@` | AAAA | `2606:50c0:8001::153` |
| `@` | AAAA | `2606:50c0:8002::153` |
| `@` | AAAA | `2606:50c0:8003::153` |
| `www` | CNAME | `c0dk.github.io` |

Den gamle A-record til `178.104.213.88` skal fjernes. Når DNS er opdateret, tjekker GitHub HTTPS-certifikatet automatisk og udsteder det inden for et døgn. Tjek status med **Settings → Pages** i repoet.

### Tilbagevendende

`flake.nix` og `module.nix` er ikke længere en del af driften — de beskriver den tidligere Caddy/NixOS-hosting, og bruges ikke af GitHub Pages. Modulet kan fjernes når den gamle server er slået fra.

## Lokalt

`python -m http.server 8000` og åbn `http://localhost:8000`. Lige nu viser den indlæsningssiden, fordi tidspunktet ikke er nået endnu.

For at se invitationen med det sampe, sæt `reveal` i `site.js` til et tidspunkt i fortiden. Husk at bumpe `?v=1` i script-tagget på alle sider, ellers bruger browseren en cached version af `site.js`.

Åbner du `index.html` direkte fra disk (`file://`), kan browseren ikke hente siderne, og indgangen falder tilbage til at vise dem i en iframe. Det virker, men en lokal webserver er bedre.
