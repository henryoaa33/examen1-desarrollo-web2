'use client';

import { useState, useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import { Gasto, CategoriaGasto } from '@/models/Gasto';

export default function PaginaDeGastos() {
  const ctx = useContext(AppContext);

  // estados para el formulario de nuevo gasto
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState<CategoriaGasto>('comida');
  const [fecha, setFecha] = useState('');

  // cargo los gastos guardados cuando la pagina abre
  useEffect(() => {
    ctx.cargarGastos();
  }, []);

  // calculos para las alertas
  const totalGastos = ctx.gastos ? ctx.gastos.reduce((total, gasto) => total + gasto.monto, 0) : 0;
  const porcenGastado = ctx.presupuesto > 0 ? (totalGastos / ctx.presupuesto) * 100 : 0;

  const manejarGuardar = async () => {
    // preparo el objeto del nuevo gasto
    const unGasto: Gasto = {
      monto: parseFloat(monto),
      descripcion: descripcion,
      categoria: categoria,
      fecha: fecha,
    };
    await ctx.agregarGasto(unGasto);

    // limpio los campos
    setMonto('');
    setDescripcion('');
    setFecha('');
  };

  return (
    // fondo oscuro
    <div className="p-8 max-w-6xl mx-auto bg-slate-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-sky-400">
        Presupuesto del Mes: Lps. {ctx.presupuesto.toFixed(2)}
      </h1>
      
      {porcenGastado >= 80 && porcenGastado < 100 && (
        <div className="p-3 bg-yellow-500 text-black font-bold rounded mb-4">
          Cuidado, ya gastaste el 80% del presupuesto
        </div>
      )}

      {porcenGastado >= 100 && (
        <div className="p-3 bg-red-600 text-white font-bold rounded mb-4">
          Te pasaste del presupuesto, tienes que ajustar gastos
        </div>
      )}

      {/* formulario */}
      <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg mb-8">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="p-3 bg-slate-700 rounded-md border border-slate-600"
          />
          <input
            type="text"
            placeholder="Descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="p-3 bg-slate-700 rounded-md border border-slate-600"
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as CategoriaGasto)}
            className="p-3 bg-slate-700 rounded-md border border-slate-600"
          >
            <option>Comida</option>
            <option>Transporte</option>
            <option>Entretenimiento</option>
            <option>Ropa</option>
          </select>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="p-3 bg-slate-700 rounded-md border border-slate-600"
          />
        </div>
        <button onClick={manejarGuardar} className="bg-sky-600 font-bold p-3 rounded w-full hover:bg-sky-700">
          Guardar Gasto
        </button>
      </div>

      {/* tabla de gastos */}
      <table className="w-full text-left">
        <thead className="border-b border-slate-700 text-slate-400">
          <tr>
            <th className="p-3">Monto</th>
            <th className="p-3">Descripcion</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Fecha</th>
            <th className="p-3">Editar</th>
            <th className="p-3">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {ctx.gastos && ctx.gastos.map((gasto) => (
            <tr key={gasto.idgasto} className="border-b border-slate-800">
              <td className="p-3">{gasto.monto}</td>
              <td className="p-3">{gasto.descripcion}</td>
              <td className="p-3">{gasto.categoria}</td>
              <td className="p-3">{gasto.fecha}</td>
              <td className="p-3">
                <button className="bg-yellow-500 text-black px-2 py-1 rounded text-sm">Editar</button>
              </td>
              <td className="p-3">
                <button className="bg-red-600 text-white px-2 py-1 rounded text-sm">Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}