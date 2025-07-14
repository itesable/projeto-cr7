// app/api/supply/route.ts
import { NextRequest } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(request: NextRequest) {
  try {
    const supplyData = await db.getTokenSupply();
    
    if (!supplyData) {
      return new Response(
        JSON.stringify({ error: 'Dados de supply não encontrados' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify(supplyData),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Erro ao obter dados de supply:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
