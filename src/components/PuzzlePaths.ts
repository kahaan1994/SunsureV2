export const VIEWBOX_WIDTH = 1600;
export const VIEWBOX_HEIGHT = 900;
export const OVERLAY_OPACITY = 0.15;

export const PIPELINE_VIDEO = {
  id: 'pipeline-bg',
  videoUrl: '/videos/1789535778038-616369_Electronics System Server Room Animated_By_Daniel_Megias_Del_Pozo_Artlist_HD.mp4'
};

export const puzzlePieces = [
  {
    id: 'data-centres',
    name: 'Data Centres',
    path: 'M 0,0 L 700,0 L 700,300 L 900,300 L 900,500 L 0,500 Z',
    clipPolygon: '0% 0%, 43.75% 0%, 43.75% 33.3333%, 56.25% 33.3333%, 56.25% 55.5556%, 0% 55.5556%',
    videoUrl: '/videos/1789375842748-366311_Servers Programmer Computer Server Farm_By_Frame_Stock_Footage_Artlist_HD.mp4', 
    initialOffset: { x: -60, y: -80, rotate: -2 },
    color: '#3b82f6',
    bbox: { x: 0, y: 0, w: 900, h: 500 }
  },
  {
    id: 'cement',
    name: 'Cement',
    path: 'M 700,0 L 1600,0 L 1600,450 L 1100,450 L 1100,300 L 700,300 Z',
    clipPolygon: '43.75% 0%, 100% 0%, 100% 50%, 68.75% 50%, 68.75% 33.3333%, 43.75% 33.3333%',
    videoUrl: '/videos/1789376226005-330391_Lids Screwing Assembling Factory_By_The_Stock_Studio_Artlist_HD.mp4',
    initialOffset: { x: 80, y: -50, rotate: 3 },
    color: '#64748b',
    bbox: { x: 700, y: 0, w: 900, h: 450 }
  },
  {
    id: 'pharma',
    name: 'Pharma',
    path: 'M 900,300 L 1100,300 L 1100,450 L 1600,450 L 1600,700 L 600,700 L 600,500 L 900,500 Z',
    clipPolygon: '56.25% 33.3333%, 68.75% 33.3333%, 68.75% 50%, 100% 50%, 100% 77.7778%, 37.5% 77.7778%, 37.5% 55.5556%, 56.25% 55.5556%',
    videoUrl: '/videos/1789375928783-323399_Quarry Machine Vest Worker_By_Frame_Stock_Footage_Artlist_HD.mp4',
    initialOffset: { x: 90, y: 50, rotate: -1 },
    color: '#10b981',
    bbox: { x: 600, y: 300, w: 1000, h: 400 }
  },
  {
    id: 'fmcg',
    name: 'FMCG',
    path: 'M 0,500 L 600,500 L 600,700 L 900,700 L 900,900 L 0,900 Z',
    clipPolygon: '0% 55.5556%, 37.5% 55.5556%, 37.5% 77.7778%, 56.25% 77.7778%, 56.25% 100%, 0% 100%',
    videoUrl: '/videos/1789375893411-6497867_Warehouse Rack Shelf Aisle_By_Nazarii_Ortynskyi_Artlist_HD.mp4', 
    initialOffset: { x: -50, y: 80, rotate: 2 },
    color: '#f59e0b',
    bbox: { x: 0, y: 500, w: 900, h: 400 }
  },
  {
    id: 'consumer-durables',
    name: 'Consumer Durables',
    path: 'M 900,700 L 1600,700 L 1600,900 L 900,900 Z',
    clipPolygon: '56.25% 77.7778%, 100% 77.7778%, 100% 100%, 56.25% 100%',
    videoUrl: '/videos/1789376010676-30844_Cans fall onto conveyor belt through separate pathways _By_The_Stock_Studio_Artlist_HD.mp4', 
    initialOffset: { x: 60, y: 90, rotate: -3 },
    color: '#8b5cf6',
    bbox: { x: 900, y: 700, w: 700, h: 200 }
  },
];

export const METRICS_CONFIG = [
  {
    id: 'metrics-commissioned',
    imageUrl: '/videos/1789548341108-21501.jpg'
  },
  {
    id: 'metrics-capital',
    imageUrl: '/videos/1789548477675-DsD8PJ14a4o9Wt4JLC_k9w.jpg'
  },
  {
    id: 'metrics-customers',
    imageUrl: '/videos/1789548506870-ChatGPT Image Sep 16, 2026, 02_07_20 PM.png'
  }
];
