import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/SupaWorld";
import Header from "../components/Header";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null); // Data
  const [error, setError] = useState(null); // Error

  const fetchDestination = async () => {
    try {
      const { data, error } = await supabase
        .from("negara_asia")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      setDestination(data);
    } catch (error) {
      setError("Destination not found");
      console.error("Error fetching destination:", error.message);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, [id]);

  if (!destination && !error) {
    return (
      <div>
        <Header />
        <div className="max-w-5xl mx-auto my-16 p-16 mt-16">
          <div className="relative w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="mt-8 space-y-4">
            <div className="h-8 bg-gray-300 rounded-lg w-3/4"></div>
          </div>
          <div className="mt-6 space-y-4 mb-10">
            <div className="h-4 bg-gray-300 rounded-lg"></div>
            <div className="h-4 bg-gray-300 rounded-lg w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded-lg w-2/3"></div>
          </div>
          <div className="relative w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="mt-8 space-y-4 ">
            <div className="h-8 bg-gray-300 rounded-lg w-3/4"></div>
          </div>
          <div className="mt-6 space-y-4 mb-10">
            <div className="h-4 bg-gray-300 rounded-lg"></div>
            <div className="h-4 bg-gray-300 rounded-lg w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded-lg w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 text-xl">
        {error || "Destination not found"}
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-16 p-6">
      <Header />
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={destination.foto_wisata}
          alt={destination.nama_negara}
          className="w-full h-full object-cover mt-16"
        />
      </div>
      <div className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {destination.nama_negara}
        </h1>
      </div>
      <div className="mt-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          {destination.deskripsi_tempat}
        </p>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {destination.tempat_alam}
        </h1>
      </div>
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={destination.foto_alam}
          alt={destination.tempat_alam}
          className="w-full h-full object-cover mt-16"
        />
      </div>
      <div className="mt-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          {destination.deskripsi_alam}
        </p>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {destination.tempat_alam2}
        </h1>
      </div>
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={destination.foto_alam2}
          alt={destination.tempat_alam2}
          className="w-full h-full object-cover mt-16"
        />
      </div>
      <div className="mt-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          {destination.deskripsi_alam2}
        </p>
      </div>
    </div>
  );
};

export default DestinationDetail;
