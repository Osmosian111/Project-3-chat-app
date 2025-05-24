import { useEffect, useRef, useState } from "react";

const App = () => {
  const [message, setMessage] = useState<string[]>(["hi there", "hi there"]);
  const wsRef = useRef<WebSocket>(new WebSocket(""))

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessage(m=>[...m, event.data]);
    };
    wsRef.current = ws
    ws.onopen = () => {
      ws.send(JSON.stringify({type:"join",payload:{roomId:"red"}}))
    }
  }, []);

  const handleClickSend = () => {
    const message = document.getElementById("message") as HTMLInputElement;

    wsRef.current.send(JSON.stringify({ type: "chat", payload: { message:message.value } }));
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-2/4 h-4/6 bg-black max-w-[350px] max-h-[600px] p-[2px] border-[1px] border-solid border-white rounded-lg">
        <div className="w-full h-full bg-gray-100 rounded-lg">
          <div className="w-full h-[7%]">
            <input
              type="text"
              placeholder="Room ID"
              className="w-[80%] h-full bg-white border border-slate-300 rounded-tl-lg placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
            <button className="bg-sky-500 hover:bg-sky-700 text-black h-full w-[20%] rounded-tr-lg">
              Join
            </button>
          </div>
          <div className="flex flex-col w-full h-[86%] border-t-[1px] border-b-[1px] border-solid border-black">
            {message.map((msg) => {
              return (
                <span className="flex justify-center mt-1 w-[150px] box-border bg-sky-500 text-black">
                  {msg}
                </span>
              );
            })}
          </div>
          <div className="w-full h-[7%]">
            <input
            id="message"
              type="text"
              placeholder="Message"
              className="w-[80%] h-full bg-white border border-slate-300 rounded-bl-lg placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
            <button
              className="bg-sky-500 hover:bg-sky-700 text-black h-full w-[20%] rounded-br-lg"
              onClick={handleClickSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
