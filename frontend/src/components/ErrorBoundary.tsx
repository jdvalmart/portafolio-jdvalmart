import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 px-6">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">⚠</div>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              The page encountered an unexpected error. Try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
            >
              Reload page
            </button>
            {this.state.error && (
              <pre className="mt-6 text-left text-xs text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-lg overflow-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
