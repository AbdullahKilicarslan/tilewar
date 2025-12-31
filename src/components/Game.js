import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const Game = () => {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  
  const GRID_ROWS = 7;
  const GRID_COLS = 10;
  const HEX_DEPTH = 15; // Blok yüksekliği

  const TEXTURE_LIST = [
    require('../assets/tile/grass-tile.png'),
    require('../assets/tile/m-tile.png'),
    //require('../assets/tile/water-tile.png'),
    //require('../assets/tile/sand-tile.png'),
  ];

  useEffect(() => {
    if (appRef.current) return;

    const initApp = async () => {
      const app = new PIXI.Application();
      await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x1a1a1a,
        antialias: true,
      });

      if (containerRef.current) {
        containerRef.current.innerHTML = ''; 
        containerRef.current.appendChild(app.canvas);
      }
      appRef.current = app;

      const loadedTextures = await Promise.all(
        TEXTURE_LIST.map(path => PIXI.Assets.load(path))
      );

      // Ana Grid Container
      const gridContainer = new PIXI.Container();
      app.stage.addChild(gridContainer);

      const hexRadius = 50;
      const hexHeight = Math.sqrt(3) * hexRadius;
      const hexWidth = 2 * hexRadius;

      // Altıgen köşe noktaları
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        points.push(hexRadius * Math.cos(angle), hexRadius * Math.sin(angle));
      }

      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          
          let x = col * (hexWidth * 0.75);
          let y = row * hexHeight;
          if (col % 2 !== 0) y += hexHeight / 2;

          const cellContainer = new PIXI.Container();
          cellContainer.x = x;
          cellContainer.y = y;
          gridContainer.addChild(cellContainer);

          // 1. Yan Yüzey (Kalınlık Efekti)
          // Bu kısım bloğun "gövdesini" oluşturur
          const wall = new PIXI.Graphics();
          wall.beginFill(0x333333); // Daha koyu gölge rengi
          wall.drawPolygon(points);
          wall.endFill();
          wall.y = HEX_DEPTH; // Derinlik kadar aşağıda
          cellContainer.addChild(wall);

          // 2. Üst Yüzey (Texture)
          const randomTexture = loadedTextures[Math.floor(Math.random() * loadedTextures.length)];
          const sprite = new PIXI.Sprite(randomTexture);
          sprite.anchor.set(0.5);
          sprite.width = hexWidth * 1.02;
          sprite.height = hexHeight * 1.02;

          const mask = new PIXI.Graphics();
          mask.beginFill(0xffffff);
          mask.drawPolygon(points);
          mask.endFill();
          
          sprite.mask = mask;
          cellContainer.addChild(mask);
          cellContainer.addChild(sprite);

          // 3. Etkileşim
          const interaction = new PIXI.Graphics();
          interaction.beginFill(0xffffff, 0);
          interaction.drawPolygon(points);
          interaction.endFill();
          interaction.interactive = true;
          interaction.cursor = 'pointer';

          interaction.on('pointerdown', () => {
            cellContainer.y += 5; // Tıklayınca basılma hissi
            setTimeout(() => cellContainer.y -= 5, 100);
          });

          cellContainer.addChild(interaction);
        }
      }

      // --- PERSPEKTİF AYARI (15 Derece Yatırma) ---
      // 15 derece yaklaşık 0.26 radyandır.
      // scaleY değerini düşürerek tepeden bakış açısını daraltıyoruz.
      gridContainer.scale.y = 0.7; // Dikeyde basıklaştır (yaklaşık 15 derece hissi)
      gridContainer.skew.x = -0.1;     // İstersen izometrik için -0.1 gibi değerler verebilirsin
      
      // Gridi ekrana ortala
      gridContainer.x = (app.screen.width - gridContainer.width) / 2 + 50;
      gridContainer.y = (app.screen.height - gridContainer.height) / 2;
    };

    initApp().catch(err => console.error(err));

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh', overflow: 'hidden' }} />;
};

export default Game;