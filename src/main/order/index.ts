import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers.ts";
import {
  deleteOrder,
  getImage,
  getListOrder,
  getOrderHistory,
  updateQuantity,
} from "./reducers.ts";

const OrderHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listOrder = useSelector((state: RootState) => state.order.listOrder);

  const mainImage = useSelector((state: RootState) => state.order.mainImage);

  const updateSuccess = useSelector(
    (state: RootState) => state.order.updateSuccess
  );

  const listOrderHistory = useSelector(
    (state: RootState) => state.order.listOrderHistory
  );

  const userInfo = useSelector((state: RootState) => state.user.userInfo);

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

  const GetOrderHistory = (orderId: string) => {
    return dispatch(getOrderHistory(orderId));
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
    GetOrderHistory,
    listOrderHistory,
  };
};
export default OrderHook;
