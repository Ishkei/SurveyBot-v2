import Txt from "../common/Txt";

interface Props {
  activeQuestion: any;
  onConfirm: () => void;
  loading: boolean;
  status?: string;
  isLastQuestion?: boolean;
}

const PrescreenerNextButton = ({
  onConfirm,
  loading,
  activeQuestion,
  status,
  isLastQuestion = false,
}: Props) => {
  const selected = activeQuestion?.answerKey?.split(/[,|]/)?.length || 0;

  const isMultiPunch =
    activeQuestion?.type === "multi_punch" && activeQuestion?.answerKey;
  const isChildQuestion =
    activeQuestion?.type === "children" && activeQuestion?.answerKey;

  return (
    <div
      className={`confirm-button-container ${
        status && !loading ? "valid-status" : "invalid-status"
      }`}
    >
      <button
        className={`confirm-button ${
          (loading || status !== "valid") && "disabled"
        }`}
        onClick={onConfirm}
        disabled={loading}
      >
        <>
          {loading ? (
            <Txt component="span">Loading...</Txt>
          ) : isLastQuestion ? (
            <Txt component="span">Finish</Txt>
          ) : (
            <Txt component="span">Confirm</Txt>
          )}{" "}
          {(isMultiPunch || isChildQuestion) && <span>({selected})</span>}
        </>
      </button>
    </div>
  );
};

export default PrescreenerNextButton;
