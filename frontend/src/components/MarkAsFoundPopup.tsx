// components/MarkAsFoundPopup.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import axios from "axios";


interface MarkAsFoundPopupProps {
  onSelect: (userId: string) => void;
  trigger: React.ReactNode;
}

const MarkAsFoundPopup: React.FC<MarkAsFoundPopupProps> = ({ onSelect, trigger }) => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
        const fetchUsers = async () => {
            const res = await axios.get('/users/all');
            // console.log(res.data);
            setUsers(res.data)
        }

        fetchUsers()

        setLoading(false)
    } catch (error) {
        console.log(error);
        
    }
  }, [])

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select User Who Found the Item</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="my-2"
        />

        <ScrollArea className="h-48 rounded-md border px-2">
          <div className="space-y-1 py-2">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user._id)}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                  selectedUser === user._id && "bg-muted"
                )}
              >
                {user.username}
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <p className="text-sm text-muted-foreground px-3 py-2">No users found.</p>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4">
          <Button onClick={() => selectedUser && onSelect(selectedUser)} disabled={!selectedUser}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarkAsFoundPopup;
