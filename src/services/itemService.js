import axios from 'axios';

const ItemService = () => {
    const putItem = (props) => {
        if (props) {
            console.log('put request got: ', props)
            const putCallback = async () => {
                     await axios({
                    method: 'PUT', url:
                        `http://127.0.0.1:8000/items/${props.id}/`, data: props
                });
            };

            putCallback();
        }
    }
    const postItem = (props) => {
        if (props) {
            const postCallback = async () => {
                await axios({
                    method: 'post', url:
                        'http://127.0.0.1:8000/items/', data: props
                }
                );
            };
            postCallback();
        }
    }
    const deleteItem = (props) => {
        if (props) {
          const deleteCallback = async () => {
                await axios({
                    method: 'DELETE', url:
                    `http://127.0.0.1:8000/items/${props.id}/`, data: props
            });
          };
    
          deleteCallback();
        }
      }
    return { putItem, postItem, deleteItem };
};
export default ItemService;