import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { algorithmData } from '@/lib/algorithm-data';

interface AlgorithmInfoProps {
  selectedAlgorithm: string;
}

type TabType = 'description' | 'complexity' | 'code';
type CodeLanguage = 'cpp' | 'java' | 'python' | 'c';

export default function AlgorithmInfo({ selectedAlgorithm }: AlgorithmInfoProps) {
  const [activeTab, setActiveTab] = useState<TabType>('description');
  const [activeCodeLanguage, setActiveCodeLanguage] = useState<CodeLanguage>('cpp');

  const algorithmInfo = algorithmData[selectedAlgorithm];

  if (!algorithmInfo) {
    return (
      <Card className="animate-slide-up">
        <CardContent className="p-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            Algorithm information not available
          </div>
        </CardContent>
      </Card>
    );
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'complexity', label: 'Complexity' },
    { id: 'code', label: 'Code' }
  ] as const;

  const codeLanguages = [
    { id: 'cpp', label: 'C++', filename: `${selectedAlgorithm}Sort.cpp` },
    { id: 'java', label: 'Java', filename: `${selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)}Sort.java` },
    { id: 'python', label: 'Python', filename: `${selectedAlgorithm}_sort.py` },
    { id: 'c', label: 'C', filename: `${selectedAlgorithm}_sort.c` }
  ] as const;

  return (
    <Card className="animate-slide-up">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-testid={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 py-4 px-1 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'description' && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {algorithmInfo.name}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {algorithmInfo.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Stability</h5>
                  <p className={`font-medium ${
                    algorithmInfo.stability === 'Stable' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {algorithmInfo.stability}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">In-Place</h5>
                  <p className={`font-medium ${
                    algorithmInfo.inPlace 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {algorithmInfo.inPlace ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'complexity' && (
            <motion.div
              key="complexity"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="table-complexity">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Metric</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Best Case</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Average Case</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Worst Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Time Complexity</td>
                      <td className="py-3 px-4 font-mono text-green-600 dark:text-green-400" data-testid="text-time-best">
                        {algorithmInfo.timeBest}
                      </td>
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400" data-testid="text-time-average">
                        {algorithmInfo.timeAverage}
                      </td>
                      <td className="py-3 px-4 font-mono text-red-600 dark:text-red-400" data-testid="text-time-worst">
                        {algorithmInfo.timeWorst}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Space Complexity</td>
                      <td className="py-3 px-4 font-mono text-orange-600 dark:text-orange-400" colSpan={3} data-testid="text-space-complexity">
                        {algorithmInfo.spaceComplexity}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Code Language Selector */}
              <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                {codeLanguages.map((lang) => (
                  <Button
                    key={lang.id}
                    data-testid={`button-code-${lang.id}`}
                    onClick={() => setActiveCodeLanguage(lang.id)}
                    variant={activeCodeLanguage === lang.id ? "default" : "outline"}
                    size="sm"
                    className={`text-sm font-medium transition-all duration-200 ${
                      activeCodeLanguage === lang.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {lang.label}
                  </Button>
                ))}
              </div>
              
              {/* Code Content */}
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 text-gray-300 text-sm font-medium border-b border-gray-700">
                  <span data-testid="text-filename">
                    {codeLanguages.find(l => l.id === activeCodeLanguage)?.filename}
                  </span>
                </div>
                <div className="relative">
                  <pre className="p-4 text-sm overflow-x-auto text-gray-100">
                    <code 
                      data-testid={`code-${activeCodeLanguage}`}
                      className={`language-${activeCodeLanguage === 'cpp' ? 'cpp' : activeCodeLanguage}`}
                    >
                      {algorithmInfo.codeSnippets[activeCodeLanguage] || '// Code not available for this language'}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
