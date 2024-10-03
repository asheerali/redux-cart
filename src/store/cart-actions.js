import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-http-83a00-default-rtdb.europe-west1.firebasedatabase.app/cart.json" // get is the default method
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
        dispatch(
            cartActions.replaceCart(cartData))
    } catch (error) {
      dispatch(
        await uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: ` Fetching cart data failed! , ${error.message}`,
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-http-83a00-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT", // PUT is used to overwrite the existing data in the database with the new data that we are sending
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: ` Sending cart data failed! , ${error.message}`,
        })
      );
    }
  };
};
