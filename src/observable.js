const Observable = () => {
  let observers = [];

  const subscribe = (func) => {
    observers.push(func);
  };

  const unsubscribe = (func) => {
    observers = observers.filter((o) => o !== func);
  };

  const notify = (data) => {
    observers.forEach((o) => o(data));
  };

  return { subscribe, unsubscribe, notify };
};

export default Observable;
