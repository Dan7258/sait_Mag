import { utils } from "./utils.js";

export const getData = (() => {
    
    const { workWithDateAndNumber } = utils;
    
    const getData = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        data.data = workWithDateAndNumber(data.data);
        return data;
    }

    return getData;
})();