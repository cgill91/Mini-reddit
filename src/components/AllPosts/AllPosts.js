import React, { useEffect } from "react";
import "./AllPosts.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { loadPosts, selectFilteredAllPosts } from "./AllPostsSlice";
import Post from "../Post/Post";
import { urlHelper } from "../../utils/urlHelper";

function AllPosts() {
  const allPosts = useSelector(selectFilteredAllPosts);
  const { isLoading, hasError, error } = useSelector((state) => state.allPosts);

  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    let url = urlHelper({ params });
    dispatch(loadPosts(url));
  }, [dispatch, params]);

  if (isLoading) {
    return <span className="egg-loader"></span>;
  }

  if (hasError) {
    if (error === "404") {
      return <Redirect to="/page-not-found" />;
    } else
      return (
        <div className="all-posts-container">
          Something went wrong, try again later (code {error})
        </div>
      );
  }

  return (
    <div className="all-posts-container">
      {allPosts.map((post, index) => (
        <Post
          subreddit={post.data.subreddit_name_prefixed}
          title={post.data.title}
          image={post.data.url}
          num_comments={post.data.num_comments}
          id={post.data.id}
          votes={post.data.ups}
          author={post.data.author}
          post_hint={post.data.post_hint}
          url={post.data.url}
          video_src={post.data.secure_media?.reddit_video?.fallback_url}
          key={index}
          comment_link={post.data.permalink}
          created={post.data.created}
          isSinglePost={false}
          isSelftext={post.data.is_self}
          selftext={post.data.selftext}
        />
      ))}
    </div>
  );
}

export default AllPosts;