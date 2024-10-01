/*1.Manipulating the DOM with Refs:-
                                    1.React automatically updates the DOM to match your render output, so your components won’t often need to manipulate it.
                                    2.sometimes you might need access to the DOM elements managed by React,so you will need a ref to the DOM node.
*/


/*2.Getting a ref to the node :-
                               1.first, import the useRef Hook
                               2.Then, use it to declare a ref inside your component
                               3.Finally, pass your ref as the ref attribute to the JSX tag for which you want to get the DOM node
*/
import { useRef } from 'react';
const myRef = useRef(null);
<div ref={myRef}></div>
                             //4.The useRef Hook returns an object with a single property called current. 
                             //5.Initially, myRef.current will be null.When React creates a DOM node for this <div>, React will put a reference to this node into myRef.current. 
                             //6.You can then access this DOM node from your event handlers and use the built-in browser APIs.
                            
//7.Example:Focusing a text input
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}

//8.Example:Scrolling to an element :-You can have more than a single ref in a component
import { useRef } from 'react';
export default function CatFriends() {     
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);

  function handleScrollToFirstCat() {
    firstCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
  function handleScrollToSecondCat() {
    secondCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
function handleScrollToThirdCat() {
    thirdCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>
          Neo
        </button>
        <button onClick={handleScrollToSecondCat}>
          Millie
        </button>
        <button onClick={handleScrollToThirdCat}>
          Bella
        </button>
      </nav>
      <div>
        <ul>
          <li>
            <img
              src="https://placecats.com/neo/300/200"
              alt="Neo"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/millie/200/200"
              alt="Millie"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/bella/199/200"
              alt="Bella"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  );
}



/*3.Accessing another component’s DOM nodes:-
                                              1.A component can specify that it “forwards” its ref to one of its children
                                              2.A component doesn’t expose its DOM nodes by default. 
                                              3.You can opt into exposing a DOM node by using forwardRef and passing the second ref argument down to a specific node.
*/
//Example
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}



/*4.When React attaches the refs:-
                                1.In React, every update is split in two phases:
                                           1.During render phase, React calls your components to figure out what should be displayed on the screen.
                                           2.During commit phase, React applies/commits changes to the DOM.
                                2.During the Render Phase, avoid accessing ref.current
                                3.React sets ref.current during the commit.
                                4.Before updating the DOM, React sets the affected ref.current values to null. After updating the DOM, React immediately sets them to the corresponding DOM nodes.
                                5.We can access Refs in 
                                                         1.Event Handlers and 
                                                         2.Effects
*/


/*5.Avoid changing DOM nodes managed by React,
                                              If you do modify/change DOM nodes managed by React, modify parts that React has no reason to update.
*/
import { useState, useRef } from 'react';

export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        Toggle with setState
      </button>
      <button
        onClick={() => {
          ref.current.remove();
        }}>
        Remove from the DOM
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
