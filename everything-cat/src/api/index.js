import axios from 'axios';

const API_KEY = 'live_aidehToK7yTCQHh3MYOeAr64vhoo5tnrxpXlu14eT1oA25M5yx8mMvDzVcyFjmhy';
const BASE_URL = 'https://api.thecatapi.com/v1';
const SUB_ID = 'VN';

axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.defaults.headers.common['Content-Type'] = 'application/json';

/**
 * Api for getting random card images. This api supports paginated results.
 * @param pageParam
 * @param queryParams
 * @returns {Promise<{data: any, nextPage: number}>}
 */
export const fetchPaginatedCatImages = async (pageParam = 1, queryParams) => {
    const queryString = new URLSearchParams({
        page: pageParam,
        ...queryParams // Add additional query params dynamically
    }).toString();

    const response = await axios.get(`${BASE_URL}/images/search?${queryString}`);
    return { data: response.data, nextPage: pageParam + 1 };
};

/**
 * Api for getting if a cat's image is a favourite of the user.
 * @param id
 * @returns {Promise<any>}
 */
export async function isCatFavourite(id) {
    const response = await axios.get(`${BASE_URL}/favourites?sub_id=${SUB_ID}&image_id=${id}`);
    return response.data;
}


/**
 * Api for setting a cat image as favorite
 * @param id
 * @returns {Promise<any>}
 */
export async function markCatAsFavourite(id) {
    const response = await axios.post(
        `${BASE_URL}/favourites`,
        {
            image_id: id, // Payload containing the image ID
            sub_id: SUB_ID // Payload containing the image ID
        }
    );

    return response.data;
}

/**
 * Api for getting all cat breeds.
 * @returns {Promise<any>}
 */
export const fetchCatBreeds = async () => {
    const response = await axios.get(`${BASE_URL}/breeds`);
    return response.data;
};

/**
 * Api for getting the user's favourite cats.
 * THIS API HAS AN ERROR AS IT ONLY RETURNS A SINGLE IMAGE OF CAT FOR A BREED
 *
 * @returns {Promise<any>}
 */
export const fetchFavourites = async () => {
    const queryString = new URLSearchParams({
        sub_id: SUB_ID,
    }).toString();
    const response = await axios.get(`${BASE_URL}/favourites?${queryString}`);
    return response.data;
};


/**
 * Api for removing a cat from favourite
 * @param favouriteId
 * @returns {Promise<void>}
 */
export const removeFavourite = async (favouriteId) => {
    await axios.delete(`${BASE_URL}/favourites/${favouriteId}`);
};

/**
 * Api for getting a cat info.
 * @param id
 * @returns {Promise<any>}
 */
export const fetchCatInfo = async (id) => {
    const response = await axios.get(`${BASE_URL}/images/${id}`);
    return response.data;
}