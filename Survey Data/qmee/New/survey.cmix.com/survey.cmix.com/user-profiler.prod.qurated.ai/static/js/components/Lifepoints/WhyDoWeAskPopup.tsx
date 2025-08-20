import Txt from "../common/Txt";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onLeave: () => void;
  className?: string;
}

const WhyDoWeAskPopup = ({ visible, onCancel, onLeave, className }: Props) => {
  const handleLeave = () => {
    onLeave();
    onCancel();
  };

  return (
    <Modal
      isOpen={visible}
      className={`exit-modal-container`}
      overlayClassName={`exit-modal-background ${className}`}
      onRequestClose={() => {
        onCancel();
      }}
    >
      <div className={`exit-modal`}>
        <button onClick={onCancel} className="exit-close-button" title="close">
          <CloseIcon />
        </button>

        <Txt component="h1" className="exit-title">
          Why is completing your profile so important?
        </Txt>

        <Txt component="p">
          To make sure we bring you surveys that are meant for you, we need to get to know you a little better with just some questions.
        </Txt>
        <Txt component="p" style={{ fontWeight: 600 }} className="bold-text">
          Why do you need to ask me questions to show me surveys?
        </Txt>

        <Txt component="p">
          Brands may have different questions to ask people from different walks
          of life. We want to make sure you're only invited to surveys that are
          meant for you, so we minimise the chances of you starting a survey
          only to get screened out.
        </Txt>

        <button className="exit-options confirm-button" onClick={onCancel}>
          <Txt>Match me to surveys</Txt>
        </button>
        <button className="exit-options skip-button" onClick={handleLeave}>
          <Txt>Skip and complete later</Txt>
        </button>
      </div>
    </Modal>
  );
};

export default WhyDoWeAskPopup;
