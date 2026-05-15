import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { MapPin, Calendar, Utensils, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { api } from '../api';
import type { ZonaEmblematica, EventoCultural, PlatoTipico } from '../data/tourismData';

export function Home() {
  const { user } = useAuth();
  const [zonas, setZonas] = useState<ZonaEmblematica[]>([]);
  const [eventos, setEventos] = useState<EventoCultural[]>([]);
  const [platos, setPlatos] = useState<PlatoTipico[]>([]);

  useEffect(() => {
    api.getZonas().then(setZonas).catch(() => {});
    api.getEventos().then(setEventos).catch(() => {});
    api.getPlatos().then(setPlatos).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="/src/imports/image-2.png"
            alt="Quibdó"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl mb-4">
            {user ? `¡Bienvenido ${user.name}!` : '¡Bienvenido a Quibdó!'}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Capital del Chocó - Patrimonio Cultural Inmaterial de la Humanidad
          </p>
          <p className="text-lg mb-8">
            Descubre la magia del Pacífico colombiano, su cultura vibrante,
            biodiversidad única y gastronomía exquisita
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/tours">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Explorar Tours
              </Button>
            </Link>
            <Link to="/historia">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Conocer Nuestra Historia
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Zonas Emblemáticas */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="size-8 text-emerald-600" />
            <h2 className="text-3xl">Zonas Emblemáticas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {zonas.map(zona => (
              <Card key={zona.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={zona.imagen}
                    alt={zona.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2">{zona.nombre}</h3>
                  <p className="text-gray-600 text-sm">{zona.descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Eventos Culturales */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="size-8 text-emerald-600" />
              <h2 className="text-3xl">Eventos Culturales</h2>
            </div>
            <Link to="/historia">
              <Button variant="ghost" className="gap-2">
                Ver más <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventos.map(evento => (
              <Card key={evento.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={evento.imagen}
                    alt={evento.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-emerald-600">{evento.fecha}</Badge>
                  <h3 className="mb-2">{evento.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-2">{evento.descripcion}</p>
                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <MapPin className="size-3" />
                    {evento.ubicacion}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Gastronomía */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Utensils className="size-8 text-emerald-600" />
              <h2 className="text-3xl">Gastronomía Chocoana</h2>
            </div>
            <Link to="/restaurantes">
              <Button variant="ghost" className="gap-2">
                Ver restaurantes <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {platos.map(plato => (
              <Card key={plato.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  <ImageWithFallback
                    src={plato.imagen}
                    alt={plato.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg mb-2">{plato.nombre}</h3>
                  <p className="text-gray-600 text-sm">{plato.descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl mb-4">¿Listo para explorar Quibdó?</h2>
          <p className="text-lg mb-6">
            Únete a nuestra comunidad y comparte tu experiencia
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/opiniones">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Ver Opiniones
              </Button>
            </Link>
            <Link to="/tours">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Reservar un Tour
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
