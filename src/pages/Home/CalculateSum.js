import { useState, useEffect } from 'react';

const useCalculateSum = (summarizedItems) => {
    const [sum, setSum] = useState(0);
    useEffect(() => {
        Object.keys(summarizedItems).forEach(key => {
            setSum(sum + summarizedItems[key].price * summarizedItems[key].quantity);
        }
        )
    }, [summarizedItems]);

    return sum;
}
export default useCalculateSum;