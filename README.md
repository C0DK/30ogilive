# nina-30

Fødselsdagsinvitation til Nina på [30ogi.live](https://30ogi.live). Ren HTML, CSS og JS i en enkelt fil, ingen build og ingen eksterne afhængigheder.

Tidspunktet står øverst i scriptet i `index.html` (`START`).

## Hosting

Sitet ligger på **GitHub Pages**. Hver push til `main` udløser `.github/workflows/pages.yml`, som pakker sidens filer og deployer dem. Den udgivne side består af `index.html`, `CNAME` og `.nojekyll`; repo-beskeder som `README.md`, `flake.nix` og `module.nix` bliver ikke publiceret.

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

`python -m http.server 8000` og åbn `http://localhost:8000`, eller bare åbn `index.html` direkte i browseren.
