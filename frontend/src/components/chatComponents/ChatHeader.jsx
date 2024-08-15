import React from "react";

function ChatHeader(props) {
  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <a className="block text-teal-600" href="#">
            <img
              class="w-10 h-10 rounded-full object-cover"
              src={"http://127.0.0.1:8000" + props.friend?.pfp}
              alt="Bonnie Green image"
            />
          </a>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <div className="flex items-center gap-2 text-sm">
                <a className="text-black text-xl font-semibold" href="#">
                  {props.friend?.username}
                </a>
              </div>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a
                  className="block rounded-md bg-blue-200 px-5 py-2.5 text-sm font-medium text-blue-400 transition hover:bg-blue-400 hover:text-blue-700"
                  href="#">
                  View User
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default ChatHeader;
