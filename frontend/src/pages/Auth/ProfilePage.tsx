import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileItemCard from '@/components/ProfileItem';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [items, setItems] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    const fetchItems = async () => {
      try {
        const res = await axios.get('/laf/getuseritems');
        setItems(res.data);
      } catch (error) {
        console.log(error);
        setError("Something went wrong while fetching items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentUser, navigate]);

  if (!currentUser) {
    return (
      <div className="text-center mt-20 text-lg text-muted-foreground">
        No user is currently logged in.
      </div>
    );
  }

  const { username, email, avatar } = currentUser;

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 space-y-8">
      <Card className="p-4 shadow-md border rounded-2xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold">{username}</h2>
            <p className="text-muted-foreground">{email}</p>
          </div>
        </div>
      </Card>

      <Card className="shadow-md border rounded-2xl flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">Your Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col items-center">
          {error && (
            <p className="text-red-500">{error}</p>
          )}
          {!loading && items.length === 0 && (
            <p className="text-muted-foreground">No items to display.</p>
          )}
          <ul className="space-y-2">
            {items.map((item: any, index: number) => (
              <ProfileItemCard key={index} item={item} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
