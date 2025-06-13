import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers.ts";
import {
  deleteOrder,
  getImage,
  getListOrder,
  updateQuantity,
} from "./reducers.ts";

const OrderHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listOrder = useSelector((state: RootState) => state.order.listOrder);

  const mainImage = useSelector((state: RootState) => state.order.mainImage);

  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const updateSuccess = useSelector(
    (state: RootState) => state.order.updateSuccess
  );

  const GetListOrder = (userId: string) => {
    dispatch(getListOrder(userId));
  };

  const GetMainImage = (imagePath: string) => {
    return dispatch(getImage(imagePath));
  };

  const UpdateQuantity = (body: any) => {
    return dispatch(updateQuantity(body));
  };

  const DeleteOrder = (id: string) => {
    return dispatch(deleteOrder(id));
  };

  return {
    GetListOrder,
    listOrder,
    GetMainImage,
    mainImage,
    userInfo,
    UpdateQuantity,
    updateSuccess,
    DeleteOrder,
  };
};
export default OrderHook;
