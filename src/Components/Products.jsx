import React, { useEffect, useState } from 'react'
import Button from './UI/Button'
import MealItem from './MealItem'

export default function Products() {
    const [items, setItems] = useState([])

    useEffect(() => {
        async function fetchItems() {
            const res = await fetch('https://dummyjson.com/products')
            if (!res.ok) {
                console.log('error');

            }
            const data = await res.json()
            setItems(data.products)

        }
        fetchItems()
    }, [])


    return (
        <div className='grid grid-cols-3 gap-3 gap-y-10 mt-10'>
            {items.map((item, i) => (
                <MealItem key={i} item={item} />
            ))}
        </div>
    )
}
