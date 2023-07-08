import axios from "axios";
import {HighlightType} from "../helper/entities/HighlightRelated";


export async function axiosGetStarList(): Promise<{ tabKey: number, starFlag: boolean }[]> {
    const response = await axios.get('/tab/star', {})
    return response.data;
}

export function axiosPutStar(tabKey: number, hasStar: boolean) {
    axios.put('/tab/star', {tabKey: tabKey, starFlag: hasStar})
        .catch((error) => {
            console.log(error)
        });
}

export async function axiosGetHighlightList(location: number): Promise<HighlightType[]> {
    console.log("axiosGetHighlightList")
    const response = await axios.get(`/tab/highlight/${location}`, {});
    console.log(response.data)
    return response.data;
}

export function axiosPutHighlight(location:number, newHighlights: HighlightType[]) {
    axios.put(`/tab/highlight/${location}`, newHighlights)
        .catch((error) => {
            console.log(error)
        });
}