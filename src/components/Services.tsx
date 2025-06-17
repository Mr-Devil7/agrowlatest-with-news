import React, { useState, useEffect, useContext } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { LanguageContext } from '../context/LanguageContext';

const Services: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [selectedCategory, setSelectedCategory] = useState<string>('Insecticides');
  
  const categories = [
    { id: 'Insecticides', name: t('services.categories.insecticides'), icon: '🛡️' },
    { id: 'Seeds', name: t('services.categories.seeds'), icon: '🌱' },
    { id: 'Fertilizers', name: t('services.categories.fertilizers'), icon: '🧪' },
    { id: 'Plants', name: t('services.categories.plants'), icon: '🌿' }
  ];

  // Listen for category change events from footer
  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      setSelectedCategory(event.detail);
    };

    window.addEventListener('setCategory', handleCategoryChange as EventListener);
    
    return () => {
      window.removeEventListener('setCategory', handleCategoryChange as EventListener);
    };
  }, []);

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  const getCategoryDescription = (categoryId: string) => {
    switch (categoryId) {
      case 'Insecticides':
        return t('services.category_descriptions.insecticides');
      case 'Seeds':
        return t('services.category_descriptions.seeds');
      case 'Fertilizers':
        return t('services.category_descriptions.fertilizers');
      case 'Plants':
        return t('services.category_descriptions.plants');
      default:
        return '';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">{t('services.title')}</h2>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            {t('services.description')}
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

        {/* Category Description */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-primary mb-2">
            {categories.find(cat => cat.id === selectedCategory)?.name}
          </h3>
          <p className="text-text/70">
            {getCategoryDescription(selectedCategory)}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Product Count */}
        <div className="text-center mt-8">
          <p className="text-text/60">
            {t('services.showing_products', { 
              count: filteredProducts.length, 
              category: categories.find(cat => cat.id === selectedCategory)?.name 
            })}
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">{t('services.cta.title')}</h3>
            <p className="text-white/90 mb-6 text-lg">
              {t('services.cta.description')}
            </p>
            <button 
              onClick={() => window.open('https://wa.me/918904959058', '_blank')}
              className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-accent/20 transition-colors"
            >
              {t('services.cta.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;