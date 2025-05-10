import React from "react";
import { FaCity, FaMountain, FaTree, FaUmbrellaBeach } from "react-icons/fa";

const Sidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  const categoryIcons = {
    Pantai: <FaUmbrellaBeach className="text-yellow-300" />,
    Gunung: <FaMountain className="text-lime-400" />,
    Hutan: <FaTree className="text-emerald-400" />,
    Kota: <FaCity className="text-blue-200" />,
  };

  return (
    <div className="hidden lg:flex flex-col w-64 h-full bg-gradient-to-b from-blue-600 to-blue-900 text-white py-10 px-6 shadow-2xl fixed z-10">
      <h2 className="text-2xl font-extrabold mb-6 mt-10 tracking-wide text-white border-b-2 border-white pb-2">
        Kategori Wisata
      </h2>
      <ul className="space-y-4">
        {categories.map((category, index) => (
          <li key={index}>
            <button
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ease-in-out ${
                selectedCategory === category
                  ? "bg-white text-blue-700 shadow-md border-l-4 border-yellow-400"
                  : "hover:bg-blue-500/80 hover:scale-[1.02] active:scale-[.98]"
              }`}
              onClick={() => onCategorySelect(category)}
            >
              {categoryIcons[category] || <FaTree className="text-sky-300" />}
              <span className="text-base">{category}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
