import React from 'react'


const shuffleArray = (array) => {
  // Orijinal diziyi bozmamak için kopyasını alıyoruz
  const shuffled = [...array]; 
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    // 0 ile i arasında rastgele bir tam sayı seç
    const j = Math.floor(Math.random() * (i + 1));
    
    // Elemanları yer değiştir (Destructuring assignment)
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};


const generalTools = {
  shuffleArray
};

export default generalTools;