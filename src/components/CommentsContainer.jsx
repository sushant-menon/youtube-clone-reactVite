import React from "react";

const commentData = [
  {
    name: "David Warner",
    text: "This is a test case, just to let you know.",
    reply: [],
  },
  {
    name: "Virat Kholi",
    text: "This is a test case, just to let you know.",
    reply: [],
  },
  {
    name: "Murlidharan",
    text: "This is a test case, just to let you know.",
    reply: [],
  },
];

const viewFun = view => {
  return view < 1000
    ? view
    : view > 1000 && view < 1000000
    ? (view / 1000).toFixed(0) + "K"
    : (view / 1000000).toFixed(1) + "M";
};

const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex mt-3 items-center space-x-1 bg-gray-200 rounded-md p-2">
      <img
        className="h-7 w-7"
        src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
        alt="user-icon"
      />
      <div>
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="pl-5 border-2 border-r-0 border-b-0 border-t-0 border-l-black ml-5">
        <Comment key={index} data={comment} />
        {/* <CommentList comments={comment.replies} /> */}
      </div>
    </div>
  ));
};

const CommentsContainer = ({ details }) => {
  return (
    <div className="m-2 ">
      <h1 className="flex space-x-1 font-bold">
        <p>{viewFun(details?.statistics?.commentCount)}</p>
        <p>Comments :</p>
      </h1>
      <CommentList comments={commentData} />
    </div>
  );
};

export default CommentsContainer;
