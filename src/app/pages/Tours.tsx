import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Compass, Clock, DollarSign, CheckCircle2, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { api } from '../api';
import type { Tour } from '../data/tourismData';

export function Tours() {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    api.getTours().then(setTours).catch(() => {});
  }, []);

  const dificultadColor: Record<string, string> = {
    'Fácil': 'bg-green-600',
    'Moderada': 'bg-yellow-600',
    'Difícil': 'bg-red-600'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Compass className="size-12" />
            <h1 className="text-4xl md:text-5xl">Tours y Actividades</h1>
          </div>
          <p className="text-xl max-w-3xl">
            Explora la biodiversidad del Chocó biogeográfico y conoce nuestra cultura.
            Tours guiados para todos los niveles de aventura.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          {tours.map(tour => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Imagen */}
                <div className="md:col-span-2 h-64 md:h-auto overflow-hidden">
                  <ImageWithFallback
                    src={tour.imagen}
                    alt={tour.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Contenido */}
                <div className="md:col-span-3 p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl">{tour.nombre}</h2>
                        <Badge className={dificultadColor[tour.dificultad] || 'bg-gray-600'}>
                          {tour.dificultad}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4">{tour.descripcion}</p>

                      {/* Información rápida */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="size-5 text-blue-600" />
                          <div>
                            <div className="text-xs text-gray-500">Duración</div>
                            <div className="font-medium">{tour.duracion}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <DollarSign className="size-5 text-blue-600" />
                          <div>
                            <div className="text-xs text-gray-500">Precio</div>
                            <div className="font-medium">{tour.precio}</div>
                          </div>
                        </div>
                      </div>

                      {/* Lo que incluye */}
                      <div className="mb-4">
                        <h3 className="text-sm text-gray-500 mb-2">El tour incluye:</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {tour.incluye.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle2 className="size-4 text-green-600 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 mt-4">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Reservar Tour
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Más Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recomendaciones */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-xl mb-3 flex items-center gap-2">
                <TrendingUp className="size-6 text-blue-700" />
                Recomendaciones para tus Tours
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lleva ropa ligera y cómoda, preferiblemente de secado rápido</li>
                <li>• No olvides repelente de mosquitos y protector solar</li>
                <li>• Usa calzado apropiado para caminar (no sandalias)</li>
                <li>• Lleva una chaqueta impermeable, llueve frecuentemente</li>
                <li>• Carga tu cámara para capturar la increíble biodiversidad</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="text-xl mb-3">Qué puedes ver en los Tours</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-green-800 mb-1">Flora</h4>
                  <p className="text-sm text-gray-700">
                    Árboles gigantes, orquídeas, plantas medicinales, palmas nativas
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-1">Fauna</h4>
                  <p className="text-sm text-gray-700">
                    Aves exóticas, monos aulladores, ranas coloridas, mariposas
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-1">Cultura</h4>
                  <p className="text-sm text-gray-700">
                    Comunidades afrodescendientes e indígenas, música tradicional
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información importante */}
        <Card className="mt-6 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <h3 className="text-xl mb-3">Información Importante</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Los tours están sujetos a condiciones climáticas. En caso de lluvia fuerte, se pueden reprogramar</li>
              <li>• Se requiere un mínimo de 2 personas para la mayoría de los tours</li>
              <li>• Los niños menores de 12 años pagan 50% del precio</li>
              <li>• Reserva con al menos 24 horas de anticipación</li>
              <li>• Cancelaciones con menos de 24 horas tienen cargo del 50%</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
