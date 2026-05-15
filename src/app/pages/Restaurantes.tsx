import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Utensils, MapPin, Phone, Clock, DollarSign } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { api } from '../api';
import type { Restaurante } from '../data/tourismData';

export function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  useEffect(() => {
    api.getRestaurantes().then(setRestaurantes).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Utensils className="size-12" />
            <h1 className="text-4xl md:text-5xl">Restaurantes</h1>
          </div>
          <p className="text-xl max-w-3xl">
            Descubre los sabores únicos del Pacífico colombiano.
            Gastronomía tradicional con pescados frescos, coco y los mejores ingredientes locales.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          {restaurantes.map(restaurante => (
            <Card key={restaurante.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Imagen */}
                <div className="md:col-span-2 h-64 md:h-auto overflow-hidden">
                  <ImageWithFallback
                    src={restaurante.imagen}
                    alt={restaurante.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Contenido */}
                <div className="md:col-span-3 p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="mb-3">
                        <h2 className="text-2xl mb-2">{restaurante.nombre}</h2>
                        <Badge className="bg-orange-600">
                          {restaurante.precioPromedio}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4">{restaurante.descripcion}</p>

                      {/* Especialidad */}
                      <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <h3 className="text-sm text-orange-800 mb-1">Especialidades:</h3>
                        <p className="text-gray-700">{restaurante.especialidad}</p>
                      </div>

                      {/* Información */}
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-orange-600" />
                          <span>{restaurante.horario}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-orange-600" />
                          <span>{restaurante.direccion}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="size-4 text-orange-600" />
                          <span>{restaurante.telefono}</span>
                        </div>
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 mt-4">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                        Ver Menú
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Cómo Llegar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Platos típicos destacados */}
        <div className="mt-12">
          <h2 className="text-3xl mb-6">Platos Típicos Imperdibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { nombre: 'Sancocho de Pescado', ingrediente: 'Pescado fresco del Atrato' },
              { nombre: 'Arroz con Coco', ingrediente: 'Coco rallado y pasas' },
              { nombre: 'Tapao de Pescado', ingrediente: 'Cocinado en hoja de bijao' },
              { nombre: 'Empanadas de Pescado', ingrediente: 'Masa de maíz y pescado' }
            ].map((plato, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Utensils className="size-8 text-orange-600 mb-2" />
                  <h3 className="mb-1">{plato.nombre}</h3>
                  <p className="text-sm text-gray-600">{plato.ingrediente}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Información sobre gastronomía */}
        <Card className="mt-8 bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <h3 className="text-xl mb-3 flex items-center gap-2">
              <DollarSign className="size-6 text-amber-700" />
              Sobre la Gastronomía Chocoana
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                La cocina del Pacífico colombiano es única por su uso del coco en casi todas las
                preparaciones, desde arroces hasta sopas y postres.
              </p>
              <p>
                El pescado fresco del río Atrato y el océano Pacífico es la base de muchos platos.
                Se prepara de diversas formas: frito, en sancocho, tapado, o en cazuela.
              </p>
              <p>
                Los plátanos (verdes y maduros), la yuca, el ñame y el chontaduro son
                acompañamientos tradicionales.
              </p>
              <p className="text-sm italic">
                Propina sugerida: 10% del total de la cuenta
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
