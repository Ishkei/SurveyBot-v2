import { ReactComponent as ErrorGraphic } from "../assets/ErrorGraphic.svg";
import Txt from "./common/Txt";

const ErrorPage = () => {
  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="sub-page">
      <div className="sub-page-container">
        <ErrorGraphic />
        <div className="sub-page-info">
          <div>
            <Txt component="h2" className="sub-page-header">OOPS!</Txt>
            <div className="sub-page-text-container">
              <Txt component="p" className="bold">
                We’re sorry, but we seem to be experiencing a problem on our
                end.
              </Txt>
              <Txt component="p">
                If the problem persists feel free to contact us. In the
                meantime, please try again.
              </Txt>
            </div>
          </div>

          <button onClick={refresh} className="sub-page-primary-button">
            <Txt>Retry</Txt>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
