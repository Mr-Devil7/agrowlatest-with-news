import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Clock, TrendingUp, Lightbulb, ExternalLink } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  source: string;
  trending: boolean;
  url: string;
}

interface FarmingTip {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

const News: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [farmingTips, setFarmingTips] = useState<FarmingTip[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: t('news.categories.all'), icon: '📰' },
    { id: 'technology', name: t('news.categories.technology'), icon: '🚀' },
    { id: 'market', name: t('news.categories.market'), icon: '📈' },
    { id: 'weather', name: t('news.categories.weather'), icon: '🌤️' },
    { id: 'policy', name: t('news.categories.policy'), icon: '📋' },
    { id: 'sustainability', name: t('news.categories.sustainability'), icon: '🌱' }
  ];

  // Simulate fetching news data
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock news data with real URLs
      const mockNews: NewsArticle[] = [
        // Technology articles
        {
          id: '1',
          title: t('news.articles.0.title'),
          summary: t('news.articles.0.summary'),
          category: 'technology',
          date: new Date().toLocaleDateString(),
          readTime: '3 min',
          source: 'AgriTech Today',
          trending: true,
          url: 'https://www.fao.org/news/story/en/item/1395127/icode/'
        },
        {
          id: '2',
          title: t('news.articles.1.title'),
          summary: t('news.articles.1.summary'),
          category: 'technology',
          date: new Date(Date.now() - 86400000).toLocaleDateString(),
          readTime: '4 min',
          source: 'Tech Agriculture',
          trending: false,
          url: 'https://www.nature.com/articles/s41586-023-06394-7'
        },
        {
          id: '3',
          title: t('news.articles.2.title'),
          summary: t('news.articles.2.summary'),
          category: 'technology',
          date: new Date(Date.now() - 172800000).toLocaleDateString(),
          readTime: '5 min',
          source: 'Digital Farming',
          trending: true,
          url: 'https://www.sciencedirect.com/science/article/pii/S0308521X23000586'
        },
        // Market articles
        {
          id: '4',
          title: t('news.articles.3.title'),
          summary: t('news.articles.3.summary'),
          category: 'market',
          date: new Date(Date.now() - 259200000).toLocaleDateString(),
          readTime: '5 min',
          source: 'Farm Business Weekly',
          trending: false,
          url: 'https://www.worldbank.org/en/topic/agriculture/overview'
        },
        {
          id: '5',
          title: t('news.articles.4.title'),
          summary: t('news.articles.4.summary'),
          category: 'market',
          date: new Date(Date.now() - 345600000).toLocaleDateString(),
          readTime: '6 min',
          source: 'Agricultural Markets',
          trending: true,
          url: 'https://www.oecd.org/agriculture/topics/agricultural-trade/'
        },
        {
          id: '6',
          title: t('news.articles.5.title'),
          summary: t('news.articles.5.summary'),
          category: 'market',
          date: new Date(Date.now() - 432000000).toLocaleDateString(),
          readTime: '4 min',
          source: 'Commodity News',
          trending: false,
          url: 'https://www.reuters.com/business/agriculture/'
        },
        // Weather articles
        {
          id: '7',
          title: t('news.articles.6.title'),
          summary: t('news.articles.6.summary'),
          category: 'weather',
          date: new Date(Date.now() - 518400000).toLocaleDateString(),
          readTime: '2 min',
          source: 'Weather & Agriculture',
          trending: false,
          url: 'https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-5/'
        },
        {
          id: '8',
          title: t('news.articles.7.title'),
          summary: t('news.articles.7.summary'),
          category: 'weather',
          date: new Date(Date.now() - 604800000).toLocaleDateString(),
          readTime: '3 min',
          source: 'Climate Agriculture',
          trending: true,
          url: 'https://www.nature.com/articles/s41558-023-01661-8'
        },
        {
          id: '9',
          title: t('news.articles.8.title'),
          summary: t('news.articles.8.summary'),
          category: 'weather',
          date: new Date(Date.now() - 691200000).toLocaleDateString(),
          readTime: '4 min',
          source: 'Weather Impact',
          trending: false,
          url: 'https://www.fao.org/climate-change/en/'
        },
        // Policy articles
        {
          id: '10',
          title: t('news.articles.9.title'),
          summary: t('news.articles.9.summary'),
          category: 'policy',
          date: new Date(Date.now() - 777600000).toLocaleDateString(),
          readTime: '4 min',
          source: 'Agricultural Policy Review',
          trending: true,
          url: 'https://www.usda.gov/topics/farming/farm-bill'
        },
        {
          id: '11',
          title: t('news.articles.10.title'),
          summary: t('news.articles.10.summary'),
          category: 'policy',
          date: new Date(Date.now() - 864000000).toLocaleDateString(),
          readTime: '5 min',
          source: 'Policy Updates',
          trending: false,
          url: 'https://ec.europa.eu/info/food-farming-fisheries/key-policies/common-agricultural-policy_en'
        },
        {
          id: '12',
          title: t('news.articles.11.title'),
          summary: t('news.articles.11.summary'),
          category: 'policy',
          date: new Date(Date.now() - 950400000).toLocaleDateString(),
          readTime: '6 min',
          source: 'Government News',
          trending: false,
          url: 'https://www.wto.org/english/tratop_e/agric_e/agric_e.htm'
        },
        // Sustainability articles
        {
          id: '13',
          title: t('news.articles.12.title'),
          summary: t('news.articles.12.summary'),
          category: 'sustainability',
          date: new Date(Date.now() - 1036800000).toLocaleDateString(),
          readTime: '6 min',
          source: 'Green Farming Journal',
          trending: false,
          url: 'https://www.unep.org/explore-topics/food-systems'
        },
        {
          id: '14',
          title: t('news.articles.13.title'),
          summary: t('news.articles.13.summary'),
          category: 'sustainability',
          date: new Date(Date.now() - 1123200000).toLocaleDateString(),
          readTime: '5 min',
          source: 'Sustainable Agriculture',
          trending: true,
          url: 'https://www.nature.com/articles/s41893-023-01093-5'
        },
        {
          id: '15',
          title: t('news.articles.14.title'),
          summary: t('news.articles.14.summary'),
          category: 'sustainability',
          date: new Date(Date.now() - 1209600000).toLocaleDateString(),
          readTime: '4 min',
          source: 'Eco Farming',
          trending: false,
          url: 'https://www.sciencedirect.com/science/article/pii/S0959652623008289'
        }
      ];

      const mockTips: FarmingTip[] = [
        {
          id: '1',
          title: t('news.tips.0.title'),
          description: t('news.tips.0.description'),
          category: 'irrigation',
          icon: '💧'
        },
        {
          id: '2',
          title: t('news.tips.1.title'),
          description: t('news.tips.1.description'),
          category: 'pest_control',
          icon: '🛡️'
        },
        {
          id: '3',
          title: t('news.tips.2.title'),
          description: t('news.tips.2.description'),
          category: 'soil_health',
          icon: '🌱'
        },
        {
          id: '4',
          title: t('news.tips.3.title'),
          description: t('news.tips.3.description'),
          category: 'harvest',
          icon: '🌾'
        }
      ];

      setNewsArticles(mockNews);
      setFarmingTips(mockTips);
      setLoading(false);
    };

    fetchNews();
  }, [t]);

  const filteredNews = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      technology: '🚀',
      market: '📈',
      weather: '🌤️',
      policy: '📋',
      sustainability: '🌱'
    };
    return categoryMap[category] || '📰';
  };

  const handleArticleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <section className="py-20 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text/70">{t('news.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t('news.title')}</h1>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            {t('news.description')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-text hover:bg-accent/20 border border-gray-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News Articles */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary">{t('news.latest_news')}</h2>
              <span className="text-sm text-text/60">
                {t('news.showing_articles').replace('{count}', filteredNews.length.toString())}
              </span>
            </div>

            <div className="space-y-6">
              {filteredNews.map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => handleArticleClick(article.url)}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:border-primary/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getCategoryIcon(article.category)}</span>
                      <div>
                        <span className="text-sm font-medium text-primary capitalize">
                          {categories.find(cat => cat.id === article.category)?.name}
                        </span>
                        {article.trending && (
                          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/20 text-primary">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {t('news.trending')}
                          </span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 text-text/40" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary mb-3 hover:text-primary-dark">
                    {article.title}
                  </h3>
                  
                  <p className="text-text/70 mb-4 leading-relaxed">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-text/60">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <span className="font-medium">{article.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Farming Tips Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                <Lightbulb className="h-6 w-6 mr-2" />
                {t('news.farming_tips')}
              </h2>
              
              <div className="space-y-4">
                {farmingTips.map((tip) => (
                  <div key={tip.id} className="bg-gradient-to-r from-accent/20 to-primary/10 rounded-xl p-6 border border-accent/30">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <div>
                        <h3 className="font-bold text-primary mb-2">{tip.title}</h3>
                        <p className="text-text/70 text-sm leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;