import { useEffect } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram'
import Header from './components/Header/Header'
import {Routes, Route} from 'react-router-dom'
import Main from './components/Main/Main'

function App() {
  const {tg} = useTelegram()

  useEffect(() => {
    tg.ready()
    tg.disableVerticalSwipes()
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
        <Routes>
            <Route index element={<Main />}></Route>
            <Route path={'form'} element={<div></div>}></Route>
        </Routes>
    </div>
  )
}

export default App