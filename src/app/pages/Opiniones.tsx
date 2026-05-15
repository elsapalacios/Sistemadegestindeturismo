import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MessageSquare, Star, User, Calendar, AlertCircle, Send } from 'lucide-react';
import type { Opinion } from '../data/tourismData';
import { useNavigate } from 'react-router';
import { api } from '../api';

export function Opiniones() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [opiniones, setOpiniones] = useState<Opinion[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [category, setCategory] = useState('general');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    api.getOpiniones().then(setOpiniones).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    if (!comment.trim()) return;

    try {
      const newOpinion = await api.postOpinion({
        userId: user.id,
        userName: user.name,
        rating,
        comment: comment.trim(),
        recommendation: recommendation.trim(),
        category,
      });

      setOpiniones([newOpinion, ...opiniones]);
      setComment('');
      setRecommendation('');
      setRating(5);
      setCategory('general');
      setSuccessMessage('¡Gracias por compartir tu opinión!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      // silently ignore
    }
  };

  const categoryLabels: Record<string, string> = {
    general: 'General',
    hospedaje: 'Hospedaje',
    restaurantes: 'Restaurantes',
    tours: 'Tours',
    cultura: 'Cultura'
  };

  const categoryColors: Record<string, string> = {
    general: 'bg-gray-600',
    hospedaje: 'bg-emerald-600',
    restaurantes: 'bg-orange-600',
    tours: 'bg-blue-600',
    cultura: 'bg-purple-600'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="size-12" />
            <h1 className="text-4xl md:text-5xl">Opiniones y Recomendaciones</h1>
          </div>
          <p className="text-xl max-w-3xl">
            Comparte tu experiencia en Quibdó y lee las opiniones de otros visitantes.
            Tu opinión ayuda a mejorar el turismo en nuestra ciudad.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario para dejar opinión */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Deja tu Opinión</CardTitle>
              </CardHeader>
              <CardContent>
                {!isAuthenticated ? (
                  <Alert>
                    <AlertCircle className="size-4" />
                    <AlertDescription>
                      Debes <button onClick={() => navigate('/login')} className="text-indigo-600 hover:underline">iniciar sesión</button> para dejar una opinión.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {successMessage && (
                      <Alert className="bg-green-50 border-green-200 text-green-800">
                        <AlertDescription>{successMessage}</AlertDescription>
                      </Alert>
                    )}

                    {/* Categoría */}
                    <div className="space-y-2">
                      <Label>Categoría</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="hospedaje">Hospedaje</SelectItem>
                          <SelectItem value="restaurantes">Restaurantes</SelectItem>
                          <SelectItem value="tours">Tours</SelectItem>
                          <SelectItem value="cultura">Cultura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Calificación */}
                    <div className="space-y-2">
                      <Label>Calificación</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(value => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setRating(value)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`size-8 ${
                                value <= rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Comentario */}
                    <div className="space-y-2">
                      <Label htmlFor="comment">Comentario *</Label>
                      <Textarea
                        id="comment"
                        placeholder="Cuéntanos sobre tu experiencia en Quibdó..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    {/* Recomendación */}
                    <div className="space-y-2">
                      <Label htmlFor="recommendation">Recomendación</Label>
                      <Textarea
                        id="recommendation"
                        placeholder="¿Qué recomendarías a futuros visitantes?"
                        value={recommendation}
                        onChange={(e) => setRecommendation(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <Send className="size-4 mr-2" />
                      Publicar Opinión
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Lista de opiniones */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl">Opiniones de Visitantes</h2>
              <Badge variant="outline">{opiniones.length} opiniones</Badge>
            </div>

            {opiniones.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <MessageSquare className="size-12 mx-auto mb-4 text-gray-300" />
                  <p>Aún no hay opiniones. ¡Sé el primero en compartir tu experiencia!</p>
                </CardContent>
              </Card>
            ) : (
              opiniones.map(opinion => (
                <Card key={opinion.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <User className="size-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{opinion.userName}</h3>
                            <Badge className={categoryColors[opinion.category]}>
                              {categoryLabels[opinion.category]}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="size-3" />
                            {new Date(opinion.date).toLocaleDateString('es-CO', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Estrellas */}
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(value => (
                          <Star
                            key={value}
                            className={`size-4 ${
                              value <= opinion.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3">{opinion.comment}</p>

                    {opinion.recommendation && (
                      <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                        <p className="text-sm text-indigo-900">
                          <span className="font-medium">Recomendación: </span>
                          {opinion.recommendation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Estadísticas */}
        {opiniones.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <h3 className="text-xl mb-4">Estadísticas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl text-indigo-600 mb-1">
                    {opiniones.length}
                  </div>
                  <div className="text-sm text-gray-600">Total de opiniones</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-indigo-600 mb-1">
                    {(opiniones.reduce((sum, op) => sum + op.rating, 0) / opiniones.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Calificación promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-indigo-600 mb-1">
                    {opiniones.filter(op => op.recommendation).length}
                  </div>
                  <div className="text-sm text-gray-600">Con recomendaciones</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-indigo-600 mb-1">
                    {opiniones.filter(op => op.rating === 5).length}
                  </div>
                  <div className="text-sm text-gray-600">5 estrellas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
