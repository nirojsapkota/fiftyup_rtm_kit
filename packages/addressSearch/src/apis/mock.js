import React from 'react';
import debounce from 'debounce-fn';
import isEqual from 'react-fast-compare';

class Axios extends React.Component {
  state = {
    data: undefined,
    loading: false,
    error: false,
    moreChar: false,
  };

  cancelToken = null;

  makeNetworkRequest = debounce(() => {
    const entries = [
      {
        id: 1,
        Picklist: '123 Main Street, Sydney, NSW 2000',
      },
    ];
    this.setState({
      data: {
        total_count: entries.length,
        items: entries,
      },
      loading: false,
      error: false,
    });
  });

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
