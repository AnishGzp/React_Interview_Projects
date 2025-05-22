import { useState } from "react";

interface FormValidationProps {
  handleClick: (url: string) => void;
}

interface StepProps {
  step: number;
}

export function Step({ step }: StepProps) {
  switch (step) {
    case 1:
      return (
        <div className="w-full flex flex-col gap-5">
          <div className="text-blue-400">Step-{step}/3</div>
          <div className="">
            <div className="font-bold text-xl mb-3">
              Enter your Name and Email to begin!
            </div>
            <div className="">
              This is a form for a feedback no email and other details will be
              saved
            </div>
          </div>
          <div className="">
            <div className="text-[14px] font-semibold mb-2">Name</div>
            <input
              className="w-full px-2 py-3 bg-slate-300 rounded-xl"
              type="text"
              placeholder="Full name"
            />
          </div>
          <div className="">
            <div className="text-[14px] font-semibold mb-2">Email</div>
            <input
              className="w-full px-2 py-3 bg-slate-300 rounded-xl"
              type="email"
              placeholder="Your Email"
            />
          </div>
          <div className="">
            <div className="text-[14px] font-semibold mb-2">Message</div>
            <textarea
              className="w-full px-2 py-3 bg-slate-300 rounded-xl"
              placeholder="Your Message"
            />
          </div>
        </div>
      );
      break;

    case 2:
      return <div className="">bye</div>;
      break;
  }
}

export default function FormValidation({ handleClick }: FormValidationProps) {
  const [width, setWidth] = useState(30);
  const [step, setStep] = useState(1);

  const handlePreviousClick = () => {
    if (step === 1) return;
    setStep((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (step === 3) return;
    setStep((prev) => prev + 1);
  };
  return (
    <>
      <div className="p-4 min-h-dvh max-w-[1200px] mx-auto">
        <div>
          <button
            className="bg-blue-400 px-5 py-2 rounded-2xl w-fit text-white hover:-translate-y-1 hover:cursor-pointer transition-all"
            onClick={() => handleClick("/")}
          >
            Home
          </button>
        </div>

        <div className="w-full ">
          <div className="flex mx-auto flex-col justify-center items-center gap-4 max-w-[600px] p-3 shadow-2xl">
            <h3>Multistep Form</h3>
            <h1 className="lg:text-4xl font-bold">
              Give us your{" "}
              <span className="bg-blue-400 px-2 text-white rounded-b-2xl">
                feedback
              </span>
            </h1>
            <div className="w-full">
              <div className={`bg-blue-400 w-[${width}%] h-[10px]`}></div>
            </div>
            <div className="w-full">
              <Step step={step} />
              <div className="mt-2 flex gap-4">
                {step !== 1 ? (
                  <button
                    className="bg-blue-400 text-white px-5 py-2 rounded-[8px]"
                    onClick={handlePreviousClick}
                  >
                    Previous
                  </button>
                ) : null}
                <button
                  className="bg-blue-400 text-white px-5 py-2 rounded-[8px]"
                  onClick={handleNextClick}
                >
                  {step === 3 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
