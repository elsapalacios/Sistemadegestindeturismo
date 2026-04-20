import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Hotel, MapPin, Phone, Wifi, Coffee, Car, Wind } from 'lucide-react';
import { hospedajes } from '../data/tourismData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Hospedaje() {
  const serviciosIcons: Record<string, any> = {
    'WiFi gratis': Wifi,
    'WiFi': Wifi,
    'Aire acondicionado': Wind,
    'Ventilador': Wind,
    'Restaurante': Coffee,
    'Desayuno incluido': Coffee,
    'Parqueadero': Car,
    'Piscina': Hotel
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Hotel className="size-12" />
            <h1 className="text-4xl md:text-5xl">Hospedaje en Quibdó</h1>
          </div>
          <p className="text-xl max-w-3xl">
            Encuentra el alojamiento perfecto para tu estadía. 
            Desde hoteles modernos hasta hostales acogedores con la calidez chocoana.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          {hospedajes.map(hotel => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Imagen */}
                <div className="md:col-span-2 h-64 md:h-auto overflow-hidden">
                  <ImageWithFallback
                    src={hotel.imagen}
                    alt={hotel.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Contenido */}
                <div className="md:col-span-3 p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl">{hotel.nombre}</h2>
                        <Badge className="bg-emerald-600 text-lg px-3 py-1">
                          {hotel.precio}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4">{hotel.descripcion}</p>

                      {/* Servicios */}
                      <div className="mb-4">
                        <h3 className="text-sm text-gray-500 mb-2">Servicios incluidos:</h3>
                        <div className="flex flex-wrap gap-2">
                          {hotel.servicios.map(servicio => {
                            const Icon = serviciosIcons[servicio] || Hotel;
                            return (
                              <Badge key={servicio} variant="outline" className="gap-1">
                                <Icon className="size-3" />
                                {servicio}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>

                      {/* Información de contacto */}
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-emerald-600" />
                          <span>{hotel.direccion}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="size-4 text-emerald-600" />
                          <span>{hotel.telefono}</span>
                        </div>
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 mt-4">
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                        Reservar Ahora
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Más Información
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Información adicional */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-xl mb-3">Consejos para tu Hospedaje</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Se recomienda reservar con anticipación, especialmente durante el Festival de San Pacho (septiembre-octubre)</li>
              <li>• La mayoría de los hoteles aceptan pagos en efectivo y tarjetas</li>
              <li>• El clima en Quibdó es cálido y lluvioso, verifica que tu alojamiento tenga buena ventilación</li>
              <li>• Pregunta por tours y actividades que el hotel pueda organizar</li>
              <li>• Muchos hoteles ofrecen transporte desde y hacia el aeropuerto</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
