import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError();
    }
    // FIXME: Log this somewhere
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>We're sorry, something went wrong. Please try again.</div>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
