import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import Txt from "../common/Txt";
import Modal from "react-modal";

interface Props {
  visible: boolean;
  onCancel: () => void;
  questionCount?: number;
  onLeave?: () => void;
  className?: string;
}

const LifepointsLandingExitModal = ({ visible, onCancel, onLeave, className }: Props) => {
  return (
    <Modal
      isOpen={visible}
      className="exit-modal-container"
      overlayClassName={`exit-modal-background ${className}`}
      onRequestClose={onCancel}
    >
      <div className="exit-modal">
        <div>
          <button
            onClick={onCancel}
            className="exit-close-button"
            title="close"
          >
            <CloseIcon />
          </button>
        </div>

        <Txt component="h1" className="exit-title">
          You're about to skip the important part.
        </Txt>

        <Txt component="p">
          We can't find surveys suitable for you unless you tell us a bit more
          about yourself.
        </Txt>

        <button className="exit-options confirm-button" onClick={onCancel}>
          <Txt>Ok, let's continue</Txt>
        </button>
        <button className="exit-options skip-button" onClick={onLeave}>
          <Txt>Skip and complete later</Txt>
        </button>
      </div>
    </Modal>
  );
};

export default LifepointsLandingExitModal;
