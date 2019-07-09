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

export const TrackerRegistration = props => {
  
  return (<div data-testid="TrackingRegister" {...props} >
    
    <script>
      {
        `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', '${props.ga_code}', 'auto');
        ga('send', 'pageview');`
    }
    </script>

    <script>
      {
        `(function (w, d, t, r, u) {
          var f, n, i;
          w[u] = w[u] || [], f = function () {
            var o = {ti: '${props.bing_uet_tag_code}'};
            o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")
          }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {
            var s = this.readyState;
            s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
          }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)
        })(window, document, "script", "//bat.bing.com/bat.js", "uetq");
        window.uetq = window.uetq || [];
        window.uetq.push ('event', 'pageview');`
      }
    </script>
    
   
    <script async src={`https://www.googletagmanager.com/gtag/js?id='${props.google_adwords_id}'`}></script>
    <script>
      {
        `window.dataLayer = window.dataLayer || [];
        function gtag() {" dataLayer.push(arguments);"}
        gtag('js', new Date());
        gtag('config', '${props.google_adwords_id}');`
      }
    </script>

    <script type="text/javascript">
      {
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${props.facebook_pixel_id}');
        fbq('track', 'PageView');`
      }
    </script>
    <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${props.facebook_pixel_id}&amp;ev=PageView&amp;noscript=1" />` }} />

    <script type="text/javascript">
      {
        `window.zESettings = {
          webWidget: {
            contactOptions: {
              enabled: true,
            contactButton: { '*': 'Contact Button' },
            chatLabelOnline: { '*': 'Live Chat' },
            chatLabelOffline: { '*': 'Chat is unavailable' },
            contactFormLabel: { '*': 'Leave us a message' }
            }
          }
        };`
      }
    </script>
    <script id="ze-snippet" src={`https://static.zdassets.com/ekr/snippet.js?key='${props.zendesk_id}'`}></script>

  </div>)
  
};

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
  zendesk_id: PropTypes.string
};