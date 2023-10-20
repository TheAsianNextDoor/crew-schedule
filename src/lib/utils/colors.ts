export const getRouteColor = (index: number) => {
  const colors = [
    '#E01818', // red
    '#18E018', // green
    '#1818E0', // blue
    '#E0A618', // orange
    '#18E0A6', // teal
    '#A618E0', // purple
  ];

  return colors[index % 6];
};
