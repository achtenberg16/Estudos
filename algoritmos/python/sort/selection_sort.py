def selection_sort(arr):
  for i in range(0, len(arr) - 1):
    min_index = i;
    for j in range(i, len(arr)):
      if(arr[j] < arr[min_index]):
        min_index = j;
    if(i != min_index):
      arr[i], arr[min_index] = arr[min_index], arr[i];
  print(arr)


selection_sort([19, 1, 5, 13, 4,9,6, 2])