import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Pencil, Trash2, Plus } from 'lucide-react';

export interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'tags' | 'select';
  options?: string[];
  placeholder?: string;
}

interface EntityCrudProps {
  title: string;
  items: any[];
  fields: FieldDef[];
  displayKeys: string[];
  onAdd: (data: any) => Promise<any>;
  onUpdate: (id: string, data: any) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
}

function toFormValue(field: FieldDef, item: any): string {
  const val = item?.[field.key];
  if (field.type === 'tags') return Array.isArray(val) ? val.join(', ') : (val ?? '');
  return val ?? '';
}

function fromForm(fields: FieldDef[], form: Record<string, string>) {
  return fields.reduce<Record<string, any>>((acc, f) => {
    acc[f.key] = f.type === 'tags'
      ? form[f.key].split(',').map(s => s.trim()).filter(Boolean)
      : form[f.key];
    return acc;
  }, {});
}

export function EntityCrud({ title, items, fields, displayKeys, onAdd, onUpdate, onDelete }: EntityCrudProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const emptyForm = () => fields.reduce<Record<string, string>>((a, f) => ({ ...a, [f.key]: '' }), {});

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm(fields.reduce<Record<string, string>>((a, f) => ({ ...a, [f.key]: toFormValue(f, item) }), {}));
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = fromForm(fields, form);
    try {
      if (editing) await onUpdate(editing.id, data);
      else await onAdd(data);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await onDelete(id);
    setConfirmDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Button size="sm" onClick={openCreate} className="bg-emerald-600 hover:bg-emerald-700 gap-1">
          <Plus className="size-4" /> Agregar
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No hay registros. Agrega el primero.</p>
      ) : (
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50">
              <div className="flex-1 min-w-0 mr-4">
                <p className="font-medium text-sm text-gray-800 truncate">{item[displayKeys[0]]}</p>
                {displayKeys[1] && (
                  <p className="text-xs text-gray-500 truncate mt-0.5">{item[displayKeys[1]]}</p>
                )}
                {fields.find(f => f.type === 'tags') && (() => {
                  const tagField = fields.find(f => f.type === 'tags')!;
                  const tags: string[] = Array.isArray(item[tagField.key]) ? item[tagField.key] : [];
                  return tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tags.slice(0, 3).map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                      {tags.length > 3 && <span className="text-xs text-gray-400">+{tags.length - 3}</span>}
                    </div>
                  ) : null;
                })()}
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => openEdit(item)} className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                  <Pencil className="size-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar' : 'Agregar'} {title.replace(/s$/, '')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {fields.map(f => (
              <div key={f.key} className="space-y-1.5">
                <Label htmlFor={f.key}>{f.label}</Label>
                {f.type === 'textarea' ? (
                  <Textarea
                    id={f.key}
                    rows={3}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    required
                  />
                ) : f.type === 'select' ? (
                  <Select value={form[f.key]} onValueChange={v => setForm(p => ({ ...p, [f.key]: v }))}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                    <SelectContent>
                      {f.options?.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                ) : f.type === 'tags' ? (
                  <>
                    <Input
                      id={f.key}
                      placeholder={f.placeholder ?? 'Item 1, Item 2, Item 3'}
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                    <p className="text-xs text-gray-400">Separados por coma</p>
                  </>
                ) : (
                  <Input
                    id={f.key}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    required
                  />
                )}
              </div>
            ))}
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
                {loading ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm delete dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={o => { if (!o) setConfirmDelete(null); }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>¿Eliminar registro?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">Esta acción no se puede deshacer.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => handleDelete(confirmDelete!)}>Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
