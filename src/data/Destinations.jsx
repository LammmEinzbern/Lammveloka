import { useState, useEffect } from "react";
import { supabase } from "../utils/SupaWorld";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase.from("negara_asia").select("*");
      if (error) throw new Error(error.message);
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 animate-pulse rounded-lg shadow-lg overflow-hidden"
        >
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 mb-">
      {destinations.length === 0 ? (
        renderSkeleton()
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((item, index) => (
            <li
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.foto_wisata}
                alt={item.nama_tempat}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {item.nama_negara} ({item.nama_negara})
                </h2>
                <p className="text-gray-600 mt-2">{item.deskripsi_tempat}</p>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {item.tempat_alam}
              </h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Destinations;
