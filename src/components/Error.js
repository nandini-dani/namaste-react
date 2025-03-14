import { useRouteError } from 'react-router';
const Error = () => {
  const error = useRouteError();
  return (
    <div>
      Ooops Error!
      <div>{error.status}</div>
    </div>
  );
};

export default Error;
