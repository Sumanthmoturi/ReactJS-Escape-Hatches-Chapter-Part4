/*1.You might not need an Effect:-
                                 1.Effects are an escape hatch from the React paradigm. They let you step outside of React and synchronize your components with some external system
                                 2.If there is no external system involved,you shouldn’t need an Effect. 
                                 3.Removing unnecessary Effects will make your code easier to follow, faster to run and less errors
*/



/*2.Removing unnecessary Effects:- Two common cases in which you don’t need Effects are:
                                 1.You don’t need Effects to transform data for rendering.
                                 2.You don’t need Effects to handle user events.
*/



/*3.Updating state based on props or state:-
                                            1.When something can be calculated from the existing props or state, don’t put it in state. 
                                            2.Instead, calculate it during rendering.
*/
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  const fullName = firstName + ' ' + lastName;          //you don't need effects to transform data for rendering
  // ...
}



/*4.Caching expensive calculations:-  
                                    1.You can cache an expensive calculation by wrapping it in a useMemo Hook.
                                    2.To cache expensive calculations, add useMemo instead of useEffect.
*/
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}




//5.Resetting all state when a prop changes:-To reset the state of an entire component tree, pass a different key to it.
//Wrong
export default function ProfilePage({ userId }) {
    const [comment, setComment] = useState('');
    useEffect(() => {         //Avoid Resetting state on prop change in an Effect
      setComment('');
    }, [userId]);
    // ...
  }
//right
export default function ProfilePage({ userId }) {
    return (
      <Profile
        userId={userId}
        key={userId}
      />
    );
  }
  
  function Profile({ userId }) {
    const [comment, setComment] = useState('');
    // ...
  }



//6.Adjusting some state when a prop changes:-To reset a particular bit of state in response to a prop change, set it during rendering.
//Adjust state directly during rendering
function List({ items }) {
    const [isReverse, setIsReverse] = useState(false);
    const [selection, setSelection] = useState(null);
  
    // Better: Adjust the state while rendering
    const [prevItems, setPrevItems] = useState(items);
    if (items !== prevItems) {
      setPrevItems(items);
      setSelection(null);
    }
    // ...
  }



/*7.Sending a POST request :-
                              1.example:-This Form component sends two kinds of POST requests. It sends an analytics event when it mounts. 
                              2.When you fill in the form and click the Submit button, it will send a POST request to the /api/register endpoint
                              3.Delete the second Effect and move that POST request into the event handler for better code 
*/
function Form() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    //Good: This logic runs because the component was displayed
    useEffect(() => {
      post('/analytics/event', { eventName: 'visit_form' });
    }, []);
  
    function handleSubmit(e) {
      e.preventDefault();
      //Good: Event-specific logic is in the event handler
      post('/api/register', { firstName, lastName });
    }
    // ...
  }



/*8. Chains of computations:-
                              1.Sometimes you might feel tempted to chain Effects that each adjust a piece of state based on other state
                              2.It's better to calculate what you can during rendering, and adjust the state in the event handler
*/
function Game() {
    const [card, setCard] = useState(null);
    const [goldCardCount, setGoldCardCount] = useState(0);
    const [round, setRound] = useState(1);
  
    // ✅ Calculate what you can during rendering
    const isGameOver = round > 5;
  
    function handlePlaceCard(nextCard) {
      if (isGameOver) {
        throw Error('Game already ended.');
      }
  
      // ✅ Calculate all the next state in the event handler
      setCard(nextCard);
      if (nextCard.gold) {
        if (goldCardCount <= 3) {
          setGoldCardCount(goldCardCount + 1);
        } else {
          setGoldCardCount(0);
          setRound(round + 1);
          if (round === 5) {
            alert('Good game!');
          }
        }
      }
    }
  


//9.Notifying parent components about state changes 
//the component is fully controlled by its parent
function Toggle({ isOn, onChange }) {
    function handleClick() {
      onChange(!isOn);
    }
  
    function handleDragEnd(e) {
      if (isCloserToRightEdge(e)) {
        onChange(true);
      } else {
        onChange(false);
      }
    }
  
    // ...
  }
}



//10.Passing data to the parent 
//Wrong
function Parent() {
    const [data, setData] = useState(null);
    // ...
    return <Child onFetched={setData} />;
  }
  
  function Child({ onFetched }) {
    const data = useSomeAPI();
    //Avoid: Passing data to the parent in an Effect
    useEffect(() => {
      if (data) {
        onFetched(data);
      }
    }, [onFetched, data]);
    // ...
  }
//right
function Parent() {
    const data = useSomeAPI();
    // ...
    // Passing data down to the child
    return <Child data={data} />;
  }
  
  function Child({ data }) {
    // ...
  }


