import { useDispatch, useSelector } from "react-redux"

const { currentUser } = useSelector((state: any) => state.user);
const dispatch = useDispatch();

const logout = async() => {
    
}