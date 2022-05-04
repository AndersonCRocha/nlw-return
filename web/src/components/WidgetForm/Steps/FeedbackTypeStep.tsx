import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "../feedback-types";

interface Props {
  onChangeFeedbackType: (feedbackType: FeedbackType) => void;
}

export function FeedbackTypeStep({ onChangeFeedbackType }: Props) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>

        <CloseButton />
      </header>

      <main className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([type, { title, image }]) => (
          <button
            key={type}
            type="button"
            onClick={() => onChangeFeedbackType(type as FeedbackType)}
            className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 outline-none"
          >
            <img
              src={image.source}
              alt={image.alt}
              className="w-12 h-12 rounded-full"
            />

            <span className="text-zinc-400 text-center">{title}</span>
          </button>
        ))}
      </main>
    </>
  );
}
