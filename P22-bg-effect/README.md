

---

# 🌅 Image Background Change Effect

Ce projet est une **page web interactive** qui change dynamiquement l’arrière-plan avec des effets visuels modernes. Idéal pour les **landings pages**, **pages d’accueil**, **sliders d’introduction**, ou **galeries immersives**.

---

## 🔍 Aperçu

![Preview](https://via.placeholder.com/1000x400?text=Image+Background+Change+Effect)

---

## ✨ Fonctionnalités principales

* 🎞️ **Changement d’arrière-plan** fluide avec effet fondu
* 🎛️ **Contrôles de navigation** (Précédent / Suivant)
* 🕒 **Diaporama automatique** toutes les 5 secondes
* 🖱️ **Pause automatique** lors du survol avec la souris
* 📱 **Support du swipe tactile** sur mobile/tablette
* ⚡ Design responsive et performance optimisée

---

## 🛠️ Technologies utilisées

* **HTML5** – structure sémantique
* **CSS3** – mise en page, effets de transition
* **JavaScript (ES6)** – logique d’interaction
* **Responsive Design** – pour tous les écrans

---

## 📁 Structure du projet

```
bg-effect/
├── index.html       # Structure de la page
├── style.css        # Styles visuels et transitions
└── script.js        # Logique JS du slider
```

---

## 🚀 Démarrage rapide

1. Clone ce dépôt ou télécharge le dossier :

   ```bash
   git clone https://github.com/ton-nom/bg-effect.git
   ```
2. Ajoute tes propres images dans un dossier `images/` (ex. `bg1.jpg`, `bg2.jpg`, ...)
3. Ouvre `index.html` dans ton navigateur.

---

## 📷 Personnaliser les images

Dans `script.js`, modifie simplement le tableau `images` :

```js
const images = [
  'images/bg1.jpg',
  'images/bg2.jpg',
  'images/bg3.jpg',
  'images/bg4.jpg',
  'images/bg5.jpg'
];
```

✅ Toutes les dimensions sont prises en charge automatiquement grâce à `background-size: cover`.

---

## 🧩 Possibilités d’amélioration

| Fonction        | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| 🕹️ Pagination  | Ajouter des indicateurs ou points pour chaque image         |
| 🧭 Menu Overlay | Ajouter un logo, titre ou description par image             |
| 🎚️ Effets      | Ajouter `blur`, `zoom`, ou `overlay`                        |
| 🔧 Vitesse      | Modifier l'intervalle du slideshow (`setInterval`)          |
| 📩 Intégration  | Utiliser pour une landing page, un portfolio ou une vitrine |

---

## 🧪 Accessibilité

* Texte lisible et contrasté
* Utilisation possible au clavier (boutons)
* Support mobile avec `touchstart/touchend`
* `transition` douce pour respect du motion UX

---

## 🌍 Déploiement

Tu peux facilement publier ce projet sur :

* [GitHub Pages](https://pages.github.com)
* [Netlify](https://netlify.com)
* [Vercel](https://vercel.com)
* ou sur ton propre serveur web (via FTP)

---

## 📜 Licence

Ce projet est open-source sous licence **MIT**.
Tu es libre de l’utiliser, de le modifier et de le distribuer.

---
