import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import logo from '../../imports/WhatsApp_Image_2026-04-12_at_8.28.18_PM.jpeg';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Turismo Cultural Quibdó" className="h-16" />
            </div>
            <p className="text-gray-400 mb-4">
              Descubre la riqueza cultural y natural de Quibdó, capital del Chocó.
              Patrimonio cultural inmaterial de la humanidad.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="size-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="size-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="size-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-emerald-400 transition-colors">Inicio</a></li>
              <li><a href="/hospedaje" className="hover:text-emerald-400 transition-colors">Hospedaje</a></li>
              <li><a href="/restaurantes" className="hover:text-emerald-400 transition-colors">Restaurantes</a></li>
              <li><a href="/tours" className="hover:text-emerald-400 transition-colors">Tours</a></li>
              <li><a href="/historia" className="hover:text-emerald-400 transition-colors">Historia</a></li>
              <li><a href="/opiniones" className="hover:text-emerald-400 transition-colors">Opiniones</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-4">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="size-4" />
                <span>+57 4 672 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4" />
                <span>info@turismoquibdo.co</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Turismo Quibdó. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}