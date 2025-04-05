import { Card as ShadCard, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ItemType = {
  owner: {
    username: string;
    email: string;
    avatar: string;
  };
  images: string[];
  name: string;
  location: string;
};

const Card = ({ item }: { item: ItemType }) => {
  return (
    <ShadCard className="bg-background shadow-xl rounded-2xl max-w-sm w-full">
      <CardContent className="p-4 flex flex-col gap-4">
        {/* Owner Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={item.owner.avatar} alt={item.owner.username} />
            <AvatarFallback>
              {item.owner.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-base">{item.owner.username}</p>
            <p className="text-sm text-muted-foreground">{item.owner.email}</p>
          </div>
        </div>

        {/* Item Image */}
        <div>
          <img
            src={item.images?.[0]}
            alt={item.name}
            className="rounded-lg w-full h-48 object-cover"
          />
        </div>

        {/* Item Info */}
        <div className="text-sm space-y-1">
          <p>
            <span className="font-medium">Name:</span> {item.name}
          </p>
          <p>
            <span className="font-medium">Location:</span> {item.location}
          </p>
        </div>
      </CardContent>
    </ShadCard>
  );
};

export default Card;
