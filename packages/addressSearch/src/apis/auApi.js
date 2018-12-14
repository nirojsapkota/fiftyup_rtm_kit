import React from 'react';
import axios from 'axios';
import debounce from 'debounce-fn';
import isEqual from 'react-fast-compare';

const xml = `<?xml version='1.0' encoding='utf-16'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'  xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'>
    <soap:Body>
        <QASearch Language='' xmlns='http://www.qas.com/OnDemand-2011-03'>
            <Country>AUS</Country>
            <Engine Threshold='50' Timeout='10000'>Intuitive</Engine>
            <Layout>All Elements AUS</Layout>
            <Search>REPLACE_ME</Search>
        </QASearch>
    </soap:Body>
</soap:Envelope>`;

class Axios extends React.Component {
  state = {
    data: undefined,
    loading: false,
    error: false,
    moreChar: false,
  };

  cancelToken = null;

  makeNetworkRequest = debounce(() => {
    const { url, method = 'get', params, data } = this.props;

    axios
      .post(
        'http://9saver.develop:3000/address_autocomplete_au',
        xml.replace('REPLACE_ME', params.q),
        {
          headers: { 'Content-Type': 'text/xml', Accept: 'application/json' },
          cancelToken: new axios.CancelToken(token => {
            this.cancelToken = token;
          }),
        }
      )
      .then(res => {
        this.cancelToken = null;
        const pickList =
          res.data['Envelope']['Body']['QASearchResult']['QAPicklist'][
            'PicklistEntry'
          ];
        const toArray = pickList.hasOwnProperty('FullAddress');
        const entries = pickList;
        this.setState({
          data: {
            total_count: entries.length,
            items: toArray ? [entries] : entries,
          },
          loading: false,
          error: false,
        });
      })
      .catch(e => {
        // Early return if request was cancelled
        if (axios.isCancel(e)) {
          return;
        }
        this.setState({ data: undefined, error: e.message, loading: false });
        console.error(e);
      });
  }, 200);

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate({ children: _, ...prevProps }) {
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    if (this.cancelToken) {
      this.cancelToken();
    }
  }

  fetchData = () => {
    if (this.cancelToken) {
      this.cancelToken();
    }

    if (this.props.params.q.length < 5) {
      this.setState({ error: false, loading: false, moreChar: true });
    } else {
      this.setState({ error: false, loading: true, moreChar: false });
      this.makeNetworkRequest();
    }
  };

  render() {
    const { children } = this.props;
    const { data, loading, error, moreChar } = this.state;

    return children({
      data,
      loading,
      error,
      moreChar,
      refetch: this.fetchData,
    });
  }
}

export default Axios;
