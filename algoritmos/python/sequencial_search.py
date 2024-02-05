def sequencial_search(element, arr):
  index = 0;
  while(index < len(arr)):
    if(arr[index] == element):
      return index;
    index += 1;
  return -1;

print(sequencial_search(19, [1,3,7,9,19,49,61,62,63,64,65,70,73,75,80,97]))