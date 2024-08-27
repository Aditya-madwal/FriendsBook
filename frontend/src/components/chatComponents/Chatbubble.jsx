import React, { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../MyContext";
import { IoMdClose } from "react-icons/io";

function Chatbubble(props) {
  const { me, setMe } = useContext(MyContext);
  const [imageFull, setImageFull] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="">
        {imageFull ? (
          <div>
            <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center  backdrop-blur-[5px]">
              <span className="flex items-start w-[90vw] justify-between">
                <div className="flex w-full justify-center">
                  <div
                    role="status"
                    className="p-2 bg-white border rounded-lg shadow-lg ">
                    <img
                      src={"http://127.0.0.1:8000" + props?.image}
                      alt="message image"
                      className="h-[90vh] rounded-lg"
                    />
                  </div>
                </div>
                <button
                  className="bg-black text-white p-2 rounded-full"
                  onClick={() => setImageFull(false)}>
                  <IoMdClose />
                </button>
              </span>
            </div>
          </div>
        ) : null}
        {me.username == props.name ? (
          <div className="chatblock flex w-full justify-end">
            <div className="flex items-start gap-2.5 mb-4 max-w-[60%]">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col w-fit leading-1.5 p-4 bg-blue-200 rounded-tl-xl rounded-br-xl rounded-bl-xl rounded-tr-none">
                  <div className="flex items-center space-x-2 justify-end mb-2">
                    <span className="text-sm font-normal text-gray-500">
                      {formatDate(props.timestamp)}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {props.name}
                    </span>
                  </div>
                  <p className="text-sm font-normal text-gray-900">
                    {props.content}
                  </p>
                  <div className="group relative my-2.5">
                    {props.image ? (
                      <button
                        onClick={() => {
                          setImageFull(true);
                        }}>
                        <img
                          src={"http://127.0.0.1:8000" + props?.image}
                          className="rounded-lg"
                        />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={"http://127.0.0.1:8000" + props?.pfp}
                  alt="Bonnie Green image"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="chatblock flex w-full justify-start">
            <div className="flex items-start gap-2.5 mb-4 max-w-[60%]">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={"http://127.0.0.1:8000" + props?.pfp}
                  alt="Bonnie Green image"
                />
              </div>
              <div className="flex flex-col gap-1 h-fit">
                <div className="flex flex-col w-fit leading-1.5 p-4 bg-white rounded-e-xl rounded-es-xl">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {props.name}
                    </span>
                    <span className="text-sm font-normal text-gray-500">
                      {formatDate(props.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm font-normal text-gray-900">
                    {props.content}
                  </p>
                  <div className="group relative my-2.5">
                    {props.image ? (
                      <button
                        onClick={() => {
                          setImageFull(true);
                        }}>
                        <img
                          src={"http://127.0.0.1:8000" + props?.image}
                          className="rounded-lg"
                        />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chatbubble;
