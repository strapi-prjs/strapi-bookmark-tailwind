import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import BookmarkList from "./components/BookmarkList";

function App() {
  return (
    <>
      <Header />
      <div class="container bg-gray-100">
        <head>
          <title>Bookmark</title>
          <link rel="icon" href="/favicon.ico" />
        </head>

        <main class="flex justify-center mx-86">
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <BookmarkList />
              </Route>
              <Route path="*">
                <BookmarkList />
              </Route>{" "}
            </Switch>
          </BrowserRouter>
        </main>
      </div>
    </>
  );
}

export default App;
