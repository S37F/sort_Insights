import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { algorithmOptions } from '@/lib/algorithm-data';

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  isRunning: boolean;
}

export default function AlgorithmSelector({
  selectedAlgorithm,
  onAlgorithmChange,
  arraySize,
  onArraySizeChange,
  speed,
  onSpeedChange,
  isRunning
}: AlgorithmSelectorProps) {
  return (
    <Card className="animate-slide-up">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Select Algorithm</h3>
        <div className="space-y-4">
          <div>
            <Select
              data-testid="select-algorithm"
              value={selectedAlgorithm}
              onValueChange={onAlgorithmChange}
              disabled={isRunning}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose an algorithm" />
              </SelectTrigger>
              <SelectContent>
                {algorithmOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Array Size Input */}
          <div className="flex items-center space-x-3">
            <Label htmlFor="arraySize" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Array Size:
            </Label>
            <Input
              id="arraySize"
              data-testid="input-array-size"
              type="number"
              value={arraySize}
              onChange={(e) => onArraySizeChange(Math.max(10, Math.min(200, parseInt(e.target.value) || 50)))}
              min={10}
              max={200}
              className="flex-1"
              disabled={isRunning}
            />
          </div>
          
          {/* Speed Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Speed: {speed}
              </Label>
            </div>
            <Slider
              data-testid="slider-speed"
              value={[speed]}
              onValueChange={(value) => onSpeedChange(value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
              disabled={isRunning}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
