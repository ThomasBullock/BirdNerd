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

// this is a bit of a hack to resize images off cloudinary 
export const cloudinaryUrlModify = (arr, width) => {
      arr.splice(6, 0, width);
      return arr.join('/');
}