import { useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import Txt from "../common/Txt";
import Modal from "react-modal";
import "./ExitModal.scss";
import { ReactComponent as ExitHeaderIcon } from "../../assets/ExitHeaderIcon.svg";
import { ReactComponent as ExitHeaderIcon2 } from "../../assets/ExitHeaderIcon2.svg";
import { ReactComponent as ExitHeaderIcon3 } from "../../assets/ExitHeaderIcon3.svg";
import { ReactComponent as ExitHeaderIcon4 } from "../../assets/ExitHeaderIcon4.svg";
import { profilerFinishedUrl } from "../../utils/ProfilerFinishedRedirect";
import { RequestCtx } from "../../providers/RequestContext";

interface Props {
  visible: boolean;
  onCancel: () => void;
  questionCount?: number;
  percentage?: number;
}

interface SignUpExitInfoType {
  title: string;
  subtitle: string;
  continue_button_text: string;
  skip_button_text: string;
  image: ReactNode;
}

const SIGNUP_SURVEY_EXIT_MODAL: SignUpExitInfoType = {
  title: "You're about to skip the important part.",
  subtitle:
    "We can't find surveys suitable for you unless you tell us a bit more about yourself..",
  continue_button_text: "Ok, le’ts do this",
  skip_button_text: "Skip and complete later",
  image: <ExitHeaderIcon className="exit-header-icon" />,
};

interface EndlessExitInfoType {
  title: string;
  subtitle: string;
  continue_button_text: string;
  skip_button_text: string;
  min?: number;
  max?: number;
  image: ReactNode;
}

const ENDLESS_EXIT_MODALS: EndlessExitInfoType[] = [
  {
    title: "Done already?",
    subtitle:
      "Remember, the more we know about you the  less chances of screening out.",
    continue_button_text: "Ok, let's carry on",
    skip_button_text: "Close and complete later",
    min: 0,
    max: 8,
    image: <ExitHeaderIcon className="exit-header-icon" />,
  },
  {
    title: "Is this all for today?",
    subtitle:
      "Enhancing your profile with these question helps us tailor our survey selection for you..",
    continue_button_text: "Keep enhancing profile",
    skip_button_text: "Close and complete later",
    min: 8,
    max: 10,
    image: <ExitHeaderIcon2 className="exit-header-icon" />,
  },
  {
    title: "Finished already?",
    subtitle:
      "You’ve made great progress. Keep answering these questions for better survey success.",
    continue_button_text: "Answer a few more",
    skip_button_text: "Close and complete later",
    min: 10,
    max: 12,
    image: <ExitHeaderIcon3 className="exit-header-icon" />,
  },
  {
    title: "Every answer helps",
    subtitle:
      "A completed profile can provide a better success of survey completion.",
    continue_button_text: "Complete my profile",
    skip_button_text: "Close and complete later",
    min: 12,
    max: 100,
    image: <ExitHeaderIcon4 className="exit-header-icon" />,
  },
];

const ExitModal = ({ visible, onCancel, percentage }: Props) => {
  const {
    jwt,
    endlessProfiler,
    miniScreener,
    firstProfiler = false,
  } = useContext(RequestCtx);
  const [exitModalInfo, setExitModalInfo] = useState<
    SignUpExitInfoType | EndlessExitInfoType | undefined
  >();

  useEffect(() => {
    if (firstProfiler) {
      setExitModalInfo(SIGNUP_SURVEY_EXIT_MODAL);
    }

    console.log(percentage);

    if (!percentage) setExitModalInfo(ENDLESS_EXIT_MODALS[0]);

    for (let i = 0; i < ENDLESS_EXIT_MODALS.length; i++) {
      const exitModalInfo = ENDLESS_EXIT_MODALS[i];
      const { min, max } = exitModalInfo;
      if (typeof min === "undefined" || typeof max === "undefined") continue;

      if (percentage && min <= percentage && max > percentage) {
        setExitModalInfo(exitModalInfo);
        return;
      }
    }

    setExitModalInfo(ENDLESS_EXIT_MODALS[0])
  }, [endlessProfiler, miniScreener, firstProfiler, percentage]);

  const handleLeave = useCallback(() => {
    window.location.href = profilerFinishedUrl(jwt, "exited");
  }, [jwt]);

  useEffect(() => {
    if (visible && miniScreener === "true") {
      handleLeave();
    }
  }, [visible, miniScreener, handleLeave]);

  if (visible && miniScreener === "true") {
    return null;
  }

  return (
    <Modal
      isOpen={visible}
      className={`exit-modal-container`}
      overlayClassName={"exit-modal-background"}
      onRequestClose={onCancel}
    >
      <div className={`exit-modal`}>
        <div>
          <button
            onClick={onCancel}
            className="exit-close-button"
            title="close"
          >
            <CloseIcon />
          </button>
          {exitModalInfo?.image}
        </div>

        {exitModalInfo?.title && (
          <Txt component="h1" className="exit-title">
            {exitModalInfo?.title}
          </Txt>
        )}

        {exitModalInfo?.subtitle && (
          <Txt component="p">{exitModalInfo?.subtitle}</Txt>
        )}

        <button className="exit-options confirm-button" onClick={onCancel}>
          <Txt>
            {exitModalInfo?.continue_button_text || "Ok, let's do this"}
          </Txt>
        </button>
        <button className="exit-options skip-button" onClick={handleLeave}>
          <Txt>
            {exitModalInfo?.skip_button_text || "Skip and complete later"}
          </Txt>
        </button>
      </div>
    </Modal>
  );
};

export default ExitModal;
