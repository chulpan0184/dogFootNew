/* eslint-disable linebreak-style */
import LoaderStyles from './louder.module.css'

export function Louder() {
  return (
    <div className="d-flex justify-content-center">
      <div className={LoaderStyles['lds-ripple']}>
        <div />
        <div />
      </div>
    </div>
  )
}
