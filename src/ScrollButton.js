const ScrollButton = (props) => {
    function handleClick() {
      props.onClick();
    }
    return (
      <button className="scrollButton" onClick={handleClick}>
        {props.arrow}
      </button>
    );
  };
  
  export default ScrollButton;
  