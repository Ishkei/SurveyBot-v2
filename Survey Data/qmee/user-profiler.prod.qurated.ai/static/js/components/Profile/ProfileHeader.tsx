import { useState } from "react";
import { ReactComponent as ProfileHeaderImage } from "../../assets/ProfileHeaderImage.svg";
import Modal from "react-modal";
import "./ProfileHeader.scss";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import Txt from "../common/Txt";

const TellMeMorePopup = ({
  visible,
  closeModal,
}: {
  visible: boolean;
  closeModal: () => void;
}) => {
  return (
    <Modal
      isOpen={visible}
      className="question-modal-container"
      overlayClassName={"question-modal-background"}
      onRequestClose={closeModal}
    >
      <div className="tell-me-more-popup">
        <button
          onClick={closeModal}
          className="edit-modal-close-button"
          title="Close editing question"
        >
          <CloseIcon />
        </button>
        <div className="tell-me-more-image">
          <ProfileHeaderImage />
        </div>

        <div className="tell-me-more-text-container">
          <Txt component="p">
              A completed profile ensures you get relevant surveys and we only
              use this data to match you to surveys
          </Txt>

          <Txt component="p">
              It means students won’t be asked what it’s like to be a CEO or
              someone in London isn’t asked about life in New York
          </Txt>
        </div>
      </div>
    </Modal>
  );
};

const ProfileHeader = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="profile-header-container">
        <Txt component="h1" className="profile-header-title">Survey Matching Profile</Txt>
        <div className="profile-image">
          <ProfileHeaderImage />
        </div>
        <div className="profile-header-text">
          <h2>
            <Txt component="span">Boost your profile and match yourself to the best surveys.</Txt>
            <button
              className="tell-me-more-button"
              onClick={() => {
                setVisible(true);
              }}
            >
              <Txt>Why?</Txt>
            </button>
          </h2>
        </div>
      </div>
      <TellMeMorePopup visible={visible} closeModal={closeModal} />
    </>
  );
};

export default ProfileHeader;
