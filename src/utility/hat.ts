export const HatList = [
    'blue',
    'green',
    'purple',
    'pink',
    'orange',
    'red',
];

export const getHat = (rating: Number) => {
    if (rating <= 1000) {
        return HatList[0];
    } else if (rating > 1000 && rating <= 1200) {
        return HatList[1];
    } else if (rating > 1200 && rating <= 1400) {
        return HatList[2];
    } else if (rating > 1400 && rating <= 1600) {
        return HatList[3];
    } else if (rating > 1600 && rating <= 2000) {
        return HatList[4];
    } else {
        return HatList[5];
    }
}