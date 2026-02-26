"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { getLastEntry, saveEntry } from "@/src/actions/homeActions";

interface Emotion {
  emoji: string;
  name: string;
}

export function MoodTracker({emotions, userId}: {emotions: Emotion[][]; userId: string}) {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [lastEntry, setLastEntry] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());  
  const [scheduleItems, setScheduleItems] = useState<any[]>([]);
  const [savedProgress, setSavedProgress] = useState<boolean>(false);
  const [isSavingEntry, setIsSavingEntry] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const getEmotionForCell = (row: number, col: number): Emotion => {
    const key = `${row}-${col}`;
    return emotions[row][col];
  };

  const handleSaveEntry = async () => {
    if (!selectedCell || isSavingEntry) return;

    const energy = 4 - selectedCell.row; 
    let pleasantness;
    let col = selectedCell.col
    if (col === 0) pleasantness = -4;
    else if (col === 1) pleasantness = -2;
    else if (col === 2) pleasantness = 2;
    else pleasantness = 4;

    try {
      setIsSavingEntry(true);

      await saveEntry({
        userId: userId, // replace with real user
        energy,
        pleasantness,
      });

      setLastEntry(new Date());
      setSelectedCell(null);
      setSavedProgress(true);
      setTimeout(() => setSavedProgress(false), 3000);
    } finally {
      setIsSavingEntry(false);
    }
  };

  const getTimeSinceLastEntry = () => {
    if (!lastEntry) return null;
    const diff = currentTime.getTime() - lastEntry.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ago`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ago`;
    return `${minutes}m ago`;
  };


  const getLastEntryColor = () => {
    if (!lastEntry) return 'bg-muted';
    const diff = currentTime.getTime() - lastEntry.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours > 24) return 'bg-red-500 text-white';
    if (hours > 12) return 'bg-orange-500 text-white';
    return 'bg-muted';
  };

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Mood Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mood Grid */}
        <div className="space-y-2">
          <div className="flex justify-center text-muted-foreground">
            <span></span>
            <span>Pleasantness →</span>
            <span></span>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col justify-center items-center text-muted-foreground -rotate-90 origin-center whitespace-nowrap" style={{ width: '20px' }}>
              Energy →
            </div>
            <div className="grid grid-cols-4 gap-2 flex-1">
              {emotions.map((row, rowIndex) =>
                row.map((_, colIndex) => {
                  const emotion = getEmotionForCell(rowIndex, colIndex);
                  const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`aspect-square flex flex-col items-center justify-center rounded-lg border-2 transition-all hover:scale-105 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                          : 'border-border bg-muted/30'
                      }`}
                      title={emotion.name}
                    >
                      <span className="text-2xl sm:text-3xl">{emotion.emoji}</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 text-center px-1 line-clamp-1">
                        {emotion.name}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Save Button and Current Time */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <Button onClick={handleSaveEntry} 
            disabled={!selectedCell || isSavingEntry} 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            {isSavingEntry ? "Saving..." : !savedProgress ? "Save" : "Saved!"}
          </Button>
          <div
            hidden={!savedProgress}
            className="text-3xl">
            ✓
          </div>
          <div className="text-muted-foreground">
            {currentTime.toLocaleString('en-GB', { 
              day: '2-digit',
              month: '2-digit', 
              year: 'numeric',
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

