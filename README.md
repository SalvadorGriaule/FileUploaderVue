# 📁 Vue 3 Dropzone Wrapper  
Un **wrapper Dropzone** 100 % Vue 3 (`<script setup>` + Composition API) qui ajoute glisser-déposer / clic, aperçu, barre de progrès et suppression – support **multi-types** & **multi-fichiers**.

[![npm](https://img.shields.io/npm/v/@salvadorgriaule/vue3-dropzone?color=%234f46e5)](https://npmjs.com/package/@salvadorgriaule/vue3-dropzone)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Vue 3](https://img.shields.io/badge/Vue-3-%234fc08d)

---

## ✨ Fonctionnalités
- ✅ **Types acceptés** : `image`, `audio`, `vidéo`, `text` ou `all`  
- ✅ **Miniatures** auto (images) + **barre de progrès** par fichier  
- ✅ **Suppression** individuelle (avec réduction animée de la hauteur)  
- ✅ **Feedback visuel** au survol (overlay gris semi-transparent)  
- ✅ **Mode unique / multiple** (`maxFile`)  
- ✅ **Émission** `fileUpload` & `ifUpload` – prêt pour `fetch` ou `FormData`  
- ✅ **TypeScript** natif – zéro dépendance **runtime** (hors Dropzone)

---

## 📦 Installation

```bash
npm i @salvadorgriaule/vue3-dropzone
# ou
pnpm add @salvadorgriaule/vue3-dropzone
```

---

## 🚀 Usage rapide

```vue
<script setup lang="ts">
import VueDropzone from "@salvadorgriaule/vue3-dropzone";
import { ref } from "vue";

const files = ref<File[]>([]);
</script>

<template>
  <VueDropzone
    type={["image","video"]}
    :maxFile="5"
    @fileUpload="f => files = f"
  />
</template>
```

---

## 📌 Props

| Prop        | Type | Défaut | Description |
|-------------|------|--------|-------------|
| `type`      | `"all"` ou `FileType[]` | `"all"` | Filtre d’extensions / MIME |
| `souple`    | `boolean` | `true` | Si `false` largeur = `w-11/12` |
| `defaultVal`| `string` | `null` | Image par défaut (chemin relatif) |
| `maxFile`   | `number` | `1` | Nombre max de fichiers |

---

## 📡 Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `fileUpload` | `File[]` | Tableau des fichiers actuels (ajout/suppression) |
| `ifUpload` | `boolean` | `true` si la zone redevient vide |

---

## 🎯 Exemple complet : envoi via fetch

```vue
<script setup lang="ts">
const handleSubmit = async (e: Event) => {
  const fd = new FormData(e.target as HTMLFormElement);
  await fetch("/api/upload", { method: "POST", body: fd });
};
</script>

<form @submit.prevent="handleSubmit">
  <VueDropzone name="media" type={["image","audio"]} :maxFile="10" />
  <button type="submit">Uploader</button>
</form>
```

> Le composant écoute l’événement natif `formdata` et remplit le `FormData` automatiquement – **aucun code supplémentaire requis**.

---

## 🎨 Slots & personnalisation

Le template interne utilise les classes Tailwind :
- `.border-dashed .border-blue-500` : zone vide  
- `.template` : carte fichier (miniature, nom, taille, barre, bouton **Delete**)  

Vous pouvez **override** le style via CSS classique ou `:deep()` si vous utilisez `scoped`.

---

## 🛠️ Développement

```bash
git clone https://github.com/SalvadorGriaule/vue3-dropzone.git
cd vue3-dropzone
pnpm i
pnpm dev        # http://localhost:5173
```

---

## 📁 Arborescence

```
src/
├── lib/
│   └── VueDropzone.vue   # ce composant
├── assets/
│   ├── ts/colorRandomizer.ts
│   └── download.svg
└── index.ts              # export default
```

---

## 📝 Licence

MIT – drop it like it’s hot 🔥

---

## 🤝 Contributions

1. Forkez  
2. `feat/amazing-feature`  
3. `pnpm check && pnpm build` ✅  
4. Pull Request

---

Une ⭐ star = un fichier qui atterrit en douceur dans le cloud !
