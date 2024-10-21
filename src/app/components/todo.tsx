'use client';
import { useEffect } from "react";

interface TodoProps {
  text: string; // 定义 props 的类型
}

function Todo(props: TodoProps) {
  useEffect(() => {
    const divElement = document.querySelector('#myDiv');
    const toggleClass = () => {
      console.log("run");
      console.log(divElement?.className);
      if (divElement!.className === 'card') {
        divElement!.className = 'test';
        console.log('run 1');
      } else {
        divElement!.className = 'card';
        console.log('run 2');
      }
    };

    const buttonElement = document.querySelector('#toggleButton');
    buttonElement!.addEventListener('click', toggleClass);

    return () => {
      buttonElement!.removeEventListener('click', toggleClass);
    };
  }, []);

  return (
    <div className="card" id="myDiv">
      <h1 className="title">{props.text}</h1>
      <div className='actions'>
        <button className="btn" id="toggleButton">Change</button>
      </div> 
    </div>
  );
}

export default Todo;
