import Card from '@/components/Card';
import Chat from '@/components/Chat';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
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
    // console.log(items);
    const { currentUser } = useSelector((self: any) => self.user)
    const navigate = useNavigate()
    if (!currentUser) {
        console.log("here");

        return navigate('/signin');
    }
    // Inside LAFHome.tsx
    const [selectedUser, setSelectedUser] = useState<any>(null);


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

            <h1 className='text-3xl text-center my-4 font-bold'>Lost and Found</h1>
            <div className='flex flex-row my-8 mx-4 gap-2 relative'>
                <div className='w-[75%] flex justify-around gap-10 flex-wrap'>
                    {
                        items.map((item: Item, key) => (
                            item.finder == null ? (
                                <Card
                                    key={key}
                                    item={item}
                                    onChatWithOwner={() => setSelectedUser(item.owner)}
                                />

                            ) : null
                        ))
                    }
                </div>

                {/* Chat Mode */}
                <div className='w-[25%] sticky top-0'>
                    <h1 className='text-3xl font-bold'> Chats</h1>
                    <Chat selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                </div>

            </div>
        </div>
    )
}

export default LAFHome