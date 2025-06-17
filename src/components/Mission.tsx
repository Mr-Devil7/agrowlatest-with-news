import React, { useContext } from 'react';
import { Users, Shield, Smartphone, TrendingUp } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const Mission: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const values = [
    {
      icon: Users,
      title: t('mission.values.supporting_farmers.title'),
      description: t('mission.values.supporting_farmers.description')
    },
    {
      icon: Smartphone,
      title: t('mission.values.easy_access.title'),
      description: t('mission.values.easy_access.description')
    },
    {
      icon: Shield,
      title: t('mission.values.trusted_partnership.title'),
      description: t('mission.values.trusted_partnership.description')
    },
    {
      icon: TrendingUp,
      title: t('mission.values.smart_growth.title'),
      description: t('mission.values.smart_growth.description')
    }
  ];

  return (
    <section className="py-20 bg-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">{t('mission.title')}</h2>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            {t('mission.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-primary">
              {t('mission.subheading')}
            </h3>
            <p className="text-text/70 leading-relaxed">
              {t('mission.text1')}
            </p>
            <p className="text-text/70 leading-relaxed">
              {t('mission.text2')}
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/20">
              <h4 className="font-bold text-primary mb-2">{t('mission.community.title')}</h4>
              <p className="text-text/70">
                {t('mission.community.description')}
              </p>
            </div>
          </div>
          <div>
            <img
              src="/Mission.jpg"
              alt="Farmers Growing with Agrow"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow border border-gray-100">
              <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">{value.title}</h4>
              <p className="text-text/70">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;