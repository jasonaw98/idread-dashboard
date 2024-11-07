import { AnimatedBeamMultipleOutputDemo } from "../AnimatedBream";
import { TextAnimate } from "../ui/text-animate";

const Aida = () => {
  return (
    <div className="flex flex-col w-full items-center p-2 py-10 md:py-0 md:p-24" id="aida">
      <div className="flex flex-col items-center text-center gap-4">
        <span className="text-blue-500 font-extrabold md:text-lg">
          Digital Counter
        </span>
        <h1 className="text-3xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-bold py-4 max-w-5xl">
          Introducing AIDA
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-12">
        <div className="flex flex-col text-white justify-center items-center px-8">
          <div className="flex flex-col md:gap-7">
            <div className="flex items-center gap-12 md:gap-24">
              <span className="bg-clip-text bg-gradient-to-br from-green-300  to-blue-600 text-transparent text-3xl md:text-6xl font-black flex w-10 justify-center">
                A
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-2 text-3xl md:text-5xl font-bold">
                Artificial
              </span>
            </div>
            <div className="flex items-center gap-12 md:gap-24">
              <span className="bg-clip-text bg-gradient-to-br from-green-300  to-blue-600 text-transparent text-3xl md:text-6xl font-black flex w-10 justify-center">
                I
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-2 text-3xl md:text-5xl font-bold">
                Intelligence
              </span>
            </div>
            <div className="flex items-center gap-12 md:gap-24">
              <span className="bg-clip-text bg-gradient-to-br from-green-300  to-blue-600 text-transparent text-3xl md:text-6xl font-black flex w-10 justify-center">
                D
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-2 text-3xl md:text-5xl font-bold">
                Digital
              </span>
            </div>
            <div className="flex items-center gap-12 md:gap-24">
              <span className="bg-clip-text bg-gradient-to-br from-green-300  to-blue-600 text-transparent text-3xl md:text-6xl font-black flex w-10 justify-center">
                A
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-2 text-3xl md:text-5xl font-bold">
                Assistant
              </span>
            </div>
          </div>
        </div>

        <div className="w-full bg-transparent">
          <div className="w-full bg-transparent">
            <AnimatedBeamMultipleOutputDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aida;
