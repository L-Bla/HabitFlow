"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { X, Check } from 'lucide-react';

interface Emotion {
  emoji: string;
  name: string;
}

interface MoodEntry {
  timestamp: Date;
  energy: number;
  pleasantness: number;
  emotion: Emotion;
  details: string;
}

const defaultEmotions: Emotion[][] = [
  [
    { emoji: '😡', name: 'furious' },
    { emoji: '😰', name: 'nervous' },
    { emoji: '😊', name: 'cheerful' },
    { emoji: '🤩', name: 'ecstatic' },
  ],
  [
    { emoji: '😟', name: 'worried' },
    { emoji: '😠', name: 'angry' },
    { emoji: '😄', name: 'happy' },
    { emoji: '🤗', name: 'excited' },
  ],
  [
    { emoji: '😔', name: 'lonely' },
    { emoji: '😢', name: 'sad' },
    { emoji: '😌', name: 'at ease' },
    { emoji: '🙂', name: 'content' },
  ],
  [
    { emoji: '😫', name: 'desperate' },
    { emoji: '😞', name: 'disappointed' },
    { emoji: '😐', name: 'calm' },
    { emoji: '😇', name: 'serene' },
  ],
];

export function MoodTracker() {
  const [emotions, setEmotions] = useState<Emotion[][]>(defaultEmotions);
  const [customEmotions, setCustomEmotions] = useState<{ [key: string]: Emotion[] }>({});
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ row: number; col: number; x: number; y: number } | null>(null);
  const [addingEmotion, setAddingEmotion] = useState(false);
  const [newEmoji, setNewEmoji] = useState('');
  const [newEmotionName, setNewEmotionName] = useState('');
  const [details, setDetails] = useState('');
  const [lastEntry, setLastEntry] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    setContextMenu(null);
  };

  const handleCellRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    setContextMenu({ row, col, x: e.clientX, y: e.clientY });
  };

  const getEmotionForCell = (row: number, col: number): Emotion => {
    const key = `${row}-${col}`;
    const customs = customEmotions[key];
    if (customs && customs.length > 0) {
      return customs[customs.length - 1];
    }
    return emotions[row][col];
  };

  const handleAddEmotion = () => {
    if (!contextMenu || !newEmoji || !newEmotionName) return;

    const key = `${contextMenu.row}-${contextMenu.col}`;
    const newEmotion: Emotion = { emoji: newEmoji, name: newEmotionName };
    
    setCustomEmotions((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newEmotion],
    }));

    setNewEmoji('');
    setNewEmotionName('');
    setAddingEmotion(false);
    setContextMenu(null);
  };

  const handleSelectCustomEmotion = (emotion: Emotion) => {
    if (!contextMenu) return;

    const key = `${contextMenu.row}-${contextMenu.col}`;
    const currentCustoms = customEmotions[key] || [];
    const filtered = currentCustoms.filter((e) => e.emoji !== emotion.emoji || e.name !== emotion.name);
    filtered.push(emotion);

    setCustomEmotions((prev) => ({
      ...prev,
      [key]: filtered,
    }));

    setContextMenu(null);
  };

  const handleSaveEntry = () => {
    if (selectedCell) {
      setLastEntry(new Date());
      setDetails('');
      setSelectedCell(null);
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
        <div className={`px-3 py-2 rounded-md ${getLastEntryColor()} transition-colors`}>
          <span>Last entry: {getTimeSinceLastEntry() || 'No entries yet'}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mood Grid */}
        <div className="space-y-2">
          <div className="flex justify-between text-muted-foreground">
            <span></span>
            <span>Pleasantness →</span>
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
                      onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
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

        {/* Details */}
        <div>
          <label htmlFor="mood-details">Details</label>
          <Textarea
            id="mood-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="How are you feeling?"
            className="mt-1"
            rows={3}
          />
        </div>

        {/* Save Button and Current Time */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <Button onClick={handleSaveEntry} disabled={!selectedCell} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            Save Entry
          </Button>
          <div className="text-muted-foreground">
            {currentTime.toLocaleString('en-GB', { 
              day: '2-digit',
              month: '2-digit', 
              year: 'numeric',
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>
      </CardContent>

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setContextMenu(null);
              setAddingEmotion(false);
              setNewEmoji('');
              setNewEmotionName('');
            }}
          />
          <div
            className="fixed z-50 bg-card border rounded-lg shadow-lg p-3 min-w-[200px]"
            style={{
              left: `${Math.min(contextMenu.x, window.innerWidth - 220)}px`,
              top: `${Math.min(contextMenu.y, window.innerHeight - 300)}px`,
            }}
          >
            {!addingEmotion ? (
              <div className="space-y-2">
                <div className="pb-2 border-b">
                  <p className="text-muted-foreground">
                    Current: {getEmotionForCell(contextMenu.row, contextMenu.col).emoji}{' '}
                    {getEmotionForCell(contextMenu.row, contextMenu.col).name}
                  </p>
                </div>

                {/* Show default emotion */}
                <button
                  onClick={() => handleSelectCustomEmotion(emotions[contextMenu.row][contextMenu.col])}
                  className="w-full text-left px-2 py-1 rounded hover:bg-muted"
                >
                  {emotions[contextMenu.row][contextMenu.col].emoji} {emotions[contextMenu.row][contextMenu.col].name}
                </button>

                {/* Show custom emotions */}
                {customEmotions[`${contextMenu.row}-${contextMenu.col}`]?.map((emotion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectCustomEmotion(emotion)}
                    className="w-full text-left px-2 py-1 rounded hover:bg-muted"
                  >
                    {emotion.emoji} {emotion.name}
                  </button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAddingEmotion(true)}
                  className="w-full mt-2"
                >
                  Add
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label htmlFor="new-emoji">Emoji</label>
                  <Input
                    id="new-emoji"
                    value={newEmoji}
                    onChange={(e) => setNewEmoji(e.target.value)}
                    placeholder=":)"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="new-emotion-name">Emotion</label>
                  <Input
                    id="new-emotion-name"
                    value={newEmotionName}
                    onChange={(e) => setNewEmotionName(e.target.value)}
                    placeholder="joyful"
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddEmotion} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setAddingEmotion(false);
                      setNewEmoji('');
                      setNewEmotionName('');
                    }}
                    className="flex-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
