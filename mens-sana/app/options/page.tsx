"use client";

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

interface OptionsProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Options({ darkMode, setDarkMode }: OptionsProps) {
  return (
    <div className="space-y-6">
      <h1>Options</h1>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-muted-foreground">Toggle between light and dark themes</p>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mood-reminders">Mood Entry Reminders</Label>
              <p className="text-muted-foreground">Get reminded to log your mood</p>
            </div>
            <Switch id="mood-reminders" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="habit-reminders">Habit Reminders</Label>
              <p className="text-muted-foreground">Get reminded about your daily habits</p>
            </div>
            <Switch id="habit-reminders" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            All your data is stored locally in your browser. We do not collect or share any personal information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
