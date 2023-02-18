/* eslint-disable linebreak-style */
import { memo } from 'react'
import mainStyles from './main.module.css'

function Main() {
  return (
    <div className={mainStyles.wr}>
      <div className={mainStyles.wr__text}>DogFood</div>
      Магазин питания
      <br />
      для собак
    </div>
  )
}

export const MainMemo = memo(Main)
