import { useState, useEffect } from 'react';
import formSchemas from '../../data/form-schemas.json';

export default function FormPopup({ formName, title, initialData, onSave, onClose, onAddAnother }) {
  const fields = formSchemas[formName] || [];
  const [formData, setFormData] = useState(initialData || {});

  // Sync state whenever initialData changes or the modal reopens
  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  // == Native Dragging Logic ==
  const [position, setPosition] = useState({ x: 120, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // == Form Handlers ==
  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [fieldId]: value };
      onSave(newData); // <-- AUTOSAVE TRIGGER
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      className="fixed top-0 left-0 z-50 bg-[#e5e5e5] text-zinc-900 w-110 rounded-xl p-5 shadow-2xl border border-zinc-300 font-serif"
    >
      {/* Header - Drag Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="flex justify-between items-center border-b border-zinc-400 pb-2 mb-4 cursor-grab active:cursor-grabbing select-none"
      >
        {/* Uses 'title' prop so it shows "Přípisy 1", "Přípisy 2", etc. */}
        <h2 className="text-xl font-bold">{title || formName}</h2>
        <button
          type="button"
          onClick={onClose}
          onMouseDown={(e) => e.stopPropagation()}
          className="w-7 h-7 bg-white border border-zinc-400 rounded flex items-center justify-center font-sans font-bold hover:bg-zinc-100 cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Dynamic Inputs from form-schemas.json (Your exact fields code) */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-3 text-sm">
        {fields.map((field) => {
          const fieldId = field.id || field.name;

          return (
            <div key={fieldId} className="flex items-center justify-end gap-3">
              {field.type === 'checkbox' && (
                <label className="flex items-center gap-2 font-bold cursor-pointer w-full justify-start">
                  <input
                    type="checkbox"
                    checked={Boolean(formData[fieldId])}
                    onChange={(e) => handleInputChange(fieldId, e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-400"
                  />
                  <span>{field.label}</span>
                </label>
              )}

              {(field.type === 'text' || !field.type) && (
                <>
                  <label className="font-bold text-right min-w-22.5">{field.label}</label>
                  <input
                    type="text"
                    value={formData[fieldId] || ''}
                    onChange={(e) => handleInputChange(fieldId, e.target.value)}
                    className="w-64 bg-white border border-zinc-400 rounded px-2 py-1 text-sm font-sans focus:outline-none"
                  />
                </>
              )}

              {field.type === 'checkbox_text' && (
                <div className="flex items-center gap-2 w-full justify-between">
                  <label className="flex items-center gap-2 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(formData[`${fieldId}_enabled`])}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        handleInputChange(`${fieldId}_enabled`, isChecked);
                        if (!isChecked) {
                          handleInputChange(fieldId, ''); // Clear text when unchecked
                        }
                      }}
                      className="w-4 h-4 rounded border-zinc-400 cursor-pointer"
                    />
                    <span>{field.label}</span>
                  </label>
                  <input
                    type="text"
                    disabled={!formData[`${fieldId}_enabled`]}
                    value={formData[fieldId] || ''}
                    onChange={(e) => handleInputChange(fieldId, e.target.value)}
                    className={`w-64 border border-zinc-400 rounded px-2 py-1 text-sm font-sans focus:outline-none ${
                      !formData[`${fieldId}_enabled`]
                        ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                        : 'bg-white text-zinc-900'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Action Buttons matching your image */}
        <div className="pt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={onAddAnother}
            className="bg-zinc-100 hover:bg-white border border-zinc-400 px-4 py-1 rounded text-sm font-sans font-medium shadow-sm cursor-pointer active:translate-y-0.5"
          >
            Přidat Další
          </button>
          
          <button
            type="button"
            onClick={() => {
              onSave(formData)
              onClose();
            }}
            className="bg-zinc-100 hover:bg-white border border-zinc-400 px-4 py-1 rounded text-sm font-sans font-medium shadow-sm cursor-pointer active:translate-y-0.5"
          >
            Uložit
          </button>
        </div>
      </form>
    </div>
  );
}