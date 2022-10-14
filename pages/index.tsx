import type { NextPage } from 'next'
import { Context } from '../contexts/Context'
import { useContext } from 'react'

const Home: NextPage = () => {

  const { state, dispatch } = useContext(Context);

  return (
    <>
      Theme: {state.theme.status}
    </>
  )
}

export default Home
