import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PopItemProps = {
  item: {
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
  trigger: React.ReactNode;
  onChatWithOwner: () => void;
};

const PopItem: React.FC<PopItemProps> = ({ item, trigger, onChatWithOwner }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleChatClick = () => {
    onChatWithOwner();
    setOpen(false); // close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>Item Details</DialogDescription>
        </DialogHeader>

        {/* User Info */}
        <div className="flex gap-4 items-center mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={item.owner.avatar} />
            <AvatarFallback>
              {item.owner.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{item.owner.username}</p>
            <p className="text-sm text-muted-foreground">{item.owner.email}</p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-full h-52 rounded-lg overflow-hidden mb-4">
          <img
            src={item.images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="object-cover w-full h-full transition-all duration-300"
          />
          {item.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Details */}
        <div className="text-sm space-y-2">
          <p><span className="font-semibold">Name:</span> {item.name}</p>
          <p><span className="font-semibold">Location:</span> {item.location}</p>
          <p><span className="font-semibold">Description:</span> {item.desc}</p>
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="mt-4 flex justify-between">
          <Button variant="default" onClick={handleChatClick}>
            Chat with Owner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PopItem;
