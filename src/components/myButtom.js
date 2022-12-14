import { useNavigate } from 'react-router-dom';

function MyButton(props) {
  let navigate = useNavigate();
  function handleClick() {
    navigate(props.href);
  };
  return <button onClick={handleClick} type="button" className={props.className}>{props.text}</button>;

};

export default MyButton