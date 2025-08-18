import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Square, RotateCcw, Shuffle } from 'lucide-react';

interface ControlButtonsProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onRandomize: () => void;
  isRunning: boolean;
  isComplete: boolean;
}

export default function ControlButtons({
  onStart,
  onStop,
  onReset,
  onRandomize,
  isRunning,
  isComplete
}: ControlButtonsProps) {
  return (
    <Card className="animate-slide-up">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Controls</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            data-testid="button-start"
            onClick={onStart}
            disabled={isRunning || isComplete}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Start
          </Button>
          <Button
            data-testid="button-stop"
            onClick={onStop}
            disabled={!isRunning}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop
          </Button>
          <Button
            data-testid="button-reset"
            onClick={onReset}
            disabled={isRunning}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            data-testid="button-randomize"
            onClick={onRandomize}
            disabled={isRunning}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Randomize
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
