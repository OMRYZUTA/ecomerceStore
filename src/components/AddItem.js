import React, { useState } from "react";
import itemService from "../services/itemService";

const AddItem = () => {
  const initialItemState = {
    id: null,
    url: null,
    price: null,
    title: "",
    description: "",
    image: ""
  };
  const [item, setItem] = useState(initialItemState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const saveItem = () => {
    var data = {
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.image,
    };

    itemService.create(data)
      .then(response => {
        setItem({
          id: response.data.id,
          url: response.data.url,
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          image: response.data.image,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newItem = () => {
    setItem(initialItemState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newItem}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={item.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={item.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveItem} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddItem;