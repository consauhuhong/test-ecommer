import Header from './components/header/Header';
import Pages from './components/mainpage/Pages';
import { GlobalState } from './GlobalState'
import { useContext } from 'react'
function App() {
  const state = useContext(GlobalState)
  const [theme] = state.theme
  return (
    <div className={`App ${theme}`}>
      <Header />
      <Pages />
    </div>
  );
}

export default App;
