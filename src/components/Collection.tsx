import React, { useState, useEffect } from 'react';
import { getImageUrls } from '../utils/imageStorage';

interface SweatshirtItem {
  id: number;
  name: string;
  price: string;
  defaultImage: string;
}

const defaultSweatshirts: SweatshirtItem[] = [
  {
    id: 1,
    name: "Buzo Nocturno",
    price: "$49.99",
    defaultImage: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Buzo Classic Hood",
    price: "$54.99",
    defaultImage: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "Buzo Urban Elite",
    price: "$59.99",
    defaultImage: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    name: "Buzo Street Vision",
    price: "$52.99",
    defaultImage: "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    name: "Buzo Minimal Code",
    price: "$47.99",
    defaultImage: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    name: "Buzo Urban Flow",
    price: "$56.99",
    defaultImage: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const Collection: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = getImageUrls();
    setImageUrls(urls);
  }, []);

  const getImageUrl = (index: number): string => {
    return imageUrls[index] || defaultSweatshirts[index].defaultImage;
  };

  return (
    <section id="collection" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestra <span className="text-blue-500">Colección</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección exclusiva de buzos diseñados para la vida urbana moderna.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultSweatshirts.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={getImageUrl(index)}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-2xl font-bold text-blue-500 mb-4">{item.price}</p>
                
                <button className="w-full bg-gray-900 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;