import React, { useContext } from 'react';
import { Sprout, Beaker, TreePine, ArrowRight } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

interface OfferingsProps {
  onNavigate: (section: string) => void;
}

const Offerings: React.FC<OfferingsProps> = ({ onNavigate }) => {
  const { t } = useContext(LanguageContext);

  const offerings = [
    {
      icon: Sprout,
      title: t('offerings.seeds.title'),
      description: t('offerings.seeds.description'),
      color: 'bg-accent/20 text-primary',
      hoverColor: 'group-hover:bg-accent/30'
    },
    {
      icon: Beaker,
      title: t('offerings.fertilizers.title'),
      description: t('offerings.fertilizers.description'),
      color: 'bg-secondary/20 text-secondary',
      hoverColor: 'group-hover:bg-secondary/30'
    },
    {
      icon: TreePine,
      title: t('offerings.plants.title'),
      description: t('offerings.plants.description'),
      color: 'bg-primary/20 text-primary',
      hoverColor: 'group-hover:bg-primary/30'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">{t('offerings.title')}</h2>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            {t('offerings.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {offerings.map((offering, index) => (
            <div
              key={index}
              onClick={() => onNavigate('services')}
              className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`${offering.color} ${offering.hoverColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300`}>
                <offering.icon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{offering.title}</h3>
              <p className="text-text/70 mb-6 leading-relaxed">{offering.description}</p>
              <div className="flex items-center justify-center text-primary font-medium group-hover:text-primary-dark transition-colors">
                <span>{t('offerings.explore_products')}</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">{t('offerings.cta.title')}</h3>
            <p className="text-white/90 mb-6 text-lg">
              {t('offerings.cta.description')}
            </p>
            <button
              onClick={() => onNavigate('services')}
              className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-accent/20 transition-colors inline-flex items-center space-x-2"
            >
              <span>{t('offerings.cta.button')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offerings;