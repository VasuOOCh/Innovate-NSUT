// src/components/Navbar.tsx
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserSuccess } from "@/Redux/userSlice";
import { persistor } from "@/Redux/store";

const Navbar = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch()
  // console.log(currentUser);
  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      dispatch(fetchUserSuccess(null));
      // When you want to clear the persisted state:
      persistor.purge();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to={'/'} className="text-xl font-semibold">InnovateNSUT</Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/laf" className="text-sm font-medium hover:text-blue-600">
          Home
        </Link>
        <Link to="/profile" className="text-sm font-medium hover:text-blue-600">
          Profile
        </Link>
        <Link to="/laf/query" className="text-sm font-medium hover:text-blue-600">
          Query
        </Link>
        {
          currentUser ? (
            <Button onClick={handleLogout} variant="destructive" size="sm">
              Logout
            </Button>) :
            (
              <>
                <Link to={'/signin'}><Button variant="default" size="sm">
                  Signin
                </Button>
                </Link>
                <Link to={'/signup'}><Button variant="outline" size="sm">
                  Signup
                </Button>
                </Link>
              </>
            )

        }

      </div>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-4 mt-6">
              <Link to="/laf" className="text-sm font-medium hover:text-blue-600">
                Home
              </Link>
              <Link to="/profile" className="text-sm font-medium hover:text-blue-600">
                Profile
              </Link>
              <Link to="/laf/query" className="text-sm font-medium hover:text-blue-600">
                Query
              </Link>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                Logout
              </Button>
              <Button onClick={handleLogout} variant="secondary" size="sm">
                Signin
              </Button>
              <Button onClick={handleLogout} variant="link" size="sm">
                Signup
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
