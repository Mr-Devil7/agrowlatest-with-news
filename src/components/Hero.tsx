// src/components/Hero.tsx
import React, { useContext } from 'react';
import { ArrowRight, MessageCircle, Cloud, TrendingUp } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useContext(LanguageContext);

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-accent-light/20 to-primary-light/10 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
                {t('hero.headline')}
              </h1>
              <p className="text-xl text-text/80 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('services')}
                className="group bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-lg font-medium hover:from-primary-dark hover:to-primary transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>{t('hero.view_products')}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-medium hover:bg-secondary hover:text-white transition-all duration-200"
              >
                {t('hero.get_started')}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('hero.stats.happy_farmers')}
                </div>
                <div className="text-text/70">{t('hero.stats.happy_farmers_label')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('hero.stats.cost_savings')}
                </div>
                <div className="text-text/70">{t('hero.stats.cost_savings_label')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('hero.stats.support')}
                </div>
                <div className="text-text/70">{t('hero.stats.support_label')}</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/Hero.jpeg"
                alt="Modern Indian Agriculture"
                className="rounded-2xl shadow-2xl"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg z-20 border-l-4 border-primary">
              <div className="flex items-center space-x-3">
                <div className="bg-accent/20 p-2 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-text">{t('hero.cards.whatsapp_marketplace')}</div>
                  <div className="text-sm text-text/60">{t('hero.cards.whatsapp_marketplace_sub')}</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg z-20 border-l-4 border-secondary">
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/20 p-2 rounded-lg">
                  <Cloud className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="font-medium text-text">{t('hero.cards.real_time_weather')}</div>
                  <div className="text-sm text-text/60">{t('hero.cards.real_time_weather_sub')}</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-8 bg-white p-4 rounded-xl shadow-lg z-20 border-l-4 border-accent">
              <div className="flex items-center space-x-3">
                <div className="bg-accent/20 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-accent-dark" />
                </div>
                <div>
                  <div className="font-medium text-text">{t('hero.cards.smart_farming')}</div>
                  <div className="text-sm text-text/60">{t('hero.cards.smart_farming_sub')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;