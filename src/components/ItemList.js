import React, { useState, useEffect } from "react";
import ItemService from "../services/ItemService";
import { Link } from "react-router-dom";

const ItemsList = () => {
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveItems();
    }, []);



    const retrieveItems = () => {
        ItemService.getAll()
            .then(response => {
                setItems(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveItems();
        setCurrentItem(null);
        setCurrentIndex(-1);
    };

    const setActiveItem = (item, index) => {
        setCurrentItem(item);
        setCurrentIndex(index);
    };

    const removeAllItems = () => {
        ItemService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };



    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Items List</h4>

                <ul className="list-group">
                    {items &&
                        items.map((item, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveItem(item, index)}
                                key={index}
                            >
                                {item.title}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllItems}
                >
                    Remove All
      </button>
            </div>
            <div className="col-md-6">
                {currentItem ? (
                    <div>
                        <h4>Item</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentItem.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentItem.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentItem.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/items/" + currentItem.id}
                            className="badge badge-warning"
                        >
                            Edit
          </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Item...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemsList;