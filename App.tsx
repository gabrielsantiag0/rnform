import { Routes } from './src/routes';
import { AccountProvider } from './src/context/AccountFormContext';

export default function App() {
  return (
    <AccountProvider>
      <Routes />
    </AccountProvider>
  );
}

