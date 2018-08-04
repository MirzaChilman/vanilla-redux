/* 
  1. Store
  2. Action/Dispatcher
  3. Reducer (state,action), pure function
  predictable
*/

// ACTION
action :{
  type:'TAMBAH_LIST',
  list: {
    id:0,
    data:'Belajar',
    complete: false
  }
}
{
  type:'HAPUS_LIST',
    id:0,
}
{
  type:'TAMBAH_MAHASISWA',
  mahasiswa: {
    id:1,
    name:'Mirza',
    age: 17
  }
}


// 1. dengan argument yang sama akan menghasilkan output sama
// 2. dia hanya bersanding dengan argument yang emang di pass kan mereka
// 3. tidak menyebabkan side effect

state = [
  {
    id:1
  },
  {
    id:2
  },

]

//Reducer
function todos(state = [], action){
  switch(action.type){
    case 'TAMBAH_LIST':
      return state.concat([action.list])
    case 'HAPUS_LIST':
      return state.filter(l=> l.id !== action.id) //ketika true stay, ketika false out
    case 'TOGGLE_LIST':
      return state.map(l => l.id !== action.id ? l : 
        Object.assign({}, l , {complete: !l.complete})
      )
    default:
      return state
  }
  
  /* if(action.type === 'TAMBAH_LIST'){
    return state.concat([action.list])
  }else if(action.type === 'HAPUS_LIST'){
    return state.filter(l=> l.id !== action.id)
  }else if(action.type === 'TOGGLE_LIST'){
    return state.map(l => l.id !== action.id ? todo : {
      name:todo.name,
      id: todo.id,
      complete: !todo.complete
    })
  } */
  return state
}


function createStore() {
  /* 
    1. State
    2. Get State
    3. Listen to changes on the state
    4. Update state

    mengembalikan sebuah object
  */

  // membuat state
  let state; //[{list}]
  let listeners = [];

  // mendapatkan stata
  const getState = () => state;

  // Listen to changes
  const subscribe = list => {
    listeners.push(list);
    return () => {
      listeners = listeners.filter(l => l !== list);
    };
  };

  const dispatch = (action) => {
    // call action, membutuhkan state, action.type
    state = todos(state,action)

    //looping pada listeners
    listeners.forEach((list) => list())
  }
  

  return {
    getState,
    subscribe,
    dispatch
  };
}

const store = createStore();
const unsubscribe = store.subscribe(() => {
  console.log('NEW STATE IS:', store.getState())
})

store.dispatch({
  type:'TAMBAH_LIST',
  list: {
    id:0,
    data:'Belajar',
    complete: false
  }
})