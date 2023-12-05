import ReactDOM from 'react-dom/client'
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "@/assets/scss/app.scss";
import "@/assets/scss/style.css";
import "flatpickr/dist/themes/airbnb.css";
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import AppProvider from './providers/index.tsx'
import AppRoutes from './routes/index.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <AppProvider>
      <main>
        <AppRoutes />
      </main>
    </AppProvider>
  </ChakraProvider>
)
