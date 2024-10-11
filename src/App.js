import { useEffect } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram'
import Button from './components/Button/Button'
import {/*  Link, */ useLocation, useNavigate, /* useNavigation  */} from 'react-router-dom'

function App() {
  const {tg} = useTelegram()
  const location = useLocation()
  const navigation = useNavigate()
  // const nav = useNavigation()

  useEffect(() => {
    tg.ready()
    tg.expand()
    tg.disableVerticalSwipes()

    tg.BackButton.show()
    tg.isClosingConfirmationEnabled = true
  }, [tg])

  const onClickBut = () => {
    navigation('/main')
    
  }

  useEffect(() => {
    console.log("backButton", location)
    // const backButton = tg.BackButton

    // if(location.search && location.pathname !== '/') {
    //   backButton.show()
    // } else {
    //   backButton.hide()
    // }
  
    // backButton.onClick(() => {
    //   navigate(-1)
    // })

  // eslint-disable-next-line
  }, [location.pathname])

  return (
    <div className="App">
      App
      {/* <Link to={'/main'}> */}
      sd
        <Button onClick={onClickBut}>перейти к Main</Button>
      {/* </Link> */}
    </div>
  )
}

export default App