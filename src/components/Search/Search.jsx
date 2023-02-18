import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeSearchFilter } from '../../redux/slices/filterSlice'
import { useDebounce } from '../hooks/useDebounce'

function Search() {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const debouncedSearchValue = useDebounce(search, 750)
  const searchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [dispatch, debouncedSearchValue])

  return (
    <input
      type="text"
      placeholder="Search"
      className="form-control"
      style={{ width: '300px', margin: '24px auto' }}
      value={search}
      onChange={searchHandler}
    />
  )
}
export default Search
