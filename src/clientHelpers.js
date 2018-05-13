import Immutable from 'immutable';

export const birdGroups = {
  Procellariiformes: 'Albatrosses and Petrels',
  Falconiformes: 'Birds of Prey',
  Charadriiformes: 'Buttonquails',
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

export const birdFamilies = {
	"Struthioniformes": ["Struthionidae", "Casuariidae"],
	"Anseriformes": ["Anseranatidae", "Anatidae"],
	"Galliformes": ["Megapodiidae", "Numididae", "Odontophoridae", "Phasianidae"],
	"Podicepiformes": ["Phoenicopteridae", "Podicipedidae"],
	"Columbiformes": ["Columbidae"],
	"Cuculiformes": ["Cuculidae"],
	"Otidiformes": ["Otididae"],
	"Caprimulgiformes": ["Podargidae", "Eurostopodidae", "Caprimulgidae", "Aegothelidae", "Apodidae"],
	"Gruiformes": ["Rallidae", "Gruidae"],
	"Charadriiformes": ["Burhinidae", "Chionididae", "Haematopodidae", "Recurvirostridae", "Charadriidae", "Pedionomidae", "Rostratulidae", "Jacanidae", "Scolopacidae", "Turnicidae", "Glareolidae", "Stercorariidae", "Laridae"],
	"Phaetontiformes": ["Phaethontidae"],
	"Sphenisciformes": ["Spheniscidae"],
	"Procellariiformes": ["Oceanitidae", "Diomedeidae", "Hydrobatidae", "Procellariidae"],
	"Pelecaniformes": ["Ciconiidae", "Pelicanidae", "Ardeidae", "Threskiornithidae", "Fregatidae", "Sulidae", "Phalacrocoracidae", "Anhingidae"],
	"Accipitriformes": ["Pandionidae", "Accipitridae"],
	"Strigiformes": ["Tytonidae", "Strigidae"],
	"Bucerotiformes": ["Upupidae"],
	"Coraciiformes": ["Meropidae", "Coraciidae", "Alcedinidae"],
	"Falconiformes": ["Falconidae"],
	"Psittaciformes": ["Cacatuidae", "Psittaculidae"],
	"Passeriformes": ["Pittidae", "Menuridae", "Atrichornithidae", "Ptilonorhynchidae", "Climacteridae", "Maluridae", "Dasyornithidae", "Meliphagidae", "Pardalotidae", "Acanthizidae", "Orthonychidae", "Pomatostomidae", "Neosittidae", "Campephagidae", "Cinclosomatidae", "Pachycephalidae", "Falcunculidae", "Oreoicidae", "Psophodidae", "Oriolidae", "Machaerirhynchidae", "Artamidae", "Dicruridae", "Rhipiduridae", "Laniidae", "Corvidae", "Monarchidae", "Corcoracidae", "Paradisaeidae", "Petroicidae", "Dicaeidae", "Nectariniidae", "Estrildidae", "Passeridae", "Motacillidae", "Emberizidae", "Fringillidae", "Alaudidae", "Cisticolidae", "Locustellidae", "Acrocephalidae", "Hirundinidae", "Pycnonotidae", "Phylloscopidae", "Zosteropidae", "Sturnidae", "Muscicapidae", "Turdidae"]
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
  // console.log(aspect);
  const numbers = aspect.split(':').map( number => parseInt(number));
  const ratio = numbers[0] / numbers[1];
  // return (ratio > 1) ? 'Landscape' : 'Portrait';
  // console.log(ratio);
  switch (true) {
    case (ratio >= 1.55 && ratio < 1.85):
      // console.log('16to9');
      return '16to9';
    case (ratio >= 1.4 && ratio < 1.54):
      // console.log('3to2');
      return '3to2';
    case (ratio >= 1.2 && ratio < 1.4):
      // console.log('4to3');
      return '4to3';
    // portrait
    case (ratio >= .4 && ratio < .63):
      // console.log('9to16');
      return '9to16';
    case (ratio >= .63 && ratio < .7):
      // console.log('2to3');
      return '2to3';
    case (ratio >= .7 && ratio < .9):
      // console.log('3to4');
      return '3to4';            
    default:
      return 'other';   
  }
}

// can be used to convert an immutanle list to map eg var birdNerdsAsMap = indexBy(birdNerds, '_id')
export const indexBy = (iterable, searchKey) => {
      return iterable.reduce(
          (lookup, item) => lookup.set(item.get(searchKey), item),
          Immutable.Map()
      );
  }