/*1.Referencing Values with Refs:-
                                    1.When you want a component to remember some information but you don’t want that information to trigger new renders,then you can use a ref.
                                    2.When Ref changes,it doesn't rerender
                                    3.Mutable and
                                    4.You shouldn’t read or write the current value during rendering
*/



/*2.Adding Ref to a component:-
                              1.You can add a Ref to your component by importing the useRef Hook from React and
                              2.Inside your component, call the useRef Hook and pass the initial value 
*/
import { useRef } from 'react';
const ref = useRef(0);
                            //3.useRef returns an object like below and has current property
                            { 
                            current: 0
                            }
                            //4.You can access the current value of that ref through the ref.current property. That value is intentionally mutable that means you can read,write to it
                            import { useRef } from 'react';
                            export default function Counter() {
                              let ref = useRef(0);
                            
                              function handleClick() {
                                ref.current = ref.current + 1;
                                alert('You clicked ' + ref.current + ' times!');
                              }
                            
                              return (
                                <button onClick={handleClick}>
                                  Click me!
                                </button>
                              );
                            }
//5.Example:A StopWatch
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}



/*When to use refs:-
                     1.you will use a ref when your component needs to step outside React and communicate with external systems
                     2.When to use refs:-
                                        ->Storing timeout IDs,
                                        ->Storing and manipulating DOM elements, which we cover on the next page,
                                        ->Storing other objects that aren’t necessary to calculate the JSX
                      3.If your component needs to store some value, but it doesn’t impact the rendering logic,then choose refs otherwise choose state
*/


