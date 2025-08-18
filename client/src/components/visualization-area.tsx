import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { SortingStep } from '@shared/schema';
import { algorithmData } from '@/lib/algorithm-data';

interface VisualizationAreaProps {
  array: number[];
  currentStepData: SortingStep | null;
  selectedAlgorithm: string;
  isComparisonMode: boolean;
  isRunning: boolean;
}

export default function VisualizationArea({
  array,
  currentStepData,
  selectedAlgorithm,
  isComparisonMode,
  isRunning
}: VisualizationAreaProps) {
  const maxHeight = 280;
  const maxValue = Math.max(...array, 1);
  
  const getBarHeight = (value: number) => {
    return (value / maxValue) * maxHeight;
  };

  const getBarColor = (index: number) => {
    if (!currentStepData) return 'sorting-bar-default';
    
    if (currentStepData.sortedIndices?.includes(index)) {
      return 'sorting-bar-sorted';
    }
    
    if (currentStepData.pivotIndex === index) {
      return 'sorting-bar-pivot';
    }
    
    if (currentStepData.swappingIndices?.includes(index)) {
      return 'sorting-bar-swapping';
    }
    
    if (currentStepData.comparingIndices?.includes(index)) {
      return 'sorting-bar-comparing';
    }
    
    return 'sorting-bar-default';
  };

  const barWidth = Math.max(2, Math.min(20, (600 - array.length * 2) / array.length));

  return (
    <Card className="animate-slide-up">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Array Visualization</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Default</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Swapping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Sorted</span>
            </div>
          </div>
        </div>
        
        {!isComparisonMode ? (
          // Single View
          <div data-testid="visualization-single">
            <div className="h-80 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 flex items-end justify-center" style={{ gap: '1px' }}>
              {array.map((value, index) => (
                <motion.div
                  key={index}
                  data-testid={`bar-single-${index}`}
                  className={`sorting-bar ${getBarColor(index)} flex-shrink-0`}
                  style={{
                    height: getBarHeight(value),
                    width: barWidth,
                  }}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                />
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Algorithm:{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {algorithmData[selectedAlgorithm]?.name || selectedAlgorithm}
                </span>
              </p>
              {currentStepData?.stepDescription && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1" data-testid="text-step-description">
                  {currentStepData.stepDescription}
                </p>
              )}
            </div>
          </div>
        ) : (
          // Comparison View
          <div data-testid="visualization-comparison" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Algorithm A</h4>
              <div className="h-64 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 flex items-end justify-center" style={{ gap: '1px' }}>
                {array.map((value, index) => (
                  <div
                    key={index}
                    data-testid={`bar-comparison-a-${index}`}
                    className="sorting-bar-default flex-shrink-0"
                    style={{
                      height: getBarHeight(value) * 0.8, // Slightly smaller for comparison view
                      width: Math.max(2, barWidth * 0.8),
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Algorithm B</h4>
              <div className="h-64 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 flex items-end justify-center" style={{ gap: '1px' }}>
                {array.map((value, index) => (
                  <div
                    key={index}
                    data-testid={`bar-comparison-b-${index}`}
                    className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm transition-all duration-300 flex-shrink-0"
                    style={{
                      height: getBarHeight(value) * 0.8,
                      width: Math.max(2, barWidth * 0.8),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
