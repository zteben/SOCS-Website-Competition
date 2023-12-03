import React, {useState} from "react";

const Clicker = () => {
    const [count, setCount] = useState(0); // whenever count is updated the component is re-rendered

    return (
        <div>
            <p>My current count is {count}</p>
            <button onClick={() => setCount(prev => prev+1)}>CLICK ME</button>
        </div>
    );
};
export default Clicker;