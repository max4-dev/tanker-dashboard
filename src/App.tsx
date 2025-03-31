import { useState } from "react";
import "./App.css";
import tankerImage from "./assets/images/tanker.jpg";
import TankerMap from "./components/TankerMap";
import ZoneEditor from "./components/ZoneEditor";

// Импортируем интерфейс Zone из компонента ZoneEditor
import { Sidebar } from "./components/Sidebar/Sidebar";
import type { Zone } from "./components/ZoneEditor";

function App() {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleZonesSave = (zones: Zone[]) => {
    console.log("Созданные зоны:", zones);
    setIsEditMode(false);
    // Здесь можно сохранить зоны в state или отправить на сервер
  };

  return (
    <div className="app-container">
      <Sidebar className="app-sidebar" />
      <main className="app-content">
        <div className="app-header">
          <button className="edit-mode-button" onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? "Режим просмотра" : "Режим редактирования"}
          </button>
        </div>
        {isEditMode ? (
          <ZoneEditor imageSrc={tankerImage} onZonesSave={handleZonesSave} />
        ) : (
          <TankerMap imageSrc={tankerImage} />
        )}
      </main>
    </div>
  );
}

export default App;
