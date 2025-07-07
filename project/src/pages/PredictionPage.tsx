import React, { useState } from 'react';
import axios from 'axios';
import { Sprout, Zap, TrendingUp, AlertCircle, CheckCircle, Loader2, Droplets } from 'lucide-react';


interface PredictionResult {
  crop_prediction?: string;
  fertilizer_prediction?: string;
  confidence?: number;
  npk_ratio?: string;
  application_rate?: string;
  recommendations?: string[];
  alternative_crops?: string[];
}

const SOIL_TYPES = ["Sandy", "Loamy", "Black", "Red", "Clayey"];
const CROP_TYPES = [
  "Maize", "Sugarcane", "Cotton", "Tobacco", "Paddy", 
  "Barley", "Wheat", "Millets", "Oil seeds", "Pulses", "Ground Nuts"
];

const PredictionPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nitrogen: '0',
    phosphorus: '0',
    potassium: '0',
    temperature: '0',
    humidity: '0',
    ph: '0',
    rainfall: '0',
    moisture: '0',
    soilType: 'Loamy',
    cropType: 'Maize'
  });

  const [activeTab, setActiveTab] = useState<'crop' | 'fertilizer'>('crop');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      if (activeTab === 'crop') {
        const requestData = {
          N: parseFloat(formData.nitrogen),
          P: parseFloat(formData.phosphorus),
          K: parseFloat(formData.potassium),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          ph: parseFloat(formData.ph),
          rainfall: parseFloat(formData.rainfall),
          moisture: parseFloat(formData.moisture),
        };

        const cropResponse = await axios.post(
          'https://crop-prediction-1-6nny.onrender.com/prediction',
          requestData
        );

        // Handle the array response format
        const predictions = cropResponse.data.top_prediction;
        
        if (!predictions || !Array.isArray(predictions)) {
          throw new Error('Invalid prediction format received');
        }

        // Get top prediction
        const topPrediction = predictions[0] || {};
        const cropPrediction = topPrediction.class || "Unknown";
        const confidence = topPrediction.probability || 0;

        // Get alternative crops (excluding the top prediction)
        const alternativeCrops = predictions.slice(1)
          .filter(p => p.class && p.probability > 0.05)
          .map(p => `${p.class} (${(p.probability * 100).toFixed(1)}%)`);

        setResult({
          crop_prediction: cropPrediction,
          confidence: confidence,
          alternative_crops: alternativeCrops,
          recommendations: [
            `Recommended crop: ${cropPrediction} (${(confidence * 100).toFixed(1)}% confidence)`,
            ...(alternativeCrops.length > 0 
              ? [`Alternative crops: ${alternativeCrops.join(', ')}`] 
              : []),
            "Maintain adequate water levels in the field",
            "Apply organic fertilizers for better yield",
            "Monitor for pests regularly"
          ]
        });
      } else {
        const fertilizerResponse = await axios.post(
          'https://crop-prediction-1-6nny.onrender.com/fertilizerReccommendation',
          {
            Nitrogen: +formData.nitrogen,
            Potassium: +formData.potassium,
            Phosphorous: +formData.phosphorus,
            Temparature: +formData.temperature,
            Humidity: +formData.humidity,
            Moisture: +formData.moisture,
            Soil_Type: formData.soilType,
            Crop_Type: formData.cropType
          }
        );

        const fertilizerData = fertilizerResponse.data;
        const fertilizerPrediction = fertilizerData.prediction || 
                                   fertilizerData.fertilizer || 
                                   fertilizerData.recommended_fertilizer || 
                                   "NPK";

        setResult({
          fertilizer_prediction: fertilizerPrediction,
          npk_ratio: fertilizerData.npk_ratio || "10-26-26",
          application_rate: fertilizerData.application_rate || "50-75 kg/ha",
          recommendations: fertilizerData.recommendations || [
            "Apply fertilizer in split doses for better absorption",
            "Mix with organic compost for improved soil health",
            "Apply during early morning or evening hours",
            "Ensure adequate soil moisture before application"
          ]
        });
      }
    } catch (err: any) {
      console.error('Prediction error:', err);
      setError(err.response?.data?.message || 
               err.message || 
               'Something went wrong while predicting.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Sprout className="h-8 w-8 text-green-600" />
              Crop & Fertilizer Predictor
            </h1>
            <p className="mt-2 text-gray-600">
              Use our AI-powered tool to determine the best crop and fertilizer for your soil.
            </p>
          </div>

          <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
            <button
              onClick={() => setActiveTab('crop')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium ${
                activeTab === 'crop' 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-all`}
            >
              <Sprout className="h-5 w-5" />
              Crop Prediction
            </button>
            <button
              onClick={() => setActiveTab('fertilizer')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium ${
                activeTab === 'fertilizer' 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-all`}
            >
              <Droplets className="h-5 w-5" />
              Fertilizer Recommendation
            </button>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeTab === 'crop' ? 'Soil & Climate Parameters' : 'Crop & Soil Information'}
                </h2>
                <p className="text-sm text-gray-500">
                  {activeTab === 'crop' 
                    ? 'Enter your soil characteristics and local climate data' 
                    : 'Enter details about your crop and soil conditions'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {activeTab === 'crop' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (N)</label>
                        <input
                          type="number"
                          name="nitrogen"
                          value={formData.nitrogen}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="0-150 kg/ha"
                          min="0"
                          max="150"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">0-150 kg/ha</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (P)</label>
                        <input
                          type="number"
                          name="phosphorus"
                          value={formData.phosphorus}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="0-150 kg/ha"
                          min="0"
                          max="150"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">0-150 kg/ha</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Potassium (K)</label>
                        <input
                          type="number"
                          name="potassium"
                          value={formData.potassium}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="0-150 kg/ha"
                          min="0"
                          max="150"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">0-150 kg/ha</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">pH Value</label>
                        <input
                          type="number"
                          name="ph"
                          value={formData.ph}
                          onChange={handleInputChange}
                          step="0.1"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="0-14"
                          min="0"
                          max="14"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">0-14</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                        <input
                          type="number"
                          name="temperature"
                          value={formData.temperature}
                          onChange={handleInputChange}
                          step="0.1"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="°C"
                          min="0"
                          max="50"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">°C</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Humidity</label>
                        <input
                          type="number"
                          name="humidity"
                          value={formData.humidity}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="%"
                          min="0"
                          max="100"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">%</p>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rainfall</label>
                        <input
                          type="number"
                          name="rainfall"
                          value={formData.rainfall}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="mm"
                          min="0"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">mm</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                        <input
                          type="number"
                          name="temperature"
                          value={formData.temperature}
                          onChange={handleInputChange}
                          step="0.1"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="°C"
                          min="0"
                          max="50"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">°C (0-50)</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Humidity</label>
                        <input
                          type="number"
                          name="humidity"
                          value={formData.humidity}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="%"
                          min="0"
                          max="100"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">% (0-100)</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Soil Moisture</label>
                        <input
                          type="number"
                          name="moisture"
                          value={formData.moisture}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="%"
                          min="0"
                          max="100"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">% (0-100)</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                        <select
                          name="soilType"
                          value={formData.soilType}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          required
                        >
                          {SOIL_TYPES.map(soil => (
                            <option key={soil} value={soil}>{soil}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                        <select
                          name="cropType"
                          value={formData.cropType}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          required
                        >
                          {CROP_TYPES.map(crop => (
                            <option key={crop} value={crop}>{crop}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (N)</label>
                        <input
                          type="number"
                          name="nitrogen"
                          value={formData.nitrogen}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="0-150 kg/ha"
                          min="0"
                          max="150"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">0-150 kg/ha</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (P)</label>
                        <input
                          type="number"
                          name="phosphorus"
                          value={formData.phosphorus}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="0-150 kg/ha"
                          min="0"
                          max="150"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">0-150 kg/ha</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Potassium (K)</label>
                        <input
                          type="number"
                          name="potassium"
                          value={formData.potassium}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="0-150 kg/ha"
                          min="0"
                          max="150"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">0-150 kg/ha</p>
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors mt-6 shadow-md hover:shadow-lg font-medium text-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      {activeTab === 'crop' ? 'Predict Best Crop' : 'Get Fertilizer Recommendation'}
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Prediction Results</h2>
                <p className="text-sm text-gray-500">
                  {activeTab === 'crop' 
                    ? 'Recommended crops based on your inputs' 
                    : 'Fertilizer recommendations for your crop'}
                </p>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  <p className="mt-4 text-gray-600">Analyzing your data...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    <h3 className="font-medium">Error</h3>
                  </div>
                  <p className="mt-2 text-red-600">{error}</p>
                  <button
                    onClick={() => setError('')}
                    className="mt-4 text-sm text-red-700 hover:text-red-900 font-medium"
                  >
                    Try again
                  </button>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  {activeTab === 'crop' ? (
                    <>
                      <div className="bg-green-50 border border-green-200 rounded-md p-4">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-5 w-5" />
                          <h3 className="font-medium">Recommended Crop</h3>
                        </div>
                        <p className="mt-2 text-2xl font-bold text-green-800">
                          {result.crop_prediction}
                        </p>
                        {result.confidence && (
                          <div className="mt-2">
                            <div className="flex justify-between text-sm text-green-700 mb-1">
                              <span>Confidence</span>
                              <span>{(result.confidence * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-green-100 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${result.confidence * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        {result.alternative_crops && result.alternative_crops.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm text-green-700">Alternative Crops:</p>
                            <p className="text-green-800">
                              {result.alternative_crops.join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                        <div className="flex items-center gap-2 text-blue-700">
                          <CheckCircle className="h-5 w-5" />
                          <h3 className="font-medium">Recommended Fertilizer</h3>
                        </div>
                        <p className="mt-2 text-2xl font-bold text-blue-800">
                          {result.fertilizer_prediction}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-blue-600">NPK Ratio</p>
                            <p className="font-medium text-blue-800">
                              {result.npk_ratio || 'Not specified'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-blue-600">Application Rate</p>
                            <p className="font-medium text-blue-800">
                              {result.application_rate || 'Not specified'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {result.recommendations && result.recommendations.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">•</span>
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <Sprout className="h-full w-full" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {activeTab === 'crop' ? 'No crop prediction yet' : 'No fertilizer recommendation yet'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {activeTab === 'crop' 
                      ? 'Enter your soil and climate data to get crop recommendations' 
                      : 'Enter your crop and soil information to get fertilizer recommendations'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
