import ChatBox from "../ChatBox";

const Demo = () => {
  return (
    <div className="flex flex-col w-full items-center md:p-24" id="demo">
      <div className="flex flex-col items-center text-center gap-4 mb-16">
        <span className="text-blue-500 font-extrabold text-lg">
          Experience our Chatbot
        </span>
        <h1 className="text-3xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-bold py-4 max-w-5xl">
          Try It Out Here
        </h1>
      </div>

      <ChatBox />
    </div>
  );
};

export default Demo;
