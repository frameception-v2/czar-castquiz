import { PurpleButton } from "~/components/ui/PurpleButton";

export default function StartFrame({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <img 
        src="/quiz-image.png" 
        alt="How well do you know my casts?" 
        className="rounded-lg border-2 border-purple-500"
      />
      <PurpleButton 
        onClick={() => onStart()}
        className="w-full py-4 text-xl"
      >
        Start Quiz
      </PurpleButton>
    </div>
  );
}
