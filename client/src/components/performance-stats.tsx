import { Card, CardContent } from '@/components/ui/card';

interface PerformanceStatsProps {
  stats: {
    executionTime: number;
    comparisons: number;
    swaps: number;
    arrayAccess: number;
  };
}

export default function PerformanceStats({ stats }: PerformanceStatsProps) {
  return (
    <Card className="animate-slide-up">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Performance Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Execution Time:</span>
            <span 
              data-testid="text-execution-time" 
              className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400"
            >
              {stats.executionTime.toFixed(1)}ms
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Comparisons:</span>
            <span 
              data-testid="text-comparisons" 
              className="text-sm font-mono font-semibold text-green-600 dark:text-green-400"
            >
              {stats.comparisons.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Swaps:</span>
            <span 
              data-testid="text-swaps" 
              className="text-sm font-mono font-semibold text-orange-600 dark:text-orange-400"
            >
              {stats.swaps.toLocaleString()}
            </span>
          </div>
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Array Access:</span>
              <span 
                data-testid="text-array-access" 
                className="text-sm font-mono font-semibold text-purple-600 dark:text-purple-400"
              >
                {stats.arrayAccess.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
