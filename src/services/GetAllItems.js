import { useState, useEffect } from 'react';
import axios from 'axios';
const GetAllItems = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(
                'http://127.0.0.1:8000/items/',
            );

            setItems(result.data.results);

        };
        fetchItems();
    }, []);
    return items;

};
export default GetAllItems;