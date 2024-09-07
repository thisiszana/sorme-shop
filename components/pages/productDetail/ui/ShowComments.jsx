"use client"

import { icons } from "@/constants";
import { Drawer } from "antd";
import moment from "moment";
import { useState } from "react";

export default function ShowComments({comments}) {
  const [showComments, setShowComments] = useState(false);

  const closeDrawer = () => {
    setShowComments(false);
  };

  return (
    <>
      <button
        onClick={() => setShowComments(true)}
        className="flex items-center gap-2 bg-gray-100 rounded-xl py-2 px-4"
      >
        <div className="iconSize">{icons.paper}</div>
        <p className="subtitle">Show Comments</p>
      </button>
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <p>{comments.length} Comments</p>
            <button type="button" onClick={() => closeDrawer()}>
              {icons.close}
            </button>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={showComments}
        closeIcon={false}
      >
        <div className="space-y-5">
          {comments.map((c, i) => (
            <div key={c._id} className="cardShadow py-3 px-5 rounded-lg">
              <div className="flex gap-3">
                <div className="bg-gray-100 rounded-full flex items-center justify-center w-[45px] h-[45px] iconSize">
                  {icons.user}
                </div>
                <div>
                  <p className="font-medium">
                    {c.senderId.displayName || c.senderId.username}
                  </p>
                  <div className="flex items-center gap-2">
                    <div>{icons.clock}</div>
                    <p className="text-[12px] text-gray-400">
                      {moment(c.createdAt).subtract(10, "days").calendar()}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="subheader">{c.title}</h1>
                <p className="subtitle">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  )
}
