'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/AppContext';

// pantalla para poner el presupuesto
function PantallaPresupuesto() {
  const [monto, setMonto] = useState('');
  const router = useRouter();
  const contexto = useContext(AppContext);

  // se llama al darle click a guardar
  const guardarPresupuesto = () => {
    const valor = parseFloat(monto); // paso el texto a numero

    // miro si es un numero valido
    if (valor > 0) {
      contexto.establecerPresupuesto(valor);
      router.push('/gastos'); // muevo a la pagina de gastos
    } else {
      // si no, le digo q ponga un numero bueno
      alert('ingresa un monto valido');
    }
  };

  return (
    // el fondo negro
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      
      {/* la cajita para el presupuesto */}
      <div className="p-8 bg-slate-800 border border-slate-700 rounded-lg w-full max-w-sm text-center shadow-lg">
        
        <h1 className="text-xl font-bold mb-6 text-white">
          Poner Presupuesto del Mes
        </h1>
        
        <input
          type="number"
          placeholder="Monto de presupuesto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          // estilos para el input
          className="p-3 bg-slate-700 text-white border border-slate-600 rounded-md w-full mb-4"
        />
        
        <button onClick={guardarPresupuesto} className="bg-sky-600 text-white font-bold p-3 rounded-md hover:bg-sky-700 w-full">
          Guardar
        </button>

      </div>
    </div>
  );
}

export default PantallaPresupuesto;