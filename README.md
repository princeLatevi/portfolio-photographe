# Portfolio Antoni Latevi — Photographe

Site one-page en HTML/CSS/JS pur (pas de framework, pas de build à lancer :
ouvrez simplement `index.html`, ou déployez le dossier tel quel sur
Netlify/Vercel/GitHub Pages).

## Structure

```
index.html        -> toute la page (nav, hero, à propos, distinctions, services, galeries, contact)
style.css          -> tous les styles
script.js          -> toutes les données modifiables + interactions
admin.html         -> lecture des messages envoyés depuis le formulaire de contact
database.sql       -> schéma Supabase pour la table "messages"
Assets/image/      -> votre photo de profil + dossiers "awards" et "portfolio"
Assets/icone/      -> icônes de services et réseaux sociaux (déjà en place)
```

## Ajouter vos vraies photos de galerie

Le site est prêt à recevoir vos photos, mais comme je n'ai pas reçu vos
fichiers, les emplacements sont pour l'instant vides (ils s'affichent en
dégradé sombre en attendant).

1. Déposez vos photos dans `Assets/image/portfolio/`.
2. Ouvrez `script.js`, repérez le bloc `PROJECTS_DATA` en haut du fichier.
3. Remplacez les chemins d'image par les noms de vos fichiers, par exemple :

```js
{
  number: "01",
  category: "Mariage",
  name: "Cérémonies & mariages",
  images: {
    left: [
      "./Assets/image/portfolio/mariage-sophie-lucas-1.jpg",
      "./Assets/image/portfolio/mariage-sophie-lucas-2.jpg",
    ],
    right: "./Assets/image/portfolio/mariage-sophie-lucas-3.jpg",
  },
},
```

Vous pouvez ajouter ou retirer des galeries en ajoutant/retirant des blocs
`{ ... }` dans ce tableau — la mise en page s'adapte automatiquement.

## Ajouter un prix de concours (section "Distinctions")

Toujours dans `script.js`, tout en haut, cherchez `AWARDS_DATA`. C'est une
liste vide par défaut. Pour ajouter une récompense, ajoutez un bloc comme
ceci :

```js
const AWARDS_DATA = [
  {
    year: "2025",
    title: "1er Prix — Concours National de Photographie",
    org: "Fédération Ivoirienne de Photographie, catégorie Portrait",
    image: "./Assets/image/awards/prix-2025.jpg", // optionnel, ou "" si vous n'avez pas de photo
  },
];
```

- `year`, `title` sont obligatoires.
- `org` et `image` sont optionnels (laissez `""` ou supprimez la ligne si
  vous n'avez pas l'info).
- Ajoutez autant de blocs que de prix ; ils s'affichent automatiquement dans
  l'ordre où vous les écrivez, sur la page à l'ancre `#prix`
  ("Distinctions" dans le menu).
- Si vous avez une photo du trophée/diplôme, placez-la dans
  `Assets/image/awards/`.

Tant que la liste est vide, la section affiche simplement
"Aucune distinction ajoutée pour le moment".

## Formulaire de contact

Le formulaire envoie toujours les messages vers la même base Supabase que
la version précédente du site — rien à reconfigurer. Consultez
`admin.html` pour lire les messages reçus.

## Personnalisation rapide

- Nom / titre : modifiez le texte dans `<title>` et `.logo` /
  `.hero-heading` dans `index.html`.
- Couleurs : toutes les couleurs sont centralisées en haut de `style.css`
  dans `:root`.
- Police : Kanit (Google Fonts), déjà importée dans `index.html`.
