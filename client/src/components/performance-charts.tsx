import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { SortingAlgorithms } from '@/lib/sorting-algorithms';
import { algorithmOptions } from '@/lib/algorithm-data';

interface PerformanceChartsProps {
  onRunBenchmark: () => void;
  onGlobalComparison: () => void;
}

interface BenchmarkResult {
  algorithm: string;
  arraySize: number;
  executionTime: number;
  comparisons: number;
  swaps: number;
  arrayAccess: number;
}

export default function PerformanceCharts({ onRunBenchmark, onGlobalComparison }: PerformanceChartsProps) {
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkResult[]>([]);
  const [isRunningBenchmark, setIsRunningBenchmark] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  const runBenchmark = async () => {
    setIsRunningBenchmark(true);
    onRunBenchmark();

    try {
      const results: BenchmarkResult[] = [];
      const testSizes = [10, 25, 50, 100];
      
      // Test a subset of algorithms for performance
      const algorithmsToTest = ['bubble', 'insertion', 'merge', 'quick', 'heap'];

      for (const algorithm of algorithmsToTest) {
        for (const size of testSizes) {
          // Generate test array
          const testArray = Array.from({ length: size }, () => Math.floor(Math.random() * 200) + 10);
          
          // Measure performance
          const startTime = performance.now();
          
          let result;
          switch (algorithm) {
            case 'bubble':
              result = SortingAlgorithms.bubbleSort(testArray);
              break;
            case 'insertion':
              result = SortingAlgorithms.insertionSort(testArray);
              break;
            case 'merge':
              result = SortingAlgorithms.mergeSort(testArray);
              break;
            case 'quick':
              result = SortingAlgorithms.quickSort(testArray);
              break;
            case 'heap':
              result = SortingAlgorithms.heapSort(testArray);
              break;
            default:
              continue;
          }
          
          const endTime = performance.now();
          const executionTime = endTime - startTime;

          results.push({
            algorithm,
            arraySize: size,
            executionTime,
            comparisons: result.comparisons,
            swaps: result.swaps,
            arrayAccess: result.arrayAccess
          });
        }
      }

      setBenchmarkData(results);
      
      // Import Chart.js dynamically and create chart
      if (typeof window !== 'undefined') {
        const Chart = await import('chart.js/auto');
        createChart(Chart.default, results);
      }
    } catch (error) {
      console.error('Benchmark failed:', error);
    } finally {
      setIsRunningBenchmark(false);
    }
  };

  const createChart = (Chart: any, data: BenchmarkResult[]) => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Group data by algorithm
    const algorithmGroups = data.reduce((acc, result) => {
      if (!acc[result.algorithm]) {
        acc[result.algorithm] = [];
      }
      acc[result.algorithm].push(result);
      return acc;
    }, {} as Record<string, BenchmarkResult[]>);

    const colors = [
      'rgb(59, 130, 246)', // blue
      'rgb(16, 185, 129)', // green
      'rgb(245, 158, 11)', // yellow
      'rgb(239, 68, 68)', // red
      'rgb(139, 92, 246)', // purple
    ];

    const datasets = Object.entries(algorithmGroups).map(([algorithm, results], index) => ({
      label: algorithmOptions.find(opt => opt.value === algorithm)?.label || algorithm,
      data: results.map(r => ({ x: r.arraySize, y: r.executionTime })),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length] + '20',
      tension: 0.1
    }));

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Algorithm Performance Comparison',
            color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827'
          },
          legend: {
            labels: {
              color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827'
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Array Size',
              color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827'
            },
            ticks: {
              color: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#6b7280'
            },
            grid: {
              color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Execution Time (ms)',
              color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827'
            },
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
  };

  // Clean up chart on unmount
  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <Card className="animate-slide-up">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Analysis</h3>
          <div className="flex space-x-2">
            <Button
              data-testid="button-run-benchmark"
              onClick={runBenchmark}
              disabled={isRunningBenchmark}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium text-sm transition-all duration-200 transform hover:scale-105"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              {isRunningBenchmark ? 'Running...' : 'Run Benchmark'}
            </Button>
            <Button
              data-testid="button-global-comparison"
              onClick={onGlobalComparison}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium text-sm transition-all duration-200 transform hover:scale-105"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Global Analysis
            </Button>
          </div>
        </div>
        
        <div className="h-80 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          {benchmarkData.length > 0 ? (
            <canvas 
              ref={canvasRef} 
              data-testid="canvas-performance-chart"
              className="w-full h-full"
            />
          ) : (
            <motion.div 
              className="flex items-center justify-center h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400" data-testid="text-chart-placeholder">
                  {isRunningBenchmark ? 'Running benchmark...' : 'Run a benchmark to see performance charts'}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {benchmarkData.length > 0 && (
          <motion.div 
            className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            Benchmark completed with {benchmarkData.length} test cases across {new Set(benchmarkData.map(d => d.algorithm)).size} algorithms
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
