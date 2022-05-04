import { ArrowLeft, CircleNotch } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../../../services/api";
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
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const { title, image } = feedbackTypes[feedbackType!];

  async function handleSubmitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    await api.post("/feedbacks", {
      type: feedbackType,
      comment,
      screenshot,
    });

    setIsLoading(false);
    onStepComplete();
  }

  if (isLoading) {
    return (
      <div className="relative p-10 w-full">
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
          <CircleNotch
            weight="bold"
            className="w-8 h-8 animate-spin text-brand-500"
          />
        </div>
      </div>
    );
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
