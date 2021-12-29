export const getProjection = (data: any) => {
  const temp: any = [];
  data.fieldNodes[0].selectionSet.selections.forEach((data: any) => {
    temp.push(data.name.value);
  });
  return temp;
};
