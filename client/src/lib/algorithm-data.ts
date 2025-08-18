import { AlgorithmInfo } from "@shared/schema";

export const algorithmData: Record<string, AlgorithmInfo> = {
  bubble: {
    name: "Bubble Sort",
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    stability: "Stable",
    inPlace: true,
    timeBest: "O(n)",
    timeAverage: "O(n²)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(1)",
    codeSnippets: {
      cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
      c: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`
    }
  },
  selection: {
    name: "Selection Sort",
    description: "Selection Sort is a simple sorting algorithm that divides the input list into two parts: a sorted portion and an unsorted portion. It repeatedly selects the smallest element from the unsorted portion and moves it to the sorted portion.",
    stability: "Unstable",
    inPlace: true,
    timeBest: "O(n²)",
    timeAverage: "O(n²)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(1)",
    codeSnippets: {
      cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        swap(arr[min_idx], arr[i]);
    }
}`,
      java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n-1):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      c: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`
    }
  },
  insertion: {
    name: "Insertion Sort",
    description: "Insertion Sort builds the final sorted array one element at a time. It takes each element from the unsorted portion and inserts it into its correct position in the sorted portion.",
    stability: "Stable",
    inPlace: true,
    timeBest: "O(n)",
    timeAverage: "O(n²)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(1)",
    codeSnippets: {
      cpp: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      c: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
    }
  },
  merge: {
    name: "Merge Sort",
    description: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts both halves, and then merges the sorted halves. It's one of the most efficient comparison-based sorting algorithms.",
    stability: "Stable",
    inPlace: false,
    timeBest: "O(n log n)",
    timeAverage: "O(n log n)",
    timeWorst: "O(n log n)",
    spaceComplexity: "O(n)",
    codeSnippets: {
      cpp: `void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        merge(arr, left, mid, right);
    }
}

void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> leftArr(n1), rightArr(n2);
    
    for (int i = 0; i < n1; i++)
        leftArr[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        rightArr[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}`,
      java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        merge(arr, left, mid, right);
    }
}

public static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int[] leftArr = new int[n1];
    int[] rightArr = new int[n2];
    
    System.arraycopy(arr, left, leftArr, 0, n1);
    System.arraycopy(arr, mid + 1, rightArr, 0, n2);
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      c: `void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        merge(arr, left, mid, right);
    }
}

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int leftArr[n1], rightArr[n2];
    
    for (int i = 0; i < n1; i++)
        leftArr[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        rightArr[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}`
    }
  },
  quick: {
    name: "Quick Sort",
    description: "Quick Sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around the pivot, then recursively sorts the sub-arrays. It's one of the fastest sorting algorithms in practice.",
    stability: "Unstable",
    inPlace: true,
    timeBest: "O(n log n)",
    timeAverage: "O(n log n)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(log n)",
    codeSnippets: {
      cpp: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}`,
      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return (i + 1);
}`,
      python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pi = partition(arr, low, high)
        
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      c: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return (i + 1);
}`
    }
  },
  heap: {
    name: "Heap Sort",
    description: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into sorted and unsorted regions, and shrinks the unsorted region by extracting the largest element.",
    stability: "Unstable",
    inPlace: true,
    timeBest: "O(n log n)",
    timeAverage: "O(n log n)",
    timeWorst: "O(n log n)",
    spaceComplexity: "O(1)",
    codeSnippets: {
      cpp: `void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}`,
      java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        heapify(arr, i, 0);
    }
}

public static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        
        heapify(arr, n, largest);
    }
}`,
      python: `def heap_sort(arr):
    n = len(arr)
    
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
      c: `void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        heapify(arr, i, 0);
    }
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        
        heapify(arr, n, largest);
    }
}`
    }
  },
  counting: {
    name: "Counting Sort",
    description: "Counting Sort is a non-comparison based sorting algorithm that works by counting the occurrences of each distinct element. It's efficient when the range of potential items is small.",
    stability: "Stable",
    inPlace: false,
    timeBest: "O(n + k)",
    timeAverage: "O(n + k)",
    timeWorst: "O(n + k)",
    spaceComplexity: "O(k)",
    codeSnippets: {
      cpp: `void countingSort(vector<int>& arr) {
    int max_val = *max_element(arr.begin(), arr.end());
    int min_val = *min_element(arr.begin(), arr.end());
    int range = max_val - min_val + 1;
    
    vector<int> count(range, 0);
    vector<int> output(arr.size());
    
    for (int i = 0; i < arr.size(); i++)
        count[arr[i] - min_val]++;
    
    for (int i = 1; i < range; i++)
        count[i] += count[i - 1];
    
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - min_val] - 1] = arr[i];
        count[arr[i] - min_val]--;
    }
    
    for (int i = 0; i < arr.size(); i++)
        arr[i] = output[i];
}`,
      java: `public static void countingSort(int[] arr) {
    int max_val = Arrays.stream(arr).max().orElse(0);
    int min_val = Arrays.stream(arr).min().orElse(0);
    int range = max_val - min_val + 1;
    
    int[] count = new int[range];
    int[] output = new int[arr.length];
    
    for (int i = 0; i < arr.length; i++)
        count[arr[i] - min_val]++;
    
    for (int i = 1; i < range; i++)
        count[i] += count[i - 1];
    
    for (int i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min_val] - 1] = arr[i];
        count[arr[i] - min_val]--;
    }
    
    System.arraycopy(output, 0, arr, 0, arr.length);
}`,
      python: `def counting_sort(arr):
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    
    count = [0] * range_val
    output = [0] * len(arr)
    
    for num in arr:
        count[num - min_val] += 1
    
    for i in range(1, range_val):
        count[i] += count[i - 1]
    
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    return output`,
      c: `void countingSort(int arr[], int n) {
    int max_val = arr[0], min_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max_val) max_val = arr[i];
        if (arr[i] < min_val) min_val = arr[i];
    }
    
    int range = max_val - min_val + 1;
    int* count = (int*)calloc(range, sizeof(int));
    int* output = (int*)malloc(n * sizeof(int));
    
    for (int i = 0; i < n; i++)
        count[arr[i] - min_val]++;
    
    for (int i = 1; i < range; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min_val] - 1] = arr[i];
        count[arr[i] - min_val]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
    
    free(count);
    free(output);
}`
    }
  },
  radix: {
    name: "Radix Sort",
    description: "Radix Sort is a non-comparison based sorting algorithm that sorts integers by processing individual digits. It sorts from the least significant digit to the most significant digit.",
    stability: "Stable",
    inPlace: false,
    timeBest: "O(d × n)",
    timeAverage: "O(d × n)",
    timeWorst: "O(d × n)",
    spaceComplexity: "O(n + k)",
    codeSnippets: {
      cpp: `void radixSort(vector<int>& arr) {
    int max_val = *max_element(arr.begin(), arr.end());
    
    for (int exp = 1; max_val / exp > 0; exp *= 10)
        countingSort(arr, exp);
}

void countingSort(vector<int>& arr, int exp) {
    vector<int> output(arr.size());
    vector<int> count(10, 0);
    
    for (int i = 0; i < arr.size(); i++)
        count[(arr[i] / exp) % 10]++;
    
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    for (int i = 0; i < arr.size(); i++)
        arr[i] = output[i];
}`,
      java: `public static void radixSort(int[] arr) {
    int max_val = Arrays.stream(arr).max().orElse(0);
    
    for (int exp = 1; max_val / exp > 0; exp *= 10)
        countingSort(arr, exp);
}

public static void countingSort(int[] arr, int exp) {
    int[] output = new int[arr.length];
    int[] count = new int[10];
    
    for (int i = 0; i < arr.length; i++)
        count[(arr[i] / exp) % 10]++;
    
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    for (int i = arr.length - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    System.arraycopy(output, 0, arr, 0, arr.length);
}`,
      python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    
    while max_val // exp > 0:
        counting_sort_exp(arr, exp)
        exp *= 10
    
    return arr

def counting_sort_exp(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    for i in range(n):
        index = (arr[i] // exp) % 10
        count[index] += 1
    
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    i = n - 1
    while i >= 0:
        index = (arr[i] // exp) % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
        i -= 1
    
    for i in range(n):
        arr[i] = output[i]`,
      c: `void radixSort(int arr[], int n) {
    int max_val = getMax(arr, n);
    
    for (int exp = 1; max_val / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}

int getMax(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max)
            max = arr[i];
    return max;
}

void countSort(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};
    
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}`
    }
  },
  bucket: {
    name: "Bucket Sort",
    description: "Bucket Sort is a sorting algorithm that distributes elements into buckets, sorts individual buckets, and then concatenates the sorted buckets. It works well when input is uniformly distributed.",
    stability: "Stable",
    inPlace: false,
    timeBest: "O(n + k)",
    timeAverage: "O(n + k)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(n + k)",
    codeSnippets: {
      cpp: `void bucketSort(vector<float>& arr) {
    int n = arr.size();
    vector<vector<float>> buckets(n);
    
    for (int i = 0; i < n; i++) {
        int bi = n * arr[i];
        buckets[bi].push_back(arr[i]);
    }
    
    for (int i = 0; i < n; i++)
        sort(buckets[i].begin(), buckets[i].end());
    
    int index = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < buckets[i].size(); j++)
            arr[index++] = buckets[i][j];
}`,
      java: `public static void bucketSort(float[] arr) {
    int n = arr.length;
    ArrayList<Float>[] buckets = new ArrayList[n];
    
    for (int i = 0; i < n; i++)
        buckets[i] = new ArrayList<Float>();
    
    for (int i = 0; i < n; i++) {
        int bi = (int) (n * arr[i]);
        buckets[bi].add(arr[i]);
    }
    
    for (int i = 0; i < n; i++)
        Collections.sort(buckets[i]);
    
    int index = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < buckets[i].size(); j++)
            arr[index++] = buckets[i].get(j);
}`,
      python: `def bucket_sort(arr):
    n = len(arr)
    buckets = [[] for _ in range(n)]
    
    for num in arr:
        bi = int(n * num)
        buckets[bi].append(num)
    
    for bucket in buckets:
        bucket.sort()
    
    result = []
    for bucket in buckets:
        result.extend(bucket)
    
    return result`,
      c: `void bucketSort(float arr[], int n) {
    typedef struct Node {
        float data;
        struct Node* next;
    } Node;
    
    Node** buckets = (Node**)calloc(n, sizeof(Node*));
    
    for (int i = 0; i < n; i++) {
        int bi = n * arr[i];
        Node* newNode = (Node*)malloc(sizeof(Node));
        newNode->data = arr[i];
        newNode->next = buckets[bi];
        buckets[bi] = newNode;
    }
    
    for (int i = 0; i < n; i++) {
        Node* head = buckets[i];
        // Sort individual bucket (insertion sort)
        // Implementation details omitted for brevity
    }
    
    int index = 0;
    for (int i = 0; i < n; i++) {
        Node* node = buckets[i];
        while (node) {
            arr[index++] = node->data;
            node = node->next;
        }
    }
    
    // Free memory
    for (int i = 0; i < n; i++) {
        Node* node = buckets[i];
        while (node) {
            Node* temp = node;
            node = node->next;
            free(temp);
        }
    }
    free(buckets);
}`
    }
  },
  shell: {
    name: "Shell Sort",
    description: "Shell Sort is an in-place comparison sort that generalizes insertion sort by allowing the exchange of items that are far apart. It performs multiple passes with decreasing gap sizes.",
    stability: "Unstable",
    inPlace: true,
    timeBest: "O(n log n)",
    timeAverage: "O(n^1.25)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(1)",
    codeSnippets: {
      cpp: `void shellSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            
            arr[j] = temp;
        }
    }
}`,
      java: `public static void shellSort(int[] arr) {
    int n = arr.length;
    
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            
            arr[j] = temp;
        }
    }
}`,
      python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            
            arr[j] = temp
        
        gap //= 2
    
    return arr`,
      c: `void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            
            arr[j] = temp;
        }
    }
}`
    }
  },
  bogo: {
    name: "Bogo Sort",
    description: "Bogo Sort (also known as Stupid Sort) is a highly inefficient sorting algorithm that randomly shuffles the array until it happens to be sorted. It's primarily used for educational purposes to demonstrate inefficiency.",
    stability: "Unstable",
    inPlace: true,
    timeBest: "O(n)",
    timeAverage: "O((n+1)!)",
    timeWorst: "O(∞)",
    spaceComplexity: "O(1)",
    codeSnippets: {
      cpp: `void bogoSort(vector<int>& arr) {
    while (!isSorted(arr)) {
        shuffle(arr);
    }
}

bool isSorted(vector<int>& arr) {
    for (int i = 0; i < arr.size() - 1; i++) {
        if (arr[i] > arr[i + 1])
            return false;
    }
    return true;
}

void shuffle(vector<int>& arr) {
    for (int i = 0; i < arr.size(); i++) {
        int j = rand() % arr.size();
        swap(arr[i], arr[j]);
    }
}`,
      java: `public static void bogoSort(int[] arr) {
    while (!isSorted(arr)) {
        shuffle(arr);
    }
}

public static boolean isSorted(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1])
            return false;
    }
    return true;
}

public static void shuffle(int[] arr) {
    Random rand = new Random();
    for (int i = 0; i < arr.length; i++) {
        int j = rand.nextInt(arr.length);
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`,
      python: `import random

def bogo_sort(arr):
    while not is_sorted(arr):
        random.shuffle(arr)
    return arr

def is_sorted(arr):
    for i in range(len(arr) - 1):
        if arr[i] > arr[i + 1]:
            return False
    return True`,
      c: `#include <stdlib.h>
#include <time.h>

void bogoSort(int arr[], int n) {
    srand(time(NULL));
    while (!isSorted(arr, n)) {
        shuffle(arr, n);
    }
}

int isSorted(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1])
            return 0;
    }
    return 1;
}

void shuffle(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        int j = rand() % n;
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`
    }
  }
};

export const algorithmOptions = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'selection', label: 'Selection Sort' },
  { value: 'insertion', label: 'Insertion Sort' },
  { value: 'merge', label: 'Merge Sort' },
  { value: 'quick', label: 'Quick Sort' },
  { value: 'heap', label: 'Heap Sort' },
  { value: 'counting', label: 'Counting Sort' },
  { value: 'radix', label: 'Radix Sort' },
  { value: 'bucket', label: 'Bucket Sort' },
  { value: 'shell', label: 'Shell Sort' },
  { value: 'bogo', label: 'Bogo Sort' }
];
