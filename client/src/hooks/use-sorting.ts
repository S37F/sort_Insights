import { useState, useCallback, useRef } from 'react';
import { SortingAlgorithms, SortingResult } from '@/lib/sorting-algorithms';
import { SortingStep } from '@shared/schema';

interface UseSortingState {
  array: number[];
  currentStep: number;
  isRunning: boolean;
  isComplete: boolean;
  sortingResult: SortingResult | null;
  currentStepData: SortingStep | null;
  stats: {
    executionTime: number;
    comparisons: number;
    swaps: number;
    arrayAccess: number;
  };
}

interface UseSortingControls {
  startSorting: (algorithm: string, speed: number) => void;
  stopSorting: () => void;
  resetArray: () => void;
  randomizeArray: (size: number) => void;
  setArraySize: (size: number) => void;
}

export function useSorting(initialSize: number = 50): [UseSortingState, UseSortingControls] {
  const generateRandomArray = useCallback((size: number): number[] => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 200) + 10);
  }, []);
  const [state, setState] = useState<UseSortingState>({
    array: generateRandomArray(initialSize),
    currentStep: 0,
    isRunning: false,
    isComplete: false,
    sortingResult: null,
    currentStepData: null,
    stats: {
      executionTime: 0,
      comparisons: 0,
      swaps: 0,
      arrayAccess: 0
    }
  });

  const animationRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();

  const startSorting = useCallback((algorithm: string, speed: number) => {
    if (state.isRunning) return;

    setState(prev => ({
      ...prev,
      isRunning: true,
      isComplete: false,
      currentStep: 0,
      stats: { executionTime: 0, comparisons: 0, swaps: 0, arrayAccess: 0 }
    }));

    startTimeRef.current = performance.now();

    // Get sorting algorithm
    const algorithmMap: Record<string, (arr: number[]) => SortingResult> = {
      bubble: SortingAlgorithms.bubbleSort,
      selection: SortingAlgorithms.selectionSort,
      insertion: SortingAlgorithms.insertionSort,
      merge: SortingAlgorithms.mergeSort,
      quick: SortingAlgorithms.quickSort,
      heap: SortingAlgorithms.heapSort,
      counting: SortingAlgorithms.countingSort,
      radix: SortingAlgorithms.radixSort,
      bucket: SortingAlgorithms.bucketSort,
      shell: SortingAlgorithms.shellSort,
      bogo: (arr) => SortingAlgorithms.bogoSort(arr, 50) // Limited iterations for demo
    };

    const sortFunction = algorithmMap[algorithm];
    if (!sortFunction) {
      console.error(`Unknown algorithm: ${algorithm}`);
      return;
    }

    const result = sortFunction(state.array);
    
    setState(prev => ({
      ...prev,
      sortingResult: result,
      currentStepData: result.steps[0] || null
    }));

    // Animation loop
    let stepIndex = 0;
    const delay = Math.max(50, 1100 - speed * 100); // Speed from 1-10, delay from 1050ms to 50ms

    const animate = () => {
      if (stepIndex < result.steps.length) {
        const currentStepData = result.steps[stepIndex];
        
        setState(prev => ({
          ...prev,
          currentStep: stepIndex,
          currentStepData,
          array: currentStepData.array,
          stats: {
            ...prev.stats,
            comparisons: result.comparisons,
            swaps: result.swaps,
            arrayAccess: result.arrayAccess,
            executionTime: startTimeRef.current ? performance.now() - startTimeRef.current : 0
          }
        }));

        stepIndex++;
        animationRef.current = setTimeout(animate, delay);
      } else {
        // Animation complete
        setState(prev => ({
          ...prev,
          isRunning: false,
          isComplete: true,
          stats: {
            ...prev.stats,
            executionTime: startTimeRef.current ? performance.now() - startTimeRef.current : 0
          }
        }));
      }
    };

    animate();
  }, [state.array, state.isRunning]);

  const stopSorting = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = undefined;
    }
    
    setState(prev => ({
      ...prev,
      isRunning: false
    }));
  }, []);

  const resetArray = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = undefined;
    }

    setState(prev => ({
      ...prev,
      array: generateRandomArray(prev.array.length),
      currentStep: 0,
      isRunning: false,
      isComplete: false,
      sortingResult: null,
      currentStepData: null,
      stats: {
        executionTime: 0,
        comparisons: 0,
        swaps: 0,
        arrayAccess: 0
      }
    }));
  }, [generateRandomArray]);

  const randomizeArray = useCallback((size: number) => {
    if (state.isRunning) return;

    setState(prev => ({
      ...prev,
      array: generateRandomArray(size),
      currentStep: 0,
      isComplete: false,
      sortingResult: null,
      currentStepData: null,
      stats: {
        executionTime: 0,
        comparisons: 0,
        swaps: 0,
        arrayAccess: 0
      }
    }));
  }, [generateRandomArray, state.isRunning]);

  const setArraySize = useCallback((size: number) => {
    if (state.isRunning) return;
    randomizeArray(size);
  }, [randomizeArray, state.isRunning]);

  return [
    state,
    {
      startSorting,
      stopSorting,
      resetArray,
      randomizeArray,
      setArraySize
    }
  ];
}
