import React from "react";
import { Card as ShadCard, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PopItem from "./PopItem";

type ItemType = {
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

const Card = ({
  item,
  onChatWithOwner
}: {
  item: ItemType;
  onChatWithOwner?: () => void;
}) => {
  return (
    <PopItem item={item} onChatWithOwner={onChatWithOwner!} trigger={
      <ShadCard className="bg-background cursor-pointer shadow-lg hover:shadow-xl transition duration-300 rounded-2xl max-w-xs w-full">
        <CardContent className="p-4 flex flex-col gap-4">
          {/* Owner Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={item.owner.avatar} alt={item.owner.username} />
              <AvatarFallback>
                {item.owner.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{item.owner.username}</p>
              <p className="text-sm text-muted-foreground">{item.owner.email}</p>
            </div>
          </div>

          {/* Image */}
          <img
            src={item.images?.[0]}
            alt={item.name}
            className="rounded-lg w-full h-40 object-cover"
          />

          {/* Info */}
          <div className="text-sm space-y-1">
            <p><span className="font-medium">Name:</span> {item.name}</p>
            <p><span className="font-medium">Location:</span> {item.location}</p>
          </div>
        </CardContent>
      </ShadCard>
    } />
  );
};

export default Card;