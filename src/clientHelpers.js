export const birdGroups = {
  Procellariiformes: 'Albatrosses and Petrels',
  Falconiformes: 'Birds of Prey',
  Turniciformes: 'Buttonquails',
  Casuariiformes: 'Cassowaries and Emus',
  Gruiformes: 'Cranes, Coots and Rails',
  Cuculiformes: 'Cuckoos and Turacos',
  Phoenicopteriformes: 'Flamingos',
  Galliformes: 'Gamebirds', 
  Podicipediformes: 'Grebes', 
  Ciconiiformes: 'Herons and Storks', 
  Apodiformes: 'Hummingbirds and Swifts', 
  Coraciiformes: 'Kingfishers',
  Apterygiformes: 'Kiwis',
  Gaviiformes: 'Loons',
  Coliiformes: 'Mousebirds',
  Caprimulgiformes: 'Nightjars and Frogmouths',
  Struthioniformes: 'The Ostrich',
  Strigiformes: 'Owls', 
  Psittaciformes: 'Parrots and Cockatoos', 
  Pelecaniformes: 'Pelicans, Cormorants and Frigatebirds', 
  Sphenisciformes: 'Penguins', 
  Passeriformes: 'Perching Birds',
  Columbiformes: 'Pigeons and Doves',
  Rheiformes: 'Rheas', 
  Pteroclidiformes: 'Sandgrouses', 
  Tinamiformes: 'Tinamous', 
  Trogoniformes: 'Trogons and Quetzals', 
  Anseriformes: 'Waterfowl',
  Piciformes: 'Woodpeckers and Toucans'   
}

export const conservationStatus = [
  'Least Concern', 'Conservation Dependent', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct in the Wild'
]    


// this is a bit of a hack to resize images off cloudinary 
export const cloudinaryUrlModify = (arr, width) => {
  arr.splice(6, 0, width);
  return arr.join('/');
}

export const aspectRatio = (aspect) => {
  const numbers = aspect.split(':').map( number => parseInt(number));
  const ratio = numbers[0] / numbers[1];
  return (ratio > 1) ? 'Landscape' : 'Portrait';
}

export const aspectRatioClass = (aspect) => {
  console.log(aspect);
  const numbers = aspect.split(':').map( number => parseInt(number));
  const ratio = numbers[0] / numbers[1];
  // return (ratio > 1) ? 'Landscape' : 'Portrait';
  console.log(ratio);
  switch (true) {
    case (ratio >= 1.55 && ratio < 1.85):
      console.log('16to9');
      return '16to9';
    case (ratio >= 1.4 && ratio < 1.54):
      console.log('3to2');
      return '3to2';
    case (ratio >= 1.2 && ratio < 1.4):
      console.log('4to3');
      return '4to3';
    // portrait
    case (ratio >= .4 && ratio < .63):
      console.log('9to16');
      return '9to16';
    case (ratio >= .63 && ratio < .7):
      console.log('2to3');
      return '2to3';
    case (ratio >= .7 && ratio < .9):
      console.log('3to4');
      return '3to4';            
    default:
      return 'other';   
  }
}
