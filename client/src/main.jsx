import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {TransactionContextProvider} from './context/TransactionContext'

ReactDOM.render(
  <TransactionContextProvider> {/* // wrap the entire application with the provider component */}
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </TransactionContextProvider>,
  document.getElementById('root')
)
