import { useEffect } from 'react';

function InfoBasket(props) {
  const { name = '', closeAlert = Function.prototype } = props;

  useEffect(() => {
    const timerId = setTimeout(closeAlert, 3000);

    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <div className="info_toast">{name} добавлен в корзину</div>
  );
}

export { InfoBasket };