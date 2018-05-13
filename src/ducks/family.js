import { fromJS } from 'immutable';

const initialState = fromJS({

      Procellariiformes: ['Diomedeidae', 'Hydrobatidae', 'Procellariidae'],
      Psittaciformes: ['Cacatuoidea', 'Psittacoidea', 'Strigopoidea'], 
      Passeriformes: ['Artamidae', '	Laniidae', 'Melanocharitidae', 'Meliphagidae',  'Petroicidae', 'Rhipiduridae'], 

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
const family = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
      default:
        return state;
    }
  };
  
  
  export default family;
    