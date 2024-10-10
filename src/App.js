import { useEffect } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram'
import Button from './components/Button/Button'
import { Link, useLocation } from 'react-router-dom'

function App() {
  const {tg} = useTelegram()

  useEffect(() => {
    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()
  }, [tg])//удалить tg из зависимостей

  const backButton = tg.BackButton
  const location = useLocation()

  // console.log('location', location)

  if(location.search && location.pathname !== '/') {
    backButton.show()
  } else {
    backButton.hide()
  }

  backButton.onClick(() => {
    window.history.back()
  })

  return (
    <div className="App">
      App
      <Link to={'/main'}>
        <Button>перейти к Main</Button>
      </Link>
    </div>
  )
}

export default App