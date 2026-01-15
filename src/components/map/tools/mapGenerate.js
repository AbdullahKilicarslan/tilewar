import React from 'react'
import generalTools from '../../../tools/generalTools';


const Map1 = () => {
    const hexSize = 1;
    const xSpacing = Math.sqrt(3) * hexSize;
    const zSpacing = 1.5 * hexSize;


    let strongholds = [];
    const temp = [];
    const mapRadius = 6;
    const centerRow = 6;


    for (let r = 0; r <= 12; r++) {
        const rowWidth = 18 - Math.abs(centerRow - r);
        for (let c = 0; c < rowWidth; c++) {
            const x = (c + Math.abs(r - centerRow) / 2) * xSpacing;
            const z = r * zSpacing;

            let height = Math.random() > 0.7 ? (1 + Math.random()) : 1; // Dağlar biraz daha yüksek
            let type = 'normal';

            // KONSEPT RENKLERİ
            // Çimen: Koyu orman yeşili/zeytin tonları
            // Dağ: Koyu taş grisi/kahve
            // Kenarlar/Kaleler: Altın/Bronz vurgular
            let m = height > 1;
            let cc = m ? '#7f550d' : '#274619';
            if (m)
                type = "m";
            else {
                if (Math.random() > 0.7)

                    type = "grass";
            }

            cc = generalTools.getVariantColor(cc, 15);
            // Köşe ve Stratejik Noktalar (Kırmızıyı "Kraliyet Kırmızısı"na çekiyoruz)
            if ((c === 0 && r === 0) || (c === rowWidth - 1 && r === 12) ||
                (c === 0 && r === 12) || (c === rowWidth - 1 && r === 0) ||
                (c === 0 && r === 6) || (c >= rowWidth - 1 && r === 6)) {
                cc = '#8b0000'; // Koyu Bordo (Kraliyet kırmızısı)
                height = 1.5;
                type = 'stronghold';
            }

            if (cc == '#8b0000')
                strongholds.push({ r, c });

            // Altın Madeni
            const rand = Math.random();
            if (rand > 0.95) {
                cc = '#d4af37'; // HUD'daki Altın Rengi
                type = 'gold';
            } else if (rand > 0.92) {
                cc = '#236cb6'; // Safir Mavisi (Su veya Mana kaynağı)
                type = 'mana';
                height = height - (1 - rand) * 4;
            }

            temp.push({
                id: `hex-${r}-${c}`,
                position: [x, height / 2, z],
                height: height,
                color: cc,
                emissive: cc,
                emissiveIntensity: type === 'gold' || type === 'stronghold' ? 0.4 : 0.1,
                type: type
            });
        }
    }
    return { map: temp, strongholds: strongholds };

};

const Map2 = () => {
    const hexSize = 1;
    const xSpacing = Math.sqrt(3) * hexSize;
    const zSpacing = 1.5 * hexSize;


    let strongholds = [];
    const temp = [];
    const mapRadius = 6;
    const centerRow = 6;


    for (let r = 0; r <= 12; r++) {
        const rowWidth = 18 - Math.abs(centerRow - r);
        for (let c = 0; c < rowWidth; c++) {
            const x = (c + Math.abs(r - centerRow) / 2) * xSpacing;
            const z = r * zSpacing;

            let height = Math.random() > 0.7 ? (1 + Math.random()) : 1; // Dağlar biraz daha yüksek
            let type = 'normal';

            // KONSEPT RENKLERİ
            // Çimen: Koyu orman yeşili/zeytin tonları
            // Dağ: Koyu taş grisi/kahve
            // Kenarlar/Kaleler: Altın/Bronz vurgular
            let cc = height > 1 ? '#7f550d' : '#274619';
            cc = generalTools.getVariantColor(cc, 15);
            // Köşe ve Stratejik Noktalar (Kırmızıyı "Kraliyet Kırmızısı"na çekiyoruz)
            if ((c === 0 && r === 0) || (c === rowWidth - 1 && r === 12) ||
                (c === 0 && r === 12) || (c === rowWidth - 1 && r === 0) ||
                (c === 0 && r === 6) || (c >= rowWidth - 1 && r === 6)) {
                cc = '#8b0000'; // Koyu Bordo (Kraliyet kırmızısı)
                height = 1.5;
                type = 'stronghold';
            }

            if (cc == '#8b0000')
                strongholds.push({ r, c });

            // Altın Madeni
            const rand = Math.random();
            if (rand > 0.95) {
                cc = '#d4af37'; // HUD'daki Altın Rengi
                type = 'gold';
            } else if (rand > 0.92) {
                cc = '#236cb6'; // Safir Mavisi (Su veya Mana kaynağı)
                type = 'mana';
                height = height - (1 - rand) * 4;
            }

            temp.push({
                id: `hex-${r}-${c}`,
                position: [x, height / 2, z],
                height: height,
                color: cc,
                emissive: cc,
                emissiveIntensity: type === 'gold' || type === 'stronghold' ? 0.4 : 0.1,
                type: type
            });
        }
    }
    return { map: temp, strongholds: strongholds };

};


const Map3 = () => {
    const hexSize = 1;
    const xSpacing = Math.sqrt(3) * hexSize;
    const zSpacing = 1.5 * hexSize;


    let strongholds = [];
    const temp = [];
    const mapRadius = 6;
    const centerRow = 6;


    for (let r = 0; r <= 12; r++) {
        const rowWidth = 18 - Math.abs(centerRow - r);
        for (let c = 0; c < rowWidth; c++) {
            const x = (c + Math.abs(r - centerRow) / 2) * xSpacing;
            const z = r * zSpacing;

            let height = Math.random() > 0.7 ? (1 + Math.random()) : 1; // Dağlar biraz daha yüksek
            let type = 'normal';

            // KONSEPT RENKLERİ
            // Çimen: Koyu orman yeşili/zeytin tonları
            // Dağ: Koyu taş grisi/kahve
            // Kenarlar/Kaleler: Altın/Bronz vurgular
            let cc = height > 1 ? '#7f550d' : '#274619';
            cc = generalTools.getVariantColor(cc, 15);
            // Köşe ve Stratejik Noktalar (Kırmızıyı "Kraliyet Kırmızısı"na çekiyoruz)
            if ((c === 0 && r === 0) || (c === rowWidth - 1 && r === 12) ||
                (c === 0 && r === 12) || (c === rowWidth - 1 && r === 0) ||
                (c === 0 && r === 6) || (c >= rowWidth - 1 && r === 6)) {
                cc = '#8b0000'; // Koyu Bordo (Kraliyet kırmızısı)
                height = 1.5;
                type = 'stronghold';
            }

            if (cc == '#8b0000')
                strongholds.push({ r, c });

            // Altın Madeni
            const rand = Math.random();
            if (rand > 0.95) {
                cc = '#d4af37'; // HUD'daki Altın Rengi
                type = 'gold';
            } else if (rand > 0.92) {
                cc = '#236cb6'; // Safir Mavisi (Su veya Mana kaynağı)
                type = 'mana';
                height = height - (1 - rand) * 4;
            }

            temp.push({
                id: `hex-${r}-${c}`,
                position: [x, height / 2, z],
                height: height,
                color: cc,
                emissive: cc,
                emissiveIntensity: type === 'gold' || type === 'stronghold' ? 0.4 : 0.1,
                type: type
            });
        }
    }
    return { map: temp, strongholds: strongholds };

};
const generateByName = (mapName) => {
    // mapName string olarak gelir: "Map1", "Map2" veya "Map3"

    if (mapGenerate[mapName]) {
        const result = mapGenerate[mapName]();
        console.log(`${mapName} başarıyla oluşturuldu:`, result);
        return result;
    } else {
        console.error("Hata: Belirtilen isimde bir harita fonksiyonu bulunamadı!");
        return null;
    }
};
const mapGenerate = {
    Map1, Map2, Map3,
    generateByName
};

export default mapGenerate;