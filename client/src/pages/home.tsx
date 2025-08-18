import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useSorting } from '@/hooks/use-sorting';
import AlgorithmSelector from '@/components/algorithm-selector';
import ControlButtons from '@/components/control-buttons';
import PerformanceStats from '@/components/performance-stats';
import VisualizationArea from '@/components/visualization-area';
import AlgorithmInfo from '@/components/algorithm-info';
import PerformanceCharts from '@/components/performance-charts';
import GlobalComparisonModal from '@/components/global-comparison-modal';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [sortingState, sortingControls] = useSorting(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('merge');
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(5);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [showGlobalModal, setShowGlobalModal] = useState(false);

  const handleAlgorithmChange = (algorithm: string) => {
    if (!sortingState.isRunning) {
      setSelectedAlgorithm(algorithm);
    }
  };

  const handleArraySizeChange = (size: number) => {
    setArraySize(size);
    sortingControls.setArraySize(size);
  };

  const handleStartSorting = () => {
    sortingControls.startSorting(selectedAlgorithm, speed);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
      {/* Header */}
      <motion.header 
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SA</span>
                </div>
                <h1 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  Sorting Algorithms Visualizer
                </h1>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Theme Toggle */}
              <button
                data-testid="button-theme-toggle"
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {/* Comparison Mode Toggle */}
              <button
                data-testid="button-comparison-toggle"
                onClick={() => setIsComparisonMode(!isComparisonMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isComparisonMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                }`}
              >
                {isComparisonMode ? 'Disable Comparison' : 'Enable Comparison'}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Algorithm Selection & Controls */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={handleAlgorithmChange}
              arraySize={arraySize}
              onArraySizeChange={handleArraySizeChange}
              speed={speed}
              onSpeedChange={setSpeed}
              isRunning={sortingState.isRunning}
            />

            <ControlButtons
              onStart={handleStartSorting}
              onStop={sortingControls.stopSorting}
              onReset={sortingControls.resetArray}
              onRandomize={() => sortingControls.randomizeArray(arraySize)}
              isRunning={sortingState.isRunning}
              isComplete={sortingState.isComplete}
            />

            <PerformanceStats stats={sortingState.stats} />
          </motion.div>

          {/* Center Column - Visualization */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <VisualizationArea
              array={sortingState.array}
              currentStepData={sortingState.currentStepData}
              selectedAlgorithm={selectedAlgorithm}
              isComparisonMode={isComparisonMode}
              isRunning={sortingState.isRunning}
            />

            <AlgorithmInfo 
              selectedAlgorithm={selectedAlgorithm}
            />

            <PerformanceCharts
              onRunBenchmark={() => {
                // TODO: Implement benchmark functionality
                console.log('Running benchmark for', selectedAlgorithm);
              }}
              onGlobalComparison={() => setShowGlobalModal(true)}
            />
          </motion.div>
        </div>
      </div>

      {/* Global Comparison Modal */}
      <GlobalComparisonModal
        isOpen={showGlobalModal}
        onClose={() => setShowGlobalModal(false)}
      />

      {/* Footer */}
      <motion.footer 
        className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 transition-all duration-300"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Built for educational purposes • Learn algorithms through interactive visualization
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-500">
              <span>Interactive Learning</span>
              <span>•</span>
              <span>Performance Analysis</span>
              <span>•</span>
              <span>Algorithm Comparison</span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
