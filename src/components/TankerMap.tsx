import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ImageMapper, { Area, Map } from "react-image-mapper";
import {
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Area as RechartsArea,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./TankerMap.css";

interface TankerMapProps {
  imageSrc: string;
}

interface ChartType {
  type: "line" | "bar" | "pie" | "area";
  colors: string[];
}

interface AreaData {
  title: string;
  description: string;
  chartData: { name: string; value: number; value2?: number }[];
  chartType: ChartType;
}

interface MapArea extends Area {
  id: number;
  name: string;
  shape: string;
  coords: number[];
  fillColor: string;
  strokeColor: string;
  data: AreaData;
}

interface MapConfig extends Map {
  name: string;
  areas: MapArea[];
}

const TankerMap: React.FC<TankerMapProps> = ({ imageSrc }) => {
  const [selectedZone, setSelectedZone] = useState<MapArea | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Предопределенные зоны танкера с исправленными координатами и разными графиками
  const MAP: MapConfig = {
    name: "tanker-map",
    areas: [
      {
        id: 3,
        name: "Левый борт",
        shape: "poly",
        coords: [
          229, 335, 252, 369, 257, 387, 248, 407, 242, 427, 240, 449, 260, 465, 289, 465, 349, 457,
          406, 446, 452, 437, 501, 419, 547, 400, 583, 379, 624, 354, 656, 332, 692, 309, 726, 286,
          762, 264, 793, 242, 817, 224, 834, 209, 849, 183, 853, 146, 843, 162, 820, 172, 792, 185,
          760, 201, 734, 217, 691, 233, 649, 254, 611, 277, 579, 294, 536, 311, 481, 330, 430, 345,
          373, 350, 313, 351, 267, 346,
        ],
        fillColor: "rgba(100, 90, 220, 0.3)",
        strokeColor: "rgba(100, 90, 220, 0.8)",
        data: {
          title: "Левый борт",
          description: "Параметры левого борта",
          chartType: {
            type: "line",
            colors: ["#7D6AE6", "#5D87F2"],
          },
          chartData: [
            { name: "Янв", value: 450, value2: 380 },
            { name: "Фев", value: 380, value2: 420 },
            { name: "Мар", value: 520, value2: 480 },
            { name: "Апр", value: 480, value2: 440 },
            { name: "Май", value: 410, value2: 390 },
            { name: "Июн", value: 460, value2: 500 },
          ],
        },
      },
      {
        id: 4,
        name: "Надстройка",
        shape: "poly",
        coords: [
          825, 155, 732, 151, 734, 121, 705, 93, 704, 83, 861, 90, 856, 99, 844, 110, 846, 143,
        ],
        fillColor: "rgba(70, 130, 210, 0.3)",
        strokeColor: "rgba(70, 130, 210, 0.8)",
        data: {
          title: "Надстройка",
          description: "Параметры надстройки",
          chartType: {
            type: "bar",
            colors: ["#4E7BD6", "#3A95D2"],
          },
          chartData: [
            { name: "Янв", value: 320, value2: 290 },
            { name: "Фев", value: 290, value2: 310 },
            { name: "Мар", value: 370, value2: 350 },
            { name: "Апр", value: 340, value2: 320 },
          ],
        },
      },
      {
        id: 5,
        name: "Палуба",
        shape: "poly",
        coords: [
          242, 338, 281, 347, 334, 347, 386, 345, 473, 328, 545, 305, 619, 274, 656, 249, 703, 227,
          644, 212, 584, 202, 544, 194, 482, 214, 426, 232, 381, 245, 339, 259, 310, 271, 281, 283,
          259, 299, 239, 316,
        ],
        fillColor: "rgba(140, 75, 190, 0.3)",
        strokeColor: "rgba(140, 75, 190, 0.8)",
        data: {
          title: "Палуба",
          description: "Параметры палубы танкера",
          chartType: {
            type: "pie",
            colors: ["#9A70C2", "#6B84D6", "#50A7D5", "#4DCDD0"],
          },
          chartData: [
            { name: "Температура", value: 280 },
            { name: "Давление", value: 320 },
            { name: "Вибрация", value: 390 },
            { name: "Шум", value: 240 },
          ],
        },
      },
    ],
  };

  // Хук для закрытия всплывающего окна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setSelectedZone(null);
      }
    };

    if (selectedZone) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedZone]);

  const handleAreaClick = (area: Area, _: number, event: React.MouseEvent) => {
    const nativeEvent = event.nativeEvent as MouseEvent;
    setTooltipPosition({
      x: nativeEvent.offsetX,
      y: nativeEvent.offsetY,
    });

    setSelectedZone(area as MapArea);
  };

  const closeTooltip = () => {
    setSelectedZone(null);
  };

  // Функция для рендеринга соответствующего типа графика
  const renderChart = (zoneData: AreaData) => {
    const { chartType, chartData } = zoneData;

    switch (chartType.type) {
      case "line":
        return (
          <LineChart width={400} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke={chartType.colors[0]} />
            <Line type="monotone" dataKey="value2" stroke={chartType.colors[1]} />
          </LineChart>
        );

      case "bar":
        return (
          <BarChart width={400} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={chartType.colors[0]} />
            <Bar dataKey="value2" fill={chartType.colors[1]} />
          </BarChart>
        );

      case "pie":
        return (
          <PieChart width={400} height={250}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartType.colors[index % chartType.colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );

      case "area":
        return (
          <AreaChart width={400} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <RechartsArea
              type="monotone"
              dataKey="value"
              stroke={chartType.colors[0]}
              fill={chartType.colors[0]}
              fillOpacity={0.3}
            />
            <RechartsArea
              type="monotone"
              dataKey="value2"
              stroke={chartType.colors[1]}
              fill={chartType.colors[1]}
              fillOpacity={0.3}
            />
          </AreaChart>
        );

      default:
        return (
          <LineChart width={400} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#7D6AE6" />
          </LineChart>
        );
    }
  };

  return (
    <div className="tanker-map-container">
      <ImageMapper
        src={imageSrc}
        map={MAP}
        width={950}
        imgWidth={950}
        onClick={handleAreaClick}
        onMouseEnter={() => {
          // Можно добавить эффект при наведении
        }}
        onMouseLeave={() => {
          // Можно обработать выход курсора из зоны
        }}
      />

      <AnimatePresence>
        {selectedZone && (
          <motion.div
            ref={tooltipRef}
            className="data-tooltip"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: "absolute",
              left: `${tooltipPosition.x - 420}px`,
              top: `${tooltipPosition.y}px`,
              transform: "translate(0, -50%)",
            }}
          >
            <div className="tooltip-header">
              <h3>{selectedZone.data.title}</h3>
              <button onClick={closeTooltip}>×</button>
            </div>
            <div className="tooltip-content">
              <p>{selectedZone.data.description}</p>
              {renderChart(selectedZone.data)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TankerMap;
