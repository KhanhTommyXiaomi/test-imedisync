import { useState } from 'react'
import InputText from './components/InputText'
import PhotoList from './features/Photos/PhotoList'
import SearchIcon from './components/icons/Searchicon'
import CloseIcon from './components/icons/CloseIcon'

const App: React.FC = () => {
  const [valueSearch, setValueSearch] = useState('')

  const handleSearchChange = (value: string) => {
    setValueSearch(value)
  }

  return (
    <div className="app">
      <div className="container">
        <InputText
          placeholder="Search images"
          value={valueSearch}
          onChange={handleSearchChange}
          startAdornment={<SearchIcon />}
          endAdornment={<CloseIcon fill="#767676" width={20} height={20} />}
        />
        <PhotoList />
      </div>
    </div>
  )
}

export default App
