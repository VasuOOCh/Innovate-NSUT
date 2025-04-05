import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);

  if (!currentUser) {
    return (
      <div className="text-center mt-20 text-lg text-muted-foreground">
        No user is currently logged in.
      </div>
    );
  }

  const { username, email, items = [] } = currentUser;

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm md:text-base">
          <p><span className="font-medium">Username:</span> {username}</p>
          <p><span className="font-medium">Email:</span> {email}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Your Items</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-muted-foreground">No items to display.</p>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              {items.map((item: any, index: number) => (
                <li key={index} className="text-sm md:text-base">
                  {typeof item === 'object' ? JSON.stringify(item) : item}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
