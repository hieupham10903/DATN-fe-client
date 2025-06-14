import { useDispatch, useSelector } from "react-redux";
import { getDetailOrder } from "../order/reducers.ts";
import { AppDispatch, RootState } from "../reducers.ts";
import { createPayment } from "./reducers.ts";

const PaymentHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const urlVnPay = useSelector((state: RootState) => state.payment.urlVnPay);

  const updateSuccess = useSelector(
    (state: RootState) => state.payment.updateSuccess
  );

  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const order = useSelector((state: RootState) => state.order.order);

  const CreatePayment = (body: any) => {
    dispatch(createPayment(body));
  };

  const GetDetailOrder = (orderId: string) => {
    dispatch(getDetailOrder(orderId));
  };

  return {
    CreatePayment,
    updateSuccess,
    urlVnPay,
    userInfo,
    GetDetailOrder,
    order,
  };
};
export default PaymentHook;
