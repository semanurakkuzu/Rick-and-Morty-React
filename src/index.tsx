import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Characters from './components/Characters'
import CharacterDetails from './components/CharacterDetail'
import { store } from './redux/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/character/:id',
    element: <CharacterDetails />
  },
  {
    path: '/location/:id',
    element: <Characters />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
