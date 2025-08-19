
import Txt from "../common/Txt";

interface Props {
  handleReject: () => void;
  handleAccept: () => void;
  handleClose: () => void;
}

const CookieDialog = ({ handleReject, handleAccept, handleClose }: Props) => (
  <div className="cookie-dialog">
    <div className="cookie-container">
      <div>
        <button className="close-page-x-button" onClick={handleClose}>
          <div className="mdiv">
            <div className="md"></div>
          </div>
        </button>
      </div>
      <div className="cookie-question">
        <Txt component="p" className="question-header" style={{ fontSize: "1.4em" }}>
          Enable Analytics Cookies?
        </Txt>
        <Txt component="p">
          These cookies help us understand how our website is being used and
          help us customize and improve our websites for you.
        </Txt>
      </div>
      <div className="cookie-buttons">
        <div className="button-container">
          <button className="accept-button" onClick={handleAccept}>
            <Txt>Accept</Txt>
          </button>
          <button className="reject-button" onClick={handleReject}>
            <Txt>Reject</Txt>
          </button>
        </div>
      </div>
    </div>
  </div>
);

CookieDialog.defaultProps = {
  handleReject: () => {},
  handleAccept: () => {},
  handleClose: () => {},
};

export default CookieDialog;
