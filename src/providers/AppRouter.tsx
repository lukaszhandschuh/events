import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import EventDetails from "../pages/EventDetails";
import EventForm from "../pages/EventForm";
import EventsList from "../pages/EventsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>Not Found</>,
    children: [
      {
        path: "events",
        element: <EventsList />,
      },
      {
        path: "events/create",
        element: <EventForm />,
      },
      {
        path: "events/:id",
        element: <EventDetails />,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
