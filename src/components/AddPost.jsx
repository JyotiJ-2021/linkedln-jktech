import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DisplayPost from "./DisplayPost";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";

const AddPost = ({ size, open, setSize, setOpen, postList }) => {
  const [postText, setPostText] = useState();
  const [likes, setLikes] = useState();
  const [by, setBy] = useState();
  const [comment, setComment] = useState();

  const handleSubmit = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const posts = [
      {
        id: uuidv4(),
        postedBy: user.name,
        postText: postText,
        likes: likes,
        comments: [],
      },
    ];

    const newPostList = [...postList, posts].reverse();

    localStorage.setItem("postlist", JSON.stringify(newPostList));
  };
  return (
    <div>
      {open && (
        <>
          <div className="bg-blur"></div>{" "}
          <div className={"modal show"}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>What do you want to post?</Modal.Title>
                <i class="bi bi-x-circle" onClick={() => setOpen(false)}></i>
              </Modal.Header>

              <Modal.Body>
                <input
                  name="posttext"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Text"
                />
                <textarea
                  rows="4"
                  cols="50"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comment"
                ></textarea>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="primary" onClick={() => handleSubmit()}>
                  Post
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </>
      )}
      <div className="viewPost">
        {postList !== null ? (
          <DisplayPost postList={postList} />
        ) : (
          "There are no articles"
        )}
      </div>
    </div>
  );
};

export default AddPost;
