import React from "react";

function ChatHeader() {
  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <a className="block text-teal-600" href="#">
            <img
              class="w-10 h-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1723239406233-88c68024a4d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Bonnie Green image"
            />
          </a>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <div className="flex items-center gap-2 text-sm">
                <a className="text-black text-xl font-semibold" href="#">
                  {" "}
                  Aditya Madwal{" "}
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
