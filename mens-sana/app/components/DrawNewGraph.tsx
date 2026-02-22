import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

export default function DrawNewGraphCard({ user_id, createChart }) {
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('none');
  const [timespan, setTimespan] = useState(7);
  const [habits, setHabits] = useState<string[]>([]);

  useEffect(() => {
    // fetch user habits
    fetch(`/api/user/${user_id}/habits`)
      .then(res => res.json())
      .then(data => setHabits(data.map((h: any) => h.name)));
  }, [user_id]);

  const handleDrawNewGraph = async () => {
    if (!param1) return;
    await createChart({
      user_id,
      param1,
      param2,
      timespan: Number(timespan),
      title: `${param1}${param2 !== 'none' ? ` & ${param2}` : ''}`,
    });
    alert('Chart created!');
  };

  const metricOptions = ['energy', 'pleasantness'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Draw New Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="param1">Parameter 1</label>
            <Select value={param1} onValueChange={setParam1}>
              <SelectTrigger id="param1" className="mt-1">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {metricOptions.concat(habits).map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="param2">Parameter 2 (optional)</label>
            <Select value={param2} onValueChange={setParam2}>
              <SelectTrigger id="param2" className="mt-1">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {metricOptions.concat(habits).map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="timespan">Timespan (days)</label>
            <Input
              id="timespan"
              type="number"
              value={timespan}
              onChange={(e) => setTimespan(Number(e.target.value))}
              min={1}
              max={30}
              className="mt-1"
            />
          </div>

          <div className="flex items-end">
            <Button onClick={handleDrawNewGraph} disabled={!param1} className="w-full bg-blue-600 hover:bg-blue-700">
              Draw
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
