import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Dashbord from './pages/dashbord/Dashbord.jsx'
import Connection from './pages/connection/Connection.jsx'
import Inscription from './pages/inscription/Inscription.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Creation des routes grace à l'objet createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashbord/>
  },
  {
    path: "/connection",
    element: <Connection/>
  },
  {
    path: "/inscription",
    element: <Inscription/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
