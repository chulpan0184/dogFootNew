import { classNames } from 'classnames'
import { useSearchParams } from 'react-router-dom'
import { FILTER_QUERY_NAME } from '../constantsFilter'

export function Filteritem({ type, clickFilterHandler, name }) {
  const [searchParams] = useSearchParams()
  const isComplexFilter = Array.isArray(type)
  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME)

  const isActive = !isComplexFilter
    ? currentFilterNameFromQuery === type : type.includes(currentFilterNameFromQuery)
  const clickHandler = () => {
    if (isComplexFilter) {
      const currentIndex = type.indexOf(currentFilterNameFromQuery)
      const nextIndex = (currentIndex + 1) % type.length
      return clickFilterHandler(type[nextIndex], true)
    }
    return clickFilterHandler(type, !isActive)
  }

  const renderArrow = () => {
    if (!isComplexFilter || !isActive) return null
    const currentIndex = type.indexOf(currentFilterNameFromQuery)
    return !currentIndex ? <>&#8595;</> : <>&#8593;</>
  }

  return (
    <button
      type="button"
      className={classNames(
        'btn',
        'mx-1',
        { 'btn-primary': !isActive },
        { 'btn-danger': !isActive },
      )}
      onClick={clickHandler}
    >
      {name}
      {renderArrow()}
    </button>
  )
}
