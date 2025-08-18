import { SortingStep } from "@shared/schema";

export interface SortingResult {
  steps: SortingStep[];
  comparisons: number;
  swaps: number;
  arrayAccess: number;
}

export class SortingAlgorithms {
  private static recordStep(
    array: number[],
    comparingIndices: number[] = [],
    swappingIndices?: number[],
    pivotIndex?: number,
    sortedIndices?: number[],
    stepDescription?: string
  ): SortingStep {
    return {
      array: [...array],
      comparingIndices,
      swappingIndices,
      pivotIndex,
      sortedIndices,
      stepDescription
    };
  }

  static bubbleSort(arr: number[]): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let arrayAccess = 0;
    const n = array.length;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Initial array"));

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        arrayAccess += 2;
        
        steps.push(SortingAlgorithms.recordStep(array, [j, j + 1], undefined, undefined, [], 
          `Comparing elements at positions ${j} and ${j + 1}`));

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swaps++;
          arrayAccess += 2;
          
          steps.push(SortingAlgorithms.recordStep(array, [], [j, j + 1], undefined, [], 
            `Swapped elements at positions ${j} and ${j + 1}`));
        }
      }
      
      steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
        Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx), 
        `Element at position ${n - 1 - i} is now sorted`));
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
      Array.from({ length: n }, (_, i) => i), "Array is fully sorted"));

    return { steps, comparisons, swaps, arrayAccess };
  }

  static selectionSort(arr: number[]): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let arrayAccess = 0;
    const n = array.length;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Initial array"));

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      arrayAccess++;

      for (let j = i + 1; j < n; j++) {
        comparisons++;
        arrayAccess += 2;
        
        steps.push(SortingAlgorithms.recordStep(array, [minIdx, j], undefined, undefined, 
          Array.from({ length: i }, (_, idx) => idx), 
          `Comparing element at position ${j} with current minimum at ${minIdx}`));

        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        swaps++;
        arrayAccess += 2;
        
        steps.push(SortingAlgorithms.recordStep(array, [], [i, minIdx], undefined, 
          Array.from({ length: i + 1 }, (_, idx) => idx), 
          `Swapped minimum element to position ${i}`));
      } else {
        steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
          Array.from({ length: i + 1 }, (_, idx) => idx), 
          `Element at position ${i} is already in correct position`));
      }
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
      Array.from({ length: n }, (_, i) => i), "Array is fully sorted"));

    return { steps, comparisons, swaps, arrayAccess };
  }

  static insertionSort(arr: number[]): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let arrayAccess = 0;
    const n = array.length;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [0], "Initial array - first element is sorted"));

    for (let i = 1; i < n; i++) {
      const key = array[i];
      let j = i - 1;
      arrayAccess++;

      steps.push(SortingAlgorithms.recordStep(array, [i], undefined, undefined, 
        Array.from({ length: i }, (_, idx) => idx), 
        `Inserting element ${key} from position ${i}`));

      while (j >= 0 && array[j] > key) {
        comparisons++;
        arrayAccess += 2;
        
        steps.push(SortingAlgorithms.recordStep(array, [j, i], undefined, undefined, 
          Array.from({ length: i }, (_, idx) => idx), 
          `Shifting element ${array[j]} to the right`));

        array[j + 1] = array[j];
        j--;
        swaps++; // This is more like a shift, but we count it as array modification
        arrayAccess++;
      }

      if (j >= 0) {
        comparisons++; // Final comparison that breaks the loop
      }

      array[j + 1] = key;
      arrayAccess++;

      steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
        Array.from({ length: i + 1 }, (_, idx) => idx), 
        `Placed element ${key} at position ${j + 1}`));
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
      Array.from({ length: n }, (_, i) => i), "Array is fully sorted"));

    return { steps, comparisons, swaps, arrayAccess };
  }

  static mergeSort(arr: number[]): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let arrayAccess = 0;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Initial array"));

    const mergeSortHelper = (left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        mergeSortHelper(left, mid);
        mergeSortHelper(mid + 1, right);
        
        merge(left, mid, right);
      }
    };

    const merge = (left: number, mid: number, right: number) => {
      const leftArr = array.slice(left, mid + 1);
      const rightArr = array.slice(mid + 1, right + 1);
      arrayAccess += (mid - left + 1) + (right - mid);

      let i = 0, j = 0, k = left;

      while (i < leftArr.length && j < rightArr.length) {
        comparisons++;
        arrayAccess += 2;
        
        steps.push(SortingAlgorithms.recordStep(array, [left + i, mid + 1 + j], undefined, undefined, [], 
          `Merging: comparing ${leftArr[i]} and ${rightArr[j]}`));

        if (leftArr[i] <= rightArr[j]) {
          array[k] = leftArr[i];
          i++;
        } else {
          array[k] = rightArr[j];
          j++;
        }
        k++;
        arrayAccess++;
      }

      while (i < leftArr.length) {
        array[k] = leftArr[i];
        i++;
        k++;
        arrayAccess++;
      }

      while (j < rightArr.length) {
        array[k] = rightArr[j];
        j++;
        k++;
        arrayAccess++;
      }

      steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
        Array.from({ length: right - left + 1 }, (_, idx) => left + idx), 
        `Merged subarray from ${left} to ${right}`));
    };

    mergeSortHelper(0, array.length - 1);

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
      Array.from({ length: array.length }, (_, i) => i), "Array is fully sorted"));

    return { steps, comparisons, swaps: 0, arrayAccess }; // Merge sort doesn't do swaps
  }

  static quickSort(arr: number[]): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let arrayAccess = 0;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Initial array"));

    const quickSortHelper = (low: number, high: number, sortedIndices: Set<number> = new Set()) => {
      if (low < high) {
        const pi = partition(low, high, sortedIndices);
        sortedIndices.add(pi);
        
        quickSortHelper(low, pi - 1, new Set(sortedIndices));
        quickSortHelper(pi + 1, high, new Set(sortedIndices));
      }
    };

    const partition = (low: number, high: number, sortedIndices: Set<number>) => {
      const pivot = array[high];
      arrayAccess++;
      let i = low - 1;

      steps.push(SortingAlgorithms.recordStep(array, [], undefined, high, Array.from(sortedIndices), 
        `Selected pivot: ${pivot} at position ${high}`));

      for (let j = low; j <= high - 1; j++) {
        comparisons++;
        arrayAccess += 2;
        
        steps.push(SortingAlgorithms.recordStep(array, [j], undefined, high, Array.from(sortedIndices), 
          `Comparing ${array[j]} with pivot ${pivot}`));

        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          swaps++;
          arrayAccess += 2;
          
          if (i !== j) {
            steps.push(SortingAlgorithms.recordStep(array, [], [i, j], high, Array.from(sortedIndices), 
              `Swapped ${array[i]} and ${array[j]}`));
          }
        }
      }

      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      swaps++;
      arrayAccess += 2;
      
      steps.push(SortingAlgorithms.recordStep(array, [], [i + 1, high], undefined, Array.from(sortedIndices), 
        `Placed pivot ${pivot} at its correct position ${i + 1}`));

      return i + 1;
    };

    quickSortHelper(0, array.length - 1);

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
      Array.from({ length: array.length }, (_, i) => i), "Array is fully sorted"));

    return { steps, comparisons, swaps, arrayAccess };
  }

  static heapSort(arr: number[]): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let arrayAccess = 0;
    const n = array.length;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Initial array"));

    const heapify = (n: number, i: number, sortedIndices: number[] = []) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n) {
        comparisons++;
        arrayAccess += 2;
        
        steps.push(SortingAlgorithms.recordStep(array, [largest, left], undefined, undefined, sortedIndices, 
          `Comparing parent ${array[largest]} with left child ${array[left]}`));

        if (array[left] > array[largest]) {
          largest = left;
        }
      }

      if (right < n) {
        comparisons++;
        arrayAccess += 2;
        
        steps.push(SortingAlgorithms.recordStep(array, [largest, right], undefined, undefined, sortedIndices, 
          `Comparing ${array[largest]} with right child ${array[right]}`));

        if (array[right] > array[largest]) {
          largest = right;
        }
      }

      if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        swaps++;
        arrayAccess += 2;
        
        steps.push(SortingAlgorithms.recordStep(array, [], [i, largest], undefined, sortedIndices, 
          `Swapped ${array[i]} and ${array[largest]} to maintain heap property`));

        heapify(n, largest, sortedIndices);
      }
    };

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Built max heap"));

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      swaps++;
      arrayAccess += 2;
      
      const sortedIndices = Array.from({ length: n - i }, (_, idx) => n - 1 - idx);
      steps.push(SortingAlgorithms.recordStep(array, [], [0, i], undefined, sortedIndices, 
        `Moved maximum element ${array[i]} to sorted position`));

      heapify(i, 0, sortedIndices);
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
      Array.from({ length: n }, (_, i) => i), "Array is fully sorted"));

    return { steps, comparisons, swaps, arrayAccess };
  }

  static countingSort(arr: number[]): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0; // Not really swaps, but array assignments
    let arrayAccess = 0;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Initial array"));

    const max = Math.max(...array);
    const min = Math.min(...array);
    const range = max - min + 1;
    
    arrayAccess += array.length * 2; // Finding min and max

    const count = new Array(range).fill(0);
    const output = new Array(array.length);

    // Count occurrences
    for (let i = 0; i < array.length; i++) {
      count[array[i] - min]++;
      arrayAccess++;
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Counted occurrences of each element"));

    // Build cumulative count
    for (let i = 1; i < range; i++) {
      count[i] += count[i - 1];
    }

    // Build output array
    for (let i = array.length - 1; i >= 0; i--) {
      output[count[array[i] - min] - 1] = array[i];
      count[array[i] - min]--;
      swaps++; // Assignment operation
      arrayAccess++;
    }

    // Copy back to original array
    for (let i = 0; i < array.length; i++) {
      array[i] = output[i];
      arrayAccess++;
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
      Array.from({ length: array.length }, (_, i) => i), "Array is fully sorted"));

    return { steps, comparisons, swaps, arrayAccess };
  }

  static radixSort(arr: number[]): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let arrayAccess = 0;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Initial array"));

    const max = Math.max(...array);
    arrayAccess += array.length;

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSortByDigit(exp);
      steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], 
        `Sorted by digit at position ${Math.log10(exp)}`));
    }

    function countingSortByDigit(exp: number) {
      const output = new Array(array.length);
      const count = new Array(10).fill(0);

      for (let i = 0; i < array.length; i++) {
        count[Math.floor(array[i] / exp) % 10]++;
        arrayAccess++;
      }

      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }

      for (let i = array.length - 1; i >= 0; i--) {
        output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
        count[Math.floor(array[i] / exp) % 10]--;
        swaps++;
        arrayAccess++;
      }

      for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
        arrayAccess++;
      }
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
      Array.from({ length: array.length }, (_, i) => i), "Array is fully sorted"));

    return { steps, comparisons, swaps, arrayAccess };
  }

  static bucketSort(arr: number[]): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let arrayAccess = 0;
    const n = array.length;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Initial array"));

    // Normalize to 0-1 range for bucket sort
    const max = Math.max(...array);
    const min = Math.min(...array);
    const range = max - min;
    arrayAccess += array.length * 2;

    const buckets: number[][] = Array.from({ length: n }, () => []);

    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
      const bucketIndex = range === 0 ? 0 : Math.floor(((array[i] - min) / range) * (n - 1));
      buckets[bucketIndex].push(array[i]);
      arrayAccess++;
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Distributed elements into buckets"));

    // Sort individual buckets and concatenate
    let index = 0;
    for (let i = 0; i < n; i++) {
      if (buckets[i].length > 0) {
        // Use insertion sort for individual buckets
        const bucketResult = this.insertionSort(buckets[i]);
        comparisons += bucketResult.comparisons;
        swaps += bucketResult.swaps;
        arrayAccess += bucketResult.arrayAccess;
        
        for (const value of buckets[i]) {
          array[index++] = value;
          arrayAccess++;
        }
      }
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
      Array.from({ length: array.length }, (_, i) => i), "Array is fully sorted"));

    return { steps, comparisons, swaps, arrayAccess };
  }

  static shellSort(arr: number[]): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let arrayAccess = 0;
    const n = array.length;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Initial array"));

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], 
        `Starting gap sequence with gap = ${gap}`));

      for (let i = gap; i < n; i++) {
        const temp = array[i];
        let j = i;
        arrayAccess++;

        while (j >= gap) {
          comparisons++;
          arrayAccess += 2;
          
          steps.push(SortingAlgorithms.recordStep(array, [j, j - gap], undefined, undefined, [], 
            `Comparing elements ${array[j]} and ${array[j - gap]} with gap ${gap}`));

          if (array[j - gap] > temp) {
            array[j] = array[j - gap];
            j -= gap;
            swaps++;
            arrayAccess++;
          } else {
            break;
          }
        }

        array[j] = temp;
        arrayAccess++;

        if (j !== i) {
          steps.push(SortingAlgorithms.recordStep(array, [], [j, i], undefined, [], 
            `Placed element ${temp} at position ${j}`));
        }
      }

      steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], 
        `Completed gap sequence with gap = ${gap}`));
    }

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
      Array.from({ length: n }, (_, i) => i), "Array is fully sorted"));

    return { steps, comparisons, swaps, arrayAccess };
  }

  static bogoSort(arr: number[], maxIterations: number = 100): SortingResult {
    const array = [...arr];
    const steps: SortingStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let arrayAccess = 0;
    let iterations = 0;

    steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], "Initial array"));

    const isSorted = (): boolean => {
      for (let i = 0; i < array.length - 1; i++) {
        comparisons++;
        arrayAccess += 2;
        if (array[i] > array[i + 1]) {
          return false;
        }
      }
      return true;
    };

    const shuffle = (): void => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        swaps++;
        arrayAccess += 2;
      }
    };

    while (!isSorted() && iterations < maxIterations) {
      shuffle();
      iterations++;
      
      steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], 
        `Random shuffle attempt #${iterations}`));

      if (iterations >= maxIterations) {
        steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, [], 
          `Stopped after ${maxIterations} attempts (for demo purposes)`));
        break;
      }
    }

    if (isSorted()) {
      steps.push(SortingAlgorithms.recordStep(array, [], undefined, undefined, 
        Array.from({ length: array.length }, (_, i) => i), 
        `Array is sorted after ${iterations} random shuffles!`));
    }

    return { steps, comparisons, swaps, arrayAccess };
  }
}
