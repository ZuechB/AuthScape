import Router from 'next/router';
import GA4React from 'ga-4-react';

let ga4react;

export async function init(G) {
  if (!GA4React.isInitialized() && G && process.browser) {
    ga4react = new GA4React(G, { debug_mode: !process.env.production });

    try {
      await ga4react.initialize();

      logPageViews();
    } catch (error) {
      console.error(error);
    }
  }
}

export function logPageView() {
  if (ga4react != null)
  {
    ga4react.pageview(window.location.pathname);
  }

  if (process.env.databaseAnalytics)
  {
    const executePageView = async () => {
      try {
        await apiService().post("/PageContent/PageView", {
          Uri: window.location.pathname + window.location.search,
          Referral: document.referrer,
          host: window.location.host
        });
      }
      catch(e) { }
    }
    executePageView();
  }
}

export function logPageViews() {
  if (ga4react != null)
  {
    logPageView();

    Router.events.on('routeChangeComplete', () => {
      logPageView();
    });
  }
}

export function logEvent(category, action, label) {
  //if (ga4react != null)
  //{
    ga4react.event(action, label, category);
  //}

  if (process.env.databaseAnalytics)
  {
    const executePageEvent = async () => {
      try {
        await apiService().post("/PageContent/PageEvent", {
            Category: category,
            Action: action,
            label: label,
            host: window.location.host,
            Uri: window.location.pathname + window.location.search
        });
      }
      catch(e) { }
    }
    executePageEvent();
  }
}

export function logPurchase(transactionId, amount, tax, items) {
  if (ga4react != null)
  {
    ga4react.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: amount,
      tax: tax,
      currency: "USD",
      items: items
    });
  }
}

export function logConvertion(transactionId, amount, tax, items) {
  if (ga4react != null)
  {
    ga4react.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: amount,
      tax: tax,
      currency: "USD",
      items: items
    });
  }
}

export function ConversionEvents(conversionName, payload) {
  if (ga4react != null)
  {
    ga4react.gtag("event", conversionName, payload);
  }
}