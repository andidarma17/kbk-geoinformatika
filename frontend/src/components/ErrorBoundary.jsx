import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error("Failed to render page:", error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        <div role="alert" className="max-w-6xl mx-auto px-6 md:px-8 py-16">
          <h1 className="text-2xl font-bold text-navy">Something went wrong</h1>
          <p className="mt-3 text-gray-600">This page could not be displayed. Please try again later.</p>
          <Link to="/" className="inline-block mt-4 text-navy font-semibold underline">Back to Home</Link>
        </div>
      );
    }
    return this.props.children;
  }
}
