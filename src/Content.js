import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa' // font awesome icons

const Content = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            checked: false,
            item: "One half pound bag of Cocoa Covered Almonds"
        },
        {
            id: 2,
            checked: false,
            item: "item 2"
        },
        {
            id: 3,
            checked: false,
            item: "item 3"
        }
    ])

    const handleCheck = (id) => {
        // console.log(`key: ${id}`)
        // map through items, when i click an item, change the item with the same id to the opposite 'checked' value : or just return the item
        const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked } : item)
        setItems(listItems)
        localStorage.setItem('shoppinglist', JSON.stringify(listItems))
    }

    const handleDelete = (id) =>{
        // console.log(id)
        // filter creates new array that filters out the id that === id (a new array that does not include item that matches the id we selected)
        const listItems = items.filter((item) => item.id !== id)
        setItems(listItems)
        localStorage.setItem('shoppinglist', JSON.stringify(listItems))
    }

    return (
        <main>
            {items.length ? (
                <ul>
                    {items.map((item) => (
                        <li className='item' key={item.id}>
                            <input
                                type="checkbox"
                                onChange={() => handleCheck(item.id)}
                                checked={item.checked}
                            />
                            <label
                                style = {(item.checked) ? { textDecoration:'line-through' }: null}
                                onDoubleClick={() => handleCheck(item.id)}
                            >{item.item}</label>
                            {/* <button>Delete</button> */}
                            <FaTrashAlt 
                                onClick={() => handleDelete(item.id)}
                                role="button" 
                                tabIndex="0" 
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{marginTop: '2rem'}}>Your list is empty</p>
            )}
        </main>
    )
}

export default Content