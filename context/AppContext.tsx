'use client';

import { Gasto } from '@/models/Gasto';
import React, { useState, createContext, useEffect, ReactNode } from 'react';

// Se define el contexto con un valor por defecto que los componentes pueden usar
export const AppContext = createContext({
  presupuesto: 0,
  gastos: [] as Gasto[],
  agregarGasto: async (gasto: Gasto) => {},
  cargarGastos: async () => {},
  establecerPresupuesto: (monto: number) => {},
});

// Este es el componente que proveerá el estado a toda la app
export function AppProvider({ children }: { children: ReactNode }) {
  const [montoPresupuesto, setMontoPresupuesto] = useState(0);
  const [listaDeGastos, setListaDeGastos] = useState<Gasto[]>([]);

  const GASTOS_API_URL = "http://localhost:5000/gasto";

  // Uso una función clásica aquí en lugar de una arrow function
  async function cargarGastos() {
    try {
      const respuesta = await fetch(GASTOS_API_URL);
      const data = await respuesta.json();
      setListaDeGastos(data);
    } catch (error) {
      console.log('Hubo un fallo al traer los datos', error);
    }
  }

  const agregarGasto = async (gasto: Gasto) => {
    try {
      await fetch(GASTOS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gasto),
      });
      // Vuelvo a llamar a la función para refrescar la lista
      await cargarGastos();
    } catch (error) {
      console.log('Fallo al intentar guardar el nuevo gasto', error);
    }
  };
  
  // Para cargar los datos la primera vez que la app se abre
  useEffect(() => {
    cargarGastos();
  }, []);

  return (
    <AppContext.Provider
      value={{
        presupuesto: montoPresupuesto,
        gastos: listaDeGastos,
        agregarGasto,
        cargarGastos,
        establecerPresupuesto: setMontoPresupuesto,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}