import ChatBox from "@/components/ChatBox";
import ChatBoxGradio from "@/components/ChatBoxGradio";
import ChatBoxStream from "@/components/ChatBoxStream";

function page() {
  return (
    <div className="flex flex-col w-full items-center md:p-10">
      <div className="flex flex-col items-center text-center gap-4 mb-4">
        <h1 className="text-3xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-bold py-2 max-w-5xl">
          Try It Out Here
        </h1>
      </div>

      <div className="flex w-full justify-center">
        <div className="flex flex-col text-white w-full items-center font-bold">
          AIDA
          <ChatBox />
        </div>
        <div className="flex flex-col text-white w-full items-center font-bold">
          Streaming API
          <ChatBoxStream />
        </div>
        <div className="flex flex-col text-white w-full items-center font-bold">
          Gradio
          <ChatBoxGradio />
        </div>
      </div>
    </div>
  );
}

export default page;
