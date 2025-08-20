import { ErrorInfo, ReactNode, Component, Suspense } from "react";
import { airbrake } from "./services/Airbrake";
import LoadingPage from "./components/common/LoadingPage";
import ErrorPage from "./components/ErrorPage";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (airbrake) {
      console.log("Error occurred in Error boundary: ", errorInfo, error.message);
      console.error(error);

      airbrake.notify({
        error: error,
        params: { info: errorInfo },
      });
    }
  }

  render() {
    return this.state.hasError ? (
      <Suspense fallback={<LoadingPage />}>
        <ErrorPage />
      </Suspense>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
