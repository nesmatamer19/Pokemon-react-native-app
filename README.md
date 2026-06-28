# 📱 Pokédex App (React Native & Expo Router)

This is a simple clean, universal mobile application built with React Native and Expo that showcases data from the public [PokéAPI](https://pokeapi.co/). It utilizes modern file-based routing and hooks to fetch and present detailed information about your favorite Pokémon.

## ✨ Features

* **Pokémon List (Home Screen):** Efficiently fetches and displays a list of the first 20 Pokémon using asynchronous batch fetching (`Promise.all`).
* **Dynamic Categorization:** Cards are dynamically color-coded on the home screen using custom hex maps matching each Pokémon's primary element type.
* **Details Modal (FormSheet):** Clicking on a Pokémon brings up a native iOS/Android interactive bottom sheet modal displaying key stats.
* **Rich Data Presentation:** Displays custom sprites (front view), base experience points, weight, and elemental types cleanly.
* **Fully Typed:** Implements custom TypeScript interfaces to guarantee end-to-end type safety for network payloads and local state.

## 🛠️ Tech Stack & Concepts Covered

* **Framework:** React Native via [Expo (SDK 51+)](https://expo.dev)
* **Navigation:** `expo-router` (File-based routing with dynamic parameters via `useLocalSearchParams`)
* **State Management:** React hooks (`useState`, `useEffect` dependency tracking)
* **API Integration:** Asynchronous JavaScript `fetch` matching nested relational structures of PokéAPI
* **Language:** TypeScript 

---

## 🚀 Get Started

### 1. Install Dependencies

Clone this repository to your local machine, open your terminal inside the root folder, and install the package requirements:

```bash
npm install
