"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHat = exports.HatList = void 0;
exports.HatList = [
    'blue',
    'green',
    'purple',
    'pink',
    'orange',
    'red',
];
const getHat = (rating) => {
    if (rating <= 1000) {
        return exports.HatList[0];
    }
    else if (rating > 1000 && rating <= 1200) {
        return exports.HatList[1];
    }
    else if (rating > 1200 && rating <= 1400) {
        return exports.HatList[2];
    }
    else if (rating > 1400 && rating <= 1600) {
        return exports.HatList[3];
    }
    else if (rating > 1600 && rating <= 2000) {
        return exports.HatList[4];
    }
    else {
        return exports.HatList[5];
    }
};
exports.getHat = getHat;
