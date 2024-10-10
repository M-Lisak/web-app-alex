import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const {tg, onClose} = useTelegram()

  useEffect(() => {
    tg?.ready()
  }, [tg])//удалить tg из зависимостей


  return (
    <div className="App">
      123
      <button className='footer' onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App