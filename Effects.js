/*1..Effects:-
              1.Before getting to Effects, you need to be familiar with two types of logic inside React components:
                                    1.Rendering Code(Pure Logic):
                                                                   ->The rendering code is responsible for transforming the props and state into JSX (the UI that will be displayed on the screen.
                                                                   ->This logic lives at the top level of your component function.
                                    2.Event Handlers(side effects triggered by user actions):
                                                                    ->Event handlers are functions that react to user actions
                                                                    ->They are defined inside the component function
*/
function MyComponent({ name }) {      //Rendering code example
    return <h1>Hello, {name}</h1>;
  }

function MyComponent() {               //Event Handlers Example
    function handleClick() {
      console.log("Button clicked!");
    }
  
    return <button onClick={handleClick}>Click me</button>;
  }
               //2.There are situations where side effects need to happen because of rendering, rather than a user-triggered event. So, we use Effects 



/*2.Introduction to Effects:-
                              1.Effects allow you to run side effects after the component has rendered and committed to the DOM.
                              2.Effects run after the render and commit phase, meaning they happen after the UI is updated on the screen.
                              3.Examples of Effects:
                                                    Connecting to a server,
                                                    Fetching data from an API when component is displayed,
                                                    Setting up or cleaning up subscriptions or timers.
*/



/*3.Writing an Effect:-To write an Effect,we need to  follow these three steps:
                                                                                1.Declare an Effect
                                                                                2.Specify the Effect dependencies
                                                                                3.Add cleanup if needed
*/
/*1.Declare an Effect:-
                        ->To declare an Effect in your component, import the useEffect Hook from React
                        ->Then, call it at the top level of your component 
*/
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
/*2.Specify the Effect dependencies:-
                                    ->By default, useEffect runs after every render, including the initial render and every subsequent re-render.
                                    ->In many cases, you don’t want the effect to run every time
                                    ->You can tell React to skip unnecessarily re-running the Effect by specifying an array of dependencies as the second argument to the useEffect call
*/
useEffect(() => {
    // ...
  }, []);
//Example of above:
import { useState, useRef, useEffect } from 'react';
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
/*3.Add cleanup if needed :-
                             ->React runs the effect twice in development mode due to Strict Mode,which intentionally re-mounts components to help developers detect issues like missing cleanups.
                             ->To prevent the issue of leftover connections/effect twice, you return a cleanup function from the useEffect hook. 
                             ->This cleanup function is called when the component unmounts or before effect runs again
*/
//app.js file
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>Welcome to the chat!</h1>;
}
//chat.js file
export function createConnection() {
    return {
      connect() {
        console.log('✅ Connecting...');
      },
      disconnect() {
        console.log('❌ Disconnected.');
      }
    };
  }
/*When the ChatRoom component mounts, the connection.connect() runs, logging:
Connecting...
When the component unmounts (e.g., when navigating away), the cleanup function is called:
Disconnected.
If the component mounts again (e.g., navigating back), the connection is re-established:
Connecting...
*/



/*4.Controlling non-React widgets:-
                                     ->Always use useRef for accessing the external widget
                                     ->Implement cleanup functions 
                                     ->Avoid unnecessary effect re-runs
*/
useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    
    // Cleanup function to close the dialog before re-running the effect
    return () => dialog.close();
  }, []);



//5.Subscribing to events:-If your Effect subscribes to something, the cleanup function should unsubscribe
useEffect(() => {
    function handleScroll(e) {
      console.log(window.scrollX, window.scrollY);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);   //cleanup function
  }, []);


//6.Triggering animations:-If your Effect animates something in, the cleanup function should reset the animation to the initial values
useEffect(() => {
    const node = ref.current;
    node.style.opacity = 1; // Trigger the animation
    return () => {
      node.style.opacity = 0; //Cleanup function,resettting the inital value
    };
  }, []);



//7.Fetching data:-If your Effect fetches something, the cleanup function should either abort the fetch or ignore its result
useEffect(() => {
    let ignore = false;
  
    async function startFetching() {
      const json = await fetchTodos(userId);
      if (!ignore) {
        setTodos(json);
      }
    }
  
    startFetching();
  
    return () => {
      ignore = true;
    };
  }, [userId]);




/*8.Not an Effect:-
                    1.Initializing the application:Some logic should only run once when the application starts. You can put it outside your components
*/
if (typeof window !== 'undefined') {  //logic outside component,logic only runs once after the browser loads the page.
    checkAuthToken();
    loadDataFromLocalStorage();
  }
  
  function App() {
    // ...
  }
//Example
import { useState, useEffect } from 'react';

function Playground() {
  const [text, setText] = useState('a');

  useEffect(() => {
    function onTimeout() {
      console.log('⏰ ' + text);
    }

    console.log('🔵 Schedule "' + text + '" log');
    const timeoutId = setTimeout(onTimeout, 3000);

    return () => {
      console.log('🟡 Cancel "' + text + '" log');
      clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <>
      <label>
        What to log:{' '}
        <input
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </label>
      <h1>{text}</h1>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Unmount' : 'Mount'} the component
      </button>
      {show && <hr />}
      {show && <Playground />}
    </>
  );
}
/*This example uses setTimeout to schedule a console log with the input text to appear three seconds after the Effect runs.
The cleanup function cancels the pending timeout.*/