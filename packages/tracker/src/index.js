/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import LogRocket from 'logrocket';
import Google from './google';
import Facebook from './facebook';
import Funnel from './funnel';
import Bing from './bing';

const safeSendTo = (service, data) => {
  try {
    service.sendData(data);
  } catch (error) {
    LogRocket.captureException(error, {
      tags: {
        service,
      },
    });
  }
};

export const track = (action, trackingData) => {
  const data = { ...trackingData, action };

  console.log({ tracking: data });

  safeSendTo(Google, data);
  safeSendTo(Facebook, data);
  safeSendTo(Funnel, data);
  safeSendTo(Bing, data);
};

const trackEvent = trackingData => (action, callback) => {
  track(action, trackingData);
  if (typeof callback === 'function') {
    callback();
  }
};

const TrackingContext = React.createContext({
  trackingData: {},
  trackEvent,
});

export const useTracker = () => {
  const { trackingData } = React.useContext(TrackingContext);
  return {
    trackEvent: (e, action, callback) => {
      track(action, trackingData);
      if (callback) {
        callback(e);
      }
    },
  };
};

export const TrackingProvider = ({ children, trackingData }) => {
  return (
    <TrackingContext.Provider value={{ trackingData, trackEvent }}>
      {children}
    </TrackingContext.Provider>
  );
};

export const Tracker = props => {
  return (
    <TrackingContext.Consumer>
      {({ trackingData, trackEvent }) => {
        return props.render(trackEvent(trackingData));
      }}
    </TrackingContext.Consumer>
  );
};

class TrackerRegistration extends React.Component {
  componentDidMount() {
    //FOR GOOGLE ANALYTICS
    const googleAnalytics = document.createElement('script');
    googleAnalytics.type = 'text/javascript';
    googleAnalytics.innerHTML =
      "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
      '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),' +
      'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)' +
      "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');" +
      "ga('create', '" +
      `${this.props.ga_code}` +
      "', 'auto');" +
      "ga('send', 'pageview');";
    this.instance.appendChild(googleAnalytics);

    //FOR BING
    const bing = document.createElement('script');
    bing.type = 'text/javascript';
    bing.innerHTML =
      '(function (w, d, t, r, u) { ' +
      'var f, n, i;' +
      'w[u] = w[u] || [], f = function () {' +
      " var o = {ti: '" +
      `${this.props.bing_uet_tag_code}` +
      "'};" +
      ' o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")' +
      ' }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {' +
      ' var s = this.readyState;' +
      ' s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)' +
      '}, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)' +
      '})(window, document, "script", "//bat.bing.com/bat.js", "uetq");' +
      'window.uetq = window.uetq || [];' +
      " window.uetq.push ('event', 'pageview');";
    this.instance.appendChild(bing);

    //FOR GOOGLE ADWORDS
    const adwords1 = document.createElement('script');
    adwords1.async = true;
    adwords1.src =
      "https://www.googletagmanager.com/gtag/js?id='" +
      `${this.props.google_adwords_id}` +
      "'";
    this.instance.appendChild(adwords1);

    const adwords2 = document.createElement('script');
    adwords2.innerHTML =
      'window.dataLayer = window.dataLayer || [];' +
      'function gtag() {' +
      'dataLayer.push(arguments);' +
      '}' +
      "gtag('js', new Date());" +
      "gtag('config', '" +
      `${this.props.google_adwords_id}` +
      "');";
    this.instance.appendChild(adwords2);

    //FOR FACEBOOK PIXEL
    const fb1 = document.createElement('script');
    fb1.innerHTML =
      '!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?' +
      'n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;' +
      "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;" +
      't.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,' +
      "document,'script','https://connect.facebook.net/en_US/fbevents.js');" +
      "fbq('init', '" +
      `${this.props.facebook_pixel_id}` +
      "');" +
      "fbq('track', 'PageView');";
    this.instance.appendChild(fb1);

    const fb2 = document.createElement('noscript');
    const fbimage = document.createElement('img');
    fbimage.height = '1';
    fbimage.width = '1';
    fbimage.style = 'display:none';
    fbimage.src =
      'https://www.facebook.com/tr?id=' +
      `${this.props.facebook_pixel_id}` +
      '&amp;ev=PageView&amp;noscript=1';
    fb2.appendChild(fbimage);
    this.instance.appendChild(fb2);

    //FOR ZENDESK
    const zd1 = document.createElement('script');
    zd1.type = 'text/javascript';
    zd1.innerHTML =
      "window.zESettings = {webWidget: {contactOptions: { enabled: true, contactButton: { '*': 'Contact Button' }, chatLabelOnline: { '*': 'Live Chat' },    chatLabelOffline: { '*': 'Chat is unavailable' },  contactFormLabel: { '*': 'Leave us a message' } } } };";
    this.instance.appendChild(zd1);

    const zd2 = document.createElement('script');
    zd2.id = 'ze-snippet';
    zd2.src = `https://static.zdassets.com/ekr/snippet.js?key=${
      this.props.zendesk_id
      }`;
    this.instance.appendChild(zd2);

    // SalesForce Marketting Cloud Collect code
    const sfmc = document.createElement('script');
    let sfmc_script_html = `(function (n, i, r, o, j, s, p) {
      s = i.createElement(r),p = i.getElementsByTagName(r)[0];
      s.async = 1;s.src = o;p.parentNode.insertBefore(s, p);
      s.onload = s.onreadystatechange = function () {
      _etmc.push(['setOrgId', '${this.props.sfmc_business_account_id}']);`;
    if (this.props.user && this.props.user.email) {
      sfmc_script_html = sfmc_script_html + `_etmc.push(['setUserInfo', { 'email': '${this.props.user.email}' }]);`;
    };
    sfmc_script_html = sfmc_script_html + `_etmc.push(['trackPageView']);}})(window, document, 'script', 'https://${this.props.sfmc_business_account_id}.collect.igodigital.com/collect.js', '_etmc');`;
    sfmc.innerHTML = sfmc_script_html;
    this.instance.appendChild(sfmc);
  }

  render() {
    return (
      <div
        data-testid="TrackingRegister"
        ref={el => (this.instance = el)}
      />
    );
  }
}

export { TrackerRegistration };

Tracker.propTypes = {
  render: PropTypes.func,
};

TrackingProvider.propTypes = {
  children: PropTypes.node,
  trackingData: PropTypes.shape({ category: PropTypes.string.isRequired }),
};

TrackerRegistration.propTypes = {
  ga_code: PropTypes.string,
  bing_uet_tag_code: PropTypes.string,
  google_adwords_id: PropTypes.string,
  facebook_pixel_id: PropTypes.string,
  zendesk_id: PropTypes.string,
  sfmc_business_account_id: PropTypes.string
};
