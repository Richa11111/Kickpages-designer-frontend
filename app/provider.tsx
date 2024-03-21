"use client"
import { ThemeProvider } from "next-themes"
import { Provider } from 'react-redux';
import { store } from '../redux/store';

interface Props {
  children: React.ReactNode
}
export default function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute='class' defaultTheme='light'>
        {children}
      </ThemeProvider>
    </Provider>
  )
}
