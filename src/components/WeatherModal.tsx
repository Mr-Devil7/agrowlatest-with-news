import React, { useContext, useState, useEffect } from 'react';
import { X, Cloud, Droplets, Wind, Eye, Gauge, Thermometer, Sun } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import { weatherService, WeatherData } from '../services/weatherService';

interface WeatherModalProps {
  onClose: () => void;
}

const WeatherModal: React.FC<WeatherModalProps> = ({ onClose }) => {
  const { t } = useContext(LanguageContext);
  const [selectedCity, setSelectedCity] = useState<'jaipur' | 'chennai'>('jaipur');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cities = [
    { id: 'jaipur' as const, name: 'Jaipur, Rajasthan', icon: '🏜️' },
    { id: 'chennai' as const, name: 'Chennai, Tamil Nadu', icon: '🌊' }
  ];

  useEffect(() => {
    fetchWeatherData();
  }, [selectedCity]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getWeatherData(selectedCity);
      setWeatherData(data);
    } catch (err) {
      setError(t('weather.error') as string);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    const iconClass = 'h-8 w-8';
    switch (condition) {
      case 'sunny':
        return <div className={`${iconClass} text-yellow-500`}>☀️</div>;
      case 'partly-cloudy':
        return <div className={`${iconClass} text-gray-500`}>⛅</div>;
      case 'rainy':
        return <div className={`${iconClass} text-blue-500`}>🌧️</div>;
      case 'cloudy':
        return <div className={`${iconClass} text-gray-600`}>☁️</div>;
      default:
        return <div className={`${iconClass} text-yellow-500`}>☀️</div>;
    }
  };

  const getTranslatedTips = (): string[] => {
    if (!weatherData) return [];
    
    const { temperature, humidity, windSpeed, condition } = weatherData;
    
    // Determine weather type and get translated tips
    if (temperature > 35) {
      return t('weather.tips.hot_weather') as string[];
    } else if (temperature < 15) {
      return t('weather.tips.cold_weather') as string[];
    } else if (condition.toLowerCase().includes('rain') || humidity > 80) {
      return t('weather.tips.rainy_weather') as string[];
    } else if (windSpeed > 20) {
      return t('weather.tips.windy_weather') as string[];
    } else if (humidity > 70) {
      return t('weather.tips.humid_weather') as string[];
    } else if (humidity < 30) {
      return t('weather.tips.dry_weather') as string[];
    }
    
    return t('weather.tips.hot_weather') as string[];
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in slide-in-from-top-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-secondary to-primary text-white">
          <div className="flex items-center space-x-3">
            <Cloud className="h-6 w-6" />
            <h2 className="text-xl font-bold">{t('weather.title')}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* City Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCity === city.id 
                    ? 'bg-secondary text-white shadow-lg' 
                    : 'bg-background text-text hover:bg-accent/20'
                }`}
              >
                {city.icon} {city.name}
              </button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-text/70">{t('weather.loading')}</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">⚠️</div>
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchWeatherData}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {weatherData && !loading && !error && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Current Weather */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-text mb-2">{weatherData.location}</h3>
                    <div className="text-4xl font-bold text-primary mb-2">{weatherData.temperature}°C</div>
                    <p className="text-text/70 font-medium mb-4">{weatherData.condition}</p>
                    
                    {/* Weather Details Grid - Reduced to 4 items */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/70 rounded-lg p-3 flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="text-secondary font-medium">{t('weather.humidity')}</div>
                          <div className="font-bold">{weatherData.humidity}%</div>
                        </div>
                      </div>
                      <div className="bg-white/70 rounded-lg p-3 flex items-center space-x-2">
                        <Wind className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="text-primary font-medium">{t('weather.wind_speed')}</div>
                          <div className="font-bold">{weatherData.windSpeed} km/h</div>
                        </div>
                      </div>
                      <div className="bg-white/70 rounded-lg p-3 flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-purple-500" />
                        <div>
                          <div className="text-secondary font-medium">{t('weather.visibility')}</div>
                          <div className="font-bold">{weatherData.visibility} km</div>
                        </div>
                      </div>
                      <div className="bg-white/70 rounded-lg p-3 flex items-center space-x-2">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        <div>
                          <div className="text-primary font-medium">{t('weather.uv_index')}</div>
                          <div className="font-bold">{weatherData.uvIndex}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-xs text-text/60">
                      {t('weather.last_updated')}: {weatherData.lastUpdated}
                    </div>
                  </div>
                </div>

                {/* 5-Day Forecast */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-primary mb-4">{t('weather.forecast')}</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="text-center p-3 rounded-lg hover:bg-accent/10 transition-colors">
                          <p className="font-semibold text-text mb-2 text-sm">{day.day}</p>
                          <div className="mb-2 flex justify-center">{getWeatherIcon(day.icon)}</div>
                          <div className="space-y-1">
                            <p className="text-lg font-bold text-primary">{day.high}°</p>
                            <p className="text-sm text-text/60">{day.low}°</p>
                          </div>
                          <p className="text-xs text-text/60 mt-1">{day.condition}</p>
                          <div className="mt-2 text-xs text-text/50">
                            <div className="flex items-center justify-center space-x-1">
                              <Droplets className="h-3 w-3" />
                              <span>{day.humidity.toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center justify-center space-x-1 mt-1">
                              <Wind className="h-3 w-3" />
                              <span>{day.windSpeed.toFixed(1)}km/h</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Farming Tips */}
              <div className="bg-gradient-to-r from-accent/20 to-primary/10 rounded-xl p-6">
                <h4 className="text-xl font-bold text-primary mb-4">{t('weather.farming_tips')}</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {getTranslatedTips().map((tip, index) => (
                    <div key={index} className="bg-white/80 rounded-lg p-4">
                      <p className="text-text text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherModal;