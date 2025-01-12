// comment.jsx
import React from "react";
import styles from "./comment.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
const Comment = (props) => {
  console.log("Comment.jsx/pospt: ", props);
  console.log("pospt.id: ", props.id);
  console.log(props.userImageUrl);
  return (
    <>
      <div className={styles.commentBox}>
        <div className={styles.arrow}>
          <img src="/img/arrow.png" alt="arrow" />
        </div>
        <div className={styles.comment}>
          <div className={styles.profile}>
            <img
              src={
                props.userImageUrl
                  ? props.userImageUrl
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              className={styles.profilePhoto}
              alt="profilePhoto"
            ></img>
          </div>
          <div className={styles.commentText}>
            <div className={styles.commentMenu}>
              <div className={styles.username}>{props.username}</div>
              {props.delete ? (
                <div>
                  <img
                    src="/img/trash.png"
                    alt="delete"
                    className={styles.delete}
                    onClick={() => {
                      const commentDelete = async () => {
                        console.log("props.id : ", props.id);
                        await axios
                          .get(`/api/comments/delete-comment/${props.id}`)
                          .then((response) => {
                            console.log("delete/response: ", response);
                            props.getRecomments();
                            props.getReviews();
                          })
                          .catch((error) => {
                            console.log("err: ", error);
                          })
                          .then(() => {});
                      };
                      commentDelete();
                    }}
                  />
                </div>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faFlag}
                    onClick={() => {
                      alert("댓글 신고가 완료 되었습니다.");
                    }}
                  />
                </>
              )}
            </div>
            {props.content}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
