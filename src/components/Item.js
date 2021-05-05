import React, { useState, useEffect } from "react";
import ItemService from "../services/ItemService";

const Item = props => {
    const initialItemState = {
        id: null,
        url: null,
        title: '',
        description: '',
        price: null,
        image: '',
    };
    const [currentItem, setCurrentItem] = useState(initialItemState);
    const [message, setMessage] = useState("");

    const getItem = id => {
        ItemService.get(id)
            .then(response => {
                setCurrentItem(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getItem(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentItem({ ...currentItem, [name]: value });
    };


    ItemService.update(currentItem.id, data)
        .then(response => {
            setCurrentItem({ ...currentItem });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });


const updateItem = () => {
    ItemService.update(currentItem.id, currentItem)
        .then(response => {
            console.log(response.data);
            setMessage("The Item was updated successfully!");
        })
        .catch(e => {
            console.log(e);
        });
};

const deleteItem = () => {
    ItemService.remove(currentItem.id)
        .then(response => {
            console.log(response.data);
            props.history.push("/items");
        })
        .catch(e => {
            console.log(e);
        });
};

return (
    <div>
        {currentItem ? (
            <div className="edit-form">
                <h4>Item</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={currentItem.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={currentItem.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </form>

                <button className="badge badge-danger mr-2" onClick={deleteItem}>
                    Delete
            </button>

                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={updateItem}
                >
                    Update
            </button>
                <p>{message}</p>
            </div>
        ) : (
            <div>
                <br />
                <p>Please click on a Item...</p>
            </div>
        )}
    </div>
);
};

export default Item;