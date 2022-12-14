import React, { useEffect } from "react";
import Comment from "../Comment/Comment";
import Post from "../Post/Post";
import "./Comments.css";
import {
  selectAllComments,
  loadComments,
  selectPostInfo,
} from "./CommentsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { urlHelper } from "../../utils/urlHelper";

function Comments() {
  const comments = useSelector(selectAllComments);
  const postInfo = useSelector(selectPostInfo);
  const { isLoading, hasError, error } = useSelector(
    (state) => state.allComments
  );
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    let url = urlHelper({ params });
    dispatch(loadComments(url));
  }, [dispatch, params]);

  if (isLoading) {
    return (
      <section id="comment-page" data-testid="comments">
        <span className="loader"></span>
      </section>
    );
  }

  if (hasError) {
    if (error === "404") {
      return <Redirect to="/page-not-found" />;
    } else
      return (
        <div className="all-posts-container" data-testid="comments">
          Something went wrong, try again later (code {error})
        </div>
      );
  }

  return (
    <section id="comment-page" data-testid="comments">
      <div id="comment-post">
        <Post
          subreddit={postInfo.subreddit_name_prefixed}
          title={postInfo.title}
          image={postInfo.url}
          num_comments={postInfo.num_comments}
          id={postInfo.id}
          votes={postInfo.ups}
          author={postInfo.author}
          post_hint={postInfo.post_hint}
          url={postInfo.url}
          video_src={postInfo.secure_media?.reddit_video?.fallback_url}
          comment_link={postInfo.permalink}
          isSinglePost={true}
          created={postInfo.created}
          isSelftext={postInfo.is_self}
          selftext={postInfo.selftext}
        />
      </div>

      <div className="comments-container">
        <h3>Comments</h3>
        {comments
          .filter((comment) => comment.data.author)
          .filter((comment) => comment.data.body)
          .map((comment) => (
            <Comment
              author={comment.data.author}
              body={comment.data.body}
              created={comment.data?.created}
              key={comment.data.id}
            />
          ))}
      </div>
    </section>
  );
}

export default Comments;