import { fromJS } from 'immutable';

const initialState = fromJS({
    order:  'Procellariiformes'
});
//     'Procellariiformes',
//     'Falconiformes',
//     'Turniciformes',
//     'Casuariiformes',
//    , 
//     'Columbiformes',
//     'Rheiformes', 
//   ]);

// Reducer
const groups = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
      default:
        return state;
    }
  };
  
  
  export default groups;
    