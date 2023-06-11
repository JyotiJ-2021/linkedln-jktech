import React, { useState } from "react";

const Comment = ({ postId, post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postLists = JSON.parse(localStorage.getItem("postlist"));

    for (let i = 0; i < postLists.length; i++) {
      if (postLists[i].id === postId) {
        const comm = {
          by: postLists[i].postedBy,
          comment: comment,
        };

        postLists[i].comments.push(comm);
      }
    }
    localStorage.setItem("postlist", JSON.stringify(postLists));
    setComment("");
    setComments(postLists);
    window.location.reload();
  };

  console.log(post);

  return (
    <div className="commentContainer">
      <div className="commentDiv">
        <div className="commentProfile"></div>
        <div className="commentInput">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
        </div>
      </div>
      {post &&
        post.comments.map((item, i) => {
          return (
            item.comment && (
              <div className="comments">
                <div className="commetorDetails">
                  <p>{item.comment}</p>
                </div>
                <div className="comment_content"></div>
              </div>
            )
          );
        })}
    </div>
  );
};

export default Comment;
