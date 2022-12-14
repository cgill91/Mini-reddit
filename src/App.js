import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import Comments from "./components/Comments/Comments";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  return (
    <div data-testid="main">
      <Header />
      <div id="main">
        <Switch>
          <Route path={"/page-not-found"}>
            <PageNotFound />
          </Route>
          <Route path={"/r/:subreddit/comments/:id/:title"}>
            <Comments />
          </Route>
          <Route path={"/r/:subreddit/:filter"}>
            <Feed />
          </Route>
          <Route path={"/r/:subreddit/"}>
            <Feed />
          </Route>
          <Route path={"/:filter"}>
            <Feed />
          </Route>
          <Route exact path="/">
            <Feed />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;