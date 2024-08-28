// src/config/stripeConfig.js

// تكوين مظهر لنمط Stripe الافتراضي
export const appearanceStripe = {
    theme: 'stripe'
  };
  
  // تكوين مظهر لنمط Night
  export const appearanceNight = {
    theme: 'night'
  };
  
  // تكوين مظهر مخصص
  export const appearanceCustom = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0570de',         // اللون الأساسي
      colorBackground: '#ffffff',      // لون الخلفية
      colorText: '#30313d',            // لون النص
      colorDanger: '#df1b41',          // لون الخطر (مثلاً الأخطاء)
      fontFamily: 'Ideal Sans, system-ui, sans-serif', // الخط
      spacingUnit: '2px',              // وحدة التباعد
      borderRadius: '4px'              // نصف قطر الحدود
    }
  };
  