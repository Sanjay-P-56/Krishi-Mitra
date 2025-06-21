import React, { useState } from 'react';
import axios from 'axios';
import { Sprout, Zap, TrendingUp, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface PredictionResult {
  crop_prediction: string;
  fertilizer_prediction: string;
  confidence?: number;
}

const PredictionPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const cropResponse = await axios.post(
        'https://crop-prediction-1-6nny.onrender.com/predict_crop',
        {
          nitrogen: +formData.nitrogen,
          phosphorus: +formData.phosphorus,
          potassium: +formData.potassium,
          temperature: +formData.temperature,
          humidity: +formData.humidity,
          ph: +formData.ph,
          rainfall: +formData.rainfall
        }
      );

      const fertilizerResponse = await axios.post(
        'https://crop-prediction-1-6nny.onrender.com/predict_fertilizer',
        {
          nitrogen: +formData.nitrogen,
          phosphorus: +formData.phosphorus,
          potassium: +formData.potassium
        }
      );

      setResult({
        crop_prediction: cropResponse.data.predicted_crop,
        fertilizer_prediction: fertilizerResponse.data.fertilizer_recommendation,
        confidence: cropResponse.data.confidence
      });
    } catch (err: any) {
      console.error(err);
      setError('Something went wrong while predicting.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Soil & Climate Parameters</h1>
      <p className="text-center text-gray-500 mb-8">Enter your soil characteristics and local climate data</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Nitrogen (N)</label>
          <input type="number" name="nitrogen" value={formData.nitrogen} onChange={handleInputChange} className="w-full border p-3 rounded" placeholder="0-150 kg/ha" required />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Phosphorus (P)</label>
          <input type="number" name="phosphorus" value={formData.phosphorus} onChange={handleInputChange} className="w-full border p-3 rounded" placeholder="0-150 kg/ha" required />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Potassium (K)</label>
          <input type="number" name="potassium" value={formData.potassium} onChange={handleInputChange} className="w-full border p-3 rounded" placeholder="0-150 kg/ha" required />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">pH Value</label>
          <input type="number" name="ph" value={formData.ph} onChange={handleInputChange} className="w-full border p-3 rounded" placeholder="0-14" required />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Temperature</label>
          <input type="number" name="temperature" value={formData.temperature} onChange={handleInputChange} className="w-full border p-3 rounded" placeholder="°C" required />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Humidity</label>
          <input type="number" name="humidity" value={formData.humidity} onChange={handleInputChange} className="w-full border p-3 rounded" placeholder="%" required />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Rainfall</label>
          <input type="number" name="rainfall" value={formData.rainfall} onChange={handleInputChange} className="w-full border p-3 rounded" placeholder="mm" required />
        </div>

        <div className="md:col-span-2 text-center">
          <button type="submit" disabled={isLoading} className="mt-4 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-all">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin h-5 w-5 mr-2" /> Predicting...
              </span>
            ) : (
              'Predict Best Crop'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 text-red-600 flex items-center justify-center">
          <AlertCircle className="mr-2" /> {error}
        </div>
      )}

      {result && (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg">
          <div className="flex items-center text-green-700 font-semibold mb-2">
            <CheckCircle className="mr-2" /> Best Crop: {result.crop_prediction}
          </div>
          <div className="flex items-center text-yellow-700 font-semibold mb-2">
            <Zap className="mr-2" /> Fertilizer: {result.fertilizer_prediction}
          </div>
          {result.confidence && (
            <div className="flex items-center text-blue-700 font-semibold">
              <TrendingUp className="mr-2" /> Confidence: {Math.round(result.confidence * 100)}%
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionPage;