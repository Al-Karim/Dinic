import { DinicAlgPage } from 'pages/DinicAlgPage';
import { AppContainer } from 'shared/AppContainer/AppContainer';
import { GateProvider } from './providers/GateProvider/ui/GateProvider';

export const App = () => (
  <GateProvider>
    <AppContainer>
      <DinicAlgPage />
    </AppContainer>
  </GateProvider>
);
