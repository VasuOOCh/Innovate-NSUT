import Card from '@/components/Card';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
type Item = {
    name: string,
    desc: string,
    location: string,
    images: string[],
    owner: any,
    finder: any
}
const LAFHome = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    console.log(items);
    const { currentUser } = useSelector((self: any) => self.user)

    if (!currentUser) {
        return <Navigate to="/signin" replace />;
    }

    useEffect(() => {
        try {
            const fetchItems = async () => {
                const res = await axios.get('/laf/items');
                setItems(res.data)
                setLoading(false)
            }
            fetchItems();

        } catch (error) {
            console.log(error);

        }
    }, [])
    return (
        <div>
            <div className='flex flex-row my-8 mx-4'>
                {/* Items dashboad */}
                {
                    loading ? "Loading..." : (
                        <div className='w-[70%]'>
                            {
                                items.map((item: Item, key) => (
                                    item.finder == null ? <Card key={key} item={item} /> : null
                                ))
                            }
                        </div>
                    )
                }

                {/* Chat Mode */}
                <div>

                </div>
            </div>
        </div>
    )
}

export default LAFHome