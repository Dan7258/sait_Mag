import { utils } from "./utils.js";

export const getData = (() => {
    
    const { workWithDate } = utils;
    
    const getData = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        data.data = workWithDate(data.data);
        return data;
    }

    return getData;
})();