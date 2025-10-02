import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrls, saveImageUrls } from '../utils/imageStorage';

const AdminPanel: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>(Array(6).fill(''));
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedUrls = getImageUrls();
    setImageUrls(savedUrls);
  }, []);

  const handleUrlChange = (index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  };

  const handleSave = () => {
    saveImageUrls(imageUrls);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const sweatshirtLabels = [
    "Buzo Nocturno",
    "Buzo Classic Hood", 
    "Buzo Urban Elite",
    "Buzo Street Vision",
    "Buzo Minimal Code",
    "Buzo Urban Flow"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al sitio principal
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Administrador de <span className="text-blue-500">Imágenes</span>
          </h1>
          <p className="text-lg text-gray-600">
            Actualiza las URLs de las imágenes de los buzos en la colección principal.
          </p>
        </div>

        {/* Image URL Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            {sweatshirtLabels.map((label, index) => (
              <div key={index} className="space-y-2">
                <label
                  htmlFor={`image-${index}`}
                  className="block text-sm font-semibold text-gray-700"
                >
                  URL Imagen {label}
                </label>
                <input
                  type="url"
                  id={`image-${index}`}
                  value={imageUrls[index] || ''}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder="https://ejemplo.com/imagen-buzo.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                isSaved
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Cambios Guardados
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Instrucciones:</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Pega URLs válidas de imágenes de alta calidad</li>
            <li>• Las imágenes deben tener formato cuadrado para mejor visualización</li>
            <li>• Los cambios se aplicarán inmediatamente en la página principal</li>
            <li>• Si dejas un campo vacío, se usará la imagen por defecto</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;