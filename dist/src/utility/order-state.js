"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prevState = exports.nextState = exports.OrderStateList = exports.OrderState = void 0;
exports.OrderState = {
    BOOKED: 'Booked',
    WORKING: 'Working',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
};
exports.OrderStateList = Object.values(exports.OrderState);
const nextState = (currentState) => {
    const idx = exports.OrderStateList.findIndex(orderState => orderState === currentState);
    if (idx === -1)
        return 'Invalid State';
    if (idx === exports.OrderStateList.length - 1)
        return exports.OrderStateList[idx];
    return exports.OrderStateList[idx + 1];
};
exports.nextState = nextState;
const prevState = (currentState) => {
    const idx = exports.OrderStateList.findIndex(orderState => orderState === currentState);
    if (idx === -1)
        return 'Invalid State';
    if (idx === 0)
        return exports.OrderStateList[idx];
    return exports.OrderStateList[idx - 1];
};
exports.prevState = prevState;
