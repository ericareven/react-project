// import './App.css';
import Header from './Header'
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react';

function App() {
//   const [items, setItems] = useState([
//     {
//         id: 1,
//         checked: false,
//         item: "One half pound bag of Cocoa Covered Almonds"
//     },
//     {
//         id: 2,
//         checked: false,
//         item: "item 2"
//     },
//     {
//         id: 3,
//         checked: false,
//         item: "item 3"
//     }
//    ])

const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')))
const [newItem, setNewItem] = useState('')
const [search, setSearch] = useState('')

const setAndSaveItems = (newItems) => {
  setItems(newItems)
  localStorage.setItem('shoppinglist', JSON.stringify(newItems))
}

const addItem = (item) => {
  const id = items.legnth ? items[items.length - 1].id + 1 : 1
  const myNewItem = { id, checked: false, item }
  const listItems = [...items, myNewItem]
  setAndSaveItems(listItems)
}

const handleCheck = (id) => {
  // console.log(`key: ${id}`)
  // map through items, when i click an item, change the item with the same id to the opposite 'checked' value : or just return the item
  const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked } : item)
  setAndSaveItems(listItems)
}

const handleDelete = (id) =>{
  // console.log(id)
  // filter creates new array that filters out the id that === id (a new array that does not include item that matches the id we selected)
  const listItems = items.filter((item) => item.id !== id)
  setAndSaveItems(listItems)
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
      <Content 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLocaleLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
