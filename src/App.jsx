import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Head from "./components/Head";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import store from "./utils/Store";
import VideoContainer from "./components/VideoContainer";
import SearchContainer from "./components/SearchContainer";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Head />
        <Body />
      </>
    ),
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "search",
        element: <SearchContainer />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      {/* <Head /> */}
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

{
  /**
Head
Body
 sidebar
   menu items
 Main container
   Buttons list
   video container
   video card
 */
}

export default App;
