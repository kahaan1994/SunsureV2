import React, { useState } from 'react';
import { puzzlePieces, OVERLAY_OPACITY, PIPELINE_VIDEO, METRICS_CONFIG } from './PuzzlePaths';
import { Upload, CheckCircle } from 'lucide-react';

export const AdminUpload: React.FC = () => {
  const [uploading, setUploading] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(OVERLAY_OPACITY);

  const handleOpacityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setOpacity(val);
    try {
      await fetch('/api/overlay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opacity: val }),
      });
    } catch (err) {
      console.error('Failed to update opacity', err);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, pieceId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(pieceId);
    
    const formData = new FormData();
    formData.append('video', file);
    formData.append('pieceId', pieceId);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        // Reload page to see the updated video and trigger Vite HMR for PuzzlePaths.ts
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        alert('Upload failed. See console.');
      }
    } catch (err) {
      console.error(err);
      alert('Upload error. See console.');
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="w-full bg-zinc-900 text-white p-6 pt-24 relative z-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold">Admin: Customize Hero</h2>
          
          {/* Overlay Opacity Customizer */}
          <div className="flex items-center gap-4 bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">
            <span className="text-sm font-medium text-zinc-300 whitespace-nowrap">Global Black Overlay</span>
            <input 
              type="range" 
              min="0" max="1" step="0.05" 
              value={opacity} 
              onChange={handleOpacityChange}
              className="w-32 accent-blue-500"
            />
            <span className="text-xs font-mono w-8 text-right text-zinc-400">{(opacity * 100).toFixed(0)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {puzzlePieces.map((piece) => (
            <div key={piece.id} className="bg-zinc-800 p-4 rounded-lg flex flex-col gap-3 border border-zinc-700">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-zinc-300">{piece.name}</span>
                {piece.videoUrl.startsWith('/videos/') && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              </div>
              <label className="relative flex items-center justify-center w-full h-24 border-2 border-dashed border-zinc-600 rounded-lg hover:border-blue-500 hover:bg-zinc-700/50 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center gap-1">
                  <Upload className="w-5 h-5 text-zinc-400 group-hover:text-blue-400" />
                  <span className="text-xs text-zinc-400 font-medium">
                    {uploading === piece.id ? 'Uploading...' : 'Select MP4'}
                  </span>
                </div>
                <input 
                  type="file" 
                  accept="video/mp4,video/webm" 
                  className="hidden" 
                  onChange={(e) => handleUpload(e, piece.id)}
                  disabled={uploading === piece.id}
                />
              </label>
              <div className="text-[10px] text-zinc-500 font-mono truncate" title={piece.videoUrl}>
                Current: {piece.videoUrl.split('/').pop()}
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline & Map Background Video Upload */}
        <div className="mt-8 border-t border-zinc-800 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-zinc-300">Scrolling Sections Background</h3>
          <div className="bg-zinc-800 p-4 rounded-lg flex flex-col gap-3 border border-zinc-700 max-w-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-zinc-300">Pipeline & Map Video</span>
              {PIPELINE_VIDEO.videoUrl.startsWith('/videos/') && <CheckCircle className="w-4 h-4 text-emerald-400" />}
            </div>
            <label className="relative flex items-center justify-center w-full h-24 border-2 border-dashed border-zinc-600 rounded-lg hover:border-blue-500 hover:bg-zinc-700/50 transition-colors cursor-pointer group">
              <div className="flex flex-col items-center gap-1">
                <Upload className="w-5 h-5 text-zinc-400 group-hover:text-blue-400" />
                <span className="text-xs text-zinc-400 font-medium">
                  {uploading === PIPELINE_VIDEO.id ? 'Uploading...' : 'Select MP4'}
                </span>
              </div>
              <input 
                type="file" 
                accept="video/mp4,video/webm" 
                className="hidden" 
                onChange={(e) => handleUpload(e, PIPELINE_VIDEO.id)}
                disabled={uploading === PIPELINE_VIDEO.id}
              />
            </label>
            <div className="text-[10px] text-zinc-500 font-mono truncate" title={PIPELINE_VIDEO.videoUrl}>
              Current: {PIPELINE_VIDEO.videoUrl.split('/').pop()}
            </div>
          </div>
        </div>

        {/* Metrics Images Upload */}
        <div className="mt-8 border-t border-zinc-800 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-zinc-300">Metrics Section Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {METRICS_CONFIG.map((metric) => (
              <div key={metric.id} className="bg-zinc-800 p-4 rounded-lg flex flex-col gap-3 border border-zinc-700">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-zinc-300">{metric.id}</span>
                  {metric.imageUrl.startsWith('/videos/') && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                </div>
                <label className="relative flex items-center justify-center w-full h-24 border-2 border-dashed border-zinc-600 rounded-lg hover:border-blue-500 hover:bg-zinc-700/50 transition-colors cursor-pointer group">
                  <div className="flex flex-col items-center gap-1">
                    <Upload className="w-5 h-5 text-zinc-400 group-hover:text-blue-400" />
                    <span className="text-xs text-zinc-400 font-medium">
                      {uploading === metric.id ? 'Uploading...' : 'Select Image'}
                    </span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleUpload(e, metric.id)}
                    disabled={uploading === metric.id}
                  />
                </label>
                <div className="text-[10px] text-zinc-500 font-mono truncate" title={metric.imageUrl}>
                  Current: {metric.imageUrl.split('/').pop()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
