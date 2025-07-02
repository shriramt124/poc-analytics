import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Typesense Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger">
            <h4>⚠️ Typesense Connection Error</h4>
            <p><strong>Error:</strong> {this.state.error?.message || 'Unknown error'}</p>
            <hr />
            <h5>Common Solutions:</h5>
            <ul>
              <li>Check your <code>.env</code> file has correct Typesense credentials</li>
              <li>Ensure the 'products' collection exists in your Typesense instance</li>
              <li>Verify your API keys are valid</li>
              <li>Run the indexer script: <code>npm run indexer</code></li>
            </ul>
            <button 
              className="btn btn-primary" 
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;