import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Book, Users, Leaf, Music, Utensils, MapPin } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { api } from '../api';
import type { HistoriaQuibdo, EventoCultural } from '../data/tourismData';

export function Historia() {
  const [historia, setHistoria] = useState<HistoriaQuibdo | null>(null);
  const [eventos, setEventos] = useState<EventoCultural[]>([]);

  useEffect(() => {
    api.getHistoria().then(setHistoria).catch(() => {});
    api.getEventos().then(setEventos).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Book className="size-12" />
            <h1 className="text-4xl md:text-5xl">Historia y Cultura</h1>
          </div>
          <p className="text-xl max-w-3xl">
            Descubre la rica historia de Quibdó y la forma de vida del Pacífico
            colombiano. Una cultura vibrante que es Patrimonio Cultural
            Inmaterial de la Humanidad.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Historia */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Book className="size-8 text-purple-600" />
                <h2 className="text-3xl">Historia de Quibdó</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Quibdó es la capital del departamento de Chocó, ubicada en el
                occidente de Colombia. Es una ciudad rica en cultura
                afrocolombiana e indígena. El río Atrato ha sido históricamente
                la arteria vital de la ciudad, facilitando el comercio y la
                comunicación.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                La historia de Quibdó comenzó en 1648, cuando el
                fraile Matías Abad fundó el primer poblado con el nombre de
                Citará. Tras ser destruido por los indígenas, los jesuitas lo
                reconstruyeron en 1654. Décadas más tarde, en 1690, el colono
                Manuel Cañizales trasladó el asentamiento a su ubicación actual,
                consolidándose formalmente en 1702 como el municipio de San
                Francisco de Quibdó.
              </p>
              <div className="h-64 rounded-lg overflow-hidden mb-4">
                <ImageWithFallback
                  src="./src/imports/inicio.png"
                  alt="Quibdó histórico"
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cultura */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Music className="size-8 text-pink-600" />
                  <h3 className="text-2xl">Cultura y Tradiciones</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {historia?.cultura}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="size-8 text-blue-600" />
                  <h3 className="text-2xl">Economía Local</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {historia?.economia}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="size-8 text-green-600" />
                  <h3 className="text-2xl">Biodiversidad</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {historia?.biodiversidad}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Utensils className="size-8 text-orange-600" />
                  <h3 className="text-2xl">Gastronomía</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {historia?.gastronomia}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Forma de vida */}
        <section className="mb-12">
          <h2 className="text-3xl mb-6">Forma de Vida en Quibdó</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl mb-3">Vida Cotidiana</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • El río Atrato es el centro de la vida diaria, usado para
                      transporte y comercio
                    </li>
                    <li>
                      • La música (chirimía, currulao) acompaña eventos sociales
                      y celebraciones
                    </li>
                    <li>
                      • Las comidas familiares son momentos importantes de
                      reunión
                    </li>
                    <li>
                      • El mercado local es punto de encuentro y comercio
                      tradicional
                    </li>
                    <li>
                      • La religiosidad se manifiesta en festividades y
                      procesiones
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl mb-3">Costumbres y Tradiciones</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • Celebración del Festival de San Pacho
                      (septiembre-octubre)
                    </li>
                    <li>
                      • Prácticas de medicina tradicional con plantas locales
                    </li>
                    <li>• Artesanías en tagua, madera y cestería</li>
                    <li>• Bailes tradicionales como el currulao y la jota</li>
                    <li>
                      • Narrativa oral: cuentos, leyendas y tradiciones
                      ancestrales
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Eventos culturales */}
        <section className="mb-12">
          <h2 className="text-3xl mb-6">Eventos Culturales Destacados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {eventos.map((evento) => (
              <Card
                key={evento.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={evento.imagen}
                    alt={evento.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-purple-600">{evento.fecha}</Badge>
                  <h3 className="mb-2">{evento.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {evento.descripcion}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin className="size-3" />
                    {evento.ubicacion}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sabías que */}
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-4">¿Sabías que...?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-800">
                <li>
                  - El Festival de San Pacho fue declarado Patrimonio Cultural
                  Inmaterial de la Humanidad por la UNESCO en 2012
                </li>
                <li>
                  - El Chocó es uno de los lugares con mayor biodiversidad y
                  pluviosidad del planeta
                </li>
                <li>
                  - Quibdó fue fundada en 1654 por franciscanos españoles
                </li>
              </ul>
              <ul className="space-y-2 text-gray-800">
                <li>
                  - El río Atrato es considerado sujeto de derechos por la
                  Corte Constitucional colombiana
                </li>
                <li>
                  - La población es mayoritariamente afrodescendiente, con
                  influencia indígena
                </li>
                <li>
                  - La música del Pacífico colombiano tiene raíces africanas
                  muy marcadas
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
