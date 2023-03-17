export const OrderState = {
    BOOKED: 'Booked',
    WORKING: 'Working',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
};

export const OrderStateList = Object.values(OrderState);

export const nextState = (currentState: string) => {
    const idx = OrderStateList.findIndex(orderState => orderState === currentState);
    if (idx === -1)
        return 'Invalid State';
    if (idx === OrderStateList.length - 1)
        return OrderStateList[idx];
    return OrderStateList[idx+1];
}

export const prevState = (currentState: string) => { 
    const idx = OrderStateList.findIndex(orderState => orderState === currentState);
    if (idx === -1)
        return 'Invalid State';
    if (idx === 0)
        return OrderStateList[idx];
    return OrderStateList[idx-1];
}