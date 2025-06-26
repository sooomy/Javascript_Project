
# Email Subscription Form Connected to Google Sheets

![Email Subscription](https://img.shields.io/badge/status-production-brightgreen)

## Description

Cette application web simple et élégante permet à des utilisateurs de s’abonner à une newsletter en envoyant leur email directement dans un Google Sheets via un Google Apps Script. 

- Interface moderne et responsive
- Validation côté client de l’email
- Envoi asynchrone avec feedback utilisateur
- Connexion facile à Google Sheets grâce à Google Apps Script

---

## Fonctionnalités

- Formulaire d’abonnement avec champ email
- Validation de l’adresse email avant envoi
- Ajout automatique dans Google Sheets avec timestamp
- Messages d’erreur et de succès visibles à l’utilisateur
- Design épuré, responsive et professionnel

---

## Installation & utilisation

1. **Cloner ou télécharger** ce dépôt

2. **Configurer le Google Apps Script :**

   - Ouvrir Google Sheets > Extensions > Apps Script
   - Coller le script backend (`Code.gs`) fourni dans le dossier `/docs` (ou ci-dessous)
   - Exécuter la fonction `initialSetup()`
   - Publier > Déployer en tant que Web App
   - Choisir "Anyone, even anonymous" pour l’accès
   - Copier l’URL du déploiement

3. **Modifier `script.js`** :

   Remplacer la variable `SCRIPT_URL` par l’URL obtenue.

4. **Ouvrir `index.html`** dans un navigateur et tester le formulaire.

---

## Structure des fichiers

```

email-subscription/
├── index.html     # Interface utilisateur HTML
├── style.css      # Styles CSS modernes et responsive
└── script.js      # Logique JS pour validation et envoi vers Google Apps Script

````

---

## Google Apps Script Backend (extrait)

```javascript
const sheetName = 'Sheet1';
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  scriptProp.setProperty('key', SpreadsheetApp.getActiveSpreadsheet().getId());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);
    const nextRow = sheet.getLastRow() + 1;
    const email = e.parameter.Email;
    sheet.getRange(nextRow, 1).setValue(new Date());
    sheet.getRange(nextRow, 2).setValue(email);
    return ContentService.createTextOutput(JSON.stringify({result:'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({result:'error',error:err}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
````

---

## Personnalisation & extension

* Ajoute d’autres champs (nom, téléphone…)
* Ajoute un reCAPTCHA Google pour éviter les spams
* Intègre un système d’email automatique de confirmation
* Ajoute un spinner pendant l’envoi
* Stylise selon ta charte graphique

---

## Licence

MIT License © 2025 - Ton Nom

---

## Contact

Pour toute question, contacte-moi à [badiouiasmaa@gmail.com](mailto:badiouiasmaa@gmail.com)

---

> *Créé avec ❤️ par \[ASMAA]*

```

---


