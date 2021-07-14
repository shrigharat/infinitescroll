import React from "react";
import "./post.styles.css";

const Post = React.forwardRef((props, ref) => {
  const post = props.post;
  const [liked, setLiked] = React.useState(false);
  const [loved, setLoved] = React.useState(false);

  return (
    <div className="post" ref={ref}>
      <div className="post-title">{post.id + ". " + post.title}</div>
      <p className="post-body">{post.body}</p>
      <div className="interactions">
        <div
          className={`like ${liked? "active": ""}`}
          onClick={() => {
            if(loved) {
              setLoved(prev => !prev);
            }
            setLiked(prev => !prev);
          }}
        >
          <i className={`${liked? "fas fa-thumbs-up" : "far fa-thumbs-up"}`}></i>
        </div>
        <div
          className={`love ${loved? "active": ""}`}
          onClick={() => {
            if(liked) {
              setLiked(prev => !prev);
            }
            setLoved(prev => !prev);
          }}
        >
          <i className={`${loved? "fas fa-heart" : "far fa-heart"}`}></i>
        </div>
      </div>
    </div>
  );
});

export default Post;
