type MarkedDatesType = {
    [date: string]: {
      selected?: boolean;
      marked?: boolean;
      selectedColor?: string;
      dotColor?: string;
      activeOpacity?: number;
    };
  };
  
  export const periodDays: MarkedDatesType = {
    '2025-04-10': { selected: true, marked: true, selectedColor: '#ff6b6b' },
    '2025-04-11': { selected: true, marked: true, selectedColor: '#ff6b6b' },
    '2025-04-12': { selected: true, marked: true, selectedColor: '#ff6b6b' },
    '2025-04-13': { selected: true, marked: true, selectedColor: '#ff6b6b' },
    '2025-04-14': { selected: true, marked: true, selectedColor: '#ff6b6b' },
    '2025-04-15': { selected: true, marked: true, selectedColor: '#ff6b6b' },
    '2025-04-29': { marked: true, dotColor: '#50cebb', activeOpacity: 0, selectedColor: '#50cebb' },
  };
  
  
  export const dailyTips = {
    "Today you will likely experience symptoms like:": [
      { text: "Heavy flow", icon: "🩸" },
      { text: "Low energy", icon: "🔋" },
      { text: "Stomach cramps", icon: "⚡" },
    ]
  };
  
  export const recommendedExercises = [
    {
      title: "Forward bending poses can ease menstrual pain",
      image: require('../../assets/images/bear.png')
    },
    {
      title: "Child's pose can reduce back pain from cramping",
      image: require('../../assets/images/bear.png')
    }
  ];
  