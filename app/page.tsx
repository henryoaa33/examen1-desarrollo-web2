'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function PaginaDeLogin() {
  // estados para los inputs
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [mensajeErr, setMensajeErr] = useState('');
  
  const nav = useRouter(); // para cambiar de pagina

  // esta se llama con el boton de entrar
  const revisarDatos = () => {
    // reviso los datos que pide el examen
    if (user == 'admin' && pass == 'admin123') {
      // si son correctos lo mando a la pag de presupuesto
      nav.push('/presupuesto');
    } else {
      setMensajeErr('usuario o clave no sirve');
    }
  };

  return (
    // el fondo negro de la pagina
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      
      {/* la cajita del login */}
      <div className="p-8 bg-slate-800 border border-slate-700 rounded-lg w-full max-w-sm shadow-lg">
        
        {/* el titulo */}
        <h1 className="text-xl font-bold text-center mb-6 text-white">
          Mis Gastos / Entrar
        </h1>
        
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="p-3 bg-slate-700 text-white border border-slate-600 rounded-md"
          />
          <input
            placeholder="Clave"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="p-3 bg-slate-700 text-white border border-slate-600 rounded-md"
          />
          <button onClick={revisarDatos} className="bg-sky-600 text-white font-bold p-3 rounded-md hover:bg-sky-700">
            Iniciar Sesion
          </button>
          
          {/* si hay error lo muestro aqui */}
          {mensajeErr && (
            <p className="text-red-500 text-center mt-2">{mensajeErr}</p>
          )}

        </div>
      </div>
    </div>
  );
}

export default PaginaDeLogin;