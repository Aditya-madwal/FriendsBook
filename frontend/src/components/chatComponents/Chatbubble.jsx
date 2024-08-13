import React from "react";
import { useContext } from "react";
import { MyContext } from "../../MyContext";

function Chatbubble(props) {
  const { me, setMe } = useContext(MyContext);

  return (
    <div className="">
      {me.username == props.name ? (
        <div className="chatblock flex w-full justify-end">
          <div className="flex items-start gap-2.5 mb-4 max-w-[60%]">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col w-fit leading-1.5 p-4 bg-blue-200 rounded-tl-xl rounded-br-xl rounded-bl-xl rounded-tr-none">
                <div className="flex items-center space-x-2 justify-end mb-2">
                  <span className="text-sm font-normal text-gray-500">
                    {props.timestamp}
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
                    <img
                      src="https://images.unsplash.com/photo-1723145886817-1a2ee70a251b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="rounded-lg"
                    />
                  ) : null}
                </div>
                <span className="text-sm font-normal text-gray-500">
                  Delivered
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1723239406233-88c68024a4d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                src="https://images.unsplash.com/photo-1723239406233-88c68024a4d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Bonnie Green image"
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex flex-col w-fit leading-1.5 p-4 bg-white rounded-e-xl rounded-es-xl">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {props.name}
                  </span>
                  <span className="text-sm font-normal text-gray-500">
                    {props.timestamp}
                  </span>
                </div>
                <p className="text-sm font-normal text-gray-900">
                  {props.content}
                </p>
                <div className="group relative my-2.5">
                  {props.image ? (
                    <img
                      src="https://images.unsplash.com/photo-1723145886817-1a2ee70a251b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="rounded-lg"
                    />
                  ) : null}
                </div>
                <span className="text-sm font-normal text-gray-500">
                  Delivered
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbubble;
