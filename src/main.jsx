
import { createRoot } from 'react-dom/client'
import App from './App'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Store from './Redux/store/Store';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
  <>
  <Provider store={Store}>
  <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <App />
    </Provider>
  </>,
) 
