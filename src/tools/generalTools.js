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

  const getVariantColor = (hex, amount = 10) => {
    // HEX'i RGB'ye çevir
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Rastgele bir sapma ekle (-amount ile +amount arası)
    const offset = () => Math.floor(Math.random() * amount * 2) - amount;

    r = Math.min(255, Math.max(0, r + offset()));
    g = Math.min(255, Math.max(0, g + offset()));
    b = Math.min(255, Math.max(0, b + offset()));

    // Tekrar HEX'e çevir
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };



const generalTools = {
  shuffleArray,
  getVariantColor
};

export default generalTools;