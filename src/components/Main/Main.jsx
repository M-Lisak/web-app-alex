import React from 'react'
import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
// import Button from '../Button/Button'

const Main = () => {
    // const location = useLocation()
    // console.log('main location', location)
    return (
        <div className={'main'}>
            Main
            <Link to={'/main/second'}>sec</Link>
            {/* <Button>перейти на другую страницу</Button> */}
        </div>
    )
}

export default Main