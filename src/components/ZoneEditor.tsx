import React, { useRef, useState } from 'react';
import './ZoneEditor.css';

interface ZoneEditorProps {
  imageSrc: string;
  onZonesSave: (zones: Zone[]) => void;
}

export interface Zone {
  name: string;
  shape: string;
  coords: number[];
}

const ZoneEditor: React.FC<ZoneEditorProps> = ({ imageSrc, onZonesSave }) => {
  const [currentZone, setCurrentZone] = useState<number[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  console.log(zones);
  
  const [currentZoneName, setCurrentZoneName] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    
    setCurrentZone([...currentZone, x, y]);
  };

  const completeZone = () => {
    if (currentZone.length < 6) {
      alert('Зона должна иметь минимум 3 точки (6 координат)');
      return;
    }
    
    const newZone: Zone = {
      name: currentZoneName || `Зона ${zones.length + 1}`,
      shape: 'poly',
      coords: [...currentZone],
    };
    
    setZones([...zones, newZone]);
    setCurrentZone([]);
    setCurrentZoneName('');
  };

  const resetCurrentZone = () => {
    setCurrentZone([]);
  };

  const saveZones = () => {
    onZonesSave(zones);
  };

  return (
    <div className="zone-editor">
      <div className="editor-controls">
        <input 
          type="text" 
          value={currentZoneName} 
          onChange={(e) => setCurrentZoneName(e.target.value)} 
          placeholder="Название зоны"
        />
        <button onClick={completeZone}>Завершить текущую зону</button>
        <button onClick={resetCurrentZone}>Сбросить текущую зону</button>
        <button onClick={saveZones}>Сохранить все зоны</button>
      </div>
      
      <div className="image-container">
        <img 
          ref={imageRef}
          src={imageSrc} 
          alt="Танкер" 
          onClick={handleImageClick}
        />
        
        <svg className="overlay" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
          {/* Отображение точек текущей зоны */}
          {currentZone.length > 0 && currentZone.length % 2 === 0 && 
            [...Array(currentZone.length / 2)].map((_, i) => (
              <circle 
                key={`point-${i}`} 
                cx={currentZone[i*2]} 
                cy={currentZone[i*2+1]} 
                r="4" 
                fill="red" 
              />
            ))
          }
          
          {/* Отображение линий между точками текущей зоны */}
          {currentZone.length >= 4 && 
            [...Array(currentZone.length / 2 - 1)].map((_, i) => (
              <line 
                key={`line-${i}`}
                x1={currentZone[i*2]} 
                y1={currentZone[i*2+1]} 
                x2={currentZone[(i+1)*2]} 
                y2={currentZone[(i+1)*2+1]} 
                stroke="red" 
                strokeWidth="2"
              />
            ))
          }
          
          {/* Соединение последней точки с первой */}
          {currentZone.length >= 6 && 
            <line 
              x1={currentZone[currentZone.length-2]} 
              y1={currentZone[currentZone.length-1]} 
              x2={currentZone[0]} 
              y2={currentZone[1]} 
              stroke="red" 
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          }
          
          {/* Отображение сохраненных зон */}
          {zones.map((zone, zoneIndex) => (
            <polygon 
              key={`zone-${zoneIndex}`}
              points={
                [...Array(zone.coords.length / 2)].map((_, i) => 
                  `${zone.coords[i*2]},${zone.coords[i*2+1]}`
                ).join(' ')
              }
              fill="rgba(0, 100, 255, 0.3)"
              stroke="blue"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
      
      <div className="zones-list">
        <h3>Созданные зоны:</h3>
        <ul>
          {zones.map((zone, index) => (
            <li key={index}>
              {zone.name} - {zone.coords.length / 2} точек - coords: [{zone.coords.join(', ')}]
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ZoneEditor; 