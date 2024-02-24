import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Routes from './routes';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  // const [count, setCount] = useState(true)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
      <Routes />
    </MantineProvider>
  );
}

export default App;
