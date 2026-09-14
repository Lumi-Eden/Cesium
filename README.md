# Cesium

**Cesium** je interní desktopová aplikace vytvořená pro zjednodušení a zrychlení celého procesu správy zakázek – od jejich zadání přes lokální ukládání až po finální tisk.

Aplikace slouží k přehledné evidenci objednávek, dynamickému vyplňování formulářů a generování čistých tiskových sestav bez rušivých prvků uživatelského rozhraní.

---

## Hlavní funkce

* **Tvorba a správa zakázek:** Intuitivní formuláře s dynamickým zapínáním polí a přehlednou strukturou.
* **Tiskové výstupy:** Optimalizované tiskové zobrazení (automatické skrytí neaktivních kategorií a tlačítkových prvků při tisku přes `Ctrl+P`).
* **Lokální persistence:** Ukládání stavu formulářů pro prevenci ztráty dat.
* **Nativní výkon:** Rychlé a úsporné desktopové prostředí s nízkými nároky na systém.

---

## Použité technologie

* **Frontend:** React, Vite, Tailwind CSS
* **Desktop Runtime:** Tauri v2 (Rust)

---

## Lokální vývoj a spuštění

Pro spuštění vývojového prostředí je vyžadováno **Node.js** a **Rust**.

```bash
# Klonování repozitáře
git clone [https://github.com/Lumi-Eden/Cesium.git](https://github.com/Lumi-Eden/Cesium.git)
cd Cesium

# Instalace závislostí
npm install

# Spuštění vývojové verze
npm run tauri dev
