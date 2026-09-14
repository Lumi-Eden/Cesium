import { useState, useEffect } from "react";
import logoNoBg from "./assets/logo-nobg.png";
import "./App.css";

import BackBtn from "./components/header/BackBtn";
import DeleteBtn from "./components/header/DeleteBtn";
import SearchBar from "./components/header/SearchBar";
import OpravaBtn from "./components/header/OpravaBtn";
import PrintBtn from "./components/header/PrintBtn";
import FormAside from "./components/aside/FormAside";
import FormPopup from "./components/aside/FormPopup";
import LogAside from "./components/aside/LogAside";
import ItemSelection from "./components/main/ItemSelection";

// Mapping form names to their parent print categories
const printCategoryMap = {
  'Přípisy': 'Náhrobky',
  'Sklodesky rozměr': 'Sklodesky',
  'Schody': 'Schody',
  'Parapety': 'Parapety'
};

function App() {
  const [isFormActive, setIsFormActive] = useState(false)
  // Array of active window instances: e.g. [{ id: 'Přípisy-1234', category: 'Přípisy', title: 'Přípisy 1' }]
  const [openForms, setOpenForms] = useState([]);
  // Keyed by the unique instance ID so each window saves its own data separately!
  const [formsData, setFormsData] = useState({});

  const [activeCategory, setActiveCategory] = useState("Default")
  console.log("Current category: ", activeCategory)

  // == Data logging logic ==
  const [activeBreadcrumbs, setActiveBreadcrumbs] = useState([])
  const [logEntries, setLogEntries] = useState([])

  // Call every step click - e.g. Náhrobky -> Typ -> Materiály
  const handleStepClick = (stepLabel, isFinalStep = false) => {
    const updatedBreadcrumbs = [...activeBreadcrumbs, stepLabel]
    console.log("Breadcrumbs: ", updatedBreadcrumbs)

    if (isFinalStep) {
      // Completed the entry tree! Push logs and reset navigation path
      const newEntry = {
        id: crypto.randomUUID(),
        path: updatedBreadcrumbs,
        formatted: updatedBreadcrumbs.join(" - ")
      };

      setLogEntries((prev) => [...prev, newEntry]);
      setActiveBreadcrumbs([]); // Reset active path to default
    } else {
      // Not at the end, update breadcrumb path to next view
      setActiveBreadcrumbs(updatedBreadcrumbs);
    }
  };

  const handleReturnToDefault = () => {
    // If the user clicked into a category (e.g., ["Náhrobky", "Typ-A"]) 
    // but clicked Home before choosing a material:
    if (activeBreadcrumbs.length > 0) {
      const incompleteEntry = {
        id: crypto.randomUUID(),
        path: activeBreadcrumbs,
        formatted: activeBreadcrumbs.join(" - ")
      };

      setLogEntries((prev) => [...prev, incompleteEntry]);
    }

    // Clear active breadcrumbs and reset view state
    setActiveBreadcrumbs([]);
    setActiveCategory("Default");
  };

  // Log manpipulation
  const onLogItemDeletion = (idToDelete) => {
    setLogEntries((prev) => prev.filter((item) => item.id !== idToDelete));
  };

  // Clears logs as well as forms. Might be relocated later
  const onClearAll = () => {
    setLogEntries([])
    setActiveBreadcrumbs([])
    setFormsData({})
    setOpenForms([])
    setIsFormActive(false)
    localStorage.removeItem("print_order_data"); // Clears the print document queue
  };

  // == Form logic ==
  // Opens a new form instance (or spawns another via "Přidat Další")
  const handleOpenForm = (category) => {
    setIsFormActive(true);

    // Count how many forms of this category are CURRENTLY open
    const openCount = openForms.filter((f) => f.category === category).length;
    const instanceNumber = openCount + 1;
    const instanceId = `${category}-${instanceNumber}`;

    // Prevent opening duplicate windows of the exact same slot
    if (openForms.some((f) => f.id === instanceId)) return;

    const newForm = {
      id: instanceId,
      category: category,
      title: `${category} ${instanceNumber}` // e.g., "Přípisy 1"
    };

    setOpenForms((prev) => [...prev, newForm]);
  };

  const handleCloseForm = (instanceId) => {
    setIsFormActive(false)
    setOpenForms((prev) => prev.filter((f) => f.id !== instanceId));
  };

  const handleSaveForm = (instanceId, dataFromPopup) => {
    // 1. Save to React state for the active window
    setFormsData((prev) => ({
      ...prev,
      [instanceId]: dataFromPopup 
    }));

    // 2. Find the form instance to get its category
    const formInstance = openForms.find((f) => f.id === instanceId);
    if (!formInstance) return;

    // Route it to the correct parent category for the print document
    const topCategory = printCategoryMap[formInstance.category] || 'Náhrobky';

    // 3. Save directly to logEntries! 
    // This ensures it shows in your UI log and your PrintBtn saves it naturally.
    setLogEntries((prev) => {
      const existingIndex = prev.findIndex((e) => e.id === instanceId);
      
      const newEntry = {
        id: instanceId, // Link strictly to this form window
        path: [topCategory], 
        formatted: formInstance.title, // e.g., "Přípisy 1", "Přípisy 2"
        data: dataFromPopup // The actual form fields
      };

      if (existingIndex > -1) {
        // Update the existing entry in the log while typing
        const updatedLogs = [...prev];
        updatedLogs[existingIndex] = newEntry;
        return updatedLogs;
      } else {
        // Append as a new log item
        return [...prev, newEntry];
      }
    });
  };

  return (
    <main className="bg-zinc-100 w-screen h-screen overflow-hidden flex flex-col">

      <div id="overlay" className={`bg-gray-500 fixed
        ${
          isFormActive ? "pointer-events-auto z-10 w-screen h-screen opacity-50" : "pointer-events-none z-0 w-0 h-0 opacity-0"
        }    
      `} />
    
      {openForms.map((form) => (
        <FormPopup 
          key={form.id}
          formName={form.category} // Used to fetch the correct schema from JSON
          title={form.title}       // Renders "Přípisy 1", "Přípisy 2", etc.
          initialData={formsData[form.id]} 
          onSave={(data) => handleSaveForm(form.id, data)}
          onClose={() => handleCloseForm(form.id)}
          onAddAnother={() => handleOpenForm(form.category)} // Spawns another of the same type!
        />
      ))}

      <header className="flex w-full h-16 bg-zinc-100 border-b border-zinc-300">
        <BackBtn onBackClick={() => {handleReturnToDefault();}} />
        <DeleteBtn handleClearAll={onClearAll} />
        <SearchBar />
        <OpravaBtn />
        <PrintBtn logEntries={logEntries} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside>
          <FormAside onOpenForm={(category) => handleOpenForm(category)} />
          <LogAside logEntries={logEntries} handleLogItemDeletion={onLogItemDeletion} />
        </aside>

        <div className="flex-1 overflow-auto">
          <ItemSelection
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onStepClick={handleStepClick}
          />
          <img src={logoNoBg} className="w-38 mx-auto pointer-events-none:" />
        </div>
      </div>

      <footer className="flex">
        <p className="m-2">0.5b</p>
      </footer>

    </main>
  );
}

export default App;
