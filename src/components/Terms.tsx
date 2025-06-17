import React, { useContext } from 'react';
import { Shield, FileText, Users, AlertCircle } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const Terms: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const sections = [
    {
      icon: FileText,
      title: t('terms.sections.terms_of_service.title'),
      content: t('terms.sections.terms_of_service.content')
    },
    {
      icon: Shield,
      title: t('terms.sections.privacy_data.title'),
      content: t('terms.sections.privacy_data.content')
    },
    {
      icon: Users,
      title: t('terms.sections.user_responsibilities.title'),
      content: t('terms.sections.user_responsibilities.content')
    },
    {
      icon: AlertCircle,
      title: t('terms.sections.limitations.title'),
      content: t('terms.sections.limitations.content')
    }
  ];

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">{t('terms.title')}</h1>
          <p className="text-xl text-text/70">
            {t('terms.description')}
          </p>
          <p className="text-sm text-text/60 mt-2">
            {t('terms.last_updated')}
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-accent/20 p-3 rounded-lg mr-4">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {Array.isArray(section.content) ? (
                  section.content.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-text/70 leading-relaxed">
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="text-text/70 leading-relaxed">{section.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-accent/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">{t('terms.questions.title')}</h3>
          <p className="text-text/70 mb-6">
            {t('terms.questions.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@agrow.com"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              {t('terms.questions.email_legal')}
            </a>
            <a
              href="tel:+15551234567"
              className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-accent/20 transition-colors"
            >
              {t('terms.questions.call_support')}
            </a>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-text/60">
          <p>
            {t('terms.acknowledgment')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Terms;