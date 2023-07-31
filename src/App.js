// import './App.css';
import Header from './Header'
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';

function App() {
const API_URL = "http://localhost:3500/items"
const [items, setItems] = useState([])
const [newItem, setNewItem] = useState('')
const [search, setSearch] = useState('')
const [fetchError, setFetchError] = useState(null)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw Error('Did not receive expected data')
      const listItems = await response.json()
      console.log(listItems)
      setItems(listItems)
      setFetchError(null)
    } catch (err) {
      // console.log(err.message)
      setFetchError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  setTimeout(() => {
    (async () => await fetchItems())() 
  }, 2000) //wait 2 seconds to display error
// fetchItems does not return a value. Therefore this async IIFE(instantly invoked function expression) is not required. You can just make a call to fetchItems()
}, [])


// const setAndSaveItems = (newItems) => {
//   setItems(newItems)
//   localStorage.setItem('shoppinglist', JSON.stringify(newItems))
// }

const addItem = (item) => {
  const id = items.length ? items[items.length - 1].id + 1 : 1
  const myNewItem = { id, checked: false, item }
  const listItems = [...items, myNewItem]
  setItems(listItems)
}

const handleCheck = (id) => {
  // console.log(`key: ${id}`)
  // map through items, when i click an item, change the item with the same id to the opposite 'checked' value : or just return the item
  const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked } : item)
  setItems(listItems)
}

const handleDelete = (id) =>{
  // console.log(id)
  // filter creates new array that filters out the id that === id (a new array that does not include item that matches the id we selected)
  const listItems = items.filter((item) => item.id !== id)
  setItems(listItems)
}

const handleSubmit = (e) => {
  e.preventDefault()
  // console.log(newItem)
  if (!newItem) return
  addItem(newItem)
  setNewItem('')
}

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: 'red'}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLocaleLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        /> }
      </main>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
