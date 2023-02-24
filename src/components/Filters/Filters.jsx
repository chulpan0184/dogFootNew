import { useSearchParams } from 'react-router-dom'
import { FILTER_QUERY_NAME, PRICE_FILTER, SALES_FILTER } from './constantsFilter'
import { Filteritem } from './Filteritem/Filteritem'

const FILTERS = [PRICE_FILTER, SALES_FILTER]
export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams

  const clickFilterHandler = (filterType, isActive) => {
    if (!isActive) searchParams.delete(FILTER_QUERY_NAME)
    else searchParams.set(FILTER_QUERY_NAME, filterType)
    setSearchParams(searchParams)
  }
  return (
    <div className="d-flex  justify-content-center">
      {FILTERS.map((filter) => (
        <Filteritem
          key={filter.name}
          {...filter}
          clickFilterHandler={clickFilterHandler}
        />
      ))}
    </div>
  )
}
