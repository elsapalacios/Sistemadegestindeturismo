import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle2 } from 'lucide-react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

interface ReservaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tipo: 'hospedaje' | 'tour';
  itemId: string;
  itemNombre: string;
  precio?: string;
}

export function ReservaModal({ open, onOpenChange, tipo, itemId, itemNombre, precio }: ReservaModalProps) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [fecha, setFecha] = useState('');
  const [personas, setPersonas] = useState(1);
  const [notas, setNotas] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      await api.postReserva({ tipo, itemId, itemNombre, userId: user.id, userName: user.name, fecha, personas, notas });
      setSuccess(true);
      setFecha('');
      setPersonas(1);
      setNotas('');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) setSuccess(false);
    onOpenChange(val);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {tipo === 'hospedaje' ? 'Reservar Hospedaje' : 'Reservar Tour'}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="size-14 text-green-600 mx-auto" />
            <p className="text-lg font-semibold">¡Reserva enviada!</p>
            <p className="text-gray-600 text-sm">
              Nos pondremos en contacto para confirmar tu reserva de <strong>{itemNombre}</strong>.
            </p>
            <Button onClick={() => handleClose(false)} className="mt-2 bg-emerald-600 hover:bg-emerald-700">
              Cerrar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-3 border">
              <p className="font-medium text-gray-800">{itemNombre}</p>
              {precio && <p className="text-sm text-gray-500 mt-0.5">{precio}</p>}
            </div>

            {!isAuthenticated && (
              <Alert>
                <AlertDescription>
                  <button type="button" onClick={() => navigate('/login')} className="text-emerald-600 underline">
                    Inicia sesión
                  </button>{' '}
                  para realizar una reserva.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha *</Label>
              <Input
                id="fecha"
                type="date"
                min={today}
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personas">Número de personas *</Label>
              <Input
                id="personas"
                type="number"
                min={1}
                max={20}
                value={personas}
                onChange={e => setPersonas(Number(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notas">Notas adicionales</Label>
              <Textarea
                id="notas"
                placeholder="Requerimientos especiales, preguntas..."
                value={notas}
                onChange={e => setNotas(e.target.value)}
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading || !isAuthenticated}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? 'Enviando...' : 'Confirmar Reserva'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
