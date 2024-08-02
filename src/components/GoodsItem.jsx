function GoodsItem(props) {
  const {
    price: {
      regularPrice,
      finalPrice,
    },
    granted: [
        {
            id,
            description,
            name,
            images: {
                full_background
            },
        },
    ],
    addToBasket = Function.prototype,
  } = props;

  const trimDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <div className="good" id='{id}'>
      <div className="good_img">
      {
        full_background === 'N/A' ?
          <img src={`../img/no_img.png`} alt={name} />
          :
          <img src={full_background} alt={name} />
      }
    </div>
      <div className="good-body">
        <h5 className="good-title">{name}</h5>
        <p className="good-text">{trimDescription(description , 110)}</p>
        <button 
          className="btn"
            onClick={() => 
              addToBasket({
              id,
              name,
              finalPrice,
              full_background,
            })
          }
        >
          Buy
        </button>
        <div className="float-end">
          {regularPrice !== finalPrice && (
              <p className="good-price good-price-regular float-start">{regularPrice}$</p>
          )}
          <p className="good-price float-end">{finalPrice}$</p>
        </div>
      </div>
    </div>
  );
}
export { GoodsItem };
