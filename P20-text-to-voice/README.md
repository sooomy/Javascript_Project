
---

# Text To Voice Converter

Une application web simple et élégante qui convertit du texte en parole en utilisant l'API Web Speech intégrée dans les navigateurs modernes.

---

## Table des matières

* [Présentation](#présentation)
* [Fonctionnalités](#fonctionnalités)
* [Installation & Utilisation](#installation--utilisation)
* [Technologies utilisées](#technologies-utilisées)
* [Structure du projet](#structure-du-projet)
* [Personnalisation](#personnalisation)
* [Accessibilité](#accessibilité)
* [Limitations](#limitations)
* [Contribuer](#contribuer)
* [Licence](#licence)

---

## Présentation

Cette application permet à l'utilisateur de saisir un texte et de le faire lire à voix haute avec différents choix de voix, ajustement de la vitesse et de la hauteur de la voix.
Elle offre une interface claire, moderne et responsive, avec des contrôles intuitifs pour gérer la lecture.

---

## Fonctionnalités

* Conversion texte → voix via Web Speech API
* Sélection parmi toutes les voix disponibles dans le navigateur
* Réglage du débit (vitesse) et de la hauteur (pitch) de la voix
* Boutons pour démarrer, mettre en pause, reprendre et arrêter la lecture
* Retour visuel d’état (message dynamique)
* Interface accessible et responsive
* Gestion automatique des états des boutons selon le statut de la synthèse vocale

---

## Installation & Utilisation

1. **Cloner ou télécharger** ce dépôt sur votre machine.
2. Ouvrir le fichier `index.html` dans un navigateur moderne supportant Web Speech API (Chrome, Edge, Firefox partiellement).
3. Saisir le texte à convertir dans la zone prévue.
4. Choisir la voix, régler la vitesse et la hauteur si besoin.
5. Cliquer sur **Speak** pour lancer la lecture.
6. Utiliser les boutons Pause, Resume et Stop selon besoin.

---

## Technologies utilisées

* **HTML5** : Structure sémantique et accessible
* **CSS3** : Styles modernes, responsive et transitions douces
* **JavaScript (ES6+)** : Logique de l’application et interaction avec Web Speech API
* **Web Speech API** : Synthèse vocale native du navigateur
* **Font Awesome** : Icônes vectorielles pour boutons

---

## Structure du projet

```
text-to-voice/
├── index.html          # Fichier HTML principal  
├── style.css           # Feuille de styles CSS  
└── script.js           # Script JavaScript principal  
```

---

## Personnalisation

* Ajouter d’autres options comme contrôle du volume, sauvegarde de l’historique
* Modifier les styles CSS pour s’adapter à votre charte graphique
* Intégrer dans un formulaire plus large (ex : application d’accessibilité)
* Ajouter un sélecteur automatique de langue selon le texte saisi

---

## Accessibilité

* Utilisation d’attributs ARIA pour les éléments dynamiques (ex : alertes)
* Labels explicites et bien associés aux champs et contrôles
* Navigation clavier possible pour tous les boutons
* Contraste couleurs optimisé pour une bonne lisibilité

---

## Limitations

* Fonctionne uniquement sur navigateurs supportant Web Speech API
* Qualité et disponibilité des voix dépendent du système d’exploitation et navigateur
* Certains navigateurs limitent les options de contrôle (ex : Firefox)
* Aucune fonction d’export audio intégrée pour l’instant

---

## Contribuer

Les contributions sont les bienvenues !
Si vous souhaitez proposer des améliorations ou corriger des bugs :

1. Forkez ce dépôt
2. Créez une branche pour votre modification (`feature/ma-fonctionnalite`)
3. Faites vos modifications
4. Envoyez une Pull Request en décrivant vos changements

---

## Licence

Projet sous licence MIT — voir fichier `LICENSE` pour plus d’informations.

---

Merci d’utiliser ce convertisseur texte en voix !
Pour toute question, n’hésitez pas à me contacter.

---
