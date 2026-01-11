const deck1 = [
  // --- MEVCUT KARTLARINIZ ---
  {
    "id": "card_01",
    "name": "Zorunlu Yürüyüş",
    "apCost": 2,
    "type": "Military",
    "description": "Birim Menzili +2",
    "commands": [{ "action": "MOVE_BONUS", "target": "SELECTED_UNIT", "value": 2, "duration": "TURN" }]
  },
  {
    "id": "card_02",
    "name": "Gece Baskını",
    "apCost": 3,
    "type": "Military",
    "description": "Savunmayı Devre Dışı Bırak",
    "commands": [{ "action": "IGNORE_DEFENSE", "target": "ENEMY_UNIT", "value": true, "duration": "TURN" }]
  },
  {
    "id": "card_03",
    "name": "Kalkan Duvarı",
    "apCost": 2,
    "type": "Military",
    "description": "Savunma Gücü %50 Artar",
    "commands": [{ "action": "DEFENSE_MOD", "target": "SELECTED_UNIT", "value": 1.5, "duration": "NEXT_TURN" }]
  },
  {
    "id": "card_04",
    "name": "Yankesici Okçular",
    "apCost": 3,
    "type": "Military",
    "description": "1 Hücre Uzaktan Hasar Ver",
    "commands": [{ "action": "REMOTE_DAMAGE", "target": "ENEMY_UNIT", "range": 1, "value": 10 }]
  },
  {
    "id": "card_07",
    "name": "Paralı Asker",
    "apCost": 5,
    "type": "Military",
    "description": "Kalede Birim Oluştur",
    "commands": [{ "action": "SPAWN_UNIT", "unitType": "SOLDIER", "target": "STRONGHOLD", "costFree": true }]
  },
  {
    "id": "card_13",
    "name": "Altın Damarı",
    "apCost": 2,
    "type": "Economy",
    "description": "Altın Verimi x2",
    "commands": [{ "action": "RESOURCE_MULTIPLIER", "target": "CELL_GOLD", "value": 2, "duration": "TURN" }]
  },
  {
    "id": "card_21",
    "name": "Bereketli Hasat",
    "apCost": 2,
    "type": "Economy",
    "description": "5 Hücre Başına +1 Altın",
    "commands": [{ "action": "RESOURCE_GAIN", "resource": "GOLD", "calculation": "CELL_COUNT / 5" }]
  },
  {
    "id": "card_23",
    "name": "Sarp Dağlar",
    "apCost": 3,
    "type": "Terrain",
    "description": "Hücreyi Dağa Dönüştür",
    "commands": [{ "action": "CHANGE_CELL_TYPE", "target": "SELECTED_CELL", "to": "MOUNTAIN" }]
  },
  {
    "id": "card_31",
    "name": "Zaman Bükümü",
    "apCost": 6,
    "type": "Magic",
    "description": "Tur Uzat ve +3 AP Al",
    "commands": [{ "action": "AP_GAIN", "value": 3 }, { "action": "EXTEND_TURN", "value": true }]
  },
  {
    "id": "card_37",
    "name": "Kurban Etme",
    "apCost": 0,
    "type": "Magic",
    "description": "Birim Feda Et, +4 AP Al",
    "commands": [{ "action": "DESTROY_UNIT", "target": "SELECTED_FRIENDLY" }, { "action": "AP_GAIN", "value": 4 }]
  },
  {
    "id": "card_40",
    "name": "Büyük Plan",
    "apCost": 2,
    "type": "Magic",
    "description": "Eli At ve 3 Kart Çek",
    "commands": [{ "action": "DISCARD_HAND", "target": "SELF" }, { "action": "DRAW_CARD", "count": 3 }]
  },

  // --- YENİ EKLENEN KARTLAR (Toplam 40'a tamamlayanlar) ---
  {
    "id": "card_05",
    "name": "Demir Disiplin",
    "apCost": 1,
    "type": "Military",
    "description": "Seçili birimin moralini düzeltir.",
    "commands": [{ "action": "STATUS_REMOVE", "target": "SELECTED_UNIT", "status": "PANIC" }]
  },
  {
    "id": "card_06",
    "name": "Öncü Süvariler",
    "apCost": 4,
    "type": "Military",
    "description": "Savaş alanında sisli bölgeleri açar.",
    "commands": [{ "action": "REVEAL_FOG", "radius": 3 }]
  },
  {
    "id": "card_08",
    "name": "Mancınık Atışı",
    "apCost": 4,
    "type": "Military",
    "description": "Düşman binalarına yüksek hasar verir.",
    "commands": [{ "action": "STRUCTURE_DAMAGE", "value": 50 }]
  },
  {
    "id": "card_09",
    "name": "Puslu Vadi",
    "apCost": 2,
    "type": "Military",
    "description": "Birimleriniz bu tur hedef alınamaz.",
    "commands": [{ "action": "STEALTH_MODE", "duration": "TURN" }]
  },
  {
    "id": "card_10",
    "name": "Levazım Kolu",
    "apCost": 1,
    "type": "Economy",
    "description": "Birim bakım maliyetlerini %20 düşürür.",
    "commands": [{ "action": "MAINTENANCE_REDUCTION", "value": 0.2 }]
  },
  {
    "id": "card_11",
    "name": "Tuzak Kurma",
    "apCost": 3,
    "type": "Military",
    "description": "Bir hücreye gizli tuzak yerleştirir.",
    "commands": [{ "action": "PLACE_TRAP", "damage": 20 }]
  },
  {
    "id": "card_12",
    "name": "Ticaret Kervanı",
    "apCost": 2,
    "type": "Economy",
    "description": "Anında 15 Altın kazandırır.",
    "commands": [{ "action": "RESOURCE_GAIN", "resource": "GOLD", "value": 15 }]
  },
  {
    "id": "card_14",
    "name": "Vergi Reformu",
    "apCost": 4,
    "type": "Economy",
    "description": "Her tur gelen altını +5 artırır.",
    "commands": [{ "action": "PASSIVE_GAIN", "resource": "GOLD", "value": 5 }]
  },
  {
    "id": "card_15",
    "name": "Borsa Spekülasyonu",
    "apCost": 3,
    "type": "Economy",
    "description": "Elinizdeki her kart için 2 Altın verir.",
    "commands": [{ "action": "GOLD_PER_CARD", "value": 2 }]
  },
  {
    "id": "card_16",
    "name": "Gümrük Kapısı",
    "apCost": 2,
    "type": "Economy",
    "description": "Düşman her kart çektiğinde 1 Altın alırsınız.",
    "commands": [{ "action": "TAX_ON_DRAW", "value": 1 }]
  },
  {
    "id": "card_17",
    "name": "Maden İşçileri",
    "apCost": 3,
    "type": "Economy",
    "description": "Dağ hücrelerinden gelen verimi artırır.",
    "commands": [{ "action": "MOUNTAIN_BOOST", "value": 2 }]
  },
  {
    "id": "card_18",
    "name": "Kayıp Hazine",
    "apCost": 1,
    "type": "Economy",
    "description": "Rastgele bir hücreden altın bulur.",
    "commands": [{ "action": "RANDOM_RESOURCE", "resource": "GOLD" }]
  },
  {
    "id": "card_19",
    "name": "Lonca Kurulması",
    "apCost": 5,
    "type": "Economy",
    "description": "Bina inşaat maliyetlerini yarıya indirir.",
    "commands": [{ "action": "CONSTRUCTION_MOD", "value": 0.5 }]
  },
  {
    "id": "card_20",
    "name": "Tarım Alanı",
    "apCost": 2,
    "type": "Terrain",
    "description": "Hücreyi Ovaya dönüştürür.",
    "commands": [{ "action": "CHANGE_CELL_TYPE", "to": "PLAINS" }]
  },
  {
    "id": "card_22",
    "name": "Sık Ormanlar",
    "apCost": 3,
    "type": "Terrain",
    "description": "Hücreyi Ormana dönüştürür (Savunma +1).",
    "commands": [{ "action": "CHANGE_CELL_TYPE", "to": "FOREST" }]
  },
  {
    "id": "card_24",
    "name": "Bataklık",
    "apCost": 4,
    "type": "Terrain",
    "description": "Hücreyi Bataklığa dönüştürür (Hız -2).",
    "commands": [{ "action": "CHANGE_CELL_TYPE", "to": "SWAMP" }]
  },
  {
    "id": "card_25",
    "name": "Derin Göl",
    "apCost": 3,
    "type": "Terrain",
    "description": "Hücreyi Suya dönüştürür.",
    "commands": [{ "action": "CHANGE_CELL_TYPE", "to": "WATER" }]
  },
  {
    "id": "card_26",
    "name": "Yol İnşaatı",
    "apCost": 2,
    "type": "Terrain",
    "description": "Hücreden geçiş maliyetini düşürür.",
    "commands": [{ "action": "MOVE_COST_REDUCTION", "value": 1 }]
  },
  {
    "id": "card_27",
    "name": "Gözcü Kulesi",
    "apCost": 2,
    "type": "Terrain",
    "description": "Hücreye görüş menzili ekler.",
    "commands": [{ "action": "ADD_VISION", "value": 5 }]
  },
  {
    "id": "card_28",
    "name": "Kutsal Toprak",
    "apCost": 4,
    "type": "Terrain",
    "description": "Birimler bu hücrede can yeniler.",
    "commands": [{ "action": "HEAL_ZONE", "value": 5 }]
  },
  {
    "id": "card_29",
    "name": "Zehirli Gaz",
    "apCost": 3,
    "type": "Magic",
    "description": "Bir bölgeye her tur hasar verir.",
    "commands": [{ "action": "DOT_DAMAGE", "value": 5, "duration": 3 }]
  },
  {
    "id": "card_30",
    "name": "Alev Fırtınası",
    "apCost": 5,
    "type": "Magic",
    "description": "Geniş bir alana 20 hasar verir.",
    "commands": [{ "action": "AOE_DAMAGE", "value": 20, "radius": 2 }]
  },
  {
    "id": "card_32",
    "name": "Zihin Kontrolü",
    "apCost": 7,
    "type": "Magic",
    "description": "Düşman birimini geçici olarak kontrol et.",
    "commands": [{ "action": "CONTROL_UNIT", "duration": 1 }]
  },
  {
    "id": "card_33",
    "name": "Karanlık Ayin",
    "apCost": 2,
    "type": "Magic",
    "description": "2 Kart Çek, 5 Can Kaybet.",
    "commands": [{ "action": "DRAW_CARD", "count": 2 }, { "action": "SELF_DAMAGE", "value": 5 }]
  },
  {
    "id": "card_34",
    "name": "Yıldırım Çarpması",
    "apCost": 4,
    "type": "Magic",
    "description": "Tek bir hedefe 30 hasar verir.",
    "commands": [{ "action": "SINGLE_DAMAGE", "value": 30 }]
  },
  {
    "id": "card_35",
    "name": "Kutsal Kalkan",
    "apCost": 3,
    "type": "Magic",
    "description": "Birim hasar almaz hale gelir (1 vuruş).",
    "commands": [{ "action": "SHIELD_BUFF", "charges": 1 }]
  },
  {
    "id": "card_36",
    "name": "Görünmezlik Duvarı",
    "apCost": 3,
    "type": "Magic",
    "description": "Rakipten bir kart çal.",
    "commands": [{ "action": "STEAL_CARD", "count": 1 }]
  },
  {
    "id": "card_38",
    "name": "Yeniden Doğuş",
    "apCost": 8,
    "type": "Magic",
    "description": "Ölen son birimi canlandırır.",
    "commands": [{ "action": "RESURRECT_LAST_UNIT" }]
  },
  {
    "id": "card_39",
    "name": "Buz Kilidi",
    "apCost": 2,
    "type": "Magic",
    "description": "Düşmanı bu tur dondurur (Hareket edemez).",
    "commands": [{ "action": "FREEZE_UNIT", "duration": 1 }]
  }
];

export default deck1;