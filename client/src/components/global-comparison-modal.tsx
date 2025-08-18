import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SortingAlgorithms } from '@/lib/sorting-algorithms';
import { algorithmData, algorithmOptions } from '@/lib/algorithm-data';

interface GlobalComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GlobalBenchmarkResult {
  algorithm: string;
  name: string;
  executionTime: number;
  comparisons: number;
  swaps: number;
  arrayAccess: number;
  stability: string;
}

export default function GlobalComparisonModal({ isOpen, onClose }: GlobalComparisonModalProps) {
  const [benchmarkResults, setBenchmarkResults] = useState<GlobalBenchmarkResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const chart1Ref = useRef<HTMLCanvasElement>(null);
  const chart2Ref = useRef<HTMLCanvasElement>(null);
  const chart1InstanceRef = useRef<any>(null);
  const chart2InstanceRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && benchmarkResults.length === 0) {
      runGlobalBenchmark();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      // Clean up charts on unmount
      if (chart1InstanceRef.current) {
        chart1InstanceRef.current.destroy();
      }
      if (chart2InstanceRef.current) {
        chart2InstanceRef.current.destroy();
      }
    };
  }, []);

  const runGlobalBenchmark = async () => {
    setIsRunning(true);

    try {
      const results: GlobalBenchmarkResult[] = [];
      const testArraySize = 50;
      const testArray = Array.from({ length: testArraySize }, () => Math.floor(Math.random() * 200) + 10);

      // Test all algorithms except bogo (too slow)
      const algorithmsToTest = algorithmOptions.filter(opt => opt.value !== 'bogo');

      for (const algorithmOption of algorithmsToTest) {
        const algorithm = algorithmOption.value;
        const testArrayCopy = [...testArray];

        try {
          const startTime = performance.now();
          
          let result;
          switch (algorithm) {
            case 'bubble':
              result = SortingAlgorithms.bubbleSort(testArrayCopy);
              break;
            case 'selection':
              result = SortingAlgorithms.selectionSort(testArrayCopy);
              break;
            case 'insertion':
              result = SortingAlgorithms.insertionSort(testArrayCopy);
              break;
            case 'merge':
              result = SortingAlgorithms.mergeSort(testArrayCopy);
              break;
            case 'quick':
              result = SortingAlgorithms.quickSort(testArrayCopy);
              break;
            case 'heap':
              result = SortingAlgorithms.heapSort(testArrayCopy);
              break;
            case 'counting':
              result = SortingAlgorithms.countingSort(testArrayCopy);
              break;
            case 'radix':
              result = SortingAlgorithms.radixSort(testArrayCopy);
              break;
            case 'bucket':
              result = SortingAlgorithms.bucketSort(testArrayCopy);
              break;
            case 'shell':
              result = SortingAlgorithms.shellSort(testArrayCopy);
              break;
            default:
              continue;
          }
          
          const endTime = performance.now();
          const executionTime = endTime - startTime;

          results.push({
            algorithm,
            name: algorithmOption.label,
            executionTime,
            comparisons: result.comparisons,
            swaps: result.swaps,
            arrayAccess: result.arrayAccess,
            stability: algorithmData[algorithm]?.stability || 'Unknown'
          });
        } catch (error) {
          console.error(`Error benchmarking ${algorithm}:`, error);
        }
      }

      // Sort by execution time
      results.sort((a, b) => a.executionTime - b.executionTime);
      setBenchmarkResults(results);

      // Create charts
      if (typeof window !== 'undefined') {
        const Chart = await import('chart.js/auto');
        createCharts(Chart.default, results);
      }
    } catch (error) {
      console.error('Global benchmark failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const createCharts = (Chart: any, data: GlobalBenchmarkResult[]) => {
    // Chart 1: Execution Time Comparison
    if (chart1Ref.current) {
      if (chart1InstanceRef.current) {
        chart1InstanceRef.current.destroy();
      }

      const ctx1 = chart1Ref.current.getContext('2d');
      if (ctx1) {
        chart1InstanceRef.current = new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: data.map(d => d.name),
            datasets: [{
              label: 'Execution Time (ms)',
              data: data.map(d => d.executionTime),
              backgroundColor: data.map((_, index) => {
                const colors = [
                  'rgba(34, 197, 94, 0.8)',  // green for fastest
                  'rgba(59, 130, 246, 0.8)', // blue
                  'rgba(245, 158, 11, 0.8)', // yellow
                  'rgba(239, 68, 68, 0.8)',  // red for slowest
                ];
                return colors[Math.min(index, colors.length - 1)];
              }),
              borderColor: data.map((_, index) => {
                const colors = [
                  'rgb(34, 197, 94)',
                  'rgb(59, 130, 246)',
                  'rgb(245, 158, 11)',
                  'rgb(239, 68, 68)',
                ];
                return colors[Math.min(index, colors.length - 1)];
              }),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                ticks: {
                  maxRotation: 45,
                  color: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#6b7280'
                },
                grid: {
                  color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
                }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#6b7280'
                },
                grid: {
                  color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
                }
              }
            }
          }
        });
      }
    }

    // Chart 2: Operation Count Analysis
    if (chart2Ref.current) {
      if (chart2InstanceRef.current) {
        chart2InstanceRef.current.destroy();
      }

      const ctx2 = chart2Ref.current.getContext('2d');
      if (ctx2) {
        chart2InstanceRef.current = new Chart(ctx2, {
          type: 'radar',
          data: {
            labels: ['Comparisons', 'Swaps', 'Array Access'],
            datasets: data.slice(0, 5).map((result, index) => ({
              label: result.name,
              data: [
                Math.log10(result.comparisons + 1),
                Math.log10(result.swaps + 1),
                Math.log10(result.arrayAccess + 1)
              ],
              borderColor: [
                'rgb(34, 197, 94)',
                'rgb(59, 130, 246)',
                'rgb(245, 158, 11)',
                'rgb(239, 68, 68)',
                'rgb(139, 92, 246)'
              ][index],
              backgroundColor: [
                'rgba(34, 197, 94, 0.2)',
                'rgba(59, 130, 246, 0.2)',
                'rgba(245, 158, 11, 0.2)',
                'rgba(239, 68, 68, 0.2)',
                'rgba(139, 92, 246, 0.2)'
              ][index],
              borderWidth: 2
            }))
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827'
                }
              }
            },
            scales: {
              r: {
                beginAtZero: true,
                ticks: {
                  color: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#6b7280'
                },
                grid: {
                  color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
                },
                pointLabels: {
                  color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827'
                }
              }
            }
          }
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-hidden p-0">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Global Algorithm Comparison
              </DialogTitle>
              <Button
                data-testid="button-close-modal"
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </Button>
            </div>
          </DialogHeader>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <AnimatePresence>
              {isRunning ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-64"
                >
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Running global benchmark...</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Execution Time Comparison
                      </h4>
                      <div className="h-80 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                        <canvas ref={chart1Ref} data-testid="canvas-global-chart-1" className="w-full h-full" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Operation Count Analysis (Log Scale)
                      </h4>
                      <div className="h-80 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                        <canvas ref={chart2Ref} data-testid="canvas-global-chart-2" className="w-full h-full" />
                      </div>
                    </div>
                  </div>

                  {/* Algorithm Comparison Table */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      Detailed Comparison
                    </h4>
                    <div className="overflow-x-auto">
                      <table 
                        data-testid="table-global-comparison"
                        className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                          <tr>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Algorithm</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Time (ms)</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Comparisons</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Swaps</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Stability</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {benchmarkResults.map((result, index) => (
                            <motion.tr
                              key={result.algorithm}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                              data-testid={`row-algorithm-${result.algorithm}`}
                            >
                              <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                                {result.name}
                              </td>
                              <td className={`py-3 px-4 font-mono ${
                                index === 0 ? 'text-green-600 dark:text-green-400' : 
                                index === 1 ? 'text-blue-600 dark:text-blue-400' :
                                index >= benchmarkResults.length - 2 ? 'text-red-600 dark:text-red-400' :
                                'text-gray-700 dark:text-gray-300'
                              }`}>
                                {result.executionTime.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-mono">
                                {result.comparisons.toLocaleString()}
                              </td>
                              <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-mono">
                                {result.swaps.toLocaleString()}
                              </td>
                              <td className={`py-3 px-4 ${
                                result.stability === 'Stable' 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : 'text-red-600 dark:text-red-400'
                              }`}>
                                {result.stability}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
