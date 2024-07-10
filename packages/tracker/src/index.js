/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
import React from 'react';
import PropTypes, { string } from 'prop-types';
import Google from './google';
import Facebook from './facebook';
import Funnel from './funnel';
import Twitter from './twitter';
import Bing from './bing';
import Tiktok from './tiktok';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const safeSendTo = (service, data) => {
  try {
    service.sendData(data);
  } catch (error) {
    console.log(error);
  }
};

export const track = (action, trackingData) => {
  const data = { ...trackingData, action };
  safeSendTo(Google, data);
  safeSendTo(Facebook, data);
  safeSendTo(Funnel, data);
  safeSendTo(Bing, data);
  safeSendTo(Tiktok, data);
  safeSendTo(Twitter, data);
};

const trackEvent = (e, action, trackingData, callback) => {
  track(action, trackingData);
  if (typeof callback === 'function') {
    callback(e);
  }
};

const TrackingContext = React.createContext({
  trackingData: {},
  trackEvent,
});

const mungeHref = url => {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.hostname}${parsedUrl.pathname.replace(/\//g, '---')}`;
  } catch (e) {
    // console.error(e);
  }
};

export const useTracker = () => {
  const { trackingData } = React.useContext(TrackingContext);
  return {
    trackEvent: (e, action, callback) => {
      let realAction = action;
      const aTag = e && e.target.closest('a');
      // If we don't receive an action, grab the href out of the
      // DOM node and clean it up so it can be sent as a virtual page view
      if (aTag && aTag.href && !action) {
        realAction = mungeHref(aTag.href);
        console.log(realAction);
      }
      trackEvent(e, realAction, trackingData, callback);
    },
  };
};

export const TrackingProvider = ({
  children,
  trackEventOverride,
  trackingData,
}) => {
  /* istanbul ignore next */
  const realTrackEvent = trackEventOverride || trackEvent;

  return (
    <TrackingContext.Provider
      value={{ trackingData, trackEvent: realTrackEvent }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

class TrackerRegistration extends React.Component {
  componentDidMount() {
    // Load ga config defaults
    let ga_config = document.createElement('script');
    ga_config.innerHTML = `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
    `;
    this.instance.appendChild(ga_config);

    const setupTrackings = () => {
      // Tiktok events
      window.tiktok_events_url = this.props.tiktok_events_url ||
        (window.current_entity &&
          window.current_entity.entity.tiktok_events_url);

      window.tiktok_pixel_id = this.props.tiktok_pixel_id ||
        (window.current_entity && window.current_entity.entity.tiktok_pixel_id);

      // Twitter Business Conversion tracking
      if (this.props.twitter_analytics_id) {
        let twitter_tracker = document.createElement('script');
        twitter_tracker.innerHTML = `!(function(e, t, n, s, u, a) {
          e.twq ||
            ((s = e.twq = function() {
              s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
            }),
            (s.version = '1.1'),
            (s.queue = []),
            (u = t.createElement(n)),
            (u.async = !0),
            (u.src = '//static.ads-twitter.com/uwt.js'),
            (a = t.getElementsByTagName(n)[0]),
            a.parentNode.insertBefore(u, a));
        })(window, document, 'script');
        twq('init', '${this.props.twitter_analytics_id}');`;
        this.instance.appendChild(twitter_tracker);
      }

      // Google Tag Manager
      if (this.props.google_tag_mgr_id) {
        let gtag_mgr = document.createElement('script');
        gtag_mgr.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${
          this.props.google_tag_mgr_id
        }');`;
        this.instance.appendChild(gtag_mgr);
      }

      // Google Optimize Code starts
      if (this.props.google_optimize_id) {
        let g_optimze = document.createElement('script');
        let c_css = document.createElement('style');
        c_css.innerHTML = `.async-hide {opacity: 0 !important}`;
        // Anti - flicker snippet(recommended)
        const g_optimze_html = `(function(a,s,y,n,c,h,i,d,e){s.className += ' ' + y;h.start=1*new Date;
        h.end=i=function(){s.className = s.className.replace(RegExp(' ?' + y), '')};
        (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
        })(window,document.documentElement,'async-hide','dataLayer',4000,
        {'${this.props.google_optimize_id}':true});`;
        g_optimze.innerHTML = g_optimze_html;
        this.instance.appendChild(g_optimze);
        let g_optimize_source = document.createElement('script');
        g_optimize_source.src = `https://www.googleoptimize.com/optimize.js?id=${
          this.props.google_optimize_id
        }`;
        g_optimize_source.setAttribute(
          'onerror',
          `dataLayer.hide.end && dataLayer.hide.end()`
        );

        this.instance.appendChild(c_css);
        this.instance.appendChild(g_optimize_source);
        // Google Optimize Code ends
      }

      //FOR UNIVERSAL GOOGLE ANALYTICS
      /* istanbul ignore next */
      if (this.props.universal_ga_code) {
        const googleAnalytics = document.createElement('script');
        googleAnalytics.type = 'text/javascript';
        googleAnalytics.innerHTML =
          "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
          '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),' +
          'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)' +
          "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');" +
          "ga('create', '" +
          `${this.props.universal_ga_code}` +
          "', 'auto');" +
          "ga('send', 'pageview');";
        this.instance.appendChild(googleAnalytics);
      }

      //FOR GA4
      if (this.props.ga_code) {
        const googleAnalytics = document.createElement('script');
        googleAnalytics.async = true;
        googleAnalytics.src = `https://www.googletagmanager.com/gtag/js?id=${
          this.props.ga_code
        }`;
        this.instance.appendChild(googleAnalytics);

        let universalConfig = '';
        if (this.props.universal_ga_code) {
          universalConfig =
            "gtag('config', '" + `${this.props.universal_ga_code}` + "')";
        }

        const googleAnalytics2 = document.createElement('script');
        googleAnalytics2.innerHTML =
          "gtag('js', new Date());" +
          "gtag('config', '" +
          `${this.props.ga_code}` +
          "');" +
          universalConfig;

        this.instance.appendChild(googleAnalytics2);
      }

      if (this.props.bing_uet_tag_code) {
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
      }

      if (this.props.google_adwords_id) {
        //FOR GOOGLE ADWORDS
        const adwords1 = document.createElement('script');
        adwords1.async = true;
        adwords1.src =
          "https://www.googletagmanager.com/gtag/js?id='" +
          `${this.props.google_adwords_id}` +
          "'";
        this.instance.appendChild(adwords1);
      }

      if (this.props.google_adwords_id) {
        const adwords2 = document.createElement('script');
        adwords2.innerHTML =
          "gtag('js', new Date());" +
          "gtag('config', '" +
          `${this.props.google_adwords_id}` +
          "');";
        this.instance.appendChild(adwords2);
      }

      if (this.props.fullstory_id) {
        const fullstory = document.createElement('script');
        fullstory.innerHTML = `
        window['_fs_host'] = 'fullstory.com';
        window['_fs_org'] = '${this.props.fullstory_id}';
        window['_fs_namespace'] = 'FS';
        (function(m,n,e,t,l,o,g,y){
            if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
            g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
            o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_host+'/s/fs.js';
            y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
            g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
            g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
            g.log = function(a,b) { g("log", [a,b]) };
            g.consent=function(a){g("consent",!arguments.length||a)};
            g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
            g.clearUserCookie=function(){};
        })(window,document,window['_fs_namespace'],'script','user');
      `;
        this.instance.appendChild(fullstory);
      }

      if (this.props.facebook_pixel_id) {
        //FOR FACEBOOK CONVERSION API
        window.facebook_pixel_id = this.props.facebook_pixel_id;
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
      }

      if (this.props.facebook_conversion_url) {
        window.facebook_conversion_url = this.props.facebook_conversion_url;
      }

      if (this.props.enable_trustpilot_js_script) {
        const tpilot = document.createElement('script');
        tpilot.type = 'text/javascript';
        tpilot.src =
          '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
        tpilot.async = true;
        this.instance.appendChild(tpilot);
      }

      if (this.props.zendesk_id) {
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
        zd2.defer = true;
        this.instance.appendChild(zd2);
      }

      if (this.props.sfmc_business_account_id) {
        // SalesForce Marketting Cloud Collect code
        const sfmc = document.createElement('script');
        let sfmc_script_html = `(function (n, i, r, o, j, s, p) {
        s = i.createElement(r),p = i.getElementsByTagName(r)[0];
        s.async = 1;s.src = o;p.parentNode.insertBefore(s, p);
        s.onload = s.onreadystatechange = function () {
        _etmc.push(['setOrgId', '${this.props.sfmc_business_account_id}']);`;
        if (this.props.user && this.props.user.email) {
          sfmc_script_html =
            sfmc_script_html +
            `_etmc.push(['setUserInfo', { 'email': '${
              this.props.user.email
            }' }]);`;
        }
        sfmc_script_html =
          sfmc_script_html +
          `_etmc.push(["updateItem",
          {
            "item_type": "content",
            "item": "${window.location.origin + window.location.pathname}",
            "url": "${window.location.href}",
            "available": "Y",
          },
        ]);`;
        sfmc_script_html =
          sfmc_script_html +
          `_etmc.push(['trackPageView', { "item" : "${window.location.origin +
            window.location
              .pathname}" }]);}})(window, document, 'script', 'https://${
            this.props.sfmc_business_account_id
          }.collect.igodigital.com/collect.js', '_etmc');`;
        sfmc.innerHTML = sfmc_script_html;
        this.instance.appendChild(sfmc);
      }

      if (this.props.outbrain_tracking_id) {
        // Outbrain Pixel tracking
        const outbrain = document.createElement('script');
        let outbrain_script_html = `
        !function(_window, _document) {
          const OB_ADV_ID = '${this.props.outbrain_tracking_id}';
          if (_window.obApi) {var toArray = function(object) {return Object.prototype.toString.call(object) === '[object Array]' ? object : [object];};
          _window.obApi.marketerId = toArray(_window.obApi.marketerId).concat(toArray(OB_ADV_ID));
          return;
          }
          var api = _window.obApi = function() {api.dispatch ? api.dispatch.apply(api, arguments) : api.queue.push(arguments);};
          api.version = '1.1';
          api.loaded = true;
          api.marketerId = OB_ADV_ID;
          api.queue = [];
          var tag = _document.createElement('script');
          tag.async = true;
          tag.src = '//amplify.outbrain.com/cp/obtp.js';
          tag.type = 'text/javascript';var script = _document.getElementsByTagName('script')[0];script.parentNode.insertBefore(tag, script);}(window, document);
          obApi('track', 'PAGE_VIEW');
        `;
        outbrain.innerHTML = outbrain_script_html;
        this.instance.appendChild(outbrain);
      }

      /* Jackmedia pixel */
      if (this.props.jackmedia_pixel_id) {
        const jackmedia_pixel = document.createElement('script');
        jackmedia_pixel.id = 'jackmedia_pixel';
        const jackmedia_pixel_html = `
        window._tfa = window._tfa || [];
        window._tfa.push({notify: 'event', name: 'page_view', id: ${
          this.props.jackmedia_pixel_id
        }});
        !function (t, f, a, x) {
        if (!document.getElementById(x)) {
        t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
        }
        }(document.createElement('script'),
        document.getElementsByTagName('script')[0],
        '//cdn.taboola.com/libtrc/unip/${this.props.jackmedia_pixel_id}/tfa.js',
        'tb_tfa_script');
      `;
        jackmedia_pixel.innerHTML = jackmedia_pixel_html;
        this.instance.appendChild(jackmedia_pixel);
      }
    };

    // When cookie consent option is enabled
    if (
      this.props.cookie_items &&
      this.props.cookie_items.enable_new_cookie_consent
    ) {
      // Load default consent
      let ga_consent_default = document.createElement('script');
      ga_consent_default.innerHTML = `
        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
        });
      `;
      this.instance.appendChild(ga_consent_default);

      if (
        (this.props.navigation_items &&
          this.props.navigation_items.user &&
          this.props.navigation_items.user.email) ||
        cookies.get('isUseCookie')
      ) {
        // Load consent granted for logged in users or users with cookie consent
        let ga_consent_granted = document.createElement('script');
        ga_consent_granted.innerHTML = `gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted'
        });`;
        this.instance.appendChild(ga_consent_granted);
        setupTrackings();
      } else {
        // Otherwise deny ga tracking
        let ga_consent_denied = document.createElement('script');
        ga_consent_denied.innerHTML = `gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
        });`;
        this.instance.appendChild(ga_consent_denied);
      }
    } else {
      setupTrackings();
    }
  }

  render() {
    return (
      <div data-testid="TrackingRegister" ref={el => (this.instance = el)} />
    );
  }
}

export { TrackerRegistration };

TrackingProvider.propTypes = {
  children: PropTypes.node,
};

TrackerRegistration.propTypes = {
  twitter_analytics_id: string,
  ga_code: PropTypes.string,
  bing_uet_tag_code: PropTypes.string,
  google_adwords_id: PropTypes.string,
  facebook_pixel_id: PropTypes.string,
  fullstory_id: PropTypes.string,
  zendesk_id: PropTypes.string,
  sfmc_business_account_id: PropTypes.string,
  facebook_conversion_url: PropTypes.string,
  tiktok_events_url: PropTypes.string,
};
