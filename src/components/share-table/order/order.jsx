import styles from "./order.module.scss";
import { ref, set, runTransaction } from "firebase/database";
import {
  getUserIdFromLocalStorage,
  getTableIdFromLocalStorage,
  getOrderIdFromLocalStorage,
  updateOrderList,
} from "../utils";
import cn from "classnames";

export const Order = ({
  data,
  db: { instance, dbOrderList, dbUserList, dbTableList },
}) => {
  const handleUpdateOrder = (event) => {
    event.preventDefault();
    navigator.vibrate(30);

    const {
      target: {
        children: { orderTitle, orderPrice },
      },
    } = event;

    updateOrderList({
      orderTitle: orderTitle.value,
      orderPrice: orderPrice.value,
    });

    orderTitle.value = "";
    orderPrice.value = "";
  };

  const handleCountUpdate = (event, orderItemId) => {
    const buttonName = event.target.name;
    if (!buttonName) return;

    event.preventDefault();
    navigator.vibrate(20);

    const postRef = ref(
      instance,
      dbOrderList +
        "/" +
        getOrderIdFromLocalStorage() +
        "/orderItems/" +
        orderItemId
    );

    runTransaction(postRef, (order) => {
      if (buttonName === "increase") {
        order.count++;
      }

      if (buttonName === "decrease") {
        order.count--;

        if (!order.count) {
          return null;
        }
      }

      return order;
    });
  };

  return (
    <>
      <form onSubmit={handleUpdateOrder} className={styles.order_addOrder}>
        <input
          type="text"
          placeholder="Type order name"
          className={styles.order_addOrderTitle}
          name="orderTitle"
          required
        />
        <input
          type="number"
          placeholder="$"
          min="1"
          max="999"
          className={styles.order_addOrderPrice}
          name="orderPrice"
        />
        <button type="submit" className={styles.order_addOrderSubmit}>
          +
        </button>
      </form>

      {data === null ? (
        <>
          <h2>loading...</h2>
        </>
      ) : data[dbTableList][getTableIdFromLocalStorage()].orders ? (
        <>
          <ul className={styles.order_orderList}>
            {Object.values(
              data[dbTableList][getTableIdFromLocalStorage()].orders
            )
              .map((orderId) => data[dbOrderList][orderId])
              .map(({ id, orderItems, userId, tableId }) => (
                <li
                  key={id}
                  className={cn(styles.order_orderListItem, {
                    [styles.order_orderListItem__first]:
                      userId === getUserIdFromLocalStorage(),
                  })}
                >
                  <h3>{data[dbUserList][userId].name}</h3>
                  <ul className={styles.order_orderItems}>
                    {orderItems &&
                      Object.values(orderItems).map(
                        ({ id, orderTitle, orderPrice, count }) => (
                          <li
                            className={styles.order_orderItem}
                            id={id}
                            key={id}
                          >
                            <span className={styles.order_orderItemTitle}>
                              {orderTitle}
                            </span>
                            <span className={styles.order_orderItemPrice}>
                              {orderPrice}
                            </span>
                            <span className={styles.order_orderItemCount}>
                              {count}
                            </span>
                            {userId === getUserIdFromLocalStorage() && (
                              <form
                                onClick={(e) => handleCountUpdate(e, id)}
                                className={styles.order_orderItemCountForm}
                              >
                                <button
                                  name="decrease"
                                  type="button"
                                  className={
                                    styles.order_orderItemCountDecrease
                                  }
                                >
                                  -
                                </button>
                                <button
                                  name="increase"
                                  type="button"
                                  className={
                                    styles.order_orderItemCountIncrease
                                  }
                                >
                                  +
                                </button>
                              </form>
                            )}
                          </li>
                        )
                      )}
                  </ul>
                </li>
              ))}
          </ul>
          {/* <div className={styles.order_total}>
            <h3>Total:</h3>
            <strong>
              {Object.values(orderList).reduce((acc, val) => {
                return acc + Number(val.orderPrice) * val.count;
              }, 0)}
            </strong>
          </div> */}
        </>
      ) : null}
    </>
  );
};
