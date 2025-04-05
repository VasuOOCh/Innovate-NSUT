import Card from '@/components/Card';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
type Item = {
    name: string,
    desc: string,
    location: string,
    images: string[],
    owner: any
}
const LAFHome = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            const fetchItems = async () => {
                const res = await axios.get('/laf/items');
                setItems(res.data)
            }
            fetchItems();

        } catch (error) {
            console.log(error);

        }
    }, [])
    return (
        <div>

            <h1>Items</h1>

            <div className='flex flex-row'>
                {/* Items dashboad */}
                <div className='w-[70%] bg-green-300'>
                    {
                        items.map((item: Item, key) => (
                            <Card key={key} item={item} />
                        ))
                    }
                </div>

                {/* Chat Mode */}
                <div>

                </div>
            </div>
        </div>
    )
}

export default LAFHome