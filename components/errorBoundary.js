"use client";

import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
              {this.props.locale === "es"
                ? "Algo salió mal"
                : "Quelque chose s'est mal passé"}
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {this.props.locale === "es"
                ? "Por favor, intenta recargar la página."
                : "Veuillez essayer de recharger la page."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
              {this.props.locale === "es" ? "Recargar" : "Recharger"}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
