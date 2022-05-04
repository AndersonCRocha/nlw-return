import { useState } from "react";
import { FeedbackType } from "./feedback-types";
import { FeedbackFormStep } from "./Steps/FeedbackFormStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>();
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep onClickNewFeedback={handleRestartFeedback} />
      ) : (
        <>
          {feedbackType ? (
            <FeedbackFormStep
              feedbackType={feedbackType}
              onStepOver={handleRestartFeedback}
              onStepComplete={() => setFeedbackSent(true)}
            />
          ) : (
            <FeedbackTypeStep onChangeFeedbackType={setFeedbackType} />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Desenvolvido com 🖤 por Anderson Rocha
      </footer>
    </div>
  );
}
