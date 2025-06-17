// Weather service for fetching live weather data
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  feelsLike: number;
  uvIndex: number;
  lastUpdated: string;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface WeatherTips {
  hot_weather: string[];
  cold_weather: string[];
  rainy_weather: string[];
  windy_weather: string[];
  humid_weather: string[];
  dry_weather: string[];
}

class WeatherService {
  private readonly API_KEY = 'demo_key'; // In production, this would be a real API key
  private readonly BASE_URL = 'https://api.weatherapi.com/v1';
  
  // Cache for weather data to avoid excessive API calls
  private cache = new Map<string, { data: WeatherData; timestamp: number }>();
  private readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

  async getWeatherData(city: string): Promise<WeatherData> {
    const cacheKey = city.toLowerCase();
    const cached = this.cache.get(cacheKey);
    
    // Return cached data if it's still fresh
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      // In a real implementation, this would make an actual API call
      // For demo purposes, we'll simulate API responses with realistic data
      const weatherData = await this.simulateWeatherAPI(city);
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: weatherData,
        timestamp: Date.now()
      });
      
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  private async simulateWeatherAPI(city: string): Promise<WeatherData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const now = new Date();
    const locations = {
      'jaipur': {
        location: 'Jaipur, Rajasthan',
        baseTemp: 32,
        baseHumidity: 35,
        baseWind: 8,
        conditions: ['Sunny', 'Hot', 'Clear', 'Partly Cloudy']
      },
      'chennai': {
        location: 'Chennai, Tamil Nadu',
        baseTemp: 28,
        baseHumidity: 78,
        baseWind: 15,
        conditions: ['Partly Cloudy', 'Humid', 'Overcast', 'Light Rain']
      },
      'delhi': {
        location: 'Delhi, India',
        baseTemp: 30,
        baseHumidity: 45,
        baseWind: 10,
        conditions: ['Hazy', 'Sunny', 'Partly Cloudy', 'Clear']
      },
      'mumbai': {
        location: 'Mumbai, Maharashtra',
        baseTemp: 29,
        baseHumidity: 70,
        baseWind: 12,
        conditions: ['Humid', 'Partly Cloudy', 'Overcast', 'Light Rain']
      }
    };

    const locationKey = city.toLowerCase();
    const locationData = locations[locationKey as keyof typeof locations] || locations.delhi;
    
    // Add some randomness to make it feel more realistic
    const tempVariation = (Math.random() - 0.5) * 6; // ±3 degrees
    const humidityVariation = (Math.random() - 0.5) * 20; // ±10%
    const windVariation = (Math.random() - 0.5) * 8; // ±4 km/h
    
    const temperature = Math.round(locationData.baseTemp + tempVariation);
    const humidity = Math.max(0, Math.min(100, Math.round(locationData.baseHumidity + humidityVariation)));
    const windSpeed = Math.max(0, Math.round(locationData.baseWind + windVariation));
    
    const condition = locationData.conditions[Math.floor(Math.random() * locationData.conditions.length)];
    
    // Generate forecast for next 5 days
    const forecast: ForecastDay[] = [];
    const days = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri'];
    
    for (let i = 0; i < 5; i++) {
      const dayTempVariation = (Math.random() - 0.5) * 8;
      const dayHigh = Math.round(temperature + 3 + dayTempVariation);
      const dayLow = Math.round(temperature - 5 + dayTempVariation);
      const dayCondition = locationData.conditions[Math.floor(Math.random() * locationData.conditions.length)];
      
      forecast.push({
        day: days[i],
        high: dayHigh,
        low: dayLow,
        condition: dayCondition,
        icon: this.getWeatherIcon(dayCondition),
        humidity: Math.max(0, Math.min(100, humidity + (Math.random() - 0.5) * 20)),
        windSpeed: Math.max(0, windSpeed + (Math.random() - 0.5) * 6)
      });
    }

    return {
      location: locationData.location,
      temperature,
      condition,
      humidity,
      windSpeed,
      pressure: Math.round(1010 + (Math.random() - 0.5) * 20),
      visibility: Math.round(10 + (Math.random() - 0.5) * 10),
      feelsLike: Math.round(temperature + (humidity > 60 ? 3 : -1)),
      uvIndex: Math.round(Math.random() * 11),
      lastUpdated: now.toLocaleTimeString(),
      forecast
    };
  }

  private getWeatherIcon(condition: string): string {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return 'sunny';
    if (conditionLower.includes('cloud')) return 'partly-cloudy';
    if (conditionLower.includes('rain')) return 'rainy';
    if (conditionLower.includes('overcast') || conditionLower.includes('hazy')) return 'cloudy';
    return 'sunny';
  }

  getWeatherBasedTips(weatherData: WeatherData, language: string = 'en'): string[] {
    const { temperature, humidity, windSpeed, condition } = weatherData;
    
    // Determine weather type based on conditions
    let weatherType: keyof WeatherTips = 'hot_weather';
    
    if (temperature > 35) {
      weatherType = 'hot_weather';
    } else if (temperature < 15) {
      weatherType = 'cold_weather';
    } else if (condition.toLowerCase().includes('rain') || humidity > 80) {
      weatherType = 'rainy_weather';
    } else if (windSpeed > 20) {
      weatherType = 'windy_weather';
    } else if (humidity > 70) {
      weatherType = 'humid_weather';
    } else if (humidity < 30) {
      weatherType = 'dry_weather';
    }

    // Get tips based on language and weather type
    return this.getTipsByLanguageAndType(weatherType, language);
  }

  private getTipsByLanguageAndType(weatherType: keyof WeatherTips, language: string): string[] {
    // This would typically come from the translation files
    // For now, we'll return English tips and let the component handle translation
    const tips: WeatherTips = {
      hot_weather: [
        "Irrigate early morning or late evening to reduce water loss",
        "Provide shade for sensitive crops during peak sun hours",
        "Monitor soil moisture levels more frequently"
      ],
      cold_weather: [
        "Protect crops from frost using covers or mulching",
        "Reduce watering frequency as evaporation is lower",
        "Consider greenhouse cultivation for sensitive plants"
      ],
      rainy_weather: [
        "Ensure proper drainage to prevent waterlogging",
        "Monitor for fungal diseases due to high humidity",
        "Delay fertilizer application until weather clears"
      ],
      windy_weather: [
        "Secure tall plants and structures against strong winds",
        "Check irrigation systems for wind damage",
        "Consider windbreaks for exposed crops"
      ],
      humid_weather: [
        "Increase ventilation in greenhouses",
        "Monitor for pest and disease outbreaks",
        "Adjust watering schedule to prevent overwatering"
      ],
      dry_weather: [
        "Implement water conservation techniques",
        "Use mulching to retain soil moisture",
        "Consider drought-resistant crop varieties"
      ]
    };

    return tips[weatherType] || tips.hot_weather;
  }

  // Get weather data for multiple cities
  async getMultiCityWeather(cities: string[]): Promise<WeatherData[]> {
    const promises = cities.map(city => this.getWeatherData(city));
    return Promise.all(promises);
  }

  // Clear cache (useful for testing or manual refresh)
  clearCache(): void {
    this.cache.clear();
  }
}

export const weatherService = new WeatherService();