import React from "react";
import { Card as ShadCard, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import MarkAsFoundPopup from "@/components/MarkAsFoundPopup";
import axios from "axios";

const dummyUsers = [
    { id: "1", username: "alice" },
    { id: "2", username: "bob" },
    { id: "3", username: "charlie" },
];

type ItemType = {
    _id: string,
    finder: any,
    owner: {
        username: string;
        email: string;
        avatar: string;
    };
    images: string[];
    name: string;
    location: string;
    desc: string;
};

const Card = ({ item }: { item: ItemType }) => {

    const handleMarkAsFound = async (userId: string) => {
        try {
            console.log(item);
            const res = await axios.post('/laf/found', {
                itemId: item._id,
                founderId: userId
            })

            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await axios.post('/laf/delete', {id : item._id});
            console.log(res.data);
            
        } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <ShadCard className="bg-background shadow-md hover:shadow-lg transition duration-300 rounded-xl max-w-xs min-w-[20rem] w-full">
            <CardContent className="p-3 flex flex-col gap-3">

                {/* Image */}
                <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="rounded-md w-full h-32 object-cover"
                />

                {/* Info */}
                <div className="text-xs space-y-1">
                    <p><span className="font-medium">Name:</span> {item.name}</p>
                    <p><span className="font-medium">Location:</span> {item.location}</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-2">
                    {
                        item.finder ? (
                            <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                                Founded by {item.finder.username}
                            </Button>
                        ) : (
                            <MarkAsFoundPopup
                                onSelect={handleMarkAsFound}
                                trigger={<Button variant="outline" size="sm">Mark as Found</Button>}
                            />
                        )
                    }

                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </CardContent>
        </ShadCard>
    );
};

export default Card;
