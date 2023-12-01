import ReactDOM from 'react-dom/client'
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
