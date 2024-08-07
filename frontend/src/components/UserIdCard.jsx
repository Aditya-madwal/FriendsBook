import React from "react";

function UserIdCard(props) {
  return (
    <div>
      <span className="flex items-start gap-4 bg-gray-100 p-3 rounded-lg mb-4">
        <div className=" flex items-center h-full overflow-hidden rounded-full ">
          <img
            // src={"http://127.0.0.1:8000" + i.sender.pfp}
            src="https://images.unsplash.com/photo-1722756090869-8d74046e4989?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
            alt="pfp"
            className="size-20 rounded object-cover"
          />
        </div>
        <div className="w-[80%]">
          <h3 className="text-xl text-black font-semibold">
            {/* {i.sender.first_name} {i.sender.last_name} */}
            aditya madwal
          </h3>

          <dl className="mt-0.5 space-y-px text-md text-gray-600 font-medium">
            <div>
              {/* <dd className="inline">@{i.sender.username}</dd> */}
              <dd className="inline">@wkebdeb</dd>
            </div>
          </dl>
          <dl className="mt-0.5 space-y-px text-sm text-gray-600 font-medium">
            <div>
              {/* <dd className="inline">@{i.sender.username}</dd> */}
              <dd className="inline">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                cupiditate hic, rerum nisi consectetur quam voluptates at
                ducimus omnis odit sit debitis accusantium.
              </dd>
            </div>
          </dl>
        </div>
      </span>
    </div>
  );
}

export default UserIdCard;
