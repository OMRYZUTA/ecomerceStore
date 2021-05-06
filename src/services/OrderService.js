import axios from 'axios';
const OrderService = () => {
    const postOrder = (props) => {
        if (props) {
            const postCallback = async () => {
                await axios({
                    method: 'post', url:
                        'http://127.0.0.1:8000/orderitems/', data: props
                }
                ).then(response => {
                    console.log(response);
                });
            };
            postCallback();
        }
    }
}
export default OrderService;