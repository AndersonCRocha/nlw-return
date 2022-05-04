import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../../ScreenshotButton";
import { FeedbackType, feedbackTypes } from "../feedback-types";

interface Props {
  feedbackType: FeedbackType;
  onStepOver: () => void;
  onStepComplete: () => void;
}

export function FeedbackFormStep({
  feedbackType,
  onStepOver,
  onStepComplete,
}: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");

  const { title, image } = feedbackTypes[feedbackType!];

  function handleSubmitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({ comment, screenshot });
    onStepComplete();
  }

  return (
    <>
      <header>
        <button
          type="button"
          onClick={onStepOver}
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={image.source} alt={image.alt} />
          {title}
        </span>

        <CloseButton />
      </header>

      <main className="flex py-8 gap-2 w-full">
        <form onSubmit={handleSubmitFeedback}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin "
            placeholder="Conte com detalhes o que está acontecendo..."
          />

          <footer className="flex gap-2 items-center mt-2">
            <ScreenshotButton
              screenshot={screenshot}
              onChangeScreenshot={setScreenshot}
            />

            <button
              type="submit"
              disabled={comment.length === 0}
              className="flex-1 p-2 rounded-md border-transparent bg-brand-500 hover:bg-brand-300 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 outline-none disabled:opacity-50 disabled:hover:bg-brand-500"
            >
              Enviar feedback
            </button>
          </footer>
        </form>
      </main>
    </>
  );
}
