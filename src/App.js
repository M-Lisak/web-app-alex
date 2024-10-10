import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';

function App() {
  const {tg, onClose} = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [tg])//удалить tg из зависимостей

  const backButton = tg.BackButton

  if(window.location.search && window.location.pathname !== '/') {
    backButton.show()
  } else {
    backButton.hide()
  }

  backButton.onClick(() => {
    window.history.back()
  })

  return (
    <div className="App">
      <Header/>
      
      <button className='footer' onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App